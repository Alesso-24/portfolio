// Mapas "Dónde está" de KiCad: capturas generales de cada ventana con recuadros naranjas sobre
// el botón / menú / panel que se usa en cada paso (antes de la parte de mods).
// Coordenadas en PÍXELES de la captura ORIGINAL (`size`); la imagen publicada está reducida a 1400 px
// pero con la misma proporción, así que los recuadros (en %) siguen cayendo en su lugar.

export const KICAD_BASE = '/portfolio/images/docs/produccion-electronica/practicas/01-primera-placa/'

export interface KicadItem {
  x: number
  y: number
  w: number
  h: number
  /** lado de la etiqueta */
  pos: 'top' | 'bottom' | 'left' | 'right'
  /** texto corto para la etiqueta "Aquí: …" (si no, se usa el nombre) */
  short?: string
}

export interface KicadView {
  file: string
  size: [number, number]
  alt: string
  items: Record<string, KicadItem>
}

export const KICAD_VIEWS = {
  main: {
    file: '00-preparacion/01-abrir-kicad-ventana-principal.webp',
    size: [1918, 1078],
    alt: 'Ventana principal de KiCad 10.0 con el menú superior y la lista de editores',
    items: {
      'Menú Archivo': { x: 6, y: 36, w: 72, h: 28, pos: 'bottom' },
      'Menú Herramientas': { x: 201, y: 36, w: 118, h: 28, pos: 'bottom' },
      'Editor de esquemas': { x: 440, y: 72, w: 680, h: 80, pos: 'right' },
      'Editor de placas': { x: 440, y: 244, w: 420, h: 80, pos: 'right' },
      'Administrador de complementos y contenido': { x: 440, y: 762, w: 680, h: 78, pos: 'right', short: 'Complementos' },
    },
  },
  esquemas: {
    file: '01-esquematico/00-editor-de-esquemas-vacio.webp',
    size: [1918, 1078],
    alt: 'Editor de esquemas de KiCad con la barra de herramientas de la derecha',
    items: {
      'Seleccionar componente': { x: 1868, y: 234, w: 48, h: 50, pos: 'left' },
      'Símbolo de alimentación': { x: 1868, y: 286, w: 48, h: 50, pos: 'left' },
      'Dibujar cable': { x: 1868, y: 336, w: 48, h: 50, pos: 'left' },
      'Etiqueta de red': { x: 1868, y: 582, w: 48, h: 52, pos: 'left' },
      'Texto': { x: 1868, y: 832, w: 48, h: 54, pos: 'left' },
    },
  },
  placas: {
    file: '06-editor-placas/08-resultado-final/02-board-final-editor-completo.webp',
    size: [1897, 1066],
    alt: 'Editor de placas de KiCad con la barra de herramientas de la derecha y el panel de capas',
    items: {
      'Menú Archivo': { x: 0, y: 28, w: 50, h: 24, pos: 'bottom' },
      'Configuración de la placa': { x: 54, y: 60, w: 38, h: 38, pos: 'bottom', short: 'Config. de la placa' },
      'Enrutar pistas': { x: 1462, y: 336, w: 46, h: 48, pos: 'left' },
      'Zona rellena': { x: 1462, y: 476, w: 46, h: 48, pos: 'left' },
      'Línea': { x: 1462, y: 588, w: 46, h: 40, pos: 'left' },
      'Arco': { x: 1462, y: 636, w: 46, h: 48, pos: 'left' },
      'Rectángulo': { x: 1462, y: 686, w: 46, h: 46, pos: 'left' },
      'Círculo': { x: 1462, y: 736, w: 46, h: 50, pos: 'left' },
      'Polígono': { x: 1462, y: 792, w: 46, h: 46, pos: 'left' },
      'Curva Bézier': { x: 1462, y: 840, w: 46, h: 42, pos: 'left' },
      'Imagen de referencia': { x: 1462, y: 882, w: 46, h: 46, pos: 'left', short: 'Imagen' },
      'Pestaña Capas (panel Apariencia)': { x: 1520, y: 198, w: 72, h: 26, pos: 'left', short: 'Pestaña Capas' },
      'Capa F.Cu': { x: 1518, y: 228, w: 350, h: 26, pos: 'left', short: 'F.Cu' },
      'Capa Edge.Cuts': { x: 1518, y: 565, w: 350, h: 26, pos: 'left', short: 'Edge.Cuts' },
    },
  },
} satisfies Record<string, KicadView>

export type KicadViewKey = keyof typeof KICAD_VIEWS

export interface KicadZoom {
  /** vista general sobre la que se marca dónde está la zona */
  view: KicadViewKey
  /** recuadro de la zona sobre la vista general (coords de la captura original) */
  overview: { x: number; y: number; w: number; h: number; label: string; pos: 'top' | 'bottom' | 'left' | 'right' }
  /** recorte ampliado de la misma captura (recorte nativo, sin escalar) */
  file: string
  size: [number, number]
  alt: string
  /** 'pair' = general y recorte lado a lado (recortes angostos); 'stack' = uno bajo otro */
  layout: 'pair' | 'stack'
  /** elementos en orden (se numeran), coords dentro del recorte */
  items: Record<string, { x: number; y: number; w: number; h: number }>
}

export const KICAD_ZOOMS = {
  'esquemas-barra': {
    view: 'esquemas',
    overview: { x: 1866, y: 118, w: 52, h: 880, label: 'Barra de herramientas', pos: 'left' },
    file: '01-esquematico/00-editor-de-esquemas-barra.webp',
    size: [138, 900],
    alt: 'Acercamiento a la barra de herramientas derecha del editor de esquemas',
    layout: 'pair',
    items: {
      'Seleccionar componente': { x: 88, y: 124, w: 48, h: 50 },
      'Símbolo de alimentación': { x: 88, y: 176, w: 48, h: 50 },
      'Dibujar cable': { x: 88, y: 226, w: 48, h: 50 },
      'Etiqueta de red': { x: 88, y: 472, w: 48, h: 52 },
      'Texto': { x: 88, y: 722, w: 48, h: 54 },
    },
  },
  'placas-barra': {
    view: 'placas',
    overview: { x: 1456, y: 150, w: 56, h: 800, label: 'Barra de herramientas', pos: 'left' },
    file: '06-editor-placas/08-resultado-final/03-editor-barra-herramientas.webp',
    size: [140, 800],
    alt: 'Acercamiento a la barra de herramientas derecha del editor de placas',
    layout: 'pair',
    items: {
      'Enrutar pistas': { x: 82, y: 186, w: 46, h: 48 },
      'Zona rellena': { x: 82, y: 326, w: 46, h: 48 },
      'Línea': { x: 82, y: 438, w: 46, h: 40 },
      'Arco': { x: 82, y: 486, w: 46, h: 48 },
      'Rectángulo': { x: 82, y: 536, w: 46, h: 46 },
      'Círculo': { x: 82, y: 586, w: 46, h: 50 },
      'Polígono': { x: 82, y: 642, w: 46, h: 46 },
      'Curva Bézier': { x: 82, y: 690, w: 46, h: 42 },
      'Imagen de referencia': { x: 82, y: 732, w: 46, h: 46 },
    },
  },
  'placas-capas': {
    view: 'placas',
    overview: { x: 1510, y: 160, w: 382, h: 440, label: 'Panel Apariencia', pos: 'left' },
    file: '06-editor-placas/08-resultado-final/04-editor-panel-capas.webp',
    size: [657, 470],
    alt: 'Acercamiento al panel Apariencia, pestaña Capas, del editor de placas',
    layout: 'stack',
    items: {
      'Pestaña Capas': { x: 280, y: 48, w: 72, h: 26 },
      'Capa F.Cu': { x: 278, y: 78, w: 350, h: 26 },
      'Capa Edge.Cuts': { x: 278, y: 415, w: 350, h: 26 },
    },
  },
} satisfies Record<string, KicadZoom>

export type KicadZoomKey = keyof typeof KICAD_ZOOMS
