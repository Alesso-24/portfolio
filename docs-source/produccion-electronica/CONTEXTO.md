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
| Práctica 1 — primera placa en KiCad | 🔲 Plantilla creada (`src/pages/docs/produccion-electronica/practicas/primera-placa-kicad.astro`), sin contenido real todavía |

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
