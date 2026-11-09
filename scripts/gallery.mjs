// Genera galeria.html: una vista de miniaturas de todos los videos (abrir con el navegador).
import fs from "node:fs";
import path from "node:path";
import { ROOT, listVideos, readJson, videoDir } from "./lib.mjs";

const platforms = readJson(path.join(ROOT, "log/platforms.json"));
const NETS = Object.keys(platforms).filter((k) => !k.startsWith("_"));
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const cards = listVideos().map((name) => {
  const dir = videoDir(name);
  const post = readJson(path.join(dir, "post.json"));
  const thumb = fs.existsSync(path.join(dir, "thumb.png"));
  const mp4 = fs.existsSync(path.join(dir, "render.mp4"));
  const dots = NETS.map((n) => `<span class="dot ${post.platforms[n]?.url ? "on" : ""}" title="${platforms[n].label}">${platforms[n].label.slice(0, 2)}</span>`).join("");
  return `<article class="px-box card">
  ${thumb ? `<a href="videos/${name}/${mp4 ? "render.mp4" : "index.html"}"><img src="videos/${name}/thumb.png" alt=""></a>` : `<div class="empty">SIN RENDER</div>`}
  <h2>${esc(post.id)} · ${esc(post.title)}</h2>
  <p class="meta">${esc(post.series)} · ${esc(post.status)}${post.durationSec ? ` · ${post.durationSec}s` : ""}${post.calendarDay ? ` · día ${post.calendarDay}` : ""}</p>
  <div class="dots">${dots}</div>
</article>`;
});

fs.writeFileSync(path.join(ROOT, "galeria.html"), `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>Galería · social-media</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="shared/styles/fonts.css"><link rel="stylesheet" href="shared/styles/tokens.css"><link rel="stylesheet" href="shared/styles/pixel.css">
<style>
body{background:var(--ground);color:var(--ink);font-family:var(--font-code);padding:48px}
h1{font-family:var(--font-display);font-size:22px;margin-bottom:36px;color:var(--accent)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:36px}
.card{padding:14px}.card img{width:100%;display:block;image-rendering:auto}
.empty{aspect-ratio:9/16;display:grid;place-items:center;font-family:var(--font-label);color:var(--muted);background:var(--ground)}
h2{font-family:var(--font-label);font-size:15px;margin:12px 0 4px}
.meta{font-size:12px;color:var(--muted)}.dots{display:flex;gap:6px;margin-top:10px}
.dot{font-family:var(--font-label);font-size:11px;padding:2px 5px;border:2px solid var(--line);color:var(--muted)}
.dot.on{border-color:var(--sem-ok);color:var(--sem-ok)}
</style></head><body>
<h1>@XELAND314 · VIDEOS</h1>
<div class="grid">${cards.join("\n")}</div>
</body></html>
`);
console.log(`✓ galeria.html (${cards.length} video/s)`);
