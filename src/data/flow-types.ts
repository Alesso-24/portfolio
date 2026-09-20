// Modelo de datos del flujo interactivo (pestañas KiCad / MonoFab).
// Todas las rutas de imagen son relativas a PRACTICA_BASE (public/images/.../practicas/01-primera-placa/).
import type { KicadViewKey } from './kicad-where'

export interface Box {
  /** coords en PÍXELES de la captura original (ver `size`) */
  x: number
  y: number
  w: number
  h: number
  label: string
  pos?: 'top' | 'bottom' | 'left' | 'right'
  nudge?: number
}

export interface Shot {
  file: string
  alt: string
  caption?: string
  /** tamaño de la captura sobre el que se midieron los recuadros; si no hay recuadros se toma de image-sizes.json */
  size?: [number, number]
  boxes?: Box[]
  wide?: boolean
}

export interface ToolItem {
  name: string
  desc: string
  /** ícono (ruta relativa) */
  icon: string
  /** nombre del recuadro en el catálogo de la vista; si falta, la herramienta se lista sin número */
  key?: string
  /** solo si no tiene recuadro: aviso corto (ej. "más abajo en la barra") */
  hint?: string
}

export type Block =
  | { kind: 'where'; view: KicadViewKey; items: string[]; numbered?: boolean; caption?: string; note?: string }
  | { kind: 'node'; node: string }
  | { kind: 'shots'; shots: Shot[]; layout?: 'auto' | 'row' | 'carousel' | 'thumbs' }
  | { kind: 'tools'; view: KicadViewKey; tools: ToolItem[]; caption?: string }
  | { kind: 'toolrow'; icon: string; name: string; desc: string }
  | { kind: 'editors' }
  | { kind: 'components' }
  | { kind: 'callout'; title: string; html: string }
  | { kind: 'important'; html: string }
  | { kind: 'note'; html: string }
  | { kind: 'map' }
  | { kind: 'summary' }
  | { kind: 'machine' }

export interface FlowStep {
  /** HTML simple (strong / code / a); contenido estático del repo */
  html: string
  blocks: Block[]
}

export interface FlowSection {
  id: string
  /** anclas viejas que abren esta sección */
  alias?: string[]
  /** etiqueta corta del chip */
  chip: string
  title: string
  /** valores clave (chips) que se muestran en todos los pasos de la sección */
  values?: { k: string; v: string }[]
  steps: FlowStep[]
}

export interface Flow {
  id: 'kicad' | 'monofab'
  sections: FlowSection[]
}
