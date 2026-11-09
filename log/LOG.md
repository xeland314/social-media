# Log de publicaciones

> Generado por `npm run log`. No editar: edita `videos/*/post.json` y `log/hashtags.json`.

| # | Video | Serie | Estado | Día | Publicado en |
|---|---|---|---|---|---|
| 001 | [fork(): una llamada, dos procesos](../videos/001-fork-system-call/) | linux | rendered | 1 | — |
| 002 | [Git: merge vs rebase](../videos/002-git-merge-rebase/) | git | rendered | 4 | — |
| 003 | [TCP vs UDP: confianza vs velocidad](../videos/003-tcp-udp/) | redes | rendered | 5 | — |
| 004 | [Spoofing y phishing: DMARC lo frena](../videos/004-spoofing-phishing-dmarc/) | ti | rendered | 9 | — |
| 005 | [Bash: && vs ||](../videos/005-and-or-chains/) | linux | rendered | 3 | — |
| 006 | [SIGTERM vs SIGKILL](../videos/006-sigterm-vs-sigkill/) | linux | rendered | 2 | — |
| 007 | [chmod bit a bit](../videos/007-chmod-binary/) | linux | rendered | 6 | — |
| 008 | [umask: permisos por defecto](../videos/008-umask-permissions/) | linux | rendered | 17 | — |
| 009 | [Symlink vs Hard Link](../videos/009-symlink-vs-hardlink/) | linux | rendered | 11 | — |
| 010 | [Go: canal con buffer](../videos/010-go-channels/) | go | rendered | 12 | — |
| 011 | [Go: defer (LIFO)](../videos/011-go-defer/) | go | rendered | 16 | — |
| 012 | [File descriptors y redirecciones](../videos/012-file-descriptors/) | linux | rendered | 19 | — |
| 013 | [Python: decoradores](../videos/013-python-decorator/) | python | rendered | 8 | — |
| 014 | [Python: return vs yield](../videos/014-yield-return/) | python | rendered | 10 | — |
| 015 | [Python: match/case](../videos/015-match-case/) | python | rendered | 13 | — |
| 016 | [Python: with (context manager)](../videos/016-python-with/) | python | rendered | 20 | — |
| 017 | [HTTP/2: multiplexación](../videos/017-http2-multiplexing/) | redes | rendered | 23 | — |
| 018 | [HTTP/2: HPACK](../videos/018-http2-hpack/) | redes | rendered | 25 | — |
| 019 | [DMARC: de p=none a reject](../videos/019-dmarc-none-a-reject/) | ti | rendered | 15 | — |
| 020 | [DMARC: cómo leer un reporte](../videos/020-dmarc-leer-reporte/) | ti | rendered | 18 | — |

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

## 005 · Bash: && vs ||

- **Carpeta:** `videos/005-and-or-chains/`  ·  **Estado:** rendered  ·  **Duración:** 21 s
- **Gancho:** && y || no son 'y' y 'o': dependen del código de salida.
- **Carrusel:** `carruseles/005-and-or-chains` (pending)

### TikTok
```text
&& solo avanza si el comando anterior salió con 0. || solo actúa si falló. Mira cómo un ping fallido omite un echo y otro lo rescata. ¿Lo usabas al revés?

#bash #shell #exitcode #linuxtips #xeland314
```

### Instagram
```text
&& vs || en Bash 🐧

&& avanza solo si el código de salida es 0.
|| actúa solo si es distinto de 0.

El exit code decide el camino. Guárdalo para tus scripts.

#bash #shell #exitcode #linuxtips #xeland314
```

### Threads
```text
En Bash, && y || no son lógica booleana: miran el código de salida del comando anterior. 0 significa éxito; cualquier otro valor, fallo.

#bash
```

### Facebook
```text
¿Qué hacen && y || en la terminal? Encadenan comandos según su código de salida: && sigue si salió bien, || actúa si falló. Animación paso a paso.

#bash #shell #xeland314
```

### YouTube
**Título:** Bash: && vs || explicado con exit codes

```text
&& continúa solo si el comando anterior devolvió 0; || se ejecuta solo si devolvió un valor distinto de 0. Tres escenas: éxito, rescate y la regla general.

Más animaciones: https://xeland314.github.io/animations

#bash #shell #xeland314 #Shorts
```

### RedNote
**Título:** Bash: && vs || | Bash 中的 && 与 ||

```text
&& sigue solo si el comando anterior salió bien (código 0); || actúa si falló. Animación con ejemplos.

&& 只在上一条命令成功（退出码 0）时继续；|| 只在失败时执行。附动画示例。

#bash #shell #exitcode #Linux #操作系统
```

## 006 · SIGTERM vs SIGKILL

- **Carpeta:** `videos/006-sigterm-vs-sigkill/`  ·  **Estado:** rendered  ·  **Duración:** 21 s
- **Gancho:** kill -15 pide permiso. kill -9 no pregunta.
- **Carrusel:** `carruseles/006-sigterm-vs-sigkill` (pending)

### TikTok
```text
SIGTERM le pide al proceso que se cierre: puede cerrar sockets y vaciar buffers. SIGKILL no pregunta: el kernel lo aniquila al instante. Mira la diferencia en 21 segundos.

#sigterm #sigkill #procesos #linuxtips #xeland314
```

### Instagram
```text
SIGTERM vs SIGKILL 🐧

SIGTERM (15): el proceso puede limpiar antes de salir → exit 0.
SIGKILL (9): el kernel lo mata sin preguntar → exit 137.

Guárdalo para tu próximo kill.

#sigterm #sigkill #procesos #linuxtips #xeland314
```

### Threads
```text
kill -9 es el último recurso: el proceso no puede atrapar SIGKILL, así que no cierra sockets ni vacía buffers. Primero prueba con SIGTERM.

#sigterm
```

### Facebook
```text
¿Qué diferencia hay entre kill y kill -9? SIGTERM permite una salida limpia; SIGKILL la impide. Animación paso a paso con el código del handler.

#sigterm #sigkill #xeland314
```

### YouTube
**Título:** SIGTERM vs SIGKILL: cuándo usar kill y kill -9

```text
SIGTERM (15) deja que el proceso limpie y salga con 0. SIGKILL (9) lo destruye sin handler y devuelve 137. Animación paso a paso.

Más animaciones: https://xeland314.github.io/animations

#sigterm #sigkill #xeland314 #Shorts
```

### RedNote
**Título:** SIGTERM vs SIGKILL | SIGTERM 与 SIGKILL

```text
SIGTERM pide cerrar con limpieza (exit 0); SIGKILL aniquila al instante (exit 137). Animación paso a paso.

SIGTERM 让进程优雅退出（退出码 0）；SIGKILL 由内核直接终止（退出码 137）。附动画演示。

#sigterm #sigkill #procesos #Linux #操作系统
```

## 007 · chmod bit a bit

- **Carpeta:** `videos/007-chmod-binary/`  ·  **Estado:** rendered  ·  **Duración:** 21 s
- **Gancho:** 755 no es magia: son 9 bits.
- **Carrusel:** `carruseles/007-chmod-binary` (pending)

### TikTok
```text
chmod 755 no es magia: son 9 bits (rwx para dueño, grupo y otros). Mira cómo cada grupo suma su ejecución y el 644 se vuelve 755.

#chmod #permisos #linuxtips #octal #xeland314
```

### Instagram
```text
chmod 755, bit a bit 🐧

rwx = 4 + 2 + 1. Tres grupos, tres dígitos.
644 → 755 solo agrega la ejecución.

Guárdalo para no volver a adivinar permisos.

#chmod #permisos #linuxtips #octal #xeland314
```

### Threads
```text
chmod 755 es la suma de bits: r=4, w=2, x=1 por cada grupo (dueño, grupo, otros). 7 = rwx, 5 = r-x.

#chmod
```

### Facebook
```text
¿Qué significa chmod 755? Cada dígito es la suma de lectura (4), escritura (2) y ejecución (1) para dueño, grupo y otros. Animación bit a bit.

#chmod #permisos #xeland314
```

### YouTube
**Título:** chmod 755 explicado bit a bit (rwx y octal)

```text
Los permisos de Linux son 9 bits agrupados de 3 en 3. Aquí se ve cómo 644 pasa a 755 al agregar la ejecución.

Más animaciones: https://xeland314.github.io/animations

#chmod #permisos #xeland314 #Shorts
```

### RedNote
**Título:** chmod 755 bit a bit | chmod 755 逐位解析

```text
chmod 755 = rwx + r-x + r-x: cada dígito es la suma de r=4, w=2, x=1. Animación paso a paso.

chmod 755 由三组权限位组成：r=4、w=2、x=1，逐位演示 644 如何变成 755。

#chmod #permisos #linuxtips #Linux #操作系统
```

## 008 · umask: permisos por defecto

- **Carpeta:** `videos/008-umask-permissions/`  ·  **Estado:** rendered  ·  **Duración:** 20 s
- **Gancho:** umask no da permisos: los resta.
- **Carrusel:** `carruseles/008-umask-permissions` (pending)

### TikTok
```text
umask no agrega permisos: los resta. 666 menos 022 es 644 para archivos y 777 menos 022 es 755 para directorios. Y con 077 todo queda privado.

#umask #permisos #linuxtips #bash #xeland314
```

### Instagram
```text
umask en 20 segundos 🐧

Archivo: 666 & ~022 = 644
Directorio: 777 & ~022 = 755
umask 077 → 600 / 700 (solo tú)

Guárdalo para tus servidores.

#umask #permisos #linuxtips #bash #xeland314
```

### Threads
```text
umask 022 es el clásico de servidores: archivos 644, directorios 755. La máscara solo resta bits, jamás los añade.

#umask
```

### Facebook
```text
¿Por qué tus archivos nuevos salen con 644? Por el umask: una máscara que resta bits a los permisos por defecto. Animación bit a bit.

#umask #permisos #xeland314
```

### YouTube
**Título:** umask explicado: por qué los archivos nacen con 644

```text
El umask resta permisos a 666 (archivos) y 777 (directorios). Con 022 queda 644/755; con 077 queda 600/700.

Más animaciones: https://xeland314.github.io/animations

#umask #permisos #xeland314 #Shorts
```

### RedNote
**Título:** umask resta bits | umask：做减法的权限

```text
umask 022: 666 → 644 y 777 → 755. La máscara resta bits, nunca los añade.

umask 022：文件 666→644，目录 777→755。掩码只会去掉权限，不会增加。

#umask #permisos #linuxtips #Linux #操作系统
```

## 009 · Symlink vs Hard Link

- **Carpeta:** `videos/009-symlink-vs-hardlink/`  ·  **Estado:** rendered  ·  **Duración:** 20 s
- **Gancho:** Borra el original y mira qué sobrevive.
- **Carrusel:** `carruseles/009-symlink-vs-hardlink` (pending)

### TikTok
```text
Borras el archivo original. El symlink se rompe; el hard link sigue funcionando. Por qué: el hard link apunta al mismo inodo, el symlink solo guarda una ruta.

#symlink #hardlink #inodo #linuxtips #xeland314
```

### Instagram
```text
Symlink vs hard link 🐧

Hard link: otro nombre para el MISMO inodo.
Symlink: guarda la RUTA del nombre.

rm solo borra la entrada: los datos mueren con el último hard link.

#symlink #hardlink #inodo #linuxtips #xeland314
```

### Threads
```text
rm no borra datos: borra un nombre. Mientras quede un hard link, el inodo sigue vivo; el symlink, en cambio, queda apuntando a nada.

#symlink
```

### Facebook
```text
¿Qué pasa con un symlink y un hard link cuando borras el archivo original? Animación con el inodo en el centro.

#symlink #hardlink #xeland314
```

### YouTube
**Título:** Symlink vs hard link: qué sobrevive a rm

```text
Un hard link comparte el inodo y conserva los datos; un symlink guarda la ruta y se rompe al borrar el original.

Más animaciones: https://xeland314.github.io/animations

#symlink #hardlink #xeland314 #Shorts
```

### RedNote
**Título:** Symlink vs hard link | 软链接与硬链接

```text
El hard link comparte inodo y sobrevive a rm; el symlink guarda la ruta y se rompe.

硬链接共享 inode，删除原文件后仍可访问；软链接只保存路径，会失效。

#symlink #hardlink #inodo #Linux #操作系统
```

## 010 · Go: canal con buffer

- **Carpeta:** `videos/010-go-channels/`  ·  **Estado:** rendered  ·  **Duración:** 22 s
- **Gancho:** Un canal con buffer 2: el tercer envío se queda esperando.
- **Carrusel:** `carruseles/010-go-channels` (pending)

### TikTok
```text
En Go, un canal con buffer 2 deja enviar dos valores sin esperar. El tercer envío se bloquea hasta que alguien lee. Mira al productor y al consumidor en acción.

#golang #goroutines #channels #concurrencia #xeland314
```

### Instagram
```text
Canales con buffer en Go 🐹

ch := make(chan string, 2)
El productor bloquea si el canal está lleno; el consumidor bloquea si está vacío.

Guárdalo para entender goroutines.

#golang #goroutines #channels #concurrencia #xeland314
```

### Threads
```text
Un canal con buffer en Go bloquea al productor cuando se llena y al consumidor cuando se vacía. Así se sincronizan dos goroutines sin locks.

#golang
```

### Facebook
```text
¿Qué pasa cuando un canal con buffer se llena en Go? El productor espera hasta que el consumidor lea. Animación paso a paso.

#golang #goroutines #xeland314
```

### YouTube
**Título:** Go: canal con buffer, productor y consumidor (bloqueos)

```text
Un canal con capacidad 2: dos envíos pasan, el tercero se bloquea hasta que el consumidor lee. También se ve el bloqueo por canal vacío.

Más animaciones: https://xeland314.github.io/animations

#golang #goroutines #xeland314 #Shorts
```

### RedNote
**Título:** Go: canal con buffer | Go 缓冲通道

```text
Un canal con capacidad 2: el tercer envío espera hasta que el consumidor lee.

容量为 2 的缓冲通道：第三次发送会阻塞，直到消费者读取。

#golang #goroutines #channels #Go语言 #编程
```

## 011 · Go: defer (LIFO)

- **Carpeta:** `videos/011-go-defer/`  ·  **Estado:** rendered  ·  **Duración:** 20 s
- **Gancho:** defer ejecuta al revés: el último en entrar es el primero en salir.
- **Carrusel:** `carruseles/011-go-defer` (pending)

### TikTok
```text
En Go, defer apila las llamadas y las ejecuta al revés cuando la función termina. Primero sale el último que registraste. Míralo con tres defers.

#golang #defer #pilas #lifo #xeland314
```

### Instagram
```text
Go defer: la pila LIFO 🐹

Tres defer registrados: db, lock, log.
Al hacer return salen al revés: log, lock, db.

Guárdalo para cerrar recursos sin errores.

#golang #defer #pilas #lifo #xeland314
```

### Threads
```text
Con defer, el último registrado se ejecuta primero. Por eso cierras recursos en el orden inverso al que los abriste, sin pensar en ello.

#golang
```

### Facebook
```text
¿En qué orden se ejecutan los defer en Go? Al revés: último en entrar, primero en salir. Animación con una pila.

#golang #defer #xeland314
```

### YouTube
**Título:** Go defer explicado: pila LIFO paso a paso

```text
Tres defer (conexión db, lock y log) se apilan y salen al revés al hacer return.

Más animaciones: https://xeland314.github.io/animations

#golang #defer #xeland314 #Shorts
```

### RedNote
**Título:** Go defer: pila LIFO | Go defer：后进先出

```text
defer apila llamadas y las ejecuta al revés al terminar la función.

defer 会把调用压栈，函数返回时按后进先出的顺序执行。

#golang #defer #pilas #Go语言 #编程
```

## 012 · File descriptors y redirecciones

- **Carpeta:** `videos/012-file-descriptors/`  ·  **Estado:** rendered  ·  **Duración:** 20 s
- **Gancho:** Cada redirección es reconectar un descriptor.
- **Carrusel:** `carruseles/012-file-descriptors` (pending)

### TikTok
```text
stdin es el 0, stdout el 1 y stderr el 2. Redirigir con > o >> es reconectar un descriptor, y 2>&1 duplica el 2 sobre el 1. Míralo en la tabla del proceso.

#redireccion #stdout #stderr #linuxtips #xeland314
```

### Instagram
```text
File descriptors y redirecciones 🐧

> trunca y reconecta fd1 al archivo.
>> añade al final.
2>&1 duplica fd2 sobre fd1.

Guárdalo para tus scripts.

#redireccion #stdout #stderr #linuxtips #xeland314
```

### Threads
```text
Cada proceso tiene su tabla de descriptores: 0 entrada, 1 salida, 2 errores. Redirigir es solo cambiar a dónde apunta cada uno.

#redireccion
```

### Facebook
```text
¿Qué significa 2>&1? Que el descriptor 2 (errores) apunte a donde ya apunta el 1 (salida). Animación con la tabla de descriptores.

#redireccion #stdout #xeland314
```

### YouTube
**Título:** File descriptors: >, >> y 2>&1 explicados

```text
Los descriptores 0, 1 y 2 y cómo las redirecciones los reconectan: trunca (>), añade (>>) y duplica (2>&1).

Más animaciones: https://xeland314.github.io/animations

#redireccion #stdout #xeland314 #Shorts
```

### RedNote
**Título:** fd: 0, 1 y 2 | 文件描述符 0、1、2

```text
> trunca, >> añade y 2>&1 duplica el descriptor 2 sobre el 1.

> 截断，>> 追加，2>&1 把 fd2 复制到 fd1 所指向的位置。

#redireccion #stdout #stderr #Linux #操作系统
```

## 013 · Python: decoradores

- **Carpeta:** `videos/013-python-decorator/`  ·  **Estado:** rendered  ·  **Duración:** 18 s
- **Gancho:** Un decorador es una función que envuelve a otra: antes, durante y después.
- **Carrusel:** `carruseles/013-python-decorator` (pending)

### TikTok
```text
Un decorador de Python envuelve tu función: mide el tiempo antes, la ejecuta y reporta después. Mira cómo @medir_tiempo hace todo sin tocar el código original.

#python #decoradores #pythontips #funciones #xeland314
```

### Instagram
```text
Decoradores en Python 🐍

@medir_tiempo envuelve a procesar_datos:
1. ANTES: guarda t0
2. DURANTE: corre la función
3. DESPUÉS: imprime el tiempo

Guárdalo para tu próximo proyecto.

#python #decoradores #pythontips #funciones #xeland314
```

### Threads
```text
Un decorador es una función que recibe otra función y devuelve una versión envuelta. @medir_tiempo es azúcar para procesar_datos = medir_tiempo(procesar_datos).

#python
```

### Facebook
```text
¿Qué hace realmente un decorador en Python? Envuelve una función para ejecutar código antes y después. Animación paso a paso.

#python #decoradores #xeland314
```

### YouTube
**Título:** Decoradores en Python: antes, durante y después

```text
@medir_tiempo envuelve a la función original: guarda t0, la ejecuta y reporta el tiempo transcurrido.

Más animaciones: https://xeland314.github.io/animations

#python #decoradores #xeland314 #Shorts
```

### RedNote
**Título:** Python decoradores | Python 装饰器

```text
@medir_tiempo envuelve la función: guarda t0, la ejecuta y muestra el tiempo.

@medir_tiempo 包装原函数：先记录 t0，再执行，最后输出耗时。

#python #decoradores #pythontips #编程 #程序员
```

## 014 · Python: return vs yield

- **Carpeta:** `videos/014-yield-return/`  ·  **Estado:** rendered  ·  **Duración:** 21 s
- **Gancho:** return devuelve todo de golpe; yield, uno a uno.
- **Carrusel:** `carruseles/014-yield-return` (pending)

### TikTok
```text
return construye toda la lista en memoria y la devuelve. yield entrega un valor a la vez y se pausa. Mira cuánta RAM usa cada uno.

#python #yield #generadores #memoria #xeland314
```

### Instagram
```text
return vs yield en Python 🐍

return: acumula todo en RAM, O(N).
yield: un valor activo a la vez, O(1).

Guárdalo para cuando proceses millones de datos.

#python #yield #generadores #memoria #xeland314
```

### Threads
```text
Con yield, una función se convierte en generador: entrega un valor, se pausa y continúa cuando se lo piden. La memoria se mantiene constante.

#python
```

### Facebook
```text
¿Por qué usar yield en lugar de return? Porque un generador no guarda todos los datos en memoria. Animación comparativa.

#python #yield #xeland314
```

### YouTube
**Título:** Python: return vs yield (generadores y memoria)

```text
return acumula toda la lista en RAM (O(N)); yield entrega un elemento a la vez (O(1)). Comparativa animada.

Más animaciones: https://xeland314.github.io/animations

#python #yield #xeland314 #Shorts
```

### RedNote
**Título:** return vs yield | return 与 yield

```text
return 一次返回整个列表；yield 逐个产出并暂停，占用内存更少。

return 一次性返回全部数据；yield 每次只产出一个值并暂停，内存占用恒定。

#python #yield #generadores #编程 #程序员
```

## 015 · Python: match/case

- **Carpeta:** `videos/015-match-case/`  ·  **Estado:** rendered  ·  **Duración:** 19 s
- **Gancho:** match/case es un switch con superpoderes.
- **Carrusel:** `carruseles/015-match-case` (pending)

### TikTok
```text
match/case en Python: una máquina de bebidas elige el case correcto. Escanea cada caso hasta que coincide y libera la bebida. ¿Lo usabas ya?

#python #matchcase #pythontips #control #xeland314
```

### Instagram
```text
match/case en Python 🐍

bebida = "agua"
match bebida: revisa case por case hasta coincidir.

Más legible que una cadena de if/elif. Guárdalo.

#python #matchcase #pythontips #control #xeland314
```

### Threads
```text
match/case llegó a Python 3.10: compara un valor con varios patrones y ejecuta el primero que coincide. Más claro que una cadena de if/elif.

#python
```

### Facebook
```text
¿Cómo funciona match/case en Python? Una máquina de bebidas recorre los cases hasta encontrar el que coincide. Animación paso a paso.

#python #matchcase #xeland314
```

### YouTube
**Título:** Python match/case explicado con una máquina de bebidas

```text
Tres bebidas, tres cases: cómo match compara el valor con cada patrón hasta coincidir y ejecutar su bloque.

Más animaciones: https://xeland314.github.io/animations

#python #matchcase #xeland314 #Shorts
```

### RedNote
**Título:** Python match/case | Python match/case

```text
match/case compara un valor con cada patrón y ejecuta el primero que coincide.

match/case 依次比较各个模式，执行第一个匹配的分支。

#python #matchcase #pythontips #编程 #程序员
```

## 016 · Python: with (context manager)

- **Carpeta:** `videos/016-python-with/`  ·  **Estado:** rendered  ·  **Duración:** 21 s
- **Gancho:** with cierra el recurso aunque todo falle.
- **Carrusel:** `carruseles/016-python-with` (pending)

### TikTok
```text
with garantiza que la conexión se cierre, incluso si el bloque falla con una excepción. Mira __enter__ y __exit__ en dos escenarios: normal y con error.

#python #with #contextmanager #recursos #xeland314
```

### Instagram
```text
with en Python 🐍

__enter__ abre la conexión.
__exit__ la cierra SIEMPRE, incluso con ZeroDivisionError.

Guárdalo para no dejar recursos abiertos.

#python #with #contextmanager #recursos #xeland314
```

### Threads
```text
El bloque with llama a __exit__ pase lo que pase: si hay una excepción, la conexión igual se cierra. Es la forma segura de manejar recursos.

#python
```

### Facebook
```text
¿Qué hace with en Python? Abre el recurso con __enter__ y lo cierra con __exit__, incluso cuando hay un error. Animación con dos escenarios.

#python #with #xeland314
```

### YouTube
**Título:** Python with: context manager y cierre garantizado

```text
__enter__ abre la conexión y __exit__ la cierra siempre, incluso con una excepción. Escenario normal y escenario con error.

Más animaciones: https://xeland314.github.io/animations

#python #with #xeland314 #Shorts
```

### RedNote
**Título:** Python with | Python with

```text
with abre con __enter__ y cierra con __exit__, aunque haya error.

with 用 __enter__ 打开、__exit__ 关闭，即使代码出错也会关闭。

#python #with #contextmanager #编程 #程序员
```

## 017 · HTTP/2: multiplexación

- **Carpeta:** `videos/017-http2-multiplexing/`  ·  **Estado:** rendered  ·  **Duración:** 22 s
- **Gancho:** HTTP/1.1 abre tres conexiones. HTTP/2 manda todo por una.
- **Carrusel:** `carruseles/017-http2-multiplexing` (pending)

### TikTok
```text
HTTP/1.1 usa una conexión por petición y espera cada respuesta. HTTP/2 mete todo en una sola conexión con frames intercalados. Míralo lado a lado.

#http2 #multiplexacion #redes #webperformance #xeland314
```

### Instagram
```text
HTTP/1.1 vs HTTP/2 🌐

HTTP/1.1: una petición por conexión TCP, en fila.
HTTP/2: frames intercalados (streams 1, 3 y 5) en UNA conexión.

Guárdalo para entender por qué tu web carga más rápido.

#http2 #multiplexacion #redes #webperformance #xeland314
```

### Threads
```text
HTTP/2 multiplexa: varios streams viajan intercalados por una sola conexión TCP. Se acabó esperar a que termine la petición anterior.

#http2
```

### Facebook
```text
¿Qué es la multiplexación en HTTP/2? Varias peticiones comparten una conexión con frames intercalados. Animación comparando con HTTP/1.1.

#http2 #multiplexacion #xeland314
```

### YouTube
**Título:** HTTP/2 multiplexación explicada (vs HTTP/1.1)

```text
HTTP/1.1 abre una conexión por petición; HTTP/2 intercala frames de varios streams en una sola conexión TCP.

Más animaciones: https://xeland314.github.io/animations

#http2 #multiplexacion #xeland314 #Shorts
```

### RedNote
**Título:** HTTP/2 multiplexar | HTTP/2 多路复用

```text
HTTP/1.1 一个请求一个连接；HTTP/2 在一个连接里交错传输多个流。

HTTP/1.1 每个请求占用一条连接；HTTP/2 在同一条 TCP 连接中交错发送多个流的帧。

#http2 #multiplexacion #redes #网络 #计算机网络
```

## 018 · HTTP/2: HPACK

- **Carpeta:** `videos/018-http2-hpack/`  ·  **Estado:** rendered  ·  **Duración:** 22 s
- **Gancho:** HPACK reduce 128 bytes de cabeceras a 24.
- **Carrusel:** `carruseles/018-http2-hpack` (pending)

### TikTok
```text
HPACK comprime las cabeceras de HTTP/2: la primera petición guarda cada header en una tabla y la segunda solo manda índices. De 128 bytes a 24.

#http2 #hpack #cabeceras #redes #xeland314
```

### Instagram
```text
HPACK en HTTP/2 🌐

Request 1: guarda los headers en una tabla dinámica (#62, #63, #64).
Request 2: solo manda los índices.
128 B → 24 B (-81 %).

Guárdalo para entender la compresión de cabeceras.

#http2 #hpack #cabeceras #redes #xeland314
```

### Threads
```text
HPACK: cliente y servidor comparten una tabla de cabeceras. Después de la primera petición, repetir un header cuesta apenas un índice.

#http2
```

### Facebook
```text
¿Cómo comprime HTTP/2 las cabeceras? Con HPACK: tablas compartidas y códigos Huffman. Animación con el antes y el después en bytes.

#http2 #hpack #xeland314
```

### YouTube
**Título:** HPACK explicado: compresión de cabeceras en HTTP/2

```text
La primera petición llena la tabla dinámica y la segunda solo envía índices: 128 bytes pasan a 24.

Más animaciones: https://xeland314.github.io/animations

#http2 #hpack #xeland314 #Shorts
```

### RedNote
**Título:** HTTP/2 HPACK | HPACK 头部压缩

```text
HPACK：第一次请求建立动态表，第二次只发送索引，128 字节降到 24 字节。

HPACK 让客户端与服务器共享头部表：首个请求写入表，之后只需发送索引，体积从 128 B 降到 24 B。

#http2 #hpack #cabeceras #网络 #计算机网络
```

## 019 · DMARC: de p=none a reject

- **Carpeta:** `videos/019-dmarc-none-a-reject/`  ·  **Estado:** rendered  ·  **Duración:** 20 s
- **Gancho:** No saltes a p=reject: DMARC se sube por fases.
- **Carrusel:** `carruseles/019-dmarc-none-a-reject` (pending)

### TikTok
```text
Cómo poner DMARC en p=reject sin romper tu correo: primero observa con p=none, arregla lo que falla, pasa a cuarentena y recién ahí rechaza. Caso con datos ficticios.

#dmarc #spf #dkim #seguridadcorreo #xeland314
```

### Instagram
```text
DMARC por fases 🛡️

1. p=none: observa y lee los reportes (rua).
2. Arregla SPF/DKIM de lo legítimo que falla.
3. p=quarantine: lo falso va a spam.
4. p=reject: se rechaza.

Guárdalo para tu dominio.

#dmarc #spf #dkim #seguridadcorreo #xeland314
```

### Threads
```text
Saltar directo a DMARC p=reject es la forma más rápida de perder correos legítimos. Empieza con p=none, lee los reportes y sube de nivel solo cuando estén limpios.

#dmarc
```

### Facebook
```text
¿Cómo se pasa de p=none a p=reject en DMARC sin sorpresas? Con tres fases y un reporte semanal limpio. Animación con un caso ficticio.

#dmarc #spf #xeland314
```

### YouTube
**Título:** DMARC: de p=none a p=reject paso a paso (ruta segura)

```text
Observar con p=none, arreglar SPF y DKIM, pasar a cuarentena y luego rechazar. Caso ficticio con example.com.

Más animaciones: https://xeland314.github.io/animations

#dmarc #spf #xeland314 #Shorts
```

### RedNote
**Título:** DMARC por fases | DMARC 分阶段部署

```text
DMARC：先用 p=none 观察，修复 SPF/DKIM，再到隔离，最后拒绝。虚构案例。

不要直接设置 p=reject：先 p=none 观察报告，修复合法邮件的问题，再依次升级到 quarantine 和 reject。

#dmarc #spf #dkim #IT运维 #网络安全
```

## 020 · DMARC: cómo leer un reporte

- **Carpeta:** `videos/020-dmarc-leer-reporte/`  ·  **Estado:** rendered  ·  **Duración:** 20 s
- **Gancho:** El reporte DMARC te dice quién envía como tú.
- **Carrusel:** `carruseles/020-dmarc-leer-reporte` (pending)

### TikTok
```text
Cómo leer un reporte DMARC: mira cada fuente, revisa SPF y DKIM, calcula el % alineado y decide si subes la política. Ejemplo con datos ficticios.

#dmarc #reporte #spf #dkim #xeland314
```

### Instagram
```text
Leer un reporte DMARC 🛡️

1. Fuente (IP): ¿es tuya, olvidada o desconocida?
2. SPF/DKIM: basta que uno alinee.
3. % alineado: ¿el resto es suplantación?

Si solo falla lo falso, sube la política. Guárdalo.

#dmarc #reporte #spf #dkim #xeland314
```

### Threads
```text
Un reporte DMARC es una lista de quién envió correo con tu dominio. Si lo único que falla es lo que no reconoces, ya puedes subir la política.

#dmarc
```

### Facebook
```text
¿Cómo se lee un reporte agregado de DMARC (rua)? Fuente, SPF, DKIM y porcentaje alineado. Animación con un caso ficticio.

#dmarc #reporte #xeland314
```

### YouTube
**Título:** Cómo leer un reporte DMARC (rua): fuentes, SPF, DKIM y %

```text
Cuatro fuentes ficticias: una propia, una que alinea por DKIM, un CRM olvidado y una suplantación. Cómo decidir cuándo subir la política.

Más animaciones: https://xeland314.github.io/animations

#dmarc #reporte #xeland314 #Shorts
```

### RedNote
**Título:** Leer reporte DMARC | 解读 DMARC 报告

```text
DMARC 报告：逐个查看来源、SPF 和 DKIM，计算对齐比例，再决定是否升级策略。

查看每个发送来源的 SPF 与 DKIM 是否对齐；只要剩下的失败都是伪造邮件，就可以提高策略。

#dmarc #reporte #spf #IT运维 #网络安全
```
