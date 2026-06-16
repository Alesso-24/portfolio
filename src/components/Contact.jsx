/**
 * @file Contact.jsx
 * @description Contact section and site footer.
 *
 * Content:
 *  - Primary email: jordi.reyes.martinez@gmail.com (mailto: link).
 *  - CC instruction: * Please CC your email to jordi.reyes@iberopuebla.mx
 *    Note: the CC text must NOT use the `uppercase` CSS class — it renders the email in ALL CAPS.
 *  - Location: Puebla, Mexico.
 *  - Copyright: © Alessandro Reyes.
 *
 * Background:
 *  - Uses `<AnimatedGradientBackground />` for a subtle moving gradient behind the text.
 */
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedGradientBackground from './ui/animated-gradient-background';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="py-32 px-4 md:px-8 bg-brand-dark min-h-screen flex flex-col justify-between relative overflow-hidden border-t border-brand-primary/5">
      
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
                <h3 className="font-sans font-medium text-[10px] uppercase tracking-[0.2em] text-brand-primary/50 mb-8 flex items-center gap-3">
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
                        <p className="text-brand-primary/30 font-sans text-[10px] tracking-[0.1em] mt-2">* Please CC your email to jordi.reyes@iberopuebla.mx</p>
                    </div>
                    <p className="text-brand-primary/40 font-sans text-xs uppercase tracking-[0.2em]">Puebla, Mexico</p>
                </div>
            </motion.div>

            <motion.form 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="flex flex-col gap-10 glass-panel p-8 md:p-12 rounded-3xl" 
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="relative group">
                    <input 
                        type="text" 
                        placeholder={t('contact.form.name')} 
                        className="w-full bg-transparent border-b border-brand-primary/10 pb-4 text-brand-primary font-sans text-sm tracking-widest placeholder-brand-primary/50 outline-none focus:border-brand-primary transition-colors"
                    />
                </div>
                <div className="relative group">
                    <input 
                        type="email" 
                        placeholder={t('contact.form.email')} 
                        className="w-full bg-transparent border-b border-brand-primary/10 pb-4 text-brand-primary font-sans text-sm tracking-widest placeholder-brand-primary/50 outline-none focus:border-brand-primary transition-colors"
                    />
                </div>
                <div className="relative group">
                    <textarea 
                        placeholder={t('contact.form.message')} 
                        rows="4"
                        className="w-full bg-transparent border-b border-brand-primary/10 pb-4 text-brand-primary font-sans text-sm tracking-widest placeholder-brand-primary/50 outline-none focus:border-brand-primary transition-colors resize-none"
                    ></textarea>
                </div>
                
                <button type="submit" className="self-end mt-4 px-10 py-4 bg-brand-primary text-white font-sans text-[11px] tracking-[0.2em] uppercase rounded-full hover:bg-brand-accent hover:text-white hover:border hover:border-brand-accent transition-all duration-300">
                    {t('contact.form.send')}
                </button>
            </motion.form>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="max-w-7xl mx-auto w-full mt-24 flex flex-col md:flex-row gap-6 justify-center items-center font-sans font-light text-[10px] text-brand-primary/40 uppercase tracking-[0.1em] border-t border-brand-primary/10 pt-10 z-10 pb-4"
      >
        <p> {t('contact.footer')} </p>
      </motion.div>
    </section>
  );
};

export default Contact;
