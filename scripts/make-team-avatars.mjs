// Genera los avatares cuadrados del equipo (public/images/team/*.webp) recortados sobre la cara.
// Las fotos originales son verticales (900×1600) con la cara en la parte alta; un `object-fit: cover`
// centrado las cortaba. Coordenadas medidas a mano sobre cada original (px): { left, top, size }.
// Uso: node scripts/make-team-avatars.mjs
import fs from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const sharp = require('sharp')

const OUT = 'public/images/team'
const AVATARS = [
  { src: 'public/images/Alessandro.webp', out: 'alessandro.webp', left: 140, top: 90, size: 600 },
  { src: 'public/images/Alexa.webp', out: 'alexa.webp', left: 0, top: 125, size: 900 },
]

fs.mkdirSync(OUT, { recursive: true })
for (const a of AVATARS) {
  await sharp(a.src)
    .extract({ left: a.left, top: a.top, width: a.size, height: a.size })
    .resize(360, 360)
    .webp({ quality: 82 })
    .toFile(`${OUT}/${a.out}`)
  console.log('ok', a.out)
}
