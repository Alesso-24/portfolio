/**
 * @file Contact.jsx
 * @description Contact section and site footer.
 *
 * Content:
 *  - Primary email: jordi.reyes.martinez@gmail.com (mailto: link).
 *  - CC instruction: * Please CC your email to jordi.reyes@iberopuebla.mx
 *    Intentional (kept by Jordi's explicit request 2026-06-16) — do not
 *    remove as an "identity leak" cleanup. Must NOT use `uppercase`.
 *  - Location: Puebla, Mexico.
 *  - Copyright: © Alessandro Reyes.
 *
 * Form:
 *  - Submits to FormSubmit.co's AJAX endpoint (no backend needed). The
 *    target inbox must click a one-time confirmation email the first time
 *    it receives a submission before delivery actually starts -- see
 *    https://formsubmit.co. `_honey` is a honeypot field FormSubmit uses
 *    to silently drop bot submissions.
 *
 * Background:
 *  - Uses `<AnimatedGradientBackground />` for a subtle moving gradient behind the text.
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedGradientBackground from './ui/animated-gradient-background';
import { useLanguage } from '../context/LanguageContext';

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/jordi.reyes.martinez@gmail.com';

const Contact = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', message: '', _honey: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form._honey) return; // bot caught by honeypot, silently drop
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New portfolio contact from ${form.name}`,
        }),
      });
      const data = await res.json();
      // FormSubmit returns HTTP 200 even when the endpoint isn't activated
      // yet (success: "false" as a string) -- check the body, not just ok.
      if (!res.ok || data.success !== 'true') throw new Error('Request failed');
      setStatus('success');
      setForm({ name: '', email: '', message: '', _honey: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 px-4 md:px-8 bg-brand-cream min-h-screen flex flex-col justify-between relative overflow-hidden border-t border-brand-primary/5">

      {/* Background dynamic glow */}
      <AnimatedGradientBackground />

      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center py-20">

        <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-[10vw] md:text-[8vw] leading-none tracking-tight text-brand-primary text-center transition-all duration-300 mb-16 opacity-90"
        >
            {t('contact.title')}<span className="text-brand-primary/20">.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mt-10 max-w-5xl mx-auto w-full z-10">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="flex flex-col justify-center"
            >
                <h3 className="font-sans font-medium text-[10px] uppercase tracking-[0.2em] text-brand-primary/70 mb-8 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-brand-primary/30 rounded-full"></div>
                    {t('contact.subtitle')}
                </h3>
                <p className="text-brand-primary/80 mb-10 max-w-sm font-sans font-light text-sm md:text-base leading-relaxed">
                    {t('contact.p1')}
                </p>
                <div className="space-y-6 text-lg font-display tracking-wide">
                    <div>
                        <a href="mailto:jordi.reyes.martinez@gmail.com" className="block text-brand-primary hover:text-brand-accent transition-colors duration-300 text-xl md:text-2xl">
                            jordi.reyes.martinez@gmail.com
                        </a>
                        <p className="text-brand-primary/70 font-sans text-[10px] tracking-[0.1em] mt-2">* Please CC your email to jordi.reyes@iberopuebla.mx</p>
                    </div>
                    <p className="text-brand-primary/70 font-sans text-xs uppercase tracking-[0.2em]">Puebla, Mexico</p>
                </div>
            </motion.div>

            <motion.form
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="flex flex-col gap-10 glass-panel p-8 md:p-12 rounded-3xl"
                onSubmit={handleSubmit}
            >
                {/* Honeypot -- hidden from real users, bots tend to fill every field */}
                <input
                    type="text"
                    name="_honey"
                    value={form._honey}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex="-1"
                    autoComplete="off"
                />

                <div className="relative group">
                    <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder={t('contact.form.name')}
                        disabled={status === 'sending'}
                        className="w-full bg-transparent border-b border-brand-primary/10 pb-4 text-brand-primary font-sans text-sm tracking-widest placeholder-brand-primary/50 outline-none focus:border-brand-primary transition-colors disabled:opacity-50"
                    />
                </div>
                <div className="relative group">
                    <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder={t('contact.form.email')}
                        disabled={status === 'sending'}
                        className="w-full bg-transparent border-b border-brand-primary/10 pb-4 text-brand-primary font-sans text-sm tracking-widest placeholder-brand-primary/50 outline-none focus:border-brand-primary transition-colors disabled:opacity-50"
                    />
                </div>
                <div className="relative group">
                    <textarea
                        name="message"
                        required
                        value={form.message}
                        onChange={handleChange}
                        placeholder={t('contact.form.message')}
                        rows="4"
                        disabled={status === 'sending'}
                        className="w-full bg-transparent border-b border-brand-primary/10 pb-4 text-brand-primary font-sans text-sm tracking-widest placeholder-brand-primary/50 outline-none focus:border-brand-primary transition-colors resize-none disabled:opacity-50"
                    ></textarea>
                </div>

                <div className="flex flex-col gap-4 items-end">
                    {status === 'success' && (
                        <p className="text-brand-accent font-sans text-xs text-right">{t('contact.form.success')}</p>
                    )}
                    {status === 'error' && (
                        <p className="text-[#b91c1c] font-sans text-xs text-right">{t('contact.form.error')}</p>
                    )}
                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="self-end px-10 py-4 bg-brand-primary text-white font-sans text-[11px] tracking-[0.2em] uppercase rounded-full hover:bg-brand-accent hover:text-white hover:border hover:border-brand-accent transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
                    </button>
                </div>
            </motion.form>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-7xl mx-auto w-full mt-24 flex flex-col md:flex-row gap-6 justify-center items-center font-sans font-light text-[10px] text-brand-primary/70 uppercase tracking-[0.1em] border-t border-brand-primary/10 pt-10 z-10 pb-4"
      >
        <p> {t('contact.footer')} </p>
      </motion.div>
    </section>
  );
};

export default Contact;
