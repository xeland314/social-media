// Sintetiza los SFX chiptune, de forma determinista, sin dependencias.
// La música de fondo opcional está en scripts/make-music.mjs.
// Salida: shared/audio/*.wav (mono, 16 bit). Uso: npm run audio
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./lib.mjs";

const SR = 44100;
const OUT = path.join(ROOT, "shared/audio");
fs.mkdirSync(OUT, { recursive: true });

let seed = 1234567; // ruido determinista (LCG)
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;

const midi = (n) => 440 * 2 ** ((n - 69) / 12);
const buf = (sec) => new Float32Array(Math.ceil(sec * SR));
const square = (ph, duty = 0.5) => ((ph % 1) < duty ? 1 : -1);
const tri = (ph) => 4 * Math.abs((ph % 1) - 0.5) - 1;
const saw = (ph) => 2 * (ph % 1) - 1;

/** Oscilador con barrido de frecuencia y envolvente exponencial; se suma a `out` desde `t0`. */
function tone(out, t0, dur, f0, f1, { wave = square, vol = 0.5, decay = 6, duty } = {}) {
  const n = Math.floor(dur * SR), s = Math.floor(t0 * SR);
  let ph = 0;
  for (let i = 0; i < n && s + i < out.length; i++) {
    const t = i / n, f = f0 + (f1 - f0) * t;
    ph += f / SR;
    const env = Math.exp(-decay * t) * Math.min(1, i / (0.003 * SR)) * Math.min(1, (n - i) / (0.005 * SR));
    out[s + i] += wave(ph, duty) * vol * env;
  }
}

/** Ruido filtrado con barrido (filtro de un polo). */
function noise(out, t0, dur, { vol = 0.4, lp0 = 0.05, lp1 = 0.5, rise = false } = {}) {
  const n = Math.floor(dur * SR), s = Math.floor(t0 * SR);
  let y = 0;
  for (let i = 0; i < n && s + i < out.length; i++) {
    const t = i / n, a = lp0 + (lp1 - lp0) * t;
    y += a * (rnd() - y);
    const env = rise ? Math.sin(Math.PI * t) : 1 - t;
    out[s + i] += y * vol * env * 2;
  }
}

/** Reducción de bits y de tasa de muestreo: la textura "8-bit". */
function crush(b, bits = 8, hold = 1) {
  const q = 2 ** (bits - 1);
  let last = 0;
  for (let i = 0; i < b.length; i++) {
    if (i % hold === 0) last = Math.round(b[i] * q) / q;
    b[i] = last;
  }
  return b;
}

function save(name, b, peak = 0.6) {
  let m = 0;
  for (const v of b) m = Math.max(m, Math.abs(v));
  const g = m > 0 ? peak / m : 1;
  const pcm = Buffer.alloc(b.length * 2);
  for (let i = 0; i < b.length; i++) pcm.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(b[i] * g * 32767))), i * 2);
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVEfmt ", 8); h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22); h.writeUInt32LE(SR, 24); h.writeUInt32LE(SR * 2, 28);
  h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34); h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  fs.writeFileSync(path.join(OUT, name), Buffer.concat([h, pcm]));
  console.log(`  ${name}  ${(b.length / SR).toFixed(2)} s`);
}

// ---------- SFX ----------
const sfx = {
  "blip.wav": () => { const b = buf(0.12); tone(b, 0, 0.1, 880, 880, { decay: 9 }); return b; },
  "pop.wav": () => { const b = buf(0.18); tone(b, 0, 0.14, 440, 990, { decay: 7 }); return b; },
  "confirm.wav": () => { const b = buf(0.4); tone(b, 0, 0.09, 660, 660, { decay: 4 }); tone(b, 0.09, 0.28, 990, 990, { decay: 5 }); return b; },
  "error.wav": () => { const b = buf(0.45); tone(b, 0, 0.4, 330, 80, { wave: saw, decay: 3 }); return b; },
  "packet.wav": () => { const b = buf(0.3); tone(b, 0, 0.22, 300, 760, { wave: tri, decay: 4, vol: 0.6 }); noise(b, 0, 0.2, { vol: 0.15, lp0: 0.2, lp1: 0.6 }); return b; },
  "whoosh.wav": () => { const b = buf(0.6); noise(b, 0, 0.55, { vol: 0.5, lp0: 0.03, lp1: 0.7, rise: true }); return b; },
  "fork.wav": () => { const b = buf(0.55); tone(b, 0, 0.5, 440, 330, { decay: 3, vol: 0.4 }); tone(b, 0, 0.5, 440, 660, { decay: 3, vol: 0.4 }); return b; },
  "merge.wav": () => { const b = buf(0.7); tone(b, 0, 0.35, 660, 440, { decay: 3, vol: 0.4 }); tone(b, 0, 0.35, 330, 440, { decay: 3, vol: 0.4 }); tone(b, 0.35, 0.3, 880, 880, { decay: 5 }); return b; },
};
console.log("SFX:");
for (const [name, make] of Object.entries(sfx)) save(name, crush(make(), 8), 0.6);
