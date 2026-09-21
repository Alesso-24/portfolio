# Contexto — Documentación de Producción Electrónica

> ## ✅ 2026-09-21: TODO mergeado a `main` y desplegado (`09643fc`)
> Los PRs #48 a #55 (y #53, el arreglo de Lighthouse) están mergeados y en producción: `https://alesso-24.github.io/portfolio/`. Verificado en vivo (200 en las páginas, 404 correcto, sin rayas largas).
>
> **Qué incluye** (detalle de cada rama en el historial de git y en las entradas de abajo): materia como **"Creación de PCBs"** + avatares centrados · auditoría de textos (sin rayas largas ni relleno, Altium "Pendiente") · idioma ES/EN **persistente** en todo el sitio · **/docs completo en inglés** (diccionario `src/data/docs-en.ts`; un texto sin traducir rompe el build) · barrido del sitio (proyectos, `<title>`, menú, contacto, 404) · job de Lighthouse arreglado.
>
> **Respuestas de Alessandro a las dudas (2026-09-21):**
> 1. **CASE 2026: viajó a Shenyang y lo presentó en persona.** El sitio pasó a pasado ("Presented in person · Aug 2026", texto con la beca RAS en pasado), y `BRAND.md` y `llms.txt` se corrigieron. BDAI se dejó igual (solo "Presented", sin afirmar viaje; si también fue en persona, decirlo).
> 2. **Se escribe ORIFICIOS (sin h).** Corregido en el texto de la guía y en el diccionario EN. La captura del explorador de KiCad aún muestra "HORIFICIOS" (es imagen) y el archivo `11-horificios-preview.png` conserva ese nombre a propósito para no romper la ruta.
> 3. **Mergear todo a `main` y desplegar: hecho.**
> 4. **Borrar lo viejo guardando contexto para volver: hecho.** Ver `docs-source/RAMAS-ARCHIVADAS.md` (tabla de ramas, etiquetas `archive/*` y cómo recuperar cada cosa).
>
> **Puntos de restauración (etiquetas en GitHub):** `restore/sitio-antes-de-la-noche-2026-09-20` (`dc0d038`, sitio antes de todo lo de esta noche) y `restore/sitio-pre-liquid-glass-2026-09-21` (`09643fc`, **este** estado, justo antes del rediseño). Para volver: `git checkout -b volver <etiqueta>` y PR a `main`.
>
> **Sigue sin hacerse / pendiente de decisión:** rama `gh-pages` (legacy, archivada, se dejó viva); fresado físico y fotos; valores de R/LED; nombre final de la placa; ¿BDAI también fue en persona?
>
> ## ✅ 2026-09-21: LIQUID GLASS v2 (REFRACCIÓN REAL) DESPLEGADO (`main` = `94c0b57`, PRs #66 a #69)
> Alessandro dijo "dejalo así, ahorita seguimos al rato, ahora haz deploy". Menú superior y controles del visor de imágenes con refracción real (ley de Snell + perfil squircle, filtro SVG con `backdrop-filter`), bisel nítido + centro esmerilado, relleno adaptativo, reflejos de borde direccionales en todas las superficies, regulador de rendimiento. Solo Chromium; Safari/Firefox/iOS y los modos de accesibilidad restrictivos conservan el vidrio v1. **Detalle, mediciones y cómo ajustarlo: `docs-source/LIQUID-GLASS.md` §8.**
> **Puntos de retorno:** `restore/sitio-liquid-glass-v2-2026-09-21` (este), `restore/sitio-liquid-glass-2026-09-21` (v1 esmerilada), `restore/sitio-pre-liquid-glass-2026-09-21` (sin vidrio).
> **Ajustes rápidos si quiere más o menos efecto:** constantes al inicio de `src/scripts/glass-refract.ts` (`STRENGTH`, `BEZEL_MAX`, `BLUR_FROST`, `CA` para la aberración cromática, `LIGHT`) y rellenos del menú en `glass.css` (`.glass-nav .glass-nav__bar[data-refract]`).
> **"Seguimos al rato":** sin tarea concreta pendiente de Liquid Glass; ideas en LIQUID-GLASS.md §7 (barra de progreso de lectura de vidrio, View Transitions, modo oscuro).
>
> ## ✅ 2026-09-21: LIQUID GLASS DESPLEGADO (`main` = `84b6806`, PRs #57 a #64)
> Alessandro aprobó ("BIEN DEPLOY"). Estética Apple "liquid glass" en todo el sitio: menú flotante de vidrio (escritorio y móvil) con indicador deslizante y scroll-spy, botones, tarjetas, chips, formulario, pestañas y controles de la guía, visor de imágenes con desenfoque; texto largo y capturas planas; capa ambiental estática; alternativas sólidas para accesibilidad.
> **Documentación:** `docs-source/LIQUID-GLASS.md` (investigación, dónde sí/no, sistema de diseño en `src/styles/glass.css`, mediciones §6, ideas futuras §7) y `docs-source/ARQUITECTURA-Y-TECNOLOGIAS.md` (stack, recetas para ampliar, QA y git). **Cómo ampliar el vidrio:** superficie nueva = `.glass` + variante (`--read` si lleva texto largo, `--blur` solo si flota sobre contenido).
> **Verificado antes del deploy:** contraste WCAG AA 29/29, modos de accesibilidad, rendimiento comparado con la versión anterior, 10 páginas, 61 pasos en ES y EN. En vivo: 200 en las páginas, 404 correcto.
> **Puntos de retorno (etiquetas):** `restore/sitio-pre-liquid-glass-2026-09-21` (`09643fc`, sin vidrio) y `restore/sitio-liquid-glass-2026-09-21` (`84b6806`, este estado). Volver al diseño anterior: `git checkout -b volver restore/sitio-pre-liquid-glass-2026-09-21`, PR a `main` (o `git revert -m 1` de los merges #57 a #64). Detalle en `RAMAS-ARCHIVADAS.md`.
> **Pendiente / ideas:** ver §7 de LIQUID-GLASS.md (refracción SVG solo Chromium, barra de progreso de lectura, View Transitions, modo oscuro); fresado físico y fotos; valores de R/LED; nombre final de la placa; ¿BDAI también en persona?; rama `gh-pages` legacy.
>
> ---

> ## ✅ Estado actual — 2026-09-20 (cierre de sesión): sitio listo para entrega, TODO en `main` y desplegado
> Fuente de verdad del estado: este bloque. Lo de abajo ("Historial de estados") es bitácora de cómo se llegó aquí.
>
> - **Sitio en producción:** `https://alesso-24.github.io/portfolio/` · práctica: `/docs/produccion-electronica/practicas/primera-placa-kicad/`.
>   Deploy automático al hacer push a `main` (`.github/workflows/ci-cd.yml`, ~1 min). Un solo `main`; ya no hay ramas de trabajo abiertas.
> - **Contenido de la práctica (todo integrado):** página interactiva con pestañas **KiCad · MonoFab · Altium**; KiCad = 30 pasos en 9 secciones
>   (preparación, esquemático, PCB, Gerber) y MonoFab = 31 pasos en 6 secciones (mods.org: PERIFERIA, PISTAS, ORIFICIOS, resumen, fabricación con vPanel).
>   Recuadros naranjas sobre imagen general + captura de detalle, capturas en carrusel, clic para ampliar.
> - **Qué se editó en esta última pasada:** (1) **dependencias** actualizadas dentro de sus rangos semver (astro 7.0.3→7.3.3, sharp 0.34→0.35.4,
>   react/react-dom 19.3.0, tailwind 4.3.3, gsap 3.15, etc.) → `npm audit` pasó de **15 vulnerabilidades (1 crítica, 8 altas) a 0**; reemplaza los 9 PRs de dependabot;
>   (2) **ramas** limpiadas (ver abajo); (3) esta bitácora reordenada.
> - **Verificación previa al deploy (build de producción con las dependencias nuevas):** `astro check` 0 errores · 10 páginas × escritorio/móvil: 0 errores de consola,
>   0 imágenes rotas, 0 desbordes · recorrido de los 61 pasos (KiCad + MonoFab) en escritorio y móvil: 0 imágenes rotas, 0 recuadros desalineados.
> - **Enfoque general (rama `docs/general-pcb-y-fotos`, pendiente de deploy):** el sitio ya no habla de "Práctica 01 / primera placa": la materia se documenta como **Creación de PCBs** (KiCad · MonoFab · Altium). Se quitaron el número 01, "Práctica actual" y "Primera placa en KiCad" de los textos visibles; las URLs (`/practicas/primera-placa-kicad/`) **no cambiaron** para no romper enlaces. Fotos del equipo: avatares cuadrados recortados sobre la cara en `public/images/team/` (`node scripts/make-team-avatars.mjs`; las originales `Alessandro.webp`/`Alexa.webp` siguen intactas, las usa el Hero).
> - **Decisiones que siguen vigentes:** solo español en `/docs`; la tarjeta de Alexa va **sin bio a propósito**; no se documenta la diferencia de medidas entre SVG;
>   la pestaña Altium queda como "pendiente" (aún no migran a Altium); sin efectos vistosos (se descartó el glow/tilt de la foto SRM-20).
> - **Ramas (2026-09-20):** solo queda `main`. Se borraron las locales y remotas ya integradas (`docs/*`, `feat/*`, `fix/*`, `perf/*`, `redesign`, `master`) —
>   las 5 "sin mergear" (`feat/bdai-update-nav-fix`, `feat/case-update-and-copyedit`, `feat/quantum-hackathon-project`, `fix/hero-mobile-overlap`,
>   `fix/last-em-dash-comment`) ya estaban en `main` como PRs squash #27–#31 — y se cerraron los PRs de dependabot #36, #39–#42, #44–#47 por quedar superados.
>   `gh-pages` (rama legacy del deploy manual, sin uso: Pages ya publica con Actions) se dejó sin tocar.
> - **Pendiente real (necesita material o decisión de Alessandro):** (a) fresado físico en la SRM-20 → fotos/resultados (las secciones "Resultados" se quitaron
>   por no haber material; agregarlas cuando exista); (b) cuando eso esté, cambiar la práctica a "completa" en `src/data/docs.ts`; (c) valores reales de
>   R1–R8 y del LED; (d) nombre final de la placa (Hola_Mundo fue solo de prueba); (e) opcionales: páginas "¿Qué es KiCad/MonoFab/Altium?" y guía de Altium.
> - **Dónde editar:** `src/data/kicad-flow.ts` (KiCad), `src/data/mods-flow.ts` + `mods-adapter.ts` (MonoFab), `src/data/kicad-where.ts` (vistas y recuadros),
>   `src/data/docs.ts` (equipo/prácticas). Al agregar imágenes a `public/`: `node scripts/gen-image-sizes.mjs`. `npm run build` ya genera las variantes responsivas.
>
> ## 📜 Historial de estados (más reciente primero)
>
> ### ⚡ Estado al 2026-09-20 — página interactiva + auditoría responsive/rendimiento, MERGEADA y DESPLEGADA
> Se integraron `feat/kicad-imagenes-generales`, `feat/docs-lectura-interactiva` y `perf/auditoria-responsive` a `main` (todo lo de abajo ya está en producción).
> **Auditoría** (10 páginas × 11 anchos de 320 a 2560 px, con red y DOM medidos con Playwright): 0 desbordes horizontales, 0 imágenes rotas, 0 errores de consola.
> - **YouTube bajo demanda** (`src/components/ui/YouTubeFacade.astro`): los 2 videos cargaban ≈4 MB de JS de YouTube al abrir la página; ahora es una portada
>   (miniatura propia `public/images/yt-<id>.webp`) y el iframe `youtube-nocookie` solo se crea al pulsar play. larc-2025: 4.6 MB → 60 KB; self-balancing: 4.6 MB → 55 KB (móvil).
> - **Imágenes responsivas** (`scripts/responsive-images.mjs`, corre en `npm run build`): genera variantes -480/-800/-1200/-1600 (retratos -240…-720) de `dist/images/*.webp`
>   y agrega `srcset`/`sizes`/`width`/`height` a cada `<img>`. Inicio 1.1 MB → 640 KB en móvil; páginas de proyecto 0.3–0.5 MB → 0.06–0.11 MB. (`scripts/optimize-images.mjs` es otro script, el manual de PNG/JPG→WebP; no se tocó.)
> - **Portadas gigantes**: la portada de cada proyecto se veía a 2400×1350 en pantallas de 2560 px (con fotos de 640 px); ahora se limita a 1000 px de ancho.
> - **Hidratación diferida**: Nav `client:idle` (timeout 800 ms) y Contact `client:visible` (≈300 KB de JS menos en la carga inicial).
> - **Táctil/legibilidad**: áreas de toque de 44 px (menú, idioma, "volver", flechas y chips del flujo, carrusel); textos de 10–10.5 px → 11–12 px en docs; grillas con `min()` para que no desborden en 320 px; pie del flujo compacto en móvil.
> - Verificado tras los cambios: recorrido de los 61 pasos (escritorio/tableta/móvil), teclado, carrusel, lightbox, pestañas, video bajo demanda, menú móvil, formulario e idioma.
> - Pendiente conocido: los títulos en mayúsculas de 11 px de las páginas de proyecto (estilos en línea) se dejaron como están.
>
> ### 🧭 Rama `feat/docs-lectura-interactiva` (2026-09-20) — ya mergeada y desplegada
> Sale de `feat/kicad-imagenes-generales` (que a su vez sale de `main`). Plan: `PLAN-lectura-interactiva.md` (esta carpeta).
> La página de la práctica se **rehízo para lectura**: de ~57 000 px de alto a **un paso por pantalla** (~750 px de media).
> - **Pestañas** arriba: **KiCad · MonoFab · Altium (pendiente)**, cada una con su logo/ícono y título; al elegir una cambia el contenido.
>   Deep links: `#kicad`, `#monofab`, `#altium` y las anclas viejas (`#paso-7`, `#mods-pistas`, `#fabricacion`…).
> - **Flujo paso a paso** (KiCad = 30 pasos en 9 secciones; MonoFab = 31 pasos en 6): chips de sección, barra de progreso, Anterior/Siguiente,
>   flechas del teclado, hash por paso. Las capturas de un paso: 1–2 en fila, 3+ en **carrusel** (flechas/puntos); **clic = ampliar** (lightbox con recuadros).
> - **Herramientas**: señaladas **sobre la imagen general** con recuadros numerados + leyenda con **íconos grandes** (78 px). Se quitó el modo "zoom/recorte".
> - **Editores de KiCad** con íconos (9, recortados de la ventana principal) en "Antes de empezar"; el ícono del Editor de placas ya no es el diminuto.
> - **Componentes**: símbolo + huella de los 5 componentes agrupados en tarjetas compactas (miniaturas ampliables) — ya no ocupan pantalla completa.
> - **Datos = fuente de verdad** (editar aquí, no el .astro): `src/data/kicad-flow.ts` (KiCad), `src/data/mods-flow.ts` + `mods-adapter.ts` (MonoFab),
>   `src/data/kicad-where.ts` (vistas generales y recuadros), `src/data/flow-types.ts`. Componentes: `Flow`, `FlowSlide`, `FlowBlock`, `Shot`,
>   `DocsInteractive` (JS + estilos). Tamaños de imágenes: `src/data/image-sizes.json` → regenerar con `node scripts/gen-image-sizes.mjs`
>   cada vez que se agreguen imágenes a `public/`.
> - Assets nuevos en `public/images/docs/produccion-electronica/brand/` (KiCad logo/ícono desde el SVG oficial, Altium sin fondo, MonoFab = foto SRM-20 en mosaico oscuro).
> - Verificación: `astro check` 0 errores · build · recorrido automático de los 61 pasos en escritorio/tableta/móvil (0 imágenes rotas, 0 recuadros desalineados,
>   0 desbordes, 0 errores de consola) · hashes, teclado, carrusel, lightbox, pestañas por teclado · barrido de las 10 páginas del sitio.
>
> ### 🌿 Rama `feat/kicad-imagenes-generales` (2026-09-20) — ya mergeada y desplegada
> Sale de `main`. Dos cosas que pidió Alessandro tras ver la guía de mods:
> 1. **Fix de recuadros desalineados** (los del paso 7.1 "Cambiar a 0.4mm / Clic aquí"): causa real = capturas anotadas que son hijas
>    directas de `.shot-grid` se estiraban a la altura de la celda vecina (la del pie de foto) y los recuadros (en %) se corrían.
>    Solución: `align-items: start` en `.shot-grid`. Verificado midiendo contenedor = imagen en las 87 capturas anotadas, en móvil/tableta/escritorio
>    (antes fallaban 3 casos, ahora 0). Commit `f8c8573`.
> 2. **Todo lo de KiCad anterior a mods** ahora también lleva "Dónde está": imagen general de la ventana + recuadros naranjas sobre el
>    botón/menú/panel de cada paso (misma idea que en mods). 13 bloques (`<KicadWhere>`): menú Herramientas y Administrador de complementos (FabLib),
>    menú Archivo (nuevo proyecto), Editor de esquemas y Editor de placas en la ventana principal, barra de herramientas del esquemático
>    (5 íconos, con acercamiento numerado), Config. de la placa, barra del editor de placas (9 herramientas, con acercamiento), panel de Capas
>    (F.Cu / Edge.Cuts), Enrutar pistas, Zona rellena, Edge.Cuts, Círculo (User.4) y menú Archivo para Gerber.
>    Datos: `src/data/kicad-where.ts` (vistas + zooms, coords en px de la captura original) · componente `src/components/docs/KicadWhere.astro`.
>    Recortes nuevos (nativos, sin escalar): `00-editor-de-esquemas-barra`, `03-editor-barra-herramientas`, `04-editor-panel-capas`
>    (fuente en docs-source, WebP en public).
>
> ### 🚀 Estado al 2026-09-20 — guía completa de mods integrada y desplegada
> El paso **"9. Toolpaths con mods"** de `primera-placa-kicad.astro` se **reemplazó por completo** (lo anterior
> no gustaba) por una guía paso a paso pensada para que **cualquiera, en el futuro, la siga sin recordar nada**:
> - **Cada paso** = grafo completo de mods con **recuadro naranja sobre el nodo** ("Aquí: <nodo>") + captura de
>   detalle con recuadros sobre el botón/campo exacto. 29 pasos, 58 imágenes anotadas.
> - Estructura: 9.1 abrir mods y cargar el programa (+ mapa numerado de los 6 nodos que se tocan) · 9.2 PERIFERIA
>   · 9.3 PISTAS · 9.4 ORIFICIOS · 9.5 resumen (tabla comparativa + los 3 `.rml`). Sección "Fabricación en MonoFab"
>   ahora menciona el **vPanel** (software que controla la MonoFab).
> - **Datos de la guía** (fuente de verdad): `src/data/mods-flow.ts` (nodos, pasos, recuadros en px). Componente:
>   `ModsStep.astro` (**eliminado después**: hoy lo reemplazan `Flow`/`FlowBlock`, ver más abajo). Estilos: `DocsLayout.astro`.
> - Imágenes servidas: solo las 31 usadas, en **WebP** (~1 MB total, antes 3 MB) en
>   `public/images/.../07-monofab-mods/`. Material crudo y bitácora del proceso:
>   `docs-source/.../07-monofab-mods/` (`ACTUALIZACION-CONTEXTO.md` = qué dijo Alessandro bloque por bloque,
>   `anotaciones.json` = recuadros medidos, mapeo de cada captura).
> - **Valores clave documentados:** PERIFERIA = 1.59mm cutout · tool 1.9 mm · offset 2 · origen 0,0,0 · 4 mm/s ·
>   4526 B. PISTAS = invert + 0.40mm flat · tool 0.39624 mm · offset 2 · origen 0,0,0 · 4 mm/s · 68476 B
>   (**verificar en el render que las pistas sean de cobre; si no, re-invertir**). ORIFICIOS = 0.79mm drill ·
>   tool 0.79248 mm · offset 1 · origen 0,0,0 · **0.3 mm/s (única velocidad distinta)** · 10128 B.
> - Ramas: `fix/anotaciones-alineacion` (recuadros en px + pasos 4/5 reordenados + fix móvil) y
>   `docs/mods-actualizacion` se integraron vía `feat/docs-mods-integracion` → `main`.
> - Fix extra: las capturas simples (`.screenshot`) ahora usan `max-width: min(640px, 100%)` (en móvil se cortaban).
> - **✔ Resuelto (2026-09-20):** la diferencia de medidas entre SVG (F_Cu / User_4 70.993 × 65.989 mm vs PERIFERIA
>   57.988 × 53.975 mm) **no es un problema**: Alessandro usó archivos distintos en algunas capturas, pero son lo
>   mismo. **Decisión: no documentar esas medidas en el sitio** (la página no las menciona).
> - Numeración de Alessandro salta #35, #43, #59, #61, #63: sin importancia (Alessandro confirmó que no falta nada).
>
> ### ✅ Estado al 2026-09-19 — pulido para entrega
> Se quitaron todos los TODO / avisos de "pendiente" / placeholders visibles del sitio: objetivo de
> la práctica redactado a partir de lo ya documentado, secciones "Resultados" y el TODO de
> fabricación física removidas (no hay material real todavía — **si se consigue, volver a
> agregarlas**), y la tarjeta de Alexa queda sin bio a propósito (`bio` ahora es opcional en
> `src/data/docs.ts`). Se probó y descartó un tratamiento visual para la foto de la SRM-20 (glow /
> tarjeta oscura con blend) — Alessandro prefirió la imagen simple. Build de producción verificado
> (10 páginas, sin errores de consola, sin imágenes rotas, sin overflow en móvil).
> Nota: en dev (`npm run dev`) puede aparecer `_jsxDEV is not a function` si se corrió
> `npm run build` con el servidor abierto — es solo de dev, reiniciar el servidor lo arregla.
>
> ### Estado al 2026-09-18 (sesión mods.org)
> **Mergeado a `main` y desplegado** (esquemático + PCB completos en KiCad, ver detalle más abajo).
> Además, en esta sesión se organizó material crudo nuevo de **mods.org** (generación de
> toolpaths para la Roland SRM-20 a partir de los 3 SVG exportados de KiCad) en
> `practicas/01-primera-placa/07-monofab-mods/` — **todavía no integrado a la página real**, solo
> organizado. Ver "Assets ya recolectados" y el log de sesión de hoy para el detalle completo.
> URL: `https://alesso-24.github.io/portfolio/docs/produccion-electronica/practicas/primera-placa-kicad`
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
| Sección "Documentación" (hub, nav, i18n=es) | 🟢 En producción | `/docs` |
| Portada Producción Electrónica (equipo) | 🟢 En producción — Alessandro y Alexa con foto; la de Alexa sin bio a propósito | `/docs/produccion-electronica` |
| Lista de prácticas | 🟢 En producción (1 práctica, estado "en progreso") | `/docs/produccion-electronica/practicas` |
| Práctica 1 — KiCad (esquemático + PCB + Gerber) | 🟢 En producción: 30 pasos en pestaña KiCad | `/docs/produccion-electronica/practicas/primera-placa-kicad` |
| Práctica 1 — MonoFab (mods.org → .rml, vPanel) | 🟢 En producción: 31 pasos en pestaña MonoFab | ídem |
| Práctica 1 — Altium | 🟡 Pestaña "pendiente" a propósito (aún no migran a Altium) | ídem |
| Práctica 1 — fresado físico y resultados | 🔲 Sin material (fotos/resultados de la SRM-20) | — |
| Páginas "¿Qué es KiCad / MonoFab / Altium?" | 🔲 Opcionales, no creadas (ruta `/herramientas/<nombre>` reservada) | — |

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
    proyecto y se renombran a algo descriptivo: **`ORIFICIOS`** (perforaciones, capa `User.4`),
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

**Abiertos**
- **Fresado físico real en la SRM-20** con `PERIFERIA.rml`, `PISTAS.rml` y `ORIFICIOS.rml` → fotos y resultados. Al tenerlos: agregar sección "Resultados" y pasar la práctica a
  `completa` en `src/data/docs.ts`. (Recordatorio de la guía: verificar en el render 3D que las pistas sean de cobre; si no, re-invertir.)
- **Valores reales de componentes:** ohmiaje de R1/R3/R5/R7 (pull-down) y R2/R4/R6/R8 (limitadoras) y color/referencia del LED (`R_1206`/`LED_1206` son solo la huella).
- **Nombre final de la placa** — "Hola_Mundo" fue solo el proyecto de prueba para aprender el flujo de KiCad.
- **Opcionales:** páginas de herramientas `/docs/produccion-electronica/herramientas/{kicad,monofab,altium}` y la guía de Altium (cuando migren).

**Resueltos** (se dejan como registro)
- Bio de Alexa → decisión: sin bio, a propósito.
- Objetivo de la práctica → redactado el 2026-09-19 con lo ya documentado.
- Integrar mods.org a la página → hecho (2026-09-20), ahora es la pestaña MonoFab.
- Logo/asset de MonoFab → se usa la foto de la SRM-20 en mosaico oscuro (no hay logo oficial).
- Duda de velocidad por archivo (4 mm/s vs 0.3 mm/s) → confirmada: 0.3 mm/s solo en ORIFICIOS (taladrado).
- Dependabot (29 alertas de GitHub / 15 de `npm audit`) → resueltas el 2026-09-20 con la actualización de dependencias; `npm audit` = 0.
- Ramas viejas y PRs de dependabot → limpiados el 2026-09-20 (solo queda `main`).

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
`ORIFICIOS`, `PERIFERIA` y `PISTAS`.

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

### 2026-09-19 → 2026-09-20 — Pulido para entrega, guía de mods, página interactiva y auditoría (resumen retroactivo)
Registro reconstruido desde el historial de git (estas sesiones no se anotaron en su momento; el detalle está en los banners de arriba y en `PLAN-lectura-interactiva.md`).
- **09-19** — se quitaron TODOs/placeholders visibles; objetivo de la práctica redactado; tarjeta de Alexa sin bio a propósito; se descartó el efecto glow/tilt de la SRM-20.
- **09-20 00:16–00:46** — mods bloques 1–4 (PERIFERIA, PISTAS, ORIFICIOS) organizados y luego integrados como guía completa (reemplazó el antiguo paso 9); cierre de la duda de medidas SVG; fix de recuadros desalineados dentro de `.shot-grid`.
- **09-20 01:02** — mapas "Dónde está" en la parte de KiCad (imagen general + recuadros naranjas).
- **09-20 01:10–01:33** — rediseño para lectura: pestañas KiCad/MonoFab/Altium, un paso por pantalla (de ~57 000 px de alto a ~750 px por paso).
- **09-20 02:01** — auditoría responsive/rendimiento móvil (YouTube bajo demanda, imágenes responsivas, áreas de toque de 44 px). Todo desplegado.

### 2026-09-20 — Cierre: dependencias, ramas y verificación final
Alessandro pidió "arregla todo": contexto, página lista para entrega, ramas y deploy.
- **Dependencias:** `npm update` + `npm audit fix` (rama `chore/actualizar-dependencias`, commit `cf9ad47`): 15 vulnerabilidades → 0; astro 7.3.3, sharp 0.35.4, react 19.3.0, tailwind 4.3.3.
  No se tomaron los saltos mayores (lucide-react 1.x, motion 13, typescript 7) por riesgo de romper la UI sin necesidad.
- **Verificación con las dependencias nuevas** (build de producción + Playwright): 10 páginas × escritorio/móvil sin errores de consola, imágenes rotas ni desbordes; 61 pasos de las pestañas KiCad y MonoFab sin imágenes rotas ni recuadros desalineados.
- **Ramas:** ver "Estado actual" arriba. Solo queda `main` (+ `gh-pages` legacy).
- Merge a `main` (fast-forward) y push → deploy por GitHub Actions.

### 2026-09-20 (noche) — Enfoque general de la materia + fotos centradas
Alessandro pidió: quitar "nuestra primera práctica en KiCad" / "Práctica 01" (la materia es producir PCBs y se documentará KiCad, MonoFab y Altium) y centrar las caras del equipo. Textos cambiados en `src/data/docs.ts`, portada de la materia, lista y página principal de la guía; avatares nuevos recortados sobre la cara. Verificado con build + capturas + 0 errores de consola. Queda local en la rama hasta su visto bueno.

### 2026-09-20 (noche) — Enfoque general, auditoría de textos, idioma persistente, traducción EN y barrido del sitio
Alessandro pidió: (a) quitar "primera práctica / Práctica 01" y documentar la materia como producir PCBs, (b) centrar las caras del equipo, (c) quitar lo que suena a IA (rayas largas, relleno, "aún no migran a Altium", "trabajo en parejas" en el encabezado), (d) que todo Producción Electrónica siga el botón ES/EN, (e) que el sitio funcione perfecto, con ramas y commits ordenados.
- **Rama `docs/general-pcb-y-fotos`:** textos generales; avatares 360×360 recortados sobre la cara (coordenadas medidas a mano en `scripts/make-team-avatars.mjs`; las fotos originales no se tocan, las usa el Hero).
- **Rama `docs/auditoria-textos`:** más de 60 textos con raya larga corregidos (`—` → punto, dos puntos, coma o paréntesis; pies de foto a "Título: detalle"); frase de FabLib recortada; Altium solo "Pendiente"; se quitan los avisos de relleno de `/docs` y de la lista.
- **Rama `feat/idioma-persistente`:** por qué el botón "no hacía nada" en `/docs`: (1) el contenido no tenía versión `.lang-en` y (2) el idioma no se guardaba entre páginas (cada página arrancaba con el suyo). Ahora `Base.astro` aplica `localStorage.lang` antes de pintar y `Nav` lo guarda; sin preferencia, `/docs` = ES y el resto = EN.
- **Rama `feat/docs-i18n-en`:** diccionario ES→EN (clave = español exacto). Decisión: en inglés los nombres de la interfaz de KiCad llevan la etiqueta en español entre paréntesis (las capturas están en español); los recuadros usan la versión corta. `npm run build` falla si falta una traducción. Se agregó `@types/node` para el chequeo de tipos.
- **Rama `fix/auditoria-sitio`:** el barrido encontró que las páginas de proyecto tenían título, etiqueta, ficha y alt en un solo idioma (el cuerpo sí era bilingüe), `<title>` fijo en inglés, aria-labels del menú solo en inglés, la línea de CC del contacto solo en inglés y el 404 con una raya larga. Todo corregido. Ver "Necesitan decisión" arriba para lo que se dejó sin tocar.
- **Herramienta de prueba usada:** `playwright-core` en la carpeta temporal de la sesión + Chromium ya instalado + `astro preview` sobre `dist/`.

### 2026-09-21 — Merge de todo a `main`, deploy, respuestas a las dudas y archivo de ramas
- Respuestas de Alessandro: CASE presentado en persona en China; se escribe ORIFICIOS sin h; mergear lo hecho; borrar lo viejo guardando contexto.
- Ramas nuevas: `fix/case-presentado-en-persona` (#54) y `fix/nombre-orificios` (#55), apiladas sobre la pila anterior.
- Merge a `main` con un commit por PR (#53, #48, #49, #50, #51, #52, #54, #55). Hubo un conflicto en `.gitignore` (dos ramas añadieron líneas al final); se resolvió conservando ambas. Verificación del `main` mergeado: `astro check` 0 errores, build estricto (sin traducciones faltantes), barrido de 10 páginas, 61 pasos en inglés, persistencia. Deploy con GitHub Actions en verde.
- Archivo: etiquetas `restore/*` y `archive/*`, documento `docs-source/RAMAS-ARCHIVADAS.md`, luego se borraron las ramas remotas ya integradas y se cerraron los 9 PRs de dependabot.

### 2026-09-21 — Liquid Glass: implementación, QA y deploy
Permiso de Alessandro para empezar; investigación y plan escritos primero (`LIQUID-GLASS.md`, `ARQUITECTURA-Y-TECNOLOGIAS.md`); implementación en 8 ramas apiladas (plan, base, menú, home, proyectos, docs, movimiento, QA), un PR por rama. Hallazgos: GSAP dejaba un `transform` en línea que anulaba el hover; el naranja de marca con texto blanco no cumplía AA (se profundizó); la capa ambiental animada costaba fluidez (se dejó estática). Deploy tras el visto bueno: merges `--no-ff` en orden, un solo push, Actions en verde, etiqueta de restauración y limpieza de ramas.

### 2026-09-21 (tarde) — Liquid Glass v2: refracción real, QA y deploy
Pedido: "no se ve como vidrio, falta refracción". Investigación (kube.io, LogRocket, ekino) → plan (PR #66) → refracción con filtro SVG (#67) → reflejos direccionales (#68) → regulador de rendimiento y QA (#69). Hallazgos: `saturate(1.6)` teñía de amarillo el crema; la aberración cromática dejaba franjas de color (alfa forzado a 1) y costaba +35 % (desactivada); solo desenfoque borra la lente (bisel nítido + centro esmerilado); Lenis absorbe los `scrollTo` de las pruebas (regulador probado con rueda). Deploy tras el visto bueno: merges `--no-ff` en orden, un solo push, Actions en verde, etiqueta de restauración y limpieza de ramas.
