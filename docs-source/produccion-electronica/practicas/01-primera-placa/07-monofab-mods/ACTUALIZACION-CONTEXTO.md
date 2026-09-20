# Actualización de la documentación de mods — bitácora de trabajo

> Iniciada 2026-09-19 en la rama `docs/mods-actualizacion` (sale de `main`).
> **Regla de esta fase:** solo se organiza y se guarda contexto aquí, en `docs-source/`. **No se
> toca la página real** (`primera-placa-kicad.astro`) hasta que Alessandro lo pida.
> Todo lo que diga o mande Alessandro se registra abajo, en orden, para poder integrarlo después.

## Estado de ramas al arrancar

| Rama | Estado |
|---|---|
| `main` | `f3df8bb` — desplegada (docs pulidas para entrega) |
| `fix/anotaciones-alineacion` | `256e123` — recuadros naranjas re-medidos + pasos 4/5 reordenados. **Pendiente de que Alessandro la revise**; no mergeada ni subida |
| `docs/mods-actualizacion` | esta rama — solo `docs-source/` |

## Lo que ya estaba documentado de mods (antes de esta actualización)

Ver `../../CONTEXTO.md` → sección `07-monofab-mods/` y el log del 2026-09-18. Resumen: programa
"mill 2D PCB" → grafo "Roland Monofab PCB" recorrido 3 veces (PERIFERIA, PISTAS, ORIFICIOS) →
3 `.rml`. Ya integrado a la página como paso "9. Toolpaths con mods". Subcarpetas de capturas:
`00-programa-mill-2d-pcb/`, `01-periferia-contorno/`, `02-pistas-trazas/`,
`03-orificios-taladrado/`, `04-archivos-finales/`.

## Registro (lo nuevo, en orden)

### 2026-09-19 — Bloque 1: abrir mods y llegar al grafo "Roland Monofab PCB"

**Lo que dijo Alessandro (flujo, en orden):**
1. Se busca el link **https://modsproject.org/** → abre el lienzo vacío.
2. Arriba a la izquierda se selecciona **Programs**.
3. Dentro de **SRM-20 mill** se busca **mill 2D PCB** (se escribe `SRM` en el buscador).
4. Se abre el menú/grafo grande general ("Roland Monofab PCB").

**Preferencia de estilo (aplica a TODA la doc de mods de aquí en adelante):**
- Señalar con **recuadros naranjas** (como el resto del sitio) *dónde* hacer clic/editar, usando
  la **vista general** (captura completa) para que sea fácil ubicar qué seleccionar. Puede
  usarse la imagen precisa del botón, pero **se prefieren los recuadros naranjas**.
- A partir del grafo general: en cada paso de edición se usa la **imagen general que muestra
  todo el grafo, con el recuadro naranja sobre el nodo que se va a editar**, para ubicarlo rápido.

**Capturas recibidas (ya estaban organizadas en `00-programa-mill-2d-pcb/`, se identificaron por tamaño de archivo):**

| Imagen de Alessandro | Captura original (en `Imágenes\Capturas de pantalla`) | Archivo en docs-source |
|---|---|---|
| #26 y #27 (lienzo vacío / vista general) | `...2026-09-18 114156.png` | `00-programa-mill-2d-pcb/01-canvas-vacio.png` |
| #28 (acercamiento al botón Programs) | `...114220.png` | `00-programa-mill-2d-pcb/02-menu-programs-abriendo.png` |
| #29 (Programs, filtro "SRM", mill 2D PCB) | `...114328.png` | `00-programa-mill-2d-pcb/05-buscar-srm-completo.png` |
| #30 (grafo general completo) | `...114358.png` | `00-programa-mill-2d-pcb/07-grafo-completo-cargado.png` |

Archivos de esa carpeta que Alessandro **no mencionó** en este flujo (se conservan, sin asignar a
un paso todavía): `03-menu-programs-completo.png`, `04-buscar-srm-cursor.png`,
`06-mill-2d-pcb-seleccionado.png`, `08-nodo-read-svg-vacio-start-here.png`.

**Qué se guardó:** `anotaciones.json` (en esta carpeta) con:
- recuadro sobre **Programs** en el lienzo vacío (`01-canvas-vacio.png`);
- 2 recuadros en `05-buscar-srm-completo.png`: **buscador (`SRM`)** y **fila "mill 2D PCB"**;
- **mapa de los 22 nodos del grafo general** (`07-grafo-completo-cargado.png`, 1918×1078) con su
  recuadro en píxeles, para reutilizarlo en cada paso posterior. Medidas aproximadas (±5 px),
  verificadas dibujándolas sobre la captura; afinar al integrar.
- El formato es el mismo que `<AnnotatedShot size boxes>` del sitio (px), listo para integrar.

**Pendiente de este bloque:** nada de esto está en la página (regla de la fase). Alessandro sigue
mandando los siguientes pasos (nodos a editar, valores, etc.).

### 2026-09-19 — Bloque 2: PERIFERIA (contorno) paso a paso → `PERIFERIA.rml`

**Lo que dijo Alessandro (en orden):**
1. En el **primer bloque** (`read SVG`) se selecciona **select SVG file** (importar SVG).
2. Se elige el **SVG de periferia** (`PERIFERIA.svg`, carpeta `KiCAD/Hola_Mundo`) y se da Abrir.
   *"En realidad el orden no importa; el punto es obtener los tres archivos."* (los 3 `.rml`).
3. Debe verse el contorno octagonal cargado (read SVG + convert SVG image).
4. En **set PCB defaults**: cambiar a **mm** (interruptor in/mm) y seleccionar **1.59mm cutout**.
5. En **mill raster 2D**: **tool diameter = 1.9 mm** (primera opción, campo mm) y **offset number = 2**.
6. En **Roland SRM-20 milling machine**: marcar **origen en 0, 0, 0** (por defecto viene 10,10,10).
   Si se hiciera **otra placa en la misma máquina y la misma fenólica al mismo tiempo**, se
   modifica **X o Y del segundo archivo** según las medidas de la placa para **no encimarlas y
   aprovechar el espacio**; aquí es una sola placa → **0 a todo**.
7. Volver a **mill raster 2D** y dar **calculate**.
8. Se carga un **render** (pestaña nueva) de la placa: revisar que todo esté en orden y que el
   **corte del contorno esté bien hecho**.
9. Volver a la pestaña de mods y **guardar el archivo** (save file). Este `.rml` es el que se carga
   **para las periferias de la placa en el vPanel** (*el software para controlar las MonoFab*).

**Datos leídos de las capturas (para redactar la página):**
- `read SVG` cargado: `file: PERIFERIA.svg`, width 57.9882, height 53.9750, units per inch 25.4.
- `convert SVG image`: dpi 1000, units 25.4, fill background ✔, imagen 2283 × 2125 px = 57.988 × 53.975 mm.
- `set PCB defaults` (catálogo): Traces = 0.40mm flat / 0.25mm flat / 60° #501 V-bit / 40° #502 V-bit ·
  Drill = 0.79mm drill · Cutout = 0.79mm cutout / **1.59mm cutout**.
- `mill raster 2D` (tras el preset): tool diameter **1.9 mm** (0.07480 in), cut depth 0.254 mm (0.01 in),
  max depth 1.7018 mm (0.067 in), offset number **2** (0 = fill), offset stepover 0.5 (1 = diameter),
  direction **climb** (conventional apagado), path merge 1 (1 = diameter), path order **forward**
  (reverse apagado), sort distance ✔. Botones: calculate / cancel / view.
- `Roland SRM-20 milling machine`: speed **4 mm/s** (sin cambios), origin x/y/z **10/10/10 → 0/0/0**,
  jog height z 2 mm, home x 0 / y 152.4 / z 60.5 mm, botones move to origin / move to home.
  Con origen 0,0,0 → **Estimated time: 00:16:59**.
- Render 3D (pestaña nueva, botones Close/Reset/Top/Front/Left/3D/Stock/Toolpath/X|/Y|/Z|/Orbit;
  clic izq = pan, clic der = rotar, scroll = zoom): `Stack: 57.99 × 53.98 × 1.7 mm (2.283 × 2.125 × 0.067 in) | Tool: flat ø1.90 mm`.
- `save file`: `ready`, name **`SVG image.rml`**, size **4526** bytes (el nombre por defecto; en la
  bitácora anterior aparece como `PERIFERIA.rml` — es el mismo archivo renombrado).
- Diálogo "Abrir" (Windows): carpeta `Jordi - Personal › Escritorio › KiCAD › Hola_Mundo`; hay
  `PERIFERIA`, `PISTAS`, `HORIFICIOS` (los 3 SVG) y `Hola_Mundo-Edge_Cuts / -F_Cu / -User_4`.

**Mapeo imágenes de Alessandro → archivos (identificados por tamaño; ya estaban organizados):**

| # | Paso | Archivo en docs-source |
|---|---|---|
| 31 | 1 · select SVG file | `00-programa-mill-2d-pcb/08-nodo-read-svg-vacio-start-here.png` |
| 32 | 2 · elegir PERIFERIA | `01-periferia-contorno/01-abrir-periferia-svg.png` |
| 33 | 3 · SVG cargado | `01-periferia-contorno/02-read-svg-periferia-cargado.png` |
| 34 | 4 · cambiar a mm | `01-periferia-contorno/03-set-pcb-defaults-catalogo-completo.png` |
| 36 | 4 · elegir 1.59 | `01-periferia-contorno/04-set-pcb-defaults-cutout-1-59mm-seleccionado.png` |
| 37 y 38 | 5 · 1.9 mm + offset 2 | `01-periferia-contorno/06-mill-raster-2d-config-contorno-a.png` (**#37 y #38 son la misma imagen**, idénticas pixel a pixel) |
| 39 | 6 · origen (10,10,10 por defecto) | `01-periferia-contorno/07-roland-srm20-config-contorno.png` |
| 40 | 6 · origen 0,0,0 + tiempo 00:16:59 | **NUEVA** → `01-periferia-contorno/07b-roland-srm20-origen-0-0-0.png` (no existía; venía pegada, sin archivo original) |
| 41 | 7 · calculate | `01-periferia-contorno/08-mill-raster-2d-config-contorno-b.png` |
| 42 | 8 · render | `01-periferia-contorno/10-toolpath-simulado-contorno.png` |
| 44 | 9 · guardar | `01-periferia-contorno/11-guardar-periferia-rml.png` |

Sin usar en este bloque (se conservan): `05-set-pcb-defaults-cutout-1-59mm-detalle.png`,
`09-clic-calculate.png`, `12-grafo-completo-checkpoint.png`. **Numeración de Alessandro:** saltó
#35 y #43 (no llegaron adjuntas) — probablemente duplicados/recortes; preguntar si falta algo.

**Qué se guardó:** `anotaciones.json` → nueva sección `flujo_periferia` con los **9 pasos** (texto,
nodo del grafo general a señalar, captura de detalle y recuadros en px sobre cada campo:
select SVG file, fila PERIFERIA, Abrir, interruptor mm, 1.59mm cutout, tool diameter, offset
number, origen x/y/z, tiempo estimado, calculate, save file). Verificado dibujando los recuadros
sobre las capturas. Cada paso usa la imagen general con recuadro en el nodo (`grafo_general.nodos`).

**Al integrar a la página (NO hecho):** hoy la página resume PERIFERIA en un solo callout + 2
capturas (paso "9. Toolpaths con mods"). Habrá que expandirlo a estos 9 pasos numerados con
imagen general + recuadro por nodo; corregir el dato de origen (**0,0,0 explícito**, no solo
"origen/home"); mencionar el **vPanel** y la regla de posicionar placas múltiples (X/Y del 2.º archivo).
**Sigue abierto** (de bloques anteriores): si la velocidad distinta por archivo (4 mm/s vs 0.3 mm/s
en taladrado) es convención fija — aquí la velocidad 4 mm/s quedó en el valor por defecto.
