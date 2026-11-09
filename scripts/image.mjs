// Genera una imagen con OpenRouter y la guarda en assets/images/.
// Uso: npm run image -- "prompt" nombre-de-archivo [modelo]
// La clave se lee de OPENROUTER_API_KEY (entorno) o de .env (ignorado por git). Nunca se imprime.
import fs from "node:fs";
import path from "node:path";
import { ROOT } from "./lib.mjs";

const MIN_BALANCE = 0.05; // dólares: no gastar si queda menos
const DEFAULT_MODEL = "black-forest-labs/flux.2-klein-4b"; // ~0,014 USD por megapíxel (verificar en openrouter.ai)

function loadKey() {
  if (process.env.OPENROUTER_API_KEY) return process.env.OPENROUTER_API_KEY.trim();
  const env = path.join(ROOT, ".env");
  if (fs.existsSync(env)) {
    const m = fs.readFileSync(env, "utf8").match(/^\s*OPENROUTER_API_KEY\s*=\s*(.+)\s*$/m);
    if (m) return m[1].replace(/^["']|["']$/g, "").trim();
  }
  return null;
}

const [prompt, name, model = DEFAULT_MODEL] = process.argv.slice(2);
if (!prompt || !name) {
  console.error('Uso: npm run image -- "prompt" nombre-de-archivo [modelo]');
  process.exit(1);
}
const key = loadKey();
if (!key) {
  console.error("Falta OPENROUTER_API_KEY (variable de entorno o archivo .env en la raíz de social-media).");
  process.exit(1);
}
const headers = { Authorization: `Bearer ${key}`, "Content-Type": "application/json" };

// 1) Saldo restante (si el endpoint no responde, se continúa sin la comprobación).
try {
  const r = await fetch("https://openrouter.ai/api/v1/credits", { headers });
  if (r.ok) {
    const { data } = await r.json();
    const left = data.total_credits - data.total_usage;
    console.log(`Saldo: ${left.toFixed(3)} USD`);
    if (left < MIN_BALANCE) { console.error(`Saldo menor a ${MIN_BALANCE} USD: no se genera.`); process.exit(1); }
  }
} catch { /* sin red al endpoint de créditos */ }

// 2) Generación
const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers,
  body: JSON.stringify({ model, messages: [{ role: "user", content: prompt }], modalities: ["image"] }),
});
const json = await res.json();
if (!res.ok) { console.error("Error de OpenRouter:", JSON.stringify(json.error ?? json).slice(0, 400)); process.exit(1); }

const url = json.choices?.[0]?.message?.images?.[0]?.image_url?.url;
if (!url?.startsWith("data:image/")) { console.error("La respuesta no trae imagen. Modelo sin salida de imagen?"); process.exit(1); }
const ext = url.slice(11, url.indexOf(";")).replace("jpeg", "jpg");
const file = path.join(ROOT, "assets/images", `${name}.${ext}`);
fs.writeFileSync(file, Buffer.from(url.split(",")[1], "base64"));

// 3) Registro de costo
const cost = json.usage?.cost ?? "";
const logf = path.join(ROOT, "log/image-costs.csv");
if (!fs.existsSync(logf)) fs.writeFileSync(logf, "fecha,modelo,archivo,costo_usd,prompt\n");
fs.appendFileSync(logf, `${new Date().toISOString()},${model},${path.basename(file)},${cost},"${prompt.replace(/"/g, '""').slice(0, 200)}"\n`);
console.log(`✓ ${path.relative(ROOT, file)}  (costo: ${cost || "no informado"} USD)`);
