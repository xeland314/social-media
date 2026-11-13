// Renderiza el carrusel de un video con cover-creator-cli. Uso:
//   npm run carousel -- 005              (dos variantes: img/pixel/ e img/inter/; tema light + acento naranja)
//   npm run carousel -- 005 --font pixel (solo una variante: pixel | inter)
//   npm run carousel -- all              (todos los que tengan proyecto.json)
//   opciones: --theme <tema> --accent <color> --size threads|facebook|tiktok|WxH
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./lib.mjs";

const CLI = path.resolve(ROOT, "../cover-creator-cli/bin/cc.mjs");
const args = process.argv.slice(2);
const id = args.shift();
const fi = args.indexOf("--font");
const font = fi >= 0 ? args[fi + 1] : "both";
const extra = args.filter((a, i) => i !== fi && i !== fi + 1 || fi < 0);
const variants = font === "both" ? ["pixel", "inter"] : [font];
const hasOpt = (o) => extra.includes(o);
const dirs = fs.readdirSync(path.join(ROOT, "carruseles"), { withFileTypes: true }).filter((d) => d.isDirectory() && /^\d{3}-/.test(d.name)).map((d) => d.name)
  .filter((n) => (id === "all" ? true : n.startsWith(String(id).padStart(3, "0") + "-")));
if (!dirs.length) { console.error("Uso: npm run carousel -- <NNN|all> [--font pixel|inter]"); process.exit(1); }
for (const d of dirs) {
  const proj = path.join(ROOT, "carruseles", d, "proyecto.json");
  if (!fs.existsSync(proj)) continue;
  let ok = true;
  for (const v of variants) {
    const out = path.join(ROOT, "carruseles", d, "img", v);
    fs.rmSync(out, { recursive: true, force: true });
    const opts = [...(v === "pixel" ? ["--pixel"] : []), ...(hasOpt("--theme") ? [] : ["--theme", "light"]), ...(hasOpt("--accent") ? [] : ["--accent", "orange"])];
    const r = spawnSync("node", [CLI, "render", proj, "-o", out, ...opts, ...extra], { stdio: ["ignore", "ignore", "inherit"] });
    if (r.status !== 0) ok = false;
  }
  console.log(ok ? `✓ ${d}` : `✗ ${d}`);
}
