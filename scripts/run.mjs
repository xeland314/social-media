// Ejecuta un subcomando de hyperframes dentro de un video: npm run check -- 001
import { spawnSync } from "node:child_process";
import { listVideos, resolveVideo, videoDir } from "./lib.mjs";

const [cmd, ...rest] = process.argv.slice(2);
const targets = rest.length ? rest.filter((a) => !a.startsWith("-")).map(resolveVideo) : listVideos();
const flags = rest.filter((a) => a.startsWith("-"));
let failed = 0;
for (const t of targets) {
  console.log(`\n▶ ${cmd} · ${t}`);
  const r = spawnSync("npx", ["hyperframes", cmd, ...flags], { cwd: videoDir(t), stdio: "inherit" });
  if (r.status) failed++;
}
process.exit(failed ? 1 : 0);
