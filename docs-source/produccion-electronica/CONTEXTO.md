# Contexto — Documentación de Producción Electrónica

> ## ⏸ Pausa de sesión — 2026-09-17
> Alessandro se ausenta un momento, sin mandar material nuevo todavía. Para retomar:
> 1. Lee este archivo primero — es la fuente de verdad de en qué íbamos.
> 2. **Ya mergeado a `main` y desplegado** — la rama `docs/materias-produccion-electronica` se
>    mergeó y pusheó a `origin`, el deploy a GitHub Pages corrió vía `.github/workflows/ci-cd.yml`.
>    El sitio está **público** tal como está hoy: **incompleto a propósito** (decisión explícita de
>    Alessandro, no importa que no esté terminado). Ya no se trabaja en rama aparte — los próximos
>    cambios van directo sobre `main` salvo que se diga lo contrario.
>    URL: `https://alesso-24.github.io/portfolio/docs/produccion-electronica/practicas/primera-placa-kicad`
> 3. El dev server local (`npm run dev`, sirve en `http://localhost:4321/portfolio/` — **ojo con
>    el base path `/portfolio`**, no carga en `localhost:4321/` a secas) no persiste entre
>    reinicios ni sesiones, hay que levantarlo de nuevo cada vez.
> 4. Siguiente paso natural al volver: seguir esperando material de Alessandro para continuar la
>    Práctica 1 (colocar componentes/cablear el esquemático), o aclarar qué es MonoFab si prefiere
>    arrancar esa página primero. Ver "Pendientes consolidados" abajo para el detalle completo.

---

> Bitácora de trabajo para la sección `/docs/produccion-electronica` del portafolio. Aquí se
> registran decisiones, pendientes y un log breve por sesión — el contenido ya volcado a página
> vive en el `.astro` correspondiente (fuente de verdad), no se duplica aquí completo.
>
> **Rama de trabajo:** `docs/materias-produccion-electronica` (no mergeada a `main`).
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

## Pendientes consolidados

- **Bio de Alexa:** nombre (Alexa Groot) y foto ya son reales en `src/data/docs.ts`
  (`DOCS_SUBJECTS[0].team[1]`) — falta solo su breve descripción/bio.
- **Objetivo de la práctica 1:** qué circuito se diseña, qué problema resuelve, qué aprendizaje
  busca — sigue como `TODO` en la página.
- **Valores reales de componentes:** ohmiaje de las resistencias (pull-down R1/R3/R5/R7 y
  limitadoras R2/R4/R6/R8) y color/referencia exacta del LED — no vienen en las capturas
  (`R_1206`/`LED_1206` son el nombre de la huella, no el valor).
- **Resto del flujo de la práctica 1:** fabricación física en la SRM-20 (MonoFab) con los
  archivos ya exportados → resultados y pruebas.
- **Logo/asset de MonoFab (Roland/SRM-20)** si existe uno oficial además de la foto ya guardada
  en `monofab/srm-20-roland.png`, o confirmar que la foto del equipo es suficiente.
- **Nombre final de la placa real** — "Hola_Mundo" fue solo el proyecto de prueba para aprender
  el flujo de KiCad.
- Crear las rutas `/docs/produccion-electronica/herramientas/kicad` y `.../monofab` cuando haya
  contenido suficiente para no dejarlas vacías.

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

### 2026-09-17 — Volcado completo a la página real (esquemático + PCB)

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
**Todavía sin commitear** — pendiente de que Alessandro revise cómo se ve antes de guardar.
