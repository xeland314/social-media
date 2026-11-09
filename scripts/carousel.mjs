// Renderiza el carrusel de un video con cover-creator-cli. Uso:
//   npm run carousel -- 005              (pixel-art, tema del proyecto)
//   npm run carousel -- 005 --flat       (estilo original)
//   npm run carousel -- all              (todos los que tengan proyecto.json)
//   opciones: --theme <tema> --accent <color> --size threads|facebook|tiktok|WxH
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./lib.mjs";

const CLI = path.resolve(ROOT, "../cover-creator-cli/bin/cc.mjs");
const args = process.argv.slice(2);
const id = args.shift();
const flat = args.includes("--flat");
const extra = args.filter((a) => a !== "--flat");
const dirs = fs.readdirSync(path.join(ROOT, "carruseles"), { withFileTypes: true }).filter((d) => d.isDirectory() && /^\d{3}-/.test(d.name)).map((d) => d.name)
  .filter((n) => (id === "all" ? true : n.startsWith(String(id).padStart(3, "0") + "-")));
if (!dirs.length) { console.error("Uso: npm run carousel -- <NNN|all> [--flat]"); process.exit(1); }
for (const d of dirs) {
  const proj = path.join(ROOT, "carruseles", d, "proyecto.json");
  if (!fs.existsSync(proj)) continue;
  const out = path.join(ROOT, "carruseles", d, "img");
  const r = spawnSync("node", [CLI, "render", proj, "-o", out, ...(flat ? [] : ["--pixel"]), ...extra], { stdio: ["ignore", "ignore", "inherit"] });
  console.log(r.status === 0 ? `✓ ${d}` : `✗ ${d}`);
}
