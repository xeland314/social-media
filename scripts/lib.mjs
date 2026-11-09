import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const VIDEOS = path.join(ROOT, "videos");

/** Carpetas de video (NNN-slug), ordenadas. */
export function listVideos() {
  return fs
    .readdirSync(VIDEOS, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^\d{3}-/.test(d.name))
    .map((d) => d.name)
    .sort();
}

/** Acepta "1", "001" o "001-fork-system-call" y devuelve el nombre de carpeta. */
export function resolveVideo(arg) {
  const all = listVideos();
  const n = String(arg ?? "").padStart(3, "0");
  const hit = all.find((v) => v === arg || v.startsWith(`${n}-`));
  if (!hit) throw new Error(`No existe el video "${arg}". Disponibles: ${all.join(", ") || "(ninguno)"}`);
  return hit;
}

export const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
export const videoDir = (name) => path.join(VIDEOS, name);
