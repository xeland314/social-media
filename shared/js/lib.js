/* Helpers GSAP deterministas para composiciones Hyperframes.
   Todo cambio de estado se agenda con tl.set(...) en un instante: así el
   render puede saltar a cualquier frame sin depender de timers. Sin Date.now ni Math.random. */
window.XF = (function () {
  const ease = (n) => `steps(${n})`; // movimiento a saltos, estilo 8-bit

  /** Construye líneas de código (html con spans .tok-*) dentro de `el`. */
  function buildCode(el, lines) {
    el.innerHTML = lines
      .map((html, i) => `<div class="code-line" data-id="${i + 1}"><span class="code-ln">${i + 1}</span><span>${html}</span></div>`)
      .join("");
    return [...el.children];
  }

  /** Resalta una sola línea a partir del instante t (id=0 apaga todas). */
  function activeLine(tl, rows, id, t, color = "var(--accent)", bg = "var(--accent-dim)") {
    rows.forEach((r, i) => {
      const on = i + 1 === id;
      tl.set(r, { opacity: on ? 1 : 0.55, backgroundColor: on ? bg : "transparent", borderLeftColor: on ? color : "transparent" }, t);
    });
  }

  /** Muestra solo `target` dentro de `group` a partir de t. */
  function only(tl, group, target, t) {
    group.forEach((el) => tl.set(el, { opacity: el === target ? 1 : 0 }, t));
  }

  /** Escribe una fila de terminal con efecto máquina de escribir a saltos. */
  function typeRow(tl, row, chars, t, dur = 0.6) {
    tl.set(row, { opacity: 1, width: 0 }, t);
    tl.to(row, { width: `${chars}ch`, duration: dur, ease: ease(chars) }, t);
  }

  /** Aparición instantánea (para filas que ya "salieron" del programa). */
  function pop(tl, el, t) {
    tl.set(el, { opacity: 1 }, t);
  }

  /** Crea spans apilados (uno visible a la vez con XF.only): cambia texto sin tl.call (seek-safe). */
  function stack(el, texts) {
    el.innerHTML = texts.map((t) => `<span class="stk">${t}</span>`).join("");
    return [...el.children];
  }

  /** Celda de bit (r/w/x) con estado: on | off | cut (se quita) | mask. */
  function bitState(tl, el, state, t) {
    const S = {
      on: { backgroundColor: "rgba(124,251,76,.2)", borderColor: "#7cfb4c", color: "#f9e6c6" },
      off: { backgroundColor: "#0b0b0b", borderColor: "#2e2e2e", color: "#8c7a68" },
      cut: { backgroundColor: "rgba(255,95,87,.2)", borderColor: "#ff5f57", color: "#ffb4ae" },
      mask: { backgroundColor: "rgba(192,132,252,.2)", borderColor: "#c084fc", color: "#f9e6c6" },
    };
    tl.set(el, S[state], t);
  }

  return { ease, buildCode, activeLine, only, typeRow, pop, stack, bitState };
})();
