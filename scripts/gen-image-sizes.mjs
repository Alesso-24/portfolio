// Genera src/data/image-sizes.json con el tamaño real (px) de cada imagen publicada de la práctica.
// Uso: node scripts/gen-image-sizes.mjs   (correr cada vez que se agreguen/cambien imágenes en public/)
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const sharp = require(path.resolve('node_modules/astro/node_modules/sharp'))

const ROOT = 'public/images/docs/produccion-electronica/practicas/01-primera-placa'
const out = {}
async function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) await walk(p)
    else if (/\.(png|webp|jpg|jpeg)$/i.test(e.name)) {
      const m = await sharp(p).metadata()
      out[path.relative(ROOT, p).split(path.sep).join('/')] = [m.width, m.height]
    }
  }
}
await walk(ROOT)
const sorted = Object.fromEntries(Object.entries(out).sort(([a], [b]) => a.localeCompare(b)))
fs.writeFileSync('src/data/image-sizes.json', JSON.stringify(sorted, null, 1) + '\n')
console.log(Object.keys(sorted).length, 'imágenes -> src/data/image-sizes.json')
