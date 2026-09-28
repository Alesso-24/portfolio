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

**Imágenes recibidas → archivos** (en `01-encendido-y-montaje/` — carpeta renombrada de
`00-preparacion-y-montaje` al llegar el Bloque 2, porque instalar el driver/vPanel va antes):

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

**Sin clasificar (resuelto en el Bloque 2):** la séptima imagen del Bloque 1 (ícono de "VPanel for
SRM-20") no tenía texto — ya se aclaró, ver abajo.

### 2026-09-27 — Bloque 2: pasos previos (driver/vPanel), abrir vPanel y calibración de ejes

**Lo que dijo Alessandro:**

**Pasos previos** (antes de todo lo del Bloque 1, en realidad): instalar el driver de la MonoFab
y el software vPanel. Mandó los instaladores:
- `monofabDriver_V180.zip`
- `VPanel-for-SRM-20_Installer.zip`

**Con todo montado (fin del Bloque 1), cerrar la tapa y abrir el vPanel** (el ícono del acceso
directo era esto — resuelve la duda del Bloque 1).

**Los 3 cortes, en este orden** (de la instrucción pegada por Alessandro):
1. **Perforaciones** — broca de **0.8 mm**.
2. **Pistas y/o etiquetas** — **cortador en V**.
3. **Borde** — corte de contorno de la placa, herramienta de **2 mm**.

Con cada paso hay que **cambiar la herramienta de corte**. Las configuraciones (velocidades,
diámetros, etc.) salen de mods — ver `07-monofab-mods/` y los valores ya documentados en
`../../../CONTEXTO.md` (PERIFERIA ≈1.9 mm, PISTAS = V-bit 0.396 mm, ORIFICIOS = 0.79 mm ≈ "0.8 mm").
**Importante:** el orden real de fresado (perforaciones → pistas → borde) es **distinto** del
orden en que mods genera los 3 archivos (periferia → pistas → orificios) — son dos secuencias
independientes, una de software y otra de máquina; no es un error, hay que explicarlo así en
la página.

**Al cambiar de herramienta hay que volver a calibrar — pero SOLO el eje Z, nunca perder X/Y**
(X/Y se calibra una sola vez, al principio).

**Procedimiento de calibración (primera vez, con la broca de 0.8 mm):**
1. Poner la herramienta en el spindle (broca de 0.8 mm primero) y asegurarla con una **llave Allen**.
2. Con el vPanel, moverse en X/Y hasta una esquina de la placa fenólica, dejando algo de margen.
3. Fijar el origen X/Y ahí, con el botón de "Set Origin Point" → **X/Y** del vPanel.
4. **Calibrar Z (con mucho cuidado — bajar de golpe puede romper la broca):**
   - Posicionarse arriba de la placa, en un punto que no se vaya a usar.
   - Encender el spindle y esperar a que las RPM se estabilicen (6000–8000 rpm, unos 5–6 s).
   - Bajar poco a poco con los botones de Z, reduciendo el paso conforme se acerca: **100 → 10 → 1**.
   - Seguir bajando (spindle encendido) hasta que empiece a salir un poco de **polvo blanco** —
     ahí se marca el origen Z, con el botón "Set Origin Point" → **Z**.
   - Subir la herramienta y apagar el spindle.

**Imágenes recibidas → archivos:**

| Contenido real | Uso | Archivo |
|---|---|---|
| Ícono de acceso directo "VPanel for SRM-20" | Sitio (paso "abrir vPanel") | `00-instalacion-software/vpanel-icono-acceso-directo.png` |
| Interfaz de vPanel, limpia/sin anotar (X/Y/Z en 0.00) | Sitio — **pendiente**: agregar los recuadros naranjas del sitio cuando se diseñe la sección (ver guía abajo, no hacerlo ahora) | `02-calibracion-ejes-y-cambio-herramienta/vpanel-interfaz-limpia.png` |
| Colocando la broca de 0.8 mm en el spindle con llave Allen (acercamiento) | Sitio | `02-calibracion-ejes-y-cambio-herramienta/colocar-broca-0.8mm.png` |
| Asegurando la herramienta con la llave Allen (ángulo más abierto, spindle naranja) | Sitio | `02-calibracion-ejes-y-cambio-herramienta/asegurar-herramienta-llave-allen.png` |
| Interfaz de vPanel **ya anotada con recuadros rojos** (ejemplo de otra versión del software) | **Solo de referencia para mí — Alessandro pidió explícitamente no ponerla en el sitio.** No se guardó en el repo. | — |
| Recorte "X/Y" · "Z" (botones de Set Origin Point) | Solo de referencia para mí, no ponerla en el sitio | — |
| Recorte "Set Origin Point" completo con los mismos botones | Solo de referencia para mí, no ponerla en el sitio | — |
| Recorte "Cursor Step" (Continue/x100/x10/x1) | Solo de referencia para mí, no ponerla en el sitio | — |

**Guía para cuando se diseñe la sección (anotar `vpanel-interfaz-limpia.png` con recuadros
naranjas, estilo `AnnotatedShot.astro` del sitio):**
- **Position X/Y/Z** (arriba a la izquierda): lectura de la posición actual.
- **Move XY** / **Move Z** (cruceta central y barra derecha): mover el cabezal a mano.
- **Cursor Step** (Continue/x100/x10/x1): qué tanto se mueve por click — usar pasos grandes lejos
  de la placa y bajarlos (100→10→1) al acercarse en Z.
- **Spindle ON/OFF** + lectura de RPM (abajo a la izquierda).
- **Set Origin Point → X/Y** y **→ Z** (derecha): fijan el origen de cada eje por separado, en la
  posición actual del cabezal — son los botones clave de toda la calibración.
- **Setup / Cut / Pause / Cancel** (abajo a la derecha): cargar el archivo (`Setup`) y arrancar el
  corte (`Cut`).

### 2026-09-27 — Bloque 3: cargar el archivo de orificios y fresar

**Lo que dijo Alessandro:**

1. En la **imagen general** del vPanel, el botón **Cut** (Alessandro no estaba seguro: "investiga
   la vdd no me acuerdo pero creo que ahí se cargaban archivos") — **confirmado**: al picarlo se
   abre la ventana "Cut" (Image #16), con la lista de archivos a cortar. No es "Setup".
2. En esa ventana "Cut": botón **Add** (ya venía marcado en rojo en la imagen que mandó) → se abre
   el explorador de Windows y se elige el archivo `.rml` que haga los agujeros de la placa
   (Image #17: carpeta con `PISTAS_FINAL.rml`, `ORIFICIOS_FINAL.rml` y `CONTORNO_FINAL.rml` — se
   selecciona **`ORIFICIOS_FINAL.rml`**, que es el de las perforaciones).
3. Ya agregado a la lista, botón **Output** (en la misma ventana "Cut") → arranca el corte: el
   cabezal baja, va a su origen, se acerca a la placa cada vez más lento y empieza a perforar.
4. **Seguridad:** estar pendiente todo el tiempo, sobre todo al principio. Si algo se ve mal — no
   se ve bien, o la herramienta "hace cosas en el aire" (no está tocando la placa donde debería) —
   parar de inmediato con el botón **Cancel** del vPanel (el de la ventana principal, no el de la
   ventana "Cut").

**Dato real del proyecto (no genérico):** los archivos finales de Alessandro se llaman
`PISTAS_FINAL.rml`, `ORIFICIOS_FINAL.rml` y `CONTORNO_FINAL.rml` — **distinto** de los nombres
genéricos `PISTAS.rml`/`ORIFICIOS.rml`/`PERIFERIA.rml` ya documentados en la pestaña **mods**
(ahí se explica el flujo general de mods.org; aquí, en MonoFab real, se puede usar el nombre real
de sus archivos). No es una inconsistencia a corregir, son dos cosas distintas: una explica el
software, la otra documenta lo que él hizo.

**Imágenes → archivos** (en `03-fresado-orificios/`):

| Contenido real | Archivo |
|---|---|
| Ventana "Cut" del vPanel: lista de archivos, Preview, botón **Add** ya marcado en rojo (Z=2.0 en el panel de fondo) | `vpanel-dialogo-cut-add.png` |
| Explorador de Windows: `PISTAS_FINAL.rml`, `ORIFICIOS_FINAL.rml` (seleccionado), `CONTORNO_FINAL.rml` | `seleccionar-orificios-final-rml.png` |

**Guía para cuando se diseñe (pendiente, no hacerlo ahora):**
- En `vpanel-interfaz-limpia.png` (de la tanda 2): agregar recuadro naranja en **Cut** (para abrir
  la ventana de carga) y en **Cancel** (parada de emergencia) — con nota de "estar pendiente todo
  el corte, sobre todo al inicio".
- En `vpanel-dialogo-cut-add.png`: ya trae un recuadro rojo en **Add** (de Alessandro); al diseñar,
  rehacerlo en naranja (estilo `AnnotatedShot.astro`) y agregar uno nuevo en **Output**.

**Nota sobre el `monofabDriver_V180.zip`:** pesa **~42 MB**. Lo dejé en la carpeta pero **no lo
subí a git** (el otro, `VPanel-for-SRM-20_Installer.zip`, ~1 MB, tampoco) — meter instaladores de
Roland/DGSHAPE al repo infla el historial de git para siempre y es material de un tercero, no
nuestro. Sugerencia para cuando diseñemos: enlazar a la página oficial de descargas de
Roland/DGSHAPE para la SRM-20 en vez de alojar los instaladores aquí. Pendiente de que Alessandro
lo confirme.
