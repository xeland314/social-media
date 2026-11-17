# Blender: escenas 2.5D dentro de un video

Para piezas donde la profundidad ayuda a entender (pilas, capas, casilleros, edificios de red). El resto del
video sigue siendo Hyperframes: Blender solo produce **un clip mudo** que la composición coloca como cualquier
otro elemento. Probado con Blender 5.2.3 sin interfaz (`~/mybin/blender-*/blender`; otra ruta: `BLENDER=/ruta`).

## Flujo

```bash
mkdir -p videos/029-slug/blender && cp templates/blender/scene.py videos/029-slug/blender/pila.py
npm run blender -- 029 pila --size 270x240      # → videos/029-slug/b3d/pila.mp4 (1080×960, ampliado ×4 sin suavizar)
```

```html
<!-- antes del texto en el DOM y en su propia zona: el check falla si tapa texto -->
<video id="b3d" class="abs clip pixelated" src="b3d/pila.mp4" muted playsinline
       data-start="3" data-duration="4" data-track-index="2"
       style="left:0; top:480px; width:1080px; height:960px; mix-blend-mode:lighten;"></video>
```

- `mix-blend-mode: lighten` hace que el negro del clip deje ver la cuadrícula del fondo.
- El clip se codifica solo con fotogramas clave (`-g 1`): Hyperframes salta a cualquier instante y cae en el
  fotograma exacto (comprobado con `snapshot` a 0,5 / 1,5 / 2,2 / 2,75 s).
- `b3d/*.mp4` no se versiona (regla `*.mp4`); la fuente es `blender/<nombre>.py`. En una máquina nueva:
  `npm run blender` antes de `npm run render`.

## Escribir una escena (`shared/blender/xf.py`)

| Función | Qué hace |
|---|---|
| `xf.setup(seconds, ortho_scale)` | Escena vacía, fondo `--ground`, cámara isométrica ortográfica |
| `xf.box(nombre, centro, tamaño, "token")` | Caja con un color de `tokens.css` (`"sem-ok"`, `"accent"`, `"cat-cream"`…) |
| `xf.key(obj, t, location=…, scale=…)` | Fotograma clave en el segundo `t`; `steps=True` = corte seco (como `tl.set`) |
| `xf.swap_material(obj, t, "token")` | Cambio de color en seco |
| `xf.render()` | Renderiza la secuencia |

Reglas: los colores salen de `tokens.css` (nunca RGB a mano); sin física, partículas ni aleatoriedad; los tiempos
de la escena son los mismos segundos que usa el `tl` de la composición, para que SFX y texto caigan a la vez.

## Motores

| `--engine` | Aspecto | Tiempo (120 fotogramas, 270×240) |
|---|---|---|
| `workbench` (por defecto) | Plano con contorno, el más pixel-art; los colores salen algo más oscuros que el token por la luz de estudio | ~6 s |
| `eevee` | Sombreado suave | ~20 s de arranque + render |
| `cycles` | Luz realista (CPU, 32 muestras) | ~1 s por fotograma |

## Candidatos del plan (dónde el 2.5D aporta)

| Idea | Escena |
|---|---|
| F04 Hash map | Casilleros en fila; la llave cae en el que indica el hash |
| F09 Lista enlazada vs arreglo | Bloques contiguos vs bloques dispersos unidos por flechas |
| F10 Árbol binario de búsqueda | Niveles como pisos; el valor baja eligiendo lado |
| D01 Docker: una imagen en capas | Capas apiladas; la de escritura encima |
| R06 NAT | Casa (red privada) y calle (Internet) con el router en la puerta |
| R04 Portal cautivo | Puerta cerrada hasta aceptar los términos |
| L03 Pipes y backpressure | Tubería que se llena y frena al productor |
| C02 Mutex y deadlock | Dos procesos y una sola llave |

No usar 2.5D donde el protagonista es el código (decoradores, `defer`, `match`): ahí el panel de código explica mejor.
