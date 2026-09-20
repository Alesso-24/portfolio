import sizes from './image-sizes.json'

export const PRACTICA_BASE = '/portfolio/images/docs/produccion-electronica/practicas/01-primera-placa/'
export const BRAND_BASE = '/portfolio/images/docs/produccion-electronica/brand/'
export const MONOFAB_PHOTO = '/portfolio/images/docs/produccion-electronica/monofab/srm-20-roland.webp'

export const imgUrl = (file: string) => PRACTICA_BASE + file

/** tamaño explícito (recuadros medidos sobre la captura original) o el real de la imagen publicada */
export function sizeOf(file: string, explicit?: [number, number]): [number, number] {
  if (explicit) return explicit
  const s = (sizes as Record<string, number[]>)[file]
  if (!s) throw new Error(`Falta el tamaño de "${file}" en image-sizes.json (corre: node scripts/gen-image-sizes.mjs)`)
  return [s[0], s[1]]
}
