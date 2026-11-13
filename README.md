# social-media · @xeland314

Un video y un carrusel diarios, con código y estilos compartidos.

```
shared/            ← única fuente de estilo y código (todo video lo reutiliza)
  styles/          tokens.css (fondo negro + acento naranja) · pixel.css · code.css · fonts.css · font-inter.css
  fonts/           Press Start 2P · Silkscreen · VT323 · JetBrains Mono · Inter (OFL, locales)
  sprites/         gato.svg · gato-sin-fondo.svg (mascota)
  js/lib.js        helpers GSAP deterministas (XF.*)
videos/NNN-slug/   un proyecto Hyperframes por video
  index.html       la composición            post.json   textos por red + hashtags + estado
  render.mp4       (no versionado)           thumb.png   miniatura (se ve en el explorador)
  shared → ../../shared   (enlace simbólico: Hyperframes solo sirve la carpeta del video)
carruseles/NNN-slug/   salida de Cover Creator / slides.c del MISMO tema (mismo NNN)
log/               hashtags.json · platforms.json · LOG.md y publicaciones.csv (generados)
templates/video/   plantilla de `npm run new`
galeria.html       vista de miniaturas (generada)
```

## Flujo diario

```bash
npm run new -- fork-bomb "Fork bomb: no lo ejecutes" linux   # crea videos/NNN-… y carruseles/NNN-…
npm run dev -- 003        # vista previa (Studio)
npm run check -- 003      # lint + layout + contraste (debe pasar)
npm run snapshot -- 003 --at 2,8,15   # PNG de frames para revisar antes de renderizar
npm run render -- 003     # render.mp4 (pixel) + render-inter.mp4 (Inter) + thumb.png; --font pixel|inter para una sola
npm run carousel -- 003   # carruseles/…/img/pixel y img/inter (tema light, acento naranja); --font pixel|inter
# completa post.json (textos por red) y luego:
npm run sync              # regenera log/LOG.md, publicaciones.csv y galeria.html (valida límites)
npm run captions -- 003 tiktok   # texto final listo para pegar
```

Al publicar: pega la URL en `post.json → platforms.<red>.url` y pon `status: "published"`.

## Reglas

- **Estilo:** nunca hardcodear colores ni fuentes en un video; usar `var(--…)` de `shared/styles/tokens.css`.
  Si falta un token, se agrega ahí.
- **Pixel-art gradual:** títulos y etiquetas en pixel font, código en JetBrains Mono (legibilidad), bordes
  `.px-box`, movimiento con `steps()`. Los colores semánticos (verde=padre/ok, cian=hijo, violeta=syscall,
  rojo=error) se conservan entre videos.
- **Determinismo:** todo cambio de estado con `tl.set(...)` en un instante; sin `Date.now`, `Math.random` ni fetch.
- **Texto mínimo 28 px** en 1080×1920 (el check lo avisa).
- **Hashtags:** solo se editan en `log/hashtags.json` y `topicTags` de cada `post.json`; el generador los recorta por red.
- Portar una animación del portafolio: ver `docs/migrar-animacion.md`.
