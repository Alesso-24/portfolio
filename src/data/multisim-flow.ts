// Flujo de Multisim: tutorial de simulación de circuitos, armado a partir de las dos clases grabadas
// (Downloads: tutorial_multisim.docx + Multisim_transcripciones_y_estructura_web.md).
// Capturas reales (2026-11-13): descarga, interfaz, colocar/editar componentes, simulación e instrumentos.
// Los circuitos de clase (pasos 1-12) se explican con texto: no hay capturas de ellos y no se inventan.
// El inglés vive aquí mismo (L(es, en)) y se registra en docs-en.ts vía MULTISIM_EN.
import type { Flow, FlowStep, Block } from './flow-types'

const tr: Record<string, string> = {}
/** registra la traducción y devuelve el texto en español (la clave del diccionario) */
const L = (es: string, en: string) => {
  tr[es] = en
  return es
}
export const MULTISIM_EN = tr

const DIR = '09-multisim/'
/** captura real de Multisim (WebP en public/.../09-multisim/); el pie va en ES/EN */
const shot = (file: string, alt: [string, string], cap?: [string, string]): Block => ({
  kind: 'shots',
  shots: [{ file: DIR + file + '.webp', alt: L(...alt), ...(cap ? { caption: L(...cap) } : {}) }],
})
/** captura con recuadros naranjas: caja = [x, y, w, h, [etiquetaES, etiquetaEN], pos?, nudge?] en píxeles de la imagen */
const annotated = (
  file: string,
  size: [number, number],
  alt: [string, string],
  boxes: [number, number, number, number, [string, string], ('top' | 'bottom' | 'left' | 'right')?, number?][],
  cap?: [string, string]
): Block => ({
  kind: 'shots',
  shots: [
    {
      file: DIR + file + '.webp',
      alt: L(...alt),
      size,
      wide: true,
      boxes: boxes.map(([x, y, w, h, lab, pos, nudge]) => ({ x, y, w, h, label: L(...lab), pos, nudge })),
      ...(cap ? { caption: L(...cap) } : {}),
    },
  ],
})
const note = (es: string, en: string): Block => ({ kind: 'note', html: L(es, en) })
const callout = (title: [string, string], es: string, en: string): Block => ({ kind: 'callout', title: L(...title), html: L(es, en) })
const table = (head: [string, string][], rows: [string, string][][]): Block => ({
  kind: 'table',
  head: head.map(([a, b]) => L(a, b)),
  rows: rows.map((r) => r.map(([a, b]) => L(a, b))),
})
const step = (es: string, en: string, blocks: Block[] = []): FlowStep => ({ html: L(es, en), blocks })

export const MULTISIM_FLOW: Flow = {
  id: 'multisim',
  sections: [
    // ———————————————————————————————— descarga e instalación
    {
      id: 'multisim-instalacion',
      chip: L('Descargar', 'Download'),
      title: L('Descargar e instalar Multisim', 'Download and install Multisim'),
      steps: [
        step(
          'Entramos a la <strong>página de descargas de NI</strong>: <a href="https://www.ni.com/es/support/downloads/software-products/download/packaged.multisim.452133.html" target="_blank" rel="noopener">ni.com → Multisim</a>. Elegimos <strong>Multisim 14.3 Educación</strong> (Windows) y damos clic en <strong>Descargar</strong>.',
          'We open the <strong>NI downloads page</strong>: <a href="https://www.ni.com/es/support/downloads/software-products/download/packaged.multisim.452133.html" target="_blank" rel="noopener">ni.com → Multisim</a>. We choose <strong>Multisim 14.3 Education</strong> (Windows) and click <strong>Download</strong>.',
          [shot('01-descarga-pagina-ni', ['Página de NI con Multisim 14.3 Educación y el botón Descargar', 'NI page with Multisim 14.3 Education and the Download button'])]
        ),
        step(
          'Se abre otra pestaña con <strong>"Descargando Multisim 14.3 Educación"</strong>. La descarga empieza sola; si no, se usa el enlace <strong>"reinicie la descarga"</strong>.',
          'Another tab opens with <strong>"Downloading Multisim 14.3 Education"</strong>. The download starts by itself; if it does not, use the <strong>"restart the download"</strong> link.',
          [shot('02-descargando', ['Pestaña de NI: Descargando Multisim 14.3 Educación', 'NI tab: Downloading Multisim 14.3 Education'])]
        ),
        step(
          'Descarga un <strong>.exe</strong> (<code>ni-cds-educational_14.3_online.exe</code>). Lo ejecutamos: abre el instalador de NI, que es quien instala el programa.',
          'It downloads an <strong>.exe</strong> (<code>ni-cds-educational_14.3_online.exe</code>). We run it: it opens the NI installer, which is what installs the program.',
          [
            shot('03-instalador-exe', ['Archivo instalador ni-cds-educational_14.3_online.exe', 'Installer file ni-cds-educational_14.3_online.exe']),
            shot('04-instalador-ventana', ['Ventana "Installing Circuit Design Suite Education"', '"Installing Circuit Design Suite Education" window'], ['Esta ventana salió con el mensaje "No operation to be performed" porque Multisim ya estaba instalado.', 'This window showed "No operation to be performed" because Multisim was already installed.']),
            note('Las ventanas siguientes no se pudieron capturar: al intentarlo, el instalador pidió aceptar las licencias e iniciar sesión otra vez. Solo hay que <strong>aceptar las licencias</strong> y <strong>volver a iniciar sesión</strong> con la cuenta de NI.', 'The next windows could not be captured: when trying, the installer asked to accept the licences and sign in again. You only have to <strong>accept the licences</strong> and <strong>sign in again</strong> with your NI account.')
          ]
        )
      ],
    },

    // ———————————————————————————————— intro
    {
      id: 'multisim-intro',
      chip: L('Qué es', 'What it is'),
      title: L('Qué es Multisim y cómo se ve', 'What Multisim is and how it looks'),
      steps: [
        step(
          '<strong>Multisim</strong> es un programa para construir circuitos y simular su funcionamiento. Podemos modificar componentes, probar valores y observar el comportamiento del circuito con instrumentos. La simulación nos ayuda a <strong>detectar errores</strong> y a revisar los cambios antes de pasar al diseño físico.',
          '<strong>Multisim</strong> is a program for building circuits and simulating how they behave. We can change components, try values and watch the circuit through instruments. Simulation helps us <strong>catch mistakes</strong> and review changes before moving on to the physical design.',
          [note('Aquí Multisim solo simula: el diseño de la placa (PCB) y su fabricación se hacen después, en KiCad y la MonoFab.', 'Here Multisim only simulates: the board (PCB) design and its fabrication come afterwards, in KiCad and the MonoFab.')]
        ),
        step(
          'Estas son las <strong>zonas de la ventana principal</strong>. Conviene reconocerlas antes de colocar nada.',
          'These are the <strong>areas of the main window</strong>. It is worth recognising them before placing anything.',
          [
            annotated(
              '22-barra-instrumentos',
              [1396, 741],
              ['Ventana principal de Multisim con cada zona señalada', 'Multisim main window with each area marked'],
              [
                [0, 27, 452, 19, ['1 · Menú principal', '1 · Main menu'], 'right'],
                [0, 47, 1090, 45, ['2 · Barras de herramientas', '2 · Toolbars'], 'right', 14],
                [3, 95, 134, 488, ['3 · Design Toolbox', '3 · Design Toolbox'], 'right'],
                [148, 95, 865, 471, ['4 · Hoja de trabajo', '4 · Workspace sheet'], 'right', -70],
                [1338, 90, 56, 456, ['5 · Instrumentos (recuadro rojo)', '5 · Instruments (red box)'], 'left', 70],
                [3, 594, 1377, 128, ['6 · Mensajes y hojas de resultados', '6 · Messages and result sheets'], 'top'],
              ],
              ['Ventana principal de Multisim', 'Multisim main window']
            ),
            callout(
              ['Qué hay en cada zona (números de la captura)', 'What is in each area (numbers on the screenshot)'],
              '<ul><li><strong>1 · Menú principal:</strong> File, Edit, View, Place, Simulate, Transfer, Tools, Reports, Options, Window y Help. <strong>Place</strong> sirve para colocar componentes, cables, etiquetas y texto; <strong>Simulate</strong> tiene las simulaciones y los análisis; <strong>Options</strong> permite cambiar preferencias, incluidos los atajos de teclado.</li><li><strong>2 · Barras de herramientas</strong> (de izquierda a derecha, en la fila de abajo): los <strong>grupos de componentes</strong> (un ícono por grupo, en el mismo orden que la lista Group); los <strong>controles de simulación</strong> (el triángulo verde inicia, luego pausa y detener; <em>Interactive</em> abre la configuración); y las <strong>mediciones puntuales</strong> (voltaje, corriente y potencia, en verde). En la fila de arriba están archivo y edición, las vistas, la lista de componentes en uso y el zoom. Mientras la simulación corre, varias herramientas de edición quedan en gris: hay que detenerla para modificar.</li><li><strong>3 · Design Toolbox:</strong> árbol de los diseños abiertos del proyecto.</li><li><strong>4 · Hoja de trabajo:</strong> aquí se coloca y se conecta todo. El zoom va con la rueda del ratón.</li><li><strong>5 · Instrumentos (barra derecha):</strong> multímetro, generador de funciones, osciloscopios, Logic Converter… Se colocan en la hoja y se abren con doble clic.</li><li><strong>6 · Mensajes:</strong> abajo aparecen los errores y si la simulación convergió o no; las pestañas Results, Nets, Components, Copper layers y Simulation muestran los resultados.</li></ul>',
              '<ul><li><strong>1 · Main menu:</strong> File, Edit, View, Place, Simulate, Transfer, Tools, Reports, Options, Window and Help. <strong>Place</strong> is for placing components, wires, labels and text; <strong>Simulate</strong> holds the simulations and analyses; <strong>Options</strong> lets you change preferences, including keyboard shortcuts.</li><li><strong>2 · Toolbars</strong> (left to right, on the lower row): the <strong>component groups</strong> (one icon per group, in the same order as the Group list); the <strong>simulation controls</strong> (the green triangle starts, then pause and stop; <em>Interactive</em> opens the settings); and the <strong>point probes</strong> (voltage, current and power, in green). The upper row has file and edit, the views, the in-use component list and zoom. While the simulation runs, several editing tools are greyed out: stop it to make changes.</li><li><strong>3 · Design Toolbox:</strong> tree of the project\'s open designs.</li><li><strong>4 · Workspace sheet:</strong> everything is placed and wired here. Zoom with the mouse wheel.</li><li><strong>5 · Instruments (right bar):</strong> multimeter, function generator, oscilloscopes, Logic Converter… They are placed on the sheet and opened by double-clicking.</li><li><strong>6 · Messages:</strong> errors and whether the simulation converged appear at the bottom; the Results, Nets, Components, Copper layers and Simulation tabs show the results.</li></ul>'
            )
          ]
        )
      ],
    },

    // ———————————————————————————————— menú de componentes
    {
      id: 'multisim-menu-componentes',
      chip: L('Componentes', 'Components'),
      title: L('El menú de componentes', 'The components menu'),
      steps: [
        step(
          'Al dar clic en el <strong>ícono de componentes</strong> (recuadrado en rojo) se abre la ventana emergente <strong>Select a Component</strong>. Se puede abrir y cerrar cuando se necesite.',
          'Clicking the <strong>components icon</strong> (boxed in red) opens the <strong>Select a Component</strong> pop-up window. It can be opened and closed whenever needed.',
          [shot('06-selector-componentes', ['Ventana Select a Component con el ícono de fuentes recuadrado', 'Select a Component window with the sources icon boxed'])]
        ),
        step(
          'En <strong>Group</strong> aparecen todos los grupos (Sources, Basic, Diodes, Transistors, Analog, TTL, CMOS…). Basta con dar clic en el grupo para <strong>ver los demás</strong> y cambiar de uno a otro sin cerrar la ventana.',
          'Under <strong>Group</strong> all the groups are listed (Sources, Basic, Diodes, Transistors, Analog, TTL, CMOS…). Just click the group to <strong>see the others</strong> and switch between them without closing the window.',
          [shot('07-selector-grupos', ['Menú desplegable de grupos de componentes', 'Drop-down menu of component groups'])]
        ),
        step(
          'Si ya sabemos qué componente queremos, el cuadro <strong>Component</strong> sirve para <strong>buscarlo por nombre</strong>: al escribir, la lista salta a lo que coincide.',
          'If we already know which component we want, the <strong>Component</strong> box lets us <strong>search it by name</strong>: as we type, the list jumps to the matches.',
          [shot('08-selector-buscar', ['Cuadro de búsqueda Component dentro del grupo Diodes', 'Component search box inside the Diodes group'])]
        )
      ],
    },

    // ———————————————————————————————— colocar y editar
    {
      id: 'multisim-colocar-editar',
      chip: L('Colocar', 'Place'),
      title: L('Colocar y editar un componente', 'Place and edit a component'),
      steps: [
        step(
          'Elegimos el componente y presionamos <strong>OK</strong>. Aparece un menú con las secciones <strong>A, B, C, D</strong>: es para componentes que traen varios elementos en un solo encapsulado (como una red de resistencias). Para uno solo, se deja la sección A.',
          'We pick the component and press <strong>OK</strong>. A menu with sections <strong>A, B, C, D</strong> appears: it is for components that hold several elements in one package (like a resistor network). For a single one, we keep section A.',
          [shot('09-popup-secciones', ['Menú New con las secciones A, B, C y D y el botón Cancel', 'New menu with sections A, B, C and D and the Cancel button'])]
        ),
        step(
          'El componente <strong>aparece en el cursor</strong> y lo movemos hasta donde queramos; con un clic se coloca.',
          'The component <strong>appears on the cursor</strong> and we move it wherever we want; one click places it.',
          [shot('10-resistencia-colocada', ['Símbolo de una resistencia sobre la hoja de trabajo', 'Resistor symbol on the workspace sheet'])]
        ),
        step(
          'Después del clic sale <strong>otro menú</strong>, ahora con las secciones restantes de ese mismo componente (<strong>R1</strong>). Sirve para agregar más resistencias de la red; si no hacen falta, damos clic en <strong>Cancel</strong>.',
          'After the click <strong>another menu</strong> comes up, now with the remaining sections of that same component (<strong>R1</strong>). It is for adding more resistors from the network; if they are not needed, we click <strong>Cancel</strong>.',
          [shot('11-resistencia-popup', ['Resistencia R1A con su valor y el menú de secciones restantes', 'Resistor R1A with its value and the remaining-sections menu'])]
        ),
        step(
          'Al cancelar, <strong>vuelve a abrirse la ventana de selección</strong> para poner otro componente. Para salir de ella se usa <strong>Close</strong> o la tecla <kbd>Esc</kbd>.',
          'On cancelling, <strong>the selection window opens again</strong> so we can place another component. To leave it we use <strong>Close</strong> or the <kbd>Esc</kbd> key.',
          [
            shot('12-selector-resistencia-1k', ['Ventana de selección con una resistencia de 1 kΩ en el grupo Basic', 'Selection window with a 1 kΩ resistor in the Basic group']),
            note('La lista muestra piezas de fabricantes reales (aquí una red SIP de Bourns). Si solo se necesita una resistencia común, en la familia <strong>RESISTOR</strong> están las genéricas.', 'The list shows real manufacturer parts (here a Bourns SIP network). If you just need an ordinary resistor, the generic ones are in the <strong>RESISTOR</strong> family.')
          ]
        ),
        step(
          'Para <strong>modificar la información del componente</strong> damos <strong>doble clic</strong> sobre él. Se abre una ventana con pestañas: en <strong>Value</strong> están el valor, el encapsulado, el fabricante y la función.',
          'To <strong>edit a component\'s information</strong> we <strong>double-click</strong> it. A window with tabs opens: <strong>Value</strong> holds the value, package, manufacturer and function.',
          [shot('13-propiedades-valor', ['Ventana de propiedades, pestaña Value', 'Properties window, Value tab'])]
        ),
        step(
          'En la pestaña <strong>Label</strong> se cambia el <strong>RefDes</strong> (el nombre en el esquema, como R1) y se puede escribir una <strong>etiqueta</strong> propia.',
          'In the <strong>Label</strong> tab we change the <strong>RefDes</strong> (the name on the schematic, like R1) and can type our own <strong>label</strong>.',
          [shot('14-propiedades-etiqueta', ['Ventana de propiedades, pestaña Label', 'Properties window, Label tab'])]
        ),
        step(
          'Al aceptar, el nombre cambia en el esquema: la resistencia <strong>R1A</strong> pasa a llamarse <strong>R2A</strong>.',
          'On accepting, the name changes on the schematic: resistor <strong>R1A</strong> is now called <strong>R2A</strong>.',
          [shot('15-renombrar-r1-r2', ['Resistencia R1A y la misma resistencia renombrada como R2A', 'Resistor R1A and the same resistor renamed R2A'])]
        )
      ],
    },

    // ———————————————————————————————— simulación
    {
      id: 'multisim-simulacion',
      chip: L('Simular', 'Simulate'),
      title: L('Hacer funcionar la simulación', 'Run the simulation'),
      steps: [
        step(
          'Ejemplo de un circuito listo para simular: un transistor con una fuente de corriente en la base, una batería de 12 V y la <strong>tierra (0)</strong>. Los números en rojo son los <strong>nodos</strong> del circuito.',
          'Example of a circuit ready to simulate: a transistor with a current source on the base, a 12 V battery and the <strong>ground (0)</strong>. The red numbers are the circuit\'s <strong>nodes</strong>.',
          [shot('16-ejemplo-bjt', ['Circuito de ejemplo con un transistor, fuente de corriente, batería de 12 V y tierra', 'Example circuit with a transistor, current source, 12 V battery and ground'], ['Ejemplo práctico de un circuito simulado', 'Practical example of a simulated circuit'])]
        ),
        step(
          'Para que funcione la simulación damos clic en el <strong>triángulo verde</strong> (Run) o presionamos <kbd>F5</kbd>.',
          'To run the simulation we click the <strong>green triangle</strong> (Run) or press <kbd>F5</kbd>.',
          [shot('17-boton-run', ['Botón Run (F5) recuadrado en rojo', 'Run (F5) button boxed in red'])]
        ),
        step(
          'Para <strong>configurar las condiciones</strong> de la simulación damos clic en <strong>Interactive</strong>, junto a los botones de control.',
          'To <strong>set the simulation conditions</strong> we click <strong>Interactive</strong>, next to the control buttons.',
          [shot('18-boton-interactive', ['Botón Interactive recuadrado en rojo', 'Interactive button boxed in red'])]
        ),
        step(
          'Se abre la ventana <strong>Analyses and Simulation</strong>. A la izquierda está la lista de análisis; en <strong>Interactive Simulation</strong> se ajustan las condiciones iniciales y el tiempo final (<code>TSTOP</code>).',
          'The <strong>Analyses and Simulation</strong> window opens. On the left is the list of analyses; in <strong>Interactive Simulation</strong> we set the initial conditions and the end time (<code>TSTOP</code>).',
          [shot('19-analisis-interactivo', ['Ventana Analyses and Simulation con Interactive Simulation', 'Analyses and Simulation window with Interactive Simulation'])]
        ),
        step(
          'En otros análisis, como <strong>DC Operating Point</strong>, la pestaña <strong>Output</strong> sirve para <strong>configurar y agregar las variables</strong> que queremos ver: con <strong>Add</strong> pasamos las del circuito a las seleccionadas.',
          'In other analyses, like <strong>DC Operating Point</strong>, the <strong>Output</strong> tab is used to <strong>set and add the variables</strong> we want to see: with <strong>Add</strong> we move the circuit\'s variables to the selected ones.',
          [shot('20-analisis-punto-operacion-dc', ['Análisis DC Operating Point, pestaña Output, con variables del circuito y seleccionadas', 'DC Operating Point analysis, Output tab, with circuit and selected variables'])]
        ),
        step(
          'Al terminar de configurar los parámetros damos clic en <strong>Save</strong> (guarda la configuración) y en <strong>Run</strong> (guarda y simula).',
          'When the parameters are set we click <strong>Save</strong> (stores the settings) and <strong>Run</strong> (stores and simulates).',
          [shot('21-run-save', ['Botones Run y Save recuadrados en rojo', 'Run and Save buttons boxed in red'])]
        )
      ],
    },

    // ———————————————————————————————— instrumentos
    {
      id: 'multisim-instrumentos',
      chip: L('Instrumentos', 'Instruments'),
      title: L('Instrumentos de medición y generadores', 'Measurement instruments and generators'),
      steps: [
        step(
          'Los <strong>osciladores, generadores de señal y demás instrumentos</strong> están en la barra vertical de la derecha (recuadrada en rojo). Al pasar el cursor por cada ícono aparece su nombre.',
          'The <strong>oscillators, signal generators and other instruments</strong> are in the vertical bar on the right (boxed in red). Hovering over each icon shows its name.',
          [shot('22-barra-instrumentos', ['Ventana principal con la barra de instrumentos de la derecha recuadrada', 'Main window with the instruments bar on the right boxed'])]
        ),
        step(
          'El que usamos principalmente es el <strong>generador de funciones</strong> (<em>Function generator</em>).',
          'The one we use most is the <strong>function generator</strong>.',
          [shot('23-generador-funciones', ['Información emergente "Function generator"', '"Function generator" tooltip'])]
        ),
        step(
          'Así se ve un instrumento ya agregado a la hoja: este es el <strong>contador de frecuencia</strong> (<em>Frequency counter</em>, XFC1), con su pantalla y su terminal de entrada.',
          'This is how an instrument looks once added to the sheet: this one is the <strong>frequency counter</strong> (XFC1), with its display and input terminal.',
          [
            shot('24-contador-frecuencia', ['Contador de frecuencia XFC1 colocado en la hoja', 'Frequency counter XFC1 placed on the sheet'])
          ]
        ),
        step(
          'El <strong>multímetro</strong> es el primer ícono de la barra (recuadrado). Al colocarlo aparece como <strong>XMM1</strong>, con sus terminales <strong>+</strong> y <strong>−</strong>.',
          'The <strong>multimeter</strong> is the first icon in the bar (boxed). Once placed it shows as <strong>XMM1</strong>, with its <strong>+</strong> and <strong>−</strong> terminals.',
          [shot('25-multimetro', ['Multímetro XMM1 colocado y su ícono recuadrado en la barra', 'Multimeter XMM1 placed and its icon boxed in the bar'])]
        ),
        step(
          'Ejemplo de uso: un <strong>generador de señales</strong> (XFG1) alimenta un diodo con una resistencia, y el <strong>osciloscopio Tektronix</strong> (XSC1) muestra la señal de entrada y la de salida recortada.',
          'Usage example: a <strong>signal generator</strong> (XFG1) feeds a diode with a resistor, and the <strong>Tektronix oscilloscope</strong> (XSC1) shows the input signal and the clipped output.',
          [shot('26-tektronix-circuito', ['Circuito con generador, diodo y resistencia, y la pantalla del osciloscopio Tektronix', 'Circuit with generator, diode and resistor, and the Tektronix oscilloscope screen'], ['Ejemplo de instrumentos con un generador de señales', 'Instruments example with a signal generator'])]
        ),
        step(
          'Para abrir la ventana del osciloscopio damos <strong>doble clic</strong> donde dice <strong>Tektronix</strong> en el símbolo. Ojo: <strong>si la simulación no está activa, la pantalla no muestra nada</strong>; hay que correrla primero.',
          'To open the oscilloscope window we <strong>double-click</strong> where it says <strong>Tektronix</strong> on the symbol. Note: <strong>if the simulation is not running, the screen shows nothing</strong>; run it first.',
          [shot('27-tektronix-ventana', ['Ventana del osciloscopio Tektronix TDS 2024 con la pantalla en negro', 'Tektronix TDS 2024 oscilloscope window with a black screen'])]
        )
      ],
    },

    // ———————————————————————————————— paso 1
    {
      id: 'multisim-paso1',
      chip: L('1 · Componentes', '1 · Components'),
      title: L('Colocar y editar componentes', 'Place and edit components'),
      steps: [
        step(
          'Vamos a colocar una <strong>fuente DC</strong>: abrimos la herramienta de fuentes, entramos a <strong>Power Sources</strong>, elegimos <strong>DC Power</strong>, presionamos OK y la colocamos en el área de trabajo. En el símbolo de batería, el <strong>positivo</strong> es la línea más larga y el <strong>negativo</strong> la más corta. Al colocarla, la ventana se vuelve a abrir para elegir otro componente.',
          'We will place a <strong>DC source</strong>: open the sources tool, go into <strong>Power Sources</strong>, pick <strong>DC Power</strong>, press OK and drop it in the workspace. In the battery symbol, the <strong>positive</strong> terminal is the longer line and the <strong>negative</strong> the shorter one. Once placed, the window reopens so we can pick another component.',
          []
        ),
        step(
          'Colocamos la <strong>tierra</strong>: seleccionamos <strong>Ground</strong>, OK, y la ponemos debajo de la fuente. Salimos con <kbd>Esc</kbd> o cerrando la ventana. Multisim necesita este <strong>punto de referencia</strong> para simular: sin GND, no corre.',
          'We place the <strong>ground</strong>: select <strong>Ground</strong>, OK, and put it under the source. We leave with <kbd>Esc</kbd> or by closing the window. Multisim needs this <strong>reference point</strong> to simulate: without GND, it will not run.',
          []
        ),
        step(
          'Colocamos la <strong>resistencia</strong>: en componentes básicos entramos a la familia de resistencias y elegimos un valor. Para cambiarlo después, hacemos <strong>doble clic</strong> sobre su valor y escribimos el nuevo (por ejemplo, 1 k).',
          'We place the <strong>resistor</strong>: in basic components we go into the resistor family and choose a value. To change it later, <strong>double-click</strong> its value and type the new one (for example, 1 k).',
          []
        ),
        step(
          'Colocamos el <strong>LED</strong>: en el grupo de diodos elegimos un <strong>LED individual</strong> (no las tiras de LEDs) y su color.',
          'We place the <strong>LED</strong>: in the diodes group we pick a <strong>single LED</strong> (not the LED strips) and its colour.',
          []
        ),
        step(
          'Colocamos el <strong>interruptor</strong>: sin cerrar la ventana, cambiamos de grupo a <strong>Basic</strong> y luego a <strong>Switch</strong>. Elegimos el de un solo elemento (el <strong>DIP de uno</strong>). Con él podemos abrir y cerrar el circuito con la tecla <kbd>A</kbd>, en vez de hacer clic cada vez.',
          'We place the <strong>switch</strong>: without closing the window, we change group to <strong>Basic</strong> and then <strong>Switch</strong>. We pick the single-element one (the <strong>one-position DIP</strong>). With it we can open and close the circuit with the <kbd>A</kbd> key instead of clicking each time.',
          []
        ),
        step(
          '<strong>Ordenar y editar.</strong> Primero colocamos <strong>todos</strong> los componentes donde queremos que queden y <strong>después</strong> los conectamos. Con la rueda del ratón hacemos zoom; con clic derecho sobre un componente podemos rotarlo o voltearlo. Con el componente seleccionado, <kbd>Ctrl</kbd>+<kbd>R</kbd> lo gira 90° a la derecha y <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd> a la izquierda; <kbd>Ctrl</kbd>+<kbd>Z</kbd> deshace el último cambio.',
          '<strong>Arrange and edit.</strong> First we place <strong>all</strong> the components where we want them and <strong>then</strong> we wire them. The mouse wheel zooms; right-clicking a component lets us rotate or flip it. With the component selected, <kbd>Ctrl</kbd>+<kbd>R</kbd> turns it 90° clockwise and <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd> counter-clockwise; <kbd>Ctrl</kbd>+<kbd>Z</kbd> undoes the last change.',
          [
          ]
        )
      ],
    },

    // ———————————————————————————————— paso 2
    {
      id: 'multisim-paso2',
      chip: L('2 · Conectar', '2 · Wire it'),
      title: L('Conectar y simular el circuito con LED', 'Wire and simulate the LED circuit'),
      steps: [
        step(
          '<strong>Conectar.</strong> Acercamos el ratón a una terminal: el cursor cambia. Hacemos clic para empezar el cable y lo llevamos a la terminal de otro componente; se puede soltar cuando el punto se pone en <strong>rojo</strong>, señal de que reconoció la conexión. Un cable que solo "parece" tocar el componente <strong>no está conectado</strong>.',
          '<strong>Wiring.</strong> Move the mouse close to a terminal: the cursor changes. Click to start the wire and take it to another component\'s terminal; you can release when the dot turns <strong>red</strong>, which means the connection was recognised. A wire that only "looks" like it touches the component is <strong>not connected</strong>.',
          []
        ),
        step(
          'Un cable solo une <strong>de un componente a otro</strong>. Si sacamos una segunda línea desde el mismo punto, el trazado anterior cambia. Para evitarlo, empezamos desde la <strong>terminal de tierra</strong> y la llevamos a <strong>cualquier punto de una línea que ya exista</strong>.',
          'A wire only joins <strong>one component to another</strong>. If we pull a second line from the same point, the previous routing changes. To avoid it, we start from the <strong>ground terminal</strong> and take it to <strong>any point on an existing line</strong>.',
          [ ]
        ),
        step(
          '<strong>Simular.</strong> Presionamos el triángulo verde. Al principio el LED <strong>no enciende</strong>: detenemos la simulación, cambiamos la resistencia (probamos con <strong>1 kΩ</strong>) y volvemos a simular. Ahora sí enciende. Con la tecla <kbd>A</kbd> abrimos y cerramos el interruptor y el LED se apaga y se enciende.',
          '<strong>Simulate.</strong> We press the green triangle. At first the LED <strong>does not light</strong>: we stop the simulation, change the resistor (we try <strong>1 kΩ</strong>) and simulate again. Now it lights. With the <kbd>A</kbd> key we open and close the switch, and the LED goes off and on.',
          []
        ),
        step(
          '<strong>Proteger el LED.</strong> Para elegir la resistencia se consulta la <strong>hoja de datos</strong> del LED: ahí está el voltaje y la corriente que soporta. El ejemplo de la clase: con una fuente de 10 V y un LED de aproximadamente 2 V, la resistencia debe absorber los 8 V restantes; se calcula con la corriente deseada y se escoge un valor comercial cercano. Una resistencia de unos 200 Ω protege al LED en el circuito de 5 V.',
          '<strong>Protecting the LED.</strong> To choose the resistor we check the LED\'s <strong>datasheet</strong>: it gives the voltage and current it can take. The class example: with a 10 V source and an LED of about 2 V, the resistor has to take the remaining 8 V; it is sized from the target current and a nearby standard value is picked. A resistor of around 200 Ω protects the LED in the 5 V circuit.',
          [ ]
        )
      ],
    },

    // ———————————————————————————————— paso 3
    {
      id: 'multisim-paso3',
      chip: L('3 · Mediciones', '3 · Measuring'),
      title: L('Mediciones eléctricas', 'Electrical measurements'),
      steps: [
        step(
          '<strong>Corriente y voltaje puntuales.</strong> Mientras simulamos, todo se pone en gris excepto las <strong>mediciones puntuales</strong>. Colocamos la de corriente (A) donde queramos y movemos su cuadro si estorba: con el interruptor abierto lee alrededor de <strong>−34 pA</strong> y con el interruptor cerrado, alrededor de <strong>8.62 mA</strong>. La de voltaje mide un punto <strong>respecto a la referencia (GND)</strong>: en la clase dio ~6.2 pV en un punto y 12 V en otro.',
          '<strong>Point current and voltage.</strong> While simulating, everything turns grey except the <strong>point probes</strong>. We place the current probe (A) wherever we want and move its box if it is in the way: with the switch open it reads about <strong>−34 pA</strong> and with the switch closed, about <strong>8.62 mA</strong>. The voltage probe measures a point <strong>relative to the reference (GND)</strong>: in class it gave ~6.2 pV at one point and 12 V at another.',
          [ ]
        ),
        step(
          '<strong>Potencia.</strong> Seleccionamos la medición <strong>W</strong> y la colocamos <strong>sobre el componente</strong>: hasta que no está sobre él, no da ninguna medida. Así vemos cuánta potencia consume cada elemento.',
          '<strong>Power.</strong> We select the <strong>W</strong> probe and place it <strong>on the component</strong>: until it sits on it, it gives no reading. That way we see how much power each element uses.',
          []
        ),
        step(
          '<strong>Multímetro.</strong> Detenemos la simulación, colocamos el multímetro desde la barra de instrumentos y hacemos doble clic para abrirlo. Elegimos <strong>voltaje</strong> y señal <strong>DC</strong> (el circuito es constante) y conectamos sus dos puntas a ambos lados del LED, con la punta roja en el lado positivo. Simulamos: en la clase leyó <strong>3.4</strong>.',
          '<strong>Multimeter.</strong> We stop the simulation, place the multimeter from the instruments bar and double-click it to open it. We choose <strong>voltage</strong> and a <strong>DC</strong> signal (the circuit is constant) and connect its two probes across the LED, with the red probe on the positive side. We simulate: in class it read <strong>3.4</strong>.',
          [
            shot('25-multimetro', ['Multímetro XMM1 con sus terminales + y −', 'Multimeter XMM1 with its + and − terminals']),
            callout(
              ['¿Medición puntual o multímetro?', 'Point probe or multimeter?'],
              'La medición puntual da el voltaje de <strong>un punto respecto a la referencia</strong>; el multímetro mide la <strong>diferencia de potencial entre dos puntos</strong>. No hay regla universal: se elige según lo que se quiera medir y el tamaño del circuito.',
              'The point probe gives the voltage of <strong>one point relative to the reference</strong>; the multimeter measures the <strong>potential difference between two points</strong>. There is no universal rule: it depends on what you want to measure and the size of the circuit.'
            )
          ]
        )
      ],
    },

    // ———————————————————————————————— paso 4
    {
      id: 'multisim-paso4',
      chip: L('4 · Fuente AC', '4 · AC source'),
      title: L('Fuente alterna y offset', 'AC source and offset'),
      steps: [
        step(
          'Guardamos el circuito anterior y abrimos una <strong>pestaña nueva</strong>. Colocamos una <strong>fuente AC</strong> y <strong>GND</strong>, conectamos la referencia y hacemos <strong>doble clic</strong> sobre la fuente para revisar y modificar sus parámetros. En la demostración: <strong>120</strong> en voltaje, <strong>60</strong> de frecuencia y un <strong>offset de 60</strong>.',
          'We save the previous circuit and open a <strong>new tab</strong>. We place an <strong>AC source</strong> and <strong>GND</strong>, connect the reference and <strong>double-click</strong> the source to review and edit its parameters. In the demo: <strong>120</strong> for voltage, <strong>60</strong> for frequency and an <strong>offset of 60</strong>.',
          [ callout(['¿120 es valor pico o eficaz?', 'Is 120 peak or RMS?'], 'Depende de la fuente. La <strong>AC_POWER</strong> (fuente de potencia) viene en valor <strong>eficaz (RMS)</strong>, por defecto 120 V a 60 Hz; la <strong>AC_VOLTAGE</strong> (fuente de señal) viene en valor <strong>pico</strong>. La ventana de propiedades lo dice en el nombre del campo (<em>Voltage (RMS)</em> o <em>Voltage (Pk)</em>). Para pasar de eficaz a pico se multiplica por √2: 120 V eficaces son unos <strong>170 V de pico</strong>. Con 120 V de pico y un offset de 60 V, la señal oscila entre <strong>−60 V y +180 V</strong>.', 'It depends on the source. <strong>AC_POWER</strong> (power source) is rated in <strong>RMS</strong>, 120 V at 60 Hz by default; <strong>AC_VOLTAGE</strong> (signal source) is rated in <strong>peak</strong>. The properties window says so in the field name (<em>Voltage (RMS)</em> or <em>Voltage (Pk)</em>). To go from RMS to peak, multiply by √2: 120 V RMS is about <strong>170 V peak</strong>. With 120 V peak and a 60 V offset, the signal swings between <strong>−60 V and +180 V</strong>.')]
        ),
        step(
          '<strong>El offset</strong> suma una señal DC a la señal que ya tenemos, así que la <strong>desplaza hacia arriba o hacia abajo</strong>. Se puede experimentar con otros valores (10, 50…). Para explicarlo, en clase se usó una señal cuadrada y el ejemplo de un sensor de una prensa industrial.',
          '<strong>Offset</strong> adds a DC signal to the signal we already have, so it <strong>shifts it up or down</strong>. You can experiment with other values (10, 50…). To explain it, the class used a square wave and the example of an industrial press sensor.',
          []
        )
      ],
    },

    // ———————————————————————————————— paso 5
    {
      id: 'multisim-paso5',
      chip: L('5 · Osciloscopios', '5 · Oscilloscopes'),
      title: L('Uso de osciloscopios', 'Using oscilloscopes'),
      steps: [
        step(
          '<strong>Osciloscopio de dos canales.</strong> Lo buscamos en la barra derecha y lo colocamos. Conectamos el <strong>canal A</strong> a la salida de la fuente y su terminal negativa a tierra. Ejecutamos y hacemos doble clic para abrir su pantalla.',
          '<strong>Two-channel oscilloscope.</strong> We find it in the right bar and place it. We connect <strong>channel A</strong> to the source output and its negative terminal to ground. We run the simulation and double-click to open its screen.',
          []
        ),
        step(
          '<strong>Escalas.</strong> En el canal A buscamos la escala por división, hacemos clic en el campo y usamos las flechas hasta que la señal <strong>quepa en la pantalla</strong>. Con <strong>Single</strong> (abajo) la señal queda fija. Después movemos la <strong>escala de tiempo</strong> para ver más o menos periodos. Son dos ajustes: voltaje en el eje vertical y tiempo en el horizontal. También se ve el desplazamiento producido por el offset.',
          '<strong>Scales.</strong> On channel A we find the scale per division, click the field and use the arrows until the signal <strong>fits on screen</strong>. With <strong>Single</strong> (bottom) the signal stays frozen. Then we change the <strong>time scale</strong> to see more or fewer periods. There are two settings: voltage on the vertical axis and time on the horizontal one. The shift caused by the offset is visible too.',
          []
        ),
        step(
          '<strong>Osciloscopio de cuatro canales.</strong> Cerramos el panel del primero <strong>sin eliminarlo</strong>, detenemos la simulación, colocamos el de cuatro canales y conectamos el canal A a la misma señal; usa la referencia de tierra del circuito. En el panel, el selector <strong>A / B / C / D</strong> indica qué canal estamos ajustando. Para comparar usamos <strong>2 ms/div</strong> y <strong>200 V/div</strong>. El de dos canales sirve para una o dos señales; el de cuatro, cuando hay más.',
          '<strong>Four-channel oscilloscope.</strong> We close the first one\'s panel <strong>without deleting it</strong>, stop the simulation, place the four-channel one and connect channel A to the same signal; it uses the circuit\'s ground reference. In the panel, the <strong>A / B / C / D</strong> selector shows which channel we are adjusting. To compare we use <strong>2 ms/div</strong> and <strong>200 V/div</strong>. The two-channel one is for one or two signals; the four-channel one for more.',
          [ ]
        ),
        step(
          '<strong>Osciloscopio Tektronix.</strong> Lo colocamos, conectamos el <strong>canal 1</strong> a la señal, ejecutamos, abrimos su panel y lo <strong>encendemos</strong>. Probamos voltaje por división, tiempo y posición horizontal, y el botón <strong>Autoset</strong>. En el menú de <strong>mediciones</strong> elegimos el canal y la medición (en clase se mencionó la frecuencia).',
          '<strong>Tektronix oscilloscope.</strong> We place it, connect <strong>channel 1</strong> to the signal, run the simulation, open its panel and <strong>switch it on</strong>. We try volts per division, time and horizontal position, and the <strong>Autoset</strong> button. In the <strong>measurements</strong> menu we choose the channel and the measurement (frequency was mentioned in class).',
          [shot('27-tektronix-ventana', ['Panel del Tektronix TDS 2024: botón de encendido, Autoset, menús y perillas', 'Tektronix TDS 2024 panel: power button, Autoset, menus and knobs'], ['Panel del Tektronix (antes de encenderlo y de simular, la pantalla está en negro)', 'Tektronix panel (before switching it on and simulating, the screen is black)'])]
        ),
        step(
          '<strong>Guardar la señal.</strong> Con la opción de impresión se guarda la pantalla del osciloscopio (también se mencionó la posibilidad de un PDF). Abrimos el archivo para comprobarlo: el <strong>color de la señal</strong> corresponde al canal que usamos.',
          '<strong>Saving the signal.</strong> The print option saves the oscilloscope screen (a PDF was also mentioned). We open the file to check it: the <strong>signal colour</strong> matches the channel we used.',
          [ ]
        )
      ],
    },

    // ———————————————————————————————— paso 6
    {
      id: 'multisim-paso6',
      chip: L('6 · Lógica', '6 · Logic'),
      title: L('Construir circuitos lógicos', 'Building logic circuits'),
      steps: [
        step(
          'Vamos a construir un circuito a partir de una <strong>función booleana</strong>. Colocamos las compuertas desde el grupo <strong>TTL</strong>, familia <strong>74LS</strong>. En la demostración: <strong>cuatro AND</strong>, <strong>un inversor</strong> y <strong>tres OR</strong>. Si elegimos la opción marcada <strong>IC</strong> aparece el integrado completo; en las otras, el símbolo de la compuerta.',
          'We will build a circuit from a <strong>Boolean function</strong>. We place the gates from the <strong>TTL</strong> group, <strong>74LS</strong> family. In the demo: <strong>four ANDs</strong>, <strong>one inverter</strong> and <strong>three ORs</strong>. If we pick the option marked <strong>IC</strong> the whole chip appears; with the others, the gate symbol.',
          [
            table(
              [['Compuerta', 'Gate'], ['Terminación 74LS', '74LS part']],
              [[['AND', 'AND'], ['08', '08']], [['NOT (inversor)', 'NOT (inverter)'], ['04', '04']], [['OR', 'OR'], ['32', '32']]]
            )
          ]
        ),
        step(
          '<strong>Entradas digitales.</strong> En fuentes elegimos <strong>fuentes digitales</strong> y una <strong>constante digital</strong>. Con la <strong>barra espaciadora</strong> cambia entre 0 y 1; con doble clic le asignamos otra tecla (una letra o número). Colocamos las entradas <strong>A, B, C y D</strong>.',
          '<strong>Digital inputs.</strong> In sources we choose <strong>digital sources</strong> and a <strong>digital constant</strong>. The <strong>space bar</strong> toggles it between 0 and 1; double-clicking lets us assign another key (a letter or number). We place inputs <strong>A, B, C and D</strong>.',
          []
        ),
        step(
          '<strong>Indicador.</strong> En el grupo de indicadores tomamos una <strong>punta de prueba</strong> y la colocamos en la salida. Simulamos y cambiamos las entradas: en la clase se apagaba con <strong>0000</strong>.',
          '<strong>Indicator.</strong> From the indicators group we take a <strong>probe</strong> and place it on the output. We simulate and change the inputs: in class it went off at <strong>0000</strong>.',
          []
        )
      ],
    },

    // ———————————————————————————————— paso 7
    {
      id: 'multisim-paso7',
      chip: L('7 · Redes', '7 · Nets'),
      title: L('Conexiones mediante nombres de red', 'Connections by net name'),
      steps: [
        step(
          'Para no cablear por todo el circuito, <strong>nombramos las líneas</strong>: sacamos un cable corto desde una terminal, hacemos doble clic sobre la línea, escribimos el nombre de referencia (A, B, C, D…), activamos <strong>mostrar el nombre</strong> y aceptamos. Dos líneas con el mismo nombre quedan conectadas. Es la misma idea de las etiquetas de red de KiCad.',
          'To avoid wiring all over the circuit, we <strong>name the lines</strong>: pull a short wire from a terminal, double-click the line, type the reference name (A, B, C, D…), switch on <strong>show name</strong> and accept. Two lines with the same name are connected. It is the same idea as KiCad\'s net labels.',
          []
        ),
        step(
          'Si usamos un nombre que <strong>ya existe</strong>, el programa pregunta si es la <strong>misma red</strong> o <strong>otra distinta</strong>. Si queremos que ambos puntos reciban la misma señal, confirmamos que es la misma; si no, usamos un nombre diferente. También se puede cambiar el <strong>color</strong> de la línea.',
          'If we use a name that <strong>already exists</strong>, the program asks whether it is the <strong>same net</strong> or a <strong>different one</strong>. If we want both points to receive the same signal, we confirm it is the same; if not, we use a different name. The line <strong>colour</strong> can also be changed.',
          [ ]
        )
      ],
    },

    // ———————————————————————————————— paso 8
    {
      id: 'multisim-paso8',
      chip: L('8 · Logic Converter', '8 · Logic Converter'),
      title: L('Uso del Logic Converter', 'Using the Logic Converter'),
      steps: [
        step(
          '<strong>Tabla de verdad.</strong> Buscamos el <strong>Logic Converter</strong> en la barra derecha, lo colocamos y abrimos su panel. Seleccionamos las variables <strong>A, B y C</strong> y editamos la salida de cada fila: <strong>0</strong>, <strong>1</strong> o <strong>X</strong> (“no importa”).',
          '<strong>Truth table.</strong> We find the <strong>Logic Converter</strong> in the right bar, place it and open its panel. We select variables <strong>A, B and C</strong> and edit each row\'s output: <strong>0</strong>, <strong>1</strong> or <strong>X</strong> ("don\'t care").',
          []
        ),
        step(
          '<strong>Conversiones.</strong> El instrumento permite pasar de tabla a <strong>forma canónica</strong>, de tabla a <strong>forma simplificada</strong>, de <strong>expresión a tabla</strong> y de expresión a <strong>compuertas</strong>.',
          '<strong>Conversions.</strong> The instrument converts from a table to <strong>canonical form</strong>, from a table to <strong>simplified form</strong>, from an <strong>expression to a table</strong> and from an expression to <strong>gates</strong>.',
          [ ]
        ),
        step(
          '<strong>Analizar nuestro circuito.</strong> Detenemos la simulación, quitamos las entradas manuales y conectamos al Logic Converter las <strong>cuatro entradas A, B, C y D</strong> (en ese orden) y su <strong>terminal de salida</strong>, nombrando las líneas. Abrimos el panel y elegimos <strong>circuito a tabla de verdad</strong>. Si el programa avisa que la simulación está corriendo, la detenemos antes de convertir.',
          '<strong>Analysing our circuit.</strong> We stop the simulation, remove the manual inputs and connect the <strong>four inputs A, B, C and D</strong> (in that order) and the <strong>output terminal</strong> to the Logic Converter, naming the lines. We open the panel and choose <strong>circuit to truth table</strong>. If the program warns that the simulation is running, we stop it before converting.',
          []
        ),
        step(
          '<strong>Simplificar y generar compuertas.</strong> De la tabla obtenemos la forma canónica y después la simplificada. En la demostración salió <strong>A·C̅ + B·C</strong> (“a por c negada, más b por c”), y <strong>D no afecta el resultado</strong>. Después generamos el circuito equivalente y probamos la opción de obtenerlo usando <strong>solo compuertas NAND</strong>.',
          '<strong>Simplify and generate gates.</strong> From the table we get the canonical form and then the simplified one. In the demo we got <strong>A·C̅ + B·C</strong> ("a times not-c, plus b times c"), and <strong>D does not affect the result</strong>. Then we generate the equivalent circuit and try the option to build it using <strong>NAND gates only</strong>.',
          [ ]
        )
      ],
    },

    // ———————————————————————————————— paso 9
    {
      id: 'multisim-paso9',
      chip: L('9 · Análisis', '9 · Analyses'),
      title: L('Tipos de análisis y modo de simulación', 'Analysis types and simulation mode'),
      steps: [
        step(
          'Multisim tiene tres análisis principales. Se abren desde <strong>Simulación → Análisis y simulación</strong>.',
          'Multisim has three main analyses. They are opened from <strong>Simulate → Analyses and simulation</strong>.',
          [
            table(
              [['Análisis', 'Analysis'], ['Qué observamos', 'What we observe']],
              [
                [['Transitorio', 'Transient'], ['Comportamiento respecto al tiempo', 'Behaviour over time']],
                [['DC', 'DC'], ['Comportamiento al variar fuentes DC', 'Behaviour as DC sources are varied']],
                [['AC', 'AC'], ['Comportamiento respecto a la frecuencia', 'Behaviour versus frequency']]
              ]
            ),
            note('En AC se puede variar la frecuencia y ver la respuesta (por ejemplo, estudiar un circuito a 1 MHz o a 100 Hz). En clase no se configuró un análisis AC completo, y Fourier solo se mencionó como herramienta para descomponer señales.', 'In AC we can vary the frequency and watch the response (for example, studying a circuit at 1 MHz or at 100 Hz). A full AC analysis was not set up in class, and Fourier was only mentioned as a tool to break signals down.')
          ]
        ),
        step(
          '<strong>Volver a simulación interactiva.</strong> Al terminar un análisis, revisamos el modo seleccionado antes de ejecutar otro circuito. Lo cambiamos desde el selector o desde <strong>Análisis y simulación</strong>, elegimos <strong>Simulación interactiva</strong> y ejecutamos de nuevo. Es lo que resuelve el error que aparece al continuar con el generador.',
          '<strong>Going back to interactive simulation.</strong> After finishing an analysis, we check the selected mode before running another circuit. We change it from the selector or from <strong>Analyses and simulation</strong>, choose <strong>Interactive simulation</strong> and run again. That fixes the error that shows up when continuing with the generator.',
          []
        )
      ],
    },

    // ———————————————————————————————— paso 10
    {
      id: 'multisim-paso10',
      chip: L('10 · Circuito RC', '10 · RC circuit'),
      title: L('Análisis transitorio de un circuito RC', 'Transient analysis of an RC circuit'),
      steps: [
        step(
          '<strong>Componentes.</strong> Colocamos una fuente DC (la ponemos en <strong>5 V</strong>), <strong>GND</strong>, una resistencia (por defecto <strong>1 kΩ</strong>) y un capacitor de <strong>1 µF</strong> (en componentes básicos). Conectamos el circuito mostrado en clase.',
          '<strong>Components.</strong> We place a DC source (set to <strong>5 V</strong>), <strong>GND</strong>, a resistor (<strong>1 kΩ</strong> by default) and a <strong>1 µF</strong> capacitor (in basic components). We wire the circuit shown in class.',
          [
            table(
              [['Componente', 'Component'], ['Valor mencionado', 'Value mentioned']],
              [[['Fuente DC', 'DC source'], ['5 V', '5 V']], [['Resistencia', 'Resistor'], ['1 kΩ', '1 kΩ']], [['Capacitor', 'Capacitor'], ['1 µF', '1 µF']], [['GND', 'GND'], ['Referencia', 'Reference']]]
            ),
            
          ]
        ),
        step(
          '<strong>Nombrar el nodo.</strong> Hacemos doble clic sobre la línea que queremos observar, la nombramos <strong>voltaje del capacitor</strong> y mostramos su nombre.',
          '<strong>Naming the node.</strong> We double-click the line we want to observe, name it <strong>capacitor voltage</strong> and show its name.',
          []
        ),
        step(
          '<strong>Configurar el análisis.</strong> Abrimos <strong>Análisis y simulación → Transitorio</strong>. Configuramos el inicio para ver el capacitor <strong>desde cero</strong>, con tiempo inicial <strong>0</strong> y tiempo final <strong>1 ms</strong>. En <strong>Salida</strong> seleccionamos el voltaje del capacitor, presionamos <strong>Añadir</strong> y ejecutamos.',
          '<strong>Setting up the analysis.</strong> We open <strong>Analyses and simulation → Transient</strong>. We set the start so the capacitor is seen <strong>from zero</strong>, with initial time <strong>0</strong> and final time <strong>1 ms</strong>. Under <strong>Output</strong> we select the capacitor voltage, press <strong>Add</strong> and run.',
          [ ]
        ),
        step(
          '<strong>Ampliar el intervalo.</strong> Volvemos a los parámetros, cambiamos el tiempo final a <strong>5 ms</strong> y ejecutamos otra vez. Con el intervalo más amplio se ve mejor cómo el voltaje <strong>se aproxima a 5 V</strong>: es la <strong>carga</strong> del capacitor.',
          '<strong>Widening the interval.</strong> We go back to the parameters, change the final time to <strong>5 ms</strong> and run again. With the wider interval it is easier to see the voltage <strong>approach 5 V</strong>: it is the capacitor <strong>charging</strong>.',
          [ callout(['Constante de tiempo', 'Time constant'], 'En un circuito RC el voltaje del capacitor se acerca a la fuente con la <strong>constante de tiempo τ = R·C</strong>. Aquí τ = 1 kΩ × 1 µF = <strong>1 ms</strong>: a 1 ms el capacitor lleva cerca del 63 % (≈3.2 V) y a <strong>5 ms</strong> (cinco τ) está en más del 99 % (≈4.97 V), prácticamente en 5 V. Por eso el tiempo final se amplía a 5 ms. La descarga funciona al revés, pero no se simuló.', 'In an RC circuit the capacitor voltage approaches the source with a <strong>time constant τ = R·C</strong>. Here τ = 1 kΩ × 1 µF = <strong>1 ms</strong>: at 1 ms the capacitor is at about 63 % (≈3.2 V) and at <strong>5 ms</strong> (five τ) it is above 99 % (≈4.97 V), practically at 5 V. That is why the final time is widened to 5 ms. Discharge works the other way round, but it was not simulated.')]
        )
      ],
    },

    // ———————————————————————————————— paso 11
    {
      id: 'multisim-paso11',
      chip: L('11 · BJT', '11 · BJT'),
      title: L('Barrido DC de un transistor BJT', 'DC sweep of a BJT transistor'),
      steps: [
        step(
          '<strong>Colocar el transistor.</strong> Abrimos los transistores BJT, elegimos un <strong>NPN</strong> y el <strong>2N2222A</strong>, y lo colocamos. Identificamos <strong>base, colector y emisor</strong>. En clase se consultaron curvas de un BJT en emisor común y se explicó su uso para amplificar (por ejemplo, un controlador con un motor).',
          '<strong>Placing the transistor.</strong> We open the BJT transistors, pick an <strong>NPN</strong> and the <strong>2N2222A</strong>, and place it. We identify <strong>base, collector and emitter</strong>. In class the curves of a common-emitter BJT were consulted and its use as an amplifier was explained (for example, a driver with a motor).',
          []
        ),
        step(
          '<strong>Fuentes.</strong> Colocamos una <strong>fuente de corriente DC</strong> y una <strong>fuente de voltaje DC</strong> y conectamos según el diagrama mostrado. Renombramos la de corriente como <strong>corriente de la base</strong> y la de voltaje como <strong>voltaje colector-emisor</strong>.',
          '<strong>Sources.</strong> We place a <strong>DC current source</strong> and a <strong>DC voltage source</strong> and wire them according to the diagram shown. We rename the current one <strong>base current</strong> and the voltage one <strong>collector-emitter voltage</strong>.',
          [ ]
        ),
        step(
          '<strong>Configurar el barrido.</strong> Abrimos <strong>Análisis y simulación → DC</strong>. Primera fuente: <strong>voltaje colector-emisor</strong>, de <strong>0 V a 5 V</strong>, con incremento inicial de <strong>0.5 V</strong>. Segunda fuente: la <strong>corriente de base</strong> y su variación. En <strong>Salidas</strong> buscamos las variables del transistor, seleccionamos la <strong>corriente del colector</strong>, presionamos <strong>Añadir</strong> y ejecutamos.',
          '<strong>Setting up the sweep.</strong> We open <strong>Analyses and simulation → DC</strong>. First source: <strong>collector-emitter voltage</strong>, from <strong>0 V to 5 V</strong>, with an initial step of <strong>0.5 V</strong>. Second source: the <strong>base current</strong> and its variation. Under <strong>Outputs</strong> we look up the transistor variables, select the <strong>collector current</strong>, press <strong>Add</strong> and run.',
          [ ]
        ),
        step(
          '<strong>Leer las curvas.</strong> Obtenemos varias curvas: cada una muestra la <strong>corriente del colector respecto al voltaje colector-emisor</strong> para una corriente de base distinta. Al reducir el incremento hay más puntos. Con las curvas elegimos las condiciones en las que queremos que trabaje el transistor; el profesor comparó este tiempo de simulación con medir punto a punto en el laboratorio.',
          '<strong>Reading the curves.</strong> We get several curves: each shows the <strong>collector current versus the collector-emitter voltage</strong> for a different base current. A smaller step gives more points. With the curves we choose the conditions we want the transistor to work in; the teacher compared this simulation time with measuring point by point in the lab.',
          []
        )
      ],
    },

    // ———————————————————————————————— paso 12
    {
      id: 'multisim-paso12',
      chip: L('12 · Diodo', '12 · Diode'),
      title: L('Generador de funciones y circuito con diodo', 'Function generator and diode circuit'),
      steps: [
        step(
          '<strong>Armar y configurar.</strong> Colocamos un <strong>generador de funciones</strong>, un <strong>diodo</strong>, una <strong>resistencia</strong> y <strong>GND</strong>, y los conectamos. En el generador fijamos <strong>60 Hz</strong> de frecuencia y <strong>120</strong> de amplitud. Si sigue seleccionado el análisis DC, volvemos a <strong>Simulación interactiva</strong> antes de ejecutar.',
          '<strong>Build and set up.</strong> We place a <strong>function generator</strong>, a <strong>diode</strong>, a <strong>resistor</strong> and <strong>GND</strong>, and wire them. On the generator we set <strong>60 Hz</strong> frequency and <strong>120</strong> amplitude. If the DC analysis is still selected, we go back to <strong>Interactive simulation</strong> before running.',
          [shot('26-tektronix-circuito', ['Generador XFG1, diodo D1 (1BH62), resistencia R1 de 1 kΩ y osciloscopio XSC1', 'Generator XFG1, diode D1 (1BH62), 1 kΩ resistor R1 and oscilloscope XSC1'], ['Circuito del ejemplo: generador, diodo 1BH62 y resistencia de 1 kΩ', 'Example circuit: generator, 1BH62 diode and 1 kΩ resistor'])]
        ),
        step(
          '<strong>Comparar con un osciloscopio.</strong> Colocamos un osciloscopio con un canal en la <strong>entrada</strong> y otro en la <strong>salida</strong>, ambos referidos a tierra, y ejecutamos. Si las dos trazas salen del <strong>mismo color</strong>: detenemos, abrimos las propiedades de una línea, elegimos otro color (por ejemplo, amarillo), aplicamos y ejecutamos de nuevo.',
          '<strong>Comparing with an oscilloscope.</strong> We place an oscilloscope with one channel on the <strong>input</strong> and another on the <strong>output</strong>, both referenced to ground, and run. If both traces come out the <strong>same colour</strong>: we stop, open one line\'s properties, pick another colour (for example, yellow), apply and run again.',
          []
        ),
        step(
          '<strong>Con el Tektronix.</strong> Detenemos y sustituimos el osciloscopio por el Tektronix: un canal a la entrada y otro a la salida. Ejecutamos, abrimos, lo encendemos y presionamos <strong>Autoset</strong>. Comparamos la señal del generador con la señal <strong>recortada por el diodo</strong>: el diodo deja pasar la corriente en <strong>un solo sentido</strong>.',
          '<strong>With the Tektronix.</strong> We stop and swap the oscilloscope for the Tektronix: one channel on the input and another on the output. We run, open it, switch it on and press <strong>Autoset</strong>. We compare the generator signal with the signal <strong>clipped by the diode</strong>: the diode lets current through in <strong>one direction only</strong>.',
          [shot('26-tektronix-circuito', ['Circuito con generador, diodo y resistencia, y el Tektronix con entrada y salida recortada', 'Circuit with generator, diode and resistor, and the Tektronix showing input and clipped output']), note('En el circuito de la captura el diodo está en serie con la resistencia y su <strong>ánodo</strong> del lado del generador: deja pasar el semiciclo <strong>positivo</strong> y bloquea el negativo. Por eso la traza de salida (amarilla) es una señal de media onda.', 'In the captured circuit the diode is in series with the resistor and its <strong>anode</strong> faces the generator: it lets the <strong>positive</strong> half-cycle through and blocks the negative one. That is why the output trace (yellow) is a half-wave signal.')]
        )
      ],
    },

    // ———————————————————————————————— atajos y observaciones
    {
      id: 'multisim-atajos',
      chip: L('Atajos', 'Shortcuts'),
      title: L('Atajos de teclado y observaciones', 'Keyboard shortcuts and observations'),
      steps: [
        step(
          'Estos son los <strong>atajos</strong> que se usaron en la práctica o que salen en la documentación oficial de NI. Se pueden revisar y cambiar en <strong>Options → Customize User Interface → Keyboard</strong>.',
          'These are the <strong>shortcuts</strong> used in the practice or listed in NI\'s official documentation. They can be checked and changed in <strong>Options → Customize User Interface → Keyboard</strong>.',
          [
            table(
              [['Atajo', 'Shortcut'], ['Qué hace', 'What it does']],
              [
                [['<kbd>F5</kbd>', '<kbd>F5</kbd>'], ['Iniciar la simulación (Run)', 'Start the simulation (Run)']],
                [['<kbd>Esc</kbd>', '<kbd>Esc</kbd>'], ['Salir de la ventana de selección de componentes o cancelar la colocación', 'Leave the component selection window or cancel placement']],
                [['<kbd>Ctrl</kbd>+<kbd>R</kbd>', '<kbd>Ctrl</kbd>+<kbd>R</kbd>'], ['Girar el componente seleccionado 90° a la derecha', 'Rotate the selected component 90° clockwise']],
                [['<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>', '<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>'], ['Girarlo 90° a la izquierda', 'Rotate it 90° counter-clockwise']],
                [['<kbd>Ctrl</kbd>+<kbd>Z</kbd>', '<kbd>Ctrl</kbd>+<kbd>Z</kbd>'], ['Deshacer el último cambio', 'Undo the last change']],
                [['<kbd>Ctrl</kbd>+<kbd>C</kbd> / <kbd>Ctrl</kbd>+<kbd>V</kbd>', '<kbd>Ctrl</kbd>+<kbd>C</kbd> / <kbd>Ctrl</kbd>+<kbd>V</kbd>'], ['Copiar y pegar componentes', 'Copy and paste components']],
                [['<kbd>Ctrl</kbd>+<kbd>S</kbd>', '<kbd>Ctrl</kbd>+<kbd>S</kbd>'], ['Guardar el circuito', 'Save the circuit']],
                [['<kbd>A</kbd>', '<kbd>A</kbd>'], ['Abrir/cerrar el interruptor DIP (tecla por defecto, se puede cambiar con doble clic)', 'Open/close the DIP switch (default key, can be changed by double-clicking)']],
                [['<kbd>Espacio</kbd>', '<kbd>Space</kbd>'], ['Cambiar una fuente digital constante entre 0 y 1', 'Toggle a digital constant source between 0 and 1']],
                [['Rueda del ratón', 'Mouse wheel'], ['Acercar y alejar la hoja de trabajo', 'Zoom the workspace in and out']],
              ]
            ),
            note('Voltear un componente (horizontal o vertical) está en el <strong>clic derecho</strong> sobre él. Algunas listas de terceros dan <kbd>Alt</kbd>+<kbd>X</kbd> y <kbd>Alt</kbd>+<kbd>Y</kbd> para voltear, pero NI no los documenta: si no responden, es la versión.', 'Flipping a component (horizontal or vertical) is in the <strong>right-click</strong> menu. Some third-party lists give <kbd>Alt</kbd>+<kbd>X</kbd> and <kbd>Alt</kbd>+<kbd>Y</kbd> for flipping, but NI does not document them: if they do not respond, that is the version.'),
          ]
        ),
        step(
          '<strong>Observaciones que ahorran errores.</strong>',
          '<strong>Observations that save mistakes.</strong>',
          [
            callout(
              ['Antes de simular, revisa esto', 'Check this before simulating'],
              '<ul><li>Todo circuito necesita <strong>GND</strong>: sin referencia de tierra, la simulación no converge.</li><li>Un cable solo cuenta como conectado cuando el punto de la terminal se pone en <strong>rojo</strong>.</li><li>Para editar hay que <strong>detener</strong> la simulación; las mediciones puntuales sí se pueden usar mientras corre.</li><li>El osciloscopio <strong>no muestra nada</strong> si la simulación está detenida. Los de Tektronix, además, hay que <strong>encenderlos</strong> en su panel.</li><li>Si un análisis (DC, transitorio…) quedó seleccionado, el siguiente circuito da error: vuelve a <strong>Interactive Simulation</strong>.</li><li>Dos líneas con el <strong>mismo nombre de red</strong> quedan conectadas aunque no tengan cable entre ellas.</li><li>El valor de una fuente AC puede ser <strong>eficaz o pico</strong> según el tipo de fuente: lee el nombre del campo.</li><li>Guarda el circuito (<kbd>Ctrl</kbd>+<kbd>S</kbd>) antes de abrir otra pestaña o cambiar de análisis.</li></ul>',
              '<ul><li>Every circuit needs <strong>GND</strong>: without a ground reference the simulation does not converge.</li><li>A wire only counts as connected when the terminal dot turns <strong>red</strong>.</li><li>To edit you must <strong>stop</strong> the simulation; the point probes can be used while it runs.</li><li>The oscilloscope <strong>shows nothing</strong> if the simulation is stopped. Tektronix ones also have to be <strong>switched on</strong> on their panel.</li><li>If an analysis (DC, transient…) was left selected, the next circuit gives an error: go back to <strong>Interactive Simulation</strong>.</li><li>Two lines with the <strong>same net name</strong> are connected even without a wire between them.</li><li>An AC source value can be <strong>RMS or peak</strong> depending on the source type: read the field name.</li><li>Save the circuit (<kbd>Ctrl</kbd>+<kbd>S</kbd>) before opening another tab or changing analysis.</li></ul>'
            ),
          ]
        ),
      ],
    },

    // ———————————————————————————————— resultados
    {
      id: 'multisim-resultados',
      chip: L('Resultados', 'Results'),
      title: L('Resultados y documentación', 'Results and documentation'),
      steps: [
        step(
          'Al terminar tenemos estos resultados, uno por ejercicio:',
          'At the end we have these results, one per exercise:',
          [
            table(
              [['Ejercicio', 'Exercise'], ['Resultado observado', 'Observed result']],
              [
                [['Circuito con LED', 'LED circuit'], ['Encendido y apagado con el interruptor', 'On and off with the switch']],
                [['Mediciones', 'Measurements'], ['Lecturas de corriente, voltaje y potencia', 'Current, voltage and power readings']],
                [['Multímetro', 'Multimeter'], ['Voltaje del LED', 'LED voltage']],
                [['Fuente AC', 'AC source'], ['Señal con offset', 'Signal with offset']],
                [['Osciloscopios', 'Oscilloscopes'], ['Ajustes de visualización y mediciones', 'Display settings and measurements']],
                [['Circuito lógico', 'Logic circuit'], ['Cambio del indicador al modificar entradas', 'Indicator changes as inputs change']],
                [['Logic Converter', 'Logic Converter'], ['Tabla, simplificación y generación de compuertas', 'Table, simplification and gate generation']],
                [['Circuito RC', 'RC circuit'], ['Curva de carga', 'Charging curve']],
                [['Transistor BJT', 'BJT transistor'], ['Curvas obtenidas con el barrido DC', 'Curves obtained from the DC sweep']],
                [['Generador y diodo', 'Generator and diode'], ['Comparación de entrada y salida', 'Input versus output comparison']]
              ]
            ),
            note('Para documentar: mostramos la <strong>ventana completa</strong> cuando explicamos la interfaz y <strong>recortamos al circuito</strong> cuando solo importa el circuito, para que no quede pequeño entre espacios en blanco. Guardamos el circuito y las señales de los instrumentos.', 'To document: we show the <strong>full window</strong> when explaining the interface and <strong>crop to the circuit</strong> when only the circuit matters, so it does not end up tiny among white space. We save the circuit and the instrument signals.')
          ]
        )
      ],
    }
  ],
}
