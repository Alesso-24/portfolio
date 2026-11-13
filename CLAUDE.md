# Contexto del proyecto: portafolio de Alessandro (Astro 7 + Tailwind 4)

Sitio: https://alesso-24.github.io/portfolio/ — se despliega por CI al hacer merge a `main` (GitHub Pages). Alessandro = usuario del sistema "jordi". Pronombres: they/them. Idioma de trabajo: español (ES es la fuente; EN va en `src/data/docs-en.ts`).

## Reglas de trabajo
- Rama nueva por cambio, PR, merge a `main` solo cuando Alessandro lo pida ("súbelo"); verificar CI y la página en vivo.
- Commits terminan con `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`; PRs con `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.
- Repo en CRLF: los scripts de edición normalizan `\r\n` y reescriben CRLF. Ejecutar scripts node con `node --input-type=module < script.mjs` desde la raíz (para resolver `sharp`).
- Verificar con `I18N_COLLECT=1 npm run build` (falla si falta una traducción) y `npx astro check`.

## Práctica "Creación de PCBs" (`/docs/produccion-electronica/practicas/primera-placa-kicad/`)
Pestañas: KiCad, mods, MonoFab, Multisim, Altium. Página: `src/pages/docs/produccion-electronica/practicas/primera-placa-kicad.astro`. Estado de la práctica: `en-progreso` (`src/data/docs.ts`).

## Pestaña Altium — estado (2026-11-13): etiqueta "Pendiente"
- Datos: `src/data/altium-flow.ts` (sistema Flow, renderizado por `Flow.astro`; tipos en `flow-types.ts`; EN en `ALTIUM_EN` vía `L(es,en)`).
- Helpers: `S(file,[w,h],[altEs,altEn],[capEs,capEn],boxes,wide)`, `shots(layout,...)`, `ph` (placeholder de captura), `pend` (aviso de pendiente), `note`, `important`, `callout`, `table`, `step`. Caja: `[x,y,w,h,[labEs,labEn],pos]` en píxeles de la imagen original; se miden con rejilla y se verifican con render de prueba.
- Imágenes: PNG originales en `docs-source/produccion-electronica/practicas/01-primera-placa/10-altium/<carpeta>/` → WebP q88 en `public/images/docs/produccion-electronica/practicas/01-primera-placa/10-altium/<carpeta>/` → `node scripts/gen-image-sizes.mjs` (regenera `src/data/image-sizes.json`).
- Contexto detallado por tanda: `docs-source/.../10-altium/ACTUALIZACION-CONTEXTO.md`. Lista de capturas que faltan: `docs-source/.../10-altium/CAPTURAS-PENDIENTES.md`.

### Hecho (secciones 1-13, con capturas reales 1-124)
1 Proyecto · 2 Esquemático · 3 Componentes · 4 Conexiones · 5 Esquemático completo · 6 DRC del esquemático · 7 Archivo PCB (Update Schematics / Import Changes / ECO) · 8 Reglas de JLCPCB (.RUL, Replace all) · 9 Origen y forma de la placa (círculo r=27.5 mm, Mechanical 1, Define Board Shape) · 10 Colocar (atajos) · 11 Rutear (manual, vías, autoruteo Situs, 3D) · 12 DRC de la PCB (0 warnings, 22 violaciones estéticas) · 13 Texto en serigrafía (Place → String, Top Overlay).
Se quitó el paso de Polygon Pour (no se usó; recuperable). Imágenes duplicadas no publicadas: 85, 105, 110, 123. Números que nunca llegaron: 18-20, 75-77, 86, 88-89, 95, 97-98, 121.

### Falta (hoy son texto de referencia + zonas punteadas)
- **Logo** (sección 13): Place → Graphics, formato, tamaño, capa. Alessandro quiere el logo de la Ibero: BMP 1 bit en `C:\Users\jordi\Downloads\ibero_puebla_silk.bmp` (1838x786). Su Altium es AD26 y no trae `PCBLogoCreator.pas`; opciones: descargar el script oficial o vectorizar (Inkscape→DXF→Import). Falta que elija método, PCB y ancho en mm.
- **Layer Stack Manager** (sección 9): captura.
- **14 Fabricación** (Gerber, NC Drill, .zip) y **15 JLCPCB** (subida, vista previa, parámetros): provisionales, sin capturas; orden y detalles pueden cambiar.
- Botón de descarga del `.RUL` de JLCPCB (sin fuente oficial confirmada); botones restantes de Situs; nombre exacto de botones 8-11 de la barra; lado en que aparecen las huellas tras importar; cómo corregir cada mensaje del DRC del esquemático.
- Verificar con JLCPCB vigente: vía taladro 0.3 / pad 0.6 mm, holguras y tablas de atajos.

## Otros pendientes del sitio
MonoFab: "errores de continuidad" que Alessandro indicará · Multisim: ~44 capturas pendientes y bloques "Por comprobar" · texto de Objetivo sin mencionar Multisim/Altium · revisión visual final en el navegador de Alessandro (la extensión de Chrome no respondía).
