import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X, Globe, Github, Linkedin, Instagram } from 'lucide-react'
import { NAV_LINKS, SITE } from '../../data/content'

interface Props { lang?: 'en' | 'es' }

export default function Nav({ lang: initialLang = 'en' }: Props) {
  const [lang, setLang]       = useState<'en' | 'es'>(initialLang)
  const [menuOpen, setMenu]   = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px clamp(20px,4vw,60px)',
          backdropFilter: 'blur(12px)',
          background: scrolled ? 'rgba(243,237,225,0.88)' : 'rgba(243,237,225,0.72)',
          borderBottom: '1px solid rgba(33,31,26,0.08)',
          transition: 'background 0.3s',
        }}
      >
        {/* Left: avatar + name */}
        <a href="/portfolio/" style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none', color:'#211f1a' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 36, height: 36, borderRadius: '50%',
            background: '#2540c0', color: '#f3ede1',
            fontFamily: "'Instrument Serif', serif", fontSize: 18,
          }}>
            A
          </span>
          <span style={{ fontWeight: 600, fontSize: 16, letterSpacing: '-0.01em', fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}>
            Alessandro Reyes
          </span>
        </a>

        {/* Center: desktop nav links */}
        <nav style={{ display: 'none', gap: 36, alignItems: 'center' }} className="desktop-nav"
          aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#4a473f', fontSize: 14, fontWeight: 500,
                fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ea6a2e')}
              onMouseLeave={e => (e.currentTarget.style.color = '#4a473f')}
            >
              {link.label[lang]}
            </button>
          ))}
        </nav>

        {/* Right: pill + lang + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* "Open to Summer 2026" pill — hidden on mobile, shown ≥860px via CSS */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}
            className="status-pill"
            style={{
              display: 'flex', alignItems: 'center', gap: 9,
              padding: '10px 18px', borderRadius: 100,
              background: '#211f1a', color: '#f3ede1',
              textDecoration: 'none', fontSize: 13, fontWeight: 600,
              fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{
              width: 7, height: 7, borderRadius: '50%', background: '#ea6a2e',
              animation: 'ar-pulse 1.8s infinite', flexShrink: 0,
            }} />
            {lang === 'en' ? 'Open to Summer 2026' : 'Disponible Verano 2026'}
          </a>

          {/* Language toggle */}
          <button
            onClick={() => setLang(l => l === 'en' ? 'es' : 'en')}
            title="Toggle Language"
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: 'none', border: '1px solid transparent', cursor: 'pointer',
              color: '#6f6a5f', fontSize: 11, fontWeight: 600,
              fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
              letterSpacing: '0.1em', padding: '6px 8px', borderRadius: 100,
              transition: 'all 0.2s',
            }}
          >
            <Globe size={14} strokeWidth={1.5} />
            {lang.toUpperCase()}
          </button>

          {/* Hamburger — shown on mobile */}
          <button
            className="hamburger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenu(o => !o)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#211f1a', padding: 4, display: 'flex',
            }}
          >
            {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              background: 'rgba(243,237,225,0.97)', backdropFilter: 'blur(16px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <nav aria-label="Mobile navigation" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40, width: '100%', padding: '0 32px' }}>
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
                  {link.label[lang]}
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
              aria-label="Close menu"
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
