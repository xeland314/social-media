"""Helpers de Blender para escenas 2.5D con la paleta de la marca (ver docs/blender.md).

Lo ejecuta scripts/blender.mjs, que pasa por variables de entorno los colores de
shared/styles/tokens.css (XF_TOKENS), el tamaño, los fps, el motor y la carpeta de salida.
Todo es determinista: sin física, sin ruido animado, sin semillas aleatorias.
"""
import json, math, os
import bpy

TOKENS = json.loads(os.environ.get("XF_TOKENS", "{}"))
FPS = int(os.environ.get("XF_FPS", "30"))


def _lin(c):  # sRGB → lineal (Blender guarda los colores en lineal)
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def color(name):
    """Color de tokens.css por nombre ('accent', 'sem-ok', 'cat-cream'…) como RGBA lineal."""
    h = TOKENS[name].lstrip("#")
    return tuple(_lin(int(h[i:i + 2], 16) / 255) for i in (0, 2, 4)) + (1.0,)


def material(name):
    m = bpy.data.materials.get(name)
    if m:
        return m
    m = bpy.data.materials.new(name)
    m.diffuse_color = color(name)  # lo usa Workbench
    m.use_nodes = True             # lo usan EEVEE y Cycles
    m.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = color(name)
    m.node_tree.nodes["Principled BSDF"].inputs["Roughness"].default_value = 1.0
    return m


def setup(seconds, ortho_scale=8.0, look_at=(0, 0, 0.5)):
    """Escena vacía, fondo negro (--ground), cámara isométrica ortográfica y luz fija."""
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene
    sc.render.fps = FPS
    sc.frame_start, sc.frame_end = 0, round(seconds * FPS) - 1
    sc.render.resolution_x = int(os.environ.get("XF_W", "270"))
    sc.render.resolution_y = int(os.environ.get("XF_H", "480"))
    sc.render.resolution_percentage = 100
    sc.render.filter_size = 0.01            # sin suavizado: píxeles duros
    sc.view_settings.view_transform = "Standard"  # colores exactos de tokens.css
    sc.render.image_settings.file_format = "PNG"
    sc.render.filepath = os.path.join(os.environ.get("XF_OUT", "/tmp/xf"), "f")
    world = bpy.data.worlds.new("w"); world.color = color("ground")[:3]; sc.world = world
    eng = os.environ.get("XF_ENGINE", "workbench")
    if eng == "workbench":
        sc.render.engine = "BLENDER_WORKBENCH"
        sh = sc.display.shading
        sh.light, sh.color_type = "STUDIO", "MATERIAL"
        sh.show_object_outline, sh.object_outline_color = True, color("ground")[:3]
        sh.show_shadows, sh.show_cavity = False, False
        sh.background_type, sh.background_color = "VIEWPORT", color("ground")[:3]
        sc.display.render_aa = "OFF"
    else:
        sc.render.engine = "CYCLES" if eng == "cycles" else "BLENDER_EEVEE"
        if eng == "cycles":
            sc.cycles.samples, sc.cycles.device = 32, "CPU"
        bpy.ops.object.light_add(type="SUN", rotation=(math.radians(50), 0, math.radians(30)))
        bpy.context.object.data.energy = 3.5
    d = 20
    bpy.ops.object.camera_add(location=(look_at[0] + d, look_at[1] - d, look_at[2] + d),
                              rotation=(math.radians(54.736), 0, math.radians(45)))
    cam = bpy.context.object
    cam.data.type, cam.data.ortho_scale = "ORTHO", ortho_scale
    sc.camera = cam
    return sc


def box(name, loc, size, mat):
    """Caja con centro en `loc` y tamaño total `size` (x, y, z)."""
    bpy.ops.mesh.primitive_cube_add(location=loc)
    o = bpy.context.object
    o.name, o.scale = name, (size[0] / 2, size[1] / 2, size[2] / 2)
    o.data.materials.append(material(mat))
    return o


def key(obj, t, steps=False, **props):
    """Fotograma clave en el segundo `t`: key(o, 2.5, location=(0,0,1), scale=(1,1,1)).
    steps=True deja el valor fijo hasta la siguiente clave (equivale a tl.set / steps(1))."""
    f = round(t * FPS)
    for k, v in props.items():
        setattr(obj, k, v)
        obj.keyframe_insert(k, frame=f)
    if steps and obj.animation_data and obj.animation_data.action:
        for fc in _fcurves(obj):
            for kp in fc.keyframe_points:
                if round(kp.co[0]) == f:
                    kp.interpolation = "CONSTANT"


def _fcurves(obj):
    act = obj.animation_data.action
    if hasattr(act, "fcurves") and len(act.fcurves):
        return act.fcurves
    out = []
    for layer in getattr(act, "layers", []):       # acciones por capas (Blender 4.4+)
        for strip in layer.strips:
            for bag in strip.channelbags:
                out.extend(bag.fcurves)
    return out


def swap_material(obj, t, mat):
    """Cambia el color en el segundo `t` (corte seco, como tl.set)."""
    f = round(t * FPS)
    if len(obj.material_slots) == 1:
        first = obj.material_slots[0].material
        obj.data.materials.append(material(mat))
    idx = next(i for i, s in enumerate(obj.material_slots) if s.material == material(mat))
    for p in obj.data.polygons:
        p.keyframe_insert("material_index", frame=max(f - 1, 0))
        p.material_index = idx
        p.keyframe_insert("material_index", frame=f)


def render():
    bpy.ops.render.render(animation=True)
