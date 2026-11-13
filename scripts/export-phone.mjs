// Prepara la carpeta SocialMedia para copiarla al celular: por pieza, video + carrusel + publicar.txt con la fecha
// y el texto listo para copiar y pegar en cada red.
// Uso: node scripts/export-phone.mjs <carpeta-salida>      (crea <salida>/SocialMedia)
import fs from "node:fs";
import path from "node:path";
import { ROOT, listVideos, videoDir, readJson } from "./lib.mjs";
import { composeCaption } from "./log.mjs";

const out = path.resolve(process.argv[2] ?? "export");
const root = path.join(out, "SocialMedia");
const platforms = readJson(path.join(ROOT, "log/platforms.json"));
const NETS = Object.keys(platforms).filter((k) => !k.startsWith("_"));
// Qué se publica en cada red: video en las seis; carrusel en estas cuatro.
const CARRUSEL = new Set(["instagram", "facebook", "threads", "rednote"]);
fs.rmSync(root, { recursive: true, force: true });
fs.mkdirSync(root, { recursive: true });

const index = [];
for (const name of listVideos()) {
  const dir = videoDir(name), post = readJson(path.join(dir, "post.json"));
  const fecha = post.publishDate ?? "sin-fecha";
  const folder = `${fecha}_${name}`;
  const dest = path.join(root, folder);
  fs.mkdirSync(dest, { recursive: true });
  const hasVideo = fs.existsSync(path.join(dir, "render.mp4"));
  if (hasVideo) fs.copyFileSync(path.join(dir, "render.mp4"), path.join(dest, "video-pixel.mp4"));
  if (fs.existsSync(path.join(dir, "render-inter.mp4"))) fs.copyFileSync(path.join(dir, "render-inter.mp4"), path.join(dest, "video-inter.mp4"));
  let n = 0;
  for (const v of ["pixel", "inter"]) {
    const imgDir = path.join(ROOT, "carruseles", name, "img", v);
    if (!fs.existsSync(imgDir)) continue;
    fs.mkdirSync(path.join(dest, `carrusel-${v}`));
    let k = 0;
    for (const f of fs.readdirSync(imgDir).filter((f) => /\.(png|jpe?g)$/i.test(f)).sort()) {
      k++;
      fs.copyFileSync(path.join(imgDir, f), path.join(dest, `carrusel-${v}`, `${String(k).padStart(2, "0")}${path.extname(f)}`));
    }
    n = k;
  }
  let t = `PUBLICAR EL: ${fecha}\nPieza: ${name} · ${post.title}\nGancho: ${post.hook ?? ""}\nContenido: ${hasVideo ? "video-pixel.mp4 / video-inter.mp4" : "(sin video)"}${n ? ` + carrusel-pixel/ y carrusel-inter/ (${n} imágenes c/u, en orden; sube UNA variante)` : ""}\n`;
  for (const net of NETS) {
    const usa = [hasVideo ? "video" : null, n && CARRUSEL.has(net) ? "carrusel" : null].filter(Boolean);
    const c = composeCaption(post, net);
    t += `\n${"=".repeat(44)}\n${platforms[net].label.toUpperCase()}  ·  subir: ${usa.join(" y ") || "(nada)"}\n${"=".repeat(44)}\n`;
    if (c.title) t += `TÍTULO:\n${c.title}\n\n`;
    t += `TEXTO:\n${c.body}\n`;
  }
  fs.writeFileSync(path.join(dest, "publicar.txt"), t);
  index.push(`${fecha}  ${name}  ${post.title}${hasVideo ? "" : "  (solo carrusel)"}`);
}
fs.writeFileSync(path.join(root, "LEEME.txt"), `SocialMedia · piezas por fecha de publicación\nCada carpeta: video-pixel.mp4 / video-inter.mp4, carrusel-pixel/ / carrusel-inter/ y publicar.txt (texto por red para copiar y pegar).\nVideo en las seis redes; carrusel en Instagram, Facebook, Threads y RedNote.\n\n${index.sort().join("\n")}\n`);
console.log(`✓ ${index.length} piezas en ${root}`);
