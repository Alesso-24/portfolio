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
          'Para pasar todo lo que hicimos en el esquemático a la placa vamos a <strong>Design → Update Schematics in</strong> <em>(nombre del proyecto)</em><code>.PrjPcb</code>.',
          'To move everything we did in the schematic onto the board we go to <strong>Design → Update Schematics in</strong> <em>(project name)</em><code>.PrjPcb</code>.',
          [
            shots('auto', S('05-drc-y-pcb/46-menu-design-update-schematics.webp', [1024, 685], ['Menú Design con Update Schematics in PCB_ALTIUM.PrjPcb resaltado', 'Design menu with Update Schematics in PCB_ALTIUM.PrjPcb highlighted'], ['Design → Update Schematics in…', 'Design → Update Schematics in…'], [[270, 42, 68, 30, ['Design', 'Design'], 'top'], [272, 74, 434, 34, ['Update Schematics in…', 'Update Schematics in…'], 'right']], false)),
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
