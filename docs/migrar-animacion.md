# Migrar una animación del portafolio a Hyperframes

Ejemplo hecho: `videos/001-fork-system-call` (desde `xeland314-portfolio/src/components/animations/fork-system-call`).

1. `npm run new -- <slug> "<Título>" <serie>`.
2. **Código**: copia `FORK_CODE` de `sequence.ts` a `XF.buildCode(el, [...])` (clases `anim-tok-*` → `tok-*`).
3. **Tiempos**: cada `await sleep(TIMING.x)` del `controller.ts` se vuelve un instante absoluto en la línea de tiempo
   (suma acumulada). Cada `setStatus/setState/classList` pasa a `tl.set(...)` o `XF.only(...)`.
4. **SVG/diagrama**: se copia tal cual; quitar `border-radius`, usar `stroke` entero y fuentes ≥ 28 px finales.
5. **Efectos CSS con `animation:`** (blink, marcha de guiones) → tween GSAP con `steps(n)` (el render salta frames).
6. `npm run check`, `npm run snapshot`, `npm run render`.

Portadas: fork, git merge/rebase, tcp/udp, && vs ||, sigterm, chmod, umask, symlink, go channels, go defer, fds. Python: decorator, yield, match, with. Pendiente: http2 (multiplexación, hpack).
