// Post-build: imágenes responsivas para las fotos del sitio (dist/images/*.webp).
//  - genera variantes reducidas (-480, -800, -1200...) junto al original,
//  - agrega srcset/sizes y width/height a cada <img> del HTML para que el celular
//    descargue solo lo que necesita (y no haya saltos de layout).
// Se corre automáticamente en `npm run build`. Las imágenes de docs/ ya vienen dimensionadas y no se tocan.
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
let sharp
for (const p of ['sharp', path.resolve('node_modules/astro/node_modules/sharp')]) {
  try { sharp = require(p); break } catch {}
}
if (!sharp) { console.warn('[responsive-images] sharp no disponible: se omite'); process.exit(0) }

const DIST = 'dist'
const IMG_DIR = path.join(DIST, 'images')
if (!fs.existsSync(IMG_DIR)) process.exit(0)

const LANDSCAPE = [480, 800, 1200, 1600]
const PORTRAIT = [240, 360, 540, 720]
const meta = new Map() // nombre -> { w, h, variants: [{w, file}] }

for (const f of fs.readdirSync(IMG_DIR)) {
  if (!/\.webp$/i.test(f) || /-\d+\.webp$/i.test(f) || f.startsWith('yt-')) continue
  const src = path.join(IMG_DIR, f)
  const m = await sharp(src).metadata()
  const portrait = m.height > m.width * 1.25
  const variants = []
  for (const w of portrait ? PORTRAIT : LANDSCAPE) {
    if (w >= m.width * 0.9) continue
    const name = f.replace(/\.webp$/i, `-${w}.webp`)
    await sharp(src).resize({ width: w }).webp({ quality: 74, effort: 5 }).toFile(path.join(IMG_DIR, name))
    variants.push({ w, file: name })
  }
  meta.set(f, { w: m.width, h: m.height, portrait, variants })
}

const htmlFiles = []
;(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) walk(p)
    else if (e.name.endsWith('.html')) htmlFiles.push(p)
  }
})(DIST)

let tags = 0
for (const file of htmlFiles) {
  let html = fs.readFileSync(file, 'utf8')
  const out = html.replace(/<img\b[^>]*>/g, (tag) => {
    const m = /\ssrc="([^"]*\/images\/([^"/]+\.webp))"/.exec(tag)
    if (!m) return tag
    const info = meta.get(m[2])
    if (!info) return tag
    let t = tag
    const base = m[1].slice(0, m[1].length - m[2].length)
    if (!/\ssrcset=/.test(t) && info.variants.length) {
      const srcset = [...info.variants.map((v) => `${base}${v.file} ${v.w}w`), `${m[1]} ${info.w}w`].join(', ')
      const sizes = info.portrait ? '(max-width: 700px) 60vw, 480px' : '(max-width: 1000px) 100vw, 1000px'
      t = t.replace(/\ssrc="/, ` srcset="${srcset}" sizes="${sizes}" src="`)
    }
    if (!/\swidth=/.test(t) && !/\sheight=/.test(t)) t = t.replace(/\ssrc="/, ` width="${info.w}" height="${info.h}" src="`)
    if (t !== tag) tags++
    return t
  })
  if (out !== html) fs.writeFileSync(file, out)
}
console.log(`[responsive-images] ${meta.size} imágenes, ${[...meta.values()].reduce((a, v) => a + v.variants.length, 0)} variantes, ${tags} etiquetas <img> actualizadas`)
