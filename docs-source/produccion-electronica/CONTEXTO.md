# Contexto — Documentación de Producción Electrónica

> ## ✅ Estado — 2026-09-17: mergeado a `main` y desplegado
> La rama `docs/materias-produccion-electronica` se mergeó a `main` y se hizo push a `origin` —
> el deploy a GitHub Pages corre automático vía `.github/workflows/ci-cd.yml`. El sitio ya está
> **público** en `https://alesso-24.github.io/portfolio/docs/produccion-electronica/practicas/primera-placa-kicad`
> tal como está hoy: **incompleto a propósito** (decisión de Alessandro — no importa que no esté
> terminado). Ver "Pendientes consolidados" abajo para lo que falta.
>
> Nota para retomar en cualquier sesión futura: lee este archivo primero — es la fuente de verdad
> de en qué íbamos. El dev server local (`npm run dev`, sirve en `http://localhost:4321/portfolio/`
> — **ojo con el base path `/portfolio`**, no carga en `localhost:4321/` a secas) no persiste entre
> reinicios ni sesiones, hay que levantarlo de nuevo cada vez.

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
> - `practicas/01-primera-placa/` — capturas paso a paso de la Práctica 1
>
> Las imágenes que sí terminan en el sitio se copian a
> `public/images/docs/produccion-electronica/...` (mismo subpath relativo) — esta carpeta es
> solo el material crudo de trabajo, previo a integrarlo.

---

## Estado general

| Pieza | Estado | Dónde |
|---|---|---|
| Sección "Documentación" (hub, nav, i18n=es) | 🟢 Live en local | `/docs` |
| Portada Producción Electrónica (equipo) | 🟢 Live en local — falta foto/nombre/bio real de la compañera | `/docs/produccion-electronica` |
| Lista de prácticas | 🟢 Live en local (1 práctica listada) | `/docs/produccion-electronica/practicas` |
| Práctica 1 — primera placa en KiCad | 🟡 En progreso: preparación + arranque del esquemático ya en la página real. Falta objetivo, colocar componentes/cablear, ruteo de PCB, fabricación en MonoFab, resultados. | `/docs/produccion-electronica/practicas/primera-placa-kicad` |
| Página "¿Qué es KiCad?" | 🔲 No iniciada — ruta sin crear, esperando contenido | — |
| Página "¿Qué es MonoFab?" | 🔲 No iniciada — ruta sin crear, esperando contenido (ni siquiera está claro qué es MonoFab exactamente — ver pendientes) | — |
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

Todas las capturas de `practicas/01-primera-placa/` también están espejadas en
`public/images/docs/produccion-electronica/practicas/01-primera-placa/` (mismas rutas relativas),
que es de donde la página Astro las sirve.

## Pendientes consolidados

- **Compañera de equipo:** nombre, foto y breve bio reales — hoy es un placeholder en
  `src/data/docs.ts` (`DOCS_SUBJECTS[0].team[1]`).
- **Objetivo de la práctica 1:** qué circuito se diseña, qué problema resuelve, qué aprendizaje
  busca — sigue como `TODO` en la página.
- **Resto del flujo de la práctica 1:** colocar componentes reales y cablear el esquemático →
  diseño/ruteo del PCB → fabricación física en MonoFab → resultados y pruebas.
- **¿Qué es MonoFab exactamente?** ¿Máquina CNC del taller? ¿Software? ¿Nombre del Fab Lab/taller?
  Falta que Alessandro lo explique antes de poder escribir la página.
- **Logo/asset de MonoFab** si existe uno oficial, o confirmar que no aplica (nombre de
  taller/máquina sin marca).
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
