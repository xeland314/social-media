# Sonido

**Por defecto los videos llevan solo efectos** (SFX sincronizados con el movimiento). La música se
agrega al publicar, con el audio en tendencia de cada red; si el video ya trae música, choca con ella.

`npm run audio` sintetiza (sin dependencias, determinista) en `shared/audio/`:

- SFX chiptune 8 bits (`scripts/make-audio.mjs`): `blip pop confirm error packet whoosh fork merge`.
- Música opcional estilo ascensor/lounge (`scripts/make-music.mjs`, también `npm run music`), estéreo, ~34 s:
  - `ascensor-bossa.wav` — bossa nova, 120 BPM, Do mayor, vibráfono + Rhodes + contrabajo.
  - `ascensor-swing.wav` — swing lento, 96 BPM, Fa mayor, bajo caminante + escobillas + ride.
  - `ascensor-citypop.wav` — city pop/lounge, 84 BPM, Mi♭ mayor, melodía en Rhodes con campanita.

  Lo que evita que suene a relleno genérico: armonía de jazz (maj9, 13, ii–V, iv menor) en vez de
  tríadas I–V–vi–IV, melodías escritas a mano con motivo y variación, swing, micro‑variaciones de
  tiempo y dinámica, y reverb estéreo. Para cambiar una pieza edita `TRACKS` (acordes por compás y
  melodía como `E5:.5 r:1 | …`; el script valida que cada compás sume 4 tiempos).

En cada video, los `<audio>` van entre `<!-- audio:start -->` y `<!-- audio:end -->`; se generan con:

```bash
node scripts/add-audio.mjs 005 21 "pop:2.4,whoosh:4.2,error:8.4,confirm:13.8"                 # solo SFX
node scripts/add-audio.mjs 005 21 "pop:2.4,whoosh:4.2,error:8.4,confirm:13.8" --music bossa   # + música
```

```html
<audio id="aud0" src="shared/audio/ascensor-bossa.wav" data-start="0" data-duration="21"
       data-track-index="20" data-volume="0.2" data-fade-in="0.3" data-fade-out="1.5"></audio>
<audio id="aud1" src="shared/audio/pop.wav" data-start="7.3" data-duration="0.18"
       data-track-index="21" data-volume="0.7"></audio>
```

- Cada efecto cae en el mismo segundo que el `tl.set(...)` de la acción que acompaña.
- Atributos soportados por Hyperframes 0.9.26: `data-start`, `data-duration`, `data-media-start`,
  `data-volume`, `data-fade-in/out`, `data-automation` (carril de volumen). `data-fx-chain`/bitcrush
  NO aparece en la documentación local: el efecto retro se aplica al generar los WAV.
- Música (si se usa) a ~0,2 y efectos a 0,5–0,8.
