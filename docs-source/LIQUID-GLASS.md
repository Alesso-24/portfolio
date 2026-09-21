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

1. **El vidrio necesita algo detrás.** El sitio es crema plano; el vidrio se vería igual que un blanco translúcido. Se agrega una **capa ambiental fija** (tres manchas muy suaves: azul `#2540c0`, naranja `#ea6a2e` y lila, en una sola capa **estática**; ver §6 por qué no se anima) y las bandas de sección pasan de fondo opaco a **tinte translúcido** para que se vea a través.
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

Variables (`:root`): `--glass-blur`, `--glass-blur-strong`, `--glass-saturate`, `--glass-fill`, `--glass-fill-strong`, `--glass-read`, `--glass-dark`, `--glass-blue`, `--glass-border`, `--glass-edge` (sombras internas), `--glass-shadow`, `--glass-shadow-lift`, `--spring`, `--glass-solid`, `--glass-edge-dark`, `--glass-fill-strong`.
Clases: `.glass` (aspecto), `.glass--blur` / `.glass--blur-strong` (añaden `backdrop-filter`), `.glass--strong`, `.glass--read` (opaca para texto), `.glass--dark`, `.glass--blue`, `.glass-sheen` (reflejo con el puntero), `.glass-press` (resorte al pulsar), `.glass-lift` (elevación al hover), `.glass-btn` (+ `--orange`, `--onblue`), `.glass-field` (campo de formulario), `.glass-chip`.
Componentes con su bloque en `glass.css`: menú superior (`.glass-nav*`, `.glass-menu`), botones y campos. `/docs` y la guía llevan su capa de vidrio **al final** de `DocsLayout.astro` y `DocsInteractive.astro` (sobrescribe rellenos previos). Las páginas de proyecto la llevan en `ProjectLayout.astro`.
Regla para ampliar: **una superficie nueva = clase `.glass` + variante**; nunca copiar valores sueltos. Si lleva texto largo, `.glass--read`. Si pasa contenido por detrás mientras se hace scroll, `.glass--blur`.

## 5. Avance (actualizar en cada hito)

Ramas apiladas, cada una con su PR; ninguna se mergea a `main` hasta el visto bueno de Alessandro.

| # | Rama | Contenido | Estado |
|---|---|---|---|
| 1 | `docs/liquid-glass-plan` | Este documento y `ARQUITECTURA-Y-TECNOLOGIAS.md` | hecho (PR #57) |
| 2 | `feat/glass-base` | `src/styles/glass.css` (variables, clases, capa ambiental, alternativas), `src/scripts/glass-sheen.ts`, secciones de la home translúcidas | hecho |
| 3 | `feat/glass-nav` | Menú superior y móvil, idioma, píldora | hecho |
| 4 | `feat/glass-home` | Botones, tarjetas de trabajo, investigación, contacto, bandas de sección | hecho |
| 5 | `feat/glass-projects` | Encabezado, ficha, insignias y botón de GitHub de las páginas de proyecto | hecho |
| 6 | `feat/glass-docs` | `/docs` y la guía interactiva | hecho |
| 7 | `feat/glass-motion` | Microinteracciones: resorte, reflejo con el puntero, indicador del menú | hecho |
| 8 | `fix/glass-qa` | Auditoría: contraste, modo reducido, móvil, ES/EN, rendimiento, capturas | hecho |

**Siguiente paso al retomar:** ver la primera fila "pendiente" de la tabla, leer su sección arriba, implementar, correr la QA de `ARQUITECTURA-Y-TECNOLOGIAS.md` §7, abrir PR y actualizar esta tabla y `CONTEXTO.md`.

## 6. QA y mediciones (2026-09-21)

**Contraste (WCAG AA, medido por píxeles sobre las superficies reales, ES y EN):** 29 de 29 superficies cumplen. Se corrigieron de paso tres casos que ya fallaban antes del vidrio: texto blanco sobre el naranja del botón de enviar y de los números de leyenda (ahora naranja más profundo `#cc4d14 → #a33607`, 5.3:1), texto naranja pequeño de las etiquetas de paso y de los chips de la ficha (`#b4380a`, 5.8:1) y el gris de "Paso X de Y" (`#6f6a5f`, 5:1). Método: `qa_glass.mjs` (captura de cada elemento, color de fondo dominante, ratio WCAG con el color de texto computado).

**Modos de accesibilidad (emulados con CDP):** `prefers-reduced-transparency`, `prefers-contrast: more` → superficies sólidas, sin `backdrop-filter`, sin capa ambiental. `forced-colors` → `Canvas/CanvasText`, sin vidrio. `prefers-reduced-motion` → sin animaciones. Sin soporte de `backdrop-filter` → `@supports not` cae a superficie sólida.

**Rendimiento (scroll guionizado, CPU limitada 4×, render por software: es el peor caso; una GPU real lo hace mejor):**

| Página | Sin vidrio (etiqueta `restore/…pre-liquid-glass`) | Con vidrio (final) |
|---|---|---|
| Home · escritorio | ≈2 % de fotogramas lentos (>33 ms) | ≈5 % |
| Home · móvil | ≈1 % | ≈5 % |
| Guía · escritorio y móvil | 0 a 7 % | 0 % |

Hallazgo: con la capa ambiental como **dos capas grandes animadas** la home llegaba a ≈14 % de fotogramas lentos; el `backdrop-filter` del menú casi no pesaba. Se cambió a **una capa estática de degradados** y el costo bajó a lo de arriba. Regla: no animar capas de pantalla completa; el vidrio se anima solo con `transform` en elementos pequeños.

**Funcionalidad verificada tras el rediseño:** 10 páginas × escritorio/móvil sin errores de consola, imágenes rotas ni desbordes; 61 pasos de la guía en ES y EN (imágenes, recuadros alineados); persistencia del idioma con clics reales; clics del menú, scroll-spy y hover de tarjetas; visor de imágenes.

**Arreglo detectado por el camino:** GSAP dejaba un `transform` en línea al terminar los revelados, lo que anulaba el `:hover` de las tarjetas (ya no: `clearProps: 'transform'`).

**No probado (limitación):** Safari y Firefox reales (solo Chromium). Ambos soportan `backdrop-filter` con prefijo `-webkit-`, que está incluido; la refracción SVG no se usa, así que no hay diferencias esperadas.

## 7. Ideas para más adelante (no hechas)

Refracción real con `feDisplacementMap` solo para el menú en Chromium; barra de progreso de lectura de vidrio en la guía; transiciones de página con View Transitions; modo oscuro de vidrio.

## 8. Versión 2: refracción real (pedido de Alessandro, 2026-09-21)

**Por qué:** tras el deploy de la v1 dijo que "no se ve como vidrio": la v1 es vidrio *esmerilado* (relleno blanco + desenfoque). Lo que define el efecto de Apple es la **refracción**: en el borde del vidrio el fondo se curva como en una lente, hay un reflejo especular direccional y casi no hay relleno ni desenfoque.

**Técnica (fuentes: [kube.io](https://kube.io/blog/liquid-glass-css-svg/), [LogRocket](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/), [ekino](https://medium.com/ekino-france/liquid-glass-in-css-and-svg-839985fcb88d)):**
1. **Perfil de superficie**: el borde del vidrio es un "bisel" convexo tipo *squircle*, `y = ⁴√(1 − (1 − x)⁴)` con `x` ∈ [0,1] del borde al plano interior (el que usa Apple; transición suave).
2. **Ley de Snell** (`n₁ sin θ₁ = n₂ sin θ₂`, aire 1, vidrio 1.5): la pendiente del perfil da el ángulo de incidencia; el rayo se desvía hacia la normal y aterriza en el fondo desplazado. Ese desplazamiento (en px) se calcula una vez por distancia al borde (~127 muestras) y se aplica en toda la forma según la distancia al contorno.
3. **Mapa de desplazamiento**: imagen PNG con `R = 128 + dx·127`, `G = 128 + dy·127` (128 = sin desplazamiento), generada con canvas para el tamaño exacto de cada elemento (rectángulo redondeado / cápsula).
4. **Filtro SVG**: `feImage` (mapa) + `feDisplacementMap in=SourceGraphic scale=…` sobre el fondo, y `feImage` del **reflejo especular** (luz arriba-izquierda y un reflejo más débil opuesto) compuesto encima. Opcional: tres desplazamientos con escala 0.94/1/1.06 recombinados por canal = **aberración cromática** en el borde.
5. **Aplicación**: `backdrop-filter: url(#id) saturate() brightness()`. El tamaño del filtro **no** se adapta solo: hay que regenerar el mapa si cambia el tamaño del elemento (`ResizeObserver`).

**Limitaciones y decisiones:**
- `backdrop-filter: url(#…)` solo funciona en **Chromium** (Chrome, Edge, Brave, Opera). Safari y Firefox lo ignoran: allí se conserva el vidrio de la v1 (alternativa automática; el script solo activa la refracción en Chromium).
- **Costo:** cada elemento refractivo cuesta GPU y regenerar el mapa es caro, así que se usa en **pocos elementos flotantes** (menú superior, controles del visor de imágenes), el mapa se genera solo al cambiar de tamaño, y se mide contra la v1.
- **Legibilidad:** el vidrio real es casi transparente, así que el relleno del menú es **adaptativo**: casi transparente sobre el fondo crema (aquí se ve la refracción) y más blanco (≥ 0.6) cuando detrás pasa una foto, video o el bloque azul (el texto oscuro necesita fondo claro). Se mide el contraste otra vez.
- Se respetan `prefers-reduced-transparency`, `prefers-contrast: more` y `forced-colors` (sin refracción, superficie sólida).
- Los brillos de borde (reflejo especular) de v1 pasan de un contorno uniforme a **direccionales** (arriba-izquierda fuerte, abajo-derecha suave) en todas las superficies `.glass`, que es barato y no necesita Chromium.

**Ramas (apiladas, un PR cada una):**

| # | Rama | Contenido | Estado |
|---|---|---|---|
| 1 | `docs/liquid-glass-refraccion` | Esta sección | en curso |
| 2 | `feat/glass-refraction` | `src/scripts/glass-refract.ts` (mapas + filtro SVG + detección Chromium), menú superior y controles del visor de imágenes refractivos, relleno adaptativo | hecho |
| 3 | `feat/glass-rim` | Reflejos direccionales de borde en `.glass` (todas las superficies) | hecho |
| 4 | `fix/glass-refraction-qa` | Contraste medido sobre fondos oscuros/claros, rendimiento contra la v1, regulador de rendimiento, modos de accesibilidad, alternativa en Firefox/Safari (UA simulado), docs | hecho |

**Siguiente paso al retomar:** ver la primera fila "pendiente" de esta tabla; el punto de retorno es `restore/sitio-liquid-glass-2026-09-21` (v1 ya desplegada).

### 8.1 Implementación de la v2 (`src/scripts/glass-refract.ts`)

- **Qué es refractivo:** el menú superior (`.glass-nav__bar`) y los controles del visor de imágenes (cerrar y pie). Clase `.glass--refract` en el elemento; el script pone `data-refract` cuando activa el filtro. Para añadir otro elemento: `class="… glass glass--blur glass--refract"` (debe tener `border-radius` real; se mide su tamaño y radio).
- **Cómo se genera:** para cada elemento se calcula (canvas, una vez por tamaño) un mapa de desplazamiento con la ley de Snell (índice 1.5, perfil squircle, bisel máx. 20 px, `STRENGTH` 1.2) y un mapa especular direccional. El **canal azul del mapa es la máscara del bisel**: en el borde se muestra el fondo refractado y casi nítido (lente, `BLUR_RIM` 0.6) y en el centro una versión esmerilada (`BLUR_FROST` 3.0), como el vidrio de Apple. Se aplica con `backdrop-filter: url(#glass-refract-N) saturate(1.18) brightness(1.04)`.
- **Relleno adaptativo** (`data-glass-adaptive` en el menú): casi transparente (0.30→0.13) sobre el fondo; 0.42→0.28 ya sobre contenido; 0.74→0.62 (`data-over-media`) si detrás pasa una foto/video grande, un chip o botón oscuro o el bloque azul (`data-glass-dark`). Se muestrea cada 48 px como máximo cada 100 ms.
- **Marcas como atributos, no clases:** React (menú) y el script no se pisan.
- **Solo Chromium** (Chrome, Edge, Brave, Opera, Android). Safari, Firefox y Chrome en iOS conservan el vidrio v1; `prefers-reduced-transparency`, `prefers-contrast: more` y `forced-colors` apagan la refracción.
- **Regulador de rendimiento:** mide la mediana de los fotogramas durante el scroll; si supera 36 ms (antes 28) apaga la refracción, vuelve al vidrio v1 y lo recuerda en `sessionStorage`. Anulable con `sessionStorage['glass-refract-force']='1'` (para pruebas).
- **Aberración cromática:** implementada pero **desactivada** (`CA = 0`): tres desplazamientos suman ≈ +35 % al costo de fotograma y el efecto es muy sutil. Para activarla: `CA = 0.055`.
- **Reflejos de borde direccionales** en todas las superficies `.glass` (`--glass-edge`, CSS puro).

### 8.2 QA de la v2 (2026-09-21)

- **Contraste del menú en los peores fondos** (crema, título, retrato, fotos, chip oscuro, portada): 21 de 21 mediciones ≥ 4.5:1 (mín. 7.9:1). Contraste de las 29 superficies de la v1: se mantiene 29/29.
- **Modos y navegadores (emulados):** transparencia reducida, alto contraste y colores forzados → sin refracción; Firefox, Safari y Chrome iOS (UA simulados) → vidrio v1; Chromium normal → refracción.
- **Rendimiento** (scroll guionizado, CPU limitada 4×, render por software: peor caso; mediana de 3): guía 26.5 ms vs 19.6 ms de la v1; home 34.8 ms vs 26.8 ms (≈ +7 ms por fotograma). El regulador comprobado: no actúa en un equipo rápido, apaga la refracción en uno lento (+38 ms de carga por fotograma simulada) y respeta el anulador.
- **Hallazgos por el camino:** `saturate(1.6)` teñía de amarillo el fondo crema (ahora 1.18); sin forzar alfa=1 la aberración cromática dejaba franjas de color en los extremos; con solo desenfoque el efecto de lente desaparece (de ahí bisel nítido + centro esmerilado); el scroll suave (Lenis) absorbe los `scrollTo` de las pruebas, por eso el regulador se prueba con la rueda del ratón.
- **No probado:** Safari y Firefox reales (solo emulados por UA).

## 9. Dock que se contrae y se expande (pedido de Alessandro, 2026-09-21)

**Pedido:** que el menú flotante "tuviera animaciones de que se expande y se contrae" al bajar o subir la página y al pasar el mouse (como la barra de Safari en iOS 26).

**Diseño:**
- **Contraído** (al hacer scroll hacia abajo, pasados ~120 px): la cápsula se reduce de 1280 px a ~660 px (escritorio) o ~250 px (móvil); se ocultan el nombre y la píldora "Open to work" con un fundido; quedan avatar, enlaces (con el indicador) e idioma.
- **Expandido:** al subir (scroll hacia arriba), al llegar arriba (< 120 px), al **pasar el mouse** o enfocar con teclado, y con el menú móvil abierto. En pantallas táctiles, un toque sobre la cápsula contraída la expande unos segundos.
- Umbral de dirección acumulado (32 px) para que el scroll suave (Lenis) no la haga parpadear. Con `prefers-reduced-motion` no se contrae nunca.
- **Refracción y cambio de tamaño:** el mapa de la lente depende del tamaño exacto del elemento. Mientras la cápsula cambia de tamaño se marca `data-refract-hold` (el CSS usa un desenfoque simple con el mismo relleno, sin salto) y el mapa se regenera cuando el tamaño se asienta (120 ms); los mapas ya calculados se guardan en caché por tamaño, así que alternar entre expandido y contraído es instantáneo tras la primera vez.
- El indicador deslizante se recoloca mientras la cápsula cambia de tamaño (`ResizeObserver`).

| Rama | Contenido | Estado |
|---|---|---|
| `feat/glass-dock-compacto` | Estado compacto/expandido en `Nav.tsx`, CSS del dock, retención y caché de mapas en `glass-refract.ts`, QA | hecho |

### 9.1 Implementación y QA (2026-09-21)

- **Lógica** (`src/components/layout/Nav.tsx`): `compact` (dirección del scroll con umbral acumulado de 32 px; siempre expandido con `scrollY < 120`) y `hover`/`peek`; el dock se contrae solo si `compact && !hover && !peek && !menuOpen`. Clase `is-compact` en `.glass-nav`. Foco por teclado (`:focus-visible`) también lo expande. En táctil, tocar avatar/nombre con el dock contraído lo expande 3.5 s en vez de navegar.
- **CSS** (`glass.css`, bloque "Dock"): `width` 1280 → 680 px (escritorio, ≥ 860) o 250 px (móvil) con `cubic-bezier(.22,1,.36,1)` en 0.62 s; el nombre y la píldora "Open to work" se pliegan con `max-width`/`opacity`/`padding` (siguen en el árbol de accesibilidad). Con `prefers-reduced-motion` no se contrae.
- **Refracción** (`glass-refract.ts`): mientras el tamaño cambia se pone `data-refract-hold` (mismo relleno, desenfoque simple); el mapa se regenera 130 ms después de que el tamaño se asiente y se guarda en una **caché por tamaño** (16 entradas): alternar contraído/expandido es instantáneo. El indicador deslizante se recoloca con un `ResizeObserver` durante la animación.
- **Pruebas:** con la rueda del ratón (Lenis absorbe los `scrollTo`): bajar contrae (1280 → 680), mouse encima expande, sacar el mouse contrae, subir expande, otra vez abajo contrae, el clic del menú funciona en compacto, `prefers-reduced-motion` nunca contrae, móvil 366 → 250 px; sin parpadeo tras asentarse (0 cambios de layout en 90 fotogramas); expansión 880 → 1280 px en ≈ 450 ms con el filtro en espera y liberado al final; contraste del menú 15/15 (mín. 7.9:1); 10 páginas, guía en EN, persistencia y modos de accesibilidad sin regresiones.

### 9.2 Íconos en el menú y dock aún más contraído (pedido de Alessandro, 2026-09-21)

Propuesta aceptada ("implementalo con recomendaciones"): ícono minimalista en cada enlace; **contraído = solo íconos + el nombre de la sección activa** (como la pestaña activa de Safari en iOS 26); expandido = ícono + texto.
- **Íconos** (`lucide-react`, 16 px, trazo 1.5, mismo estilo que el resto): Work `Briefcase`, Research `FlaskConical`, About `User`, Contact `Mail`, Docs `BookOpen` (mapa `NAV_ICONS` en `Nav.tsx`). Cada botón conserva su nombre accesible (`aria-label` en el idioma activo) aunque la etiqueta esté plegada.
- **Sección activa fuera de la home:** en `/docs` queda marcada "Docs" y en `/project/*` "Work" (antes solo había scroll-spy en la home), así el dock contraído siempre dice dónde estás.
- **Ancho contraído** (medido con el contenido ya asentado): 421 a 449 px en inglés y hasta 488 con "Documentación" → `460px` (EN) y `500px` (ES); antes 680. Móvil sin cambios (250 px; los enlaces van en el menú).
- **Ventanas intermedias:** con íconos el menú expandido no cabía entre 860 y 1024 px (desbordaba); ahora se oculta la píldora "Open to work" por debajo de 1180 px y el nombre por debajo de 1000 px. Verificado sin desborde a 860, 960, 1024, 1180, 1280 y 1440 px.
- **QA:** dock (rueda, hover, reduced-motion, móvil) sin regresiones; contraste del menú 15/15 (mín. 7.9:1); 10 páginas y guía en EN sin errores; aria-labels correctos en ES y EN.
- Ajuste rápido: anchos contraídos y puntos de corte en `glass.css` (bloque "Dock"); íconos en `NAV_ICONS`.

### 9.3 Arreglo: la burbuja del menú no encerraba la palabra (reportado por Alessandro, 2026-09-21)

**Bug:** con el dock contraído, al aparecer la etiqueta de la sección activa la burbuja de vidrio se quedaba del ancho del solo ícono (46 px) mientras el enlace medía 88 a 110 px, y ni siquiera quedaba centrada. Causa: la burbuja se medía una sola vez, cuando la etiqueta aún estaba a `max-width: 0`; el ancho del enlace cambia durante ~0.55 s y nada volvía a medirlo.
**Solución** (`Nav.tsx`): mientras el enlace cambia de tamaño (`track()`), la burbuja se coloca **directamente en el DOM en cada fotograma y sin transición CSS**; un solo bucle activo (los avisos de `ResizeObserver` solo alargan su duración), y al terminar se devuelve el control a React/CSS (resorte entre enlaces al pasar el mouse). Se dispara al cambiar de sección activa, al contraer/expandir el dock y al cambiar de idioma. Un intento previo con estado de React + transición corta no funcionó (la transición CSS retenía el ancho ~0.5 s): medido fotograma a fotograma.
**Verificación:** diferencia burbuja/enlace de 0 px a izquierda y derecha en hover entre enlaces, cambio de sección contraído, expandir con el mouse y volver a contraer.
**Efecto colateral corregido:** el seguimiento aumentó el costo de fotograma en el banco de pruebas y el regulador de rendimiento (umbral 28 ms) apagaba la refracción sin motivo. Los fotogramas caen en escalones (16.7 / 33.3 / 50 ms), así que 28 ms lo disparaba con el ruido normal. Umbral nuevo **36 ms** (solo si la mayoría de fotogramas tarda ≥ 50 ms) y se ignoran los primeros 2.5 s tras la carga y las pausas > 250 ms. Comprobado: equipo normal no se apaga; equipo lento simulado (+38 ms por scroll) sí; con el anulador de pruebas se mantiene.
**Nota de pruebas:** las capturas tomadas durante un `scrollTo` programático grande salen con el menú en blanco (artefacto de captura con el scroll suave); con la rueda real el menú se dibuja en todos los fotogramas.
