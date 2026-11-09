# Sonido

`npm run audio` sintetiza (sin dependencias, determinista) en `shared/audio/`:
`blip pop confirm error packet whoosh fork merge` (SFX chiptune, 8 bits) y `piano-retro.wav`
(22 s, 96 BPM, La menor, 10 bits a 22 kHz). Cambia notas o timbres en `scripts/make-audio.mjs`.

En cada video, los `<audio>` van entre `<!-- audio:start -->` y `<!-- audio:end -->`:

```html
<audio id="aud1" src="shared/audio/piano-retro.wav" data-start="0" data-duration="21"
       data-track-index="20" data-volume="0.22" data-fade-in="0.5" data-fade-out="2"></audio>
<audio id="aud2" src="shared/audio/pop.wav" data-start="7.3" data-duration="0.18"
       data-track-index="21" data-volume="0.7"></audio>
```

- Cada efecto cae en el mismo segundo que el `tl.set(...)` de la acción que acompaña.
- Atributos soportados por Hyperframes 0.9.26: `data-start`, `data-duration`, `data-media-start`,
  `data-volume`, `data-fade-in/out`, `data-automation` (carril de volumen). `data-fx-chain`/bitcrush
  NO aparece en la documentación local: el efecto retro se aplica al generar los WAV.
- Música de fondo a ~0,22 y efectos a 0,5–0,8. Al exportar quedan picos de -3 a -4 dB.
- Para música más compleja (Lyria/MusicGen) habría que generarla fuera y guardarla en `shared/audio/`.
