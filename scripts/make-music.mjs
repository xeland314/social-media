// Música de fondo opcional estilo "ascensor/lounge" (determinista, sin dependencias).
// Salida: shared/audio/ascensor-*.wav (estéreo, 16 bit). Uso: npm run music
//
// Por qué así: lo que delata a la música "de relleno" es la armonía trillada (I–V–vi–IV en tríadas),
// el tiempo rígido y la falta de melodía. Aquí: acordes de jazz (maj9, 13, iv menor), melodías
// escritas a mano, swing, micro‑variaciones de tiempo y dinámica, y timbres clásicos de lounge
// (Rhodes FM, vibráfono con trémolo, contrabajo, escobillas) con reverb estéreo.
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./lib.mjs";

const SR = 44100;
const TAU = 2 * Math.PI;
const OUT = path.join(ROOT, "shared/audio");
fs.mkdirSync(OUT, { recursive: true });

const midiHz = (n) => 440 * 2 ** ((n - 69) / 12);
const PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const parseNote = (s) => {
  const m = /^([A-G])(#|b)?(-?\d)$/.exec(s);
  if (!m) throw new Error(`Nota inválida: ${s}`);
  return (+m[3] + 1) * 12 + PC[m[1]] + (m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0);
};

// ---------- utilidades de síntesis ----------
let seed = 7;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;
const bus = (sec) => new Float32Array(Math.ceil(sec * SR));
const release = (t, end, r) => (t < end ? 1 : Math.exp(-(t - end) / r));
const attack = (t, a) => Math.min(1, t / a);

/** Rhodes por FM (portadora 1:1, índice que decae = "bark"; parcial alto breve = la púa metálica). */
function rhodes(b, t0, note, dur, vel) {
  const f = midiHz(note), s = Math.floor(t0 * SR), n = Math.floor((dur + 0.4) * SR);
  const dec = 0.7 + Math.max(0, note - 48) * 0.035;
  for (let i = 0; i < n && s + i < b.length; i++) {
    const t = i / SR;
    const I = (0.5 + 2.0 * vel) * Math.exp(-t * 5) + 0.3 * vel;
    let v = Math.sin(TAU * f * t + I * Math.sin(TAU * f * t)) * Math.exp(-t * dec);
    v += 0.1 * vel * Math.sin(TAU * f * 7.07 * t) * Math.exp(-t * 28);
    b[s + i] += Math.tanh(v * (0.8 + vel)) * vel * attack(t, 0.002) * release(t, dur, 0.09);
  }
}

/** Vibráfono: fundamental + parcial 4× y 10× (barras afinadas), trémolo del motor, se apaga con pedal. */
function vibes(b, t0, note, dur, vel) {
  const f = midiHz(note), s = Math.floor(t0 * SR), damp = dur + 0.35, n = Math.floor((damp + 0.6) * SR);
  for (let i = 0; i < n && s + i < b.length; i++) {
    const t = i / SR;
    let v = Math.sin(TAU * f * t) + 0.3 * Math.exp(-t * 6) * Math.sin(TAU * 4 * f * t)
          + 0.07 * Math.exp(-t * 30) * Math.sin(TAU * 10 * f * t);
    const trem = 1 - 0.28 * (0.5 + 0.5 * Math.sin(TAU * 5.3 * (t0 + t)));
    b[s + i] += v * vel * trem * Math.exp(-t * 0.8) * attack(t, 0.0015) * release(t, damp, 0.14);
  }
}

/** Campanita suave (doblar la melodía una octava arriba, muy baja). */
function bell(b, t0, note, dur, vel) {
  const f = midiHz(note), s = Math.floor(t0 * SR), n = Math.floor((dur + 1) * SR);
  for (let i = 0; i < n && s + i < b.length; i++) {
    const t = i / SR;
    const v = Math.sin(TAU * f * t + 0.8 * Math.exp(-t * 8) * Math.sin(TAU * f * 3.5 * t));
    b[s + i] += v * vel * Math.exp(-t * 2.2) * attack(t, 0.002) * release(t, dur + 0.3, 0.2);
  }
}

/** Contrabajo/bajo: armónicos que decaen, ligera caída de afinación al pulsar y "thump" de dedo. */
function bass(b, t0, note, dur, vel, { bright = 0.45 } = {}) {
  const f = midiHz(note), s = Math.floor(t0 * SR), n = Math.floor((dur + 0.12) * SR);
  let ph = 0, lp = 0;
  for (let i = 0; i < n && s + i < b.length; i++) {
    const t = i / SR;
    ph += (TAU * f * (1 + 0.025 * Math.exp(-t * 45))) / SR;
    let v = Math.sin(ph) + bright * Math.exp(-t * 3) * Math.sin(2 * ph) + 0.18 * Math.exp(-t * 7) * Math.sin(3 * ph);
    lp += 0.08 * (rnd() - lp);
    v += lp * 3 * Math.exp(-t * 90);
    b[s + i] += Math.tanh(v * 1.1) * vel * attack(t, 0.005) * Math.exp(-t * 1.6) * release(t, dur, 0.05);
  }
}

/** Ruido filtrado genérico (paso banda de dos polos simples) con envolvente. */
function noiseHit(b, t0, len, vel, { lo = 0.05, hi = 0.6, env = (t) => Math.exp(-t * 30) } = {}) {
  const s = Math.floor(t0 * SR), n = Math.floor(len * SR);
  let a = 0, c = 0;
  for (let i = 0; i < n && s + i < b.length; i++) {
    const x = rnd();
    a += hi * (x - a); c += lo * (a - c);
    b[s + i] += (a - c) * vel * env(i / SR, len);
  }
}
const ride = (b, t0, vel) => {
  noiseHit(b, t0, 1.2, vel * 0.6, { lo: 0.35, hi: 0.95, env: (t) => Math.exp(-t * 4) * (0.5 + 0.5 * Math.exp(-t * 40)) });
  const s = Math.floor(t0 * SR);
  for (let i = 0; i < 1.2 * SR && s + i < b.length; i++) {
    const t = i / SR;
    b[s + i] += vel * 0.04 * Math.exp(-t * 3) * (Math.sin(TAU * 3170 * t) + Math.sin(TAU * 4410 * t) + Math.sin(TAU * 5230 * t));
  }
};
const brushTap = (b, t0, vel) => noiseHit(b, t0, 0.25, vel, { lo: 0.04, hi: 0.5, env: (t) => Math.exp(-t * 22) });
const swish = (b, t0, len, vel) => noiseHit(b, t0, len, vel * 0.5, { lo: 0.08, hi: 0.45, env: (t, L) => Math.sin(Math.PI * t / L) ** 2 });
const shaker = (b, t0, vel) => noiseHit(b, t0, 0.12, vel, { lo: 0.4, hi: 0.95, env: (t) => attack(t, 0.008) * Math.exp(-t * 40) });
const hat = (b, t0, vel) => noiseHit(b, t0, 0.08, vel, { lo: 0.55, hi: 0.98, env: (t) => Math.exp(-t * 70) });
const rim = (b, t0, vel) => {
  const s = Math.floor(t0 * SR);
  for (let i = 0; i < 0.05 * SR && s + i < b.length; i++) {
    const t = i / SR;
    b[s + i] += vel * (0.6 * Math.sin(TAU * 1720 * t) + 0.3 * Math.sin(TAU * 470 * t)) * Math.exp(-t * 110);
  }
  noiseHit(b, t0, 0.04, vel * 0.5, { lo: 0.2, hi: 0.9, env: (t) => Math.exp(-t * 150) });
};
const kick = (b, t0, vel) => {
  const s = Math.floor(t0 * SR);
  let ph = 0;
  for (let i = 0; i < 0.4 * SR && s + i < b.length; i++) {
    const t = i / SR;
    ph += (TAU * (48 + 70 * Math.exp(-t * 30))) / SR;
    b[s + i] += vel * Math.sin(ph) * Math.exp(-t * 9) * attack(t, 0.002);
  }
};

/** Reverb tipo Freeverb (8 combs + 4 allpass por canal), entrada mono y salida estéreo. */
function reverb(x, { room = 0.83, damp = 0.3 } = {}) {
  const combs = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617], aps = [556, 441, 341, 225];
  return [0, 23].map((spread) => {
    const cs = combs.map((n) => ({ b: new Float32Array(n + spread), i: 0, f: 0 }));
    const as = aps.map((n) => ({ b: new Float32Array(n + spread), i: 0 }));
    const y = new Float32Array(x.length);
    for (let i = 0; i < x.length; i++) {
      const inp = x[i] * 0.015;
      let s = 0;
      for (const c of cs) {
        const o = c.b[c.i];
        c.f = o * (1 - damp) + c.f * damp;
        c.b[c.i] = inp + c.f * room;
        c.i = (c.i + 1) % c.b.length;
        s += o;
      }
      for (const a of as) {
        const o = a.b[a.i];
        a.b[a.i] = s + o * 0.5;
        a.i = (a.i + 1) % a.b.length;
        s = o - s;
      }
      y[i] = s;
    }
    return y;
  });
}

const rms = (b) => { let s = 0; for (const v of b) s += v * v; return Math.sqrt(s / b.length) || 1e-9; };

function saveStereo(name, L, R, peak = 0.8) {
  let m = 0;
  for (let i = 0; i < L.length; i++) m = Math.max(m, Math.abs(L[i]), Math.abs(R[i]));
  const g = peak / m;
  const pcm = Buffer.alloc(L.length * 4);
  for (let i = 0; i < L.length; i++) {
    pcm.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * g)) * 32767), i * 4);
    pcm.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * g)) * 32767), i * 4 + 2);
  }
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVEfmt ", 8); h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(SR, 24); h.writeUInt32LE(SR * 4, 28);
  h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34); h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  fs.writeFileSync(path.join(OUT, name), Buffer.concat([h, pcm]));
  console.log(`  ${name}  ${(L.length / SR).toFixed(1)} s`);
}

// ---------- acordes: [raíz del bajo (MIDI), menor?, voicing sin raíz para el Rhodes] ----------
const CH = {
  // Do mayor (bossa)
  Cmaj9: [36, 0, [59, 62, 64, 67]], Am9: [33, 1, [55, 59, 60, 64]], Dm9: [38, 1, [60, 64, 65, 69]],
  G13: [31, 0, [59, 64, 65, 69]], Em7: [40, 1, [55, 59, 62, 64]], A7b9: [33, 0, [55, 58, 61, 64]],
  A13: [33, 0, [55, 61, 64, 66]], Fm6: [41, 1, [56, 60, 62, 65]],
  // Fa mayor (swing)
  Fmaj9: [41, 0, [57, 60, 64, 67]], D13: [38, 0, [54, 59, 60, 64]], Gm9: [43, 1, [53, 57, 58, 62]],
  C13: [36, 0, [52, 57, 58, 62]], Bbmaj9: [34, 0, [57, 60, 62, 65]], Bbm6: [34, 1, [55, 58, 61, 65]],
  // Mi bemol mayor (city pop)
  Abmaj9: [44, 0, [55, 58, 60, 63]], G7b13: [43, 0, [53, 56, 59, 63]], Cm9: [36, 1, [55, 58, 62, 63]],
  Bbm9: [34, 1, [53, 56, 60, 61]], Eb13: [39, 0, [55, 60, 61, 65]], F13: [41, 0, [55, 57, 62, 63]],
  Fm9: [41, 1, [55, 56, 60, 63]], Bb13: [34, 0, [55, 56, 60, 62]], Ebmaj9: [39, 0, [55, 58, 62, 65]],
  Bb13sus: [34, 0, [55, 56, 60, 63]],
};

// ---------- piezas ----------
// chords: un compás por elemento ("A B" = medio compás cada uno). El último compás es el final.
// lead: compases separados por "|", notas "E5:.5" (duración en negras) y silencios "r:1".
const TRACKS = {
  "ascensor-bossa": {
    bpm: 120, swing: 0, lead: vibes, leadSend: 0.45,
    chords: ["Cmaj9", "Cmaj9", "Am9", "Am9", "Dm9", "G13", "Em7 A7b9", "Dm9 G13",
             "Cmaj9", "A13", "Dm9", "Fm6", "Em7", "A13", "Dm9 G13", "Cmaj9"],
    melody: `r:1 E5:.5 G5:1 D5:.5 E5:1 | B4:2 r:1 A4:.5 B4:.5 | C5:.5 E5:1 B4:.5 C5:1 r:1 | A4:2 r:1 G4:.5 A4:.5 |
             D5:.5 F5:1 A5:.5 G5:1 F5:1 | E5:2 r:1 D5:.5 E5:.5 | G5:1 E5:.5 D5:.5 C#5:1 E5:1 | F5:1.5 E5:.5 D5:2 |
             r:1 E5:.5 G5:1 D5:.5 E5:1 | B4:1 r:.5 C#5:.5 E5:1 G5:1 | F5:2 E5:.5 D5:.5 C5:1 | Ab4:2 r:1 C5:.5 D5:.5 |
             E5:.5 G5:1 B5:1.5 A5:1 | G5:2 E5:1 C#5:1 | D5:.5 F5:1 A5:.5 G5:1 F5:1 | E5:4`,
    comp: (bar) => (bar % 2 === 0 ? [[0, 0.9, 0.75], [1.5, 0.45, 0.6], [3, 0.9, 0.7]] : [[0.5, 0.9, 0.7], [2, 0.45, 0.6], [3.5, 0.45, 0.55]]),
    bassPat: [[0, 0, 1.4, 1], [1.5, 0, 0.45, 0.7], [2, 7, 1.4, 0.9], [3.5, 7, 0.45, 0.7]],
    drums(d, bar, at) {
      for (let k = 0; k < 8; k++) shaker(d, at(k / 2), k % 2 ? 0.55 : 0.35);
      for (const x of bar % 2 === 0 ? [0, 1.5, 3] : [1, 2.5]) rim(d, at(x), 0.5);
      for (const [x, v] of [[0, 0.8], [1.5, 0.35], [2, 0.6], [3.5, 0.35]]) kick(d, at(x), v);
    },
    mix: { keys: -21, bass: -20, drums: -27, lead: -17 },
  },
  "ascensor-swing": {
    bpm: 96, swing: 0.64, lead: vibes, leadSend: 0.45, walking: true,
    chords: ["Fmaj9", "D13", "Gm9", "C13", "Am9", "D13", "Gm9", "C13",
             "Bbmaj9", "Bbm6", "Am9 D13", "Gm9 C13", "Fmaj9"],
    melody: `r:.5 A4:.5 C5:.5 E5:.5 G5:1.5 F5:.5 | F#5:1.5 E5:.5 D5:1 C5:1 | Bb4:.5 D5:.5 F5:.5 A5:.5 G5:1 F5:1 | E5:2 r:1.5 C5:.5 |
             A5:1 G5:.5 E5:.5 C5:1 E5:1 | F#5:1.5 D5:.5 C5:1 A4:1 | Bb4:1 D5:.5 F5:.5 A5:1 G5:1 | E5:1 D5:.5 C5:.5 Bb4:1 r:.5 F5:.5 |
             A5:2 G5:.5 F5:.5 D5:1 | Db5:2 F5:.5 Db5:.5 Bb4:1 | C5:1 E5:1 F#5:1 A5:1 | G5:1.5 F5:.5 E5:.5 G5:.5 Bb5:.5 G5:.5 | A5:4`,
    comp: (bar) => (bar % 2 === 0 ? [[0, 1.2, 0.7], [1.5, 0.35, 0.6]] : [[1, 0.5, 0.6], [2.5, 1, 0.65]]),
    drums(d, bar, at) {
      for (const [x, v] of [[0, 0.7], [1, 0.8], [1.5, 0.45], [2, 0.7], [3, 0.8], [3.5, 0.45]]) ride(d, at(x), v);
      brushTap(d, at(1), 0.55); brushTap(d, at(3), 0.55);
      swish(d, at(0), 0.9, 0.5); swish(d, at(2), 0.9, 0.5);
      kick(d, at(0), 0.3); kick(d, at(2), 0.25);
    },
    mix: { keys: -21, bass: -19, drums: -28, lead: -17 },
  },
  "ascensor-citypop": {
    bpm: 84, swing: 0, lead: rhodes, leadSend: 0.35, leadOctave: bell,
    chords: ["Abmaj9", "G7b13", "Cm9", "Bbm9 Eb13", "Abmaj9", "G7b13", "Cm9 F13", "Fm9 Bb13",
             "Ebmaj9", "Abmaj9 Bb13sus", "Ebmaj9"],
    melody: `r:.5 Eb5:.5 G5:.5 Bb5:1 Ab5:.5 G5:1 | F5:1.5 Eb5:.5 D5:1 B4:1 | C5:.5 D5:.5 Eb5:.5 G5:1.5 r:1 | F5:1 Db5:1 C5:1 Bb4:1 |
             r:.5 Eb5:.5 G5:.5 Bb5:1 C6:.5 Bb5:1 | Ab5:1.5 G5:.5 F5:1 D5:1 | Eb5:1 G5:1 A5:1 G5:1 | Ab5:1.5 G5:.5 F5:1 D5:1 |
             Eb5:.5 F5:.5 G5:1 Bb5:1.5 G5:.5 | C6:1 Bb5:1 Ab5:1 F5:1 | G5:4`,
    comp: () => [[0, 1.4, 0.65], [1.5, 0.4, 0.45], [2.5, 0.9, 0.55], [3.5, 0.4, 0.4]],
    bassPat: [[0, 0, 0.9, 1], [0.75, 12, 0.2, 0.45], [1.5, 0, 0.5, 0.8], [2.5, 0, 0.5, 0.85], [3, 7, 0.45, 0.7], [3.5, 12, 0.4, 0.55]],
    bassBright: 0.25,
    drums(d, bar, at) {
      kick(d, at(0), 0.9); kick(d, at(2.5), 0.7); if (bar % 2) kick(d, at(1.75), 0.4);
      rim(d, at(1), 0.6); rim(d, at(3), 0.6);
      for (let k = 0; k < 8; k++) hat(d, at(k / 2), k % 2 ? 0.6 : 0.35);
      hat(d, at(3.75), 0.3);
    },
    mix: { keys: -22, bass: -19, drums: -27, lead: -18 },
  },
};

function render(name, T) {
  seed = [...name].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const beat = 60 / T.bpm, bars = T.chords.length, len = bars * 4 * beat + 3;
  const sw = (x) => { const k = Math.floor(x), f = x - k; return Math.abs(f - 0.5) < 1e-6 ? k + T.swing : x; };
  const human = (ms) => (rnd() * ms) / 1000;
  const time = (barIdx, x, ms = 8) => Math.max(0, ((barIdx * 4 + (T.swing ? sw(x) : x)) * beat) + human(ms));
  const vary = (v) => v * (1 + 0.1 * rnd());

  // armonía → segmentos {start (en tiempos), len, root, minor, voicing}
  const segs = [];
  T.chords.forEach((bar, i) => {
    const names = bar.split(" ");
    names.forEach((nm, j) => {
      if (!CH[nm]) throw new Error(`${name}: acorde desconocido ${nm}`);
      const [root, minor, v] = CH[nm];
      segs.push({ start: i * 4 + (j * 4) / names.length, len: 4 / names.length, root, minor, v });
    });
  });
  const chordAt = (x) => segs.findLast((s) => s.start <= x + 1e-6);
  const inRange = (n, lo, hi) => { while (n < lo) n += 12; while (n > hi) n -= 12; return n; };

  const keys = bus(len), bassB = bus(len), drums = bus(len), lead = bus(len), leadHi = bus(len);
  const last = bars - 1;

  // Rhodes (acompañamiento)
  for (let bar = 0; bar < last; bar++)
    for (const [x, d, v] of T.comp(bar)) {
      const c = chordAt(bar * 4 + x);
      const t = time(bar, x, 6);
      c.v.forEach((n, k) => rhodes(keys, t + k * 0.004, n, d * beat, vary(v)));
    }
  const fin = segs.at(-1);
  [...fin.v, fin.v[0] + 12].forEach((n, k) => rhodes(keys, last * 4 * beat + k * 0.03, n, 2.6, 0.6));

  // bajo
  if (T.walking) {
    let prev = 41;
    segs.slice(0, -1).forEach((s, i) => {
      const next = segs[i + 1];
      const root = inRange(s.root, 31, 46);
      const third = root + (s.minor ? 3 : 4), fifth = root + 7;
      const tgt = inRange(next.root, 31, 46);
      const approach = tgt + (root > tgt ? 1 : -1);
      const line = s.len === 4 ? [root, prev % 2 ? third : fifth, fifth, approach] : [root, approach];
      line.forEach((n, k) => {
        const x = s.start + k;
        bass(bassB, time(Math.floor(x / 4), x % 4, 6), n, beat * 0.92, vary(k === 0 ? 1 : 0.8));
      });
      prev = root;
    });
  } else {
    for (let bar = 0; bar < last; bar++)
      for (const [x, iv, d, v] of T.bassPat) {
        const c = chordAt(bar * 4 + x);
        const onChange = Math.abs(c.start - (bar * 4 + x)) < 1e-6;
        const n = inRange(c.root, 31, 42) + (onChange && x > 0 ? 0 : iv);
        bass(bassB, time(bar, x, 5), n, d * beat, vary(v), { bright: T.bassBright ?? 0.45 });
      }
  }
  bass(bassB, last * 4 * beat, inRange(fin.root, 31, 42), 3, 0.9, { bright: T.bassBright ?? 0.45 });

  // batería (todo menos el compás final, que lleva un platillo suave)
  for (let bar = 0; bar < last; bar++) T.drums(drums, bar, (x) => time(bar, x, 4));
  ride(drums, last * 4 * beat, 0.6);

  // melodía
  const barsMel = T.melody.split("|").map((b) => b.trim().split(/\s+/));
  if (barsMel.length !== bars) throw new Error(`${name}: ${barsMel.length} compases de melodía para ${bars} acordes`);
  barsMel.forEach((toks, bar) => {
    let x = 0;
    for (const tok of toks) {
      const [nn, ds] = tok.split(":"), d = +ds;
      if (nn !== "r") {
        const t0 = time(bar, x, 10), t1 = time(bar, x + d, 0);
        const v = vary(x === 0 || x === 2 ? 0.85 : 0.72);
        T.lead(lead, t0, parseNote(nn), Math.max(0.12, t1 - t0 - 0.03), v);
        if (T.leadOctave) T.leadOctave(leadHi, t0, parseNote(nn) + 12, Math.max(0.12, t1 - t0), v);
      }
      x += d;
    }
    if (Math.abs(x - 4) > 1e-6) throw new Error(`${name}: el compás ${bar + 1} suma ${x} tiempos`);
  });

  // mezcla: cada bus a su nivel RMS objetivo; Rhodes con autopan (trémolo estéreo), reverb compartida
  const db = (x) => 10 ** (x / 20);
  const level = (b, target) => { const g = db(target) / rms(b); for (let i = 0; i < b.length; i++) b[i] *= g; };
  level(keys, T.mix.keys); level(bassB, T.mix.bass); level(drums, T.mix.drums); level(lead, T.mix.lead);
  if (T.leadOctave) level(leadHi, T.mix.lead - 12);
  const L = new Float32Array(keys.length), R = new Float32Array(keys.length), send = new Float32Array(keys.length);
  for (let i = 0; i < L.length; i++) {
    const t = i / SR, p = 0.5 + 0.22 * Math.sin(TAU * 3.8 * t);
    const ld = lead[i] + leadHi[i];
    L[i] = keys[i] * (1 - p) * 1.4 + bassB[i] + drums[i] * 0.9 + ld * 0.92;
    R[i] = keys[i] * p * 1.4 + bassB[i] + drums[i] * 1.1 + ld * 1.08;
    send[i] = keys[i] * 0.35 + ld * T.leadSend + drums[i] * 0.15 + bassB[i] * 0.04;
  }
  const [rl, rr] = reverb(send);
  // la reverb solo en medios/agudos (paso alto ~300 Hz) para no embarrar los graves;
  // paso alto ~35 Hz en el master, paso bajo suave (~10 kHz) y saturación leve como "cinta"
  let fl = 0, fr = 0, hl = 0, hr = 0, sl = 0, sr = 0;
  const aRev = 1 - Math.exp(-TAU * 300 / SR), aSub = 1 - Math.exp(-TAU * 35 / SR);
  for (let i = 0; i < L.length; i++) {
    hl += aRev * (rl[i] - hl); hr += aRev * (rr[i] - hr);
    const xl = L[i] + (rl[i] - hl) * 2.4, xr = R[i] + (rr[i] - hr) * 2.4;
    sl += aSub * (xl - sl); sr += aSub * (xr - sr);
    fl += 0.75 * (xl - sl - fl); fr += 0.75 * (xr - sr - fr);
    L[i] = Math.tanh(fl * 1.5) / 1.5; R[i] = Math.tanh(fr * 1.5) / 1.5;
  }
  saveStereo(`${name}.wav`, L, R);
}

const only = process.argv[2];
console.log("Música (ascensor/lounge):");
for (const [name, T] of Object.entries(TRACKS)) if (!only || name.includes(only)) render(name, T);
