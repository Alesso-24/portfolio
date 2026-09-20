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
