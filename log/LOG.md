# Log de publicaciones

> Generado por `npm run log`. No editar: edita `videos/*/post.json` y `log/hashtags.json`.

| # | Video | Serie | Estado | Día | Publicado en |
|---|---|---|---|---|---|
| 001 | [fork(): una llamada, dos procesos](../videos/001-fork-system-call/) | linux | rendered | 1 | — |
| 002 | [Git: merge vs rebase](../videos/002-git-merge-rebase/) | git | rendered | 4 | — |
| 003 | [TCP vs UDP: confianza vs velocidad](../videos/003-tcp-udp/) | redes | rendered | 5 | — |
| 004 | [Spoofing y phishing: DMARC lo frena](../videos/004-spoofing-phishing-dmarc/) | ti | rendered | 24 | — |

## 001 · fork(): una llamada, dos procesos

- **Carpeta:** `videos/001-fork-system-call/`  ·  **Estado:** rendered  ·  **Duración:** 21 s
- **Gancho:** Llamas una función una vez… y retorna dos veces.
- **Carrusel:** `carruseles/001-fork-system-call` (pending)

### TikTok
```text
fork() se llama una vez y retorna DOS veces: 0 en el hijo, el pid del hijo en el padre. Mira cómo el kernel duplica el proceso. ¿Lo habías visto así?

#fork #procesos #syscall #c #xeland314
```

### Instagram
```text
fork() se llama una vez y retorna dos veces 🐱

0 en el proceso hijo. El pid del hijo en el padre. Ambos reanudan en la misma línea.

Guarda este video para cuando te pregunten qué hace fork().

#fork #procesos #syscall #c #xeland314
```

### Threads
```text
fork() se llama una vez y retorna dos veces: 0 en el hijo, el pid del hijo en el padre. Es el truco detrás de cada shell que has usado.

#fork
```

### Facebook
```text
¿Cómo crea Linux un proceso nuevo? Con fork(): el kernel duplica al proceso que llama y ambos continúan en la misma línea de código. En 21 segundos, paso a paso.

#fork #procesos #xeland314
```

### YouTube
**Título:** fork() en Linux: una llamada, dos procesos

```text
fork() duplica el proceso que lo llama. En el hijo retorna 0; en el padre, el pid del hijo. Animación paso a paso con el código en C.

Más animaciones: https://xeland314.github.io/animations

#fork #procesos #xeland314 #Shorts
```

### RedNote
**Título:** fork() = 2 procesos | fork()：一次调用，两个进程

```text
fork() se llama una vez y retorna dos veces: 0 en el hijo, el pid del hijo en el padre. Animación paso a paso del código en C.

fork() 只调用一次，却会返回两次：子进程返回 0，父进程返回子进程的 pid。一步步看内核如何复制进程。

#fork #procesos #syscall #Linux #操作系统
```

## 002 · Git: merge vs rebase

- **Carpeta:** `videos/002-git-merge-rebase/`  ·  **Estado:** rendered  ·  **Duración:** 21 s
- **Gancho:** Mismo resultado, dos historias: merge agrega un commit, rebase reescribe los tuyos.
- **Carrusel:** `carruseles/002-git-merge-rebase` (pending)

### TikTok
```text
Merge o rebase: ¿cuál usas? Merge conserva las ramas y agrega un commit de fusión (M1). Rebase reescribe tus commits sobre main y deja el historial lineal. Míralo en 21 segundos.

#git #merge #rebase #controldeversiones #xeland314
```

### Instagram
```text
Merge vs rebase en 21 segundos 🐱

Merge: conserva las ramas y agrega un commit de fusión (M1).
Rebase: despega tus commits y los replanta sobre main → historial lineal.

Guárdalo para tu próximo pull request.

#git #merge #rebase #controldeversiones #xeland314
```

### Threads
```text
Merge conserva el historial tal como ocurrió (+1 commit de fusión). Rebase lo reescribe para que parezca lineal. Regla de oro: no hagas rebase de ramas que otros ya descargaron.

#git
```

### Facebook
```text
¿Merge o rebase? Merge agrega un commit de fusión y conserva las ramas; rebase replanta tus commits sobre main y deja el historial lineal. Animación paso a paso.

#git #merge #xeland314
```

### YouTube
**Título:** Git merge vs rebase: la diferencia en 21 segundos

```text
Merge conserva la ramificación y crea un commit de fusión. Rebase despega tus commits y los replanta sobre main para un historial lineal. Animación paso a paso con los comandos.

Más animaciones: https://xeland314.github.io/animations

#git #merge #xeland314 #Shorts
```

### RedNote
**Título:** merge vs rebase | Git merge 与 rebase

```text
Merge conserva las ramas y agrega un commit de fusión. Rebase replanta tus commits sobre main y deja el historial lineal.

merge 会保留分支并新增一个合并提交；rebase 会把你的提交重新接到 main 上，让历史保持线性。

#git #merge #rebase #版本控制 #编程
```

## 003 · TCP vs UDP: confianza vs velocidad

- **Carpeta:** `videos/003-tcp-udp/`  ·  **Estado:** rendered  ·  **Duración:** 22 s
- **Gancho:** TCP pregunta '¿me oyes?' antes de hablar. UDP solo dispara.
- **Carrusel:** `carruseles/003-tcp-udp` (pending)

### TikTok
```text
TCP vs UDP en 22 segundos: TCP hace un saludo de 3 pasos (SYN, SYN-ACK, ACK) antes de enviar datos. UDP dispara y olvida: si un paquete se pierde, nadie lo reenvía. ¿Cuál usa tu videollamada?

#tcp #udp #redes #handshake #xeland314
```

### Instagram
```text
TCP vs UDP 🐱

TCP: saludo de 3 pasos (SYN → SYN-ACK → ACK) y reenvío si algo se pierde.
UDP: dispara y olvida. Más rápido, sin garantías.

Guárdalo para cuando te pregunten por qué las videollamadas usan UDP.

#tcp #udp #redes #handshake #xeland314
```

### Threads
```text
TCP asegura que todo llegue en orden, con un saludo de 3 pasos. UDP no espera confirmación: si se pierde un paquete, sigue. Por eso las videollamadas prefieren UDP.

#tcp
```

### Facebook
```text
¿Por qué una videollamada usa UDP y una descarga usa TCP? TCP confirma cada paso y reenvía lo perdido; UDP prioriza la velocidad. Animación paso a paso.

#tcp #udp #xeland314
```

### YouTube
**Título:** TCP vs UDP: handshake de 3 pasos vs fire & forget

```text
TCP establece la conexión con SYN, SYN-ACK y ACK antes de transmitir. UDP envía datagramas sin conexión ni confirmación. Animación paso a paso con el código.

Más animaciones: https://xeland314.github.io/animations

#tcp #udp #xeland314 #Shorts
```

### RedNote
**Título:** TCP vs UDP | TCP 与 UDP 的区别

```text
TCP hace un saludo de 3 pasos y reenvía lo perdido; UDP dispara y olvida, más rápido pero sin garantías.

TCP 先三次握手并重传丢失的数据；UDP 直接发送、不确认，更快但没有保证。

#tcp #udp #redes #网络 #计算机网络
```

## 004 · Spoofing y phishing: DMARC lo frena

- **Carpeta:** `videos/004-spoofing-phishing-dmarc/`  ·  **Estado:** rendered  ·  **Duración:** 24 s
- **Gancho:** Le falsificó el correo al CEO… y su propio servidor lo rechazó.
- **Carrusel:** `carruseles/004-spoofing-phishing-dmarc` (project-json)

### TikTok
```text
Un atacante falsifica el correo del CEO. Tres comprobaciones después, el servidor lo rechaza: SPF, DKIM y DMARC con p=reject. Mira su cara. ¿Tu dominio ya está en p=reject?

#spoofing #phishing #dmarc #spf #xeland314
```

### Instagram
```text
Spoofing y phishing: así lo frena DMARC 🛡️

SPF: ¿la IP está autorizada?
DKIM: ¿la firma es válida?
DMARC: ¿qué hago si fallan? → p=reject.

Caso armado con datos ficticios. Guárdalo para configurar tu dominio.

#spoofing #phishing #dmarc #spf #xeland314
```

### Threads
```text
Si tu dominio no tiene DMARC en p=reject, cualquiera puede mandar correos como tú. SPF y DKIM solos no deciden qué hacer cuando fallan: DMARC sí.

#spoofing
```

### Facebook
```text
¿Cómo se frena el spoofing de correo? Con tres piezas: SPF (quién puede enviar), DKIM (firma) y DMARC (qué hacer si fallan). Animación con un caso ficticio.

#spoofing #phishing #xeland314
```

### YouTube
**Título:** Spoofing y phishing: cómo DMARC lo frena (SPF, DKIM, p=reject)

```text
Caso ficticio: un atacante falsifica el correo del CEO y el servidor lo rechaza con SPF, DKIM y DMARC en p=reject. Además, la ruta de configuración: p=none → p=quarantine → p=reject.

Todos los datos son inventados (example.com).

#spoofing #phishing #xeland314 #Shorts
```

### RedNote
**Título:** DMARC vs spoofing | DMARC 拦截伪造邮件

```text
Spoofing y phishing: SPF, DKIM y DMARC con p=reject frenan el correo falsificado. Caso ficticio paso a paso.

伪造邮件攻击：SPF、DKIM 加上 DMARC 的 p=reject 策略可以直接拦截。虚构案例，一步步演示。

#spoofing #phishing #dmarc #IT运维 #网络安全
```
