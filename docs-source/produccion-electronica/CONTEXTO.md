# Contexto — Documentación de Producción Electrónica

> ## ✅ Estado al 2026-09-18 (actualizado, sesión perf + machine-shot)
> **Mergeado a `main` y desplegado** (esquemático + PCB completos en KiCad). Además, el material
> crudo de **mods.org** (generación de toolpaths para la SRM-20 a partir de los 3 SVG de KiCad) ya
> está organizado en `practicas/01-primera-placa/07-monofab-mods/` — **todavía no integrado a la
> página real**. Ver "Assets ya recolectados" y el log de sesiones para el detalle completo.
> URL: `https://alesso-24.github.io/portfolio/docs/produccion-electronica/practicas/primera-placa-kicad`
>
> Después del merge, en una sesión aparte (sin commitear todavía al retomarla) se hizo una pasada
> de performance (conversión a WebP de las 9 imágenes pesadas + ajustes de tamaño mobile) y se le
> dio tratamiento "hero" a la foto de la SRM-20 (tarjeta flotante con glow + tilt 3D al pasar el
> mouse, vía GSAP). Ambos cambios ya se verificaron (`astro check` limpio, página viva en local) y
> se dejaron commiteados — ver log de sesión de hoy.
>
> El dev server local (`npm run dev`, sirve en `http://localhost:4321/portfolio/` — **ojo con el
> base path `/portfolio`**, no carga en `localhost:4321/` a secas) no persiste entre reinicios ni
> sesiones, hay que levantarlo de nuevo cada vez.
>
> Siguiente paso natural al volver: integrar el material de mods.org a la página real (nueva
> sección "Generación de toolpaths con mods" antes de "Fabricación en MonoFab"), o seguir
> esperando material de Alessandro (fresado físico real en la SRM-20, resultados/pruebas) o el
> objetivo de la práctica y los valores reales de componentes. Ver "Pendientes consolidados" abajo.

---

> Bitácora de trabajo para la sección `/docs/produccion-electronica` del portafolio. Aquí se
> registran decisiones, pendientes y un log breve por sesión — el contenido ya volcado a página
> vive en el `.astro` correspondiente (fuente de verdad), no se duplica aquí completo.
>
> **Rama de trabajo:** el trabajo se hizo en `docs/materias-produccion-electronica`, ya mergeada
> (fast-forward) a `main` y desplegada — ver estado arriba.
>
> Estructura de carpetas hermana (`docs-source/produccion-electronica/`):
> - `kicad/` — material crudo para la página "¿Qué es KiCad?"
> - `monofab/` — material crudo para la página "¿Qué es MonoFab?"
> - `altium/` — (futuro) material crudo para la página "¿Qué es Altium?"
> - `practicas/01-primera-placa/` — capturas paso a paso de la Práctica 1:
>   - `00-preparacion/`, `01-esquematico/` — ya integradas a la página real
>   - `02-organizacion/` — técnica de cuadros delimitadores (organización visual del esquema)
>   - `03-pulsadores/` — circuito repetido del módulo pulsador (switch + LED + resistencias)
>   - `04-conectores/` — headers J1 (entradas) y J2 (salidas)
>   - `05-vista-general/` — esquemático completo con los dos bloques agrupados
>   - `referencia-componentes/` — símbolo + huella de cada tipo de componente usado
>     (resistencia, led, switch, pin-header-1x04, pin-header-1x02) — material de referencia
>     reusable, no ligado a un paso numerado específico
>   - `06-editor-placas/` — editor de placas (PCB): configuración inicial, herramientas de
>     dibujo, capas, colocación/ruteo, borde de placa, zona de cobre, perforaciones, etiquetas,
>     resultado final y exportación a Gerber/SVG (ver subcarpetas numeradas dentro)
>   - `07-monofab-mods/` — flujo en **mods.org** (herramienta CAM del CBA/MIT, basada en nodos) que
>     toma los 3 SVG exportados de KiCad (PISTAS, ORIFICIOS, PERIFERIA) y genera las trayectorias
>     de fresado (`.rml`) para la Roland SRM-20. Subcarpetas cronológicas:
>     `00-programa-mill-2d-pcb/` (abrir el programa correcto), `01-periferia-contorno/`,
>     `02-pistas-trazas/`, `03-orificios-taladrado/` (una por archivo SVG procesado) y
>     `04-archivos-finales/` (los 3 `.rml` listos) — **material crudo organizado, aún no
>     integrado a la página real**
> - `monofab/srm-20-roland.png` — foto de referencia de la fresadora Roland SRM-20 (la MonoFab
>   real que usa la materia)
>
> Las imágenes que sí terminan en el sitio se copian a
> `public/images/docs/produccion-electronica/...` (mismo subpath relativo) — esta carpeta es
> solo el material crudo de trabajo, previo a integrarlo.

---

## Estado general

| Pieza | Estado | Dónde |
|---|---|---|
| Sección "Documentación" (hub, nav, i18n=es) | 🟢 Live en local | `/docs` |
| Portada Producción Electrónica (equipo) | 🟢 Live en local — nombre y foto de Alexa ya reales, falta su bio | `/docs/produccion-electronica` |
| Lista de prácticas | 🟢 Live en local (1 práctica listada) | `/docs/produccion-electronica/practicas` |
| Práctica 1 — primera placa en KiCad | 🟢 Live en local: preparación, esquemático completo (organización, 4 pulsadores, conectores I/O, vista general) y PCB completo (configuración, herramientas, capas, ruteo, borde, zona de cobre, perforaciones, etiquetas, exportación a Gerber) ya están en la página real. Falta objetivo de la práctica, valores reales de componentes, fabricación física en MonoFab y resultados. | `/docs/produccion-electronica/practicas/primera-placa-kicad` |
| Página "¿Qué es KiCad?" | 🔲 No iniciada — ruta sin crear, esperando contenido | — |
| Página "¿Qué es MonoFab?" | 🔲 No iniciada — ruta sin crear. Ya identificada: es la **fresadora Roland SRM-20**, usada aquí para fabricar PCBs (foto de referencia guardada en `monofab/`) | — |
| Página "¿Qué es Altium?" | 🔲 No iniciada — se hará más adelante (aún no migran a Altium) | — |

## Decisiones de estructura tomadas

- Las páginas de herramientas (KiCad, MonoFab, Altium) van a vivir bajo
  `/docs/produccion-electronica/herramientas/<nombre>` — son referencia general de la materia,
  no una práctica específica. Pendiente crear las rutas cuando llegue el primer contenido real.
- Cada herramienta se documenta con: logo, qué es, para qué sirve dentro del flujo de la materia
  (diseño esquemático → PCB → fabricación).
- Toda esta sección es en **español únicamente** (no bilingüe como el resto del portafolio) —
  es contenido académico, no parte de la narrativa profesional EN/ES.
- Dentro de una práctica: los pasos de preparación/instalación de librerías van como recuadro
  aparte al inicio (no numerados en el flujo principal); el flujo numerado empieza en la acción
  real (ej. "1. Preparación", "2. Editor de esquemas").
- Sin decidir todavía: si la tabla "herramientas utilizadas" de una práctica se queda ahí o se
  comparte como referencia reusable en la página de la herramienta (ej. KiCad).

## Assets ya recolectados

- `kicad/logo/kicad-logo-wikimedia.svg` — logo oficial de KiCad, Wikimedia Commons, dominio
  público. Fuente: https://commons.wikimedia.org/wiki/File:KiCad-Logo.svg — **ya copiado**
  también a `public/images/` cuando se construya la página de KiCad (aún no creada, por ahora
  solo vive en `docs-source/`).
- `practicas/01-primera-placa/00-preparacion/` (5 capturas) — abrir KiCad, Archivo › Nuevo
  proyecto, proyecto "Hola_Mundo" creado, Herramientas › Administrador de complementos,
  instalación del plugin KiCad FabLib. **Ya integradas** en la página real.
- `practicas/01-primera-placa/01-esquematico/` (9 capturas) — Editor de esquemas vacío + 8
  íconos/diálogos de herramientas (seleccionar componente, alimentación, cable, etiqueta de red,
  texto). **Ya integradas** en la página real.

Todas las capturas de `practicas/01-primera-placa/00-preparacion/` y `01-esquematico/` también
están espejadas en `public/images/docs/produccion-electronica/practicas/01-primera-placa/`
(mismas rutas relativas), que es de donde la página Astro las sirve. **Las carpetas nuevas
(`02-organizacion/` en adelante, ver debajo) todavía no se espejan — se hace al integrar cada
una a la página real.**

- `02-organizacion/` (1 captura) — ícono de la herramienta "dibujar rectángulo" de KiCad, usada
  para delimitar visualmente grupos de componentes en el esquema (sin efecto eléctrico). Atajos
  de teclado relevantes explicados por Alessandro: **E** edita las propiedades de lo seleccionado
  (o doble click), **R** rota 90° lo seleccionado.
- `03-pulsadores/` (1 captura) — circuito completo de un módulo "pulsador" (ejemplo: S3). Se
  construyeron 4 iguales (S1–S4). Cada uno: switch táctil desde V3.3 a un nodo `sN`; ese nodo
  baja por una resistencia a GND (pull-down, define el estado lógico del botón) y en paralelo
  alimenta un LED en serie con otra resistencia limitadora hacia GND (indicador visual de que el
  botón está presionado).
- `04-conectores/` (2 capturas) — J1 "Entradas" (header 1x02: pin 1 = V3.3 vía símbolo de red
  `PWR_3V3`, pin 2 = GND) es la entrada de alimentación externa a la placa; J2 "Salidas" (header
  1x04: pines s1–s4) expone el estado de los 4 pulsadores hacia afuera (ej. a un
  microcontrolador externo que los lea).
- `05-vista-general/` (3 capturas) — el esquemático completo (`Hola_Mundo.kicad_sch`) con dos
  bloques delimitados por cuadros: "Entradas y Salidas" (J1 + J2) arriba a la izquierda, y
  "Pulsadores" (los 4 módulos en cuadrícula 2×2) debajo. Título y cajetín de KiCad sin llenar
  todavía (Sheet/File/Title/Size/Date/Rev en blanco).
- `referencia-componentes/` (10 capturas, símbolo + huella por tipo) — de dónde sale cada
  componente en KiCad:
  - **Resistencia** — símbolo genérico `R`, huella `R_1206` (SMD, 2 pads).
  - **LED** — símbolo genérico `D` (LED), huella `LED_1206` (SMD, 2 pads; ojo con polaridad
    ánodo/cátodo al rotar).
  - **Switch** — símbolo `SW` (`Switch_Tactile_Omron`), huella custom del proyecto
    `Button_Omron_B3SN_6.0x6.0mm` (4 pads THT, eléctricamente 2 pares).
  - **Pin header 1x04** — símbolo `PinHeader_01x04_...`, huella
    `PinHeader_01x04_P2.54mm_Vertical_THT_D1.4mm` (usado en J2).
  - **Pin header 1x02** — mismo símbolo/huella pero versión de 2 pines (usado en J1).
  - Huellas de switch y pin headers son de la librería propia del proyecto (`PCM_fab`), no las
    genéricas de KiCad — resistencia y LED sí usan símbolos genéricos de KiCad con huella
    `PCM_fab` asignada.
- `06-editor-placas/` (41 capturas) — flujo completo del editor de placas (PCB) para
  `Hola_Mundo.kicad_pcb`:
  - **00 — Configuración inicial.** Antes de colocar nada, en `Configuración de la placa` →
    `Reglas de diseño` → `Requerimientos` se fijó el **margen mínimo de cobre (separación entre
    conductores) en 0.4 mm**, acorde al proceso de fresado del material de la placa. El ancho de
    pista también se dejó predefinido en 0.4 mm (con una opción alternativa de 0.8 mm para pistas
    de más corriente). Por separado, al dibujar el contorno físico de la placa en la capa
    `Edge.Cuts` se usó un **ancho de línea de 2 mm** para ese trazo — es el que sigue la fresadora
    SRM-20 al cortar el borde, no una regla global de diseño.
  - **01 — Herramientas de dibujo** usadas en el editor de placas: enrutar pistas, dibujar zona
    rellena, rectángulo (para bordes cuadrados/rectangulares), polígono, línea, arco, curva
    Bézier, imagen de referencia y texto.
  - **02 — Capas.** `F.Cu` (cobre superior) es la capa principal, donde vive todo el cobre de
    este diseño de una sola cara. Las capas `User.1`–`User.4` se usan como capas auxiliares de
    referencia (marcar perforaciones, agregar imágenes, etiquetas) para tener más control al
    exportar. `Edge.Cuts` define el contorno físico/corte de la placa.
  - **03 — Colocación y ruteo.** Los componentes ya acomodados y las pistas ya ruteadas
    completas sobre `F.Cu`.
  - **04 — Borde de la placa.** Forma octagonal (esquinas cortadas) dibujada en `Edge.Cuts` con
    2 mm de ancho de línea (ver punto 00).
  - **05 — Zona de cobre rellena.** Se dibujó el contorno de la placa en `F.Cu` y se usó la
    herramienta de zona rellena — todo el cobre no usado por las pistas queda como plano sólido
    (se ve todo en rojo).
  - **06 — Perforaciones en `User.4`.** Círculos de 0.7 mm de radio marcando dónde van las
    perforaciones (ej. junto a los pads de J2/Salidas), con relleno **Sólido** (no rayado).
  - **07 — Etiquetas en `F.Cu`.** Textos `VCC`, `GND`, `S1`–`S4` colocados directamente en la
    capa de cobre superior como serigrafía/referencia visual de la placa.
  - **08 — Resultado final** del PCB completo: forma octagonal, plano de cobre rojo, pistas,
    etiquetas y headers J1/J2.
  - **09 — Exportación de Gerbers.** `Archivo` → `Salidas de fabricación` → `Gerbers`, formato
    de trazado cambiado a **SVG**, capas incluidas según archivo (`F.Cu`+`Edge.Cuts` para pistas,
    `Edge.Cuts`+`User.4` para perforaciones/periferia), opción **"Ajustar página a la placa"**
    activada, botón `Trazar` y luego `Guardar`. Los archivos se generan en la carpeta del
    proyecto y se renombran a algo descriptivo: **`HORIFICIOS`** (perforaciones, capa `User.4`),
    **`PERIFERIA`** (contorno, `Edge.Cuts`) y **`PISTAS`** (cobre, `F.Cu`).

- `07-monofab-mods/` (47 capturas — se revisaron las 48 del día, se descartó solo 1 por ser una
  captura de otra materia ajena a este trabajo) — flujo completo en **mods.org**
  (https://modsproject.org/, herramienta CAM de nodos del CBA/MIT usada con máquinas de FabLab)
  para convertir los 3 SVG de la Práctica 1 (`PISTAS.svg`, `ORIFICIOS.svg`, `PERIFERIA.svg`,
  exportados desde el editor de placas de KiCad) en trayectorias de fresado para la Roland
  SRM-20. El programa base es **"mill 2D PCB"** (dentro de "SRM-20 mill" en el buscador de
  Programs), que carga un grafo llamado **"Roland Monofab PCB"** con todos los nodos ya
  conectados: `read SVG` → `convert SVG image` → `image threshold` → `distance transform` →
  `offset` → `edge detect` → `orient edges` → `vectorize` → `mill raster 2D` →
  `simulate toolpath` → `Roland SRM-20 milling machine` → `save file` (más `set PCB defaults` y
  `V-bit calculator` como nodos auxiliares de configuración).
  - **00-programa-mill-2d-pcb/** — abrir mods.org, menú Programs, buscar "SRM" (aparecen las
    opciones de SRM-20 mill: 2.5D stl / 2D / 2D PCB / 3D stl, y las de xdesign connect), elegir
    "mill 2D PCB", el grafo completo se carga de una vez.
  - **01-periferia-contorno/** — se carga `PERIFERIA.svg` (el contorno de la placa) en el nodo
    `read SVG`; en `set PCB defaults` se elige el preset **"1.59mm cutout"** (fresa de corte de
    borde); `mill raster 2D` queda con herramienta de 1.9 mm de diámetro, profundidad de corte
    0.254 mm, profundidad máxima 1.7018 mm; el nodo `Roland SRM-20 milling machine` se configura
    con velocidad 4 mm/s y origen/home de la máquina; al calcular, la simulación 3D muestra el
    corte del contorno octagonal ya trazado sobre el stock; se guarda como `PERIFERIA.rml`
    (4526 bytes).
  - **02-pistas-trazas/** — se carga `PISTAS.svg` (el cobre); en `set PCB defaults` se elige el
    preset **"0.40mm flat"** (fresa plana para aislamiento de pistas, no V-bit); `mill raster 2D`
    queda con herramienta de 0.396 mm, profundidad de corte 0.1016 mm (mucho más fina que el
    contorno — solo hay que aislar cobre, no cortar la placa); en `convert SVG image` se activa
    **invert** para que el aislamiento quede del lado correcto; la simulación 3D muestra el
    patrón de pistas completo (con las etiquetas VCC/GND visibles) ya ruteado por la fresa; se
    calcula el toolpath (patrón tipo laberinto, visible en la vista previa del nodo).
  - **03-orificios-taladrado/** — se carga el tercer SVG (perforaciones); en `set PCB defaults`
    se elige el preset **"0.79mm drill"**; el nodo de la SRM-20 baja la velocidad a **0.3 mm/s**
    (mucho más lento que el contorno/pistas, apropiado para taladrar); `mill raster 2D` queda con
    herramienta de 0.79 mm de diámetro; la simulación 3D muestra la placa con las perforaciones ya
    marcadas (2 arriba + 4 en fila, coincide con las perforaciones de `User.4` documentadas en la
    sección 06); se guarda como `ORIFICIOS.rml` (10128 bytes).
  - **04-archivos-finales/** — el Explorador de Windows muestra los 3 archivos `.rml` generados
    hoy: `PISTAS.rml`, `ORIFICIOS.rml`, `PERIFERIA.rml` — listos para pasarlos a la SRM-20 física.
  - Nota: velocidades y orígenes distintos por archivo (4 mm/s para contorno/pistas vs 0.3 mm/s
    para taladrado) — confirmar con Alessandro si esto es una convención fija del flujo mods o
    ajuste manual de esa sesión, para documentarlo bien al integrar a la página.

## Pendientes consolidados

- **Bio de Alexa:** nombre (Alexa Groot) y foto ya son reales en `src/data/docs.ts`
  (`DOCS_SUBJECTS[0].team[1]`) — falta solo su breve descripción/bio.
- **Objetivo de la práctica 1:** qué circuito se diseña, qué problema resuelve, qué aprendizaje
  busca — sigue como `TODO` en la página.
- **Valores reales de componentes:** ohmiaje de las resistencias (pull-down R1/R3/R5/R7 y
  limitadoras R2/R4/R6/R8) y color/referencia exacta del LED — no vienen en las capturas
  (`R_1206`/`LED_1206` son el nombre de la huella, no el valor).
- **Resto del flujo de la práctica 1:** el flujo de generación de toolpaths en mods.org
  (`PERIFERIA.rml`, `PISTAS.rml`, `ORIFICIOS.rml`) ya está organizado en `docs-source/` — falta
  (a) integrarlo a la página real y (b) el fresado físico real en la SRM-20 con esos archivos →
  resultados y pruebas.
- **Integrar el material de mods.org a la página real:** organizado en
  `07-monofab-mods/`, pendiente de volcar a `primera-placa-kicad.astro` (nueva sección antes de
  "Fabricación en MonoFab", algo como "Generación de toolpaths con mods").
- **Logo/asset de MonoFab (Roland/SRM-20)** si existe uno oficial además de la foto ya guardada
  en `monofab/srm-20-roland.png`, o confirmar que la foto del equipo es suficiente.
- **Nombre final de la placa real** — "Hola_Mundo" fue solo el proyecto de prueba para aprender
  el flujo de KiCad.
- Crear las rutas `/docs/produccion-electronica/herramientas/kicad` y `.../monofab` cuando haya
  contenido suficiente para no dejarlas vacías.
- **(No relacionado a esta materia)** 29 vulnerabilidades de Dependabot reportadas por GitHub en
  el repo (1 crítica, 19 altas, 8 moderadas, 1 baja) — revisar cuando Alessandro tenga tiempo.

---

## Log de sesiones

### 2026-09-15 — Kickoff: estructura del sitio + logo de KiCad

Alessandro pidió documentación "a full" del proceso de Producción Electrónica, empezando por
KiCad (migrarán a Altium más adelante; ambas se documentarán). Se decidió la arquitectura de
carpetas/rutas de esta sección (ver arriba) y se descargó el logo oficial de KiCad.
Commits: `be19ab7`, `927284d`.

### 2026-09-15 — Práctica 1, parte 1: preparación + arranque del esquemático

Alessandro mandó 14 capturas con contexto de cada una: abrir KiCad, crear proyecto de prueba
"Hola_Mundo", instalar la librería KiCad FabLib (pidió dejarla como nota aparte, no como paso
numerado), entrar al editor de esquemas, y los primeros 5 íconos de herramientas del esquemático
(seleccionar componente, alimentación, cable, etiqueta de red, texto) con sus diálogos.
Se guardaron y organizaron las capturas en `practicas/01-primera-placa/`. Commit: `325751a`.

### 2026-09-15 — Práctica 1, parte 1: volcado real a la página

Alessandro pidió meter ese material a la página real para verlo. Se integró todo en
`primera-placa-kicad.astro`: la nota de FabLib como recuadro aparte, los pasos 1–3 de preparación
numerados con `.step-num`, el editor de esquemas, y la lista de "herramientas utilizadas" (ícono +
nombre + descripción) con los 3 diálogos de captura. Se agregaron estilos reusables a
`DocsLayout.astro` (`.screenshot`, `.step-num`, `.tool-row`, `.tool-icon-box`) para futuras
páginas de esta sección. Build y `astro check` limpios. Commit: `fed8ba4`.

### 2026-09-17 — Retomar sesión, arreglar acceso local, merge a `main` y deploy real

Se retomó la sesión: rama `docs/materias-produccion-electronica` seguía intacta con último commit
`6f75afe`. Se levantó el dev server (`npm run dev` — en Astro 7 arranca como daemon persistente,
el comando reporta éxito y termina) y al abrir `http://localhost:4321/...` la página no cargaba;
la causa era el `base: '/portfolio'` de `astro.config.mjs` — la URL local correcta lleva ese
prefijo (`http://localhost:4321/portfolio/docs/produccion-electronica/practicas/primera-placa-kicad`).
Ya documentado arriba para no repetir la confusión.

Alessandro pidió ver el trabajo en línea para compartir el link. Se le presentaron las opciones
(Artifact privado / PR sin deploy / merge real a `main`) y eligió **mergear a `main` y desplegar
de verdad**, aceptando explícitamente que el contenido sigue incompleto — solo pidió que quedara
claro qué falta pendiente (ver sección de arriba). Se hizo push de la rama a `origin` para no
perder historial, luego merge a `main` y push de `main` (dispara el deploy vía
`.github/workflows/ci-cd.yml`). URL pública:
`https://alesso-24.github.io/portfolio/docs/produccion-electronica/practicas/primera-placa-kicad`.

### 2026-09-17 — Foto de Alexa + retomar en rama aparte + material del esquemático completo

Se agregó la foto y nombre reales de la compañera de equipo (**Alexa Groot**) en
`src/data/docs.ts` (`public/images/Alexa.webp`, mismo formato 900×1600 que el retrato de
Alessandro); queda pendiente solo su bio. Alessandro pidió volver a trabajar en rama aparte —
como `docs/materias-produccion-electronica` ya estaba mergeada a `main`, se avanzó (fast-forward)
al mismo punto de `main` y se retomó el trabajo ahí. Se levantó el dev server local
(`npm run dev`, recordar el base path `/portfolio/`).

Alessandro mandó 17 capturas del avance real en KiCad: la técnica de cuadros delimitadores para
organizar visualmente el esquema (atajos **E** editar, **R** rotar), el circuito completo de un
módulo "pulsador" (switch + pull-down + LED indicador), los conectores J1 "Entradas" (alimentación)
y J2 "Salidas" (s1–s4), el esquemático completo ya armado con los 4 pulsadores + bloque de I/O
agrupados en cuadros, y referencia de símbolo+huella de cada componente usado (resistencia, LED,
switch táctil Omron, pin headers 1x04 y 1x02). Se organizó todo en subcarpetas nuevas dentro de
`docs-source/produccion-electronica/practicas/01-primera-placa/` (ver estructura arriba) — **por
indicación explícita de Alessandro, solo se organizó el material crudo, todavía no se integró a
la página real** (`primera-placa-kicad.astro`); eso queda para la siguiente sesión.

### 2026-09-17 — Editor de placas (PCB) completo: ruteo, borde, zona de cobre y exportación a gerbers

Se aclaró qué es **MonoFab**: la fresadora **Roland SRM-20** (foto guardada en
`monofab/srm-20-roland.png`), que la materia usa para fabricar PCBs por fresado. Pendiente
consolidado de sesiones anteriores queda resuelto.

Alessandro mandó 43 capturas cubriendo todo el flujo del editor de placas para `Hola_Mundo`: la
configuración inicial de reglas de diseño (margen mínimo de cobre 0.4 mm, acorde al material de
la placa; ancho de línea de 2 mm para el contorno en `Edge.Cuts`, por la fresadora), las
herramientas de dibujo del editor (rutas, zona rellena, rectángulo, polígono, línea, arco, curva
Bézier, imagen de referencia, texto), el uso de capas (`F.Cu` como principal, `User.1`–`User.4`
como auxiliares para perforaciones/etiquetas/control de exportación, `Edge.Cuts` para el
contorno), la colocación y ruteo completo de los 4 pulsadores + conectores, el borde octagonal de
la placa, el llenado de zona de cobre en `F.Cu` (queda todo en rojo), las perforaciones marcadas
como círculos en `User.4`, las etiquetas `VCC`/`GND`/`S1`–`S4` puestas en `F.Cu`, el resultado
final del PCB, y la exportación completa a Gerber en formato **SVG** (`Archivo` → `Salidas de
fabricación` → `Gerbers`, ajustando página a la placa) con los archivos resultantes renombrados a
`HORIFICIOS`, `PERIFERIA` y `PISTAS`.

Se organizó todo en `docs-source/produccion-electronica/practicas/01-primera-placa/06-editor-placas/`
(10 subcarpetas numeradas, ver "Assets ya recolectados" arriba) y la foto de la SRM-20 en
`docs-source/produccion-electronica/monofab/`. Igual que la sesión anterior, **solo se organizó
el material — todavía no se integra a la página real**, queda para cuando Alessandro retome.

### 2026-09-17 (continuación, ya 2026-09-18) — Volcado completo a la página real (esquemático + PCB)

Alessandro pidió integrar todo el material organizado a la página real. Se mergeó todo a
`primera-placa-kicad.astro`:
- Sección 3 "Organización del esquema" (cuadros delimitadores, atajos E/R).
- Sección 4 "Los pulsadores" (circuito del módulo + tabla de referencia resistencia/LED/switch).
- Sección 5 "Conectores de entrada y salida" (J1/J2 + referencia de pin headers 1x02/1x04).
- Sección 6 "Esquemático completo" (vista completa + 2 zooms).
- Sección 7 "Editor de placas (PCB)" completa: configuración inicial (con el texto corregido de
  reglas de diseño), herramientas de dibujo, capas, colocación/ruteo, borde de placa, zona de
  cobre, perforaciones, etiquetas y resultado final.
- Sección 8 "Exportación a Gerber" (menú, formato SVG, capas por archivo, ajustar página,
  trazar/guardar, archivos generados y renombrados con sus vistas previas).
- La sección "Fabricación en MonoFab" ahora identifica la máquina (foto de la SRM-20 +
  explicación breve) aunque el proceso físico de fresado sigue como `TODO`.

Se mirroreó todo el material nuevo de `docs-source/` a
`public/images/docs/produccion-electronica/...` (mismas rutas relativas). `npm run lint`
(`astro check`) sin errores. Página verificada viva en local
(`http://localhost:4321/portfolio/docs/produccion-electronica/practicas/primera-placa-kicad`).

### 2026-09-18 — Merge a `main` y deploy

Alessandro pidió subir todo lo anterior a `main`. Se commiteó en
`docs/materias-produccion-electronica` (commit `108dcd2`, 123 archivos: el `.astro` actualizado +
todas las imágenes nuevas de `docs-source/` y su espejo en `public/images/`), se excluyó
`_scratch/` (contenido ajeno a esta materia). Push de la rama a `origin`, merge a `main`
(fast-forward limpio, sin conflictos — la rama ya partía de la punta de `main`) y push de `main`
a `origin`, lo que dispara el deploy vía `.github/workflows/ci-cd.yml`.

URL pública actualizada:
`https://alesso-24.github.io/portfolio/docs/produccion-electronica/practicas/primera-placa-kicad`.

Nota aparte (no relacionada a este trabajo): GitHub reporta 29 vulnerabilidades de Dependabot en
el repo (1 crítica, 19 altas, 8 moderadas, 1 baja) — son de dependencias existentes, no de estos
cambios; queda como pendiente revisar cuando Alessandro tenga tiempo
(`https://github.com/Alesso-24/portfolio/security/dependabot`).

### 2026-09-18 (continuación) — Flujo de mods.org: de los SVG de KiCad a los .rml de la SRM-20

Alessandro mandó 48 capturas del proceso en **mods.org** para generar las trayectorias de fresado
de la SRM-20 a partir de los 3 SVG ya exportados de KiCad (`PISTAS.svg`, `ORIFICIOS.svg`,
`PERIFERIA.svg`). Las capturas no traían contexto explícito por imagen — se identificó el orden
cronológico real a partir de la marca de tiempo de archivo de cada captura (carpeta
`C:\Users\jordi\OneDrive\Imágenes\Capturas de pantalla\`, todas entre 11:41 y 12:26). En una
primera pasada se descartaron ~18 capturas por parecer recortes/duplicados; Alessandro pidió
revisar de nuevo porque varias eran en realidad tomas repetidas del mismo nodo en momentos
distintos (antes/después de un cambio de valor, o zoom a un botón específico) que sí aportan
detalle del paso. Se volvió a revisar una por una: de las 48, solo se descartó 1 por ser una
captura de otra materia (ajena a este trabajo, un enunciado de tarea en alemán); las 47 restantes
quedaron organizadas.

Resumen del flujo (ver detalle completo en "Assets ya recolectados" arriba): se abre mods.org, se
busca el programa **"mill 2D PCB"** (dentro de "SRM-20 mill"), que carga un grafo pre-armado
**"Roland Monofab PCB"**. Ese grafo se recorre tres veces, una por cada SVG:
**PERIFERIA** (preset "1.59mm cutout", fresa de 1.9 mm, velocidad 4 mm/s) → **PISTAS** (preset
"0.40mm flat", fresa de 0.396 mm, profundidad de corte mucho más fina, `invert` activado en la
conversión) → **ORIFICIOS** (preset "0.79mm drill", fresa de 0.79 mm, velocidad reducida a
0.3 mm/s por tratarse de taladrado). Cada pasada termina con una simulación 3D del resultado sobre
el stock y el guardado del archivo correspondiente. Al final quedan los 3 `.rml` listos:
`PERIFERIA.rml`, `PISTAS.rml`, `ORIFICIOS.rml`.

Se organizó todo en
`docs-source/produccion-electronica/practicas/01-primera-placa/07-monofab-mods/`, en 5
subcarpetas cronológicas (`00-programa-mill-2d-pcb/` a `04-archivos-finales/`). **Por el mismo
criterio usado en sesiones anteriores, solo se organizó el material crudo — todavía no se integró
a la página real** (`primera-placa-kicad.astro`); queda pendiente para cuando Alessandro pida
volcarlo. Queda una duda para confirmar con Alessandro antes de integrar: si la velocidad distinta
por archivo (4 mm/s vs 0.3 mm/s para taladrado) es una convención fija del flujo o un ajuste
manual de esa sesión puntual.

### 2026-09-18 (continuación) — Perf pass (WebP) + tratamiento hero a la foto de la SRM-20

Sesión retomada tras perderse la anterior (chat interrumpido); se recuperó el estado leyendo este
mismo archivo y el `git log`/`git diff` — la rama `main` ya traía commiteado un primer commit de
esta sesión (`01304ad`, conversión a WebP de las 9 imágenes más pesadas — capturas de pantalla
completa y renders 3D de mods — más ajustes de tamaño para mobile en `.screenshot`/`.shot-grid`/
`step-toc`), y quedaban cambios sin commitear: la foto de la SRM-20
(`monofab/srm-20-roland.webp`) reexportada más grande/nítida, y un tratamiento visual nuevo para
esa misma foto en `primera-placa-kicad.astro` — tarjeta `.machine-shot` con glow radial animado de
fondo, flotación vertical suave (`machine-float`), y tilt 3D que sigue el mouse (GSAP
`quickTo` sobre `rotateX`/`rotateY`, con `prefers-reduced-motion` respetado tanto en CSS como en
el script). Estilos nuevos agregados a `DocsLayout.astro` (`.machine-shot`, `.machine-shot__float`,
`.machine-shot__img` + keyframes). Se verificó `astro check` limpio (0 errores) y la página viva en
local (`http://localhost:4321/portfolio/docs/produccion-electronica/practicas/primera-placa-kicad`,
devuelve 200 con el nuevo markup presente). Se commiteó a `main` y se hizo push (dispara deploy vía
`.github/workflows/ci-cd.yml`).
