// Renderiza una escena 2.5D de Blender (sin interfaz) a un clip MP4 para usarlo en una composición.
// Uso: npm run blender -- 029 fork [--engine workbench|eevee|cycles] [--size 270x480] [--scale 4] [--fps 30]
//   lee  videos/NNN-slug/blender/<nombre>.py  →  escribe  videos/NNN-slug/b3d/<nombre>.mp4  (no versionado)
// La escena se renderiza pequeña y se amplía sin suavizar (pixel-art). Ver docs/blender.md.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { ROOT, resolveVideo, videoDir } from "./lib.mjs";

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args.splice(i, 2)[1] : d; };
const engine = opt("engine", "workbench"), size = opt("size", "270x480"), scale = +opt("scale", "4"), fps = opt("fps", "30");
const scriptArg = opt("script", null), outArg = opt("out", null); // para probar una escena fuera de un video
const [id, name = "scene"] = args;
const dir = scriptArg ? null : videoDir(resolveVideo(id));
const script = scriptArg ?? path.join(dir, "blender", `${name}.py`);
const out = outArg ?? path.join(dir, "b3d", `${name}.mp4`);
if (!fs.existsSync(script)) { console.error(`No existe ${script}`); process.exit(1); }

const BLENDER = process.env.BLENDER ?? [path.join(os.homedir(), "mybin"), "/usr/bin", "/usr/local/bin"]
  .flatMap((d) => (fs.existsSync(d) ? fs.readdirSync(d).filter((n) => /^blender/.test(n)).map((n) => path.join(d, n)) : []))
  .map((p) => (fs.statSync(p).isDirectory() ? path.join(p, "blender") : p)).find((p) => fs.existsSync(p));
if (!BLENDER) { console.error("No encuentro Blender (define BLENDER=/ruta/al/binario)"); process.exit(1); }

// Colores de marca: tokens.css es la única fuente (se resuelven los var(--x)).
const css = fs.readFileSync(path.join(ROOT, "shared/styles/tokens.css"), "utf8");
const raw = Object.fromEntries([...css.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const tokens = {};
for (const k of Object.keys(raw)) { let v = raw[k]; for (let i = 0; i < 5 && /^var\(--/.test(v); i++) v = raw[v.slice(6, -1)]; if (/^#[0-9a-f]{6}$/i.test(v)) tokens[k] = v; }

const frames = fs.mkdtempSync(path.join(os.tmpdir(), "xf-b3d-"));
const [w, h] = size.split("x").map(Number);
const env = { ...process.env, XF_TOKENS: JSON.stringify(tokens), XF_LIB: path.join(ROOT, "shared/blender"), XF_OUT: frames, XF_W: String(w), XF_H: String(h), XF_FPS: fps, XF_ENGINE: engine };
const t0 = Date.now();
const r = spawnSync(BLENDER, ["-b", "--factory-startup", "--python-exit-code", "1", "-P", script], { env, stdio: ["ignore", "ignore", "inherit"] });
const n = fs.readdirSync(frames).length;
if (r.status || !n) { console.error("✗ Blender falló"); process.exit(1); }
fs.mkdirSync(path.dirname(out), { recursive: true });
// Todo fotogramas clave (-g 1): Hyperframes salta a cualquier instante y necesita búsqueda exacta.
const f = spawnSync("ffmpeg", ["-v", "error", "-y", "-framerate", fps, "-i", path.join(frames, "f%04d.png"), "-vf", `scale=${w * scale}:${h * scale}:flags=neighbor`, "-c:v", "libx264", "-crf", "14", "-g", "1", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out], { stdio: "inherit" });
fs.rmSync(frames, { recursive: true, force: true });
if (f.status) process.exit(f.status);
console.log(`✓ ${path.relative(ROOT, out)} · ${n} fotogramas · ${w * scale}×${h * scale} · ${engine} · ${((Date.now() - t0) / 1000).toFixed(1)} s`);
