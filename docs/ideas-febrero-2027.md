# Plan de febrero 2027 · ideas y producción

> Generado por `npm run plan` desde `log/ideas.json` (backlog, plan, reglas). Edita el JSON, no este archivo.

**Periodo:** 2027-02-01 → 2027-02-28 (28 días, lunes a domingo).  **Construcción:** 2026-12-16 → 2027-01-31 (7 semanas).

## Reglas del plan

- Un video + un carrusel por día; **domingo = recopilatorio** (4 en el mes).
- Nunca la misma serie dos días seguidos; se usa cada serie en su semana temática.
- Una **radiografía** por semana (post largo del portafolio) que alimenta un video de esa semana.
- Esfuerzo: S=1, M=2, L=3 puntos por video; carrusel +0.5; radiografía +2. Capacidad supuesta: 14 pts/semana × 0.8 (margen).
- Riesgo **amarillo** = nace de un proyecto del trabajo: solo con datos inventados y sin nombres. **Rojo** = no se usa.
- Carnaval en Ecuador (lunes 8 y martes 9 de febrero de 2027, a confirmar con el calendario oficial): esos días van **programados con antelación**.

## Calendario (28 días)

| Día | Fecha | Idea | Serie | Esf. | Gancho | Origen |
|---|---|---|---|---|---|---|
| 1 | lun 02-01 | **Stack vs heap** (F01) | F | M | Dos bodegas: una se limpia sola, la otra hay que ordenarla | docs/videos.md |
| 2 | mar 02-02 | **DNS: cómo se resuelve un dominio** (R01) | R | M | De un nombre a una IP en 4 saltos | portafolio/ideas_posts.md |
| 3 | mié 02-03 | **Punteros y referencias** (F02) | F | M | Dos cajas, una misma dirección | docs/videos.md |
| 4 | jue 02-04 | **Race condition** (C01) | C | M | Dos manos escribiendo la misma variable | docs/videos.md |
| 5 | vie 02-05 | **Recursión con pila** (F03) | F | S | Las llamadas se apilan y luego caen | docs/videos.md |
| 6 | sáb 02-06 | **SPF: anatomía del registro** (T01) | T | S | Lista quién puede enviar como tu dominio | serie TI (DMARC) |
| 7 | dom 02-07 | ♻️ Recopilatorio de la semana | recap | — | 3 mejores clips + carrusel resumen | — |
| 8 | lun 02-08 | **Handshake TLS** (R02) | R | L | El saludo secreto antes del HTTP | portafolio/ideas_posts.md |
| 9 | mar 02-09 | **Hash map** (F04) | F | M | El portero decide en qué casillero va | docs/videos.md |
| 10 | mié 02-10 | **DKIM: cómo se firma un correo** (T02) | T | M | La firma que no se puede falsificar | serie TI (DMARC) |
| 11 | jue 02-11 | **Permission denied paso a paso** (L04) | L | S | El kernel revisa user, group y other | docs/videos.md |
| 12 | vie 02-12 | **Portal cautivo: cómo funciona** (R04) | R | L | Por qué el Wi-Fi te pide aceptar términos | catsplash / nodogsplash |
| 13 | sáb 02-13 | **Base64 a nivel de bits** (F05) | F | M | Por qué Base64 pesa un 33 % más | portafolio/ideas_posts.md |
| 14 | dom 02-14 | ♻️ Recopilatorio de la semana | recap | — | 3 mejores clips + carrusel resumen | — |
| 15 | lun 02-15 | **Cuantización: 4 bits en vez de 16** (A01) | A | M | Cómo un modelo cabe en 4 GB de RAM | localmodels |
| 16 | mar 02-16 | **Fork bomb** (L01) | L | M | Un proceso que se duplica sin parar | docs/videos.md |
| 17 | mié 02-17 | **Tokens y ventana de contexto** (A02) | A | M | El modelo no lee letras: lee tokens | localmodels |
| 18 | jue 02-18 | **Mutex y deadlock** (C02) | C | M | Una llave, dos procesos esperando | docs/videos.md |
| 19 | vie 02-19 | **Geocodificación inversa con caché** (T03) | T | M | Cache hit vs cache miss: de 800 ms a 5 ms | geocoding-api |
| 20 | sáb 02-20 | **Sentimiento por diccionario (AFINN)** (A03) | A | S | Sumar palabras buenas y malas | dart-sentiment |
| 21 | dom 02-21 | ♻️ Recopilatorio de la semana | recap | — | 3 mejores clips + carrusel resumen | — |
| 22 | lun 02-22 | **Zombie vs huérfano** (L02) | L | M | Procesos que nadie recogió | docs/videos.md |
| 23 | mar 02-23 | **Go: select con timeout** (G01) | G | M | Lo que llegue primero gana | docs/videos.md (Go) |
| 24 | mié 02-24 | **RAG mínimo: buscar antes de responder** (A04) | A | L | El modelo con apuntes | localmodels / go-code-ai |
| 25 | jue 02-25 | **Pipes y backpressure** (L03) | L | M | Cuando el buffer se llena, el productor espera | docs/videos.md |
| 26 | vie 02-26 | **DHCP: DORA** (R03) | R | M | Discover, Offer, Request, Ack | wifi/nodogsplash (contexto) |
| 27 | sáb 02-27 | **UTF-8: de 1 a 4 bytes** (F06) | F | M | Cómo caben los emojis en bytes | portafolio/ideas_posts.md |
| 28 | dom 02-28 | ♻️ Recopilatorio de la semana | recap | — | 3 mejores clips + carrusel resumen | — |

## Radiografías (posts del portafolio)

| Semana | Publicar | Tema | Nota |
|---|---|---|---|
| 1 | 2027-02-01 | Registro DMARC (v=DMARC1…) (T05) | Complementa el video 019/020; lunes |
| 2 | 2027-02-08 | Base64 a nivel de bits (F05) | Alimenta el video del día 13 |
| 3 | 2027-02-15 | Tokens y ventana de contexto (A02) | Alimenta el video del día 17 |
| 4 | 2027-02-22 | UTF-8: de 1 a 4 bytes (F06) | Alimenta el video del día 27 |

## Esfuerzo y construcción

- Total de febrero: **69 pts**; capacidad útil de la ventana: **78.4 pts** → ✅ cabe (holgura 9.4 pts).

| Semana de construcción | Hasta | Piezas | Puntos | Menor holgura |
|---|---|---|---|---|
| 1 | 2026-12-22 | T05, F01, R01 | 9 | 40 días |
| 2 | 2026-12-29 | F02, C01, F03, T01, R02 | 11.5 | 35 días |
| 3 | 2027-01-05 | F04, T02, L04, R04 | 10 | 34 días |
| 4 | 2027-01-12 | F05, A01, L01, A02 | 14 | 31 días |
| 5 | 2027-01-19 | C02, T03, A03, L02, G01 | 11.5 | 29 días |
| 6 | 2027-01-26 | A04, L03, R03 | 8.5 | 28 días |
| 7 | 2027-02-02 | F06 | 4.5 | 24 días |

Puntos de control: **10 de enero** (revisar métricas de noviembre-diciembre y reordenar semanas 3 y 4) y **25 de enero** (todo lo de las semanas 1 a 6 renderizado y programado; la semana 7 es holgura y la capacidad por semana es un supuesto: si una semana se pasa de 11,2 pts, se mueve la pieza a la siguiente).

## Balance por serie (febrero)

- Fundamentos (F): 6
- Redes (R): 4
- Concurrencia (C): 2
- TI / correo / infraestructura (T): 3
- Linux (L): 4
- IA local (A): 4
- Go (G): 1

## Reserva (36 ideas con video, no usadas en febrero)

| Id | Idea | Serie | Esf. | Origen | Riesgo |
|---|---|---|---|---|---|
| F07 | Endianness | F | M | reserva | verde |
| F08 | Big-O intuitivo | F | M | reserva | verde |
| F09 | Lista enlazada vs arreglo | F | S | docs/videos.md | verde |
| F10 | Árbol binario de búsqueda | F | M | docs/videos.md | verde |
| F11 | Por qué 0.1 + 0.2 no es 0.3 | F | S | portafolio/posts (IEEE 754) | verde |
| C06 | asyncio: el bucle de eventos | P | M | reserva | verde |
| C07 | El GIL de Python | P | M | reserva | verde |
| G02 | Go: worker pool | G | M | reserva | verde |
| G03 | Go: context y cancelación | G | M | reserva | verde |
| R05 | ARP | R | S | reserva | verde |
| R06 | NAT | R | M | reserva | verde |
| R07 | Banderas de la cabecera TCP | R | M | portafolio/ideas_posts.md | verde |
| R08 | HTTP: caché con ETag | R | M | reserva | verde |
| R09 | CORS en 20 segundos | R | M | reserva | verde |
| L05 | rm vs papelera | L | S | docs/videos.md | verde |
| L06 | grep y sed | L | M | portafolio/ideas_posts.md | verde |
| L07 | SSH: RSA vs Ed25519 | L | M | portafolio/ideas_posts.md | verde |
| L08 | PXE: arrancar por la red | L | L | workspace/pxe-boot | amarillo |
| L09 | systemd: estados de un servicio | L | S | portafolio/posts (systemd) | verde |
| T04 | SMTP: la conversación en texto | T | M | notify-system | verde |
| T06 | Monitoreo de impresoras con IPP + Uptime Kuma | T | M | printer-monitor | amarillo |
| T07 | El lector de código de barras es un teclado | T | S | escaner_codigo_barras | verde |
| T08 | Subida de archivos grandes por partes | T | M | upload_videos | amarillo |
| A05 | Voz local: texto a voz sin nube | A | M | kittentts | verde |
| A06 | Chatbot que ejecuta código para calcular | A | L | go-code-ai | verde |
| A07 | Embeddings: significado como números | A | M | reserva | verde |
| X01 | Pixel art en C con Raylib | X | M | mouse | verde |
| X02 | Rotar sprites sin interpolar | X | M | image-rotator / politetris | verde |
| X03 | El bucle de un juego | X | M | politetris | verde |
| X04 | Componer un video con ffmpeg en 3 comandos | X | M | videoflow | verde |
| S01 | Normal, binomial y Poisson | S | M | statlens | verde |
| S02 | La ley de los grandes números | S | S | statlens | verde |
| D01 | Docker: una imagen en capas | D | L | portafolio/ideas_posts.md | verde |
| D02 | UUID vs ULID vs Snowflake | D | S | portafolio/ideas_posts.md | verde |
| D03 | YAML vs TOML vs JSON | D | S | portafolio/ideas_posts.md | verde |
| D04 | git reflog: nada se pierde | D | S | portafolio/ideas_posts.md | verde |
