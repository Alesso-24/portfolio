# Altium – capturas que pueden faltar

Estado (2026-11-13): la guía quedó **pendiente**. Secciones 1 a 13 con capturas reales (imágenes 1–124). Lo siguiente es texto de referencia con zonas punteadas.
Números que no llegaron: 18-20, 75-77, 86, 88-89, 95, 97-98, 121 (probablemente no eran capturas necesarias; confirmar).
Duplicadas no publicadas: 85 (=84), 105 (≈102), 110 (=109), 123 (=122).

## Por sección (archivo `src/data/altium-flow.ts`)

| Sección | Qué falta | Capturas sugeridas |
|---|---|---|
| 6 · DRC esquemático | Cómo se corrige cada mensaje (p. ej. anotación automática de designadores) | Menú Tools → Annotation, ventana de anotación, DRC limpio tras corregir |
| 7 · Archivo PCB | Confirmar de qué lado aparecen las huellas tras importar (captura 55 las muestra a la derecha) | Ninguna; solo confirmar |
| 8 · Reglas | Botón de descarga del `.RUL` de JLCPCB (sin fuente oficial confirmada) | Página oficial de JLCPCB con el archivo de reglas |
| 9 · Forma | Nombre exacto de los botones 8-11 de la barra; paso de Layer Stack Manager | Design → Layer Stack Manager con Top y Bottom |
| 11 · Rutear | Otros botones de Situs (Edit Layer Directions, Edit Rules, Lock All Pre-routes, Rip-up Violations After Routing) | Diálogo Situs con cada opción |
| 13 · Texto y logo | **Logo**: Place → Graphics, selección del archivo, colocación, tamaño y capa, resultado en 2D y 3D | Menú Place → Graphics; diálogo de imagen; logo colocado; vista 3D; DRC tras el logo |
| 14 · Fabricación | Generación de Gerber y NC Drill y el .zip | File → Fabrication Outputs; ventana Gerber Setup (capas, unidades, formato); ventana NC Drill; carpeta Project Outputs; .zip |
| 15 · JLCPCB | Subida y pedido | Página de carga del .zip, vista previa (Gerber viewer), parámetros del pedido (capas, cantidad, grosor, color, acabado), carrito |

## Por verificar (valores dados por Alessandro)
- Mínimos de vía (taladro 0.3 mm / pad 0.6 mm), holguras y demás reglas frente a las capacidades vigentes de JLCPCB.
- Tablas de atajos de colocación, vistas y ruteo.

## Notas
- El paso de Polygon Pour se quitó (no se usó); se puede recuperar si hace falta.
- Etiqueta de Altium en la página: "Pendiente". Las zonas punteadas son capturas por llegar.
