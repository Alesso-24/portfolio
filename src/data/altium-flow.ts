// Flujo de Altium Designer: de un proyecto vacío al pedido en JLCPCB.
// ESTADO (2026-11-10): publicado como BORRADOR. Las secciones 1-7 salen de lo que Alessandro ya hizo y explicó
// (material en docs-source/.../10-altium/); las secciones 8-14 son PROVISIONALES (flujo estándar de Altium, aún sin
// capturas ni confirmación): su orden y su contenido pueden cambiar cuando Alessandro avance. Cada una lo avisa con un
// bloque `pending`. Los huecos de imagen son bloques `placeholder` (cada uno dice qué mostrar); las capturas reales
// van con recuadros naranjas cuando Alessandro diga que terminó.
// El inglés vive aquí mismo (L(es, en)) y se registra en docs-en.ts vía ALTIUM_EN.
import type { Flow, FlowStep, Block } from './flow-types'

const tr: Record<string, string> = {}
/** registra la traducción y devuelve el texto en español (la clave del diccionario) */
const L = (es: string, en: string) => {
  tr[es] = en
  return es
}
export const ALTIUM_EN = tr

const ph = (es: string, en: string): Block => ({ kind: 'placeholder', caption: L(es, en) })
const pend = (es: string, en: string): Block => ({ kind: 'pending', html: L(es, en) })
const note = (es: string, en: string): Block => ({ kind: 'note', html: L(es, en) })
const important = (es: string, en: string): Block => ({ kind: 'important', html: L(es, en) })
const callout = (title: [string, string], es: string, en: string): Block => ({ kind: 'callout', title: L(...title), html: L(es, en) })
const table = (head: [string, string][], rows: [string, string][][]): Block => ({
  kind: 'table',
  head: head.map(([a, b]) => L(a, b)),
  rows: rows.map((r) => r.map(([a, b]) => L(a, b))),
})
const step = (es: string, en: string, blocks: Block[] = []): FlowStep => ({ html: L(es, en), blocks })

const PROV_ES = 'Sección <strong>provisional</strong>: es el flujo estándar de Altium, todavía sin capturas propias. El orden y los detalles pueden cambiar cuando se documente con la placa real.'
const PROV_EN = 'This section is <strong>provisional</strong>: it is the standard Altium flow, still without our own screenshots. The order and the details may change once it is documented with the real board.'
const prov = (): Block => pend(PROV_ES, PROV_EN)

export const ALTIUM_FLOW: Flow = {
  id: 'altium',
  sections: [
    // ———————————————————————————————— 1 proyecto
    {
      id: 'altium-proyecto',
      chip: L('1 · Proyecto', '1 · Project'),
      title: L('Abrir Altium y crear el proyecto', 'Open Altium and create the project'),
      steps: [
        step(
          'Abrimos <strong>Altium Designer</strong> (por ejemplo, buscándolo en el menú de Windows). Se abre la <strong>ventana principal</strong>, con el panel <strong>Projects</strong> a la izquierda.',
          'We open <strong>Altium Designer</strong> (for example, by searching for it in the Windows menu). The <strong>main window</strong> opens, with the <strong>Projects</strong> panel on the left.',
          [
            ph('Buscador de Windows con Altium Designer y, después, la ventana principal con el panel Projects señalado.', 'Windows search with Altium Designer and then the main window with the Projects panel marked.'),
            note('En todo este tutorial se usan <strong>imágenes generales</strong> de la ventana, con recuadros naranjas que señalan de qué se habla.', 'Throughout this tutorial we use <strong>full-window images</strong>, with orange boxes marking what is being talked about.'),
          ]
        ),
        step(
          'Para crear un proyecto nuevo vamos a <strong>File → New → Project…</strong>',
          'To create a new project we go to <strong>File → New → Project…</strong>',
          [ph('Menú File abierto con New y Project… resaltados.', 'File menu open with New and Project… highlighted.')]
        ),
        step(
          'Se abre la ventana <strong>Create Project</strong>. Dejamos el tipo <strong>PCB → &lt;Empty&gt;</strong>, escribimos el <strong>nombre del proyecto</strong> y, en <strong>Advanced</strong>, revisamos la <strong>carpeta</strong> y el <strong>Local Storage</strong> (la ubicación en el disco). Con el nombre y la ubicación listos, damos <strong>Create</strong>.',
          'The <strong>Create Project</strong> window opens. We keep the <strong>PCB → &lt;Empty&gt;</strong> type, type the <strong>project name</strong> and, under <strong>Advanced</strong>, check the <strong>folder</strong> and the <strong>Local Storage</strong> (the location on disk). With the name and location ready, we press <strong>Create</strong>.',
          [
            ph('Ventana Create Project con el tipo PCB Empty, el nombre, la carpeta, el Local Storage y el botón Create señalados.', 'Create Project window with the PCB Empty type, the name, the folder, the Local Storage and the Create button marked.'),
            note('Si el nombre ya existe en la carpeta o en el servidor, el campo se marca en rojo y <strong>Create</strong> queda deshabilitado: hay que elegir otro nombre.', 'If the name already exists in the folder or on the server, the field turns red and <strong>Create</strong> stays disabled: pick another name.'),
          ]
        ),
      ],
    },

    // ———————————————————————————————— 2 esquemático
    {
      id: 'altium-esquematico',
      chip: L('2 · Esquemático', '2 · Schematic'),
      title: L('Añadir la hoja de esquemático', 'Add the schematic sheet'),
      steps: [
        step(
          'El proyecto aparece en el panel <strong>Projects</strong> todavía sin documentos ("No Document"). Hacemos <strong>clic derecho</strong> sobre el proyecto (<code>.PrjPcb</code>) → <strong>Add New to Project → Schematic</strong>.',
          'The project shows up in the <strong>Projects</strong> panel still without documents ("No Document"). We <strong>right-click</strong> the project (<code>.PrjPcb</code>) → <strong>Add New to Project → Schematic</strong>.',
          [ph('Panel Projects con el menú contextual del proyecto: Add New to Project y Schematic resaltados.', 'Projects panel with the project context menu: Add New to Project and Schematic highlighted.')]
        ),
        step(
          'Se abre una <strong>hoja vacía</strong> (<code>Sheet1.SchDoc</code>). Presionamos <kbd>Ctrl</kbd>+<kbd>S</kbd> para guardarla, le ponemos el <strong>nombre correcto</strong> (por ejemplo, <code>Esquematico_altium</code>) y damos <strong>Guardar</strong>. La pestaña y el árbol de Projects ya muestran el nombre nuevo.',
          'An <strong>empty sheet</strong> opens (<code>Sheet1.SchDoc</code>). We press <kbd>Ctrl</kbd>+<kbd>S</kbd> to save it, give it the <strong>right name</strong> (for example, <code>Esquematico_altium</code>) and press <strong>Save</strong>. The tab and the Projects tree now show the new name.',
          [ph('Hoja vacía, el diálogo de guardado con el nombre y la hoja ya renombrada.', 'Empty sheet, the save dialog with the name and the renamed sheet.')]
        ),
      ],
    },

    // ———————————————————————————————— 3 componentes
    {
      id: 'altium-componentes',
      chip: L('3 · Componentes', '3 · Components'),
      title: L('Colocar componentes', 'Place components'),
      steps: [
        step(
          'Para agregar componentes presionamos la letra <kbd>P</kbd>: se abre un menú y elegimos <strong>Part…</strong>. Se abre a la derecha el panel <strong>Components</strong>.',
          'To add components we press the <kbd>P</kbd> key: a menu opens and we choose <strong>Part…</strong>. The <strong>Components</strong> panel opens on the right.',
          [ph('Hoja con el menú de la tecla P (Part… resaltado) y el panel Components a la derecha.', 'Sheet with the P-key menu (Part… highlighted) and the Components panel on the right.')]
        ),
        step(
          'Arriba del panel hay un <strong>menú desplegable</strong> con todos los grupos de componentes clasificados. Ahí están tanto los <strong>predeterminados de Altium</strong> (Capacitors, Connectors, Resistors, LED, Switches…) como las <strong>librerías que hemos agregado nosotros</strong> (en la sección <strong>File-based libraries</strong>).',
          'At the top of the panel there is a <strong>drop-down menu</strong> with every component group sorted out. It holds both the <strong>Altium defaults</strong> (Capacitors, Connectors, Resistors, LED, Switches…) and the <strong>libraries we have added ourselves</strong> (under <strong>File-based libraries</strong>).',
          [ph('Desplegable de categorías (All) y, al final de la lista, las librerías File-based.', 'Categories drop-down (All) and, at the end of the list, the File-based libraries.')]
        ),
        step(
          'Ejemplo con una <strong>resistencia</strong>: elegimos la categoría <strong>Resistors</strong>. Al seleccionar una, el panel muestra toda su información: su <strong>símbolo</strong> (esquemático), su <strong>vista 3D</strong> y su <strong>huella</strong> (footprint) para la PCB.',
          'Example with a <strong>resistor</strong>: we pick the <strong>Resistors</strong> category. When one is selected, the panel shows all its information: its <strong>symbol</strong> (schematic), its <strong>3D view</strong> and its <strong>footprint</strong> for the PCB.',
          [ph('Panel Components con Resistors: lista, símbolo, vista 3D y huella 2D, cada uno señalado.', 'Components panel with Resistors: list, symbol, 3D view and 2D footprint, each one marked.')]
        ),
        step(
          'Damos <strong>doble clic</strong> sobre la resistencia que queremos (su valor se puede cambiar después). La resistencia queda <strong>flotando con el cursor</strong> hasta que hacemos clic para colocarla, en cualquier parte de la hoja. Mientras flota, la tecla <kbd>Espacio</kbd> la <strong>rota</strong>.',
          'We <strong>double-click</strong> the resistor we want (its value can be changed later). The resistor stays <strong>floating on the cursor</strong> until we click to place it, anywhere on the sheet. While it floats, the <kbd>Space</kbd> key <strong>rotates</strong> it.',
          [ph('Fila de la resistencia seleccionada en el panel y la resistencia ya colocada en la hoja.', 'Selected resistor row in the panel and the resistor already placed on the sheet.')]
        ),
        step(
          'Con la resistencia seleccionada, el panel <strong>Properties</strong> permite asignar el <strong>designador</strong> (el nombre en el circuito, como <code>R1</code>). Si queremos otro <strong>valor</strong>, hacemos doble clic sobre el valor mostrado y lo cambiamos (por ejemplo, de 953k a <code>1K</code>).',
          'With the resistor selected, the <strong>Properties</strong> panel lets us assign the <strong>designator</strong> (the name in the circuit, like <code>R1</code>). If we want another <strong>value</strong>, we double-click the displayed value and change it (for example, from 953k to <code>1K</code>).',
          [ph('Campo Designator con R1 y campo Value antes (953k) y después del cambio (1K).', 'Designator field with R1 and Value field before (953k) and after the change (1K).')]
        ),
        step(
          'Añadimos otra resistencia y le damos otro designador, <code>R2</code>. Así vamos colocando todos los componentes del circuito.',
          'We add another resistor and give it another designator, <code>R2</code>. That is how we place every component of the circuit.',
          [ph('Hoja con R1 y R2 colocadas.', 'Sheet with R1 and R2 placed.')]
        ),
      ],
    },

    // ———————————————————————————————— 4 alimentación y conexiones
    {
      id: 'altium-conexiones',
      chip: L('4 · Conexiones', '4 · Connections'),
      title: L('Alimentaciones, etiquetas y No ERC', 'Power, labels and No ERC'),
      steps: [
        step(
          '<strong>Tierra.</strong> Con la letra <kbd>P</kbd> vamos a <strong>Power Port</strong>. Por defecto coloca <strong>tierra (GND)</strong>, pero sirve tanto para tierra como para voltajes (+). Lo llevamos al pin del componente donde va y hacemos clic para colocarlo.',
          '<strong>Ground.</strong> With the <kbd>P</kbd> key we go to <strong>Power Port</strong>. By default it places <strong>ground (GND)</strong>, but it works for both ground and voltages (+). We take it to the component pin where it belongs and click to place it.',
          [ph('Menú P con Power Port resaltado y el símbolo GND colocado sobre el pin 1 de la resistencia.', 'P-key menu with Power Port highlighted and the GND symbol placed on resistor pin 1.')]
        ),
        step(
          '<strong>Voltaje (por ejemplo, 3V3).</strong> Repetimos con <strong>Power Port</strong> y lo colocamos. Para <strong>rotarlo</strong> usamos <kbd>Espacio</kbd>. Después le cambiamos el nombre a <code>+3V3</code> en el panel Properties.',
          '<strong>Voltage (for example, 3V3).</strong> We repeat with <strong>Power Port</strong> and place it. To <strong>rotate</strong> it we use <kbd>Space</kbd>. Then we rename it to <code>+3V3</code> in the Properties panel.',
          [ph('Power Port colocado en el otro extremo de la resistencia y renombrado a +3V3 en Properties.', 'Power Port placed on the resistor\'s other end and renamed to +3V3 in Properties.'), note('Con esto queda cubierto todo lo de alimentaciones.', 'That covers everything about power.')]
        ),
        step(
          '<strong>Conexiones en general.</strong> Lo común, y una buena práctica, es usar <strong>etiquetas</strong> en lugar de cables largos: con <kbd>P</kbd> elegimos <strong>Net Label</strong>, la colocamos donde queramos y le damos un nombre (por ejemplo, <code>P1</code>). Cuando colocamos otra etiqueta con <strong>el mismo nombre</strong> en otro componente, Altium las interpreta como <strong>conectadas</strong>.',
          '<strong>Connections in general.</strong> The usual practice, and a good one, is to use <strong>labels</strong> instead of long wires: with <kbd>P</kbd> we pick <strong>Net Label</strong>, place it where we want and give it a name (for example, <code>P1</code>). When we place another label with <strong>the same name</strong> on another component, Altium treats them as <strong>connected</strong>.',
          [ph('Menú P con Net Label resaltado y la etiqueta P1 colocada en un pin, con su nombre en Properties.', 'P-key menu with Net Label highlighted and the P1 label placed on a pin, with its name in Properties.'), important('Las etiquetas solo conectan si el nombre es <b>exactamente el mismo</b> (mayúsculas incluidas).', 'Labels only connect if the name is <b>exactly the same</b> (capitals included).')]
        ),
        step(
          '<strong>Pines que no se usan.</strong> Para dejar un pin sin conexión y que no marque error, con <kbd>P</kbd> vamos a <strong>Directives → Generic No ERC</strong>. Aparece una <strong>X</strong> que colocamos sobre cualquier pin que no vayamos a usar.',
          '<strong>Unused pins.</strong> To leave a pin unconnected without it raising an error, with <kbd>P</kbd> we go to <strong>Directives → Generic No ERC</strong>. An <strong>X</strong> appears and we place it on any pin we will not use.',
          [ph('Menú P → Directives → Generic No ERC y la X roja sobre un pin.', 'P-key menu → Directives → Generic No ERC and the red X on a pin.')]
        ),
      ],
    },

    // ———————————————————————————————— 5 esquemático completo
    {
      id: 'altium-completo',
      chip: L('5 · Esquemático completo', '5 · Full schematic'),
      title: L('Cómo debe quedar el esquemático', 'How the schematic should end up'),
      steps: [
        step(
          'Sabiendo lo básico, el primer esquemático quedaría <strong>algo así</strong>: con conexiones, etiquetas y alimentaciones, de manera <strong>limpia y organizada</strong>, sin cables enredados, para que se lea bien.',
          'Knowing the basics, the first schematic would look <strong>something like this</strong>: with connections, labels and power, <strong>clean and organised</strong>, with no tangled wires, so it reads well.',
          [
            ph('Esquemático completo de ejemplo (proyecto TAMAGOCHI) en pantalla completa, con recuadros sobre: etiquetas de red, power ports +3V3/GND, X de No ERC, designadores y valores.', 'Full example schematic (TAMAGOCHI project) in full window, with boxes on: net labels, +3V3/GND power ports, No ERC X marks, designators and values.'),
            callout(
              ['Qué hace legible un esquemático', 'What makes a schematic readable'],
              '<ul><li><strong>Etiquetas de red</strong> en vez de cables largos que cruzan la hoja.</li><li><strong>Power ports</strong> (+3V3, GND) repetidos junto a cada componente que los usa.</li><li><strong>Componentes agrupados por función</strong> (conectores, desacople, microcontrolador…).</li><li><strong>X de No ERC</strong> en los pines que no se usan.</li><li><strong>Designadores y valores</strong> visibles y sin encimarse.</li></ul>',
              '<ul><li><strong>Net labels</strong> instead of long wires crossing the sheet.</li><li><strong>Power ports</strong> (+3V3, GND) repeated next to every component that uses them.</li><li><strong>Components grouped by function</strong> (connectors, decoupling, microcontroller…).</li><li><strong>No ERC X marks</strong> on pins that are not used.</li><li><strong>Designators and values</strong> visible and not overlapping.</li></ul>'
            ),
          ]
        ),
      ],
    },

    // ———————————————————————————————— 6 DRC esquemático
    {
      id: 'altium-drc-esq',
      chip: L('6 · DRC esquemático', '6 · Schematic DRC'),
      title: L('Revisar el esquemático antes de la PCB', 'Check the schematic before the PCB'),
      steps: [
        step(
          'Antes de pasar al diseño de la PCB es <strong>muy importante</strong> correr un <strong>DRC del esquemático</strong>, para ver que no falten conexiones ni haya nada fuera de lugar. Vamos a <strong>Project → Validate PCB Project</strong>.',
          'Before moving on to the PCB design it is <strong>very important</strong> to run a <strong>schematic DRC</strong>, to check that no connections are missing and nothing is out of place. We go to <strong>Project → Validate PCB Project</strong>.',
          [ph('Menú Project con Validate PCB Project resaltado.', 'Project menu with Validate PCB Project highlighted.')]
        ),
        step(
          'Se abre el panel <strong>Messages</strong> con los <strong>errores y avisos</strong> encontrados, antes de pasar a editar la PCB. Al seleccionar un mensaje, abajo (<strong>Details</strong>) se explica el problema y se marcan los componentes involucrados.',
          'The <strong>Messages</strong> panel opens with the <strong>errors and warnings</strong> found, before moving on to edit the PCB. Selecting a message shows the problem under <strong>Details</strong> and marks the components involved.',
          [
            ph('Panel Messages con la lista de errores (Duplicate Component Designators, Un-Designated Part, pines IO…) y el panel Details.', 'Messages panel with the error list (Duplicate Component Designators, Un-Designated Part, IO pins…) and the Details panel.'),
            callout(
              ['Mensajes que aparecieron en este ejemplo', 'Messages that showed up in this example'],
              '<ul><li><strong>Duplicate Component Designators</strong> (por ejemplo, varios <code>C?</code>): hay componentes con el mismo designador.</li><li><strong>Un-Designated Part</strong>: componentes que todavía tienen <code>?</code> en el designador (sin numerar).</li><li><strong>… contains IO Pin and …</strong>: una red (GND, LIS_INT2) que mezcla tipos de pin distintos.</li></ul>',
              '<ul><li><strong>Duplicate Component Designators</strong> (for example, several <code>C?</code>): some components share the same designator.</li><li><strong>Un-Designated Part</strong>: components that still have <code>?</code> in the designator (not numbered).</li><li><strong>… contains IO Pin and …</strong>: a net (GND, LIS_INT2) that mixes different pin types.</li></ul>'
            ),
          ]
        ),
        step(
          'Corregimos <strong>todos los errores</strong> y volvemos a validar hasta que <strong>no queden problemas críticos</strong>. Solo entonces pasamos a la PCB.',
          'We fix <strong>all the errors</strong> and validate again until <strong>no critical problems are left</strong>. Only then do we move on to the PCB.',
          [
            pend('Falta documentar <strong>cómo se corrige</strong> cada tipo de mensaje (por ejemplo, numerar los designadores automáticamente con la herramienta de anotación de Altium). Alessandro lo explicará con su placa.', 'It is still missing <strong>how each type of message is fixed</strong> (for example, numbering the designators automatically with Altium\'s annotation tool). Alessandro will explain it with his board.'),
          ]
        ),
      ],
    },

    // ———————————————————————————————— 7 crear PCB
    {
      id: 'altium-pcb',
      chip: L('7 · Archivo PCB', '7 · PCB file'),
      title: L('Crear el PCB y traer el esquemático', 'Create the PCB and bring in the schematic'),
      steps: [
        step(
          'Primero agregamos el <strong>archivo PCB</strong> al proyecto: <strong>clic derecho</strong> sobre el proyecto (<code>.PrjPcb</code>) en el panel Projects → <strong>Add New to Project → PCB</strong>.',
          'First we add the <strong>PCB file</strong> to the project: <strong>right-click</strong> the project (<code>.PrjPcb</code>) in the Projects panel → <strong>Add New to Project → PCB</strong>.',
          [ph('Menú contextual del proyecto con Add New to Project y PCB resaltados.', 'Project context menu with Add New to Project and PCB highlighted.')]
        ),
        step(
          'Una vez creada se abre el <strong>editor de PCB</strong>: un tablero negro vacío, con la barra de capas abajo (Top Layer, Bottom Layer, Top Overlay…). Presionamos <kbd>Ctrl</kbd>+<kbd>S</kbd> para guardarlo con el <strong>nombre correcto</strong> y damos <strong>Guardar</strong>; la pestaña pasa a llamarse como el proyecto (<code>PCB_ALTIUM.PcbDoc</code>).',
          'Once created, the <strong>PCB editor</strong> opens: an empty black board, with the layer bar at the bottom (Top Layer, Bottom Layer, Top Overlay…). We press <kbd>Ctrl</kbd>+<kbd>S</kbd> to save it with the <strong>right name</strong> and press <strong>Save</strong>; the tab is renamed after the project (<code>PCB_ALTIUM.PcbDoc</code>).',
          [ph('Editor de PCB vacío con la barra de capas señalada y la pestaña ya renombrada.', 'Empty PCB editor with the layer bar marked and the tab already renamed.')]
        ),
        step(
          'Para pasar todo lo que hicimos en el esquemático a la placa vamos a <strong>Design → Update Schematics in</strong> <em>(nombre del proyecto)</em><code>.PrjPcb</code>.',
          'To move everything we did in the schematic onto the board we go to <strong>Design → Update Schematics in</strong> <em>(project name)</em><code>.PrjPcb</code>.',
          [
            ph('Menú Design con la opción Update Schematics in … resaltada.', 'Design menu with the Update Schematics in … option highlighted.'),
            pend('Falta el resultado de ese paso (la ventana de cambios, cómo ejecutarlos y la placa con los componentes y las líneas de conexión). Alessandro lo mandará en la siguiente tanda.', 'The outcome of this step is still missing (the changes window, how to execute them and the board with the components and connection lines). Alessandro will send it in the next batch.'),
          ]
        ),
      ],
    },

    // ———————————————————————————————— 8 forma
    {
      id: 'altium-forma',
      chip: L('8 · Forma de la placa', '8 · Board shape'),
      title: L('Forma y capas de la placa', 'Board shape and layers'),
      steps: [
        step(
          'Con los componentes ya en el editor, lo primero es definir la <strong>forma de la placa</strong> (el contorno). Se dibuja una figura cerrada en la capa mecánica y se le indica a Altium que esa es la forma: <strong>Design → Board Shape</strong>.',
          'With the components in the editor, the first thing is to define the <strong>board shape</strong> (the outline). A closed shape is drawn on the mechanical layer and Altium is told that it is the board shape: <strong>Design → Board Shape</strong>.',
          [prov(), ph('Contorno de la placa dibujado y el menú Design → Board Shape.', 'Board outline drawn and the Design → Board Shape menu.')]
        ),
        step(
          'Revisamos el <strong>número de capas</strong> en <strong>Design → Layer Stack Manager</strong>. Para esta placa de práctica se usan <strong>2 capas</strong> (Top y Bottom).',
          'We check the <strong>number of layers</strong> in <strong>Design → Layer Stack Manager</strong>. This practice board uses <strong>2 layers</strong> (Top and Bottom).',
          [ph('Layer Stack Manager con las dos capas de cobre.', 'Layer Stack Manager with the two copper layers.')]
        ),
      ],
    },

    // ———————————————————————————————— 9 reglas
    {
      id: 'altium-reglas',
      chip: L('9 · Reglas', '9 · Rules'),
      title: L('Reglas de diseño', 'Design rules'),
      steps: [
        step(
          'Las <strong>reglas de diseño</strong> le dicen a Altium qué es aceptable: ancho mínimo de pista, separación entre cobre, tamaño de vías y agujeros. Se abren en <strong>Design → Rules…</strong>. Conviene ajustarlas a lo que <strong>el fabricante puede producir</strong> (en nuestro caso, JLCPCB).',
          'The <strong>design rules</strong> tell Altium what is acceptable: minimum track width, copper clearance, via and hole sizes. They open from <strong>Design → Rules…</strong>. It is best to fit them to what <strong>the manufacturer can produce</strong> (in our case, JLCPCB).',
          [
            prov(),
            ph('Ventana PCB Rules and Constraints Editor con Clearance, Width y Via/Hole señalados.', 'PCB Rules and Constraints Editor window with Clearance, Width and Via/Hole marked.'),
            table(
              [['Regla', 'Rule'], ['Qué controla', 'What it controls'], ['Valor orientativo (2 capas)', 'Indicative value (2 layers)']],
              [
                [['Clearance', 'Clearance'], ['Separación mínima entre objetos de cobre', 'Minimum gap between copper objects'], ['≥ 0.2 mm (el mínimo de fábrica es menor)', '≥ 0.2 mm (the factory minimum is lower)']],
                [['Width', 'Width'], ['Ancho de las pistas', 'Track width'], ['≥ 0.25 mm para señales; más ancho para alimentación', '≥ 0.25 mm for signals; wider for power']],
                [['Routing Via Style', 'Routing Via Style'], ['Diámetro y agujero de las vías', 'Via diameter and hole'], ['agujero ≥ 0.3 mm', 'hole ≥ 0.3 mm']],
              ]
            ),
            note('Los valores son orientativos: hay que <strong>confirmarlos en las capacidades vigentes de JLCPCB</strong> antes de fabricar.', 'The values are indicative: they must be <strong>confirmed against JLCPCB\'s current capabilities</strong> before manufacturing.'),
          ]
        ),
      ],
    },

    // ———————————————————————————————— 10 colocación
    {
      id: 'altium-colocacion',
      chip: L('10 · Colocar', '10 · Placement'),
      title: L('Acomodar los componentes en la placa', 'Arrange the components on the board'),
      steps: [
        step(
          'Los componentes llegan <strong>amontonados</strong> fuera del contorno, unidos por <strong>líneas de conexión</strong> (ratsnest) que indican qué pines van juntos. Los arrastramos dentro de la placa y los acomodamos: <strong>agrupados por función</strong>, lo más cerca posible los que se conectan entre sí, y con los conectores en los bordes.',
          'The components arrive <strong>piled up</strong> outside the outline, joined by <strong>connection lines</strong> (ratsnest) showing which pins go together. We drag them inside the board and arrange them: <strong>grouped by function</strong>, as close as possible to the ones they connect to, and with the connectors on the edges.',
          [prov(), ph('Componentes acomodados dentro del contorno, con las líneas de conexión visibles.', 'Components arranged inside the outline, with the connection lines visible.')]
        ),
        step(
          'Los capacitores de <strong>desacople</strong> van lo más cerca posible del pin de alimentación del circuito integrado al que protegen. Con la tecla <kbd>Espacio</kbd> rotamos el componente mientras lo movemos.',
          '<strong>Decoupling</strong> capacitors go as close as possible to the power pin of the integrated circuit they protect. With the <kbd>Space</kbd> key we rotate the component while moving it.',
          [ph('Capacitor de desacople junto al pin de alimentación de un circuito integrado.', 'Decoupling capacitor next to an integrated circuit\'s power pin.')]
        ),
      ],
    },

    // ———————————————————————————————— 11 ruteo
    {
      id: 'altium-ruteo',
      chip: L('11 · Rutear', '11 · Routing'),
      title: L('Rutear las pistas', 'Route the tracks'),
      steps: [
        step(
          'Ya acomodados, <strong>ruteamos</strong>: dibujamos las pistas de cobre que siguen las líneas de conexión. Usamos el <strong>ruteo interactivo</strong> (<kbd>Ctrl</kbd>+<kbd>W</kbd> o <strong>Route → Interactive Routing</strong>): hacemos clic en un pin y seguimos la línea hasta el otro pin.',
          'With everything arranged, we <strong>route</strong>: we draw the copper tracks that follow the connection lines. We use <strong>interactive routing</strong> (<kbd>Ctrl</kbd>+<kbd>W</kbd> or <strong>Route → Interactive Routing</strong>): we click a pin and follow the line to the other pin.',
          [prov(), ph('Una pista en proceso de ruteo con el ruteo interactivo activo.', 'A track being routed with interactive routing active.')]
        ),
        step(
          'Si una pista tiene que cruzar a otra, cambiamos de <strong>capa</strong> con una <strong>vía</strong> (se usa la tecla <kbd>*</kbd> del teclado numérico mientras rutea). Las pistas de <strong>alimentación</strong> se hacen más anchas que las de señal.',
          'If a track has to cross another, we change <strong>layer</strong> with a <strong>via</strong> (the <kbd>*</kbd> key on the numeric keypad while routing). <strong>Power</strong> tracks are made wider than signal tracks.',
          [ph('Placa con pistas en Top (rojo) y Bottom (azul) y una vía entre ellas.', 'Board with tracks on Top (red) and Bottom (blue) and a via between them.')]
        ),
      ],
    },

    // ———————————————————————————————— 12 cobre y serigrafía
    {
      id: 'altium-cobre',
      chip: L('12 · Cobre y serigrafía', '12 · Copper and silkscreen'),
      title: L('Plano de tierra y serigrafía', 'Ground plane and silkscreen'),
      steps: [
        step(
          'Un <strong>plano de cobre</strong> conectado a GND mejora el ruido y simplifica el ruteo. Se hace con <strong>Place → Polygon Pour</strong>: dibujamos la zona sobre la placa, elegimos la capa y la red <strong>GND</strong>, y Altium la rellena alrededor de las pistas.',
          'A <strong>copper plane</strong> tied to GND reduces noise and simplifies routing. It is made with <strong>Place → Polygon Pour</strong>: we draw the area over the board, choose the layer and the <strong>GND</strong> net, and Altium fills it around the tracks.',
          [prov(), ph('Polygon Pour sobre la placa conectado a la red GND.', 'Polygon Pour over the board connected to the GND net.')]
        ),
        step(
          'La <strong>serigrafía</strong> (capa Top Overlay) son los textos impresos sobre la placa: designadores, polaridades y nombre. Revisamos que se lean y que <strong>no queden encima de las almohadillas</strong>.',
          'The <strong>silkscreen</strong> (Top Overlay layer) is the text printed on the board: designators, polarities and name. We check that it is legible and that it <strong>does not sit on top of the pads</strong>.',
          [ph('Placa con la serigrafía visible (designadores) sin tapar las almohadillas.', 'Board with visible silkscreen (designators) not covering the pads.')]
        ),
      ],
    },

    // ———————————————————————————————— 13 DRC PCB
    {
      id: 'altium-drc-pcb',
      chip: L('13 · DRC de la PCB', '13 · PCB DRC'),
      title: L('Revisar la PCB antes de fabricar', 'Check the PCB before manufacturing'),
      steps: [
        step(
          'Igual que con el esquemático, corremos un <strong>DRC de la PCB</strong>: <strong>Tools → Design Rule Check…</strong> y <strong>Run Design Rule Check</strong>. Revisa que se cumplan las reglas definidas (separaciones, anchos, conexiones sin rutear, etc.) y genera un reporte con los errores, marcados en la placa.',
          'As with the schematic, we run a <strong>PCB DRC</strong>: <strong>Tools → Design Rule Check…</strong> and <strong>Run Design Rule Check</strong>. It checks that the defined rules are met (clearances, widths, unrouted connections, etc.) and produces a report with the errors, marked on the board.',
          [prov(), ph('Ventana Design Rule Checker y el reporte con la lista de violaciones.', 'Design Rule Checker window and the report with the violations list.'), important('<b>No se manda a fabricar</b> con errores de DRC sin entender. Cada uno se corrige o se justifica.', 'Do <b>not send to manufacturing</b> with DRC errors you do not understand. Each one is fixed or justified.')]
        ),
        step(
          'Como última revisión, miramos la placa en <strong>3D</strong> (tecla <kbd>3</kbd>) para comprobar que las huellas y los conectores quedaron como esperamos.',
          'As a last check, we look at the board in <strong>3D</strong> (the <kbd>3</kbd> key) to confirm the footprints and connectors ended up as expected.',
          [ph('Vista 3D de la placa terminada.', '3D view of the finished board.')]
        ),
      ],
    },

    // ———————————————————————————————— 14 fabricación
    {
      id: 'altium-fabricacion',
      chip: L('14 · Archivos de fabricación', '14 · Manufacturing files'),
      title: L('Generar los archivos de fabricación', 'Generate the manufacturing files'),
      steps: [
        step(
          'Los archivos que necesita el fabricante son los <strong>Gerber</strong> (una capa por archivo: cobre, máscara, serigrafía, contorno) y los de <strong>taladrado</strong> (NC Drill). Se generan desde <strong>File → Fabrication Outputs</strong>: <strong>Gerber Files</strong> y <strong>NC Drill Files</strong>.',
          'The files the manufacturer needs are the <strong>Gerbers</strong> (one layer per file: copper, mask, silkscreen, outline) and the <strong>drill</strong> files (NC Drill). They are generated from <strong>File → Fabrication Outputs</strong>: <strong>Gerber Files</strong> and <strong>NC Drill Files</strong>.',
          [prov(), ph('Menú File → Fabrication Outputs y las ventanas de configuración de Gerber y NC Drill.', 'File → Fabrication Outputs menu and the Gerber and NC Drill setup windows.')]
        ),
        step(
          'Los archivos se guardan en una carpeta (por ejemplo, <code>Project Outputs</code>). Los <strong>comprimimos en un solo .zip</strong>, que es lo que se sube al fabricante.',
          'The files are saved in a folder (for example, <code>Project Outputs</code>). We <strong>compress them into a single .zip</strong>, which is what gets uploaded to the manufacturer.',
          [ph('Carpeta con los archivos Gerber y de taladrado, y el .zip creado.', 'Folder with the Gerber and drill files, and the created .zip.')]
        ),
      ],
    },

    // ———————————————————————————————— 15 JLCPCB
    {
      id: 'altium-jlcpcb',
      chip: L('15 · JLCPCB', '15 · JLCPCB'),
      title: L('Mandar a fabricar a JLCPCB', 'Send it to manufacture at JLCPCB'),
      steps: [
        step(
          'En el sitio de <strong>JLCPCB</strong> entramos a cotizar/ordenar y subimos el <strong>.zip de Gerbers</strong>. JLCPCB lo procesa y muestra una <strong>vista previa</strong> de la placa: revisamos que el contorno, el cobre y los agujeros se vean bien.',
          'On the <strong>JLCPCB</strong> website we go to quote/order and upload the <strong>Gerber .zip</strong>. JLCPCB processes it and shows a <strong>preview</strong> of the board: we check that the outline, the copper and the holes look right.',
          [prov(), ph('Página de JLCPCB con el .zip cargado y la vista previa de la placa.', 'JLCPCB page with the .zip uploaded and the board preview.')]
        ),
        step(
          'Elegimos los parámetros del pedido: <strong>número de capas</strong> (2), <strong>dimensiones</strong> (las lee del archivo), <strong>cantidad</strong>, <strong>grosor</strong> (normalmente 1.6 mm), <strong>color de máscara</strong> y <strong>acabado superficial</strong>. Al final agregamos al carrito y finalizamos el pedido.',
          'We choose the order parameters: <strong>number of layers</strong> (2), <strong>dimensions</strong> (read from the file), <strong>quantity</strong>, <strong>thickness</strong> (usually 1.6 mm), <strong>solder mask colour</strong> and <strong>surface finish</strong>. At the end we add it to the cart and finish the order.',
          [
            ph('Opciones del pedido en JLCPCB con capas, cantidad, grosor, color y acabado señalados.', 'Order options at JLCPCB with layers, quantity, thickness, colour and finish marked.'),
            note('La opción de que JLCPCB también <strong>ensamble</strong> los componentes (SMT) requiere además la lista de materiales (BOM) y el archivo de posiciones; no se cubre en este borrador.', 'The option of having JLCPCB also <strong>assemble</strong> the components (SMT) additionally needs the bill of materials (BOM) and the pick-and-place file; it is not covered in this draft.'),
          ]
        ),
      ],
    },
  ],
}
