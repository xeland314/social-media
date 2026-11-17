"""Escena de ejemplo: fork() en 2.5D. Un proceso (caja verde) se duplica y el hijo pasa a cian.
Copiar a videos/NNN-slug/blender/<nombre>.py y renderizar con: npm run blender -- NNN <nombre>"""
import os, sys
sys.path.insert(0, os.environ["XF_LIB"])
import xf

xf.setup(seconds=4, ortho_scale=7)
xf.box("mesa", (0, 0, -0.15), (4.6, 2.4, 0.3), "panel-2")
padre = xf.box("padre", (0, 0, 0.5), (1, 1, 1), "sem-ok")
hijo = xf.box("hijo", (0, 0, 0.5), (1, 1, 1), "sem-alt")

# 0–1 s: un solo proceso (el hijo está escondido dentro del padre)
xf.key(hijo, 0, steps=True, scale=(0, 0, 0))
xf.key(padre, 0, location=(0, 0, 0.5))
xf.key(hijo, 0, location=(0, 0, 0.5))
# 1 s: fork() → aparece el hijo y se separan
xf.key(hijo, 1, scale=(0.5, 0.5, 0.5))
xf.key(padre, 1, location=(0, 0, 0.5))
xf.key(hijo, 1, location=(0, 0, 0.5))
xf.key(padre, 2, location=(-1.4, 0, 0.5))
xf.key(hijo, 2, location=(1.4, 0, 0.5))
# 2.5–3 s: el hijo salta (devuelve 0)
xf.key(hijo, 2.5, location=(1.4, 0, 0.5))
xf.key(hijo, 2.75, location=(1.4, 0, 1.2))
xf.key(hijo, 3, location=(1.4, 0, 0.5))

xf.render()
