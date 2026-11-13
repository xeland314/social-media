// Renderiza un video a MP4 (render.mp4) y genera su miniatura (thumb.png) para la galería.
// Uso: npm run render -- 001 [--fps 30]
import { spawnSync } from "node:child_process";
import path from "node:path";
import { resolveVideo, videoDir, readJson } from "./lib.mjs";
import fs from "node:fs";

const args = process.argv.slice(2);
const name = resolveVideo(args.find((a) => !a.startsWith("-")));
const dir = videoDir(name);
const fpsIdx = args.indexOf("--fps");
const fps = fpsIdx >= 0 ? args[fpsIdx + 1] : "30";

// Variantes tipográficas: pixel (por defecto, render.mp4) e inter (render-inter.mp4, como el portafolio).
// --font pixel|inter|both (por defecto both). La variante inter inyecta shared/styles/font-inter.css
// en index.html solo durante el render y lo restaura después.
const fontIdx = args.indexOf("--font");
const fontArg = fontIdx >= 0 ? args[fontIdx + 1] : "both";
const variants = fontArg === "both" ? ["pixel", "inter"] : [fontArg];
const indexPath = path.join(dir, "index.html");
const original = fs.readFileSync(indexPath, "utf8");
let dur = 10;
try {
  for (const v of variants) {
    const outName = v === "inter" ? "render-inter.mp4" : "render.mp4";
    if (v === "inter") {
      if (!original.includes("<style>")) throw new Error("index.html sin <style>");
      fs.writeFileSync(indexPath, original.replace("<style>", '<link rel="stylesheet" href="shared/styles/font-inter.css" />\n    <style>'));
    } else fs.writeFileSync(indexPath, original);
    const r = spawnSync("npx", ["hyperframes", "render", "-o", outName, "-f", fps, "-q", "standard"], { cwd: dir, stdio: "inherit" });
    if (r.status) { fs.writeFileSync(indexPath, original); process.exit(r.status); }
    const probe = spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path.join(dir, outName)], { encoding: "utf8" });
    dur = parseFloat(probe.stdout) || dur;
    // Miniatura: a 3/4 del video (solo de la variante pixel).
    if (v === "pixel") spawnSync("ffmpeg", ["-v", "error", "-y", "-ss", String(dur * 0.75), "-i", path.join(dir, outName), "-frames:v", "1", "-vf", "scale=540:-1", path.join(dir, "thumb.png")], { stdio: "inherit" });
  }
} finally { fs.writeFileSync(indexPath, original); }

// Actualiza post.json: duración y estado.
const postPath = path.join(dir, "post.json");
if (fs.existsSync(postPath)) {
  const post = readJson(postPath);
  post.durationSec = Math.round(dur * 10) / 10;
  if (post.status === "draft") post.status = "rendered";
  fs.writeFileSync(postPath, JSON.stringify(post, null, 2) + "\n");
}
console.log(`\n✓ ${name}: ${variants.map((v) => (v === "inter" ? "render-inter.mp4" : "render.mp4")).join(" + ")} (${dur.toFixed(1)} s) + thumb.png`);
