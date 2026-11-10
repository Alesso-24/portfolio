# Altium — bitácora de trabajo

> Iniciada 2026-11-09 en la rama `feat/altium` (sale de `main`, `5dfc1f3`).
> **Regla de esta fase:** Alessandro diseña una placa desde cero en Altium y manda el material
> (capturas, fotos, explicaciones) en varias tandas, diciendo qué es cada cosa. **Mientras tanto
> solo se organiza y se guarda aquí, en `docs-source/`. No se toca el panel `altium` de
> `primera-placa-kicad.astro`, ni `docs.ts`, ni ningún archivo de `src/`** hasta que Alessandro
> diga explícitamente que terminó.

## Cuando diga "terminé" (plan para la fase de construcción — no antes)

- Crear `src/data/altium-flow.ts` (mismo patrón que `monofab-real-flow.ts` / `multisim-flow.ts`), inglés incluido.
- Convertir imágenes a WebP en `public/images/docs/produccion-electronica/practicas/01-primera-placa/10-altium/`
  (+ `node scripts/gen-image-sizes.mjs`).
- Recuadros naranjas con `AnnotatedShot` en **coordenadas de píxel**, medidas con recortes
  ampliados + cuadrícula fina, y **verificando cada recuadro con un render de prueba** (confirmación
  visual de que quedan centrados en botones/menús/campos) antes de dar nada por bueno.
- Reemplazar el panel "Pendiente" de Altium; quitar la insignia; revisar estado en `docs.ts`.
- Revisión visual de Alessandro en su navegador antes de cualquier deploy.

## Estructura de carpetas

- `00-sin-clasificar/` — todo lo que llegue y aún no tenga sección clara.
- Las carpetas por tema (`01-...`, `02-...`) se crean a medida que lleguen tandas y se vea el orden
  natural del proceso. El orden de llegada no importa; el orden final se decide aquí.

## Registro (en orden)


### 2026-11-09 — Tanda 1: abrir Altium Designer y crear el proyecto nuevo

**Regla de estilo (dicha por Alessandro, vale para TODO Altium):** preferir **imágenes generales**
(ventana completa) y meter ahí los **recuadros naranjas** para resaltar de qué se habla, en vez de
recortes sueltos. Cada recuadro se mide en píxeles y se verifica con render de prueba.

**Lo que dijo Alessandro (en orden):**
1. Abrir Altium Designer → Image #1.
2. Se abre la ventana principal → Image #2.
3. Crear un proyecto nuevo: menú **File** → Image #3.
4. **New → Project…** → Image #4.
5. Se abre la ventana "Create Project" → Image #5.
6. Darle un nombre al proyecto → Image #6.
7. Elegir la ubicación → Image #7.
8. Dar **Create** (sin captura todavía; el botón Create se ve en Image #7).

**Imágenes recibidas → archivos** (en `01-crear-proyecto/`):

| # | Contenido real | Archivo | Qué resaltar con naranja (propuesta) |
|---|---|---|---|
| 1 | Buscador de Windows con "altium Designer"; mejor coincidencia "Altium Designer" (Aplicación), botón Abrir, recientes (PCB_TAMAGOCHI_FINAL, Tamagotchi 2.0, Hola_Mundo) | `01-buscar-abrir-altium-designer.png` | resultado "Altium Designer" / botón Abrir |
| 2 | Altium Designer Professional (26.10.1), ventana principal vacía; panel Projects con PCB_TAMAGOCHI y Project Group 1.D (proyecto previo abierto) | `02-ventana-principal-altium.png` | menú File (arriba izq.), panel Projects |
| 3 | Menú **File** resaltado en la barra | `03-menu-file.png` | File |
| 4 | File → **New** → submenú con **Project…** resaltado | `04-file-new-project.png` | New y Project… |
| 5 | Diálogo "Create Project" con valores por defecto: ubicación Universidad Iberoam…, tipo PCB → `<Empty>`, nombre `PCB_Project`, Version Control marcado, Constraint Management sin marcar, Advanced cerrado | `05-ventana-create-project.png` | PCB `<Empty>`, Project Name, botón Create |
| 6 | Mismo diálogo con **Advanced** desplegado; campo nombre `PCB_Project` con icono de error rojo y Folder `Projects\PCB_Project` en rojo; Create deshabilitado | `06-nombre-proyecto-advanced.png` | Project Name (y el error en rojo) |
| 7 | Nombre `PCB_ALTIUM`, Folder `Projects\PCB_ALTIUM`, Local Storage `C:\Users\Public\Documents\Altium` (campo enfocado), Create habilitado | `07-ubicacion-local-storage.png` | Project Name, Folder, Local Storage, Create |

**Notas / dudas para cuando se construya:**
- Image #6 muestra el nombre por defecto `PCB_Project` **con error rojo** (probablemente ya existe un proyecto con ese nombre en el servidor/carpeta) — falta confirmar con Alessandro si quiere mostrarlo como "aviso: nombre no válido/ya usado" o dejar solo Image #7.
- Image #2 tiene abierto un proyecto previo (PCB_TAMAGOCHI): se podría reemplazar por una captura limpia si molesta.
- El proyecto se crea en la ubicación **Universidad Iberoamericana** (espacio de trabajo en la nube) con almacenamiento local en `C:\Users\Public\Documents\Altium`; la ubicación "Local Projects" y "Version Control" existen pero no se usaron.
- Tamaños: Image #1 1918×1078 aprox., #2/#3/#4 1918×1078, #5–#7 ~1480×880 (verificar al medir).

### 2026-11-09 — Tanda 2: añadir el esquemático, guardarlo y abrir el panel de componentes

**Lo que dijo Alessandro (en orden):**
1. Estado de partida: proyecto `PCB_ALTIUM.PrjPcb` ya creado → Image #8.
2. **Clic derecho** sobre `PCB_ALTIUM.Prj…` → **Add New to Project** → **Schematic** → Image #9.
3. Se abre la hoja de esquemático → Image #10.
4. **Ctrl+S** para guardar con el nombre correcto → Image #11; dar **Guardar** (nombre elegido: `Esquematico_altium`).
5. De nuevo en la hoja, ya con el nombre → Image #12.
6. Presionar la letra **P** para agregar componentes: se abre un menú y se elige **Part…** → Image #13.
7. Se abre un panel a la derecha (**Components**) → Image #14.
8. Arriba hay un **menú desplegable** con todos los grupos de componentes clasificados → Image #15 / #16.
9. Ahí están tanto los **predeterminados de Altium** como los que **nosotros hemos agregado** → Image #17.

**Imágenes recibidas → archivos** (en `02-esquematico-y-componentes/`):

| # | Contenido real | Archivo | Qué resaltar con naranja (propuesta) |
|---|---|---|---|
| 8 | Panel Projects: `PCB_ALTIUM.Prj…` desplegado con "No Document"; también PCB_TAMAGOCHI y Project Group 1.D | `08-proyecto-creado-sin-documentos.png` | `PCB_ALTIUM.Prj…` |
| 9 | Menú contextual del proyecto: **Add New to Project** → submenú con **Schematic** resaltado (también PCB, PCB3D, ActiveBOM, Draftsman, librerías, CAM, Output Job, Database Link) | `09-clic-derecho-add-new-schematic.png` | Add New to Project, Schematic |
| 10 | Hoja `[1] Sheet1.SchDoc` vacía (A4, barra de herramientas flotante arriba, pestaña Editor/Sheet1); en Projects aparece Source Documents → Sheet1 | `10-hoja-esquematico-vacia.png` | pestaña `[1] Sheet1.SchDoc`, árbol Source Documents |
| 11 | Diálogo "Save [Sheet1.SchDoc] As…" en carpeta `Altium > PCB_AL…` (contiene `.git`), nombre `Esquematico_altium`, tipo Advanced Schematic binary (*.SchDoc), botón Guardar | `11-guardar-como-nombre.png` | Nombre de archivo, botón Guardar |
| 12 | Misma hoja ya llamada `[1] Esquematico_altium.SchDoc` (pestaña y árbol; título de la hoja muestra la ruta) | `12-hoja-con-nombre-correcto.png` | pestaña, entrada en Projects |
| 13 | Menú contextual de colocación en la hoja: Bus, Bus Entry, **Part…** (resaltado), Power Port, Wire (Ctrl+W), Net Label, Port, Off Sheet Connector, Sheet Symbol… | `13-menu-p-part.png` | Part… |
| 14 | Panel **Components** abierto a la derecha (pantalla completa): selector de librería (S2B-PH-K-S_LF__SN_.In…), búsqueda, resultado 1 (conector 2 pines J?), Details y vista del símbolo | `14-panel-components.png` | selector de librería (desplegable), búsqueda, panel |
| 15 | Recorte del panel Components (mismo contenido que #14, solo el panel) | `15-panel-components-recorte.png` | desplegable de arriba |
| 16 | Desplegable abierto: **All (769)** con categorías (Audio, Batteries, Capacitors 91, Connectors 87, Crystals & Oscillators 30, Diodes 37, Fuses, Inductors, Integrated Circuits, LED 45, Mechanical, Miscellaneous, Optoelectronics, Radio&RF, Relays, Resistors 178, Sensors, Switches 21, Transformers, Transistors 34, Uncategorized 20) y sección FILE-BASED LIBRARIES | `16-desplegable-categorias.png` | lista de categorías (predeterminadas de Altium) |
| 17 | Misma lista, desplazada hasta el final: **FILE-BASED LIBRARIES** = SPICE Libraries, Simulation Generic Components, `XIAO_RP2350.IntLib`, `LIS3DHTR.IntLib`, `DS1021-1X7SF162-B.IntLib`, `S2B-PH-K-S_LF__SN_.IntLib` | `17-desplegable-librerias-file-based.png` | sección FILE-BASED LIBRARIES (las agregadas por el usuario) |

**Notas / dudas para cuando se construya:**
- Alessandro escribió "[Image #16]" pegado a la palabra "Pr[…]oject" y usó #15 para el desplegable; **asigné por contenido real**: #15 = recorte del panel, #16 = categorías, #17 = librerías. Confirmar si #15 y #16 deben ir al revés.
- #14 y #15 son el mismo panel (grande y recortado): usar la general (#14) para los recuadros, como pidió.
- Las librerías `.IntLib` del final son las que él mismo agregó (XIAO RP2350, LIS3DHTR, DS1021, S2B-PH); las de la nube (All 769) son las de Altium/Universidad.
- Falta captura del resultado de **Guardar** distinta de #12 (ya se ve en #12, no hace falta).
- Quedó sin sección de "tecla P" propia: #13 ya es el menú resultante; confirmar si el atajo es solo **P** (dijo "la letra P") o P y luego P.

### 2026-11-10 — Tanda 3: colocar resistencias, power ports, net labels y No ERC

**Confirmado por Alessandro:** el atajo para colocar es **solo la letra P** (se abre el menú de la #13 del bloque anterior).
**Atajo extra dicho:** **barra espaciadora** = rotar el componente mientras flota con el cursor.

**Lo que dijo Alessandro (en orden):**
1. Toca añadir los componentes del circuito. Ejemplo: una **resistencia** → Image #21 (panel Components, categoría Resistors con botón Place).
2. En el panel de la derecha aparece **toda la información del componente** (aquí se puede señalar): su **esquemático/símbolo** (#22), su **vista 3D** (#23) y su **huella** (#24). #25 muestra el panel junto a la hoja.
3. **Doble clic** sobre la resistencia que se quiera (el valor se puede cambiar después) → la resistencia queda **flotando con el cursor** hasta dar clic para colocarla (#25).
4. Se coloca en cualquier parte de la hoja → #26.
5. Asignar nombre al **designador** → #27 (R1).
6. Para cambiar el **valor**: doble clic en el valor mostrado y modificarlo → #28 (953k) y #29 (1K).
7. Añadir otra resistencia con otro designador **R2** → #30.
8. **Alimentaciones:** con la letra P → **Power Port** → #31. Por defecto pone **tierra (GND)**, pero sirve para tierra y para +V. Se arrastra al pin del componente y se da clic → #32.
9. Para **3V3**: mismo Power Port → #33, se coloca → #34; **espacio rota**; luego se cambia el nombre a **+3V3** → #35. "Eso es todo respecto a alimentaciones."
10. **Conexiones en general (buena práctica): etiquetas.** Letra P → **Net Label** → #36; se coloca donde se quiera y se le da un nombre (ej. `P1`). Al poner otra etiqueta con **el mismo nombre** en otro componente, se interpretan como **conectados** → #37.
11. Para dejar un pin **sin conexión sin que marque error**: letra P → **Directives** → **Generic No ERC** → #38; deja una **X** que se coloca en cualquier pin que no se vaya a usar → #39.

**Imágenes recibidas → archivos** (en `03-componentes-y-conexiones/`):

| # | Contenido real | Archivo | Qué resaltar con naranja (propuesta) |
|---|---|---|---|
| 21 | Panel Components vista de categorías (All 769): Capacitors, Crystals, Diodes, Fuses, Inductors, LED, **Resistors** (botón **Place** visible), Transformers, Transistors, Amplifiers | `21-panel-components-categorias-resistors.png` | tarjeta Resistors + botón Place |
| 22 | Panel con Resistors (178): lista Name/Description/Footprint; Details: Value 953k; Models con el **símbolo** R? 1–2 (RES-2) | `22-resistors-lista-y-simbolo.png` | lista, Details/Models con el símbolo |
| 23 | Mismo panel, Models mostrando la **vista 3D** (chip 0402, "Chip Resistor, Body 1.0x0.5mm, IPC High Density", RESC0402(1005)_L), botón 2D | `23-resistors-vista-3d.png` | imagen 3D, botón 2D, nombre de huella |
| 24 | Mismo panel mostrando la **huella 2D** de PCB (almohadillas, ".Designator"), botón 3D | `24-resistors-huella-2d.png` | huella, botón 3D |
| 25 | Pantalla completa: hoja a la izquierda y panel Components a la derecha con la 1.ª fila seleccionada (Resistor 953k, RESC0402(1005)_L); Details con References/Part Choices/Where Used | `25-doble-clic-resistencia-flotando.png` | fila seleccionada (doble clic) |
| 26 | Resistencia **R? 953k** ya colocada en la hoja (seleccionada); panel **Properties** (Designator `R?`, Comment, Description, Location X/Y, Rotation…) | `26-resistencia-colocada-propiedades.png` | resistencia, campo Designator |
| 27 | Designator escrito `R1` en Properties; en la hoja ya dice R1 | `27-designador-r1.png` | campo Designator, etiqueta R1 |
| 28 | Seleccionado el valor 953k: Properties → Parameter, Name `Value`, **Value** `953k` | `28-editar-valor-953k.png` | valor 953k en la hoja, campo Value |
| 29 | Valor cambiado a `1K` (Properties y hoja) | `29-valor-1k.png` | campo Value, valor 1K |
| 30 | Hoja con **R1 1K** y **R2 1K** (sin panel lateral) | `30-segunda-resistencia-r2.png` | designador R2 |
| 31 | Menú de la tecla P con **Power Port** resaltado, en la hoja con R1 y R2 | `31-menu-p-power-port.png` | Power Port |
| 32 | Recorte: **GND** colocado en el pin 1 de R1 (con marca roja de conexión) | `32-gnd-colocado-recorte.png` | símbolo GND en el pin 1 |
| 33 | Recorte del menú con **Power Port** resaltado (para el 3V3) | `33-menu-power-port-recorte.png` | Power Port |
| 34 | Hoja con GND a la izquierda y **otro GND** en el pin 2 de R1 (recién colocado, panel Properties del Power Port: Name GND, Style Bar) | `34-gnd-colocado-en-ambos-lados.png` | el 2.º power port, campo Name |
| 35 | Ese power port renombrado a **+3V3** (Name `+3V3`, Net Name +3V3) | `35-power-port-renombrado-3v3.png` | campo Name, símbolo +3V3 |
| 36 | Recorte del menú con **Net Label** resaltado | `36-menu-net-label-recorte.png` | Net Label |
| 37 | Net label **P1** colocada en el pin 2 de R2 (Properties: Net Name `P1`); R1 con GND y +3V3 | `37-net-label-p1.png` | campo Net Name, etiqueta P1 |
| 38 | Menú P → **Directives** → submenú con **Generic No ERC** resaltado (Differential Pair, Parameter Set, Blanket, Compile Mask) | `38-directives-generic-no-erc.png` | Directives, Generic No ERC |
| 39 | Recorte: **X roja** (No ERC) sobre el pin 1 de R2 | `39-marca-no-erc-en-pin.png` | la X en el pin |

**Notas / dudas para cuando se construya:**
- Las #21–#24 y #26–#29 son **imágenes de panel** (no de pantalla completa); #32, #33, #36, #38 y #39 son **recortes**. Alessandro pidió imágenes generales con recuadros: si algún recorte queda corto para explicar, pedirle una captura completa del mismo momento.
- #33 y #36 (recortes del menú) no muestran el cursor/posición; usar #31 (menú completo) como imagen principal de Power Port y pedir la general de Net Label si hace falta.
- En el árbol Projects aparece una entrada nueva **"Act+ Create"** (debajo del esquemático) que no se explicó; confirmar qué es (¿documento auto-creado de Altium 365?) antes de mostrarla o recortarla.
- Pendiente de aclarar: en la #25 el doble clic ya dejó la resistencia flotando; no hay captura de la resistencia "flotando" (sí de colocada, #26).
- Las imágenes #34/#35 muestran una "+3V3" y "GND" a ambos lados de R1: es solo la demostración, no un circuito real.

### 2026-11-10 — Tanda 4: ejemplo de esquemático completo (meta del paso anterior)

**Lo que dijo Alessandro:** sabiendo lo básico de conexiones, el **primer esquemático** quedaría **algo así**: con conexiones, labels, alimentaciones, etc., de forma **limpia, organizada y sin cables enredados** para facilitar la lectura → Image #40.

**Imagen recibida → archivo** (en `04-esquematico-completo-ejemplo/`):

| # | Contenido real | Archivo | Qué resaltar con naranja (propuesta) |
|---|---|---|---|
| 40 | Esquemático del proyecto **PCB_TAMAGOCHI_FINAL.PrjPcb** (pestaña `Sheet1.SchDoc`) en pantalla completa: U1 XIAO_RP2350 con net labels a la izquierda (BAT_P, BAT_N, VBAT_DIV, DISP_CS, DISP_DC, DISP_PWR, I2C_SDA, I2C_SCL, BTN1, LIS_INT2, SPI_SCK, BTN2) y VUSB/3V3/GND a la derecha; J2 batería (S2B-XH-A); J3/J4 botones BTN1/BTN2; R1/R2 pull-ups 4k7 en I2C_SDA/I2C_SCL; R3/R4 100k (divisor VBAT_DIV); Q1 BSS84LT1G con DISP_PWR → VCC_DISP; R5 100k; C1–C5 (100n/10u) de desacople; U2 LIS3DHTR (acelerómetro) con X de No ERC en pines sin uso; J1 DS1021-1X7SF162-B (pantalla, 7 pines). Alimentaciones +3V3/GND con power ports. | `40-esquematico-ejemplo-tamagochi.png` | ejemplos de: net labels, power port +3V3/GND, X No ERC, designadores, valores |

**Notas / dudas para cuando se construya:**
- **No es el esquemático de `PCB_ALTIUM`**: es el proyecto anterior **PCB_TAMAGOCHI_FINAL**, usado como *ejemplo de cómo debe quedar* (el árbol Projects muestra ambos proyectos, el del ejemplo con PCB1.PcbDoc, CAMtastic1/2, Generated). Confirmar si en la guía se presenta así ("ejemplo de un esquemático terminado") o si luego va el esquemático real de la placa nueva.
- La imagen sirve para señalar buenas prácticas: **etiquetas de red en vez de cables largos**, **GND/+3V3 con power ports**, **componentes agrupados por función**, **X de No ERC** en pines sin uso, **designadores y valores legibles**. Alessandro dirá cuáles resaltar.
- Esta es la **primera imagen general grande con mucho detalle**: para los recuadros conviene medir con recortes ampliados (texto pequeño, 1918×1078 aprox.).
- En la barra superior del editor se ve la pestaña `[1] Esquematico_altium.SchDoc *` (con asterisco, sin guardar los cambios del ejemplo anterior) junto a `[1] Sheet1.SchDoc`.

### 2026-11-10 — Tanda 5: DRC del esquemático, crear el PCB y "Update Schematics" + PUBLICACIÓN DEL BORRADOR

**Lo que dijo Alessandro (en orden):**
1. Antes de pasar al diseño de la PCB es **muy importante correr un DRC del esquemático**: **Project → Validate PCB Project** → Image #41.
2. Salen los errores antes de editar la PCB (panel **Messages**) → Image #42. Corregir todo hasta que no haya problemas críticos.
3. Después, **agregar el archivo PCB**: clic derecho sobre el `.PrjPcb` en Projects → **Add New to Project → PCB** → Image #43.
4. Una vez creada, se ve el editor de PCB vacío → Image #44. **Ctrl+S** para guardar con el nombre correcto → Image #45 (pestaña `PCB_ALTIUM.PcbDoc`) y **Guardar**.
5. Para pasar el esquemático a la placa: **Design → Update Schematics in PCB_ALTIUM.PrjPcb** → Image #46.
6. **"Por ahora hasta aquí. Carga a la página lo que llevamos; aún falta. Deja los espacios para imágenes pero completa la info de manera provisional hasta para mandar a JLCPCB. Deja en tu contexto que el orden de lo que no tenemos se puede modificar y que es meramente provisional. Ahora súbelo y que esté online. No pierdas contexto, dónde nos quedamos, ni la organización de las imágenes: aún no acabamos."**

**Imágenes recibidas → archivos** (en `05-drc-y-pcb/`):

| # | Contenido real | Archivo | Qué resaltar con naranja (propuesta) |
|---|---|---|---|
| 41 | Menú **Project** con **Validate PCB Project PCB_TAMAGOCHI_FINAL.PrjPcb** resaltado (recorte; proyecto de ejemplo, no PCB_ALTIUM) | `41-menu-project-validate-pcb-project.png` | Project, Validate PCB Project |
| 42 | Proyecto `PCB_ALTIUM`: esquemático con designadores `?` y panel **Messages** con ~23 mensajes (Duplicate Component Designator ×4, "GND contains IO Pin…", "LIS_INT2 contains IO P…", Un-Designated Part …); Details: "Duplicate Component Designators C?" | `42-mensajes-drc-errores.png` | panel Messages, mensajes de duplicados y sin designar |
| 43 | Menú contextual de `PCB_ALTIUM…`: **Add New to Project → PCB** resaltado (recorte) | `43-clic-derecho-add-new-pcb.png` | Add New to Project, PCB |
| 44 | Editor de PCB vacío (`PCB1.PcbDoc`, tablero negro, barra de capas abajo: Top Layer, Bottom Layer, Mechanical 1, Top/Bottom Overlay…), pestañas del esquemático y `Sheet1.SchDoc` | `44-pcb-nuevo-vacio.png` | pestaña PCB1.PcbDoc, barra de capas, entrada en Projects |
| 45 | Recorte de la pestaña ya renombrada `PCB_ALTIUM.PcbDoc` | `45-pestana-pcb-altium-pcbdoc.png` | la pestaña |
| 46 | Menú **Design** con **Update Schematics in PCB_ALTIUM.PrjPcb** resaltado (recorte; también Import Changes, Rules, Rule Wizard, Board Shape, Layer Stack Manager…) | `46-menu-design-update-schematics.png` | Design, Update Schematics in… |

**Notas / dudas para cuando se construya con imágenes reales:**
- #41 y #46 son recortes con un proyecto de ejemplo detrás (TAMAGOCHI): si hace falta, pedir captura general de `PCB_ALTIUM`.
- #42 es **el DRC del esquemático de ejemplo copiado a PCB_ALTIUM**, sin designadores numerados: sirve como ejemplo de errores. Falta que Alessandro explique **cómo los corrige** (¿Annotate?) — está marcado `pending` en la sección 6.
- Falta la captura del **resultado de Update Schematics** (ventana de cambios + placa con componentes y ratsnest).

## 🟠 ESTADO DE LA PUBLICACIÓN (2026-11-10) — LEER PRIMERO

- Por orden explícita de Alessandro ("súbelo y que esté online"), el **borrador de Altium se publicó** (rama `feat/altium` → PR → `main`). Esto cancela la regla anterior "no tocar el sitio hasta que diga que terminó" **solo para este primer borrador**: las tandas siguientes se siguen **organizando primero y publicando solo cuando él lo pida**.
- Código: `src/data/altium-flow.ts` (15 secciones; inglés vía `ALTIUM_EN` → `docs-en.ts`), pestaña/panel de Altium en `primera-placa-kicad.astro` (insignia "Borrador" en vez de "Pendiente"), estado de la práctica `en-progreso` (la ficha ahora lee `docs.ts`), `flow-types.ts` con id `altium`.
- **Secciones 1–7 = REALES** (salen de las tandas 1–5): proyecto, esquemático, componentes, conexiones (power ports, net labels, No ERC), esquemático completo, DRC del esquemático, crear PCB + Update Schematics.
- **Secciones 8–15 = PROVISIONALES** (flujo estándar de Altium sin capturas ni confirmación de Alessandro): 8 forma/capas, 9 reglas de diseño (valores orientativos, **verificar contra capacidades vigentes de JLCPCB**), 10 colocar, 11 rutear, 12 plano de tierra + serigrafía, 13 DRC de la PCB + 3D, 14 archivos de fabricación (Gerber/NC Drill), 15 JLCPCB. **Su ORDEN Y CONTENIDO PUEDEN CAMBIAR**: se reescriben conforme Alessandro mande lo real. Cada una lleva un aviso `pending` "provisional".
- **Todos los huecos de imagen son `placeholder`** (no hay imágenes en el sitio todavía). Las imágenes reales (organizadas en esta carpeta, 01–05) se integrarán con recuadros naranjas medidos en píxeles y verificados **cuando Alessandro diga que terminó**.
- **Dónde nos quedamos:** justo después de `Design → Update Schematics`. Siguiente material esperado: ventana de cambios (ECO) y la placa con componentes → forma de la placa → resto del flujo.

## 🟢 2026-11-10 (después): IMÁGENES YA INTEGRADAS EN LA PÁGINA (rama feat/altium-imagenes, SIN desplegar)
- Las 43 capturas (01-46, faltan 18-20 que nunca llegaron) están en `public/images/.../10-altium/<carpeta>/NN-*.webp` y en `altium-flow.ts` secciones 1-7 como bloques `shots` con recuadros naranjas medidos con cuadrícula y verificados con render de prueba (todos los tamaños coinciden).
- Secciones 8-15 siguen provisionales con `placeholder`. Cuando lleguen más tandas: organizar, convertir a WebP, añadir con `S()`/`shots()`.
- Pendiente de revisión visual de Alessandro en su navegador antes de desplegar.

## 🟢 2026-11-10: TANDA 6 (imágenes 47-61) — carpeta `06-importar-cambios-y-reglas/` — PUBLICADA
Lo que dijo Alessandro: 47 = ejemplo de esquemático listo para correr DRC. Update Schematics a veces no pasa los cambios; lo que funciona: Design → **Import Changes From** (48) → ventana ECO (49) → **Validate Changes** abajo a la izquierda (50) → palomitas verdes en Check (51 componentes, 52 redes) → **Execute Changes** (53) → Done en verde y **Close** (54) → aparecen huellas con conexiones (55; él dijo "lado izquierdo" pero en la captura salen a la DERECHA del contorno: anotado como duda). Reglas JLCPCB: Design → Rules (56) → editor (57) → clic derecho Default Rule Set → **Import Rules** (58) → archivo `2layer-1oz.RUL` de Descargas, Abrir (59) → **Apply** (60) → **OK** (61) → "ahora sí podemos empezar a diseñar".
Cambios en la web: sección 6 gana paso con 47; sección 7 gana 5 pasos (Import → ECO → Validate → Execute → placa); la sección de reglas pasó a ser la **8 (real)** y la forma de la placa la **9 (provisional)**. Pendiente: botón de descarga de las reglas JLCPCB (sin fuente oficial confirmada).
Siguiente material esperado: acomodar componentes, forma de la placa, ruteo… (secciones 9-15 siguen provisionales).

## 🟢 2026-11-10: TANDA 7 (imágenes 62-72) — carpeta `07-origen-y-forma-de-placa/` — PUBLICADA
Alessandro: Edit → Origin → Set (62, cruz verde, normalmente esquina inferior izquierda del fondo negro; queda cruz blanca con círculo). Pidió explicar la barra de herramientas (63) y las capas (67). Dibujo: herramienta línea → Full Circle (64) → centro y dibujar (65) → clic derecho borde → Properties (66) → panel del Arc (68: Location, Net, Layer, Width, Radius, Start/End Angle) → Layer = Mechanical 1 (69) → tecla Q para mm → radio 27.5mm → Location X/Y = radio para que no quede fuera del origen (72) → Design → Board Shape → Define Board Shape from Selected Objects (70) → queda el círculo como placa (71) → acomodar componentes.
Web: sección 9 "Origen y forma de la placa" ahora REAL (salvo el paso del Layer Stack Manager, aún provisional). Dudas anotadas: botones 8-11 de la barra (nombre exacto) por confirmar.
Siguiente: acomodar componentes, ruteo, cobre, DRC PCB, Gerber, JLCPCB (secciones 10-15 provisionales).

## 🟢 2026-11-10: TANDA 8 (imágenes 73-102, sin 75-77, 86, 88-89, 95, 97-98 que no llegaron) — carpeta `08-colocar-y-rutear/`
Alessandro: acomodar (grandes primero, no enredar conexiones); cambiar capa de un componente en Properties (73 Top roja / 74 Bottom azul → queda en espejo, pines invertidos); atajos de colocación, de vista y de ruteo (tablas en la web); vistas 2D (tecla 2, img 78) y 3D (tecla 3, img 79), mover con Shift + clic derecho (80, 81); acomodando (82 inicio, 83 selección múltiple, 84 final; **85 es idéntica a 84**, no se publica). Ruteo manual: Ctrl+W / Route → Interactive Routing (87), cruz (90, 91), ruteo en curso (92), pad destino (93), pista completa (94); capas (96 Bottom azul); vías (99, 100: método * del numpad y Place→Via; mínimos JLCPCB drill 0.3 / pad 0.6 según Alessandro, por verificar); autoruteo: 101 placa lista, 102 Route → Auto Route → All…
Web: sección 10 (colocar) y 11 (rutear) ahora REALES. Falta: diálogo **Situs Routing Strategies** y resultado del autoruteo (lo manda en la siguiente tanda), luego cobre/serigrafía, DRC PCB, Gerber, JLCPCB (12-15 provisionales).
Estado de git: rama feat/altium-imagenes con PR #88 abierto; la fusión a main fue BLOQUEADA por el permiso de despliegue — esperar a que Alessandro diga "súbelo".

## 🟢 2026-11-10: TANDA 9 (imágenes 103-124, sin 121) — carpetas `06-.../` (103,104) y `09-autoruteo-drc-y-texto/` (105-124)
Alessandro: al elegir el .RUL se abre Select Design Rules (103) → Import → "Rule Set Already Exists" → **Replace all** (104) → Apply → OK. Autoruteo: Route → Auto Route → All (105 = duplicado del 102, no publicada), Situs sin errores (106), Route All (107), avance 26/46 (108), terminado 46/46 (109; **110 = idéntica a 109**), 3D (111). DRC PCB: Tools → Design Rule Check (112) → Run (113) → informe (114, 115, 116, 117). Resultado: 0 warnings, 22 rule violations (20 Silk To Solder Mask 0.125<0.127mm + 2 Board Clearance de textos J1/J4) que Alessandro dice son ESTÉTICOS y se puede mandar a producir. Texto: Top Overlay (amarilla), Place → String / P,S (118, 119 sale rojo=Top Layer), propiedades (120; la 120 venía mal ubicada en su texto), textos "designed by Alexa and Alessandro" y "Alux" (122; **123 idéntica a 122**), 3D (124). Falta: cómo añadir logo/imagen (Place → Graphics) — próxima tanda.
Web: sección 8 con 2 pasos nuevos; sección 11 con autoruteo REAL (+3D); sección 12 = DRC PCB REAL (reordenada: el DRC va antes del texto); sección 13 = "Texto y logo" (id `altium-cobre`, se quitó el paso provisional de Polygon Pour porque Alessandro no lo hace; recuperarlo si lo usa). 14 (Gerber) y 15 (JLCPCB) siguen provisionales.
Git: rama feat/altium-imagenes (PR #88 abierto, tandas 7-9 sin fusionar a main: pendiente a que Alessandro diga "súbelo").
