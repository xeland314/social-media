// Crea un video nuevo desde templates/video: npm run new -- fork-bomb "Fork bomb: ..." [serie]
import fs from "node:fs";
import path from "node:path";
import { ROOT, VIDEOS, listVideos } from "./lib.mjs";

const [slug, title = slug, series = "linux"] = process.argv.slice(2);
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error('Uso: npm run new -- <slug-en-minusculas> "<Título>" [serie]');
  process.exit(1);
}
const last = listVideos().map((v) => parseInt(v.slice(0, 3), 10)).pop() ?? 0;
const id = String(last + 1).padStart(3, "0");
const dir = `${id}-${slug}`;
const dest = path.join(VIDEOS, dir);
const tpl = path.join(ROOT, "templates", "video");

fs.mkdirSync(dest, { recursive: true });
const vars = { id, slug, title: title.replace(/"/g, '\\"'), dir, now: new Date().toISOString() };
for (const f of fs.readdirSync(tpl)) {
  let txt = fs.readFileSync(path.join(tpl, f), "utf8");
  for (const [k, v] of Object.entries(vars)) txt = txt.replaceAll(`{{${k}}}`, v);
  fs.writeFileSync(path.join(dest, f), txt);
}
// Enlace relativo a shared/ (Hyperframes solo sirve archivos dentro de la carpeta del video).
fs.symlinkSync("../../shared", path.join(dest, "shared"));
const post = path.join(dest, "post.json");
const p = JSON.parse(fs.readFileSync(post, "utf8"));
p.series = series;
fs.writeFileSync(post, JSON.stringify(p, null, 2) + "\n");
fs.mkdirSync(path.join(ROOT, "carruseles", dir), { recursive: true });
console.log(`✓ videos/${dir} creado (+ carruseles/${dir}).\n  Siguiente: edita index.html y post.json, luego npm run check -- ${id}`);
