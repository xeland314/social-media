// Calendario de 30 días: fuente log/calendario.json → fechas en cada post.json + docs/calendario-30-dias.md
// Uso: npm run calendar
import fs from "node:fs";
import path from "node:path";
import { ROOT, listVideos, readJson, videoDir } from "./lib.mjs";

const cal = readJson(path.join(ROOT, "log/calendario.json"));
const names = listVideos();
const byId = Object.fromEntries(names.map((n) => [n.slice(0, 3), n]));
const DIAS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
const dateOf = (d) => { const x = new Date(`${cal.startDate}T12:00:00Z`); x.setUTCDate(x.getUTCDate() + d - 1); return x; };
const iso = (x) => x.toISOString().slice(0, 10);

const used = new Set(), problems = [];
let md = `# Calendario definitivo · 30 días (${iso(dateOf(1))} → ${iso(dateOf(cal.plan.length))})\n\n> Generado por \`npm run calendar\` desde \`log/calendario.json\`. Para mover fechas, cambia \`startDate\` allí.\n\n`;
md += "Reglas: **un video y un carrusel por día**, mismo tema. Carrusel con Cover Creator (tema ambercat) o slides.c; publicar en IG, Facebook, Threads y RedNote; el video, en las seis redes. Todo con datos ficticios en la serie TI.\n\n";
md += "| Día | Fecha | Tema | Serie | Video | Carrusel (portada → cierre) |\n|---|---|---|---|---|---|\n";
for (const e of cal.plan) {
  const d = dateOf(e.dia), fecha = `${DIAS[d.getUTCDay()]} ${iso(d).slice(5)}`;
  let estado = "—";
  if (e.video) {
    const n = byId[e.video];
    if (!n) { problems.push(`día ${e.dia}: no existe el video ${e.video}`); continue; }
    used.add(n);
    const pp = path.join(videoDir(n), "post.json"), p = readJson(pp);
    p.calendarDay = e.dia; p.publishDate = iso(d);
    fs.writeFileSync(pp, JSON.stringify(p, null, 2) + "\n");
    estado = `✅ ${e.video} · ${p.durationSec ?? "?"} s`;
  } else if (e.build) estado = "🛠️ por construir";
  else estado = "♻️ recopilatorio (clips + carrusel)";
  md += `| ${e.dia} | ${fecha} | ${e.tema} | ${e.serie} | ${estado} | ${e.carrusel} |\n`;
}
// Piezas de otros planes (p. ej. febrero 2027, campo "plan" en post.json) no cuentan como "sin día".
const otroPlan = (n) => !!readJson(path.join(videoDir(n), "post.json")).plan;
const sinUsar = names.filter((n) => !used.has(n) && !otroPlan(n));
if (sinUsar.length) problems.push(`videos sin día asignado: ${sinUsar.join(", ")}`);

const nb = cal.plan.filter((e) => e.build), firstNeed = Math.min(...nb.map((e) => e.dia));
md += `\n## Qué hay que construir y para cuándo\n\n`;
nb.forEach((e) => { md += `- Día ${e.dia} (${iso(dateOf(e.dia))}): **${e.tema}** — debe estar renderizado la víspera (día ${e.dia - 1}).\n`; });
md += `\nEl primero se necesita el día ${firstNeed}: construirlo durante la semana 1, que ya tiene todo hecho.\n\n`;
md += `## Ritmo y revisión\n\n- Lunes a sábado: video + carrusel del día. **Domingo: recopilatorio** (3 mejores clips de la semana + carrusel resumen).\n- Anotar por video: retención a 3 s, guardados y compartidos (columna libre en \`log/publicaciones.csv\`).\n- **Día 14:** reordenar las semanas 3 y 4 según lo que mejor rindió; no cambiar el esfuerzo, solo el orden.\n- Serie TI: nada de clientes, equipos, redes ni capturas reales; datos de ejemplo (\`example.com\`, \`203.0.113.0/24\`).\n- Los 18 videos ya renderizados cubren 18 de los 30 días; los 7 de la serie TI por construir y los 5 recopilatorios completan el mes.\n`;
fs.writeFileSync(path.join(ROOT, "docs/calendario-30-dias.md"), md);
console.log(`✓ docs/calendario-30-dias.md (${cal.plan.length} días, ${used.size} videos asignados)`);
if (problems.length) { console.error("⚠\n- " + problems.join("\n- ")); process.exit(1); }
