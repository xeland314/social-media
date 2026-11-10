// Copia una carpeta a un celular montado por MTP (gio no copia carpetas con -r en esta versión).
// Uso: node scripts/push-mtp.mjs <carpeta-local> "<destino mtp://.../Tarjeta SD>"
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const [src, dstBase] = process.argv.slice(2);
if (!src || !dstBase) { console.error('Uso: node scripts/push-mtp.mjs <carpeta> "<mtp://...>"'); process.exit(1); }
const enc = (p) => p.split("/").map(encodeURIComponent).join("/");
const base = dstBase.replace(/\/$/, "");
const root = path.basename(path.resolve(src));
const uri = (rel) => `${base}/${enc(path.posix.join(root, rel))}`;
const gio = (...a) => spawnSync("gio", a, { encoding: "utf8" });
let files = 0, fail = 0;
gio("mkdir", "-p", uri(""));
(function walk(rel) {
  for (const e of fs.readdirSync(path.join(src, rel), { withFileTypes: true })) {
    const r = path.posix.join(rel, e.name);
    if (e.isDirectory()) { gio("mkdir", "-p", uri(r)); walk(r); }
    else {
      const x = gio("copy", "-p", "--", path.join(src, r), uri(r));
      if (x.status) { fail++; console.error(`✗ ${r}: ${x.stderr.trim()}`); } else files++;
    }
  }
})("");
console.log(`✓ ${files} archivos copiados${fail ? `, ${fail} con error` : ""} → ${base}/${root}`);
process.exit(fail ? 1 : 0);
