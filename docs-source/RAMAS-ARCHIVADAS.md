# Ramas archivadas y puntos de restauración

Registro de lo que se borró del repositorio el **2026-09-21** y cómo recuperarlo. Nada se perdió:
todo lo integrado sigue en el historial de `main`, y lo que no estaba en `main` tiene una etiqueta `archive/*`.

## Puntos de restauración del sitio (etiquetas en GitHub)

| Etiqueta | Commit | Qué es | Volver a ese estado |
|---|---|---|---|
| `restore/sitio-antes-de-la-noche-2026-09-20` | `dc0d038` | `main` tal como estaba **antes** de "Creación de PCBs", el idioma persistente, el inglés de /docs y la auditoría | `git checkout -b volver restore/sitio-antes-de-la-noche-2026-09-20` |
| `restore/sitio-pre-liquid-glass-2026-09-21` | `09643fc` | `main` desplegado **justo antes** de empezar el rediseño Liquid Glass | `git checkout -b volver restore/sitio-pre-liquid-glass-2026-09-21` |
| `restore/sitio-liquid-glass-2026-09-21` | `84b6806` | `main` **con Liquid Glass ya desplegado** (PRs #57 a #64) | `git checkout -b volver restore/sitio-liquid-glass-2026-09-21` |

Para **redesplegar** un estado viejo: crear la rama desde la etiqueta, hacer PR a `main` y mergear (o `git revert` de los merges del rediseño).
El deploy es automático al entrar a `main`.

## Ramas de trabajo ya integradas a `main` (borradas)

Cada una queda en `main` con un commit de merge `Merge pull request #N …`. Para ver o recrear una: `git checkout -b <nombre> <sha>` (el commit sigue en el historial).

| Rama | Último commit | PR |
|---|---|---|
| `ci/lighthouse-astro` | `eea6420` | #53 |
| `docs/general-pcb-y-fotos` | `a4b4e47` | #48 |
| `docs/auditoria-textos` | `1b4939d` | #49 |
| `feat/idioma-persistente` | `6d72b30` | #50 |
| `feat/docs-i18n-en` | `c8811d6` | #51 |
| `fix/auditoria-sitio` | `b0715f6` | #52 |
| `fix/case-presentado-en-persona` | `b1e5d3c` | #54 |
| `fix/nombre-orificios` | `7a9ed57` | #55 |
| `docs/materias-produccion-electronica` | `108dcd2` | (fast-forward, sin PR) |
| `feat/ci-cd` | `7328aaa` | #25 |
| `redesign` | `f7d6120` | #26 |

**Liquid Glass (2026-09-21), integradas y borradas:** `docs/liquid-glass-plan` #57 · `feat/glass-base` #58 · `feat/glass-nav` #59 · `feat/glass-home` #60 · `feat/glass-projects` #61 · `feat/glass-docs` #62 · `feat/glass-motion` #63 · `fix/glass-qa` #64 · `docs/cierre-liquid-glass` #65. Todas quedan en el historial de `main` con su commit de merge; para volver a ver una: `git fetch origin pull/<N>/head:<nombre>`.

Ramas más antiguas que ya no existían en el remoto al hacer esta limpieza (integradas por squash; su contenido está en `main`, y GitHub conserva el
código de cada PR en `refs/pull/N/head`): #1 `docs/brand-positioning`, #19 `feat/copy-rewrite`, #20 `feat/design-system`, #21 `feat/performance-images`,
#22 `feat/contact-form`, #23 `feat/security-hardening`, #24 `feat/seo`, #27 `feat/bdai-update-nav-fix`, #28 `feat/quantum-hackathon-project`,
#29 `fix/hero-mobile-overlap`, #30 `feat/case-update-and-copyedit`, #31 `fix/last-em-dash-comment`.
Recuperar una: `git fetch origin pull/<N>/head:<nombre>`.

Las ramas locales de la guía (`docs/cierre-discrepancia-medidas`, `docs/mods-actualizacion`, `feat/docs-mods-integracion`, `feat/kicad-imagenes-generales`,
`fix/anotaciones-alineacion`, `fix/shot-grid-alineacion`, `perf/auditoria-responsive`, `feat/docs-lectura-interactiva`) ya estaban dentro de `main` (ver `CONTEXTO.md`).

## Ramas que NO estaban en `main` (archivadas con etiqueta)

| Etiqueta | Qué contiene | Recuperar |
|---|---|---|
| `archive/dependabot-pr36-postcss-8.5.25` | bump de postcss (PR #36, cerrado: superado por `npm update`) | `git checkout -b x archive/dependabot-pr36-postcss-8.5.25` |
| `archive/dependabot-pr39-nanoid-3.3.18` | bump de nanoid (#39) | ídem |
| `archive/dependabot-pr40-fast-uri-3.1.7` | bump de fast-uri (#40) | ídem |
| `archive/dependabot-pr41-browserslist-4.28.9` | bump de browserslist (#41) | ídem |
| `archive/dependabot-pr42-svgo-4.1.0` | bump de svgo (#42) | ídem |
| `archive/dependabot-pr44-baseline-browser-mapping-2.11.21` | bump de baseline-browser-mapping (#44) | ídem |
| `archive/dependabot-pr45-smol-toml-1.8.0` | bump de smol-toml (#45) | ídem |
| `archive/dependabot-pr46-multi-4f9d7186bc` | bump de sharp + astro (#46) | ídem |
| `archive/dependabot-pr47-js-yaml-4.3.2` | bump de js-yaml (#47) | ídem |
| `archive/gh-pages-deploy-manual` | build del deploy manual viejo (16-jun-2026, antes de GitHub Actions) | `git checkout -b x archive/gh-pages-deploy-manual` |

Todos esos bumps ya están cubiertos: `main` trae astro 7.3.3, sharp 0.35.4, etc. (`npm audit` = 0).

## Rama que se dejó viva

`gh-pages`: rama legacy del deploy manual. Ya no se usa (GitHub Pages publica con Actions), pero no se borró por si la configuración de Pages todavía la referencia.
Está archivada en `archive/gh-pages-deploy-manual`, así que borrarla es seguro: `git push origin --delete gh-pages`.
