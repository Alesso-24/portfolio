// Reflejo que sigue al puntero sobre las superficies `.glass-sheen` (ver src/styles/glass.css).
// Solo escribe dos variables CSS (--mx/--my) por fotograma; no toca el diseño ni anima nada pesado.
// Se desactiva sin puntero fino (móvil) o con prefers-reduced-motion.
const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

if (fine.matches && !reduced.matches) {
  let frame = 0
  let target: HTMLElement | null = null
  let x = 0
  let y = 0

  document.addEventListener(
    'pointermove',
    (e) => {
      const el = (e.target as HTMLElement | null)?.closest?.<HTMLElement>('.glass-sheen') ?? null
      if (!el) return
      target = el
      x = e.clientX
      y = e.clientY
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        if (!target) return
        const r = target.getBoundingClientRect()
        target.style.setProperty('--mx', `${x - r.left}px`)
        target.style.setProperty('--my', `${y - r.top}px`)
      })
    },
    { passive: true }
  )
}
