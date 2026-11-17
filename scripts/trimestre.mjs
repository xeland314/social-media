// Plan de 3 meses: une el mes 1 (log/calendario.json), el puente (log/puente.json) y febrero (log/ideas.json),
// valida fechas, ritmo y capacidad, y genera docs/plan-3-meses.md. Uso: npm run trimestre
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { ROOT, listVideos, readJson, videoDir } from "./lib.mjs";

const cal = readJson(path.join(ROOT, "log/calendario.json"));
const ideas = readJson(path.join(ROOT, "log/ideas.json"));
const pu = readJson(path.join(ROOT, "log/puente.json"));
const PRES = path.join(os.homedir(), "Documentos/50-conocimiento/presentaciones");
const DIAS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
const day = (s) => new Date(`${s}T12:00:00Z`);
const iso = (x) => x.toISOString().slice(0, 10);
const add = (s, n) => { const x = day(s); x.setUTCDate(x.getUTCDate() + n); return iso(x); };
const fmt = (s) => `${DIAS[day(s).getUTCDay()]} ${s.slice(5)}`;
const byId = Object.fromEntries(ideas.backlog.map((b) => [b.id, b]));
const R = ideas.reglas, E = R.esfuerzoPuntos;
const problems = [], warns = [];

// ---- línea de tiempo unificada: fecha → {fase, tipo, tema} ----
const T = new Map();
const put = (fecha, e) => { if (T.has(fecha)) problems.push(`${fecha}: dos piezas el mismo día`); T.set(fecha, e); };
const videos = listVideos();
const hasComp = (id) => { const n = videos.find((v) => v.startsWith(`${id}-`)); return n && fs.existsSync(path.join(videoDir(n), "index.html")); };
for (const e of cal.plan) {
  const f = add(cal.startDate, e.dia - 1);
  put(f, { fase: 1, tipo: e.recap || !e.video ? "recap" : hasComp(e.video) ? "video+carrusel" : "carrusel", tema: e.tema });
}
for (const e of ideas.febrero) {
  const f = add(R.startDate, e.dia - 1);
  if (f > pu.horizonte[1]) continue;
  put(f, { fase: 3, tipo: e.recap ? "recap" : "video+carrusel", tema: e.recap ? "Recopilatorio de la semana" : byId[e.id].tema });
}

// ---- puente: validaciones ----
const enFebrero = new Set(ideas.febrero.map((e) => e.id).filter(Boolean));
let ptsPuente = 0, prev = "";
for (const p of pu.piezas) {
  const dow = day(p.fecha).getUTCDay();
  if (p.fecha < pu.inicio || p.fecha > pu.fin) problems.push(`${p.fecha}: fuera del puente`);
  if (p.fecha <= prev) problems.push(`${p.fecha}: piezas desordenadas o repetidas`);
  prev = p.fecha;
  if (pu.reglas.feriados.includes(p.fecha)) problems.push(`${p.fecha}: es feriado`);
  if (p.tipo === "carrusel" && ![1, 3, 5].includes(dow)) problems.push(`${p.fecha}: carrusel fuera de lun/mié/vie`);
  if (p.tipo !== "carrusel" && dow !== 6) problems.push(`${p.fecha}: ${p.tipo} fuera de sábado`);
  if (p.idea) {
    const b = byId[p.idea];
    if (!b) problems.push(`${p.fecha}: idea desconocida ${p.idea}`);
    else if (enFebrero.has(p.idea)) problems.push(`${p.fecha}: ${p.idea} ya está en febrero`);
    else { p.pts = E[b.esfuerzo] + R.carruselPuntos; if (b.riesgo !== "verde") warns.push(`${p.fecha}: ${b.tema} es riesgo ${b.riesgo}`); }
  } else if (p.video) { if (!hasComp(p.video)) problems.push(`${p.fecha}: no existe el video ${p.video}`); p.pts = 0; }
  else p.pts = p.tipo === "carrusel" ? pu.reglas.carruselPuntos : 0;
  if (p.tipo === "carrusel" && !/^(workspace|videos)\//.test(p.fuente)) {
    const first = p.fuente.split(/ \(|\/(?=[^/]*$)/)[0];
    if (fs.existsSync(PRES) && !fs.existsSync(path.join(PRES, first)) && !fs.existsSync(path.join(PRES, p.fuente.split(" (")[0]))) warns.push(`${p.fecha}: no encuentro la fuente ${p.fuente}`);
  }
  ptsPuente += p.pts;
  put(p.fecha, { fase: 2, tipo: p.tipo === "video" ? "video+carrusel" : p.tipo, tema: p.tema });
}

// ---- capacidad: lo que falta de febrero + el puente, en la misma ventana de construcción ----
const ef = (b) => (b.formatos.includes("video") ? E[b.esfuerzo] + (b.formatos.includes("carrusel") ? R.carruselPuntos : 0) : 0) + (b.formatos.includes("radiografia") ? E.M : 0);
const febIds = new Set([...ideas.febrero.filter((e) => e.id).map((e) => e.id), ...ideas.radiografias.map((r) => r.id)]);
const totalFeb = [...febIds].reduce((s, id) => s + ef(byId[id]), 0);
const hechos = videos.map((n) => readJson(path.join(videoDir(n), "post.json"))).filter((p) => p.plan === "febrero-2027" && p.status !== "pending" && p.publishDate)
  .map((p) => ideas.febrero.find((e) => add(R.startDate, e.dia - 1) === p.publishDate)?.id).filter(Boolean);
const ptsHechos = hechos.reduce((s, id) => s + E[byId[id].esfuerzo] + R.carruselPuntos, 0);
const [w0, w1] = R.ventanaConstruccion;
const semanas = Math.ceil(((day(w1) - day(w0)) / 86400000 + 1) / 7);
const cap = Math.round(semanas * R.capacidadSemanalPuntos * R.factorSeguridad * 10) / 10;
const necesario = totalFeb - ptsHechos + ptsPuente;
if (necesario > cap) problems.push(`esfuerzo ${necesario} pts > capacidad ${cap} pts`);

// ---- documento ----
const [h0, h1] = pu.horizonte;
const FASE = { 1: "Mes 1 · arranque", 2: "Puente", 3: "Febrero · semanas temáticas" };
let md = `# Plan de publicación · 3 meses (${h0} → ${h1})\n\n> Generado por \`npm run trimestre\` desde \`log/calendario.json\`, \`log/puente.json\` y \`log/ideas.json\`. Edita los JSON, no este archivo.\n\n`;
md += `## Resumen\n\n| Fase | Fechas | Ritmo | Estado | Detalle |\n|---|---|---|---|---|\n`;
md += `| **1. Arranque** | ${h0} → ${add(pu.inicio, -1)} | Diario: video + carrusel; domingo recopilatorio | Todo construido | \`docs/calendario-30-dias.md\` |\n`;
md += `| **2. Puente** | ${pu.inicio} → ${pu.fin} | 4 por semana: carrusel lun/mié/vie + video el sábado | Por producir (${ptsPuente} pts) | este documento |\n`;
md += `| **3. Febrero** | ${R.startDate} → ${h1} (sigue hasta el 28) | Diario: video + carrusel; domingo recopilatorio | ${hechos.length} de ${ideas.febrero.filter((e) => e.id).length} videos hechos | \`docs/ideas-febrero-2027.md\` |\n\n`;
md += `**Por qué existe el puente:** sin él, la cuenta queda en silencio del ${pu.inicio} al ${pu.fin} (${Math.round((day(pu.fin) - day(pu.inicio)) / 86400000) + 1} días) mientras se construye febrero. `;
md += `El puente publica casi sin gastar capacidad: reutiliza presentaciones ya escritas (carrusel = ${pu.reglas.carruselPuntos} pts) y videos ya renderizados.\n\n`;

md += `## Las 13 semanas\n\n| Sem. | Lunes | Fase | Videos | Carruseles solos | Recap / rescate | Temas |\n|---|---|---|---|---|---|---|\n`;
for (let w = 0, lunes = h0; lunes <= h1; w++, lunes = add(lunes, 7)) {
  const es = [...Array(7)].map((_, i) => T.get(add(lunes, i))).filter(Boolean);
  const n = (t) => es.filter((e) => e.tipo === t).length;
  const temas = es.filter((e) => !["recap", "rescate", "avance"].includes(e.tipo)).map((e) => e.tema.split(":")[0]).join(" · ");
  md += `| ${w + 1} | ${lunes.slice(5)} | ${[...new Set(es.map((e) => FASE[e.fase].split(" ·")[0]))].join(" → ")} | ${n("video+carrusel")} | ${n("carrusel")} | ${n("recap") + n("rescate") + n("avance")} | ${temas} |\n`;
}

const ICON = { carrusel: "🖼️ carrusel", video: "🎬 video + carrusel", rescate: "♻️ rescate", avance: "📣 avance" };
md += `\n## Puente, día por día\n\nRitmo: ${pu.reglas.ritmo}. Feriados sin publicación: ${pu.reglas.feriados.join(", ")}.\n\n| Fecha | Formato | Tema | Serie | Pts | Fuente | Enlaza con |\n|---|---|---|---|---|---|---|\n`;
for (const p of pu.piezas) md += `| ${fmt(p.fecha)} | ${ICON[p.tipo]} | **${p.tema}**${p.idea ? ` (${p.idea})` : ""} | ${p.serie} | ${p.pts || "—"} | ${p.fuente} | ${p.enlaza ?? "—"} |\n`;
const cuenta = (t) => pu.piezas.filter((p) => p.tipo === t).length;
md += `\nTotal del puente: ${cuenta("carrusel")} carruseles, ${cuenta("video")} videos (${pu.piezas.filter((p) => p.idea).length} nuevos), ${cuenta("rescate")} rescates y ${cuenta("avance")} avance → **${ptsPuente} pts**.\n`;
md += `\n- **Carrusel desde presentación:** el Markdown ya existe; se pasa a Cover Creator (\`npm run carousel\`) con el tema light y acento naranja. Recortar a 6–8 láminas: una idea por lámina.\n`;
md += `- **Rescate:** se republica el video del mes 1 con mejores métricas, en su variante Inter (\`render-inter.mp4\`), con texto nuevo. No cuesta producción.\n`;
md += `- **Enlaza con:** el texto del post menciona ese video o idea, para llevar tráfico a lo ya publicado o preparar lo que viene.\n`;

md += `\n## Capacidad\n\n| Concepto | Puntos |\n|---|---|\n| Febrero completo | ${totalFeb} |\n| Ya construido de febrero (${hechos.join(", ") || "—"}) | −${ptsHechos} |\n| Puente | +${ptsPuente} |\n| **Necesario en la ventana ${w0} → ${w1}** | **${necesario}** |\n| Capacidad útil (${semanas} semanas × ${R.capacidadSemanalPuntos} × ${R.factorSeguridad}) | ${cap} |\n| Holgura | ${Math.round((cap - necesario) * 10) / 10} |\n`;
md += `\nLa holgura es pequeña: si una semana se atrasa, se recortan primero los videos nuevos del sábado (pasan a rescate), nunca los de febrero.\n`;

md += `\n## Puntos de control\n\n- **${add(pu.inicio, -3)}:** primeros 3 carruseles del puente listos y programados antes de que termine el mes 1.\n- **2026-12-20:** elegir los dos rescates con las métricas del mes 1 y dejar programada la semana de Navidad y Año Nuevo.\n- **2027-01-10:** revisar métricas; si los carruseles rinden mejor que los videos (o al revés), ajustar el ritmo de febrero.\n- **2027-01-25:** febrero semanas 1 a 3 renderizado y programado (ya previsto en el plan de febrero).\n`;

md += `\n## Reserva de carruseles (presentaciones no usadas)\n\n| Tema | Fuente | Riesgo |\n|---|---|---|\n${pu.reserva.map((r) => `| ${r.tema} | ${r.fuente} | ${r.riesgo} |`).join("\n")}\n`;
md += `\n## Ideas nuevas salidas de los proyectos (para marzo en adelante)\n\nNo están en el backlog de \`log/ideas.json\`; se agregan allí cuando se decida usarlas. Amarillo = nace de un proyecto del trabajo: solo con datos inventados y sin nombres.\n\n| Tema | Proyecto | Riesgo |\n|---|---|---|\n${pu.ideasNuevas.map((r) => `| ${r.tema} | ${r.fuente} | ${r.riesgo} |`).join("\n")}\n`;
if (warns.length) md += `\n## Avisos\n\n${warns.map((w) => `- ${w}`).join("\n")}\n`;

fs.writeFileSync(path.join(ROOT, "docs/plan-3-meses.md"), md);
console.log(`✓ docs/plan-3-meses.md · puente ${pu.piezas.length} piezas (${ptsPuente} pts) · necesario ${necesario} de ${cap} pts`);
if (warns.length) console.warn("Avisos:\n- " + warns.join("\n- "));
if (problems.length) { console.error("✗ Problemas:\n- " + problems.join("\n- ")); process.exit(1); }
