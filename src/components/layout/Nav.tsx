import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X, Globe, Github, Linkedin, Instagram, Briefcase, FlaskConical, User, Mail, BookOpen } from 'lucide-react'
import { NAV_LINKS, SITE } from '../../data/content'

/** ícono de cada enlace del menú (trazo fino, mismo estilo que el resto de íconos); en el dock contraído solo queda el ícono */
const NAV_ICONS: Record<string, typeof Briefcase> = {
  '#work': Briefcase,
  '#research': FlaskConical,
  '#about': User,
  '#contact': Mail,
  '/portfolio/docs': BookOpen,
}

interface Props { lang?: 'en' | 'es' }

/** Ambos idiomas en el HTML; el CSS global muestra el activo (sin parpadeo al cargar). */
const T = ({ en, es }: { en: string; es: string }) => (
  <>
    <span className="lang-en">{en}</span>
    <span className="lang-es">{es}</span>
  </>
)

export default function Nav({ lang: initialLang = 'en' }: Props) {
  const [lang, setLang]       = useState<'en' | 'es'>(initialLang)
  const [menuOpen, setMenu]   = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Dock: se contrae al bajar y se expande al subir, al pasar el mouse, al enfocar con teclado, con el menú abierto
  // o (en pantallas táctiles) al tocarlo. Con prefers-reduced-motion nunca se contrae. Ver LIQUID-GLASS.md §9.
  const [compact, setCompact] = useState(false)
  const [hover, setHover] = useState(false)
  const [peek, setPeek] = useState(false)
  const peekTimer = useRef<number>(0)
  const dock = compact && !hover && !peek && !menuOpen

  // Indicador de vidrio que se desliza entre los enlaces (hover/foco) y descansa en la sección activa
  const linksRef = useRef<HTMLElement>(null)
  const hovering = useRef(false)
  const [indicator, setIndicator] = useState({ x: 0, w: 0, show: false })
  const [active, setActive] = useState<string | null>(null)

  const moveTo = (el: Element | null) => {
    const nav = linksRef.current
    if (!el || !nav) return
    const n = nav.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    setIndicator({ x: r.left - n.left, w: r.width, show: true })
  }

  const activeRef = useRef<string | null>(null)
  activeRef.current = active

  const restIndicator = () => {
    const cur = activeRef.current
    const el = cur ? linksRef.current?.querySelector(`[data-href="${cur}"]`) ?? null : null
    if (el) moveTo(el)
    else setIndicator((i) => ({ ...i, show: false }))
  }

  useEffect(() => {
    if (!hovering.current) restIndicator()
  }, [active])

  // El dock cambia de tamaño con una animación: el indicador se recoloca en cada fotograma mientras dura
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const ro = new ResizeObserver(() => { if (!hovering.current) restIndicator() })
    ro.observe(bar)
    return () => ro.disconnect()
  }, [])

  // Dirección del scroll con umbral acumulado (32 px) para que el scroll suave (Lenis) no haga parpadear el dock
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let lastY = window.scrollY
    let acc = 0
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const y = window.scrollY
        const dy = y - lastY
        lastY = y
        acc = Math.sign(dy) === Math.sign(acc) ? acc + dy : dy
        if (y < 120) { setCompact(false); acc = 0 }
        else if (acc > 32) setCompact(true)
        else if (acc < -32) setCompact(false)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: solo en la home (allí existen las secciones #work, #research…)
  useEffect(() => {
    const targets = NAV_LINKS.filter((l) => l.href.startsWith('#'))
      .map((l) => ({ id: l.href, el: document.querySelector(l.href) }))
      .filter((t): t is { id: string; el: Element } => !!t.el)
    if (!targets.length) {
      // fuera de la home no hay secciones que vigilar: la sección activa es la de la página actual
      const path = window.location.pathname
      setActive(path.includes('/docs') ? '/portfolio/docs' : path.includes('/project/') ? '#work' : null)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = '#' + (e.target as HTMLElement).id
          if (e.isIntersecting) setActive(id)
          else setActive((cur) => (cur === id ? null : cur))
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    targets.forEach((t) => io.observe(t.el))
    return () => io.disconnect()
  }, [])

  // El idioma vive en <html lang> (lo fija el script de Base.astro con la preferencia guardada);
  // aquí solo se sincroniza el estado al hidratar. Los textos cambian por CSS (.lang-en / .lang-es).
  useEffect(() => {
    const current = document.documentElement.getAttribute('lang')
    if (current === 'en' || current === 'es') setLang(current)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenu(false) }
    if (menuOpen) document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const scrollTo = (href: string) => {
    setMenu(false)
    // Non-hash links (e.g. "/portfolio/docs") are real routes, not in-page anchors.
    if (!href.startsWith('#')) {
      window.location.href = href
      return
    }
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = `/portfolio/${href}`
    }
  }

  const toggleLang = () => {
    const next = document.documentElement.getAttribute('lang') === 'es' ? 'en' : 'es'
    setLang(next)
    document.documentElement.setAttribute('lang', next)
    try { localStorage.setItem('lang', next) } catch {}
    window.dispatchEvent(new CustomEvent('lang-change', { detail: next }))
  }

  return (
    <>
      <header className={`glass-nav${scrolled ? ' is-scrolled' : ''}${dock ? ' is-compact' : ''}`}>
        <div
          ref={barRef}
          className="glass-nav__bar glass glass--blur glass--refract"
          data-glass-adaptive=""
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={(e) => { if ((e.target as HTMLElement).matches(':focus-visible')) setHover(true) }}
          onBlur={() => setHover(barRef.current?.matches(':hover') ?? false)}
          onClickCapture={(e) => {
            // táctil: con el dock contraído, tocar el avatar/nombre lo expande unos segundos en vez de navegar
            if (dock && window.matchMedia('(pointer: coarse)').matches && (e.target as HTMLElement).closest('.glass-nav__brand')) {
              e.preventDefault()
              setPeek(true)
              window.clearTimeout(peekTimer.current)
              peekTimer.current = window.setTimeout(() => setPeek(false), 3500)
            }
          }}
        >
          {/* Izquierda: avatar + nombre */}
          <a href="/portfolio/" className="glass-nav__brand">
            <span className="glass-nav__avatar">A</span>
            <span className="glass-nav__name">Alessandro Reyes</span>
          </a>

          {/* Centro: enlaces (solo escritorio) */}
          <nav
            ref={linksRef}
            className="desktop-nav glass-nav__links"
            style={{ display: 'none' }}
            onMouseLeave={() => { hovering.current = false; restIndicator() }}
            aria-label={lang === 'es' ? 'Navegación principal' : 'Main navigation'}
          >
            <span
              className="glass-nav__indicator"
              aria-hidden="true"
              style={{ width: indicator.w, transform: `translateX(${indicator.x}px)`, opacity: indicator.show ? 1 : 0 }}
            />
            {NAV_LINKS.map((link) => {
              const Icon = NAV_ICONS[link.href]
              return (
                <button
                  key={link.href}
                  data-href={link.href}
                  onClick={() => scrollTo(link.href)}
                  onMouseEnter={(e) => { hovering.current = true; moveTo(e.currentTarget) }}
                  onFocus={(e) => moveTo(e.currentTarget)}
                  onBlur={() => { if (!hovering.current) restIndicator() }}
                  aria-current={active === link.href ? 'true' : undefined}
                  aria-label={link.label[lang]}
                  className="glass-nav__link"
                >
                  {Icon && <Icon size={16} strokeWidth={1.5} className="glass-nav__icon" aria-hidden="true" />}
                  <span className="glass-nav__label"><T {...link.label} /></span>
                </button>
              )
            })}
          </nav>

          {/* Derecha: disponibilidad + idioma + hamburguesa */}
          <div className="glass-nav__right">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
              className="status-pill glass-nav__pill glass--dark glass-press"
            >
              <span className="glass-nav__dot" />
              <T en="Open to work" es="Disponible" />
            </a>

            <button
              onClick={toggleLang}
              title={lang === 'en' ? 'Cambiar a español' : 'Switch to English'}
              aria-label={lang === 'en' ? 'Cambiar a español' : 'Switch to English'}
              className="glass-nav__lang glass-press"
            >
              <Globe size={14} strokeWidth={1.5} />
              <T en="EN" es="ES" />
            </button>

            <button
              className="hamburger glass-nav__burger glass-press"
              aria-label={menuOpen ? (lang === 'es' ? 'Cerrar menú' : 'Close menu') : (lang === 'es' ? 'Abrir menú' : 'Open menu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenu((o) => !o)}
            >
              {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={lang === 'es' ? 'Menú de navegación' : 'Navigation menu'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="glass-menu glass--blur-strong"
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <nav aria-label={lang === 'es' ? 'Navegación móvil' : 'Mobile navigation'} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40, width: '100%', padding: '0 32px' }}>
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => scrollTo(link.href)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: "'Instrument Serif', serif", fontWeight: 400,
                    fontSize: 'clamp(40px, 9vw, 64px)', color: 'rgba(33,31,26,0.9)',
                    letterSpacing: '-0.01em', lineHeight: 1,
                    transition: 'color 0.2s',
                  }}
                >
                  <T {...link.label} />
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                style={{ display: 'flex', gap: 32, marginTop: 16 }}
              >
                {[
                  { href: SITE.github,    icon: <Github size={24} strokeWidth={1.5} />,    label: 'GitHub' },
                  { href: SITE.linkedin,  icon: <Linkedin size={24} strokeWidth={1.5} />,  label: 'LinkedIn' },
                  { href: SITE.instagram, icon: <Instagram size={24} strokeWidth={1.5} />, label: 'Instagram' },
                ].map(({ href, icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    aria-label={label}
                    style={{ color: 'rgba(33,31,26,0.6)', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#ea6a2e')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(33,31,26,0.6)')}
                  >
                    {icon}
                  </a>
                ))}
              </motion.div>
            </nav>

            {/* Tap-outside to close */}
            <button
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: 'none', border: 'none', cursor: 'default', zIndex: -1 }}
              onClick={() => setMenu(false)}
              aria-label={lang === 'es' ? 'Cerrar menú' : 'Close menu'}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav { display: flex !important; }
          .hamburger   { display: none !important; }
        }
        @media (max-width: 640px) {
          .status-pill { display: none !important; }
        }
      `}</style>
    </>
  )
}
