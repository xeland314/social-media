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

## Voz sintética (075 y siguientes)

Para demostraciones de clonación se usan **solo voces sintéticas** (nunca la de una persona real sin su
consentimiento). Herramientas locales, fuera del repo, en `~/.cache/voz-tts/` (venvs Python 3.11, CPU):

1. **Voz base — Piper** (`piper-tts`, voz `es_ES-sharvard-medium`, hablante `F`=1 / `M`=0):
   `echo "texto" | piper-env/bin/piper -m voices/es_ES-sharvard-medium.onnx --speaker 1 -f out/original.wav`
2. **Clon — Chatterbox Multilingual** (MIT, `language_id="es"`, `audio_prompt_path=` el clip de Piper,
   `torch.manual_seed` fijo). ~50 s por frase en CPU. Añade marca de agua Perth al audio (requiere
   `setuptools<81` por `pkg_resources`). Se evitó XTTS‑v2 por su licencia no comercial.
3. Recorte y normalización: `ffmpeg -af "atrim=…,afade=…,loudnorm=I=-16:TP=-1.5" -ar 44100 -ac 1`.
4. Los clips van en `videos/NNN/voz/*.wav` y sus `<audio>` **fuera** del bloque `audio:start/end`
   (así `add-audio.mjs` no los borra), en pistas 25–26, volumen 1; los SFX que se solapan, a ≤0,4.
5. Verificación: transcribir con `faster-whisper` el audio del `render.mp4` y comparar huellas de voz con el
   `VoiceEncoder` de Chatterbox (`ve.pt`). En 075: original↔clon 0,85 frente a 0,65 con una voz de control.

Ollama no sirve para esto (solo texto/visión). OpenVINO podría acelerar en la iGPU Intel, pero para frases
cortas la CPU basta.
