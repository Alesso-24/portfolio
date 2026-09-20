// Mapas "Dónde está" de KiCad: capturas generales de cada ventana con recuadros naranjas sobre
// el botón / menú / panel que se usa en cada paso (antes de la parte de mods).
// Coordenadas en PÍXELES de la captura ORIGINAL (`size`); la imagen publicada está reducida a 1400 px
// pero con la misma proporción, así que los recuadros (en %) siguen cayendo en su lugar.

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
      'Pestaña Capas (panel Apariencia)': { x: 1520, y: 198, w: 72, h: 26, pos: 'right', short: 'Pestaña Capas' },
      'Capa F.Cu': { x: 1518, y: 228, w: 350, h: 26, pos: 'left', short: 'F.Cu' },
      'Capa Edge.Cuts': { x: 1518, y: 565, w: 350, h: 26, pos: 'left', short: 'Edge.Cuts' },
    },
  },
} satisfies Record<string, KicadView>

export type KicadViewKey = keyof typeof KICAD_VIEWS
