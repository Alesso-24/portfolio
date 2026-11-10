// Flujo de Altium Designer: de un proyecto vacío al pedido en JLCPCB.
// ESTADO (2026-11-10): publicado como BORRADOR; el mismo día se integraron las 43 capturas ya recibidas (secciones 1-7) con recuadros naranjas.
// (material en docs-source/.../10-altium/); las secciones 8-14 son PROVISIONALES (flujo estándar de Altium, aún sin
// capturas ni confirmación): su orden y su contenido pueden cambiar cuando Alessandro avance. Cada una lo avisa con un
// bloque `pending`. Los huecos de imagen son bloques `placeholder` (cada uno dice qué mostrar); las capturas reales
// van con recuadros naranjas cuando Alessandro diga que terminó.
// El inglés vive aquí mismo (L(es, en)) y se registra en docs-en.ts vía ALTIUM_EN.
import type { Flow, FlowStep, Block, Shot } from './flow-types'

const tr: Record<string, string> = {}
/** registra la traducción y devuelve el texto en español (la clave del diccionario) */
const L = (es: string, en: string) => {
  tr[es] = en
  return es
}
export const ALTIUM_EN = tr

// Capturas reales (carpeta 10-altium/ dentro de PRACTICA_BASE). Recuadros en PÍXELES de la captura original, medidos con cuadrícula.
const DIR = '10-altium/'
type Pos = 'top' | 'bottom' | 'left' | 'right'
type Pair = [string, string]
type BoxDef = [number, number, number, number, Pair, Pos?]
const S = (file: string, size: [number, number], alt: Pair, caption: Pair, boxes: BoxDef[] = [], wide = true): Shot => ({
  file: DIR + file,
  alt: L(...alt),
  caption: L(...caption),
  size,
  boxes: boxes.length ? boxes.map(([x, y, w, h, lab, pos]) => ({ x, y, w, h, label: L(...lab), pos })) : undefined,
  wide,
})
const shots = (layout: 'auto' | 'row' | 'carousel', ...s: Shot[]): Block => ({ kind: 'shots', shots: s, layout })
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
            shots('auto', S('01-crear-proyecto/01-buscar-abrir-altium-designer.webp', [1918, 1078], ['Buscador de Windows con "altium" escrito y Altium Designer como mejor coincidencia', 'Windows search with "altium" typed and Altium Designer as the best match'], ['Buscamos "altium" en el menú de Windows y abrimos Altium Designer', 'We search "altium" in the Windows menu and open Altium Designer'], [[430, 98, 1062, 48, ['Escribimos "altium"', 'We type "altium"']], [418, 316, 452, 80, ['Altium Designer', 'Altium Designer'], 'bottom']])),
            shots('auto', S('01-crear-proyecto/02-ventana-principal-altium.webp', [1909, 1069], ['Ventana principal de Altium Designer con el panel Projects a la izquierda', 'Altium Designer main window with the Projects panel on the left'], ['Ventana principal de Altium Designer', 'Altium Designer main window'], [[4, 82, 276, 935, ['Panel Projects', 'Projects panel'], 'right']])),
            note('En todo este tutorial se usan <strong>imágenes generales</strong> de la ventana, con recuadros naranjas que señalan de qué se habla.', 'Throughout this tutorial we use <strong>full-window images</strong>, with orange boxes marking what is being talked about.'),
          ]
        ),
        step(
          'Para crear un proyecto nuevo vamos a <strong>File → New → Project…</strong>',
          'To create a new project we go to <strong>File → New → Project…</strong>',
          [shots('auto', S('01-crear-proyecto/04-file-new-project.webp', [1918, 1078], ['Menú File abierto con New y Project… resaltados', 'File menu open with New and Project… highlighted'], ['File → New → Project…', 'File → New → Project…'], [[2, 42, 40, 28, ['File', 'File']], [4, 72, 366, 36, ['New', 'New'], 'bottom'], [372, 72, 268, 36, ['Project…', 'Project…'], 'right']]))]
        ),
        step(
          'Se abre la ventana <strong>Create Project</strong>. Dejamos el tipo <strong>PCB → &lt;Empty&gt;</strong>, escribimos el <strong>nombre del proyecto</strong> y, en <strong>Advanced</strong>, revisamos la <strong>carpeta</strong> y el <strong>Local Storage</strong> (la ubicación en el disco). Con el nombre y la ubicación listos, damos <strong>Create</strong>.',
          'The <strong>Create Project</strong> window opens. We keep the <strong>PCB → &lt;Empty&gt;</strong> type, type the <strong>project name</strong> and, under <strong>Advanced</strong>, check the <strong>folder</strong> and the <strong>Local Storage</strong> (the location on disk). With the name and location ready, we press <strong>Create</strong>.',
          [
            shots('auto', S('01-crear-proyecto/05-ventana-create-project.webp', [1479, 885], ['Ventana Create Project con el tipo PCB Empty seleccionado', 'Create Project window with the PCB Empty type selected'], ['Ventana Create Project: tipo, nombre y botón Create', 'Create Project window: type, name and Create button'], [[282, 135, 427, 30, ['PCB → <Empty>', 'PCB → <Empty>'], 'right'], [750, 118, 682, 34, ['Nombre del proyecto', 'Project name']], [750, 412, 92, 24, ['Advanced', 'Advanced'], 'bottom'], [1236, 836, 112, 38, ['Create', 'Create'], 'top']])),
            shots('auto', S('01-crear-proyecto/06-nombre-proyecto-advanced.webp', [1486, 876], ['Campo de nombre en rojo con un icono de error y el botón Create deshabilitado', 'Name field in red with an error icon and the Create button disabled'], ['Si el nombre ya existe, el campo se pone rojo y Create se deshabilita', 'If the name already exists, the field turns red and Create is disabled'], [[750, 112, 682, 34, ['Nombre repetido', 'Duplicate name']], [1236, 830, 112, 38, ['Create deshabilitado', 'Create disabled'], 'top']])),
            shots('auto', S('01-crear-proyecto/07-ubicacion-local-storage.webp', [1483, 877], ['Ventana Create Project con nombre PCB_ALTIUM, carpeta y Local Storage', 'Create Project window with the name PCB_ALTIUM, the folder and Local Storage'], ['Nombre listo y ubicación en el disco (Folder y Local Storage)', 'Name ready and location on disk (Folder and Local Storage)'], [[750, 115, 682, 34, ['Nombre: PCB_ALTIUM', 'Name: PCB_ALTIUM']], [750, 472, 682, 34, ['Folder', 'Folder']], [750, 547, 682, 34, ['Local Storage', 'Local Storage']], [1236, 833, 112, 38, ['Create', 'Create'], 'top']])),
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
          [shots('auto', S('02-esquematico-y-componentes/08-proyecto-creado-sin-documentos.webp', [1918, 1078], ['Panel Projects con el proyecto nuevo y la carpeta No Document', 'Projects panel with the new project and the No Document folder'], ['El proyecto nuevo aparece sin documentos', 'The new project shows up without documents'], [[44, 308, 214, 30, ['Proyecto nuevo', 'New project'], 'right'], [62, 340, 150, 26, ['No Document', 'No Document'], 'right']])),
            shots('auto', S('02-esquematico-y-componentes/09-clic-derecho-add-new-schematic.webp', [1918, 1078], ['Menú contextual del proyecto con Add New to Project y Schematic resaltados', 'Project context menu with Add New to Project and Schematic highlighted'], ['Clic derecho sobre el proyecto → Add New to Project → Schematic', 'Right-click the project → Add New to Project → Schematic'], [[78, 308, 182, 30, ['Clic derecho aquí', 'Right-click here'], 'top'], [140, 364, 396, 34, ['Add New to Project', 'Add New to Project'], 'left'], [538, 364, 250, 34, ['Schematic', 'Schematic'], 'right']]))]
        ),
        step(
          'Se abre una <strong>hoja vacía</strong> (<code>Sheet1.SchDoc</code>). Presionamos <kbd>Ctrl</kbd>+<kbd>S</kbd> para guardarla, le ponemos el <strong>nombre correcto</strong> (por ejemplo, <code>Esquematico_altium</code>) y damos <strong>Guardar</strong>. La pestaña y el árbol de Projects ya muestran el nombre nuevo.',
          'An <strong>empty sheet</strong> opens (<code>Sheet1.SchDoc</code>). We press <kbd>Ctrl</kbd>+<kbd>S</kbd> to save it, give it the <strong>right name</strong> (for example, <code>Esquematico_altium</code>) and press <strong>Save</strong>. The tab and the Projects tree now show the new name.',
          [shots('auto', S('02-esquematico-y-componentes/10-hoja-esquematico-vacia.webp', [1918, 1078], ['Hoja de esquemático vacía llamada Sheet1.SchDoc', 'Empty schematic sheet called Sheet1.SchDoc'], ['Hoja vacía con el nombre por defecto (Sheet1.SchDoc)', 'Empty sheet with the default name (Sheet1.SchDoc)'], [[292, 84, 190, 30, ['Nombre por defecto', 'Default name'], 'right'], [80, 372, 180, 30, ['En el árbol', 'In the tree'], 'bottom']])),
            shots('auto', S('02-esquematico-y-componentes/11-guardar-como-nombre.webp', [937, 706], ['Diálogo Guardar como con el nombre Esquematico_altium', 'Save As dialog with the name Esquematico_altium'], ['Ctrl+S: escribimos el nombre y damos Guardar', 'Ctrl+S: we type the name and press Save'], [[186, 478, 742, 34, ['Nombre del archivo', 'File name']], [630, 645, 130, 38, ['Guardar', 'Save'], 'top']], false)),
            shots('auto', S('02-esquematico-y-componentes/12-hoja-con-nombre-correcto.webp', [1911, 1069], ['Hoja ya renombrada a Esquematico_altium.SchDoc', 'Sheet already renamed to Esquematico_altium.SchDoc'], ['La pestaña y el árbol ya muestran el nombre nuevo', 'The tab and the tree now show the new name'], [[292, 84, 292, 30, ['Nombre nuevo', 'New name'], 'right'], [80, 372, 180, 30, ['En el árbol', 'In the tree'], 'bottom']]))]
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
          [shots('auto', S('02-esquematico-y-componentes/13-menu-p-part.webp', [1918, 1078], ['Hoja con el menú de la tecla P abierto y Part… resaltado', 'Sheet with the P-key menu open and Part… highlighted'], ['Tecla P → Part…', 'P key → Part…'], [[836, 420, 284, 640, ['Menú de la tecla P', 'P-key menu'], 'left'], [838, 490, 280, 34, ['Part…', 'Part…'], 'right']])),
            shots('auto', S('02-esquematico-y-componentes/14-panel-components.webp', [1918, 1077], ['Panel Components abierto a la derecha de la hoja', 'Components panel open on the right of the sheet'], ['El panel Components se abre a la derecha', 'The Components panel opens on the right'], [[1438, 122, 440, 890, ['Panel Components', 'Components panel'], 'left']]))]
        ),
        step(
          'Arriba del panel hay un <strong>menú desplegable</strong> con todos los grupos de componentes clasificados. Ahí están tanto los <strong>predeterminados de Altium</strong> (Capacitors, Connectors, Resistors, LED, Switches…) como las <strong>librerías que hemos agregado nosotros</strong> (en la sección <strong>File-based libraries</strong>).',
          'At the top of the panel there is a <strong>drop-down menu</strong> with every component group sorted out. It holds both the <strong>Altium defaults</strong> (Capacitors, Connectors, Resistors, LED, Switches…) and the <strong>libraries we have added ourselves</strong> (under <strong>File-based libraries</strong>).',
          [shots('row', S('02-esquematico-y-componentes/15-panel-components-recorte.webp', [436, 910], ['Panel Components con el menú desplegable de categorías arriba', 'Components panel with the category drop-down at the top'], ['El menú desplegable, arriba del panel', 'The drop-down, at the top of the panel'], [[72, 56, 244, 40, ['Menú desplegable', 'Drop-down']]], false),
            S('02-esquematico-y-componentes/16-desplegable-categorias.webp', [382, 748], ['Menú desplegable abierto con los grupos de componentes de Altium', 'Open drop-down with the Altium component groups'], ['Grupos predeterminados de Altium', 'Altium default groups'], [[34, 10, 330, 668, ['Predeterminados', 'Defaults'], 'bottom']], false),
            S('02-esquematico-y-componentes/17-desplegable-librerias-file-based.webp', [372, 786], ['Final de la lista con la sección File-based libraries y las librerías agregadas', 'End of the list with the File-based libraries section and the added libraries'], ['Nuestras librerías (File-based libraries)', 'Our libraries (File-based libraries)'], [[38, 566, 334, 214, ['Librerías propias', 'Our libraries'], 'top']], false))]
        ),
        step(
          'Ejemplo con una <strong>resistencia</strong>: elegimos la categoría <strong>Resistors</strong>. Al seleccionar una, el panel muestra toda su información: su <strong>símbolo</strong> (esquemático), su <strong>vista 3D</strong> y su <strong>huella</strong> (footprint) para la PCB.',
          'Example with a <strong>resistor</strong>: we pick the <strong>Resistors</strong> category. When one is selected, the panel shows all its information: its <strong>symbol</strong> (schematic), its <strong>3D view</strong> and its <strong>footprint</strong> for the PCB.',
          [shots('row', S('03-componentes-y-conexiones/21-panel-components-categorias-resistors.webp', [631, 997], ['Panel Components con las categorías y Resistors resaltada', 'Components panel with the categories and Resistors highlighted'], ['Elegimos la categoría Resistors', 'We pick the Resistors category'], [[54, 534, 154, 154, ['Resistors', 'Resistors'], 'right']], false),
            S('03-componentes-y-conexiones/22-resistors-lista-y-simbolo.webp', [625, 991], ['Lista de resistencias y su símbolo esquemático', 'Resistor list and its schematic symbol'], ['La lista y el símbolo (esquemático)', 'The list and the symbol (schematic)'], [[20, 160, 580, 300, ['Lista de resistencias', 'Resistor list'], 'left'], [42, 702, 520, 235, ['Símbolo', 'Symbol'], 'top']], false)),
            shots('row', S('03-componentes-y-conexiones/23-resistors-vista-3d.webp', [633, 1005], ['Vista 3D de la resistencia seleccionada', '3D view of the selected resistor'], ['Vista 3D del componente', '3D view of the component'], [[51, 580, 520, 292, ['Vista 3D', '3D view'], 'top']], false),
            S('03-componentes-y-conexiones/24-resistors-huella-2d.webp', [627, 1000], ['Huella (footprint) 2D de la resistencia para la PCB', '2D footprint of the resistor for the PCB'], ['Huella (footprint) para la PCB', 'Footprint for the PCB'], [[46, 602, 520, 300, ['Huella', 'Footprint'], 'top']], false))]
        ),
        step(
          'Damos <strong>doble clic</strong> sobre la resistencia que queremos (su valor se puede cambiar después). La resistencia queda <strong>flotando con el cursor</strong> hasta que hacemos clic para colocarla, en cualquier parte de la hoja. Mientras flota, la tecla <kbd>Espacio</kbd> la <strong>rota</strong>.',
          'We <strong>double-click</strong> the resistor we want (its value can be changed later). The resistor stays <strong>floating on the cursor</strong> until we click to place it, anywhere on the sheet. While it floats, the <kbd>Space</kbd> key <strong>rotates</strong> it.',
          [shots('auto', S('03-componentes-y-conexiones/25-doble-clic-resistencia-flotando.webp', [1918, 1078], ['Resistencia seleccionada en el panel Components, lista para colocarse', 'Resistor selected in the Components panel, ready to be placed'], ['Doble clic sobre la resistencia: queda flotando con el cursor', 'Double-click the resistor: it stays floating on the cursor'], [[1312, 262, 570, 28, ['Doble clic aquí', 'Double-click here'], 'left']])),
            shots('auto', S('03-componentes-y-conexiones/26-resistencia-colocada-propiedades.webp', [1918, 1078], ['Resistencia colocada en la hoja con el panel Properties a la derecha', 'Resistor placed on the sheet with the Properties panel on the right'], ['Resistencia colocada y panel Properties', 'Placed resistor and Properties panel'], [[684, 452, 266, 134, ['Resistencia colocada', 'Placed resistor'], 'left'], [1300, 84, 618, 940, ['Panel Properties', 'Properties panel'], 'left']]))]
        ),
        step(
          'Con la resistencia seleccionada, el panel <strong>Properties</strong> permite asignar el <strong>designador</strong> (el nombre en el circuito, como <code>R1</code>). Si queremos otro <strong>valor</strong>, hacemos doble clic sobre el valor mostrado y lo cambiamos (por ejemplo, de 953k a <code>1K</code>).',
          'With the resistor selected, the <strong>Properties</strong> panel lets us assign the <strong>designator</strong> (the name in the circuit, like <code>R1</code>). If we want another <strong>value</strong>, we double-click the displayed value and change it (for example, from 953k to <code>1K</code>).',
          [shots('auto', S('03-componentes-y-conexiones/27-designador-r1.webp', [1918, 1078], ['Campo Designator con R1 en el panel Properties y la resistencia ya llamada R1', 'Designator field with R1 in the Properties panel and the resistor now called R1'], ['Designador R1 en Properties', 'R1 designator in Properties'], [[1484, 332, 302, 34, ['Designator: R1', 'Designator: R1'], 'top'], [736, 452, 60, 50, ['R1', 'R1'], 'top']])),
            shots('row', S('03-componentes-y-conexiones/28-editar-valor-953k.webp', [1918, 1078], ['Campo Value con 953k en el panel Properties', 'Value field with 953k in the Properties panel'], ['Antes: valor 953k', 'Before: value 953k'], [[1484, 514, 366, 34, ['Value', 'Value'], 'top'], [738, 540, 92, 48, ['953k', '953k'], 'bottom']]),
            S('03-componentes-y-conexiones/29-valor-1k.webp', [1918, 1077], ['Campo Value con 1K y el valor ya cambiado en la hoja', 'Value field with 1K and the value already changed on the sheet'], ['Después: valor 1K', 'After: value 1K'], [[1484, 514, 366, 34, ['Value', 'Value'], 'top'], [738, 540, 58, 48, ['1K', '1K'], 'bottom']]))]
        ),
        step(
          'Añadimos otra resistencia y le damos otro designador, <code>R2</code>. Así vamos colocando todos los componentes del circuito.',
          'We add another resistor and give it another designator, <code>R2</code>. That is how we place every component of the circuit.',
          [shots('auto', S('03-componentes-y-conexiones/30-segunda-resistencia-r2.webp', [1918, 1078], ['Hoja con las resistencias R1 y R2 colocadas', 'Sheet with resistors R1 and R2 placed'], ['R1 y R2 colocadas', 'R1 and R2 placed'], [[684, 452, 266, 134, ['R1', 'R1'], 'left'], [684, 642, 266, 134, ['R2', 'R2'], 'left']]))]
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
          [shots('auto', S('03-componentes-y-conexiones/31-menu-p-power-port.webp', [1918, 1078], ['Menú de la tecla P con Power Port resaltado', 'P-key menu with Power Port highlighted'], ['Tecla P → Power Port', 'P key → Power Port'], [[1406, 420, 284, 640, ['Menú de la tecla P', 'P-key menu'], 'left'], [1408, 524, 280, 34, ['Power Port', 'Power Port'], 'left']])),
            shots('row', S('03-componentes-y-conexiones/33-menu-power-port-recorte.webp', [367, 664], ['Detalle del menú con Power Port resaltado', 'Menu detail with Power Port highlighted'], ['Detalle del menú', 'Menu detail'], [[26, 108, 280, 40, ['Power Port', 'Power Port'], 'top']], false),
            S('03-componentes-y-conexiones/32-gnd-colocado-recorte.webp', [774, 526], ['Símbolo GND colocado sobre el pin 1 de la resistencia R1', 'GND symbol placed on pin 1 of resistor R1'], ['GND en el pin 1 de R1', 'GND on pin 1 of R1'], [[160, 156, 164, 70, ['GND', 'GND'], 'top']], false)),
            shots('auto', S('03-componentes-y-conexiones/34-gnd-colocado-en-ambos-lados.webp', [1918, 1078], ['GND colocado en ambos lados de R1 y su configuración en Properties', 'GND placed on both sides of R1 and its setup in Properties'], ['GND a ambos lados y su nombre en Properties', 'GND on both sides and its name in Properties'], [[436, 500, 154, 56, ['GND', 'GND'], 'top'], [826, 500, 160, 56, ['GND', 'GND'], 'top'], [1484, 438, 358, 32, ['Name: GND', 'Name: GND'], 'top']]))]
        ),
        step(
          '<strong>Voltaje (por ejemplo, 3V3).</strong> Repetimos con <strong>Power Port</strong> y lo colocamos. Para <strong>rotarlo</strong> usamos <kbd>Espacio</kbd>. Después le cambiamos el nombre a <code>+3V3</code> en el panel Properties.',
          '<strong>Voltage (for example, 3V3).</strong> We repeat with <strong>Power Port</strong> and place it. To <strong>rotate</strong> it we use <kbd>Space</kbd>. Then we rename it to <code>+3V3</code> in the Properties panel.',
          [shots('auto', S('03-componentes-y-conexiones/35-power-port-renombrado-3v3.webp', [1918, 1078], ['Power Port del lado derecho renombrado a +3V3 en el panel Properties', 'Right-hand Power Port renamed to +3V3 in the Properties panel'], ['Power Port renombrado a +3V3', 'Power Port renamed to +3V3'], [[824, 502, 164, 52, ['+3V3', '+3V3'], 'top'], [1484, 438, 358, 32, ['Name: +3V3', 'Name: +3V3'], 'top']])), note('Con esto queda cubierto todo lo de alimentaciones.', 'That covers everything about power.')]
        ),
        step(
          '<strong>Conexiones en general.</strong> Lo común, y una buena práctica, es usar <strong>etiquetas</strong> en lugar de cables largos: con <kbd>P</kbd> elegimos <strong>Net Label</strong>, la colocamos donde queramos y le damos un nombre (por ejemplo, <code>P1</code>). Cuando colocamos otra etiqueta con <strong>el mismo nombre</strong> en otro componente, Altium las interpreta como <strong>conectadas</strong>.',
          '<strong>Connections in general.</strong> The usual practice, and a good one, is to use <strong>labels</strong> instead of long wires: with <kbd>P</kbd> we pick <strong>Net Label</strong>, place it where we want and give it a name (for example, <code>P1</code>). When we place another label with <strong>the same name</strong> on another component, Altium treats them as <strong>connected</strong>.',
          [shots('row', S('03-componentes-y-conexiones/36-menu-net-label-recorte.webp', [333, 712], ['Detalle del menú de la tecla P con Net Label resaltado', 'P-key menu detail with Net Label highlighted'], ['Tecla P → Net Label', 'P key → Net Label'], [[26, 192, 278, 34, ['Net Label', 'Net Label'], 'top']], false)),
            shots('auto', S('03-componentes-y-conexiones/37-net-label-p1.webp', [1918, 1078], ['Etiqueta de red P1 colocada en el pin de R2 y su nombre en Properties', 'Net label P1 placed on R2 pin and its name in Properties'], ['Etiqueta P1 y su Net Name en Properties', 'P1 label and its Net Name in Properties'], [[856, 644, 44, 50, ['Etiqueta P1', 'P1 label'], 'top'], [1572, 452, 318, 34, ['Net Name', 'Net Name'], 'top']])), important('Las etiquetas solo conectan si el nombre es <b>exactamente el mismo</b> (mayúsculas incluidas).', 'Labels only connect if the name is <b>exactly the same</b> (capitals included).')]
        ),
        step(
          '<strong>Pines que no se usan.</strong> Para dejar un pin sin conexión y que no marque error, con <kbd>P</kbd> vamos a <strong>Directives → Generic No ERC</strong>. Aparece una <strong>X</strong> que colocamos sobre cualquier pin que no vayamos a usar.',
          '<strong>Unused pins.</strong> To leave a pin unconnected without it raising an error, with <kbd>P</kbd> we go to <strong>Directives → Generic No ERC</strong>. An <strong>X</strong> appears and we place it on any pin we will not use.',
          [shots('row', S('03-componentes-y-conexiones/38-directives-generic-no-erc.webp', [498, 670], ['Menú P con Directives abierto y Generic No ERC resaltado', 'P menu with Directives open and Generic No ERC highlighted'], ['Tecla P → Directives → Generic No ERC', 'P key → Directives → Generic No ERC'], [[12, 446, 282, 36, ['Directives', 'Directives'], 'top'], [294, 446, 202, 36, ['Generic No ERC', 'Generic No ERC'], 'bottom']], false),
            S('03-componentes-y-conexiones/39-marca-no-erc-en-pin.webp', [238, 169], ['X roja de No ERC colocada sobre el pin 1 de R2', 'Red No ERC X placed on pin 1 of R2'], ['La X sobre un pin sin usar', 'The X on an unused pin'], [[96, 48, 60, 56, ['X de No ERC', 'No ERC X'], 'top']], false))]
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
            shots('auto', S('04-esquematico-completo-ejemplo/40-esquematico-ejemplo-tamagochi.webp', [1918, 1078], ['Esquemático completo de ejemplo (proyecto TAMAGOCHI) con etiquetas, power ports y marcas No ERC', 'Full example schematic (TAMAGOCHI project) with labels, power ports and No ERC marks'], ['Esquemático completo de ejemplo (TAMAGOCHI)', 'Full example schematic (TAMAGOCHI)'], [[374, 204, 128, 184, ['Etiquetas de red', 'Net labels'], 'top'], [938, 636, 138, 250, ['Power ports +3V3 / GND', '+3V3 / GND power ports'], 'top'], [668, 250, 40, 128, ['X de No ERC', 'No ERC X'], 'right'], [1368, 362, 184, 42, ['Designador y valor', 'Designator and value'], 'top']])),
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
          'Así se ve un esquemático <strong>listo para correr el DRC</strong>: todos los componentes colocados y conectados con etiquetas y alimentaciones, y las marcas No ERC en los pines sin usar.',
          'This is what a schematic <strong>ready to run the DRC</strong> looks like: every component placed and connected with labels and power ports, and No ERC marks on the unused pins.',
          [shots('auto', S('06-importar-cambios-y-reglas/47-esquematico-listo-para-drc.webp', [1919, 1079], ['Esquemático completo de la práctica, listo para correr el DRC', 'Complete schematic of the practice, ready to run the DRC'], ['Esquemático de ejemplo listo para el DRC', 'Example schematic ready for the DRC'], [[404, 118, 1388, 890, ['Esquemático listo', 'Schematic ready'], 'bottom'], [292, 84, 292, 32, ['Hoja del esquemático', 'Schematic sheet'], 'bottom']]))]
        ),
        step(
          'Antes de pasar al diseño de la PCB es <strong>muy importante</strong> correr un <strong>DRC del esquemático</strong>, para ver que no falten conexiones ni haya nada fuera de lugar. Vamos a <strong>Project → Validate PCB Project</strong>.',
          'Before moving on to the PCB design it is <strong>very important</strong> to run a <strong>schematic DRC</strong>, to check that no connections are missing and nothing is out of place. We go to <strong>Project → Validate PCB Project</strong>.',
          [shots('auto', S('05-drc-y-pcb/41-menu-project-validate-pcb-project.webp', [1063, 805], ['Menú Project con Validate PCB Project resaltado', 'Project menu with Validate PCB Project highlighted'], ['Project → Validate PCB Project', 'Project → Validate PCB Project'], [[146, 42, 64, 30, ['Project', 'Project'], 'top'], [146, 72, 492, 34, ['Validate PCB Project', 'Validate PCB Project'], 'right']], false))]
        ),
        step(
          'Se abre el panel <strong>Messages</strong> con los <strong>errores y avisos</strong> encontrados, antes de pasar a editar la PCB. Al seleccionar un mensaje, abajo (<strong>Details</strong>) se explica el problema y se marcan los componentes involucrados.',
          'The <strong>Messages</strong> panel opens with the <strong>errors and warnings</strong> found, before moving on to edit the PCB. Selecting a message shows the problem under <strong>Details</strong> and marks the components involved.',
          [
            shots('auto', S('05-drc-y-pcb/42-mensajes-drc-errores.webp', [1918, 1078], ['Panel Messages con los errores y avisos del DRC y el panel Details', 'Messages panel with the DRC errors and warnings and the Details panel'], ['Panel Messages: errores y avisos del esquemático', 'Messages panel: schematic errors and warnings'], [[1398, 158, 486, 760, ['Errores y avisos', 'Errors and warnings'], 'left'], [1398, 926, 486, 100, ['Details', 'Details'], 'left']])),
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
          [shots('auto', S('05-drc-y-pcb/43-clic-derecho-add-new-pcb.webp', [853, 489], ['Menú contextual del proyecto con Add New to Project y PCB resaltados', 'Project context menu with Add New to Project and PCB highlighted'], ['Clic derecho sobre el proyecto → Add New to Project → PCB', 'Right-click the project → Add New to Project → PCB'], [[140, 64, 398, 38, ['Add New to Project', 'Add New to Project'], 'left'], [540, 98, 250, 36, ['PCB', 'PCB'], 'right']], false))]
        ),
        step(
          'Una vez creada se abre el <strong>editor de PCB</strong>: un tablero negro vacío, con la barra de capas abajo (Top Layer, Bottom Layer, Top Overlay…). Presionamos <kbd>Ctrl</kbd>+<kbd>S</kbd> para guardarlo con el <strong>nombre correcto</strong> y damos <strong>Guardar</strong>; la pestaña pasa a llamarse como el proyecto (<code>PCB_ALTIUM.PcbDoc</code>).',
          'Once created, the <strong>PCB editor</strong> opens: an empty black board, with the layer bar at the bottom (Top Layer, Bottom Layer, Top Overlay…). We press <kbd>Ctrl</kbd>+<kbd>S</kbd> to save it with the <strong>right name</strong> and press <strong>Save</strong>; the tab is renamed after the project (<code>PCB_ALTIUM.PcbDoc</code>).',
          [shots('auto', S('05-drc-y-pcb/44-pcb-nuevo-vacio.webp', [1918, 1045], ['Editor de PCB vacío con la barra de capas abajo', 'Empty PCB editor with the layer bar at the bottom'], ['Editor de PCB: tablero vacío y barra de capas', 'PCB editor: empty board and layer bar'], [[440, 1006, 1478, 38, ['Barra de capas', 'Layer bar'], 'top'], [586, 126, 156, 30, ['Pestaña del PCB', 'PCB tab'], 'bottom']])),
            shots('auto', S('05-drc-y-pcb/45-pestana-pcb-altium-pcbdoc.webp', [235, 60], ['Pestaña del PCB ya renombrada como PCB_ALTIUM.PcbDoc', 'PCB tab already renamed to PCB_ALTIUM.PcbDoc'], ['La pestaña con el nombre correcto', 'The tab with the right name'], [], false))]
        ),
        step(
          'Para pasar todo lo que hicimos en el esquemático a la placa existe <strong>Design → Update Schematics in</strong> <em>(nombre del proyecto)</em><code>.PrjPcb</code>. Pero <strong>a veces no pasa los cambios</strong>, así que lo que de verdad funciona es el paso siguiente: <strong>importarlos</strong>.',
          'To move everything we did in the schematic onto the board there is <strong>Design → Update Schematics in</strong> <em>(project name)</em><code>.PrjPcb</code>. But <strong>sometimes it does not pass the changes</strong>, so what really works is the next step: <strong>importing them</strong>.',
          [
            shots('auto', S('05-drc-y-pcb/46-menu-design-update-schematics.webp', [1024, 685], ['Menú Design con Update Schematics in PCB_ALTIUM.PrjPcb resaltado', 'Design menu with Update Schematics in PCB_ALTIUM.PrjPcb highlighted'], ['Design → Update Schematics in…', 'Design → Update Schematics in…'], [[270, 42, 68, 30, ['Design', 'Design'], 'top'], [272, 74, 434, 34, ['Update Schematics in…', 'Update Schematics in…'], 'right']], false)),
          ]
        ),
        step(
          'Para que los cambios se importen de verdad, en el menú <strong>Design</strong> elegimos <strong>Import Changes From</strong> <em>(nombre del proyecto)</em><code>.PrjPcb</code>.',
          'For the changes to really get imported, in the <strong>Design</strong> menu we choose <strong>Import Changes From</strong> <em>(project name)</em><code>.PrjPcb</code>.',
          [shots('auto', S('06-importar-cambios-y-reglas/48-menu-design-import-changes.webp', [1919, 1058], ['Menú Design con Import Changes From resaltado', 'Design menu with Import Changes From highlighted'], ['Design → Import Changes From…', 'Design → Import Changes From…'], [[270, 42, 70, 30, ['Design', 'Design'], 'top'], [272, 106, 508, 34, ['Import Changes From…', 'Import Changes From…'], 'right']]))]
        ),
        step(
          'Se abre la ventana <strong>Engineering Change Order</strong> con la lista de todos los cambios por hacer (componentes, redes…). Abajo a la izquierda damos clic en <strong>Validate Changes</strong>.',
          'The <strong>Engineering Change Order</strong> window opens with the list of every change to make (components, nets…). At the bottom left we click <strong>Validate Changes</strong>.',
          [
            shots('auto', S('06-importar-cambios-y-reglas/49-ventana-eco.webp', [1919, 1079], ['Ventana Engineering Change Order con la lista de cambios y los botones de abajo', 'Engineering Change Order window with the change list and the buttons below'], ['Ventana Engineering Change Order (ECO)', 'Engineering Change Order (ECO) window'], [[150, 166, 1622, 750, ['Lista de cambios', 'Change list'], 'top'], [158, 868, 158, 38, ['Validate Changes', 'Validate Changes'], 'top']])),
            shots('auto', S('06-importar-cambios-y-reglas/50-eco-validate-changes.webp', [1636, 752], ['Detalle de la ventana ECO con el botón Validate Changes', 'ECO window detail with the Validate Changes button'], ['Validate Changes, abajo a la izquierda', 'Validate Changes, at the bottom left'], [[13, 703, 155, 40, ['Validate Changes', 'Validate Changes'], 'top'], [1146, 88, 430, 28, ['Estado (Check / Done)', 'Status (Check / Done)'], 'bottom']], false)),
          ]
        ),
        step(
          'Si el estado de todo se marca con una <strong>palomita verde</strong> en la columna <strong>Check</strong>, está todo en orden. Se revisa la lista de componentes y también la de redes.',
          'If the status of everything is marked with a <strong>green check</strong> in the <strong>Check</strong> column, all is in order. We review the component list and the net list too.',
          [
            shots('row', S('06-importar-cambios-y-reglas/51-eco-validado-componentes.webp', [1615, 734], ['Componentes validados, todos con palomita verde en Check', 'Components validated, all with a green check in Check'], ['Componentes validados', 'Validated components'], [[1144, 144, 36, 536, ['Check ✔', 'Check ✔'], 'top']], false),
              S('06-importar-cambios-y-reglas/52-eco-validado-redes.webp', [1625, 750], ['Redes validadas, todas con palomita verde en Check', 'Nets validated, all with a green check in Check'], ['Redes validadas', 'Validated nets'], [[1150, 142, 36, 512, ['Check ✔', 'Check ✔'], 'top']], false)),
            important('Si aparece <b>alguna X roja</b> en lugar de la palomita, ese cambio tiene un problema: se corrige en el esquemático y se vuelve a validar.', 'If a <b>red X</b> shows up instead of the check, that change has a problem: fix it in the schematic and validate again.'),
          ]
        ),
        step(
          'Con todo validado damos <strong>Execute Changes</strong>. Ahora la columna <strong>Done</strong> también se llena de palomitas verdes. Cerramos la ventana con <strong>Close</strong>.',
          'With everything validated we click <strong>Execute Changes</strong>. Now the <strong>Done</strong> column also fills with green checks. We close the window with <strong>Close</strong>.',
          [
            shots('row', S('06-importar-cambios-y-reglas/53-eco-validado-lista.webp', [1622, 742], ['Ventana ECO validada con el botón Execute Changes habilitado', 'Validated ECO window with the Execute Changes button enabled'], ['Execute Changes', 'Execute Changes'], [[175, 695, 156, 38, ['Execute Changes', 'Execute Changes'], 'top']], false),
              S('06-importar-cambios-y-reglas/54-eco-ejecutado-done.webp', [1620, 754], ['Ventana ECO con las columnas Check y Done en verde y el botón Close', 'ECO window with the Check and Done columns in green and the Close button'], ['Check y Done en verde; luego Close', 'Check and Done in green; then Close'], [[1148, 112, 100, 540, ['Check y Done ✔', 'Check and Done ✔'], 'top'], [1502, 700, 112, 40, ['Close', 'Close'], 'top']], false)),
          ]
        ),
        step(
          'Ahora aparecen en el editor de PCB todas las <strong>huellas</strong> de nuestros componentes, unidas por sus <strong>conexiones</strong> (las líneas finas), fuera del contorno de la placa. Hay que empezar a <strong>acomodarlas</strong>, tratando de no enredar de más las conexiones.',
          'The <strong>footprints</strong> of all our components now show up in the PCB editor, joined by their <strong>connections</strong> (the thin lines), outside the board outline. We have to start <strong>arranging</strong> them, trying not to tangle the connections more than needed.',
          [
            shots('auto', S('06-importar-cambios-y-reglas/55-placa-con-huellas-y-conexiones.webp', [1919, 1079], ['Editor de PCB con el contorno vacío y las huellas con sus conexiones a un lado', 'PCB editor with the empty outline and the footprints with their connections on one side'], ['Huellas y conexiones listas para acomodar', 'Footprints and connections ready to arrange'], [[512, 314, 748, 498, ['Contorno de la placa', 'Board outline'], 'top'], [1264, 684, 520, 134, ['Huellas con sus conexiones', 'Footprints with their connections'], 'top']])),
            pend('Se importan siempre fuera del contorno (en la captura aparecen a la derecha de la placa); falta confirmar con Alessandro de qué lado le salen normalmente.', 'They are always imported outside the outline (in the capture they appear to the right of the board); it still needs confirming with Alessandro which side they normally land on.'),
          ]
        ),
      ],
    },

    // ———————————————————————————————— 8 reglas (JLCPCB)
    {
      id: 'altium-reglas',
      chip: L('8 · Reglas', '8 · Rules'),
      title: L('Importar las reglas de diseño de JLCPCB', 'Import the JLCPCB design rules'),
      steps: [
        step(
          'Antes de empezar a diseñar hay que <strong>importar las reglas de diseño</strong> del fabricante, que le dicen a Altium qué es aceptable (ancho mínimo de pista, separaciones, agujeros…). Nosotros usaremos <strong>JLCPCB</strong>. Vamos a <strong>Design → Rules…</strong>',
          'Before starting to design we must <strong>import the manufacturer\'s design rules</strong>, which tell Altium what is acceptable (minimum track width, clearances, holes…). We will use <strong>JLCPCB</strong>. We go to <strong>Design → Rules…</strong>',
          [
            shots('auto', S('06-importar-cambios-y-reglas/56-menu-design-rules.webp', [955, 632], ['Menú Design con Rules… resaltado', 'Design menu with Rules… highlighted'], ['Design → Rules…', 'Design → Rules…'], [[270, 42, 70, 30, ['Design', 'Design'], 'top'], [272, 144, 508, 34, ['Rules…', 'Rules…'], 'right']], false)),
            shots('auto', S('06-importar-cambios-y-reglas/57-editor-reglas-default.webp', [1919, 1079], ['Ventana PCB Rules and Constraints Editor con el Default Rule Set', 'PCB Rules and Constraints Editor window with the Default Rule Set'], ['PCB Rules and Constraints Editor', 'PCB Rules and Constraints Editor'], [[374, 184, 286, 30, ['Default Rule Set', 'Default Rule Set'], 'top'], [700, 108, 906, 800, ['Reglas actuales', 'Current rules'], 'top']])),
          ]
        ),
        step(
          'Hacemos <strong>clic derecho</strong> sobre <strong>Default Rule Set</strong> y elegimos <strong>Import Rules…</strong>',
          'We <strong>right-click</strong> <strong>Default Rule Set</strong> and choose <strong>Import Rules…</strong>',
          [shots('auto', S('06-importar-cambios-y-reglas/58-clic-derecho-import-rules.webp', [1343, 975], ['Menú contextual del Default Rule Set con Import Rules… resaltado', 'Default Rule Set context menu with Import Rules… highlighted'], ['Clic derecho en Default Rule Set → Import Rules…', 'Right-click Default Rule Set → Import Rules…'], [[88, 130, 288, 30, ['Default Rule Set', 'Default Rule Set'], 'top'], [248, 274, 234, 34, ['Import Rules…', 'Import Rules…'], 'right']], false))]
        ),
        step(
          'Buscamos el <strong>archivo de reglas</strong> (<code>.RUL</code>) de JLCPCB que descargamos antes (para 2 capas y cobre de 1 oz, <code>2layer-1oz.RUL</code>) y damos <strong>Abrir</strong>.',
          'We look for the JLCPCB <strong>rules file</strong> (<code>.RUL</code>) we downloaded earlier (for 2 layers and 1 oz copper, <code>2layer-1oz.RUL</code>) and press <strong>Open</strong>.',
          [
            shots('auto', S('06-importar-cambios-y-reglas/59-importar-archivo-rul.webp', [943, 713], ['Ventana Import File con el archivo 2layer-1oz.RUL seleccionado', 'Import File window with the 2layer-1oz.RUL file selected'], ['Seleccionamos el archivo .RUL y damos Abrir', 'We select the .RUL file and press Open'], [[266, 220, 112, 160, ['Archivo .RUL', '.RUL file'], 'right'], [186, 601, 428, 38, ['Nombre del archivo', 'File name'], 'top'], [634, 646, 132, 38, ['Abrir', 'Open'], 'top']], false)),
            pend('Falta poner aquí un <strong>botón para descargar</strong> el archivo de reglas de JLCPCB directamente (no se ha confirmado todavía una fuente oficial para enlazarlo).', 'A <strong>download button</strong> for the JLCPCB rules file still needs to go here (an official source to link to has not been confirmed yet).'),
          ]
        ),
        step(
          'Se abre la ventana <strong>Select Design Rules</strong> con todas las reglas que trae el archivo (eléctricas, de ruteo, de máscara, de plano…), todas marcadas. Damos <strong>Import</strong>.',
          'The <strong>Select Design Rules</strong> window opens with every rule the file contains (electrical, routing, mask, plane…), all ticked. We press <strong>Import</strong>.',
          [shots('auto', S('06-importar-cambios-y-reglas/103-seleccionar-reglas-import.webp', [1348, 987], ['Ventana Select Design Rules con el archivo 2layer-1oz.RUL y el botón Import', 'Select Design Rules window with the 2layer-1oz.RUL file and the Import button'], ['Select Design Rules → Import', 'Select Design Rules → Import'], [[378, 66, 260, 64, ['Archivo .RUL', '.RUL file'], 'right'], [368, 144, 600, 760, ['Reglas que se importan', 'Rules being imported'], 'left'], [766, 928, 112, 38, ['Import', 'Import'], 'top']], false))]
        ),
        step(
          'Como ya existe un <em>Default Rule Set</em>, Altium pregunta qué hacer con las reglas importadas. Elegimos <strong>Replace all</strong>: borra las reglas actuales de ese conjunto y deja solo las del archivo de JLCPCB.',
          'Since a <em>Default Rule Set</em> already exists, Altium asks what to do with the imported rules. We choose <strong>Replace all</strong>: it removes the current rules of that set and keeps only the ones from the JLCPCB file.',
          [shots('auto', S('06-importar-cambios-y-reglas/104-rule-set-ya-existe-replace-all.webp', [731, 482], ['Diálogo Rule Set Already Exists con tres opciones y Replace all', 'Rule Set Already Exists dialog with three options and Replace all'], ['Rule Set Already Exists → Replace all', 'Rule Set Already Exists → Replace all'], [[96, 370, 618, 92, ['Replace all', 'Replace all'], 'top']], false))]
        ),
        step(
          'Damos clic en <strong>Apply</strong> (abajo a la derecha) y después en <strong>OK</strong> para cerrar la ventana. Ahora sí podemos empezar a diseñar.',
          'We click <strong>Apply</strong> (bottom right) and then <strong>OK</strong> to close the window. Now we can start designing.',
          [
            shots('row', S('06-importar-cambios-y-reglas/60-editor-reglas-apply.webp', [1347, 976], ['Editor de reglas con el botón Apply', 'Rules editor with the Apply button'], ['Primero Apply', 'First Apply'], [[1210, 924, 122, 38, ['Apply', 'Apply'], 'top']], false),
              S('06-importar-cambios-y-reglas/61-editor-reglas-ok.webp', [1325, 978], ['Editor de reglas con el botón OK', 'Rules editor with the OK button'], ['Después OK', 'Then OK'], [[961, 925, 112, 40, ['OK', 'OK'], 'top']], false)),
          ]
        ),
      ],
    },

    // ———————————————————————————————— 9 origen y forma
    {
      id: 'altium-forma',
      chip: L('9 · Forma de la placa', '9 · Board shape'),
      title: L('Origen y forma de la placa', 'Origin and board shape'),
      steps: [
        step(
          'Primero establecemos un <strong>origen</strong>: el punto (0, 0) desde el que Altium mide todas las coordenadas. Vamos a <strong>Edit → Origin → Set</strong>. Aparece una <strong>cruz verde</strong> y la colocamos donde queramos, normalmente en la <strong>esquina inferior izquierda del fondo negro</strong>. Después el origen queda marcado con una <strong>cruz blanca con un círculo</strong> en esa esquina.',
          'First we set an <strong>origin</strong>: the (0, 0) point from which Altium measures every coordinate. We go to <strong>Edit → Origin → Set</strong>. A <strong>green cross</strong> appears and we place it wherever we want, usually at the <strong>bottom-left corner of the black background</strong>. The origin is then marked with a <strong>white cross with a circle</strong> in that corner.',
          [shots('auto', S('07-origen-y-forma-de-placa/62-menu-edit-origin-set.webp', [749, 768], ['Menú Edit con Origin y Set resaltados', 'Edit menu with Origin and Set highlighted'], ['Edit → Origin → Set', 'Edit → Origin → Set'], [[46, 40, 48, 32, ['Edit', 'Edit'], 'top'], [46, 563, 320, 36, ['Origin', 'Origin'], 'left'], [368, 563, 122, 36, ['Set', 'Set'], 'right']], false))]
        ),
        step(
          'Antes de dibujar, un vistazo a la <strong>barra de herramientas</strong> que flota sobre la zona de trabajo. De izquierda a derecha, cada botón (los que tienen una flechita abajo esconden más herramientas):',
          'Before drawing, a look at the <strong>toolbar</strong> floating over the work area. From left to right, each button (the ones with a small arrow hide more tools):',
          [
            shots('auto', S('07-origen-y-forma-de-placa/63-barra-herramientas-pcb.webp', [752, 80], ['Barra de herramientas del editor de PCB con sus botones numerados', 'PCB editor toolbar with its buttons numbered'], ['Barra de herramientas del editor de PCB', 'PCB editor toolbar'], [[33, 16, 48, 46, ['1', '1'], 'bottom'], [82, 16, 48, 46, ['2', '2'], 'bottom'], [132, 16, 48, 46, ['3', '3'], 'bottom'], [181, 16, 48, 46, ['4', '4'], 'bottom'], [231, 16, 48, 46, ['5', '5'], 'bottom'], [284, 16, 48, 46, ['6', '6'], 'bottom'], [334, 16, 48, 46, ['7', '7'], 'bottom'], [383, 16, 48, 46, ['8', '8'], 'bottom'], [432, 16, 48, 46, ['9', '9'], 'bottom'], [483, 16, 48, 46, ['10', '10'], 'bottom'], [532, 16, 48, 46, ['11', '11'], 'bottom'], [583, 16, 48, 46, ['12', '12'], 'bottom'], [633, 16, 48, 46, ['13', '13'], 'bottom'], [684, 16, 48, 46, ['14', '14'], 'bottom']], false)),
            table(
              [['N.º', 'No.'], ['Herramienta', 'Tool'], ['Para qué sirve', 'What it is for']],
              [
                [['1', '1'], ['Filter', 'Filter'], ['Elegir qué tipos de objetos se pueden seleccionar', 'Choose which object types can be selected']],
                [['2', '2'], ['Snap Options', 'Snap Options'], ['Imán: ajusta el cursor a la cuadrícula y a los objetos', 'Magnet: snaps the cursor to the grid and to objects']],
                [['3', '3'], ['Move', 'Move'], ['Mover objetos', 'Move objects']],
                [['4', '4'], ['Select', 'Select'], ['Seleccionar objetos dibujando un área', 'Select objects by drawing an area']],
                [['5', '5'], ['Align', 'Align'], ['Alinear y distribuir los objetos seleccionados', 'Align and distribute the selected objects']],
                [['6', '6'], ['Component', 'Component'], ['Colocar un componente', 'Place a component']],
                [['7', '7'], ['Route', 'Route'], ['Rutear: dibujar pistas de cobre', 'Route: draw copper tracks']],
                [['8 – 11', '8 – 11'], ['Longitud, pad, polígono…', 'Length, pad, polygon…'], ['Ajuste de longitud de pistas, pads, planos de cobre y otras herramientas de colocación', 'Track length tuning, pads, copper pours and other placement tools']],
                [['12', '12'], ['Dimension', 'Dimension'], ['Poner cotas (medidas) sobre la placa', 'Add dimensions (measurements) to the board']],
                [['13', '13'], ['Text String', 'Text String'], ['Escribir texto sobre la placa', 'Write text on the board']],
                [['14', '14'], ['Drawing tools', 'Drawing tools'], ['Dibujar: Line, Arc, Full Circle, Fill, Solid Region, Rectangle y Bond Wire', 'Draw: Line, Arc, Full Circle, Fill, Solid Region, Rectangle and Bond Wire']],
              ]
            ),
            pend('Los botones 8 a 11 están descritos de forma general; falta que Alessandro confirme el nombre exacto de cada uno.', 'Buttons 8 to 11 are described in general terms; Alessandro still needs to confirm the exact name of each one.'),
          ]
        ),
        step(
          'También hay que conocer las <strong>capas</strong>, que están en la barra de abajo. Cada una es como una hoja transparente donde se dibuja algo distinto:',
          'We also need to know the <strong>layers</strong>, in the bar at the bottom. Each one is like a transparent sheet where something different is drawn:',
          [
            shots('auto', S('07-origen-y-forma-de-placa/67-barra-de-capas.webp', [1081, 51], ['Barra de capas del editor de PCB', 'PCB editor layer bar'], ['Barra de capas', 'Layer bar'], [[152, 12, 152, 32, ['Cobre de arriba', 'Top copper'], 'top'], [310, 12, 166, 32, ['Cobre de abajo', 'Bottom copper'], 'top'], [484, 12, 136, 32, ['Capa mecánica', 'Mechanical layer'], 'top'], [628, 12, 152, 32, ['Serigrafía', 'Silkscreen'], 'top']], false)),
            table(
              [['Capa', 'Layer'], ['Qué es', 'What it is']],
              [
                [['Top Layer / Bottom Layer', 'Top Layer / Bottom Layer'], ['El cobre de arriba y de abajo: ahí van las pistas y los pads', 'The top and bottom copper: tracks and pads go there']],
                [['Mechanical 1', 'Mechanical 1'], ['Capa mecánica: contornos, medidas y dibujos que no son cobre. Aquí dibujaremos el contorno de la placa', 'Mechanical layer: outlines, measurements and drawings that are not copper. This is where we will draw the board outline']],
                [['Top Overlay / Bottom Overlay', 'Top Overlay / Bottom Overlay'], ['La serigrafía: los textos y marcas impresos sobre la placa (designadores, polaridad…)', 'The silkscreen: the text and marks printed on the board (designators, polarity…)']],
                [['Top Paste / Bottom Paste', 'Top Paste / Bottom Paste'], ['Dónde se aplica la pasta de soldar (para montar componentes SMD)', 'Where solder paste is applied (to mount SMD components)']],
                [['Top Solder / Bottom Solder', 'Top Solder / Bottom Solder'], ['La máscara de soldadura: las zonas del cobre que quedan al descubierto', 'The solder mask: the areas of copper left exposed']],
                [['Drill Guide', 'Drill Guide'], ['Guía de los taladros', 'Drill guide']],
                [['LS', 'LS'], ['Selector de conjuntos de capas (Layer Sets)', 'Layer set selector (Layer Sets)']],
              ]
            ),
          ]
        ),
        step(
          'Si ya tenemos una figura donde queremos acomodar todo, podemos <strong>dibujarla o importarla</strong>. Para este caso usaremos un <strong>círculo</strong>. Hacemos clic derecho en la herramienta de <strong>línea</strong> (la última de la barra) y elegimos <strong>Full Circle</strong>.',
          'If we already have a shape where we want to arrange everything, we can <strong>draw it or import it</strong>. For this case we will use a <strong>circle</strong>. We right-click the <strong>line</strong> tool (the last one in the bar) and choose <strong>Full Circle</strong>.',
          [shots('auto', S('07-origen-y-forma-de-placa/64-menu-line-full-circle.webp', [1919, 1078], ['Menú de la herramienta de línea con Full Circle resaltado', 'Line tool menu with Full Circle highlighted'], ['Herramienta de línea → Full Circle', 'Line tool → Full Circle'], [[1404, 168, 52, 48, ['Herramienta de línea', 'Line tool'], 'left'], [1404, 396, 210, 42, ['Full Circle', 'Full Circle'], 'left']]))]
        ),
        step(
          'Seleccionamos el <strong>centro</strong> del círculo con un clic y movemos el cursor hasta darle el tamaño; otro clic lo dibuja.',
          'We click the <strong>center</strong> of the circle and move the cursor to size it; another click draws it.',
          [shots('auto', S('07-origen-y-forma-de-placa/65-circulo-dibujado-origen.webp', [1919, 1079], ['Círculo dibujado en el fondo negro, con su centro y el origen en la esquina', 'Circle drawn on the black background, with its center and the origin in the corner'], ['Círculo dibujado y el origen en la esquina', 'Drawn circle and the origin in the corner'], [[650, 636, 196, 198, ['Círculo', 'Circle'], 'top'], [738, 724, 20, 20, ['Centro', 'Center'], 'bottom'], [556, 876, 46, 46, ['Origen', 'Origin'], 'left']]))]
        ),
        step(
          'Damos <strong>clic derecho</strong> sobre el borde del círculo y elegimos <strong>Properties…</strong>',
          'We <strong>right-click</strong> the edge of the circle and choose <strong>Properties…</strong>',
          [shots('auto', S('07-origen-y-forma-de-placa/66-clic-derecho-properties.webp', [621, 853], ['Menú contextual del círculo con Properties… resaltado', 'Circle context menu with Properties… highlighted'], ['Clic derecho en el borde → Properties…', 'Right-click the edge → Properties…'], [[96, 410, 200, 198, ['Borde del círculo', 'Circle edge'], 'top'], [288, 796, 280, 38, ['Properties…', 'Properties…'], 'left']], false))]
        ),
        step(
          'En el panel <strong>Properties</strong> aparecen las medidas del círculo (Altium lo llama <em>Arc</em>, un arco de 0° a 360°). Estas son las relevantes:',
          'The <strong>Properties</strong> panel shows the circle\'s measurements (Altium calls it an <em>Arc</em>, an arc from 0° to 360°). These are the relevant ones:',
          [
            shots('auto', S('07-origen-y-forma-de-placa/68-propiedades-del-arco.webp', [546, 954], ['Panel Properties del arco con ubicación, capa, ancho, radio y ángulos', 'Arc Properties panel with location, layer, width, radius and angles'], ['Propiedades del círculo (Arc)', 'Circle (Arc) properties'], [[198, 214, 264, 34, ['Location (X/Y)', 'Location (X/Y)'], 'top'], [198, 365, 306, 36, ['Layer', 'Layer'], 'top'], [198, 473, 298, 34, ['Width', 'Width'], 'top'], [198, 515, 298, 34, ['Radius', 'Radius'], 'bottom'], [198, 556, 298, 76, ['Ángulos', 'Angles'], 'bottom']], false)),
            table(
              [['Campo', 'Field'], ['Qué es', 'What it is']],
              [
                [['Location (X/Y)', 'Location (X/Y)'], ['Dónde está el centro del círculo, medido desde el origen', 'Where the center of the circle is, measured from the origin']],
                [['Net', 'Net'], ['La red eléctrica a la que pertenece; es un dibujo, así que queda en No Net', 'The electrical net it belongs to; it is a drawing, so it stays No Net']],
                [['Layer', 'Layer'], ['La capa en la que está dibujado', 'The layer it is drawn on']],
                [['Width', 'Width'], ['El grosor de la línea del círculo', 'The thickness of the circle line']],
                [['Radius', 'Radius'], ['El radio del círculo', 'The radius of the circle']],
                [['Start Angle / End Angle', 'Start Angle / End Angle'], ['Dónde empieza y termina el arco: de 0 a 360 es un círculo completo', 'Where the arc starts and ends: 0 to 360 is a full circle']],
              ]
            ),
          ]
        ),
        step(
          'Lo importante a cambiar es la <strong>capa</strong>: en <strong>Layer</strong> elegimos <strong>Mechanical 1</strong>, que es donde va el contorno de la placa.',
          'The important thing to change is the <strong>layer</strong>: under <strong>Layer</strong> we choose <strong>Mechanical 1</strong>, which is where the board outline goes.',
          [shots('auto', S('07-origen-y-forma-de-placa/69-capa-mechanical-1.webp', [536, 966], ['Lista de capas con Mechanical 1 resaltada', 'Layer list with Mechanical 1 highlighted'], ['Layer → Mechanical 1', 'Layer → Mechanical 1'], [[188, 376, 322, 40, ['Layer', 'Layer'], 'top'], [190, 478, 296, 36, ['Mechanical 1', 'Mechanical 1'], 'right']], false))]
        ),
        step(
          'Otra cosa importante: cambiar las <strong>unidades a milímetros</strong>. Se hace con solo presionar la letra <kbd>Q</kbd>. Con todo en mm, ponemos el <strong>radio</strong> que queramos; para este ejemplo, <code>27.5mm</code> (depende de cada quien y de la forma que elija).',
          'Another important thing: switch the <strong>units to millimetres</strong>. It is done by just pressing the <kbd>Q</kbd> key. With everything in mm, we set the <strong>radius</strong> we want; for this example, <code>27.5mm</code> (it is up to each person and the shape they choose).',
          [note('La tecla <kbd>Q</kbd> alterna entre mm y mil (milésimas de pulgada).', 'The <kbd>Q</kbd> key toggles between mm and mil (thousandths of an inch).')]
        ),
        step(
          'Además, ajustamos la <strong>ubicación</strong> de acuerdo con el radio: si <code>X</code> y <code>Y</code> valen lo mismo que el radio (<code>27.5mm</code>), el círculo queda justo contra el origen. Hay que asegurarse de que la ubicación <strong>no deje la figura fuera del origen</strong>.',
          'We also adjust the <strong>location</strong> according to the radius: if <code>X</code> and <code>Y</code> equal the radius (<code>27.5mm</code>), the circle sits right against the origin. Make sure the location <strong>does not leave the shape outside the origin</strong>.',
          [
            shots('auto', S('07-origen-y-forma-de-placa/72-location-segun-radio.webp', [520, 128], ['Campos Location X e Y con 27.5mm cada uno', 'Location X and Y fields with 27.5mm each'], ['Location = radio (27.5mm, 27.5mm)', 'Location = radius (27.5mm, 27.5mm)'], [[188, 52, 126, 34, ['X = 27.5mm', 'X = 27.5mm'], 'bottom'], [322, 52, 130, 34, ['Y = 27.5mm', 'Y = 27.5mm'], 'bottom']], false)),
            important('Si el centro quedara más cerca del origen que el radio, parte del círculo caería en coordenadas negativas, fuera del origen.', 'If the center were closer to the origin than the radius, part of the circle would fall into negative coordinates, outside the origin.'),
          ]
        ),
        step(
          '¿Cómo le decimos a Altium que lo dibujado es el <strong>contorno de la placa</strong>? Con el círculo seleccionado vamos a <strong>Design → Board Shape → Define Board Shape from Selected Objects</strong>.',
          'How do we tell Altium that what we drew is the <strong>board outline</strong>? With the circle selected we go to <strong>Design → Board Shape → Define Board Shape from Selected Objects</strong>.',
          [shots('auto', S('07-origen-y-forma-de-placa/70-design-board-shape-define.webp', [1052, 543], ['Menú Design → Board Shape con Define Board Shape from Selected Objects resaltado', 'Design → Board Shape menu with Define Board Shape from Selected Objects highlighted'], ['Design → Board Shape → Define Board Shape from Selected Objects', 'Design → Board Shape → Define Board Shape from Selected Objects'], [[2, 6, 72, 34, ['Design', 'Design'], 'top'], [2, 220, 512, 36, ['Board Shape', 'Board Shape'], 'left'], [514, 222, 534, 34, ['Define Board Shape…', 'Define Board Shape…'], 'top']], false))]
        ),
        step(
          'Ahora solo nos queda nuestro <strong>círculo</strong> como placa: lo de fuera se ve gris. Ya podemos empezar a <strong>diseñar</strong> y a <strong>acomodar los componentes</strong>; cómo se acomoden depende de cada quien.',
          'Now only our <strong>circle</strong> is left as the board: what is outside shows grey. We can start <strong>designing</strong> and <strong>arranging the components</strong>; how they are arranged is up to each person.',
          [shots('auto', S('07-origen-y-forma-de-placa/71-contorno-circular-listo.webp', [1919, 1079], ['Placa circular definida con el círculo como contorno y el origen en su esquina', 'Circular board defined with the circle as outline and the origin at its corner'], ['La placa ya tiene forma de círculo', 'The board is now circle-shaped'], [[690, 444, 346, 346, ['Contorno de la placa', 'Board outline'], 'top'], [670, 766, 46, 46, ['Origen', 'Origin'], 'left'], [1570, 482, 306, 40, ['Location', 'Location'], 'left'], [1570, 784, 300, 36, ['Radius = 27.5mm', 'Radius = 27.5mm'], 'left']]))]
        ),
        step(
          'Revisamos el <strong>número de capas</strong> en <strong>Design → Layer Stack Manager</strong>. Para esta placa de práctica se usan <strong>2 capas</strong> (Top y Bottom).',
          'We check the <strong>number of layers</strong> in <strong>Design → Layer Stack Manager</strong>. This practice board uses <strong>2 layers</strong> (Top and Bottom).',
          [prov(), ph('Layer Stack Manager con las dos capas de cobre.', 'Layer Stack Manager with the two copper layers.')]
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
          'Ahora toca <strong>acomodar</strong> los componentes dentro de la placa. Recomendaciones antes de empezar: empezar con los <strong>componentes grandes</strong> y después los <strong>chicos</strong>, y tratar de <strong>no enredar las conexiones</strong> (las líneas finas) a ojo.',
          'Now it is time to <strong>arrange</strong> the components inside the board. Recommendations before starting: begin with the <strong>large components</strong> and then the <strong>small</strong> ones, and try not to <strong>tangle the connections</strong> (the thin lines) by eye.',
          [
            shots('auto', S('08-colocar-y-rutear/82-inicio-acomodar.webp', [1919, 1079], ['Placa circular con algunos componentes ya dentro y el resto todavía fuera', 'Circular board with some components already inside and the rest still outside'], ['Empezamos con los componentes grandes', 'We start with the large components'], [[396, 312, 546, 546, ['Placa', 'Board'], 'top'], [570, 336, 320, 366, ['Ya acomodados', 'Already placed'], 'right'], [984, 682, 836, 150, ['Todavía sin acomodar', 'Not placed yet'], 'top']])),
            note('Un buen orden: primero los conectores y el microcontrolador (lo más grande), después los capacitores y resistencias cerca de los pines que usan.', 'A good order: first the connectors and the microcontroller (the largest), then the capacitors and resistors close to the pins they use.'),
          ]
        ),
        step(
          'Para mover un componente lo arrastramos; mientras lo movemos hay atajos muy útiles:',
          'To move a component we drag it; while moving it, some shortcuts are very useful:',
          [
            table(
              [['Tecla', 'Key'], ['Acción', 'Action']],
              [
                [['Space', 'Space'], ['Rotar 90° mientras arrastras un componente', 'Rotate 90° while dragging a component']],
                [['X', 'X'], ['Espejo horizontal (mirror)', 'Horizontal mirror']],
                [['L', 'L'], ['Pasar el componente al otro lado de la placa (Top ↔ Bottom)', 'Flip the component to the other side of the board (Top ↔ Bottom)']],
                [['Ctrl + Z', 'Ctrl + Z'], ['Deshacer', 'Undo']],
                [['Tab', 'Tab'], ['Abrir Properties mientras colocas', 'Open Properties while placing']],
                [['Q', 'Q'], ['Alternar mils ↔ mm', 'Toggle mils ↔ mm']],
                [['G', 'G'], ['Cambiar el tamaño del grid de snap', 'Change the snap grid size']],
              ]
            ),
            note('Atajos tal como los anotó Alessandro; conviene probarlos en tu versión de Altium.', 'Shortcuts as noted by Alessandro; it is worth trying them in your Altium version.'),
          ]
        ),
        step(
          'Si trabajamos con un componente y queremos pasarlo a la <strong>parte de atrás</strong>, lo seleccionamos y en <strong>Properties</strong> cambiamos su <strong>capa</strong>. Ahorita estamos en la capa superior (<strong>Top Layer</strong>, la roja); la azul es la inferior (<strong>Bottom Layer</strong>).',
          'If we are working with a component and want to move it to the <strong>back side</strong>, we select it and change its <strong>layer</strong> in <strong>Properties</strong>. Right now we are on the top layer (<strong>Top Layer</strong>, the red one); the blue one is the bottom (<strong>Bottom Layer</strong>).',
          [
            shots('auto', S('08-colocar-y-rutear/73-cambiar-capa-top-bottom.webp', [1919, 1079], ['Componente U1 seleccionado y el desplegable de Layer con Top Layer y Bottom Layer', 'Component U1 selected and the Layer drop-down with Top Layer and Bottom Layer'], ['Properties → Layer: Top Layer o Bottom Layer', 'Properties → Layer: Top Layer or Bottom Layer'], [[710, 396, 300, 420, ['U1 en Top Layer', 'U1 on Top Layer'], 'left'], [1572, 372, 306, 108, ['Layer', 'Layer'], 'top']])),
            shots('auto', S('08-colocar-y-rutear/74-componente-en-bottom-espejo.webp', [1919, 1079], ['Componente U1 ya en Bottom Layer, con su texto y sus pines en espejo', 'Component U1 now on Bottom Layer, with its text and pins mirrored'], ['U1 en Bottom Layer: queda en espejo', 'U1 on Bottom Layer: it ends up mirrored'], [[1572, 372, 306, 36, ['Bottom Layer', 'Bottom Layer'], 'top'], [710, 396, 44, 38, ['Texto en espejo', 'Mirrored text'], 'left'], [958, 504, 40, 40, ['Pin 1 ahora a la derecha', 'Pin 1 now on the right'], 'top']])),
            important('Al cambiar de capa los <b>pines se invierten</b> (el componente queda en espejo): hay que tenerlo en cuenta para conectarlo del otro lado.', 'When the layer changes the <b>pins get inverted</b> (the component is mirrored): keep that in mind to connect it from the other side.'),
          ]
        ),
        step(
          'Para cambiar entre vistas: la tecla <kbd>2</kbd> es la <strong>vista 2D</strong> (la de ahorita) y la <kbd>3</kbd> es la <strong>vista 3D</strong>, muy útil para revisar.',
          'To switch views: the <kbd>2</kbd> key is the <strong>2D view</strong> (the current one) and <kbd>3</kbd> is the <strong>3D view</strong>, very useful for checking.',
          [
            shots('row', S('08-colocar-y-rutear/78-vista-2d.webp', [1919, 1079], ['Vista 2D de la placa con U1', '2D view of the board with U1'], ['Tecla 2: vista 2D', 'Key 2: 2D view'], [[826, 360, 292, 420, ['U1 en 2D', 'U1 in 2D'], 'top']], false),
              S('08-colocar-y-rutear/79-vista-3d.webp', [1919, 1079], ['Vista 3D de la placa con U1', '3D view of the board with U1'], ['Tecla 3: vista 3D', 'Key 3: 3D view'], [[776, 400, 330, 410, ['U1 en 3D', 'U1 in 3D'], 'top']], false)),
          ]
        ),
        step(
          'Para movernos en la vista 3D mantenemos la tecla <kbd>Shift</kbd> y movemos con el <strong>clic derecho</strong> del mouse.',
          'To move around in the 3D view we hold the <kbd>Shift</kbd> key and move with the mouse <strong>right button</strong>.',
          [
            shots('row', S('08-colocar-y-rutear/80-vista-3d-mover.webp', [1919, 1079], ['Vista 3D con el icono de movimiento sobre la placa', '3D view with the move icon over the board'], ['Shift + clic derecho para movernos', 'Shift + right click to move around'], [[975, 298, 254, 262, ['Mover la vista', 'Move the view'], 'top']], false),
              S('08-colocar-y-rutear/81-vista-3d-volteada.webp', [1919, 1079], ['Vista 3D volteada para ver la placa por el otro lado', '3D view flipped to see the board from the other side'], ['Vista volteada (Top Layer Flipped)', 'Flipped view (Top Layer Flipped)'], [[858, 390, 254, 262, ['Mover la vista', 'Move the view'], 'top'], [296, 212, 380, 34, ['Top Layer (Flipped)', 'Top Layer (Flipped)'], 'bottom']], false)),
            table(
              [['Tecla / acción', 'Key / action'], ['Para qué', 'What for']],
              [
                [['Ctrl + Shift + H', 'Ctrl + Shift + H'], ['Ajustar la vista a todos los objetos', 'Fit the view to all objects']],
                [['3', '3'], ['Vista 3D (muy útil para revisar)', '3D view (very useful for checking)']],
                [['2', '2'], ['Volver a la vista 2D', 'Back to the 2D view']],
                [['Scroll', 'Scroll'], ['Zoom in / out', 'Zoom in / out']],
                [['Clic de la rueda', 'Wheel click'], ['Pan (mover la vista)', 'Pan (move the view)']],
                [['Shift + clic derecho', 'Shift + right click'], ['Moverse en la vista 3D', 'Move around the 3D view']],
              ]
            ),
          ]
        ),
        step(
          'Sabiendo todo esto vamos acomodando: seleccionamos, movemos, rotamos y revisamos que las conexiones queden lo más ordenadas posible. Aquí ya depende de cada quien y de cómo quiera acomodar.',
          'Knowing all this we keep arranging: we select, move, rotate and check that the connections end up as tidy as possible. From here it depends on each person and how they want to arrange.',
          [
            shots('auto', S('08-colocar-y-rutear/83-acomodando-seleccion.webp', [1919, 1079], ['Varios componentes seleccionados al mismo tiempo mientras se acomodan', 'Several components selected at the same time while being arranged'], ['Podemos seleccionar varios componentes a la vez', 'We can select several components at once'], [[448, 272, 548, 548, ['Placa', 'Board'], 'top'], [1010, 702, 170, 54, ['Por acomodar', 'Still to place'], 'top'], [1398, 1012, 192, 28, ['4 objetos seleccionados', '4 objects selected'], 'top']])),
            shots('auto', S('08-colocar-y-rutear/84-placa-acomodada.webp', [1919, 1079], ['Placa circular con todos los componentes ya acomodados dentro', 'Circular board with all the components arranged inside'], ['Todos los componentes dentro de la placa', 'All the components inside the board'], [[585, 312, 548, 548, ['Componentes acomodados', 'Components arranged'], 'top']])),
          ]
        ),
        step(
          'Ya que lo tengamos de una manera que nos guste, podemos empezar a <strong>rutear</strong>.',
          'Once we have it the way we like, we can start <strong>routing</strong>.',
          []
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
          'Hay <strong>dos maneras</strong> de rutear. La primera es <strong>manual</strong>: nosotros elegimos por dónde va cada pista. Antes que nada hay que estar seguros de haber <strong>importado las reglas de diseño de JLCPCB</strong> (sección 8). Lo hacemos con <kbd>Ctrl</kbd>+<kbd>W</kbd> o con <strong>Route → Interactive Routing</strong>.',
          'There are <strong>two ways</strong> to route. The first is <strong>manual</strong>: we choose where each track goes. First of all we must be sure we have <strong>imported the JLCPCB design rules</strong> (section 8). We do it with <kbd>Ctrl</kbd>+<kbd>W</kbd> or with <strong>Route → Interactive Routing</strong>.',
          [shots('auto', S('08-colocar-y-rutear/87-menu-route-interactive-routing.webp', [1252, 810], ['Menú Route con Interactive Routing resaltado', 'Route menu with Interactive Routing highlighted'], ['Route → Interactive Routing (Ctrl+W)', 'Route → Interactive Routing (Ctrl+W)'], [[399, 42, 64, 28, ['Route', 'Route'], 'top'], [402, 106, 388, 34, ['Interactive Routing', 'Interactive Routing'], 'right']], false))]
        ),
        step(
          'El cursor cambia a una <strong>cruz</strong>. Hacemos clic en un <strong>pad</strong> para empezar la pista, movemos el mouse siguiendo la línea de conexión (<em>ratsnest</em>) hacia el pad destino y hacemos clic en el <strong>pad destino</strong> para completar la conexión. La línea fina desaparece.',
          'The cursor turns into a <strong>cross</strong>. We click a <strong>pad</strong> to start the track, move the mouse following the connection line (<em>ratsnest</em>) toward the destination pad and click the <strong>destination pad</strong> to complete the connection. The thin line disappears.',
          [
            shots('row', S('08-colocar-y-rutear/90-ruteo-cursor-cruz.webp', [660, 308], ['Cursor en forma de cruz verde junto a los pads del conector J1', 'Green cross-shaped cursor next to the pads of connector J1'], ['El cursor se vuelve una cruz', 'The cursor becomes a cross'], [[386, 120, 100, 100, ['Cursor en cruz', 'Cross cursor'], 'bottom']], false),
              S('08-colocar-y-rutear/91-ruteo-pad-inicio.webp', [340, 368], ['Pad 7 del conector J1 (VCC_DISP) con la cruz del cursor encima', 'Pad 7 of connector J1 (VCC_DISP) with the cursor cross over it'], ['Clic en el pad donde empieza la pista', 'Click the pad where the track starts'], [[62, 62, 72, 72, ['Pad de inicio', 'Start pad'], 'top']], false)),
            shots('auto', S('08-colocar-y-rutear/92-ruteo-en-curso.webp', [1919, 1079], ['Pista roja en proceso de ruteo desde el pad 7 de J1 y el panel Interactive Routing', 'Red track being routed from pad 7 of J1 and the Interactive Routing panel'], ['Ruteando: la pista sigue la línea de conexión', 'Routing: the track follows the connection line'], [[846, 336, 100, 330, ['Pista en proceso', 'Track in progress'], 'right'], [1572, 444, 304, 36, ['Layer', 'Layer'], 'top'], [1572, 626, 296, 36, ['Via Diameter', 'Via Diameter'], 'top'], [1572, 668, 296, 36, ['Via Hole Size', 'Via Hole Size'], 'bottom'], [1572, 744, 296, 40, ['Width', 'Width'], 'bottom']])),
            shots('row', S('08-colocar-y-rutear/93-ruteo-pad-destino.webp', [459, 490], ['Pad 1 del capacitor C1 (VCC_DISP) al que llega la pista', 'Pad 1 of capacitor C1 (VCC_DISP) where the track arrives'], ['Clic en el pad destino', 'Click the destination pad'], [[168, 258, 68, 68, ['Pad destino', 'Destination pad'], 'bottom']], false)),
            shots('auto', S('08-colocar-y-rutear/94-pista-completada.webp', [1919, 1079], ['Pista roja completa desde J1 hasta C1', 'Complete red track from J1 to C1'], ['La pista llega al pad destino y la línea fina desaparece', 'The track reaches the destination pad and the thin line disappears'], [[910, 308, 134, 612, ['Pista VCC_DISP', 'VCC_DISP track'], 'right']])),
            note('En el panel <strong>Properties</strong> del ruteo se ven la <strong>capa</strong> (Layer), el diámetro y el agujero de la vía (Via Diameter, Via Hole Size) y el <strong>ancho</strong> de la pista (Width).', 'In the routing <strong>Properties</strong> panel you can see the <strong>layer</strong> (Layer), the via diameter and hole (Via Diameter, Via Hole Size) and the track <strong>width</strong> (Width).'),
          ]
        ),
        step(
          'Atajos durante el ruteo:',
          'Shortcuts while routing:',
          [
            table(
              [['Tecla', 'Key'], ['Acción', 'Action']],
              [
                [['Shift + Space', 'Shift + Space'], ['Cambiar el modo de esquina: 45° → 90° → freestyle', 'Change the corner mode: 45° → 90° → freestyle']],
                [['Backspace', 'Backspace'], ['Borrar el último segmento', 'Delete the last segment']],
                [['* (asterisco del teclado numérico)', '* (numeric keypad asterisk)'], ['Cambiar de Top a Bottom Layer (agrega una vía automáticamente)', 'Switch from Top to Bottom Layer (adds a via automatically)']],
                [['Tab', 'Tab'], ['Cambiar el ancho de la pista', 'Change the track width']],
                [['Esc', 'Esc'], ['Cancelar', 'Cancel']],
              ]
            ),
          ]
        ),
        step(
          'Ahí mismo modificamos la <strong>capa</strong> y todo lo que se rutea. Se puede rutear en <strong>ambas capas</strong>: por ejemplo, esta pista azul está en la <strong>Bottom Layer</strong>.',
          'Right there we change the <strong>layer</strong> and everything that is routed. We can route on <strong>both layers</strong>: for example, this blue track is on the <strong>Bottom Layer</strong>.',
          [shots('auto', S('08-colocar-y-rutear/96-pista-bottom-azul.webp', [1919, 1079], ['Pista azul en la Bottom Layer saliendo del pin 1 de J1', 'Blue track on the Bottom Layer leaving pin 1 of J1'], ['Una pista en la Bottom Layer (azul)', 'A track on the Bottom Layer (blue)'], [[610, 380, 176, 204, ['Pista Bottom (azul)', 'Bottom track (blue)'], 'right'], [1572, 444, 304, 36, ['Layer: Bottom Layer', 'Layer: Bottom Layer'], 'top'], [590, 1008, 172, 28, ['Capa activa', 'Active layer'], 'top']]))]
        ),
        step(
          'Cuando una pista no puede llegar a su destino sin cruzar otra, cambiamos de capa con una <strong>vía</strong>: un agujero metalizado que conecta una pista del Top Layer con el Bottom Layer.',
          'When a track cannot reach its destination without crossing another, we change layer with a <strong>via</strong>: a plated hole that joins a Top Layer track to the Bottom Layer.',
          [
            shots('row', S('08-colocar-y-rutear/99-via-detalle.webp', [138, 129], ['Vía en la red GND, vista de cerca', 'Via on the GND net, close up'], ['Una vía (círculo con punto central)', 'A via (circle with a center dot)'], [], false)),
            shots('auto', S('08-colocar-y-rutear/100-vias-top-y-bottom.webp', [1035, 654], ['Pistas en Top (rojo) y Bottom (azul) unidas por una vía en la red GND', 'Tracks on Top (red) and Bottom (blue) joined by a via on the GND net'], ['Pistas de las dos capas unidas por una vía', 'Tracks on both layers joined by a via'], [[606, 318, 84, 84, ['Vía', 'Via'], 'top'], [130, 130, 330, 390, ['Pista Bottom', 'Bottom track'], 'right'], [210, 510, 440, 100, ['Pista Top', 'Top track'], 'bottom']], false)),
            important('<b>Método 1 (el más común):</b> durante el ruteo con <kbd>Ctrl</kbd>+<kbd>W</kbd>, en el momento en que necesitas cambiar de capa presiona <kbd>*</kbd> (asterisco del teclado numérico). Altium coloca una vía en el punto actual y cambia al otro lado; sigues ruteando. Con <kbd>*</kbd> de nuevo regresas al Top Layer con otra vía.', '<b>Method 1 (the most common):</b> while routing with <kbd>Ctrl</kbd>+<kbd>W</kbd>, at the moment you need to change layer press <kbd>*</kbd> (numeric keypad asterisk). Altium places a via at the current point and switches to the other side; you keep routing. With <kbd>*</kbd> again you go back to the Top Layer with another via.'),
            note('<strong>Método 2 (vía suelta):</strong> sin estar ruteando, con <strong>Place → Via</strong> o los atajos <kbd>P</kbd> y luego <kbd>V</kbd>. Sirve si ya hay dos segmentos y quieres unirlos colocando la vía entre ellos.', '<strong>Method 2 (loose via):</strong> without routing, with <strong>Place → Via</strong> or the <kbd>P</kbd> then <kbd>V</kbd> shortcuts. It is useful if there are already two segments and you want to join them by placing the via between them.'),
            table(
              [['Parámetro', 'Parameter'], ['Mínimo JLCPCB', 'JLCPCB minimum']],
              [
                [['Drill (taladro)', 'Drill (hole)'], ['0.3 mm', '0.3 mm']],
                [['Pad diameter', 'Pad diameter'], ['0.6 mm', '0.6 mm']],
              ]
            ),
            note('En el <strong>Properties</strong> de la vía hay que verificar que cumpla esos mínimos (valores que indicó Alessandro; conviene confirmarlos con las capacidades vigentes de JLCPCB). En la vista 2D las vías son círculos con un punto central y en 3D se ven como los agujeros reales de la placa.', 'In the via <strong>Properties</strong> check that it meets those minimums (values given by Alessandro; it is worth confirming them against JLCPCB\'s current capabilities). In the 2D view vias are circles with a center dot and in 3D they look like the real holes in the board.'),
          ]
        ),
        step(
          'Si bien rutear a mano es válido y profesional, lo <strong>eficiente y óptimo para nosotros</strong> es usar el <strong>autoruteo</strong>. Volvemos a la placa con todo acomodado…',
          'While routing by hand is valid and professional, what is <strong>efficient and optimal for us</strong> is the <strong>autorouter</strong>. We go back to the board with everything arranged…',
          [shots('auto', S('08-colocar-y-rutear/101-placa-lista-para-autoruteo.webp', [1909, 1079], ['Placa circular con todos los componentes acomodados y las líneas de conexión sin rutear', 'Circular board with all the components arranged and the connection lines still unrouted'], ['La placa acomodada, lista para el autoruteo', 'The arranged board, ready for the autorouter'], [[497, 214, 776, 776, ['Placa lista', 'Board ready'], 'top']]))]
        ),
        step(
          '…y vamos a <strong>Route → Auto Route → All…</strong> Se abre el diálogo <strong>Situs Routing Strategies</strong>.',
          '…and we go to <strong>Route → Auto Route → All…</strong> The <strong>Situs Routing Strategies</strong> dialog opens.',
          [shots('auto', S('08-colocar-y-rutear/102-menu-auto-route-all.webp', [1221, 1006], ['Menú Route → Auto Route con All… resaltado', 'Route → Auto Route menu with All… highlighted'], ['Route → Auto Route → All…', 'Route → Auto Route → All…'], [[399, 42, 64, 28, ['Route', 'Route'], 'top'], [402, 504, 388, 36, ['Auto Route', 'Auto Route'], 'left'], [790, 504, 428, 36, ['All…', 'All…'], 'right']], false))]
        ),
        step(
          'Arriba, el <strong>Routing Setup Report</strong> resume si las reglas están bien. Lo importante es que diga <strong>0 Errors y 0 Warnings</strong>: como ya importamos las reglas de JLCPCB, no hay errores. (La única nota es una sugerencia, <em>Hint</em>, sobre una regla SMDNeckDown que no existe; no impide rutear.)',
          'At the top, the <strong>Routing Setup Report</strong> sums up whether the rules are fine. What matters is that it says <strong>0 Errors and 0 Warnings</strong>: since we already imported the JLCPCB rules, there are no errors. (The only note is a suggestion, a <em>Hint</em>, about a missing SMDNeckDown rule; it does not prevent routing.)',
          [shots('auto', S('09-autoruteo-drc-y-texto/106-situs-sin-errores.webp', [945, 1051], ['Diálogo Situs Routing Strategies con 0 errores y 0 warnings', 'Situs Routing Strategies dialog with 0 errors and 0 warnings'], ['Situs Routing Strategies: ya no hay errores', 'Situs Routing Strategies: there are no errors anymore'], [[54, 124, 800, 62, ['0 Errors · 0 Warnings', '0 Errors · 0 Warnings'], 'right']], false))]
        ),
        step(
          'Abajo se elige la <strong>estrategia de ruteo</strong>. Dejamos <strong>Default 2 Layer Board</strong> (la estrategia por defecto para placas de dos capas) y damos <strong>Route All</strong>.',
          'At the bottom we pick the <strong>routing strategy</strong>. We keep <strong>Default 2 Layer Board</strong> (the default strategy for two-layer boards) and press <strong>Route All</strong>.',
          [
            shots('auto', S('09-autoruteo-drc-y-texto/107-situs-route-all.webp', [939, 1040], ['Diálogo Situs con Default 2 Layer Board seleccionada y el botón Route All', 'Situs dialog with Default 2 Layer Board selected and the Route All button'], ['Default 2 Layer Board → Route All', 'Default 2 Layer Board → Route All'], [[42, 635, 870, 26, ['Default 2 Layer Board', 'Default 2 Layer Board'], 'top'], [698, 988, 112, 38, ['Route All', 'Route All'], 'top']], false)),
            pend('Faltan por documentar los demás botones del diálogo (Edit Layer Directions, Edit Rules, Lock All Pre-routes, Rip-up Violations After Routing) y cuándo conviene usar otra estrategia.', 'The other buttons of the dialog (Edit Layer Directions, Edit Rules, Lock All Pre-routes, Rip-up Violations After Routing) and when another strategy is worth using are still to be documented.'),
          ]
        ),
        step(
          'Y veremos cómo <strong>rutea todo</strong>. En el panel <strong>Messages</strong> aparece el avance (por ejemplo, <em>26 of 46 connections</em>) hasta que termina con <strong>46 of 46 connections</strong> y el mensaje <em>Situs Routing finished</em>.',
          'And we will see it <strong>route everything</strong>. The <strong>Messages</strong> panel shows the progress (for example, <em>26 of 46 connections</em>) until it ends with <strong>46 of 46 connections</strong> and the <em>Situs Routing finished</em> message.',
          [
            shots('row', S('09-autoruteo-drc-y-texto/108-autoruteo-en-progreso.webp', [1919, 1079], ['Autoruteo en proceso con algunas pistas dibujadas y el panel Messages', 'Autorouting in progress with some tracks drawn and the Messages panel'], ['Ruteando: 26 de 46 conexiones', 'Routing: 26 of 46 connections'], [[497, 214, 776, 776, ['Placa', 'Board'], 'top'], [1398, 500, 505, 52, ['Avance', 'Progress'], 'left']], false),
              S('09-autoruteo-drc-y-texto/109-autoruteo-terminado.webp', [1919, 1079], ['Autoruteo terminado: todas las pistas dibujadas y Routing finished en Messages', 'Autorouting finished: all tracks drawn and Routing finished in Messages'], ['Terminado: 46 de 46 conexiones', 'Finished: 46 of 46 connections'], [[497, 214, 776, 776, ['Placa ruteada', 'Routed board'], 'top'], [1398, 792, 505, 32, ['Routing finished', 'Routing finished'], 'left']], false)),
          ]
        ),
        step(
          'Podemos usar la <strong>vista 3D</strong> (tecla <kbd>3</kbd>) para verificar cómo quedó la placa.',
          'We can use the <strong>3D view</strong> (the <kbd>3</kbd> key) to check how the board turned out.',
          [shots('auto', S('09-autoruteo-drc-y-texto/111-vista-3d-ruteada.webp', [1919, 1079], ['Vista 3D de la placa ruteada con los componentes y las pistas', '3D view of the routed board with the components and the tracks'], ['Placa ruteada en 3D', 'Routed board in 3D'], [[444, 214, 866, 792, ['Placa en 3D', 'Board in 3D'], 'top']]))]
        ),
      ],
    },

    // ———————————————————————————————— 12 DRC PCB
    {
      id: 'altium-drc-pcb',
      chip: L('12 · DRC de la PCB', '12 · PCB DRC'),
      title: L('Revisar la PCB antes de fabricar', 'Check the PCB before manufacturing'),
      steps: [
        step(
          'Ahora corremos el <strong>DRC</strong> para verificar que no haya violaciones de las reglas de diseño: <strong>Tools → Design Rule Check…</strong>',
          'Now we run the <strong>DRC</strong> to check there are no violations of the design rules: <strong>Tools → Design Rule Check…</strong>',
          [shots('auto', S('09-autoruteo-drc-y-texto/112-menu-tools-drc.webp', [1038, 616], ['Menú Tools con Design Rule Check… resaltado', 'Tools menu with Design Rule Check… highlighted'], ['Tools → Design Rule Check…', 'Tools → Design Rule Check…'], [[340, 40, 64, 30, ['Tools', 'Tools'], 'top'], [342, 72, 456, 34, ['Design Rule Check…', 'Design Rule Check…'], 'right']], false))]
        ),
        step(
          'Se abre la ventana <strong>Design Rule Checker</strong>. Dejamos las opciones por defecto (con <strong>Create Report File</strong> marcado, para que genere el informe) y damos <strong>Run Design Rule Check…</strong>',
          'The <strong>Design Rule Checker</strong> window opens. We keep the default options (with <strong>Create Report File</strong> ticked, so it generates the report) and press <strong>Run Design Rule Check…</strong>',
          [shots('auto', S('09-autoruteo-drc-y-texto/113-drc-run.webp', [1139, 1046], ['Ventana Design Rule Checker con Create Report File y el botón Run Design Rule Check', 'Design Rule Checker window with Create Report File and the Run Design Rule Check button'], ['Design Rule Checker → Run', 'Design Rule Checker → Run'], [[353, 118, 192, 32, ['Create Report File', 'Create Report File'], 'right'], [2, 992, 236, 38, ['Run Design Rule Check…', 'Run Design Rule Check…'], 'top']], false))]
        ),
        step(
          'Se abre el <strong>Design Rule Verification Report</strong>, donde se detallan todas las violaciones a las reglas de diseño. Arriba aparecen el número de <strong>Warnings</strong> y de <strong>Rule Violations</strong>; las violaciones también se listan en el panel <strong>Messages</strong>.',
          'The <strong>Design Rule Verification Report</strong> opens, detailing every violation of the design rules. At the top it shows the number of <strong>Warnings</strong> and <strong>Rule Violations</strong>; the violations are also listed in the <strong>Messages</strong> panel.',
          [
            shots('auto', S('09-autoruteo-drc-y-texto/114-informe-drc.webp', [1919, 1079], ['Informe de verificación de reglas con 0 warnings y 22 violaciones, y el panel Messages', 'Rule verification report with 0 warnings and 22 violations, and the Messages panel'], ['El informe del DRC', 'The DRC report'], [[1214, 418, 134, 84, ['0 Warnings · 22 Violations', '0 Warnings · 22 Violations'], 'left'], [1398, 130, 505, 790, ['Messages', 'Messages'], 'left']])),
            shots('auto', S('09-autoruteo-drc-y-texto/115-informe-resumen.webp', [1090, 937], ['Resumen del informe: Warnings 0 y la lista de reglas con su número de violaciones', 'Report summary: Warnings 0 and the rule list with its violation count'], ['Resumen: 0 warnings y la lista de reglas', 'Summary: 0 warnings and the rule list'], [[12, 346, 1048, 64, ['Warnings: 0', 'Warnings: 0'], 'top'], [12, 446, 1048, 480, ['Reglas y violaciones', 'Rules and violations'], 'right']], false)),
          ]
        ),
        step(
          'En nuestro caso aparecen <strong>22 Rule Violations</strong>: 20 de <em>Silk To Solder Mask Clearance</em> (la serigrafía de los capacitores y resistencias queda a 0.125 mm de la máscara de soldadura, cuando la regla pide 0.127 mm) y 2 de <em>Board Clearance</em> (textos de la serigrafía muy cerca del borde de la placa). Son <strong>estéticos</strong>: no afectan nada eléctrico y la placa <strong>se puede mandar a producir</strong>.',
          'In our case there are <strong>22 Rule Violations</strong>: 20 of <em>Silk To Solder Mask Clearance</em> (the silkscreen of the capacitors and resistors sits 0.125 mm from the solder mask, when the rule asks for 0.127 mm) and 2 of <em>Board Clearance</em> (silkscreen texts very close to the board edge). They are <strong>cosmetic</strong>: they affect nothing electrical and the board <strong>can be sent to production</strong>.',
          [
            shots('row', S('09-autoruteo-drc-y-texto/116-informe-silk-solder-mask.webp', [1088, 959], ['Lista de violaciones Silk To Solder Mask Clearance entre pads y serigrafía', 'List of Silk To Solder Mask Clearance violations between pads and silkscreen'], ['Silk To Solder Mask Clearance (20)', 'Silk To Solder Mask Clearance (20)'], [[12, 152, 1048, 38, ['Silk To Solder Mask', 'Silk To Solder Mask'], 'top'], [840, 96, 220, 34, ['Total: 22', 'Total: 22'], 'bottom']], false),
              S('09-autoruteo-drc-y-texto/117-informe-board-clearance.webp', [1079, 927], ['Violaciones de Board Clearance entre el borde de la placa y los textos J1 y J4', 'Board Clearance violations between the board edge and the J1 and J4 texts'], ['Board Clearance (2)', 'Board Clearance (2)'], [[6, 740, 1048, 40, ['Board Clearance', 'Board Clearance'], 'top'], [12, 784, 1048, 68, ['Textos J1 y J4', 'J1 and J4 texts'], 'bottom']], false)),
            important('Lo importante es que <b>no haya warnings</b>. Si aparece alguno, hay que revisarlo y corregirlo antes de fabricar.', 'What matters is that there are <b>no warnings</b>. If one shows up, it must be reviewed and fixed before manufacturing.'),
          ]
        ),
      ],
    },

    // ———————————————————————————————— 13 texto y logo
    {
      id: 'altium-cobre',
      chip: L('13 · Texto y logo', '13 · Text and logo'),
      title: L('Texto y logo en la serigrafía', 'Text and logo on the silkscreen'),
      steps: [
        step(
          'Sabiendo que la placa no tiene warnings, podemos pasar a cosas como agregar <strong>texto o un logo</strong> en la capa <strong>Top Overlay</strong> (la serigrafía de arriba, la <strong>amarilla</strong>). Primero seleccionamos la capa <strong>Top Overlay</strong> en la barra inferior y luego vamos a <strong>Place → String</strong> (o el atajo <kbd>P</kbd> y luego <kbd>S</kbd>).',
          'Knowing the board has no warnings, we can move on to things like adding <strong>text or a logo</strong> on the <strong>Top Overlay</strong> layer (the top silkscreen, the <strong>yellow</strong> one). First we select the <strong>Top Overlay</strong> layer in the bottom bar and then go to <strong>Place → String</strong> (or the <kbd>P</kbd> then <kbd>S</kbd> shortcut).',
          [
            shots('auto', S('09-autoruteo-drc-y-texto/118-menu-place-string.webp', [723, 653], ['Menú Place con String resaltado', 'Place menu with String highlighted'], ['Place → String', 'Place → String'], [[212, 38, 66, 32, ['Place', 'Place'], 'top'], [216, 348, 334, 36, ['String', 'String'], 'right']], false)),
            shots('auto', S('09-autoruteo-drc-y-texto/119-string-flotando.webp', [261, 230], ['Texto String flotando con el cursor, en rojo', 'String text floating with the cursor, in red'], ['El texto flota con el cursor', 'The text floats with the cursor'], [[80, 92, 128, 42, ['String (en rojo)', 'String (in red)'], 'bottom']], false)),
            important('Si el texto sale en <b>rojo</b>, está en la capa <b>Top Layer</b> (cobre) y no en la serigrafía: hay que cambiarlo a <b>Top Overlay</b> (amarilla). Alessandro lo tuvo que cambiar después porque no lo había hecho antes.', 'If the text shows up in <b>red</b>, it is on the <b>Top Layer</b> (copper) and not on the silkscreen: it must be changed to <b>Top Overlay</b> (yellow). Alessandro had to change it afterwards because he had not done it before.'),
          ]
        ),
        step(
          'Con el texto seleccionado, en <strong>Properties</strong> cambiamos la capa a <strong>Top Overlay</strong> y podemos modificar el <strong>texto</strong>, la <strong>altura</strong> (Text Height), el tipo y la <strong>fuente</strong> (Font) y el <strong>grosor del trazo</strong> (Stroke Width).',
          'With the text selected, in <strong>Properties</strong> we change the layer to <strong>Top Overlay</strong> and can edit the <strong>text</strong>, the <strong>height</strong> (Text Height), the type and the <strong>font</strong> (Font) and the <strong>stroke width</strong> (Stroke Width).',
          [shots('auto', S('09-autoruteo-drc-y-texto/120-propiedades-string.webp', [1919, 1079], ['Texto String seleccionado y su panel Properties con capa, altura, tipo de fuente y grosor', 'Selected String text and its Properties panel with layer, height, font type and stroke width'], ['Propiedades del texto', 'Text properties'], [[390, 478, 196, 62, ['Texto', 'Text'], 'top'], [1572, 392, 306, 36, ['Text', 'Text'], 'top'], [1572, 433, 306, 36, ['Layer: Top Overlay', 'Layer: Top Overlay'], 'top'], [1572, 505, 306, 34, ['Text Height', 'Text Height'], 'bottom'], [1406, 592, 472, 42, ['Font Type', 'Font Type'], 'top'], [1572, 683, 306, 36, ['Font', 'Font'], 'top'], [1572, 724, 306, 36, ['Stroke Width', 'Stroke Width'], 'bottom']]))]
        ),
        step(
          'Y acomodando los textos podemos poner, por ejemplo, el <strong>nombre del proyecto</strong> y los <strong>diseñadores</strong>. En la vista 3D se ve cómo quedan impresos sobre la placa.',
          'And by arranging the texts we can put, for example, the <strong>project name</strong> and the <strong>designers</strong>. The 3D view shows how they end up printed on the board.',
          [
            shots('row', S('09-autoruteo-drc-y-texto/122-texto-disenadores-alux.webp', [1919, 1077], ['Placa con el texto designed by Alexa and Alessandro y el nombre Alux sobre la serigrafía', 'Board with the text designed by Alexa and Alessandro and the name Alux on the silkscreen'], ['Textos acomodados en la placa', 'Texts arranged on the board'], [[845, 548, 296, 94, ['Diseñadores', 'Designers'], 'top'], [527, 712, 182, 88, ['Nombre del proyecto', 'Project name'], 'top']], false),
              S('09-autoruteo-drc-y-texto/124-vista-3d-texto.webp', [1911, 1079], ['Vista 3D de la placa con los textos impresos', '3D view of the board with the printed texts'], ['Los textos en la vista 3D', 'The texts in the 3D view'], [[815, 470, 272, 104, ['Diseñadores', 'Designers'], 'top'], [603, 695, 142, 84, ['Alux', 'Alux'], 'top']], false)),
          ]
        ),
        step(
          'Si queremos añadir un <strong>logo o una imagen</strong>, se hace desde el mismo menú <strong>Place</strong> (la opción <strong>Graphics</strong>, que aparece en el menú).',
          'If we want to add a <strong>logo or an image</strong>, it is done from the same <strong>Place</strong> menu (the <strong>Graphics</strong> option, which shows in the menu).',
          [pend('Falta documentar paso a paso cómo se añade el logo (formato de imagen, tamaño y capa). Alessandro lo mandará en la siguiente tanda.', 'How to add the logo step by step (image format, size and layer) is still missing. Alessandro will send it in the next batch.')]
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
