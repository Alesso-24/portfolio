# Plan — página de la práctica optimizada para lectura (2026-09-20)

Rama: `feat/docs-lectura-interactiva` (sale de `feat/kicad-imagenes-generales`). **Solo local; no se sube ni se despliega hasta que Alessandro lo apruebe.**

## Qué pidió Alessandro

1. **No usar** las capturas recortadas/ampliadas del "Dónde está" (zoom). Señalar las herramientas **sobre la imagen general** con recuadros naranjas numerados, como en mods.
2. **Logo de KiCad** al principio de la página y en las secciones de KiCad.
3. **Optimizar para lectura**: pasos **interactivos y divididos** (un paso a la vez con flechas/botones), imágenes con flechas/carrusel, para que la página **no sea eterna** (hoy mide ~57 000 px).
4. Las **imágenes de huellas** (símbolo + huella) no hacen falta a pantalla completa → **agruparlas en una sola vista general** compacta (ampliables al hacer clic).
5. **Íconos más grandes**, y el ícono del **Editor de placas** introducido al principio junto con los demás editores.
6. **Menú superior con tres pestañas: KiCad · MonoFab · Altium (pendiente)**, cada una con su logo/ícono y título; al elegir una **cambia el contenido de la página**.
7. Hacerlo local y mostrarlo en su navegador predeterminado.

## Diseño

```
Ficha de la práctica + Objetivo (cortos)
[ KiCad ]  [ MonoFab ]  [ Altium · pendiente ]        ← pestañas con logo + título
└─ cada pestaña = un "flujo" de pasos:
   chips de secciones (scroll horizontal en móvil)
   título de la sección · "Paso 3 de 10" · barra de progreso · ◀ ▶
   UN paso visible: texto + (imagen general con recuadros | captura de detalle)
   ◀ Anterior · Siguiente ▶   (también con flechas del teclado)
```

- **Una sola pieza de UI para KiCad y MonoFab**: lista plana de pasos agrupados en secciones; los chips saltan a la sección; Anterior/Siguiente recorren todos los pasos.
- **Ancho de lectura**: la página pasa a 1080 px (prop `wide` en `DocsLayout`) para que el paso use 2 columnas (general | detalle). El texto se mantiene a 70ch.
- **Imágenes**: 1–2 capturas en fila; 3 o más en **carrusel** (flechas, puntos y contador). **Clic = ampliar** (lightbox con recuadros incluidos).
- **Íconos de herramientas**: recuadro de 76 px con el ícono ampliado; leyenda numerada al lado de la imagen general.
- **Editores de KiCad** (9 íconos recortados de la ventana principal) presentados en "Antes de empezar".
- **Referencia de componentes**: tarjetas compactas (R, LED, switch, headers 1×02 y 1×04) con símbolo + huella en miniatura.
- **Deep links**: los anclajes viejos (`#paso-7`, `#mods-periferia`, `#fabricacion`) se conservan como alias; `#kicad`, `#monofab`, `#altium` abren la pestaña.
- **Sin JS** todo queda visible (mejora progresiva). Respeta `prefers-reduced-motion`. Teclado y `aria-*` en pestañas, chips y carrusel.

## Datos y componentes

| Pieza | Archivo |
|---|---|
| Tipos (`Flow`, `Section`, `Step`, `Block`) | `src/data/flow-types.ts` |
| Contenido de KiCad (todo el texto/capturas/recuadros) | `src/data/kicad-flow.ts` |
| Vistas generales de KiCad y recuadros | `src/data/kicad-where.ts` (se elimina el modo "zoom") |
| Contenido de MonoFab/mods | `src/data/mods-flow.ts` + adaptador `src/data/mods-adapter.ts` |
| Tamaños reales de las imágenes | `src/data/image-sizes.json` (generado con `scripts/gen-image-sizes.mjs`) |
| Render de un paso | `src/components/docs/FlowSlide.astro` |
| Flujo (chips + pasos + navegación) | `src/components/docs/Flow.astro` |
| JS (pestañas, flujo, carrusel, lightbox) + estilos | `src/components/docs/DocsInteractive.astro` |
| Página | `primera-placa-kicad.astro` (se reescribe sobre estos datos) |

Se eliminan `KicadWhere.astro` y `ModsStep.astro` (reemplazados por bloques del flujo) y los 3 recortes de zoom.

## Assets nuevos

- Logo KiCad (SVG oficial de `docs-source/.../kicad/logo`), ícono cuadrado "Ki" recortado para la pestaña.
- Logo Altium (el que mandó Alessandro, fondo negro quitado).
- Ícono de MonoFab: la foto de la SRM-20 en mosaico oscuro (no hay logo oficial).
- 9 íconos de editores recortados de la ventana principal; ícono "Círculo" de la barra del editor de placas.

## Verificación antes de mostrar

- `astro check` + build de producción.
- Barrido de las 10 páginas en escritorio/tableta/móvil: sin errores de consola, imágenes rotas ni desbordes.
- Cada recuadro: contenedor = imagen (alineación) en todas las capturas anotadas.
- Recorrido automático de la navegación (siguiente/anterior hasta el final, pestañas, hashes, carruseles, lightbox).
- Altura de la página por pestaña/paso (objetivo: ≤ ~1 pantalla y media por paso).
- Actualizar `CONTEXTO.md`, commit en la rama, abrir en el navegador predeterminado.
