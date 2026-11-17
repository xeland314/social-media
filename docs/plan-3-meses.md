# Plan de publicación · 3 meses (2026-11-16 → 2027-02-14)

> Generado por `npm run trimestre` desde `log/calendario.json`, `log/puente.json` y `log/ideas.json`. Edita los JSON, no este archivo.

## Resumen

| Fase | Fechas | Ritmo | Estado | Detalle |
|---|---|---|---|---|
| **1. Arranque** | 2026-11-16 → 2026-12-15 | Diario: video + carrusel; domingo recopilatorio | Todo construido | `docs/calendario-30-dias.md` |
| **2. Puente** | 2026-12-16 → 2027-01-31 | 4 por semana: carrusel lun/mié/vie + video el sábado | Por producir (13.5 pts) | este documento |
| **3. Febrero** | 2027-02-01 → 2027-02-14 (sigue hasta el 28) | Diario: video + carrusel; domingo recopilatorio | 2 de 24 videos hechos | `docs/ideas-febrero-2027.md` |

**Por qué existe el puente:** sin él, la cuenta queda en silencio del 2026-12-16 al 2027-01-31 (47 días) mientras se construye febrero. El puente publica casi sin gastar capacidad: reutiliza presentaciones ya escritas (carrusel = 0.5 pts) y videos ya renderizados.

## Las 13 semanas

| Sem. | Lunes | Fase | Videos | Carruseles solos | Recap / rescate | Temas |
|---|---|---|---|---|---|---|
| 1 | 11-16 | Mes 1 | 6 | 0 | 1 | fork() · SIGTERM vs SIGKILL · Bash · Git · TCP vs UDP · chmod 755, bit a bit |
| 2 | 11-23 | Mes 1 | 6 | 0 | 1 | Python · Spoofing y phishing · Python · Symlink vs hard link · Go · Python |
| 3 | 11-30 | Mes 1 | 6 | 0 | 1 | DMARC · Go · umask · DMARC · File descriptors · Python |
| 4 | 12-07 | Mes 1 | 6 | 0 | 1 | Wi-Fi · HTTP/2 · Wi-Fi · HTTP/2 · Mi flujo de informes · Ecuaciones en Word |
| 5 | 12-14 | Mes 1 → Puente | 1 | 3 | 1 | Informes en lote · Historia de la shell · La filosofía Unix · pixel-desk |
| 6 | 12-21 | Puente | 0 | 2 | 1 | Manejo de señales · Streams en Linux con ejemplos en C |
| 7 | 12-28 | Puente | 0 | 2 | 1 | Cómo estructurar un proyecto CLI en C · slides.c |
| 8 | 01-04 | Puente | 1 | 3 | 0 | Los métodos HTTP, uno por lámina · RFC 9457 · RFC 9457 en la práctica · El lector de código de barras es un teclado |
| 9 | 01-11 | Puente | 1 | 3 | 0 | mkcert + Wireshark · iptables y nftables para quien viene del mundo web · Wi-Fi en Linux · Por qué 0.1 + 0.2 no es 0.3 |
| 10 | 01-18 | Puente | 1 | 3 | 0 | Catsplash · Expresiones regulares · Tokens · git reflog |
| 11 | 01-25 | Puente | 0 | 3 | 1 | Automatiza Word con Python · Python y el límite de 4300 dígitos · Cómo escribir Skills para agentes de IA que sí funcionan |
| 12 | 02-01 | Febrero | 6 | 0 | 1 | Stack vs heap · DNS · Punteros y referencias · Race condition · Recursión con pila · SPF |
| 13 | 02-08 | Febrero | 6 | 0 | 1 | Handshake TLS · Hash map · DKIM · Permission denied paso a paso · Portal cautivo · Base64 a nivel de bits |

## Puente, día por día

Ritmo: lun, mié y vie: carrusel nacido de una presentación ya escrita · sáb: video · mar, jue y dom: descanso. Feriados sin publicación: 2026-12-25, 2027-01-01.

| Fecha | Formato | Tema | Serie | Pts | Fuente | Enlaza con |
|---|---|---|---|---|---|---|
| mié 12-16 | 🖼️ carrusel | **Historia de la shell: de Thompson a fish** | L | 0.5 | historia_shell/historia_shell.md | 005 |
| vie 12-18 | 🖼️ carrusel | **La filosofía Unix: haz una cosa y hazla bien** | L | 0.5 | unix-filosofia/filosofia_unix.md | — |
| sáb 12-19 | 🎬 video + carrusel | **pixel-desk: escritorio pixel-art 2.5D para Linux** | X | — | videos/028-pixel-desk (ya renderizado) | — |
| lun 12-21 | 🖼️ carrusel | **Manejo de señales: salida limpia en programas de terminal** | L | 0.5 | manejo_señales/manejo_senales.md | 006 |
| mié 12-23 | 🖼️ carrusel | **Streams en Linux con ejemplos en C** | L | 0.5 | linux_streams/ (ejemplo1-4.c) | 012 |
| sáb 12-26 | ♻️ rescate | **Rescate: el video más guardado del mes 1 (variante Inter)** | recap | — | métricas de log/publicaciones.csv | — |
| lun 12-28 | 🖼️ carrusel | **Cómo estructurar un proyecto CLI en C** | D | 0.5 | cli/estructura_cli_c.md | — |
| mié 12-30 | 🖼️ carrusel | **slides.c: presentaciones sin lag, escritas en C** | X | 0.5 | slidesc/slides-c-presentacion.md | — |
| sáb 01-02 | ♻️ rescate | **Rescate: el video más compartido del mes 1 (variante Inter)** | recap | — | métricas de log/publicaciones.csv | — |
| lun 01-04 | 🖼️ carrusel | **Los métodos HTTP, uno por lámina** | R | 0.5 | http-methods/ (láminas ya exportadas) | 017 |
| mié 01-06 | 🖼️ carrusel | **RFC 9457: errores de API que sí explican qué pasó** | R | 0.5 | rfc-9457/rfc9457-fundamentos.md | — |
| vie 01-08 | 🖼️ carrusel | **RFC 9457 en la práctica: Problem Details paso a paso** | R | 0.5 | rfc-9457/rfc9457-practica.md | — |
| sáb 01-09 | 🎬 video + carrusel | **El lector de código de barras es un teclado** (T07) | T | 1.5 | workspace/escaner_codigo_barras | — |
| lun 01-11 | 🖼️ carrusel | **mkcert + Wireshark: HTTPS local sin advertencias** | R | 0.5 | mkcert/README.md | — |
| mié 01-13 | 🖼️ carrusel | **iptables y nftables para quien viene del mundo web** | R | 0.5 | iptables/iptables_nftables.md | — |
| vie 01-15 | 🖼️ carrusel | **Wi-Fi en Linux: red abierta vs cifrada con hostapd** | R | 0.5 | wifi_tutorial/README.md | 021 |
| sáb 01-16 | 🎬 video + carrusel | **Por qué 0.1 + 0.2 no es 0.3** (F11) | F | 1.5 | portafolio/posts (IEEE 754) | — |
| lun 01-18 | 🖼️ carrusel | **Catsplash: un portal cautivo en Go** | R | 0.5 | catsplash/README.md | R04 (12 de febrero) |
| mié 01-20 | 🖼️ carrusel | **Expresiones regulares: la teoría en 3 reglas** | F | 0.5 | re/README.md | — |
| vie 01-22 | 🖼️ carrusel | **Tokens: las seis categorías del análisis léxico** | F | 0.5 | tokens.md | — |
| sáb 01-23 | 🎬 video + carrusel | **git reflog: nada se pierde** (D04) | D | 1.5 | portafolio/ideas_posts.md | 002 |
| lun 01-25 | 🖼️ carrusel | **Automatiza Word con Python: de {{marcadores}} a decenas de .docx** | T | 0.5 | automatizacion-word-python.md | 024 |
| mié 01-27 | 🖼️ carrusel | **Python y el límite de 4300 dígitos** | P | 0.5 | project-python-limit-4300.json (proyecto Cover Creator listo) | — |
| vie 01-29 | 🖼️ carrusel | **Cómo escribir Skills para agentes de IA que sí funcionan** | A | 0.5 | skills.md/README.md | — |
| sáb 01-30 | 📣 avance | **Lo que viene en febrero: 4 semanas temáticas** | recap | — | clips de 026 y 027 + docs/ideas-febrero-2027.md | — |

Total del puente: 18 carruseles, 4 videos (3 nuevos), 2 rescates y 1 avance → **13.5 pts**.

- **Carrusel desde presentación:** el Markdown ya existe; se pasa a Cover Creator (`npm run carousel`) con el tema light y acento naranja. Recortar a 6–8 láminas: una idea por lámina.
- **Rescate:** se republica el video del mes 1 con mejores métricas, en su variante Inter (`render-inter.mp4`), con texto nuevo. No cuesta producción.
- **Enlaza con:** el texto del post menciona ese video o idea, para llevar tráfico a lo ya publicado o preparar lo que viene.

## Capacidad

| Concepto | Puntos |
|---|---|
| Febrero completo | 69 |
| Ya construido de febrero (F01, R01) | −5 |
| Puente | +13.5 |
| **Necesario en la ventana 2026-12-16 → 2027-01-31** | **77.5** |
| Capacidad útil (7 semanas × 14 × 0.8) | 78.4 |
| Holgura | 0.9 |

La holgura es pequeña: si una semana se atrasa, se recortan primero los videos nuevos del sábado (pasan a rescate), nunca los de febrero.

## Puntos de control

- **2026-12-13:** primeros 3 carruseles del puente listos y programados antes de que termine el mes 1.
- **2026-12-20:** elegir los dos rescates con las métricas del mes 1 y dejar programada la semana de Navidad y Año Nuevo.
- **2027-01-10:** revisar métricas; si los carruseles rinden mejor que los videos (o al revés), ajustar el ritmo de febrero.
- **2027-01-25:** febrero semanas 1 a 3 renderizado y programado (ya previsto en el plan de febrero).

## Reserva de carruseles (presentaciones no usadas)

| Tema | Fuente | Riesgo |
|---|---|---|
| Clean Code: parámetros booleanos | flags/flags.json (proyecto Cover Creator listo) | verde |
| Clean Code: primitive obsession | primitivos/primitives.json (proyecto Cover Creator listo) | verde |
| Cómo funciona una shell por dentro | historia_shell/how_it_works.md | verde |
| Lex en dos partes | curso-lex/lex-1 y lex-2 | verde |
| Arreglé un bug de Web/Wasm en dart_toon: del issue al PR | dart_toon/README.md | verde |
| C-Slides por dentro: un parser lineal de Markdown | slides/README.md | verde |
| Django a escala (resumen de una charla ajena) | django-a-escala/django-a-escala.md | verde (citar la fuente original) |
| 5 patrones de diseño para Agent Skills (contenido ajeno) | skills patterns/ | verde (citar la fuente original) |
| La web de un taller mecánico familiar | talleres_serviauto.md | amarillo (nombra un negocio real: decidir si se publica con nombre) |

## Ideas nuevas salidas de los proyectos (para marzo en adelante)

No están en el backlog de `log/ideas.json`; se agregan allí cuando se decida usarlas. Amarillo = nace de un proyecto del trabajo: solo con datos inventados y sin nombres.

| Tema | Proyecto | Riesgo |
|---|---|---|
| Parsear un chat exportado de WhatsApp | workspace/chat-analyzer-ui | verde |
| Cómo evoluciona un repo por lenguaje (git log → gráfico) | workspace/code-changes | verde |
| Chain of Responsibility en 20 segundos | workspace/code-changes | verde |
| Revivir una tablet que no enciende tras una actualización | workspace/tablet_lenovo | verde |
| Diplomas en lote desde una plantilla de PowerPoint | workspace/generador-diplomas | verde |
| Un analizador léxico que se recupera de errores | workspace/analizador-lexico | verde |
| SMART: cómo avisa un disco antes de morir | workspace/smart-monitor | amarillo |
| Respaldos nocturnos consistentes (y cómo probar que restauran) | workspace/server-backups | amarillo |
| Bot de Telegram con roles y permisos | workspace/icon-bot | amarillo |
| AES-256-GCM: cifrar un campo de la base de datos | workspace/inventory | amarillo |
| Asistencia con QR desde la cámara del navegador | workspace/asistencia_estudiantes | amarillo |
| Reportes HTML portables con PowerShell (sin dependencias) | workspace/WindowsDiagnosis | amarillo |
