# Contexto del proyecto: portafolio de Alessandro (Astro 7 + Tailwind 4)

Sitio: https://alesso-24.github.io/portfolio/ — se despliega por CI al hacer merge a `main` (GitHub Pages). Alessandro = usuario del sistema "jordi". Pronombres: they/them. Idioma de trabajo: español (ES es la fuente; EN va en `src/data/docs-en.ts`).

## Reglas de trabajo
- Rama nueva por cambio, PR, merge a `main` solo cuando Alessandro lo pida ("súbelo"); verificar CI y la página en vivo.
- Commits terminan con `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`; PRs con `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.
- Repo en CRLF: los scripts de edición normalizan `\r\n` y reescriben CRLF. Ejecutar scripts node con `node --input-type=module < script.mjs` desde la raíz (para resolver `sharp`).
- Verificar con `I18N_COLLECT=1 npm run build` (falla si falta una traducción) y `npx astro check`.

## Práctica "Creación de PCBs" (`/docs/produccion-electronica/practicas/primera-placa-kicad/`)
Pestañas: KiCad, mods, MonoFab, Multisim, Altium. Página: `src/pages/docs/produccion-electronica/practicas/primera-placa-kicad.astro`. Estado de la práctica: `completa` (`src/data/docs.ts`).

## Práctica 02 "Proyecto Kiro" (`/docs/produccion-electronica/practicas/proyecto-kiro/`)
Página: `src/pages/docs/produccion-electronica/practicas/proyecto-kiro.astro` (estado `en-progreso`, registrada en `src/data/docs.ts`; EN en `docs-en.ts`). Imágenes WebP en `public/images/docs/produccion-electronica/proyecto-kiro/` (copiadas de `Escritorio\Kiro\docs\img`). Fuente de verdad del proyecto: repo https://github.com/Alesso-24/Kiro (sitio con demos: https://alesso-24.github.io/Kiro/). La PCB es **Kiro v1** (serigrafía «Alux V1»); falta la carcasa. Al avanzar Kiro, actualizar esta página.

## Kiro en el sitio (portada + página de proyecto)
- Portada: `src/components/sections/KiroTeaser.astro` (banner oscuro «Próximamente · Siguiente proyecto», id `#kiro`, tras Work). Página: `src/pages/project/kiro.astro` (ES/EN con `lang-en`/`lang-es`; bloques «Bajo el cofre» en `<details>`; hoja de ruta con estados done/now/next, **actualizar al avanzar**).
- Ojos en vivo: `src/components/ui/KiroEyes.astro` = iframe del MOTOR REAL (`public/kiro/lab/kiro_embed.html`, generado con `Kiro/herramientas/make_embed.py` desde `kiro_v4.html`; controlado por postMessage: expr/auto/mouse). Si cambia kiro_v4, regenerar y copiar ambos html a `public/kiro/lab/`.
- Chips de emoción: `<KiroEyes controls side />` los pone a la derecha en ≥900 px (apilados debajo si es más angosto); `.kiro-stage` se ensancha a 1080 px en escritorio (margen calc, no transform por `data-reveal`).
- Estudio real embebido (iframe a ancho amplio, carga solo, ancla `#estudio`): `public/kiro/lab/kiro_v4.html` (copia de `Kiro/estudio`). Por eso `frame-src` de la CSP en `Base.astro` incluye `'self'`.
- Imágenes en `public/images/kiro/`. Al terminar la carcasa/PCB ensamblada: quitar «Próximamente» (teaser y badge) y pasar a `PROJECTS` en `content.ts`.

## Pestaña Altium — estado (2026-11-14): PUBLICADA sin etiqueta de borrador (15 secciones)
- Datos: `src/data/altium-flow.ts` (sistema Flow, renderizado por `Flow.astro`; tipos en `flow-types.ts`; EN en `ALTIUM_EN` vía `L(es,en)`).
- Helpers: `S(file,[w,h],[altEs,altEn],[capEs,capEn],boxes,wide)`, `shots(layout,...)`, `ph` (placeholder de captura), `pend` (aviso de pendiente), `note`, `important`, `callout`, `table`, `step`. Caja: `[x,y,w,h,[labEs,labEn],pos]` en píxeles de la imagen original; se miden con rejilla y se verifican con render de prueba.
- Imágenes: PNG originales en `docs-source/produccion-electronica/practicas/01-primera-placa/10-altium/<carpeta>/` → WebP q88 en `public/images/docs/produccion-electronica/practicas/01-primera-placa/10-altium/<carpeta>/` → `node scripts/gen-image-sizes.mjs` (regenera `src/data/image-sizes.json`).
- Contexto detallado por tanda: `docs-source/.../10-altium/ACTUALIZACION-CONTEXTO.md`. Lista de capturas que faltan: `docs-source/.../10-altium/CAPTURAS-PENDIENTES.md`.

### Hecho (secciones 1-13, con capturas reales 1-124)
1 Proyecto · 2 Esquemático · 3 Componentes · 4 Conexiones · 5 Esquemático completo · 6 DRC del esquemático · 7 Archivo PCB (Update Schematics / Import Changes / ECO) · 8 Reglas de JLCPCB (.RUL, Replace all) · 9 Origen y forma de la placa (círculo r=27.5 mm, Mechanical 1, Define Board Shape) · 10 Colocar (atajos) · 11 Rutear (manual, vías, autoruteo Situs, 3D) · 12 DRC de la PCB (0 warnings, 22 violaciones estéticas) · 13 Texto en serigrafía (Place → String, Top Overlay).
Se quitó el paso de Polygon Pour (no se usó; recuperable). Imágenes duplicadas no publicadas: 85, 105, 110, 123. Números que nunca llegaron: 18-20, 75-77, 86, 88-89, 95, 97-98, 121.

### Falta (verificar/mejorar; la guía ya se publica completa)
- **Gerbers y NC Drill (sección 14) — lo más importante:** hoy son pasos de referencia (File → Fabrication Outputs → Gerber Files / NC Drill Files; capas de cobre, máscara, serigrafía y Mechanical 1) **sin capturas y sin confirmar con la placa real de Alessandro** (unidades, formato, nombres exactos en AD26, cómo crear el .zip). Falta documentar con capturas cómo los saca.
- **JLCPCB (sección 15):** pasos de referencia sin capturas (subida del .zip, vista previa, parámetros); verificar con el sitio vigente. Ensamble SMT (BOM + pick-and-place) no cubierto.
- **Logo** (sección 13): pasos de referencia sin capturas. Alessandro quiere el logo de la Ibero: BMP 1 bit en `C:\Users\jordi\Downloads\ibero_puebla_silk.bmp` (1838x786). Su Altium es AD26 y no trae `PCBLogoCreator.pas`; opciones: descargar el script oficial o vectorizar (Inkscape→DXF→Import). Falta que elija método, PCB y ancho en mm.
- **Layer Stack Manager** (sección 9): captura. Cómo corregir cada mensaje del DRC del esquemático; lado en que aparecen las huellas tras importar; botones restantes de Situs y botones 8-11 de la barra (nombres exactos); botón de descarga del `.RUL` de JLCPCB (sin fuente oficial).
- Verificar con JLCPCB vigente: vía taladro 0.3 / pad 0.6 mm, holguras y tablas de atajos.

## Otros pendientes del sitio
MonoFab: "errores de continuidad" que Alessandro indicará · Multisim: solo visible lo que tiene capturas; circuitos de clase ocultos, ver `docs-source/produccion-electronica/MULTISIM-PENDIENTE.md` · el Objetivo ya menciona Multisim/Altium · práctica marcada `completa` · revisión visual de Alessandro en su navegador.
