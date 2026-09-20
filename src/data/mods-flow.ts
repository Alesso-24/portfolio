// Guía paso a paso de mods (SRM-20) para la Práctica 1 — fuente de verdad del paso "9".
// Las coordenadas están en PÍXELES de cada captura (mismo formato que <AnnotatedShot>).
// Material crudo y bitácora: docs-source/produccion-electronica/practicas/01-primera-placa/07-monofab-mods/

export const MODS_IMG_BASE = '/portfolio/images/docs/produccion-electronica/practicas/01-primera-placa/07-monofab-mods/'

export interface ModsBox {
  x: number
  y: number
  w: number
  h: number
  label: string
  pos?: 'top' | 'bottom' | 'left' | 'right'
  nudge?: number
}

export interface ModsShot {
  /** ruta relativa a MODS_IMG_BASE */
  file: string
  size: [number, number]
  alt: string
  caption?: string
  boxes?: ModsBox[]
  /** usar el tope de altura ampliado (capturas altas y angostas) */
  wide?: boolean
}

export interface ModsStep {
  /** HTML simple (strong/code/a) — contenido estático del repo */
  html: string
  /** nodo del grafo general que se señala (clave de MODS_NODES); si no hay, no se muestra el grafo general */
  node?: keyof typeof MODS_NODES
  /** aviso destacado bajo el paso */
  important?: string
  shots: ModsShot[]
}

export interface ModsFlow {
  id: string
  toc: string
  title: string
  intro: string
  /** valores clave del archivo (chips) */
  values: { k: string; v: string }[]
  steps: ModsStep[]
}

export const MODS_GENERAL = {
  file: '00-programa-mill-2d-pcb/07-grafo-completo-cargado.webp',
  size: [1918, 1078] as [number, number],
  alt: 'Grafo completo "Roland Monofab PCB" en mods, con todos los nodos conectados',
}

/** Recuadro de cada nodo sobre MODS_GENERAL (medidas aproximadas, ±5 px). */
export const MODS_NODES = {
  'read SVG': { x: 38, y: 218, w: 226, h: 236 },
  'convert SVG image': { x: 300, y: 252, w: 246, h: 224 },
  'set PCB defaults': { x: 107, y: 742, w: 130, h: 195 },
  'mill raster 2D': { x: 588, y: 526, w: 280, h: 282 },
  'simulate toolpath': { x: 826, y: 615, w: 240, h: 165 },
  'Roland SRM-20 milling machine': { x: 1034, y: 714, w: 146, h: 180 },
  'save file': { x: 1356, y: 852, w: 122, h: 80 },
} as const

/** Nombre corto para la etiqueta "Aquí: …" cuando el nombre completo no cabe en móvil. */
export const MODS_NODE_LABEL: Partial<Record<keyof typeof MODS_NODES, string>> = {
  'Roland SRM-20 milling machine': 'Roland SRM-20',
}

/** Los nodos que se tocan, numerados, para el mapa general (etiqueta = número; leyenda debajo). */
export const MODS_MAP_LEGEND = [
  'read SVG',
  'convert SVG image (solo en las pistas: botón invert)',
  'set PCB defaults',
  'mill raster 2D',
  'Roland SRM-20 milling machine',
  'save file',
]
export const MODS_MAP: ModsBox[] = [
  { ...MODS_NODES['read SVG'], label: '1', pos: 'top' },
  { ...MODS_NODES['convert SVG image'], label: '2', pos: 'top' },
  { ...MODS_NODES['set PCB defaults'], label: '3', pos: 'top' },
  { ...MODS_NODES['mill raster 2D'], label: '4', pos: 'top' },
  { ...MODS_NODES['Roland SRM-20 milling machine'], label: '5', pos: 'top' },
  { ...MODS_NODES['save file'], label: '6', pos: 'top' },
]

const READ_SVG_BTN: ModsShot = {
  file: '00-programa-mill-2d-pcb/08-nodo-read-svg-vacio-start-here.webp',
  size: [885, 916],
  alt: 'Nodo read SVG vacío con el botón select SVG file',
  caption: 'Nodo read SVG — botón select SVG file',
  boxes: [{ x: 298, y: 602, w: 146, h: 38, label: 'Clic en select SVG file', pos: 'top' }],
}

const RELOAD = 'Recarga la página de mods (<code>F5</code>): el grafo vuelve a su estado inicial.'

export const MODS_OPEN: ModsStep[] = [
  {
    html: 'Abre <a href="https://modsproject.org/" target="_blank" rel="noopener noreferrer" style="color:#2540c0;">modsproject.org</a>. Aparece un lienzo vacío. Arriba a la izquierda está el botón <strong>Programs</strong>: haz clic ahí.',
    shots: [
      {
        file: '00-programa-mill-2d-pcb/01-canvas-vacio.webp',
        size: [1918, 1078],
        alt: 'Lienzo vacío de mods con el botón Programs arriba a la izquierda',
        caption: 'Lienzo vacío de mods',
        boxes: [{ x: 24, y: 56, w: 156, h: 58, label: 'Clic en Programs', pos: 'right' }],
      },
    ],
  },
  {
    html: 'En el buscador escribe <code>SRM</code>. Dentro de <strong>SRM-20 mill</strong> elige <strong>mill 2D PCB</strong>.',
    shots: [
      {
        file: '00-programa-mill-2d-pcb/05-buscar-srm-completo.webp',
        size: [418, 805],
        alt: 'Menú Programs filtrado por SRM con la opción mill 2D PCB',
        caption: 'Programs → buscar "SRM" → mill 2D PCB',
        wide: true,
        boxes: [
          { x: 16, y: 200, w: 386, h: 49, label: 'Escribir SRM', pos: 'top' },
          { x: 14, y: 455, w: 386, h: 65, label: 'Elegir mill 2D PCB', pos: 'top' },
        ],
      },
    ],
  },
]

export const MODS_FLOWS: ModsFlow[] = [
  {
    id: 'mods-periferia',
    toc: '9.2 Periferia',
    title: 'PERIFERIA — corte del contorno',
    intro: 'Genera <code>PERIFERIA.rml</code>: la trayectoria con la que la fresa corta el contorno octagonal de la placa.',
    values: [
      { k: 'Preset', v: '1.59mm cutout' },
      { k: 'Tool diameter', v: '1.9 mm' },
      { k: 'Offset number', v: '2' },
      { k: 'Origen', v: '0, 0, 0' },
      { k: 'Velocidad', v: '4 mm/s' },
    ],
    steps: [
      {
        html: `${RELOAD} En el primer bloque, <strong>read SVG</strong>, pulsa <strong>select SVG file</strong> para importar un SVG.`,
        node: 'read SVG',
        shots: [READ_SVG_BTN],
      },
      {
        html: 'Elige el SVG de la periferia (<code>PERIFERIA</code>) y pulsa <strong>Abrir</strong>. El orden en que se procesan los tres archivos no importa: lo que cuenta es terminar con los tres <code>.rml</code>.',
        node: 'read SVG',
        shots: [
          {
            file: '01-periferia-contorno/01-abrir-periferia-svg.webp',
            size: [1402, 985],
            alt: 'Diálogo Abrir de Windows con el archivo PERIFERIA seleccionado',
            caption: 'Diálogo Abrir — PERIFERIA',
            boxes: [
              { x: 333, y: 452, w: 1067, h: 42, label: 'Elegir PERIFERIA', pos: 'top' },
              { x: 1099, y: 914, w: 106, h: 38, label: 'Abrir', pos: 'top' },
            ],
          },
        ],
      },
      {
        html: 'Debe verse el contorno octagonal cargado, tanto en <strong>read SVG</strong> como en <strong>convert SVG image</strong>.',
        node: 'read SVG',
        shots: [
          {
            file: '01-periferia-contorno/02-read-svg-periferia-cargado.webp',
            size: [1918, 1078],
            alt: 'read SVG y convert SVG image con el contorno octagonal de PERIFERIA cargado',
            caption: 'PERIFERIA cargada en read SVG y convert SVG image',
          },
        ],
      },
      {
        html: 'En <strong>set PCB defaults</strong> cambia el interruptor a <strong>mm</strong>…',
        node: 'set PCB defaults',
        shots: [
          {
            file: '01-periferia-contorno/03-set-pcb-defaults-catalogo-completo.webp',
            size: [658, 756],
            alt: 'Nodo set PCB defaults con el interruptor in/mm',
            caption: 'set PCB defaults — interruptor in / mm',
            wide: true,
            boxes: [{ x: 214, y: 154, w: 144, h: 42, label: 'Cambiar a mm', pos: 'left' }],
          },
        ],
      },
      {
        html: '…y selecciona <strong>1.59mm cutout</strong> (la fresa para cortar el contorno).',
        node: 'set PCB defaults',
        shots: [
          {
            file: '01-periferia-contorno/04-set-pcb-defaults-cutout-1-59mm-seleccionado.webp',
            size: [612, 745],
            alt: 'set PCB defaults con 1.59mm cutout seleccionado',
            caption: 'Preset 1.59mm cutout',
            wide: true,
            boxes: [{ x: 76, y: 636, w: 262, h: 48, label: 'Elegir 1.59mm cutout', pos: 'right' }],
          },
        ],
      },
      {
        html: 'En <strong>mill raster 2D</strong> pon <strong>tool diameter</strong> en <code>1.9</code> mm (primera opción, el campo en mm) y <strong>offset number</strong> en <code>2</code>. Cut depth (0.254 mm) y max depth (1.7018 mm) ya vienen del preset.',
        node: 'mill raster 2D',
        shots: [
          {
            file: '01-periferia-contorno/06-mill-raster-2d-config-contorno-a.webp',
            size: [1207, 739],
            alt: 'Nodo mill raster 2D con tool diameter 1.9 mm y offset number 2',
            caption: 'mill raster 2D — tool diameter 1.9 mm, offset number 2',
            boxes: [
              { x: 428, y: 190, w: 152, h: 36, label: 'Poner 1.9 mm', pos: 'left' },
              { x: 372, y: 350, w: 290, h: 36, label: 'Offset number = 2', pos: 'left' },
            ],
          },
        ],
      },
      {
        html: 'En <strong>Roland SRM-20 milling machine</strong> marca el <strong>origin</strong> en <code>0, 0, 0</code> (por defecto viene 10, 10, 10). Deja <strong>speed</strong> en 4 mm/s. <br><br>Si necesitaras fabricar otra placa en la misma máquina y en la misma fenólica al mismo tiempo, en el segundo archivo cambia X o Y del origen según las medidas de tu placa para no encimarlas y aprovechar el espacio. Aquí es una sola placa, así que 0 en todo.',
        node: 'Roland SRM-20 milling machine',
        shots: [
          {
            file: '01-periferia-contorno/07-roland-srm20-config-contorno.webp',
            size: [804, 862],
            alt: 'Nodo Roland SRM-20 milling machine con origin 10, 10, 10 por defecto',
            caption: 'Antes: origin 10, 10, 10',
            wide: true,
            boxes: [{ x: 332, y: 256, w: 121, h: 132, label: 'Origen x, y, z = 0', pos: 'top' }],
          },
          {
            file: '01-periferia-contorno/07b-roland-srm20-origen-0-0-0.png',
            size: [472, 594],
            alt: 'Nodo Roland SRM-20 milling machine con origin 0, 0, 0 y tiempo estimado',
            caption: 'Después: origin 0, 0, 0 — el tiempo estimado se calcula solo tras el paso siguiente',
            wide: true,
            boxes: [
              { x: 178, y: 178, w: 82, h: 86, label: 'Origen en 0', pos: 'right' },
              { x: 106, y: 540, w: 248, h: 26, label: 'Tiempo estimado', pos: 'top' },
            ],
          },
        ],
      },
      {
        html: 'Vuelve al bloque <strong>mill raster 2D</strong> y pulsa <strong>calculate</strong>.',
        node: 'mill raster 2D',
        shots: [
          {
            file: '01-periferia-contorno/08-mill-raster-2d-config-contorno-b.webp',
            size: [999, 945],
            alt: 'mill raster 2D con el botón calculate',
            caption: 'mill raster 2D — botón calculate',
            boxes: [{ x: 363, y: 501, w: 112, h: 48, label: 'Clic en calculate', pos: 'right' }],
          },
        ],
      },
      {
        html: 'Se abre un render 3D de la placa en una pestaña nueva. Revisa que todo esté en orden y que el corte del contorno esté bien hecho.',
        node: 'mill raster 2D',
        shots: [
          {
            file: '01-periferia-contorno/10-toolpath-simulado-contorno.webp',
            size: [1918, 1078],
            alt: 'Render 3D del corte del contorno octagonal sobre el stock de cobre',
            caption: 'Render — corte del contorno',
            wide: true,
          },
        ],
      },
      {
        html: 'Regresa a la pestaña de mods y pulsa <strong>save file</strong>. mods lo guarda como <code>SVG image.rml</code>; renómbralo a <code>PERIFERIA.rml</code>. Este es el archivo que se carga para las periferias de la placa en el <strong>vPanel</strong>, el software que controla la MonoFab.',
        node: 'save file',
        shots: [
          {
            file: '01-periferia-contorno/11-guardar-periferia-rml.webp',
            size: [340, 285],
            alt: 'Nodo save file listo para guardar el archivo',
            caption: 'save file — archivo listo',
            boxes: [{ x: 181, y: 202, w: 82, h: 35, label: 'Guardar el archivo', pos: 'top' }],
          },
        ],
      },
    ],
  },
  {
    id: 'mods-pistas',
    toc: '9.3 Pistas',
    title: 'PISTAS — aislamiento del cobre',
    intro: 'Genera <code>PISTAS.rml</code>: la fresa recorre alrededor de cada pista para aislarla y deja el cobre de las pistas.',
    values: [
      { k: 'Extra', v: 'invert activado' },
      { k: 'Preset', v: '0.40mm flat' },
      { k: 'Offset number', v: '2' },
      { k: 'Origen', v: '0, 0, 0' },
      { k: 'Velocidad', v: '4 mm/s' },
    ],
    steps: [
      {
        html: `${RELOAD} En <strong>read SVG</strong> pulsa <strong>select SVG file</strong>.`,
        node: 'read SVG',
        shots: [READ_SVG_BTN],
      },
      {
        html: 'Elige el SVG de las pistas (<code>PISTAS</code>) y pulsa <strong>Abrir</strong>.',
        node: 'read SVG',
        shots: [
          {
            file: '02-pistas-trazas/01-abrir-pistas-svg.webp',
            size: [1405, 985],
            alt: 'Diálogo Abrir de Windows con el archivo PISTAS seleccionado',
            caption: 'Diálogo Abrir — PISTAS',
            boxes: [
              { x: 331, y: 500, w: 1072, h: 42, label: 'Elegir PISTAS', pos: 'top' },
              { x: 1097, y: 915, w: 106, h: 38, label: 'Abrir', pos: 'top' },
            ],
          },
        ],
      },
      {
        html: 'Las pistas quedan cargadas en <strong>read SVG</strong>: se ven las trazas VCC y GND, los pads y el contorno.',
        node: 'read SVG',
        shots: [
          {
            file: '02-pistas-trazas/15-read-svg-pistas-cargado.webp',
            size: [837, 882],
            alt: 'read SVG con el SVG de las pistas cargado',
            caption: 'SVG de las pistas cargado en read SVG',
            wide: true,
          },
        ],
      },
      {
        html: 'En <strong>convert SVG image</strong> selecciona <strong>invert</strong>. La imagen debe pasar a fondo negro con las pistas en blanco.',
        node: 'convert SVG image',
        shots: [
          {
            file: '02-pistas-trazas/16-convert-svg-image-antes-de-invert.webp',
            size: [456, 699],
            alt: 'convert SVG image antes de activar invert',
            caption: 'Antes: fondo blanco, pistas negras',
            wide: true,
            boxes: [{ x: 219, y: 438, w: 70, h: 38, label: 'Clic en invert', pos: 'right' }],
          },
          {
            file: '02-pistas-trazas/17-convert-svg-image-despues-de-invert.webp',
            size: [468, 652],
            alt: 'convert SVG image con invert activado',
            caption: 'Después: fondo negro, pistas blancas',
            wide: true,
            boxes: [
              { x: 203, y: 419, w: 71, h: 39, label: 'invert activo', pos: 'right' },
              { x: 55, y: 121, w: 312, h: 291, label: 'Fondo negro, pistas blancas', pos: 'top' },
            ],
          },
        ],
      },
      {
        html: 'En <strong>set PCB defaults</strong> cambia a <strong>mm</strong> y selecciona <strong>0.40mm flat</strong> (fresa plana para aislar las pistas).',
        node: 'set PCB defaults',
        shots: [
          {
            file: '02-pistas-trazas/03-set-pcb-defaults-flat-0-40mm-a.webp',
            size: [660, 780],
            alt: 'set PCB defaults en mm con 0.40mm flat seleccionado',
            caption: 'set PCB defaults — mm y 0.40mm flat',
            wide: true,
            boxes: [
              { x: 196, y: 148, w: 142, h: 42, label: 'Cambiar a mm', pos: 'left' },
              { x: 116, y: 227, w: 274, h: 53, label: 'Elegir 0.40mm flat', pos: 'right' },
            ],
          },
        ],
      },
      {
        html: 'En <strong>Roland SRM-20 milling machine</strong> pon el <strong>origin</strong> en <code>0, 0, 0</code>. La velocidad se queda en 4 mm/s.',
        node: 'Roland SRM-20 milling machine',
        shots: [
          {
            file: '02-pistas-trazas/07-roland-srm20-config-pistas.webp',
            size: [642, 709],
            alt: 'Nodo Roland SRM-20 milling machine con origin 0, 0, 0',
            caption: 'Roland SRM-20 milling machine — origin 0, 0, 0',
            wide: true,
            boxes: [{ x: 248, y: 229, w: 90, h: 98, label: 'Origen x, y, z = 0', pos: 'right' }],
          },
        ],
      },
      {
        html: 'En <strong>mill raster 2D</strong> comprueba que <strong>offset number</strong> esté en <code>2</code> (con el preset la fresa queda en 0.39624 mm y la profundidad en 0.1016 mm) y pulsa <strong>calculate</strong>.',
        node: 'mill raster 2D',
        shots: [
          {
            file: '02-pistas-trazas/08-mill-raster-2d-config-pistas-b.webp',
            size: [901, 888],
            alt: 'mill raster 2D con offset number 2 y el botón calculate',
            caption: 'mill raster 2D — offset number 2 y calculate',
            boxes: [
              { x: 270, y: 274, w: 228, h: 28, label: 'Offset number = 2', pos: 'right' },
              { x: 316, y: 458, w: 104, h: 42, label: 'Clic en calculate', pos: 'right' },
            ],
          },
        ],
      },
      {
        html: 'Se abre el render 3D. Revisa que las pistas se vean bien aisladas y que sean de cobre.',
        node: 'mill raster 2D',
        important: 'Asegúrate de que en el render las pistas queden de cobre. Si no es así, vuelve a invertir el SVG (botón <b>invert</b> en <b>convert SVG image</b>) y calcula otra vez.',
        shots: [
          {
            file: '02-pistas-trazas/12-toolpath-simulado-pistas.webp',
            size: [1080, 652],
            alt: 'Render 3D del aislamiento de las pistas sobre el stock de cobre',
            caption: 'Render — las pistas deben quedar en cobre',
            wide: true,
            boxes: [{ x: 190, y: 45, w: 575, h: 535, label: 'Las pistas deben quedar en cobre', pos: 'top' }],
          },
        ],
      },
      {
        html: 'Vuelve a mods y pulsa <strong>save file</strong>. Guárdalo como <code>PISTAS.rml</code>.',
        node: 'save file',
        shots: [
          {
            file: '02-pistas-trazas/18-guardar-pistas-rml.webp',
            size: [394, 336],
            alt: 'Nodo save file listo para guardar el archivo de las pistas',
            caption: 'save file — archivo listo',
            boxes: [{ x: 200, y: 224, w: 97, h: 40, label: 'Guardar el archivo', pos: 'top' }],
          },
        ],
      },
    ],
  },
  {
    id: 'mods-orificios',
    toc: '9.4 Orificios',
    title: 'ORIFICIOS — taladrado',
    intro: 'Genera <code>ORIFICIOS.rml</code>: los taladros de las perforaciones. Es el único archivo con una velocidad distinta.',
    values: [
      { k: 'Preset', v: '0.79mm drill' },
      { k: 'Offset number', v: '1' },
      { k: 'Origen', v: '0, 0, 0' },
      { k: 'Velocidad', v: '0.3 mm/s' },
    ],
    steps: [
      {
        html: `${RELOAD} En <strong>read SVG</strong> pulsa <strong>select SVG file</strong> y elige el SVG de los orificios (la capa <code>User.4</code> exportada de KiCad).`,
        node: 'read SVG',
        shots: [
          {
            file: '03-orificios-taladrado/01-read-svg-vacio.webp',
            size: [796, 769],
            alt: 'Nodo read SVG vacío con el botón select SVG file',
            caption: 'Nodo read SVG — botón select SVG file',
            wide: true,
            boxes: [{ x: 288, y: 518, w: 126, h: 36, label: 'Clic en select SVG file', pos: 'right' }],
          },
        ],
      },
      {
        html: 'Quedan cargados los orificios: en la vista previa se ven los puntos de las perforaciones.',
        node: 'read SVG',
        shots: [
          {
            file: '03-orificios-taladrado/13-read-svg-orificios-cargado.webp',
            size: [736, 762],
            alt: 'read SVG con el SVG de los orificios cargado',
            caption: 'SVG de los orificios cargado',
            wide: true,
            boxes: [{ x: 205, y: 258, w: 255, h: 253, label: 'Se ven los orificios', pos: 'top' }],
          },
        ],
      },
      {
        html: 'En <strong>set PCB defaults</strong> cambia a <strong>mm</strong> y selecciona <strong>0.79mm drill</strong>.',
        node: 'set PCB defaults',
        shots: [
          {
            file: '03-orificios-taladrado/02-set-pcb-defaults-drill-0-79mm.webp',
            size: [565, 757],
            alt: 'set PCB defaults en mm con 0.79mm drill seleccionado',
            caption: 'set PCB defaults — mm y 0.79mm drill',
            wide: true,
            boxes: [
              { x: 150, y: 152, w: 140, h: 42, label: 'Cambiar a mm', pos: 'right' },
              { x: 71, y: 497, w: 274, h: 53, label: 'Elegir 0.79mm drill', pos: 'right' },
            ],
          },
        ],
      },
      {
        html: 'En <strong>Roland SRM-20 milling machine</strong> el <strong>origin</strong> también va en <code>0, 0, 0</code>. Y aquí está la diferencia: <strong>este es el único archivo al que se le cambia la velocidad</strong>. Periferia y pistas siempre van a 4 mm/s; el taladrado va a <code>0.3</code> mm/s. Cambia <strong>speed</strong> de 4 a 0.3.',
        node: 'Roland SRM-20 milling machine',
        important: 'Los otros dos archivos van a 4 mm/s. Solo ORIFICIOS lleva speed = 0.3.',
        shots: [
          {
            file: '02-pistas-trazas/07-roland-srm20-config-pistas.webp',
            size: [642, 709],
            alt: 'Nodo Roland SRM-20 milling machine con speed 4',
            caption: 'Antes: speed 4',
            wide: true,
            boxes: [
              { x: 180, y: 172, w: 170, h: 34, label: 'Cambiar speed a 0.3', pos: 'right' },
              { x: 248, y: 229, w: 90, h: 98, label: 'Origen x, y, z = 0', pos: 'right' },
            ],
          },
          {
            file: '03-orificios-taladrado/05-roland-srm20-config-orificios-b.webp',
            size: [669, 748],
            alt: 'Nodo Roland SRM-20 milling machine con speed 0.3 y origin 0, 0, 0',
            caption: 'Después: speed 0.3 y origin 0, 0, 0',
            wide: true,
            boxes: [
              { x: 190, y: 158, w: 188, h: 36, label: 'speed = 0.3', pos: 'right' },
              { x: 266, y: 220, w: 98, h: 104, label: 'Origen = 0', pos: 'right' },
            ],
          },
        ],
      },
      {
        html: 'En <strong>mill raster 2D</strong> pon <strong>offset number</strong> en <code>1</code> (con el preset la fresa queda en 0.79248 mm, cut depth 0.254 mm y max depth 1.7018 mm) y pulsa <strong>calculate</strong>.',
        node: 'mill raster 2D',
        shots: [
          {
            file: '03-orificios-taladrado/04-mill-raster-2d-config-orificios-a.webp',
            size: [981, 921],
            alt: 'mill raster 2D con offset number 1 y el botón calculate',
            caption: 'mill raster 2D — offset number 1 y calculate',
            boxes: [
              { x: 316, y: 278, w: 244, h: 30, label: 'Offset number = 1', pos: 'right' },
              { x: 364, y: 476, w: 113, h: 47, label: 'Clic en calculate', pos: 'right' },
            ],
          },
        ],
      },
      {
        html: 'En el render comprueba que los orificios se vean bien hechos: deben aparecer las 6 perforaciones.',
        node: 'mill raster 2D',
        shots: [
          {
            file: '03-orificios-taladrado/10-toolpath-simulado-orificios-lejos.webp',
            size: [981, 748],
            alt: 'Render 3D de la placa con las perforaciones marcadas',
            caption: 'Render — los orificios',
            wide: true,
            boxes: [{ x: 185, y: 232, w: 100, h: 145, label: 'Los 6 orificios', pos: 'right' }],
          },
        ],
      },
      {
        html: 'Vuelve a mods y pulsa <strong>save file</strong>. Guárdalo como <code>ORIFICIOS.rml</code>.',
        node: 'save file',
        shots: [
          {
            file: '03-orificios-taladrado/12-guardar-orificios-rml.webp',
            size: [417, 375],
            alt: 'Nodo save file listo para guardar el archivo de los orificios',
            caption: 'save file — archivo listo',
            boxes: [{ x: 221, y: 260, w: 113, h: 48, label: 'Guardar el archivo', pos: 'top' }],
          },
        ],
      },
    ],
  },
]

export const MODS_SUMMARY = {
  head: ['Archivo', 'Preset', 'Tool diameter', 'Offset', 'Origen', 'Velocidad', 'Extra', '.rml (bytes)'],
  rows: [
    ['PERIFERIA.rml', '1.59mm cutout', '1.9 mm', '2', '0, 0, 0', '4 mm/s', '—', '4526'],
    ['PISTAS.rml', '0.40mm flat', '0.39624 mm', '2', '0, 0, 0', '4 mm/s', 'invert activado', '68476'],
    ['ORIFICIOS.rml', '0.79mm drill', '0.79248 mm', '1', '0, 0, 0', '0.3 mm/s', '—', '10128'],
  ],
}

export const MODS_FINAL: ModsShot = {
  file: '04-archivos-finales/01-tres-rml-generados.png',
  size: [585, 223],
  alt: 'Explorador de Windows con los tres archivos generados: PISTAS.rml, ORIFICIOS.rml, PERIFERIA.rml',
  caption: 'PISTAS.rml · ORIFICIOS.rml · PERIFERIA.rml — listos para la MonoFab',
}
