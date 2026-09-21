# Arquitectura, tecnologías y metodología del sitio

Guía para **ampliar o actualizar** el sitio sin tener que redescubrir cómo está hecho. Complementa a `README.md` (resumen público), `BRAND.md` (voz y hechos verificados) y `docs-source/produccion-electronica/CONTEXTO.md` (bitácora). Última revisión: 2026-09-21.

## 1. Tecnologías y para qué se usa cada una

| Tecnología | Versión | Rol en el sitio | Cómo se usa aquí / cuidado al ampliar |
|---|---|---|---|
| **Astro** | 7.3 | Genera HTML estático (`astro build` → `dist/`). Páginas en `src/pages`, layouts en `src/layouts`. | Base path `/portfolio` (GitHub Pages) en `astro.config.mjs`. Toda ruta interna se escribe `/portfolio/...`. `npm run build` = `astro build` + `scripts/responsive-images.mjs`. |
| **Tailwind CSS** | 4.3 | Tokens de diseño (`@theme` en `src/styles/global.css`) y algunas utilidades. | La mayor parte del estilo es CSS propio o estilos en línea dentro de los `.astro`; Tailwind aporta sobre todo los tokens. Un estilo en línea gana a una hoja de estilos: para sobrescribirlo hay que editar el marcado o usar `!important`. |
| **React** | 19 | Solo dos islas interactivas: `Nav.tsx` (menú + idioma) y `Contact.tsx` (formulario). | Se hidratan con `client:idle` / `client:visible`. Todo lo demás es HTML sin JS de framework. No pasar estado entre islas: se comunican con el evento `lang-change`. |
| **GSAP + ScrollTrigger** | 3.15 | Animaciones de aparición al hacer scroll (`data-reveal`, `data-reveal-delay`). | Se inicializan en `Base.astro`. Respetar `prefers-reduced-motion` (ya lo hace `global.css`). |
| **Lenis** | 1.3 | Scroll suave. | También en `Base.astro`; se desactiva con `prefers-reduced-motion`. |
| **lucide-react** | 0.577 | Íconos del menú. | No se actualizó a 1.x a propósito (posibles cambios de API). |
| **Fuentes** | Fontsource | *Instrument Serif* (titulares) y *Hanken Grotesk* (texto). | Autoalojadas (`@fontsource*`), sin peticiones a Google. La CSP del sitio no permite fuentes externas. |
| **TypeScript + `astro check`** | 5.9 | `npm run lint` = `astro check` (0 errores es la regla). | `@types/node` está instalado porque `src/data/i18n.ts` usa `node:fs`. |
| **sharp** | 0.35 | Optimización de imágenes (`scripts/*.mjs`, y la usa Astro). | Ver sección 5. |
| **GitHub Actions** | — | `.github/workflows/ci-cd.yml`: `build` (lint + build), `lighthouse` (solo en PRs, audita `dist`) y `deploy` (solo en push a `main`). | Un push a `main` despliega solo (~1 min). |
| **Playwright (`playwright-core`)** | — | **No está en el repo**: es la herramienta de QA que se instala en una carpeta temporal (ver sección 7). | Usa el Chromium ya instalado en `%LOCALAPPDATA%\ms-playwright`. |

## 2. Mapa del repositorio

```
src/pages/            index.astro, project/*.astro (5 proyectos), docs/… (Documentación)
src/layouts/          Base.astro (head, CSP, Nav, Footer, scripts globales), ProjectLayout.astro, DocsLayout.astro
src/components/
  sections/           Hero, Marquee, About, Numbers, Work, Research (Astro) + Contact.tsx
  layout/             Nav.tsx (isla React), Footer.astro
  docs/               Flow*, Shot, AnnotatedShot, T, DocsInteractive (guía interactiva)
  ui/                 YouTubeFacade.astro (video bajo demanda)
src/data/             content.ts (textos EN/ES de la home), docs.ts, kicad-flow.ts, mods-flow.ts, mods-adapter.ts,
                      kicad-where.ts, docs-en.ts (diccionario), i18n.ts, image-sizes.json
src/styles/           global.css (tokens, reset, idioma, animaciones base), glass.css (sistema Liquid Glass: docs-source/LIQUID-GLASS.md)
src/scripts/          glass-sheen.ts (reflejo del vidrio que sigue al puntero), glass-refract.ts (refracción real del vidrio: mapas + filtro SVG, solo Chromium, con regulador de rendimiento; ver LIQUID-GLASS.md §8)
public/               imágenes, 404.html, llms.txt, robots.txt, sitemap.xml
scripts/              utilidades de imágenes y OG
docs-source/          material crudo, bitácoras y estas guías (no se publica)
```

## 3. Convenciones que hay que respetar

- **Idioma ES/EN.** El botón de arriba a la derecha cambia `html[lang]`; la elección se guarda en `localStorage.lang` y se aplica en `<head>` antes de pintar.
  - Páginas de la home y proyectos: cada texto lleva `<span class="lang-en">` y `<span class="lang-es">`; el CSS global muestra uno.
  - `/docs`: el contenido se escribe en español y el inglés vive en `src/data/docs-en.ts` (clave = español exacto). Se pinta con `<T es="…" />`. **Una traducción faltante rompe `npm run build`.** `I18N_COLLECT=1 npm run build` lista lo que falta.
  - Atributos (`alt`, `aria-label`, `title`) y el `<title>`: `data-alt-en` / `data-alt-es`, etc.; un script en `Base.astro` los cambia.
- **Voz:** sin rayas largas (—) en textos visibles, sin relleno ("próximamente", "documentado en el camino"), pendientes = solo "Pendiente". Hechos de congresos: ver `BRAND.md`.
- **Finales de línea:** el repo trabaja con CRLF en Windows. Al editar archivos con scripts, normalizar `\r\n` a `\n`, editar y volver a escribir con `\r\n`.
- **Rutas de imagen** siempre con prefijo `/portfolio/`. Las imágenes de la guía viven en `public/images/docs/...` y su tamaño real se registra en `src/data/image-sizes.json` (`node scripts/gen-image-sizes.mjs`).
- **Accesibilidad:** foco visible (definido en `global.css`), enlace "saltar al contenido", `prefers-reduced-motion`, áreas táctiles de 44 px.

## 4. Cómo ampliar (recetas)

**Agregar una página de proyecto:** copiar un `src/pages/project/*.astro`, usar `ProjectLayout` con `title/badge/meta/coverAlt` (y sus versiones `titleEs/badgeEs/metaEs/coverAltEs`), cuerpo bilingüe con `lang-en`/`lang-es`, alt con `alt="EN" data-alt-es="ES"`. Añadir la tarjeta en `src/data/content.ts` (`PROJECTS`, con `imageAlt: {en, es}`), y la URL en `public/sitemap.xml`.

**Agregar un paso a la guía de PCB:** editar `src/data/kicad-flow.ts` (KiCad) o `src/data/mods-flow.ts` (MonoFab). Cada paso = `{ html, blocks }`; los bloques (`shots`, `where`, `tools`, `callout`…) están tipados en `flow-types.ts`. Los recuadros naranjas van en **píxeles de la captura real** (medirlos con una cuadrícula, no a ojo). Después: agregar la imagen a `public/images/docs/…`, correr `node scripts/gen-image-sizes.mjs`, y añadir las traducciones nuevas a `docs-en.ts` (el build dirá cuáles faltan).

**Agregar una materia o práctica en Documentación:** `src/data/docs.ts` (`DOCS_SUBJECTS`, `DOCS_PRACTICES`) y una página en `src/pages/docs/<materia>/…`. Textos nuevos → `docs-en.ts`.

**Agregar un texto EN/ES en la home:** `src/data/content.ts` (objetos `{ en, es }`) o `<span class="lang-en/es">` en el componente.

**Actualizar dependencias:** `npm update` (dentro de rangos) + `npm audit fix`; comprobar `npm run lint` y `npm run build`. Los saltos mayores (lucide 1.x, TypeScript 7) se evalúan aparte.

## 5. Rendimiento

- `scripts/responsive-images.mjs` corre al final de `npm run build`: genera variantes `-480/-800/-1200/-1600` (retratos `-240…-720`) y agrega `srcset/sizes/width/height` a cada `<img>` de `dist/`.
- Videos de YouTube: `YouTubeFacade.astro` (portada propia; el iframe `youtube-nocookie` se crea al pulsar play).
- Islas React con hidratación diferida. Sin JS de framework en el resto.
- Cuidado con `backdrop-filter` y con capas de pantalla completa (cuestan GPU/CPU): el vidrio solo desenfoca elementos flotantes y la capa ambiental es **estática**; hay mediciones antes/después en `LIQUID-GLASS.md` §6. No animar capas grandes.

## 6. Metodología de trabajo (git y GitHub)

- Una rama por tema desde `main`; commits pequeños con mensaje descriptivo (en español, `tipo: qué y por qué`) y la línea `Co-Authored-By`. Un PR por rama; los PR dependientes se apilan (base = rama anterior) y al final se retargetean a `main`.
- **Nada llega a `main` ni se despliega sin el visto bueno de Alessandro** (se le muestra primero en su navegador, `Start-Process http://localhost:4399/portfolio/…`).
- Puntos de retorno: etiquetas `restore/*` (estados de `main`) y `archive/*` (ramas archivadas); ver `docs-source/RAMAS-ARCHIVADAS.md`.
- La bitácora (`CONTEXTO.md`) se actualiza **al terminar cada hito**, con lo hecho y lo siguiente, por si la sesión se corta.

## 7. Metodología de QA (antes de proponer un merge)

1. `npm run lint` (0 errores) y `npm run build` (falla si falta una traducción).
2. Servir `dist/`: `npx astro preview --port 4399` (base `/portfolio/`).
3. Barridos con Playwright (script temporal, `playwright-core` con `executablePath` del Chromium instalado):
   - 10 páginas × escritorio (1440) y móvil (390): errores de consola, imágenes rotas, desborde horizontal.
   - Guía: recorrer los 61 pasos en **ES y EN** (imágenes cargadas, recuadros alineados con su imagen, sin desborde).
   - Mezcla de idiomas: leer `innerText` de cada página en cada idioma y buscar palabras del otro idioma.
   - Persistencia del idioma con clics reales entre páginas.
4. Capturas de pantalla leídas a ojo para cambios visuales (escritorio y móvil).
5. Buscar rayas largas en `dist/**/*.html`.
6. Si se toca el diseño visual: contraste WCAG AA medido por píxeles sobre las superficies reales (captura del elemento, color de fondo dominante vs color de texto), modos `prefers-reduced-transparency` / `prefers-contrast: more` / `forced-colors` / `prefers-reduced-motion` emulados con CDP, y rendimiento de scroll con CPU limitada 4× **comparado contra la etiqueta `restore/*`** (worktree temporal + build + servidor estático en otro puerto). Método completo en `LIQUID-GLASS.md` §6.

> **2026-09-21:** se quitó `motion` (el menú móvil usa animaciones CSS, ver `LIQUID-GLASS.md` §10) y la CSP de `Base.astro` permite `img-src blob:` para los mapas de refracción.
