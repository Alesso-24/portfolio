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

### 2026-09-19 — Bloque 3: PISTAS (aislamiento del cobre) paso a paso → `PISTAS.rml`

**Lo que dijo Alessandro (en orden):**
0. **Recargar la página** de mods (grafo general limpio) y seguir con el siguiente archivo. *(Al
   recargar, la barra del navegador muestra el ícono de descarga: ya bajó `PERIFERIA.rml`.)*
1. `read SVG` → select SVG file → elegir el SVG de **las pistas** (diálogo "Abrir", se elige `PISTAS`).
2. Se carga el SVG de pistas en `read SVG`.
3. En `convert SVG image`: seleccionar **invert** (la imagen queda en negro con las pistas en blanco).
4. En `set PCB defaults`: cambiar a **mm** y seleccionar **0.40mm flat**.
5. En `Roland SRM-20 milling machine`: **origen igual a 0, 0, 0**.
6. En `mill raster 2D`: **offset number en 2** y **calculate**.
7. **IMPORTANTE:** en el render **asegurarse de que las pistas sean de cobre**; si no, **hay que
   volver a invertir el SVG** (invert en `convert SVG image`) y recalcular.
8. Volver a mods y **guardar el archivo** (save file).

**Datos leídos de las capturas:**
- `read SVG`: `file: Hola_Mundo-F_Cu.svg`, width 70.9930, height 65.9892, units per inch 25.4.
- `convert SVG image`: dpi 1000, units 25.4, fill background ✔, imagen **2795 × 2598 px = 70.993 × 65.989 mm**
  (antes de invert: fondo blanco/pistas negras; con invert: fondo negro/pistas blancas; el botón
  invert queda con contorno al estar activo).
- `set PCB defaults`: interruptor en **mm** (verde), seleccionado **0.40mm flat** (botón oscuro).
- `mill raster 2D` (preset 0.40mm flat): tool diameter **0.39624 mm** (0.0156 in), cut depth
  **0.1016 mm** (0.004 in), max depth **0.1016 mm** (0.004 in), offset number **2**, offset stepover 0.5,
  direction climb, path merge 1, path order forward, sort distance ✔.
- `Roland SRM-20 milling machine`: speed 4 mm/s, origin **0/0/0** (el campo z aparece con borde
  rojo = foco/edición), jog height z 2 mm, home 0 / 152.4 / 60.5, Estimated time `--:--:--` (aún sin calcular).
- Render 3D: el cobre queda **en relieve/resaltado**, con canales fresados alrededor de trazas y pads
  (se ven VCC y GND grabados).
- `save file`: `ready`, name **`SVG image.rml`**, size **68476** bytes.
- Diálogo "Abrir": se elige `PISTAS` (tooltip: Microsoft Edge HTML Document, **54.4 KB**, mod. 11/09/2026
  07:49); `PERIFERIA` aparece con resaltado tenue (el elegido antes).

**Mapeo imágenes de Alessandro → archivos (por tamaño / comparación de píxeles):**

| # | Paso | Archivo en docs-source |
|---|---|---|
| 45 | 0 · recarga, grafo limpio | `01-periferia-contorno/12-grafo-completo-checkpoint.png` (vive en la carpeta 01) |
| 46 | 1 · elegir PISTAS | `02-pistas-trazas/01-abrir-pistas-svg.png` |
| 47 | 2 · read SVG cargado | **NUEVA** → `02-pistas-trazas/15-read-svg-pistas-cargado.png` |
| 48 | 3 · convert SVG, antes de invert | **NUEVA** → `02-pistas-trazas/16-convert-svg-image-antes-de-invert.png` |
| 49 | 3 · convert SVG, con invert | **NUEVA** → `02-pistas-trazas/17-convert-svg-image-despues-de-invert.png` |
| 50 | 4 · mm + 0.40mm flat | `02-pistas-trazas/03-set-pcb-defaults-flat-0-40mm-a.png` |
| 51 | 5 · origen 0,0,0 | `02-pistas-trazas/07-roland-srm20-config-pistas.png` |
| 52 | 6 · offset 2 + calculate | `02-pistas-trazas/08-mill-raster-2d-config-pistas-b.png` |
| 53 | 7 · render (pistas en cobre) | `02-pistas-trazas/12-toolpath-simulado-pistas.png` |
| 54 | 8 · guardar | **NUEVA** → `02-pistas-trazas/18-guardar-pistas-rml.png` |

Las 4 "NUEVAS" venían pegadas (recortes sin archivo original; no coinciden con ninguna captura
guardada). **Sin usar** en este bloque (se conservan): `02-set-pcb-defaults-unidades-pulgadas.png`
(muestra el interruptor todavía en pulgadas — buen "antes" para el paso de cambiar a mm),
`04`, `05`, `06`, `09`, `10`, `11-convert-svg-image-invert-pistas.png`, `13`, `14`.

**~~⚠ DISCREPANCIA por confirmar~~ → RESUELTA el 2026-09-20 (ver cierre al final). Texto original:**
- En el diálogo (#46) se elige **`PISTAS`**, pero `read SVG` (#47) muestra **`Hola_Mundo-F_Cu.svg`**
  de **70.993 × 65.989 mm**.
- La captura original guardada de esa corrida (`02-pistas-trazas/11-convert-svg-image-invert-pistas.png`)
  muestra **2283 × 2125 px = 57.988 × 53.975 mm**, o sea el **mismo tamaño que PERIFERIA**.
- Si el SVG que alimenta el `.rml` final es el de 70.99 × 65.99 mm (F_Cu) y no el de 57.99 × 53.98
  (PISTAS), las pistas **no coincidirían en tamaño/alineado con el contorno** al fresar. Hay que
  saber cuál es el bueno para documentar el dato correcto.

**Qué se guardó:** `anotaciones.json` → nueva sección `flujo_pistas` con los pasos 0–8 (texto, nodo
general a señalar, captura de detalle y recuadros: fila PISTAS, Abrir, archivo cargado, invert,
resultado en negro/blanco, interruptor mm, 0.40mm flat, origen x/y/z, offset number, calculate,
render "las pistas deben quedar en cobre", save file), más la `advertencia_pendiente`. Verificado
dibujando los recuadros sobre las capturas.

**Al integrar (NO hecho):** la página hoy resume PISTAS en un callout ("0.40mm flat → 0.396 mm,
profundidad 0.1016, invert"); ampliar a estos pasos, destacar la verificación del render (pistas en
cobre / re-invertir) y resolver la discrepancia de tamaño antes de publicar cifras.

### 2026-09-19 — Bloque 4: ORIFICIOS (taladrado) → `ORIFICIOS.rml` + cierre

**Lo que dijo Alessandro (en orden):**
1. **Recargar la página** de mods otra vez; en el primer bloque (`read SVG`) seleccionar el archivo de los orificios.
2. En `set PCB defaults`: **mm** y **0.79mm drill**.
3. **Origen también 0,0,0**, pero **este es el único archivo al que se le cambia la velocidad**: *"los otros
   siempre van a 4, pero este va a 0.3, hay que cambiarlo"* (campo `speed` de `Roland SRM-20 milling machine`).
   → **Queda resuelta la duda abierta:** 4 mm/s en PERIFERIA y PISTAS, **0.3 mm/s solo en taladrado** (convención fija).
4. En `mill raster 2D`: **offset number = 1**, calcular.
5. Verificar en el render que **los orificios queden bien hechos** (se ven 6).
6. Guardar el archivo → ya están los **3 archivos listos para la MonoFab** (`PISTAS.rml`, `ORIFICIOS.rml`, `PERIFERIA.rml`).
7. **Instrucción final:** *"recuerda quiero imágenes generales de todo señalando cómo ubicar cada cosa, botón o
   configuración… reemplaza lo que ya estaba, la verdad no me gustaba; el punto es que si llego yo o alguien en
   el futuro y no se acuerda o no sabe, pueda hacerlo con la facilidad del mundo, boxes naranjas, etc. Crea el
   sitio, asegúrate que todo en orden y commit y deploy."* → **se integra a la página** (rama
   `feat/docs-mods-integracion`), **reemplazando** el paso "9. Toolpaths con mods" anterior.

**Datos leídos de las capturas:**
- Archivo cargado (#57): `file: Hola_Mundo-User_4.svg`, width 70.9930, height 65.9892 (**igual que F_Cu**, distinto de PERIFERIA 57.9882 × 53.9750; ver discrepancia del bloque 3).
- `set PCB defaults`: mm + **0.79mm drill** seleccionado.
- `Roland SRM-20 milling machine`: **speed 0.3** (mm/s), origin 0/0/0, jog height z 2, home 0/152.4/60.5 (captura `05-roland-srm20-config-orificios-b.png`).
- `mill raster 2D`: tool diameter **0.79248 mm** (0.0312 in), cut depth 0.254 mm (0.01 in), max depth 1.7018 mm (0.067 in), offset number **1**, stepover 0.5, climb, path merge 1, forward, sort distance ✔.
- Render: placa de cobre con **6 perforaciones** (2 arriba + 4 en fila).
- `save file`: `ready`, name `SVG image.rml`, size **10128** bytes.

**Mapeo (#) → archivo:** #55 → `02-pistas-trazas/14-grafo-completo-checkpoint.png` · #56 → `03-orificios-taladrado/01-read-svg-vacio.png` ·
#57 → **NUEVA** `03-orificios-taladrado/13-read-svg-orificios-cargado.png` · #58 → `03/.../02-set-pcb-defaults-drill-0-79mm.png` ·
#60 → `02-pistas-trazas/07-roland-srm20-config-pistas.png` (captura de PISTAS reutilizada para señalar `speed`; el resultado con 0.3
está en `03/.../05-roland-srm20-config-orificios-b.png`) · #62 → `03/.../04-mill-raster-2d-config-orificios-a.png` ·
#64 → `03/.../10-toolpath-simulado-orificios-lejos.png` · #65 → `03/.../12-guardar-orificios-rml.png` · #66 → `04-archivos-finales/01-tres-rml-generados.png`.
Numeración saltada por Alessandro (no adjuntas): #59, #61, #63.

**Qué se guardó:** `anotaciones.json` → `flujo_orificios` (pasos 1–8 con recuadros en px).

### 2026-09-20 — Integración a la página y deploy

Con el bloque 4 Alessandro pidió **crear el sitio** (reemplazar el paso 9 anterior), verificar todo y **commit + deploy**.
- Rama de trabajo: `feat/docs-mods-integracion` (sale de `docs/mods-actualizacion` tras mergear `fix/anotaciones-alineacion`).
- Hecho: `src/data/mods-flow.ts` + `ModsStep.astro` + estilos; 29 pasos, 58 imágenes anotadas; mapa numerado de nodos con leyenda;
  tabla resumen; imágenes en WebP (solo las usadas, 31 archivos ≈ 1 MB en `public/`); vPanel mencionado en "Fabricación en MonoFab".
- Verificación: `astro check` 0 errores; build de producción; barrido de las 10 páginas en escritorio y móvil (0 errores de consola,
  0 imágenes rotas, 0 desbordes, sin TODO visibles); todas las medidas `size` de `mods-flow.ts` coinciden con las imágenes reales.
- Correcciones sobre la marcha: espacios perdidos por saltos de línea en JSX, `<strong>` dentro de `.callout`/`.todo-callout` toma estilo de
  título (se usa `<b>`), etiqueta larga "Roland SRM-20 milling machine" desbordaba en móvil (nombre corto), foto SRM-20 con ancho fijo.
- ~~Sin resolver: discrepancia de medidas F_Cu/User_4 vs PERIFERIA~~ → resuelta, ver cierre abajo.

### 2026-09-20 — Cierre de la discrepancia de medidas

Alessandro: *"sí sí, no pasa nada, no lo documentes en el sitio; lo de las medidas es que para algunas capturas usé otros
archivos, pero son la misma cosa."* → La diferencia de tamaños entre `Hola_Mundo-F_Cu.svg` / `Hola_Mundo-User_4.svg`
(70.993 × 65.989 mm) y `PERIFERIA.svg` (57.988 × 53.975 mm) **no es un problema real**. **No se documenta en el sitio** (verificado: ni
`mods-flow.ts` ni la página mencionan esas medidas o nombres de archivo). También aclaró que los números de imagen que faltaban
(#35, #43, #59, #61, #63) no importan.
