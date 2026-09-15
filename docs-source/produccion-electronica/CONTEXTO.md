# Contexto — Documentación de Producción Electrónica

> Este archivo es la bitácora de trabajo para construir la sección `/docs/produccion-electronica`
> del portafolio. Aquí registro todo lo que Alessandro va pasando (texto, explicaciones, capturas)
> ANTES de convertirlo en páginas reales, para no perder contexto entre sesiones.
>
> Estructura de carpetas hermana (`docs-source/produccion-electronica/`):
> - `kicad/` — capturas y notas para la página "¿Qué es KiCad?"
> - `monofab/` — capturas y notas para la página "¿Qué es MonoFab?"
> - `altium/` — (futuro) capturas y notas para la página "¿Qué es Altium?"
> - `practicas/01-primera-placa/` — capturas y notas paso a paso de la Práctica 1
>
> Las imágenes que sí terminan en el sitio se copian/optimizan a `public/images/docs/...`
> cuando armamos la página final — esta carpeta es solo material crudo de trabajo.

---

## Estado general

| Pieza | Estado |
|---|---|
| Página "¿Qué es KiCad?" | 🔲 No iniciada — esperando contenido |
| Página "¿Qué es MonoFab?" | 🔲 No iniciada — esperando contenido |
| Página "¿Qué es Altium?" | 🔲 No iniciada — se hará más adelante (aún no usan Altium) |
| Práctica 1 — primera placa en KiCad | 🟡 Material del paso 1 (preparación + inicio esquemático) recolectado y organizado. Falta seguir el paso a paso y todavía no se vuelca a la página Astro. |

## Decisiones de estructura tomadas

- Las páginas de herramientas (KiCad, MonoFab, Altium) van a vivir bajo
  `/docs/produccion-electronica/herramientas/<nombre>` — son referencia general de la materia,
  no una práctica específica. Pendiente crear las rutas cuando llegue el primer contenido.
- Cada herramienta se documenta con: logo, qué es, para qué funciona/sirve dentro del flujo de
  la materia (diseño esquemático → PCB → fabricación).
- Todo el contenido de esta sección es en español (no bilingüe como el resto del portafolio).

## Assets ya recolectados

- `kicad/logo/kicad-logo-wikimedia.svg` — logo oficial de KiCad, descargado de Wikimedia Commons
  (dominio público / no alcanza el umbral de originalidad para copyright; también referenciado
  bajo GPL v3+). Fuente: https://commons.wikimedia.org/wiki/File:KiCad-Logo.svg

- `practicas/01-primera-placa/00-preparacion/` — 5 capturas: abrir KiCad, menú Archivo › Nuevo
  proyecto, proyecto "Hola_Mundo" creado, menú Herramientas › Administrador de complementos,
  instalación del plugin KiCad FabLib.
- `practicas/01-primera-placa/01-esquematico/` — captura del Editor de esquemas vacío, y en
  `herramientas/` 8 capturas de los íconos/diálogos de la barra de herramientas del esquemático
  (seleccionar componente, símbolo de alimentación, dibujar cable, etiqueta de red, texto).

---

## Log de contexto (ir agregando entradas conforme Alessandro pase material)

<!--
Formato sugerido por entrada:

### [Fecha] — [Tema/pieza a la que corresponde]
**De Alessandro:** (resumen de lo que explicó/pegó)
**Archivos:** (rutas de capturas guardadas, si aplica)
**Para la página:** (a qué sección/página de docs-source corresponde este material)
**Pendiente:** (qué falta decidir o pedir)
-->

### 2026-09-15 — Kickoff de la sección

**De Alessandro:** Quiere documentación "a full" del proceso de Producción Electrónica. Empezamos
por KiCad (herramienta actual; más adelante migran a Altium, hay que documentar ambas). Pidió una
página dedicada a "¿qué es KiCad?" con logo, qué es, para qué funciona — y lo mismo para MonoFab
(qué son, para qué sirven). Va a ir mandando capturas de pantalla con contexto de a qué corresponde
cada una, para ir armando el paso a paso.

**Archivos:** Descargué el logo oficial de KiCad (ver arriba).

**Para la página:** Herramientas → KiCad (pendiente de crear ruta).

**Pendiente:**
- Contenido real de "¿qué es KiCad?" (versión que usan, para qué la usan en la materia)
- Contenido real de "¿qué es MonoFab?" (qué es exactamente — ¿máquina CNC del taller? ¿software?
  falta que Alessandro lo explique)
- Logo/asset de MonoFab si existe uno oficial, o si es un nombre de taller/máquina sin marca
- Nombre y foto de la compañera de equipo (pendiente desde la portada — ver
  `src/data/docs.ts`)

---

### 2026-09-15 — Práctica 1: Preparación + arranque del esquemático (KiCad)

**De Alessandro:** Mandó el primer tramo del paso a paso de la Práctica 1, con capturas. Pidió
dejar la instalación de la librería como una **nota aparte al principio** de la práctica (no como
paso numerado del flujo principal), y luego empezar el flujo real desde "ir al editor de esquemas".
También arrancó una sección de **"Herramientas utilizadas"** con los símbolos/íconos de la barra
de herramientas del editor de esquemas, uno por uno. Dijo explícitamente que por ahora es solo
para guardar y organizar — el volcado a la página Astro se hace después, cuando tengamos más
material.

**Archivos:** ver rutas abajo, todas dentro de
`docs-source/produccion-electronica/practicas/01-primera-placa/`.

**Paso a paso reconstruido (borrador de prosa, listo para pasar a la página cuando la armemos):**

**Preparación — nota aparte (previa al flujo principal)**

1. Se abre KiCad (versión **KiCad 10.0**). La ventana principal del proyecto muestra los editores
   disponibles: Editor de esquemas, Editor de símbolos, Editor de placas, Editor de huellas, Visor
   Gerber, Conversor de imágenes, Herramientas de cálculo, Editor de hoja de trabajo, y el
   Administrador de complementos y contenido.
   → `00-preparacion/01-abrir-kicad-ventana-principal.png`
2. Desde el menú **Archivo › Nuevo proyecto...** (Ctrl+N) se crea un proyecto nuevo.
   → `00-preparacion/02-menu-archivo-nuevo-proyecto.png`
3. El proyecto se nombra **"Hola_Mundo"** — nuestro primer proyecto de prueba en KiCad. Al crearlo,
   KiCad genera automáticamente `Hola_Mundo.kicad_pro`, `Hola_Mundo.kicad_pcb` y
   `Hola_Mundo.kicad_sch`.
   → `00-preparacion/03-proyecto-hola-mundo-creado.png`
4. **Nota — instalación de una librería necesaria antes de empezar:** desde el menú
   **Herramientas › Administrador de complementos y contenido** (Ctrl+M) se abre el gestor de
   paquetes de KiCad.
   → `00-preparacion/04-menu-herramientas-administrador-complementos.png`
5. Ahí se instala **KiCad FabLib**: una librería de componentes pensada para fabricar PCBs en un
   Fab Lab estándar, con mapeo 1:1 a las piezas del inventario oficial de Fab Lab (reduce fricción
   al aprender electrónica y da más confianza al prototipar rápido).
   - Licencia: CC-BY-4.0
   - Autor: Krisjanis Rijnieks and Fab Academy Community (fabacademy.org)
   - Mantenedor: Krisjanis Rijnieks (rijnieks.com)
   - Fuente: gitlab.fabcloud.org/pub/libraries/electronics/kicad
   → `00-preparacion/05-instalar-kicad-fablib.png`

**Paso 1 — Editor de esquemas**

6. Se entra al **Editor de esquemas** (Ctrl+E) para empezar el esquemático del circuito. Arranca
   con la hoja en blanco, formato A4, cuadro de título en la esquina inferior derecha.
   → `01-esquematico/00-editor-de-esquemas-vacio.png`

**Herramientas utilizadas en el esquemático** (barra lateral derecha del editor):

| Herramienta | Para qué sirve | Capturas |
|---|---|---|
| Seleccionar componente | Abre el buscador de símbolos (22,987 elementos cargados en las librerías) para colocar cualquier componente en el esquemático. | ícono → `herramientas/01-icono-seleccionar-componente.png`; diálogo → `herramientas/02-dialogo-elegir-simbolo.png` |
| Símbolo de alimentación (tierra/⏚) | Abre el buscador de símbolos de alimentación (tierra, +3V3, +5V, +9V, +12V, +24V, +36V, +48V, PWR_FLAG, PWR_GND) — incluye los símbolos `PCM_fab` que vinieron con FabLib. | ícono → `herramientas/03-icono-simbolo-alimentacion.png`; diálogo → `herramientas/04-dialogo-elegir-simbolo-alimentacion.png` |
| Dibujar cable | Traza las conexiones eléctricas (wires) entre los pines de los componentes. | ícono → `herramientas/05-icono-dibujar-cable.png` |
| Etiqueta de red (net label) | Nombra una red eléctrica para conectar puntos del esquemático sin necesidad de un cable físico dibujado entre ellos. | ícono → `herramientas/06-icono-etiqueta-de-red.png` |
| Texto | Agrega texto libre al esquemático (notas, títulos) — abre un diálogo de propiedades con fuente, tamaño, alineación y color. | ícono → `herramientas/07-icono-texto.png`; diálogo → `herramientas/08-dialogo-propiedades-texto.png` |

**Para la página:** esto alimenta dos piezas distintas:
- La **nota de instalación de FabLib** (pasos 4–5) va como recuadro aparte al inicio de la página
  de la Práctica 1 (`primera-placa-kicad.astro`), no como paso numerado del flujo.
- Los pasos 1–3 y 6 son el arranque real del flujo paso a paso de la Práctica 1.
- La tabla de "Herramientas utilizadas" es una sección propia dentro de la práctica (o podría vivir
  en la página general de "¿Qué es KiCad?" como referencia reusable — **pendiente decidir con
  Alessandro** cuando tengamos más contexto de cómo se va a usar en más de una práctica).

**Pendiente:**
- Seguir el paso a paso: falta colocar componentes reales, cablear, y todo lo que sigue hasta
  terminar el esquemático y pasar a PCB.
- Decidir si la tabla de herramientas del esquemático vive solo en la Práctica 1 o se comparte
  como referencia en la página de KiCad.
- Confirmar el nombre final de la placa/proyecto real (esto fue solo el "Hola_Mundo" de prueba).
