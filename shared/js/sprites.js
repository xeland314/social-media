/* Sprites pixel-art generados por código (sin imágenes externas): SPR.attacker(), SPR.envelope().
   Cada sprite devuelve un SVG con capas (<g data-layer="...">) que se activan con GSAP. */
window.SPR = (function () {
  const P = { U: "#00add8", u: "#007d9c", H: "#2b2b36", h: "#4a4a5e", S: "#edc699", D: "#b88a5e", K: "#14100d", W: "#f9e6c6", R: "#ff5f57", G: "#7cfb4c", Y: "#f2c94c", O: "#f1a449", B: "#483025", L: "#9c9e8f" };
  const grid = (w, h) => Array.from({ length: h }, () => Array(w).fill(null));
  const put = (g, x, y, c) => { if (g[y] && x >= 0 && x < g[0].length) g[y][x] = c; };
  const rects = (g) => g.map((row, y) => row.map((c, x) => (c ? `<rect x="${x}" y="${y}" width="1" height="1" fill="${P[c]}"/>` : "")).join("")).join("");
  const layer = (name, g) => `<g data-layer="${name}">${rects(g)}</g>`;

  /** Atacante encapuchado, visto de frente. Capas: base, calm, angry, vein. */
  function attacker(scale = 10) {
    const W = 24, H = 26, base = grid(W, H);
    const inHood = (x, y) => ((x + 0.5 - 12) / 9.5) ** 2 + ((y + 0.5 - 10) / 9.5) ** 2 <= 1;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (inHood(x, y)) base[y][x] = !inHood(x - 1, y) || !inHood(x + 1, y) || !inHood(x, y - 1) ? "h" : "H";
    }
    for (let y = 18; y < H; y++) { // hombros
      const half = Math.min(11, 6 + (y - 18));
      for (let x = 12 - half; x < 12 + half; x++) put(base, x, y, x === 12 - half || x === 11 + half || y === 18 ? "h" : "H");
    }
    for (let y = 6; y <= 15; y++) for (let x = 7; x <= 16; x++) put(base, x, y, y < 8 ? "D" : "S"); // cara
    [[10, 19], [10, 20], [13, 19], [13, 20]].forEach(([x, y]) => put(base, x, y, "W")); // cordones

    const calm = grid(W, H);
    [[8, 9], [9, 9], [8, 10], [9, 10], [14, 9], [15, 9], [14, 10], [15, 10]].forEach(([x, y]) => put(calm, x, y, "W"));
    [[9, 10], [14, 10]].forEach(([x, y]) => put(calm, x, y, "K"));
    [[10, 13], [11, 13], [12, 13], [13, 13], [14, 12]].forEach(([x, y]) => put(calm, x, y, "K")); // sonrisa de lado

    const angry = grid(W, H);
    [[8, 10], [9, 10], [14, 10], [15, 10]].forEach(([x, y]) => put(angry, x, y, "W"));
    [[9, 10], [14, 10]].forEach(([x, y]) => put(angry, x, y, "K"));
    [[7, 7], [8, 7], [9, 8], [10, 8], [16, 7], [15, 7], [14, 8], [13, 8]].forEach(([x, y]) => put(angry, x, y, "K")); // cejas
    [[9, 14], [10, 13], [11, 13], [12, 13], [13, 13], [14, 14]].forEach(([x, y]) => put(angry, x, y, "K")); // ceño
    [[10, 12], [11, 12], [12, 12], [13, 12]].forEach(([x, y]) => put(angry, x, y, "W")); // dientes apretados

    const vein = grid(W, H);
    [[18, 4], [19, 5], [20, 4], [18, 6], [20, 6]].forEach(([x, y]) => put(vein, x, y, "R"));

    return `<svg viewBox="0 0 ${W} ${H}" width="${W * scale}" height="${H * scale}" style="shape-rendering:crispEdges">${layer("base", base)}${layer("calm", calm)}${layer("angry", angry)}${layer("vein", vein)}</svg>`;
  }

  /** Sobre de correo (16×11). Capas: body, seal-ok, seal-bad. */
  function envelope(scale = 6) {
    const W = 16, H = 11, b = grid(W, H);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) b[y][x] = x === 0 || x === W - 1 || y === 0 || y === H - 1 ? "B" : "W";
    for (let i = 1; i < 7; i++) { put(b, i, i, "L"); put(b, W - 1 - i, i, "L"); }
    const bad = grid(W, H);
    [[6, 5], [7, 6], [8, 6], [9, 5], [6, 7], [9, 7]].forEach(([x, y]) => put(bad, x, y, "R"));
    return `<svg viewBox="0 0 ${W} ${H}" width="${W * scale}" height="${H * scale}" style="shape-rendering:crispEdges">${layer("body", b)}${layer("bad", bad)}</svg>`;
  }

  /** Gopher (mascota de Go), 16×14. */
  function gopher(scale = 8) {
    const W = 16, H = 14, g = grid(W, H);
    const inE = (x, y, cx, cy, rx, ry) => ((x + 0.5 - cx) / rx) ** 2 + ((y + 0.5 - cy) / ry) ** 2 <= 1;
    const shape = (x, y) => inE(x, y, 8, 7.5, 7.4, 6.2) || inE(x, y, 2.5, 2, 2.2, 2.2) || inE(x, y, 13.5, 2, 2.2, 2.2);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (shape(x, y)) g[y][x] = !shape(x - 1, y) || !shape(x + 1, y) || !shape(x, y - 1) || !shape(x, y + 1) ? "u" : "U";
    [[4, 4], [5, 4], [4, 5], [5, 5], [10, 4], [11, 4], [10, 5], [11, 5]].forEach(([x, y]) => put(g, x, y, "W"));
    [[5, 5], [10, 5]].forEach(([x, y]) => put(g, x, y, "K"));
    [[7, 8], [8, 8]].forEach(([x, y]) => put(g, x, y, "K"));
    [[7, 10], [8, 10], [7, 11], [8, 11]].forEach(([x, y]) => put(g, x, y, "W"));
    return `<svg viewBox="0 0 ${W} ${H}" width="${W * scale}" height="${H * scale}" style="shape-rendering:crispEdges">${layer("base", g)}</svg>`;
  }

  /** Paquete/caja (11×10) con cinta. */
  function pbox(scale = 7) {
    const W = 11, H = 10, g = grid(W, H);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) g[y][x] = x === 0 || x === W - 1 || y === 0 || y === H - 1 ? "B" : "O";
    for (let y = 1; y < H - 1; y++) g[y][5] = "W";
    for (let x = 1; x < W - 1; x++) g[3][x] = "S";
    return `<svg viewBox="0 0 ${W} ${H}" width="${W * scale}" height="${H * scale}" style="shape-rendering:crispEdges">${layer("base", g)}</svg>`;
  }
  return { attacker, envelope, gopher, pbox };
})();
