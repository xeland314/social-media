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

let r = spawnSync("npx", ["hyperframes", "render", "-o", "render.mp4", "-f", fps, "-q", "standard"], { cwd: dir, stdio: "inherit" });
if (r.status) process.exit(r.status);

// Miniatura: a 3/4 del video (suele mostrar el resultado final).
const out = path.join(dir, "render.mp4");
const probe = spawnSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", out], { encoding: "utf8" });
const dur = parseFloat(probe.stdout) || 10;
spawnSync("ffmpeg", ["-v", "error", "-y", "-ss", String(dur * 0.75), "-i", out, "-frames:v", "1", "-vf", "scale=540:-1", path.join(dir, "thumb.png")], { stdio: "inherit" });

// Actualiza post.json: duración y estado.
const postPath = path.join(dir, "post.json");
if (fs.existsSync(postPath)) {
  const post = readJson(postPath);
  post.durationSec = Math.round(dur * 10) / 10;
  if (post.status === "draft") post.status = "rendered";
  fs.writeFileSync(postPath, JSON.stringify(post, null, 2) + "\n");
}
console.log(`\n✓ ${name}: render.mp4 (${dur.toFixed(1)} s) + thumb.png`);
