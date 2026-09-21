// Refracción real del "Liquid Glass" (docs-source/LIQUID-GLASS.md §8).
//
// Para cada elemento `.glass--refract` genera dos imágenes del tamaño exacto del elemento:
//   · mapa de desplazamiento: en el bisel del vidrio (una franja junto al borde) cada píxel muestrea el fondo
//     desplazado hacia dentro según la ley de Snell sobre un perfil convexo "squircle" (el de Apple);
//   · mapa especular: reflejo de borde direccional (luz arriba-izquierda fuerte, opuesta más débil).
// Las mete en un filtro SVG (feImage + feDisplacementMap + feComposite) y lo aplica con
// `backdrop-filter: url(#id)`, que solo existe en Chromium. En otros navegadores (Safari, Firefox) o con
// prefers-reduced-transparency / prefers-contrast: more / forced-colors no se hace nada: queda el vidrio
// normal (.glass--blur), que es la alternativa.
//
// Marcas en el elemento (atributos, no clases, para no chocar con React):
//   data-refract       → ya tiene filtro (el CSS lo usa para poner relleno casi transparente)
//   data-over-media    → detrás pasa una foto/video/bloque oscuro (solo con data-glass-adaptive): el CSS sube el relleno
// El mapa se regenera solo cuando cambia el tamaño (ResizeObserver); no se anima nada.

const ua = navigator.userAgent
const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData?.brands
const isChromium =
  !!brands?.some((b) => /Chromium/i.test(b.brand)) || (/Chrome\/\d+/.test(ua) && !/CriOS|FxiOS|Firefox/.test(ua))

const reduce = [
  window.matchMedia('(prefers-reduced-transparency: reduce)'),
  window.matchMedia('(prefers-contrast: more)'),
  window.matchMedia('(forced-colors: active)'),
]
// Regulador de rendimiento: si en este dispositivo el scroll no es fluido con la refracción activa, se desactiva sola
// (queda el vidrio normal) y se recuerda durante la sesión. Se puede saltar con sessionStorage['glass-refract-force']='1' (pruebas).
const store = (k: string, v?: string) => { try { return v === undefined ? sessionStorage.getItem(k) : (sessionStorage.setItem(k, v), v) } catch { return null } }
let tooSlow = store('glass-refract-low') === '1' && store('glass-refract-force') !== '1'
const enabled = () => isChromium && !tooSlow && !reduce.some((m) => m.matches)

// ── parámetros del vidrio (ajustados a ojo sobre capturas) ─────────────────────────────
const IOR = 1.5 // índice de refracción del vidrio
const STRENGTH = 1.2 // multiplicador del desplazamiento (1 = físico puro; más = más visible)
const BEZEL_MAX = 20 // ancho máximo del bisel en px
const SPEC_WIDTH = 1.7 // grosor del reflejo de borde en px
const BLUR_RIM = 0.6 // desenfoque del fondo en el bisel (queda nítido para que se vea la lente)
const BLUR_FROST = 3.0 // desenfoque del centro (esmerilado): el texto que pasa por detrás no compite con el del menú
const CA = 0 // aberración cromática: fracción de la escala entre canales R y B. 0 = desactivada (3 desplazamientos cuestan ~+35 % de frame; ver LIQUID-GLASS.md §8)
const LIGHT = { x: -0.62, y: -0.78 } // dirección desde la que llega la luz (arriba-izquierda)

const NS = 'http://www.w3.org/2000/svg'
let defs: SVGDefsElement | null = null
let counter = 0

function svgDefs() {
  if (defs) return defs
  const svg = document.createElementNS(NS, 'svg')
  svg.setAttribute('width', '0')
  svg.setAttribute('height', '0')
  svg.setAttribute('aria-hidden', 'true')
  svg.style.cssText = 'position:absolute;width:0;height:0;pointer-events:none'
  defs = document.createElementNS(NS, 'defs')
  svg.appendChild(defs)
  document.body.appendChild(svg)
  return defs
}

/** perfil convexo squircle: altura normalizada 0..1 según la distancia normalizada al borde (0 borde → 1 interior) */
const height = (t: number) => Math.pow(1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 4), 0.25)

/** desplazamiento (px) por distancia al borde: 128 muestras, ley de Snell */
function buildProfile(bezel: number) {
  const H = bezel * 0.9 // altura del bisel
  const base = H * 0.6 // grosor bajo el bisel
  const out = new Float32Array(128)
  let max = 0
  for (let i = 0; i < 128; i++) {
    const t = i / 127
    const e = 0.004
    const slope = (height(t + e) - height(t - e)) / (2 * e) // dy/dt
    const s = Math.min(slope * (H / bezel), 12) // pendiente física, acotada
    const th1 = Math.atan(s)
    const th2 = Math.asin(Math.sin(th1) / IOR)
    const disp = (height(t) * H + base) * Math.tan(th1 - th2) * STRENGTH
    out[i] = disp
    if (disp > max) max = disp
  }
  return { profile: out, max: Math.max(max, 0.0001) }
}

/** mapas ya calculados por tamaño (alternar entre estados de un mismo elemento, como el dock, es instantáneo) */
const cache = new Map<string, { dispURL: string; specURL: string; max: number }>()

function generate(w: number, h: number, r: number, bezel: number) {
  const { profile, max } = buildProfile(bezel)
  const disp = new ImageData(w, h)
  const spec = new ImageData(w, h)
  const halfW = w / 2
  const halfH = h / 2
  const cx = halfW - r
  const cy = halfH - r
  const Lx = LIGHT.x
  const Ly = LIGHT.y

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4
      const px = x + 0.5 - halfW
      const py = y + 0.5 - halfH
      // distancia con signo a un rectángulo redondeado y normal hacia fuera
      const qx = Math.abs(px) - cx
      const qy = Math.abs(py) - cy
      const ox = Math.max(qx, 0)
      const oy = Math.max(qy, 0)
      const outside = Math.hypot(ox, oy)
      const sd = outside + Math.min(Math.max(qx, qy), 0) - r // <0 dentro
      const d = -sd // profundidad hacia dentro
      let nx: number
      let ny: number
      if (outside > 0) {
        nx = (ox / outside) * Math.sign(px || 1)
        ny = (oy / outside) * Math.sign(py || 1)
      } else if (qx > qy) {
        nx = Math.sign(px || 1)
        ny = 0
      } else {
        nx = 0
        ny = Math.sign(py || 1)
      }
      // por defecto: sin desplazamiento, sin reflejo
      disp.data[i] = 128
      disp.data[i + 1] = 128
      disp.data[i + 2] = 0 // canal azul = máscara del bisel (1 = lente nítida, 0 = centro esmerilado)
      disp.data[i + 3] = 255
      if (d < 0) continue
      {
        const t = Math.min(1, Math.max(0, (d / bezel - 0.45) / 0.55))
        disp.data[i + 2] = Math.round((1 - t * t * (3 - 2 * t)) * 255)
      }
      if (d < bezel) {
        const mag = profile[Math.min(127, Math.floor((d / bezel) * 127))] / max
        // el rayo se desvía hacia dentro: el píxel del borde muestra el fondo de más adentro
        disp.data[i] = 128 + -nx * mag * 127
        disp.data[i + 1] = 128 + -ny * mag * 127
      }
      // reflejo especular: fino, pegado al borde, direccional (+ uno más débil en el lado opuesto)
      const rim = Math.exp(-Math.pow(d / SPEC_WIDTH, 2))
      const glow = Math.exp(-Math.pow(d / (bezel * 0.55), 2)) * 0.16
      const facing = Math.max(0, nx * Lx + ny * Ly)
      const back = Math.max(0, -(nx * Lx + ny * Ly))
      const a = Math.min(1, rim * (Math.pow(facing, 1.4) * 0.95 + Math.pow(back, 1.4) * 0.42) + glow * (facing * 0.7 + back * 0.3))
      spec.data[i] = 255
      spec.data[i + 1] = 255
      spec.data[i + 2] = 255
      spec.data[i + 3] = Math.round(a * 255)
    }
  }

  const toURL = (data: ImageData) => {
    const c = document.createElement('canvas')
    c.width = w
    c.height = h
    c.getContext('2d')!.putImageData(data, 0, 0)
    return c.toDataURL('image/png')
  }
  const dispURL = toURL(disp)
  const specURL = toURL(spec)
  return { dispURL, specURL, max }
}

function measure(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  const w = Math.round(rect.width)
  const h = Math.round(rect.height)
  const r = Math.min(parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0, w / 2, h / 2)
  return { w, h, r, key: `${w}x${h}x${Math.round(r)}` }
}

function build(el: HTMLElement) {
  const { w, h, r, key } = measure(el)
  if (w < 24 || h < 16) return
  const bezel = Math.min(BEZEL_MAX, Math.min(w, h) / 2 - 1)
  if (el.dataset.refractKey === key) return

  let entry = cache.get(key)
  if (!entry) {
    entry = generate(w, h, r, bezel)
    cache.set(key, entry)
    if (cache.size > 16) cache.delete(cache.keys().next().value as string)
  }
  const { dispURL, specURL, max } = entry

  const id = el.dataset.refractId ?? `glass-refract-${++counter}`
  el.dataset.refractId = id
  let f = svgDefs().querySelector<SVGFilterElement>(`#${id}`)
  if (!f) {
    f = document.createElementNS(NS, 'filter')
    f.setAttribute('id', id)
    svgDefs().appendChild(f)
  }
  f.setAttribute('color-interpolation-filters', 'sRGB')
  const S = max * 2 // offset = 0.498·escala·dx ≈ max·dx
  const chroma = CA > 0 && window.matchMedia('(hover: hover)').matches
  const channel = (k: string) =>
    // alfa forzado a 1 en cada capa: si no, donde el fondo muestreado tiene alfa < 1 la suma por canales deja franjas de color
    k === 'r' ? '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0 1' : k === 'g' ? '0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 0 1' : '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 0 1'
  f.innerHTML = `
    <feGaussianBlur in="SourceGraphic" stdDeviation="${BLUR_RIM}" result="blur"/>
    <feGaussianBlur in="SourceGraphic" stdDeviation="${BLUR_FROST}" result="frost"/>
    <feImage href="${dispURL}" x="0" y="0" width="${w}" height="${h}" preserveAspectRatio="none" result="map"/>
    ${
      chroma
        ? `<feDisplacementMap in="blur" in2="map" scale="${S * (1 - CA)}" xChannelSelector="R" yChannelSelector="G" result="dr"/>
    <feDisplacementMap in="blur" in2="map" scale="${S}" xChannelSelector="R" yChannelSelector="G" result="dg"/>
    <feDisplacementMap in="blur" in2="map" scale="${S * (1 + CA)}" xChannelSelector="R" yChannelSelector="G" result="db"/>
    <feColorMatrix in="dr" type="matrix" values="${channel('r')}" result="cr"/>
    <feColorMatrix in="dg" type="matrix" values="${channel('g')}" result="cg"/>
    <feColorMatrix in="db" type="matrix" values="${channel('b')}" result="cb"/>
    <feComposite in="cr" in2="cg" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="crg"/>
    <feComposite in="crg" in2="cb" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="refracted"/>`
        : `<feDisplacementMap in="blur" in2="map" scale="${S}" xChannelSelector="R" yChannelSelector="G" result="refracted"/>`
    }
    <feColorMatrix in="map" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 1 0 0" result="rimMask"/>
    <feComposite in="refracted" in2="rimMask" operator="in" result="rimPart"/>
    <feComposite in="frost" in2="rimMask" operator="out" result="centerPart"/>
    <feComposite in="rimPart" in2="centerPart" operator="over" result="merged"/>
    <feImage href="${specURL}" x="0" y="0" width="${w}" height="${h}" preserveAspectRatio="none" result="spec"/>
    <feComposite in="spec" in2="merged" operator="over"/>`

  el.style.setProperty('--glass-filter', `url(#${id})`)
  el.dataset.refractKey = key
  el.setAttribute('data-refract', '')
}

function clear(el: HTMLElement) {
  el.removeAttribute('data-refract')
  el.style.removeProperty('--glass-filter')
  delete el.dataset.refractKey
}

// ── observar elementos `.glass--refract` (también los que se crean después, como el visor de imágenes) ──
const watched = new Set<HTMLElement>()
let pending = new Set<HTMLElement>()
let frame = 0

function flush() {
  frame = 0
  const list = pending
  pending = new Set()
  list.forEach((el) => {
    if (enabled()) build(el)
    else clear(el)
    el.removeAttribute('data-refract-hold')
  })
}
function schedule(el: HTMLElement) {
  pending.add(el)
  if (!frame) frame = requestAnimationFrame(flush)
}

// Mientras un elemento cambia de tamaño (p. ej. el dock al contraerse) su mapa de lente deja de coincidir: se marca
// data-refract-hold (el CSS usa un desenfoque simple con el mismo relleno) y el mapa se regenera al asentarse el tamaño.
const settleTimers = new WeakMap<HTMLElement, number>()
function settle(el: HTMLElement) {
  el.setAttribute('data-refract-hold', '')
  window.clearTimeout(settleTimers.get(el))
  settleTimers.set(el, window.setTimeout(() => schedule(el), 130))
}
const ro = new ResizeObserver((entries) =>
  entries.forEach((e) => {
    const el = e.target as HTMLElement
    if (!el.hasAttribute('data-refract')) return schedule(el)
    if (measure(el).key !== el.dataset.refractKey) settle(el)
  })
)
function watch(el: HTMLElement) {
  if (watched.has(el)) return
  watched.add(el)
  ro.observe(el)
  schedule(el)
}

// ── relleno adaptativo: ¿pasa una foto, un video o un bloque oscuro por detrás? ─────────────────────
const MEDIA = 'img, video, iframe, canvas, [data-glass-dark], .flow__chip.is-active, .glass--dark, .glass--blue'
// fotos/video solo cuentan si son grandes (los íconos pequeños no deben hacer parpadear el menú); lo oscuro cuenta siempre
const DARK = '[data-glass-dark], .flow__chip.is-active, .glass--dark, .glass--blue'
let adaptiveFrame = 0
function adapt() {
  adaptiveFrame = 0
  document.querySelectorAll<HTMLElement>('[data-glass-adaptive]').forEach((el) => {
    const r = el.getBoundingClientRect()
    const y = r.top + r.height / 2
    let over = false
    // un punto cada ~48 px: los chips y botones oscuros son pequeños y con pocos puntos se escaparían
    for (let x = r.left + 24; x < r.right - 12; x += 48) {
      for (const hit of document.elementsFromPoint(x, y)) {
        if (el.contains(hit) || !hit.matches(MEDIA)) continue
        const b = hit.getBoundingClientRect()
        if (hit.matches(DARK) || (b.width >= 160 && b.height >= 100)) over = true
      }
      if (over) break
    }
    if (over) el.setAttribute('data-over-media', '')
    else el.removeAttribute('data-over-media')
  })
}
let lastAdapt = 0
const scheduleAdapt = () => {
  if (adaptiveFrame) return
  // como mucho una comprobación cada 100 ms (elementsFromPoint hace hit-testing)
  const wait = Math.max(0, 100 - (performance.now() - lastAdapt))
  adaptiveFrame = window.setTimeout(() => {
    lastAdapt = performance.now()
    requestAnimationFrame(adapt)
  }, wait)
}

// ── regulador: mide la fluidez del scroll con la refracción activa ──────────────────────────────
let govern = () => {}
if (isChromium && !tooSlow) {
  const dts: number[] = []
  let sampling = false
  let lastTs = 0
  let lastScroll = 0
  const loop = (t: number) => {
    // se ignoran los primeros 2.5 s tras la carga (imágenes, fuentes, hidratación) y las pausas largas (pestaña en segundo plano)
    if (lastTs && t > 2500 && t - lastTs < 250) dts.push(t - lastTs)
    lastTs = t
    if (performance.now() - lastScroll < 180 && dts.length < 90) requestAnimationFrame(loop)
    else {
      sampling = false
      lastTs = 0
      if (dts.length >= 60) {
        const sorted = [...dts].sort((a, b) => a - b)
        // Los fotogramas caen en escalones de 16.7 / 33.3 / 50 ms; con umbral 28 el ruido normal (mediana en 33.3) lo disparaba.
        // 36 ms solo se supera si la mayoría de los fotogramas tarda ≥ 50 ms (≈ 20 fps o menos): una experiencia realmente mala.
        if (sorted[Math.floor(sorted.length / 2)] > 36 && store('glass-refract-force') !== '1') {
          tooSlow = true
          store('glass-refract-low', '1')
          watched.forEach(schedule)
        }
      }
    }
  }
  govern = () => {
    lastScroll = performance.now()
    if (!sampling && dts.length < 90) {
      sampling = true
      requestAnimationFrame(loop)
    }
  }
}

function start() {
  document.querySelectorAll<HTMLElement>('.glass--refract').forEach(watch)
  new MutationObserver((muts) => {
    muts.forEach((m) =>
      m.addedNodes.forEach((n) => {
        if (!(n instanceof HTMLElement)) return
        if (n.matches('.glass--refract')) watch(n)
        n.querySelectorAll<HTMLElement>('.glass--refract').forEach(watch)
      })
    )
  }).observe(document.body, { childList: true, subtree: true })
  reduce.forEach((m) => m.addEventListener('change', () => watched.forEach(schedule)))
  window.addEventListener('scroll', scheduleAdapt, { passive: true })
  window.addEventListener('scroll', () => govern(), { passive: true })
  window.addEventListener('resize', scheduleAdapt, { passive: true })
  scheduleAdapt()
}

if (isChromium) {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start)
  else start()
}
