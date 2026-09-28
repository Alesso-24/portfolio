# MonoFab real (calibración → fresado físico) — bitácora de trabajo

> Iniciada 2026-09-27 en la rama `feat/monofab-real` (sale de `main`, ya con la separación
> mods/MonoFab commiteada en `2b4caf5`).
> **Regla de esta fase:** Alessandro manda el material en varias tandas, en varios prompts,
> diciendo qué es cada foto. **Mientras tanto solo se organiza y se guarda contexto aquí, en
> `docs-source/`. No se toca `panel-monofab` en `primera-placa-kicad.astro` ni se diseña nada**
> hasta que Alessandro diga explícitamente que ya mandó todo y que se puede empezar.
> Todo lo que diga o mande se registra abajo, en orden, para poder integrarlo después.
> Ver también `../../../CONTEXTO.md` → entrada "🚧 2026-09-27: EN CURSO — MonoFab real".

## Registro (en orden)

### 2026-09-27 — Bloque 1: encender la máquina y preparar/montar el material

**Lo que dijo Alessandro** (aclaró que el orden de los bloques no importa, que yo solo organice
la información de forma que tenga sentido):

1. Conectar el cable USB de la MonoFab a la computadora.
2. Encenderla con el botón de la parte superior de la máquina y esperar a que se ponga **verde**.
3. Foto general de la máquina, para usarla como referencia cuando haga falta.
4. **Preparar el material:** usar una placa **fenólica de fibra de vidrio**, no de papel —
   si algo sale mal al fresar, una de papel puede hacer que la máquina se lleve todo el cobre.
   Mandó una foto de una fenólica como referencia (imagen de producto, fondo blanco).
5. Pegar la placa a la **cama de sacrificio** con cinta doble cara (por la parte de atrás).
6. La cama de sacrificio se corta en la **cortadora láser**; mandó el DXF para dejarla igual.
7. Abrir la tapa de la MonoFab, acomodar la tabla de sacrificio ya con la placa pegada, y
   atornillarla bien con los **4 tornillos**.

**Imágenes recibidas → archivos** (en `00-preparacion-y-montaje/`):

| # en el mensaje | Contenido real de la foto | Archivo |
|---|---|---|
| Image #1 | Botón de encendido en verde (dedo tocándolo) | `boton-encendido-verde.png` |
| Image #2 | **Mismo archivo, byte a byte, que Image #1** — no llegó una foto distinta del cable USB | *(no se duplicó; ver nota abajo)* |
| Image #3 | Vista general de la SRM-20 sobre la mesa de trabajo | `vista-general-srm20.png` |
| Image #4 | Fenólica de fibra de vidrio, foto de producto (fondo blanco) — **pendiente**: quitarle el fondo o estilizarla cuando se diseñe la sección | `fenolica-fibra-vidrio-referencia.png` |
| Image #5 | Fenólica ya pegada (cinta doble cara) sobre la cama de sacrificio, fuera de la máquina | `fenolica-pegada-cama-sacrificio.png` |
| Image #6 | Atornillando la cama de sacrificio ya dentro de la MonoFab (tapa abierta) | `atornillado-cama-sacrificio.png` |
| — | Archivo DXF de la cama de sacrificio, de `C:\Users\jordi\Downloads\Sacrificio SS.dxf` | `sacrificio-SS.dxf` |

**Nota / duda para Alessandro:** Image #1 (que según el texto era "conectar el cable USB") e
Image #2 (el botón en verde) llegaron como el **mismo archivo exacto** — solo se guardó una copia
(`boton-encendido-verde.png`). Si tienes a la mano la foto real de conectar el cable USB, mándala
en la siguiente tanda y se agrega.

**Sin clasificar:** llegó una séptima imagen (ícono del acceso directo "VPanel for SRM-20" en el
escritorio) sin texto que la describiera — no se guardó todavía. Si es parte de este flujo
(por ejemplo, para el paso de abrir el vPanel), dilo en la próxima tanda y se integra donde
corresponda.
