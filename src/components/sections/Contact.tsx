import { useState, useEffect } from 'react'
import { CONTACT, SITE } from '../../data/content'
import { Github, Linkedin } from 'lucide-react'

interface Props { lang?: 'en' | 'es' }

export default function Contact({ lang: initialLang = 'en' }: Props) {
  const t = CONTACT
  const [lang, setLang] = useState<'en' | 'es'>(initialLang)
  const [form, setForm] = useState({ name: '', email: '', message: '', _honey: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  // Sync with Nav language toggle; pick up any lang set before this island hydrates
  useEffect(() => {
    const current = document.documentElement.getAttribute('lang') as 'en' | 'es'
    if (current && current !== lang) setLang(current)
    const onLangChange = (e: Event) => setLang((e as CustomEvent<'en' | 'es'>).detail)
    window.addEventListener('lang-change', onLangChange)
    return () => window.removeEventListener('lang-change', onLangChange)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form._honey) return
    setStatus('sending')
    try {
      const res = await fetch(SITE.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name, email: form.email, message: form.message,
          _subject: `New portfolio contact from ${form.name}`,
        }),
      })
      const data = await res.json()
      if (!res.ok || data.success !== 'true') throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', message: '', _honey: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'transparent',
    borderBottom: '1px solid rgba(243,237,225,0.2)', paddingBottom: 16,
    color: '#f3ede1', fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
    fontSize: 15, outline: 'none', letterSpacing: '0.04em',
    transition: 'border-color 0.2s',
  }

  return (
    <section
      id="contact"
      style={{
        background: '#2540c0', color: '#f3ede1',
        padding: 'clamp(76px,12vh,150px) clamp(20px,4vw,60px)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Radial orange glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw', height: '60vw',
        background: 'radial-gradient(circle, rgba(234,106,46,0.18), transparent 65%)',
        pointerEvents: 'none',
      }} aria-hidden="true" />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* H2 */}
        <h2 style={{
          margin: '0 0 clamp(48px,8vh,96px)',
          fontFamily: "'Instrument Serif', serif", fontWeight: 400,
          fontSize: 'clamp(40px,7vw,120px)', lineHeight: 0.96,
          letterSpacing: '-0.015em', textWrap: 'balance',
        }}>
          {t.h2[lang]} <em style={{ fontStyle: 'italic', color: '#ea6a2e' }}>{t.h2.italic[lang]}</em>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'clamp(48px,6vw,96px)' }}
             className="contact-grid">

          {/* Left: info */}
          <div>
            <p style={{
              margin: '0 0 32px', fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
              fontSize: 'clamp(15px,1.3vw,17px)', lineHeight: 1.6,
              color: 'rgba(243,237,225,0.8)', maxWidth: '36ch',
            }}>
              {t.paragraph[lang]}
            </p>

            <div style={{ marginBottom: 28 }}>
              <a
                href={`mailto:${SITE.email}`}
                style={{
                  display: 'block', color: '#f3ede1', textDecoration: 'none',
                  fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(18px,1.8vw,24px)',
                  marginBottom: 8, transition: 'opacity 0.2s',
                }}
              >
                {SITE.email}
              </a>
              <p style={{
                margin: 0, color: 'rgba(243,237,225,0.55)',
                fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
                fontSize: 11, letterSpacing: '0.1em',
              }}>
                * Please CC your email to {SITE.emailCC}
              </p>
            </div>

            <p style={{
              margin: '0 0 32px', color: 'rgba(243,237,225,0.6)',
              fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
              fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            }}>
              {SITE.location}
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 22px', borderRadius: 100,
                  border: '1px solid rgba(243,237,225,0.3)',
                  color: '#f3ede1', textDecoration: 'none',
                  fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
                  fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
                }}
              >
                <Github size={16} strokeWidth={1.5} /> GitHub
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 22px', borderRadius: 100,
                  border: '1px solid rgba(243,237,225,0.3)',
                  color: '#f3ede1', textDecoration: 'none',
                  fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
                  fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
                }}
              >
                <Linkedin size={16} strokeWidth={1.5} /> LinkedIn
              </a>
            </div>
          </div>

          {/* Right: form */}
          <form
            onSubmit={handleSubmit}
            aria-label={lang === 'en' ? 'Contact form' : 'Formulario de contacto'}
            style={{ display: 'flex', flexDirection: 'column', gap: 36 }}
          >
            {/* Honeypot */}
            <input
              type="text" name="_honey" value={form._honey}
              onChange={handleChange} tabIndex={-1} autoComplete="off"
              style={{ display: 'none' }}
              aria-hidden="true"
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <label htmlFor="contact-name" className="sr-only">{t.form.name[lang]}</label>
              <input
                id="contact-name"
                type="text" name="name" required value={form.name}
                onChange={handleChange} placeholder={t.form.name[lang]}
                disabled={status === 'sending'}
                style={{ ...inputStyle, opacity: status === 'sending' ? 0.5 : 1 }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <label htmlFor="contact-email" className="sr-only">{t.form.email[lang]}</label>
              <input
                id="contact-email"
                type="email" name="email" required value={form.email}
                onChange={handleChange} placeholder={t.form.email[lang]}
                disabled={status === 'sending'}
                style={{ ...inputStyle, opacity: status === 'sending' ? 0.5 : 1 }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <label htmlFor="contact-message" className="sr-only">{t.form.message[lang]}</label>
              <textarea
                id="contact-message"
                name="message" required value={form.message}
                onChange={handleChange} placeholder={t.form.message[lang]}
                rows={4} disabled={status === 'sending'}
                style={{ ...inputStyle, resize: 'none', opacity: status === 'sending' ? 0.5 : 1 }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
              <div role="status" aria-live="polite" aria-atomic="true">
                {status === 'success' && (
                  <p style={{ margin: 0, color: '#ea6a2e', fontSize: 13, fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}>
                    {t.form.success[lang]}
                  </p>
                )}
                {status === 'error' && (
                  <p style={{ margin: 0, color: '#ff8a65', fontSize: 13, fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}>
                    {t.form.error[lang]}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  padding: '14px 32px', borderRadius: 100,
                  background: '#ea6a2e', color: '#f3ede1', border: 'none',
                  fontFamily: "'Hanken Grotesk', system-ui, sans-serif",
                  fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  letterSpacing: '0.04em', transition: 'opacity 0.2s',
                  opacity: status === 'sending' ? 0.6 : 1,
                }}
              >
                {status === 'sending' ? t.form.sending[lang] : t.form.send[lang]}
              </button>
            </div>
          </form>

        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .contact-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          #contact { padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>
    </section>
  )
}
