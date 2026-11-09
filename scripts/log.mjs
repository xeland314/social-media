// Compone y valida los textos por red social, y genera:
//   log/LOG.md           (legible, una sección por video)
//   log/publicaciones.csv (una fila por video × red, para hoja de cálculo)
// Uso: npm run log            -> regenera + valida
//      npm run captions -- 001 [red]  -> imprime el texto listo para pegar
import fs from "node:fs";
import path from "node:path";
import { ROOT, listVideos, resolveVideo, videoDir, readJson } from "./lib.mjs";

const platforms = readJson(path.join(ROOT, "log/platforms.json"));
const tagsCfg = readJson(path.join(ROOT, "log/hashtags.json"));
const NETS = Object.keys(platforms).filter((k) => !k.startsWith("_"));

export function composeTags(post, net) {
  const cfg = platforms[net];
  const seriesTags = tagsCfg.series[post.series] ?? [];
  const forced = cfg.forcedTags ?? [];
  const brand = cfg.skipBrand ? [] : tagsCfg.brand;
  const pool = [...post.topicTags, ...seriesTags, ...tagsCfg.core];
  const room = Math.max(cfg.maxHashtags - brand.length - forced.length, 0);
  const picked = [...new Set(pool)].slice(0, room);
  return [...new Set([...picked, ...brand, ...forced])].slice(0, cfg.maxHashtags);
}

export function composeCaption(post, net) {
  const p = post.platforms[net];
  const cfg = platforms[net];
  let tags = composeTags(post, net);
  if (cfg.bilingual) {
    // Español + chino: las últimas `zhTags` posiciones se reservan para etiquetas en chino.
    const zhPool = [...(tagsCfg.zh.series[post.series] ?? []), ...tagsCfg.zh.core];
    const have = new Set(tags.map((t) => t.toLowerCase()));
    const zh = [...new Set(zhPool)].filter((t) => !have.has(t.toLowerCase())).slice(0, cfg.zhTags);
    tags = [...tags.slice(0, cfg.maxHashtags - zh.length), ...zh];
    return {
      title: [p.title, p.titleZh].filter(Boolean).join(" | "),
      body: `${p.text}\n\n${p.textZh ?? ""}\n\n${tags.join(" ")}`.trim(),
      tags,
    };
  }
  return { title: p.title, body: `${p.text}\n\n${tags.join(" ")}`.trim(), tags };
}

function load() {
  return listVideos().map((name) => {
    const dir = videoDir(name);
    const post = readJson(path.join(dir, "post.json"));
    return { name, dir, post, hasThumb: fs.existsSync(path.join(dir, "thumb.png")), hasRender: fs.existsSync(path.join(dir, "render.mp4")) };
  });
}

function validate(items) {
  const problems = [];
  for (const { name, post } of items) {
    for (const net of NETS) {
      const p = post.platforms?.[net];
      if (!p) { problems.push(`${name}: falta ${net}`); continue; }
      if (!p.text.trim()) { problems.push(`${name} · ${net}: texto vacío`); continue; }
      const cfg = platforms[net];
      const c = composeCaption(post, net);
      if (c.body.length > cfg.maxChars) problems.push(`${name} · ${net}: ${c.body.length}/${cfg.maxChars} caracteres`);
      if (cfg.titleMax && !p.title) problems.push(`${name} · ${net}: falta título`);
      if (cfg.titleMax && p.title.length > cfg.titleMax) problems.push(`${name} · ${net}: título ${p.title.length}/${cfg.titleMax}`);
      if (cfg.bilingual) {
        if (!p.textZh?.trim()) problems.push(`${name} · ${net}: falta textZh (chino)`);
        if (!p.titleZh) problems.push(`${name} · ${net}: falta titleZh`);
        else if (p.titleZh.length > cfg.titleMax) problems.push(`${name} · ${net}: titleZh ${p.titleZh.length}/${cfg.titleMax}`);
      }
      // Solo español (y chino en RedNote): detecta texto en inglés frecuente.
      if (/\b(the|and|your|this)\b/i.test(p.text)) problems.push(`${name} · ${net}: ¿texto en inglés? (solo español)`);
    }
  }
  return problems;
}

const csvCell = (s) => `"${String(s ?? "").replace(/"/g, '""').replace(/\n/g, " ⏎ ")}"`;

function write(items) {
  let md = "# Log de publicaciones\n\n> Generado por `npm run log`. No editar: edita `videos/*/post.json` y `log/hashtags.json`.\n\n";
  md += "| # | Video | Serie | Estado | Día | Publicado en |\n|---|---|---|---|---|---|\n";
  for (const { name, post } of items) {
    const live = NETS.filter((n) => post.platforms[n]?.url).map((n) => platforms[n].label).join(", ") || "—";
    md += `| ${post.id} | [${post.title}](../videos/${name}/) | ${post.series} | ${post.status} | ${post.calendarDay ?? "—"} | ${live} |\n`;
  }
  const rows = [["id", "carpeta", "titulo", "serie", "estado", "dia_calendario", "fecha_publicacion", "duracion_s", "red", "titulo_red", "texto_final", "hashtags", "url", "publicado_en"]];
  for (const { name, post } of items) {
    md += `\n## ${post.id} · ${post.title}\n\n- **Carpeta:** \`videos/${name}/\`  ·  **Estado:** ${post.status}  ·  **Duración:** ${post.durationSec ?? "?"} s\n- **Gancho:** ${post.hook}\n- **Carrusel:** \`${post.carousel.path}\` (${post.carousel.status})\n`;
    for (const net of NETS) {
      const p = post.platforms[net];
      const c = composeCaption(post, net);
      md += `\n### ${platforms[net].label}${p.url ? ` — [publicado](${p.url})` : ""}\n`;
      if (c.title) md += `**Título:** ${c.title}\n\n`;
      md += "```text\n" + c.body + "\n```\n";
      rows.push([post.id, name, post.title, post.series, post.status, post.calendarDay, post.publishDate, post.durationSec, platforms[net].label, c.title, c.body, c.tags.join(" "), p.url, p.publishedAt]);
    }
  }
  fs.writeFileSync(path.join(ROOT, "log/LOG.md"), md);
  fs.writeFileSync(path.join(ROOT, "log/publicaciones.csv"), rows.map((r) => r.map(csvCell).join(",")).join("\n") + "\n");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const items = load();
  if (args[0] === "--captions") {
    const name = resolveVideo(args[1]);
    const { post } = items.find((i) => i.name === name);
    for (const net of args[2] ? [args[2]] : NETS) {
      const c = composeCaption(post, net);
      console.log(`\n── ${platforms[net].label} ${"─".repeat(30)}\n${c.title ? `TÍTULO: ${c.title}\n\n` : ""}${c.body}`);
    }
  } else {
    const problems = validate(items);
    write(items);
    console.log(`✓ log/LOG.md y log/publicaciones.csv (${items.length} video/s × ${NETS.length} redes)`);
    if (problems.length) { console.error("\n⚠ Problemas:\n- " + problems.join("\n- ")); process.exit(1); }
  }
}
