# Log de publicaciones

> Generado por `npm run log`. No editar: edita `videos/*/post.json` y `log/hashtags.json`.

| # | Video | Serie | Estado | Día | Publicado en |
|---|---|---|---|---|---|
| 001 | [fork(): una llamada, dos procesos](../videos/001-fork-system-call/) | linux | rendered | 1 | — |
| 002 | [Git: merge vs rebase](../videos/002-git-merge-rebase/) | git | rendered | 4 | — |

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
