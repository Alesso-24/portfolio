# Liquid Glass: investigación, decisiones, sistema de diseño y avance

Pedido de Alessandro (2026-09-21): darle a **todo el sitio** una estética Apple "liquid glass" (menú de arriba, animaciones y detalles), **manteniendo lo mismo pero como un upgrade**: que se vea precioso **sin perder funcionalidad ni facilidad de lectura** (solo cambio estético). Orden: investigar → evaluar dónde sí y dónde no → implementar, con control de git y bitácora al día.
Punto de retorno si no gusta: etiqueta `restore/sitio-pre-liquid-glass-2026-09-21` (ver `RAMAS-ARCHIVADAS.md`).

## 1. Investigación: cómo se hace en la web

Liquid Glass (iOS 26) es un material translúcido que **desenfoca y refracta lo que hay detrás**, con reflejos de borde ("specular highlights") y sombras suaves. En CSS se aproxima con capas:

| Capa | Técnica CSS | Costo | Soporte |
|---|---|---|---|
| Desenfoque + saturación del fondo | `backdrop-filter: blur(18px) saturate(1.8)` (con prefijo `-webkit-`) | **Alto en GPU** si se abusa | Todos los navegadores modernos |
| Relleno translúcido | `background: linear-gradient(135deg, rgba(255,255,255,.62), rgba(255,255,255,.28))` | Bajo | Todos |
| Borde de vidrio | `border: 1px solid rgba(255,255,255,.6)` + `box-shadow: inset 0 1px 0 …` (brillo arriba) y `inset 0 -1px 0 …` (sombra abajo) | Bajo | Todos |
| Sombra flotante | `box-shadow` grande y suave, de baja opacidad | Bajo | Todos |
| Reflejo que sigue al puntero | gradiente radial con variables `--mx/--my` (JS mínimo en `pointermove`) | Bajo | Todos (solo puntero fino) |
| **Refracción real** | `backdrop-filter: url(#filtro-svg)` con `feDisplacementMap` | **Muy alto**, se ve pixelado | **Solo Chromium**; Safari y Firefox lo ignoran |

Fuentes consultadas: [LogRocket](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/), [CSS-Tricks](https://css-tricks.com/getting-clarity-on-apples-liquid-glass/), [kube.io](https://kube.io/blog/liquid-glass-css-svg/), [ekino](https://medium.com/ekino-france/liquid-glass-in-css-and-svg-839985fcb88d), [W3C svgwg #1142](https://github.com/w3c/svgwg/issues/1142).
Conclusiones de esas fuentes: usarlo en **pocos elementos flotantes**, no en zonas largas que hacen scroll; mantener **contraste alto** del texto; **no animar** el desenfoque ni la escala del displacement; dar **alternativas** (sin transparencia, sin `backdrop-filter`).

## 2. Decisiones de diseño

1. **El vidrio necesita algo detrás.** El sitio es crema plano; el vidrio se vería igual que un blanco translúcido. Se agrega una **capa ambiental fija** (manchas muy suaves azul `#2540c0`, naranja `#ea6a2e` y lila con deriva lenta, solo `transform`) y las bandas de sección pasan de fondo opaco a **tinte translúcido** para que se vea a través.
2. **Desenfoque real solo donde pasa contenido por detrás:** menú superior, menú móvil, pie/controles del visor de imágenes y elementos que flotan (barra de progreso pegajosa si se usa). En tarjetas, pestañas, chips y botones se usa el **"aspecto de vidrio"** (relleno + borde luminoso + sombra), que cuesta casi nada y se ve igual sobre fondo suave.
3. **Superficies de lectura más opacas.** Todo lo que contiene texto largo (paso de la guía, callouts, ficha) usa `--glass-read` (≈ 78 % opaco): el contraste nunca depende de lo que haya detrás.
4. **Nada de refracción SVG en v1** (solo Chromium, cara, pixelada). Queda como mejora opcional para el menú.
5. **Mantener la identidad:** misma paleta, tipografías, jerarquía y composición. Cambian materiales, bordes, sombras y movimiento.
6. **Accesibilidad y rendimiento son requisitos, no extras:** `prefers-reduced-transparency`, `prefers-reduced-motion`, `prefers-contrast: more`, `forced-colors`, y `@supports not (backdrop-filter)` caen a superficies sólidas. En móvil el desenfoque baja (12 px).

## 3. Dónde sí y dónde no

| Zona | ¿Vidrio? | Cómo |
|---|---|---|
| Menú superior (escritorio y móvil), botón de idioma, píldora "Open to work" | **Sí, con blur real** | Cápsula flotante; se vuelve más opaca al hacer scroll; indicador deslizante en los enlaces |
| Menú móvil a pantalla completa | **Sí, blur real** | Panel de vidrio grande |
| Botones (primario, secundario, GitHub, CTA de docs) | **Sí, aspecto de vidrio** | Primario = vidrio azul; secundario = vidrio claro; pulsar = resorte |
| Tarjetas de proyecto, tarjetas de materia/equipo, filas de práctica | **Sí, aspecto de vidrio** | Borde luminoso, elevación al pasar el puntero, reflejo que sigue al cursor |
| Pestañas KiCad/MonoFab/Altium, chips de sección, flechas y botones de la guía, barra del carrusel | **Sí, aspecto de vidrio** | |
| Tarjeta de cada paso de la guía y callouts | **Sí, pero opaca (`--glass-read`)** | Legibilidad primero |
| Visor de imágenes (lightbox): botón cerrar y pie | **Sí, blur real** | El fondo es la propia página oscurecida |
| Campos del formulario de contacto | **Sí, suave** | Vidrio claro; foco con anillo azul |
| Texto corrido, tablas, código, capturas anotadas (recuadros naranjas) | **No** | Se dejan planos; las capturas solo llevan marco fino |
| Fotos de proyecto y portada | **No** | Se mantienen; solo el marco cambia |
| Marquee, cifras (Numbers), pie de página | **Mínimo** | Sin blur; a lo sumo tinte translúcido |
| Bloque azul de contacto | **Se mantiene** | Sólido, es el ancla de color |

## 4. Sistema de diseño (implementado en `src/styles/glass.css`)

Variables (`:root`): `--glass-blur`, `--glass-blur-strong`, `--glass-saturate`, `--glass-fill`, `--glass-fill-strong`, `--glass-read`, `--glass-dark`, `--glass-blue`, `--glass-border`, `--glass-edge` (sombras internas), `--glass-shadow`, `--glass-shadow-lift`, `--glass-radius`, `--spring`, `--ease-out-expo`.
Clases: `.glass` (aspecto), `.glass--blur` (añade `backdrop-filter`), `.glass--read` (opaca para texto), `.glass--dark`, `.glass--blue`, `.glass-sheen` (reflejo con el puntero), `.glass-press` (resorte al pulsar), `.glass-lift` (elevación al hover).
Regla para ampliar: **una superficie nueva = clase `.glass` + variante**; nunca copiar valores sueltos. Si lleva texto largo, `.glass--read`. Si pasa contenido por detrás mientras se hace scroll, `.glass--blur`.

## 5. Avance (actualizar en cada hito)

Ramas apiladas, cada una con su PR; ninguna se mergea a `main` hasta el visto bueno de Alessandro.

| # | Rama | Contenido | Estado |
|---|---|---|---|
| 1 | `docs/liquid-glass-plan` | Este documento y `ARQUITECTURA-Y-TECNOLOGIAS.md` | hecho (PR #57) |
| 2 | `feat/glass-base` | `src/styles/glass.css` (variables, clases, capa ambiental, alternativas), `src/scripts/glass-sheen.ts`, secciones de la home translúcidas | hecho |
| 3 | `feat/glass-nav` | Menú superior y móvil, idioma, píldora | hecho |
| 4 | `feat/glass-home` | Botones, tarjetas de trabajo, investigación, contacto, bandas de sección | hecho |
| 5 | `feat/glass-projects` | Encabezado, ficha, insignias y botón de GitHub de las páginas de proyecto | pendiente |
| 6 | `feat/glass-docs` | `/docs` y la guía interactiva | pendiente |
| 7 | `feat/glass-motion` | Microinteracciones: resorte, reflejo con el puntero, indicador del menú | pendiente |
| 8 | `fix/glass-qa` | Auditoría: contraste, modo reducido, móvil, ES/EN, rendimiento, capturas | pendiente |

**Siguiente paso al retomar:** ver la primera fila "pendiente" de la tabla, leer su sección arriba, implementar, correr la QA de `ARQUITECTURA-Y-TECNOLOGIAS.md` §7, abrir PR y actualizar esta tabla y `CONTEXTO.md`.
