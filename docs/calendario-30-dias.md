# Calendario definitivo · 30 días (2026-11-16 → 2026-12-15)

> Generado por `npm run calendar` desde `log/calendario.json`. Para mover fechas, cambia `startDate` allí.

Reglas: **un video y un carrusel por día**, mismo tema. Carrusel con Cover Creator (tema ambercat) o slides.c; publicar en IG, Facebook, Threads y RedNote; el video, en las seis redes. Todo con datos ficticios en la serie TI.

| Día | Fecha | Tema | Serie | Video | Carrusel (portada → cierre) |
|---|---|---|---|---|---|
| 1 | lun 11-16 | fork(): una llamada, dos procesos | linux | ✅ 001 · 21 s | Un proceso, dos PID → qué devuelve fork en padre e hijo (0 / pid) |
| 2 | mar 11-17 | SIGTERM vs SIGKILL | linux | ✅ 006 · 21 s | Pedir o aniquilar → exit 0 vs exit 137 y el orden recomendado |
| 3 | mié 11-18 | Bash: && vs || | linux | ✅ 005 · 21 s | Tabla de verdad con exit codes → ejemplos de scripts |
| 4 | jue 11-19 | Git: merge vs rebase | git | ✅ 002 · 21 s | Historial con M1 vs lineal → regla de oro: no hagas rebase de ramas compartidas |
| 5 | vie 11-20 | TCP vs UDP | redes | ✅ 003 · 22 s | Handshake de 3 pasos vs fire & forget → por qué las videollamadas usan UDP |
| 6 | sáb 11-21 | chmod 755, bit a bit | linux | ✅ 007 · 21 s | r=4, w=2, x=1 → tabla de permisos comunes |
| 7 | dom 11-22 | Recopilatorio de la semana | recap | ♻️ recopilatorio (clips + carrusel) | Top 3 de la semana → qué funcionó y qué viene |
| 8 | lun 11-23 | Python: decoradores | python | ✅ 013 · 18 s | Antes, durante, después → functools.wraps |
| 9 | mar 11-24 | Spoofing y phishing: DMARC lo frena | ti | ✅ 004 · 24 s | SPF, DKIM y DMARC → ruta none/quarantine/reject (proyecto.json listo) |
| 10 | mié 11-25 | Python: return vs yield | python | ✅ 014 · 21 s | RAM O(N) vs O(1) → ejemplo con un millón de elementos |
| 11 | jue 11-26 | Symlink vs hard link | linux | ✅ 009 · 20 s | Inodo al centro → qué sobrevive a rm |
| 12 | vie 11-27 | Go: canal con buffer | go | ✅ 010 · 22 s | Buffer 2: bloqueo al llenarse y al vaciarse → productor/consumidor |
| 13 | sáb 11-28 | Python: match/case | python | ✅ 015 · 19 s | if/elif vs match → patrones estructurales |
| 14 | dom 11-29 | Recopilatorio de la semana | recap | ♻️ recopilatorio (clips + carrusel) | Top 3 de la semana → qué funcionó y qué viene |
| 15 | lun 11-30 | DMARC: de p=none a reject (ruta segura) | ti | ✅ 019 · 20 s | none → quarantine → reject → cómo leer rua sin saltarse pasos |
| 16 | mar 12-01 | Go: defer (LIFO) | go | ✅ 011 · 20 s | Pila LIFO → la trampa de defer dentro de un for |
| 17 | mié 12-02 | umask: restar permisos | linux | ✅ 008 · 20 s | 666/777 & ~máscara → tabla 022 vs 077 |
| 18 | jue 12-03 | DMARC: cómo leer un reporte de seguimiento | ti | ✅ 020 · 20 s | Qué mirar: fuentes, alineación, % de fallos → cuándo subir la política |
| 19 | vie 12-04 | File descriptors: 0, 1 y 2 | linux | ✅ 012 · 20 s | stdin/stdout/stderr → >, >>, 2>&1 |
| 20 | sáb 12-05 | Python: with (context manager) | python | ✅ 016 · 21 s | __enter__/__exit__ → contextlib en 5 líneas |
| 21 | dom 12-06 | Recopilatorio de la semana | recap | ♻️ recopilatorio (clips + carrusel) | Top 3 de la semana → qué funcionó y qué viene |
| 22 | lun 12-07 | Wi-Fi: un solo SSID (roaming) | ti | ✅ 021 · 21 s | Antes/después de unificar → qué cambia al moverte entre puntos de acceso |
| 23 | mar 12-08 | HTTP/2: multiplexación | redes | ✅ 017 · 22 s | Una conexión, muchos streams → vs HTTP/1.1 |
| 24 | mié 12-09 | Wi-Fi: cómo se audita una red | ti | ✅ 022 · 19 s | Lista de revisión: canales, potencia, DHCP, solapamientos |
| 25 | jue 12-10 | HTTP/2: HPACK | redes | ✅ 018 · 22 s | Tabla dinámica → 128 B pasan a 24 B |
| 26 | vie 12-11 | Mi flujo de informes: YAML → HTML → PDF (WeasyPrint) | ti | ✅ 023 · 21 s | Plantilla + datos + generador → por qué separar contenido y diseño |
| 27 | sáb 12-12 | Ecuaciones en Word: LaTeX → MathML → OMML | ti | 🛠️ por construir | El truco: marcadores [MATH] → OMML nativo editable |
| 28 | dom 12-13 | Recopilatorio de la semana | recap | ♻️ recopilatorio (clips + carrusel) | Top 3 de la semana + el mejor de las series Linux y TI |
| 29 | lun 12-14 | De una semana de trabajo a minutos: informes en lote | ti | 🛠️ por construir | Excel → puntuar → texto → PDF en paralelo (sin marca ni cliente) |
| 30 | mar 12-15 | Balance del mes | recap | ♻️ recopilatorio (clips + carrusel) | Top 5 por métricas → qué viene en el mes 2 |

## Qué hay que construir y para cuándo

- Día 27 (2026-12-12): **Ecuaciones en Word: LaTeX → MathML → OMML** — debe estar renderizado la víspera (día 26).
- Día 29 (2026-12-14): **De una semana de trabajo a minutos: informes en lote** — debe estar renderizado la víspera (día 28).

El primero se necesita el día 27: construirlo durante la semana 1, que ya tiene todo hecho.

## Ritmo y revisión

- Lunes a sábado: video + carrusel del día. **Domingo: recopilatorio** (3 mejores clips de la semana + carrusel resumen).
- Anotar por video: retención a 3 s, guardados y compartidos (columna libre en `log/publicaciones.csv`).
- **Día 14:** reordenar las semanas 3 y 4 según lo que mejor rindió; no cambiar el esfuerzo, solo el orden.
- Serie TI: nada de clientes, equipos, redes ni capturas reales; datos de ejemplo (`example.com`, `203.0.113.0/24`).
- Los 18 videos ya renderizados cubren 18 de los 30 días; los 7 de la serie TI por construir y los 5 recopilatorios completan el mes.
