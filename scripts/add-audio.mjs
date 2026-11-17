// Inserta el bloque <audio> de un video a partir de una lista de pistas (ver docs/sonido.md).
// Uso: node scripts/add-audio.mjs 005 21 "pop:2.4,pop:4.2,error:8.4,confirm:13.8" [--music bossa|swing|citypop]
// Por defecto SOLO efectos: la música se pone al publicar (audio en tendencia de cada red).
import fs from "node:fs";
import path from "node:path";
import { resolveVideo, videoDir, ROOT } from "./lib.mjs";

const args = process.argv.slice(2);
const mi = args.indexOf("--music");
const music = mi >= 0 ? args.splice(mi, 2)[1] : null;
const [id, dur, cues = ""] = args;
const D = { blip: 0.12, pop: 0.18, confirm: 0.4, error: 0.45, packet: 0.3, whoosh: 0.6, fork: 0.55, merge: 0.7 };
const V = { blip: 0.7, pop: 0.7, confirm: 0.8, error: 0.8, packet: 0.6, whoosh: 0.5, fork: 0.7, merge: 0.8 };
const file = path.join(videoDir(resolveVideo(id)), "index.html");
let s = fs.readFileSync(file, "utf8");
const lines = [];
if (music) {
  const src = `shared/audio/ascensor-${music}.wav`;
  if (!fs.existsSync(path.join(ROOT, src))) throw new Error(`No existe ${src}; corre npm run music (opciones: bossa, swing, citypop)`);
  lines.push(`      <audio id="aud0" src="${src}" data-start="0" data-duration="${Math.min(+dur, 34)}" data-track-index="20" data-volume="0.2" data-fade-in="0.3" data-fade-out="1.5"></audio>`);
}
cues.split(",").filter(Boolean).forEach((c, i) => {
  const [n, t] = c.split(":");
  lines.push(`      <audio id="aud${i + 1}" src="shared/audio/${n}.wav" data-start="${t}" data-duration="${D[n]}" data-track-index="${21 + ((i + 1) % 4)}" data-volume="${V[n]}"></audio>`);
});
const re = /(<!-- audio:start[^\n]*-->)[\s\S]*?(<!-- audio:end -->)/;
if (!re.test(s)) throw new Error("Faltan los marcadores audio:start/audio:end");
s = s.replace(re, `$1\n${lines.join("\n")}\n      $2`);
fs.writeFileSync(file, s);
console.log(`✓ ${lines.length} pistas en ${path.basename(path.dirname(file))}${music ? ` (música: ${music})` : " (solo efectos)"}`);
