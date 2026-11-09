# social-media

Lee `README.md` (estructura y flujo). Reglas para agentes:

- Antes de tocar una composición, lee `docs/hyperframes-agents.md` (contrato de Hyperframes) y corre `npm run check -- NNN`;
  mira los frames con `npm run snapshot` antes de dar algo por terminado.
- No instales skills por tu cuenta: si falta una, dile a la persona que ejecute `npx hyperframes skills update`.
- Estilos solo vía `shared/styles/tokens.css`; helpers en `shared/js/lib.js`. No duplicar CSS en cada video.
- Cada video tiene `post.json` completo (6 redes) antes de marcarse `scheduled`.
- No versionar `*.mp4`. Sí versionar `thumb.png` y `post.json`.
- No incluir datos de la empresa donde trabaja el autor (nombres de clientes, equipos o redes) en ningún video, carrusel ni log.
