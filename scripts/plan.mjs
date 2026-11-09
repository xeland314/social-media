// Valida el plan de febrero y genera docs/ideas-febrero-2027.md. Uso: npm run plan
import fs from "node:fs";
import path from "node:path";
import { ROOT, listVideos, readJson, videoDir } from "./lib.mjs";

const d = readJson(path.join(ROOT, "log/ideas.json"));
const R = d.reglas, E = R.esfuerzoPuntos;
const byId = Object.fromEntries(d.backlog.map((b) => [b.id, b]));
const DIAS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
const dateOf = (n, start = R.startDate) => { const x = new Date(`${start}T12:00:00Z`); x.setUTCDate(x.getUTCDate() + n - 1); return x; };
const iso = (x) => x.toISOString().slice(0, 10);
const problems = [], warns = [];

// ---- validaciones ----
const ids = d.backlog.map((b) => b.id);
if (new Set(ids).size !== ids.length) problems.push("ids repetidos en el backlog");
const existing = listVideos().map((n) => readJson(path.join(videoDir(n), "post.json")).title.toLowerCase());
d.backlog.forEach((b) => { if (existing.includes(b.tema.toLowerCase())) problems.push(`${b.id} repite un video existente: ${b.tema}`); if (b.riesgo === "rojo") problems.push(`${b.id} tiene riesgo rojo`); });
if (d.febrero.length !== R.dias) problems.push(`el plan tiene ${d.febrero.length} días y deberían ser ${R.dias}`);
const used = new Set();
let prev = null, run = 0;
d.febrero.forEach((e) => {
  const dt = dateOf(e.dia), dow = dt.getUTCDay();
  if (dow === 0 && !e.recap) problems.push(`día ${e.dia} (domingo) debería ser recopilatorio`);
  if (dow !== 0 && e.recap) problems.push(`día ${e.dia} es recopilatorio pero no es domingo`);
  if (e.recap) { prev = null; run = 0; return; }
  const b = byId[e.id];
  if (!b) { problems.push(`día ${e.dia}: id desconocido ${e.id}`); return; }
  if (used.has(e.id)) problems.push(`día ${e.dia}: ${e.id} repetido`);
  used.add(e.id);
  if (!b.formatos.includes("video")) problems.push(`día ${e.dia}: ${e.id} no tiene formato video`);
  run = prev === b.serie ? run + 1 : 1; prev = b.serie;
  if (run > R.maxMismaSerieSeguida) problems.push(`día ${e.dia}: misma serie (${b.serie}) en días seguidos`);
  if (b.riesgo === "amarillo") warns.push(`día ${e.dia}: ${b.tema} es riesgo amarillo (datos inventados, sin empresa)`);
});
d.radiografias.forEach((r) => { if (!byId[r.id]?.formatos.includes("radiografia")) problems.push(`radiografía ${r.id} sin formato radiografia`); });

// ---- esfuerzo y plan de construcción ----
const plan = d.febrero.filter((e) => !e.recap).map((e) => ({ ...e, b: byId[e.id], fecha: dateOf(e.dia) }));
const efItem = (b) => (b.formatos.includes("video") ? E[b.esfuerzo] + (b.formatos.includes("carrusel") ? R.carruselPuntos : 0) : 0) + (b.formatos.includes("radiografia") ? E.M : 0);
const radOnly = d.radiografias.filter((r) => !plan.some((p) => p.id === r.id));
const total = plan.reduce((s, p) => s + efItem(p.b), 0) + radOnly.reduce((s, r) => s + efItem(byId[r.id]), 0);
const [w0, w1] = R.ventanaConstruccion;
const weeks = Math.ceil(((new Date(w1) - new Date(w0)) / 86400000 + 1) / 7);
const cap = Math.round(weeks * R.capacidadSemanalPuntos * R.factorSeguridad * 10) / 10;
if (total > cap) problems.push(`esfuerzo ${total} pts > capacidad útil ${cap} pts (${weeks} semanas × ${R.capacidadSemanalPuntos} × ${R.factorSeguridad})`);

// asignar cada pieza a una semana de construcción (flujo continuo de puntos, en orden de fecha límite)
const capSem = R.capacidadSemanalPuntos * R.factorSeguridad;
let acumulado = 0; const asign = [];
[...plan, ...radOnly.map((r) => ({ dia: 0, id: r.id, b: byId[r.id], fecha: dateOf(1) }))].sort((a, b) => a.fecha - b.fecha || a.dia - b.dia).forEach((p) => {
  const ef = efItem(p.b); acumulado += ef;
  asign.push({ ...p, semanaBuild: Math.ceil(acumulado / capSem - 1e-9), ef });
});
const ini = new Date(`${w0}T12:00:00Z`);
const finSem = (n) => { const x = new Date(ini); x.setUTCDate(x.getUTCDate() + n * 7 - 1); return iso(x); };
asign.forEach((a) => { const limite = new Date(a.fecha); limite.setUTCDate(limite.getUTCDate() - 1); a.holgura = Math.round((limite - new Date(`${finSem(a.semanaBuild)}T12:00:00Z`)) / 86400000); if (a.holgura < 0) problems.push(`${a.id}: termina el ${finSem(a.semanaBuild)} pero se publica el ${iso(a.fecha)}`); });
if (Math.max(...asign.map((a) => a.semanaBuild)) > weeks) problems.push(`la construcción necesita más de ${weeks} semanas`);

// ---- documento ----
let md = `# Plan de febrero 2027 · ideas y producción\n\n> Generado por \`npm run plan\` desde \`log/ideas.json\` (backlog, plan, reglas). Edita el JSON, no este archivo.\n\n`;
md += `**Periodo:** ${iso(dateOf(1))} → ${iso(dateOf(R.dias))} (${R.dias} días, lunes a domingo).  **Construcción:** ${w0} → ${w1} (${weeks} semanas).\n\n`;
md += `## Reglas del plan\n\n- Un video + un carrusel por día; **domingo = recopilatorio** (4 en el mes).\n- Nunca la misma serie dos días seguidos; se usa cada serie en su semana temática.\n- Una **radiografía** por semana (post largo del portafolio) que alimenta un video de esa semana.\n- Esfuerzo: S=${E.S}, M=${E.M}, L=${E.L} puntos por video; carrusel +${R.carruselPuntos}; radiografía +${E.M}. Capacidad supuesta: ${R.capacidadSemanalPuntos} pts/semana × ${R.factorSeguridad} (margen).\n- Riesgo **amarillo** = nace de un proyecto del trabajo: solo con datos inventados y sin nombres. **Rojo** = no se usa.\n- Carnaval en Ecuador (lunes 8 y martes 9 de febrero de 2027, a confirmar con el calendario oficial): esos días van **programados con antelación**.\n\n`;
md += `## Calendario (${R.dias} días)\n\n| Día | Fecha | Idea | Serie | Esf. | Gancho | Origen |\n|---|---|---|---|---|---|---|\n`;
d.febrero.forEach((e) => {
  const dt = dateOf(e.dia), f = `${DIAS[dt.getUTCDay()]} ${iso(dt).slice(5)}`;
  if (e.recap) { md += `| ${e.dia} | ${f} | ♻️ Recopilatorio de la semana | recap | — | 3 mejores clips + carrusel resumen | — |\n`; return; }
  const b = byId[e.id];
  md += `| ${e.dia} | ${f} | **${b.tema}** (${b.id}) | ${b.serie} | ${b.esfuerzo} | ${b.hook} | ${b.fuente} |\n`;
});
md += `\n## Radiografías (posts del portafolio)\n\n| Semana | Publicar | Tema | Nota |\n|---|---|---|---|\n`;
d.radiografias.forEach((r) => { const b = byId[r.id]; md += `| ${r.semana} | ${iso(dateOf((r.semana - 1) * 7 + 1))} | ${b.tema} (${b.id}) | ${r.nota} |\n`; });
md += `\n## Esfuerzo y construcción\n\n- Total de febrero: **${total} pts**; capacidad útil de la ventana: **${cap} pts** → ${total <= cap ? "✅ cabe" : "⚠️ no cabe"} (holgura ${Math.round((cap - total) * 10) / 10} pts).\n\n| Semana de construcción | Hasta | Piezas | Puntos | Menor holgura |\n|---|---|---|---|---|\n`;
const wkMax = Math.max(...asign.map((a) => a.semanaBuild));
for (let n = 1; n <= wkMax; n++) { const g = asign.filter((a) => a.semanaBuild === n); md += `| ${n} | ${finSem(n)} | ${g.map((a) => a.id).join(", ")} | ${g.reduce((s, a) => s + a.ef, 0)} | ${Math.min(...g.map((a) => a.holgura))} días |\n`; }
md += `\nPuntos de control: **10 de enero** (revisar métricas de noviembre-diciembre y reordenar semanas 3 y 4) y **25 de enero** (todo lo de las semanas 1 a 6 renderizado y programado; la semana 7 es holgura y la capacidad por semana es un supuesto: si una semana se pasa de 11,2 pts, se mueve la pieza a la siguiente).\n`;
const porSerie = {}; plan.forEach((p) => (porSerie[p.b.serie] = (porSerie[p.b.serie] ?? 0) + 1));
md += `\n## Balance por serie (febrero)\n\n${Object.entries(porSerie).map(([s, n]) => `- ${d.series[s]} (${s}): ${n}`).join("\n")}\n`;
const reserva = d.backlog.filter((b) => !used.has(b.id) && b.formatos.includes("video"));
md += `\n## Reserva (${reserva.length} ideas con video, no usadas en febrero)\n\n| Id | Idea | Serie | Esf. | Origen | Riesgo |\n|---|---|---|---|---|---|\n`;
reserva.forEach((b) => { md += `| ${b.id} | ${b.tema} | ${b.serie} | ${b.esfuerzo} | ${b.fuente} | ${b.riesgo} |\n`; });
if (warns.length) md += `\n## Avisos\n\n${warns.map((w) => `- ${w}`).join("\n")}\n`;
fs.writeFileSync(path.join(ROOT, "docs/ideas-febrero-2027.md"), md);
console.log(`✓ docs/ideas-febrero-2027.md · ${plan.length} videos, ${d.backlog.length} ideas, ${total} pts de ${cap}`);
if (problems.length) { console.error("✗ Problemas:\n- " + problems.join("\n- ")); process.exit(1); }
