# Metodología de trabajo (cómo se construyó y se mantiene este sitio)

> Guía para retomar el proyecto sin recordar nada: quien lo continúe (Alessandro, otra persona o una sesión nueva de Claude Code) debería poder seguir el mismo método. Complementa `ARQUITECTURA-Y-TECNOLOGIAS.md` (qué se usa), `LIQUID-GLASS.md` (el diseño de vidrio) y `RAMAS-ARCHIVADAS.md` (cómo volver atrás).
> Última revisión: 2026-09-21 (`main` con dock contraíble, íconos y optimización de fluidez).

## 0. Al empezar una sesión (checklist de 2 minutos)

1. Leer el bloque superior de `docs-source/produccion-electronica/CONTEXTO.md` (estado actual y pendientes) y, si se toca el diseño, `LIQUID-GLASS.md`.
2. `git status`, `git branch -a`, `gh pr list`: ¿hay ramas o PR abiertos? Trabajar siempre desde `main` actualizado (`git pull`).
3. `npm ci` si cambió `package-lock.json`. Comprobar que `npm run build` pasa **antes** de tocar nada (así se sabe que un fallo posterior es propio).
4. Si la sesión anterior se cortó: la bitácora (CONTEXTO.md) y `git log` mandan; los borradores en carpetas temporales no son fuente de verdad.

## 1. Cómo se trabaja con Alessandro (preferencias comprobadas)

| Tema | Regla | Por qué |
|---|---|---|
| Material que envía | Registrarlo en `CONTEXTO.md` a medida que llega; ordenar capturas en `docs-source/` antes de tocar la página | Envía material por bloques y no quiere que se pierda nada |
| Ramas y commits | Una rama por tema, commits pequeños y descriptivos, un PR por rama; su GitHub debe verse lleno y ordenado | Lo pidió explícitamente ("control perfecto de ramas") |
| Deploy | Solo cuando lo pide ("deploy", "BIEN DEPLOY", "haz deploy"). Un "sigue" o "guarda" no es permiso para mergear | Se le enseña primero y él decide |
| Borrar ramas remotas / cerrar servidores | Hacerlo cuando lo pida o lo autorice; guardar antes una etiqueta `archive/*` o `restore/*` | Lo viejo se borra, pero siempre se puede volver |
| Revisión visual | Verlo en su navegador (`Start-Process http://localhost:4399/portfolio/…`) o con capturas Playwright leídas a ojo (escritorio y móvil) | No basta con que compile |
| Estilo | Simple antes que llamativo; si algo "no le gustó nada", se revierte completo, no se apila | Rechaza rápido los efectos que no le convencen |
| Textos | Sin rayas largas (—), sin relleno que suene a IA ("documentados en el camino", "más contenido, próximamente", "aún no migran a X"); lo pendiente dice solo "Pendiente" | Lo notó y lo corrigió varias veces |
| Idiomas | Todo el sitio en ES y EN (botón arriba a la derecha); un texto sin traducir rompe el build a propósito | Pidió que /docs funcione igual en inglés |
| Tutoriales | Tan fáciles que se puedan seguir sin recordar nada: imagen general con recuadros naranjas + capturas de detalle, valores reales | Los usa para presentar y repetir prácticas |
| Cosas que pide omitir | No documentarlas (p. ej. la bio de una compañera, discrepancias de tamaño en capturas) | Decisión suya |
| Idioma de trabajo | Español; commits y docs en español, código y nombres técnicos en inglés | Convención del repo |

Datos personales útiles: su nombre real es Alessandro (el usuario del sistema se llama "jordi"); la laptop tiene 8 GB de RAM y batería con lecturas erráticas, así que **cualquier medición de tiempos es ruidosa** (ver §4).

## 2. Flujo de git y GitHub

1. `git checkout main && git pull`; `git checkout -b tipo/tema` (`feat/`, `fix/`, `perf/`, `docs/`).
2. Commits de una sola idea, mensaje `tipo(ámbito): qué y por qué` en español, terminado con la línea `Co-Authored-By` que indique la sesión. Si una rama depende de otra, **apilar**: base del PR = la rama anterior.
3. Push y PR con `gh pr create` (cuerpo: qué cambia, cómo se probó, enlace a la doc). Revisar `gh pr checks`: el job `build` + `lighthouse` corre en PR **solo si el PR apunta a `main`**; un PR apilado no lo dispara hasta retargetearlo.
4. Merge a `main` en orden, con `--merge` (no squash: se quiere ver cada commit): `gh pr merge N --merge`, luego `gh pr edit N+1 --base main` para el siguiente y otra vez merge.
5. Cada push a `main` despliega (GitHub Actions, ~1 min). Verificar en vivo: `curl` de la home, de una página de docs (200) y de una ruta inexistente (404), y una pasada Playwright contra `https://alesso-24.github.io/portfolio/`.
6. Cerrar el ciclo: etiqueta anotada `restore/<descripción>-AAAA-MM-DD` sobre `main`, línea nueva en `RAMAS-ARCHIVADAS.md` (por PR aparte), borrar ramas mergeadas (local y remota), actualizar CONTEXTO.md.

Cuidados que ya costaron tiempo:
- `git add -A` mete `_scratch/` (carpeta local sin seguimiento, no es de nadie): añadir archivos por nombre o hacer `git reset _scratch`.
- Dos ramas que añaden líneas al final de `.gitignore` chocan: resolver conservando ambas.
- Un worktree temporal con `node_modules` enlazado (junction) no se borra con `git worktree remove`: quitar antes el enlace con `cmd /c rmdir <ruta>\node_modules` y comprobar que el `node_modules` real sigue intacto.
- Si el asistente pide permiso para borrar ramas remotas y se deniega, no reintentar igual: pedir autorización a Alessandro.
- Para detener un servidor local: `Get-NetTCPConnection -LocalPort 4399` → `Stop-Process -Id <pid>` (PowerShell).

## 3. Cómo se editan archivos (Windows, Git Bash y CRLF)

- Muchos archivos del repo tienen finales de línea CRLF. Un script de reemplazo debe **leer con `newline=''`, normalizar a `\n`, aplicar cambios y volver a CRLF** si el original lo era; si no, todo el archivo aparece como modificado.
- Los reemplazos de varias líneas con heredocs de bash fallan a menudo por comillas: escribir el script (`.py`/`.mjs`) con la herramienta de archivos y ejecutarlo. Cada reemplazo debe fallar en voz alta si el texto a sustituir no existe (`assert a in s`).
- Los scripts temporales de prueba viven en el directorio scratchpad de la sesión, no en el repo. Si un script es útil a largo plazo, se describe aquí, no se sube.

## 4. QA y mediciones (método reproducible)

Orden: `npm run lint` (0 errores) → `npm run build` → servir `dist/` en otro puerto (`npx astro preview --port 4399`, base `/portfolio/`) → pruebas.

**Herramientas:** `playwright-core` con `executablePath` del Chromium instalado (`%LOCALAPPDATA%\ms-playwright\chromium-*\chrome-win64\chrome.exe`), sesiones CDP para emulación y perfilado.

| Qué se verifica | Cómo |
|---|---|
| Barrido general | 10 páginas × escritorio (1440) y móvil (390): errores de consola, imágenes rotas, desborde horizontal |
| Guía KiCad/mods | Recorrer los 61 pasos en ES y EN: imágenes cargadas, recuadros alineados, sin desborde |
| Idiomas | Leer `innerText` en cada idioma y buscar palabras del otro; persistencia con clics reales entre páginas |
| Contraste | WCAG AA medido por **píxeles** (captura del elemento, fondo dominante vs color de texto); el menú sobre 7 fondos distintos, mínimo 4.5:1 |
| Accesibilidad | `Emulation.setEmulatedMedia` para `prefers-reduced-transparency`, `prefers-contrast: more`, `forced-colors`, `prefers-reduced-motion` |
| Rendimiento | Perfil de CPU (`Profiler` + `Performance.getMetrics`) durante ~130 eventos de rueda reales; se comparan tarea, script, recálculos y funciones más pesadas antes/después (`LIQUID-GLASS.md` §10) |
| Regulador de refracción | Carga sintética (+65 ms por evento de scroll): debe desactivar y recordar; con `sessionStorage['glass-refract-force']='1'` no |
| Dock y burbuja | Scroll real hacia abajo/arriba, hover, foco de teclado; el indicador debe coincidir con el enlace (izq/der = 0 px) |

**Trampas de la medición:**
- **Lenis absorbe `window.scrollTo` programático**: para probar scroll usar `page.mouse.wheel`.
- Las medias/medianas de fotogramas saltan entre 16.7 y 33.3 ms en esta laptop: **preferir CPU (perfil) a tiempos de fotograma**, y comparar siempre contra una línea base medida en la misma sesión.
- Durante `scrollTo` programático el menú puede salir en blanco en las capturas (artefacto de la prueba, no del sitio).
- `getBoundingClientRect` incluye transformaciones (durante la animación de entrada da 1254 px en vez de 1280): para el tamaño de layout usar `offsetWidth/offsetHeight`.
- Ver una captura no sustituye a medir: contraste, alineación y tiempos se miden; la captura se lee para lo estético.
- `saturate()` alto tiñe de amarillo los fondos crema (se dejó en 1.18); un `backdrop-filter` que desenfoca demasiado borra el efecto de lente (bisel nítido + centro esmerilado).

## 5. Rendimiento: reglas que salieron de medir

1. Medir antes de optimizar (perfil de CPU); arreglar lo que aparece arriba de verdad, no lo que "suena" caro.
2. `backdrop-filter` real solo en elementos flotantes y pequeños; el resto usa el "look" de vidrio barato. La capa ambiental es estática.
3. No hacer hit-testing (`elementsFromPoint`) en scroll: guardar candidatos en caché y leer rectángulos.
4. Nada de `toDataURL` en el hilo principal para imágenes grandes: `toBlob` + `blob:` (la CSP debe permitir `img-src blob:`).
5. Regenerar recursos costosos solo cuando el tamaño se **asienta** (dos comprobaciones seguidas iguales), y cachear por tamaño.
6. Animaciones de aparición: opacidad y `translate`; nunca `scale` sobre contenido con vidrio dentro.
7. Preferir CSS a una librería de JS para animaciones simples (se quitó `motion`: −122 KB en la isla `Nav`).
8. Todo efecto pesado necesita alternativa: regulador de rendimiento, `prefers-reduced-*`, navegadores sin soporte.

## 6. Documentación: qué se actualiza y cuándo

| Archivo | Cuándo |
|---|---|
| `docs-source/produccion-electronica/CONTEXTO.md` | Al **terminar cada hito**: bloque nuevo arriba (qué se hizo, qué sigue, puntos de restauración); lo viejo queda como historial |
| `docs-source/LIQUID-GLASS.md` | Cualquier cambio de diseño de vidrio, dock, refracción o rendimiento (con mediciones) |
| `docs-source/ARQUITECTURA-Y-TECNOLOGIAS.md` | Nueva dependencia, quitar una, cambio de CSP, estructura |
| `docs-source/RAMAS-ARCHIVADAS.md` | Cada etiqueta `restore/*` o `archive/*` nueva y cada rama borrada |
| `README.md` / `BRAND.md` | Cambios visibles al público o de marca (sin rayas largas) |
| Este archivo | Cuando cambie la forma de trabajar |

Regla de oro: si una sesión se cortara ahora mismo, `CONTEXTO.md` + `git log` deben bastar para continuar.

## 7. Pendientes abiertos (no pedidos ahora)

- Fresado físico: fotos y resultados de la placa; valores reales de R/LED; nombre final de la placa.
- Confirmar si BDAI también fue en persona (hoy dice solo "Presented").
- Rama legacy `gh-pages` (archivada en `archive/gh-pages-deploy-manual`, se dejó viva).
- Ideas de rendimiento: pre-generar el mapa del dock contraído; mapa de desplazamiento a media resolución; ~1000 recálculos de estilo por sesión de scroll (casi todos del ticker de Lenis/GSAP).
- Ideas de diseño: barra de progreso de lectura de vidrio, View Transitions, modo oscuro (`LIQUID-GLASS.md` §7).
