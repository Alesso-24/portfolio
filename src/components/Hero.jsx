/**
 * @file Hero.jsx
 * @description Full-screen Hero section — Dual column layout featuring profile image and text.
 *
 * Layout:
 *  - `<HeroGradient />` renders an animated Canvas2D background (cursor-reactive orbs).
 *  - A radial vignette overlay darkens the edges to focus attention on the text.
 *  - Two columns: Image (left) and Text (right). On mobile, stacks vertically.
 *
 * Animation:
 *  - Framer Motion is used for buttery smooth entrance animations (Apple-style).
 */
import React from 'react';
import { motion } from 'framer-motion';
import HeroGradient from './HeroGradient';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-brand-dark pt-24 pb-16 md:py-0">
      
      {/* Cursor-reactive gradient background — pure Canvas2D, 60fps on any device */}
      <HeroGradient />

      {/* Subtle vignette to guide the eye to center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#F7F5F0_90%)] pointer-events-none" style={{ zIndex: 1 }}></div>

      {/* Content */}
      <div className="relative z-10 px-6 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 lg:gap-24">
        
        {/* Left Column: Profile Image */}
        <motion.div 
            initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full md:w-5/12 lg:w-4/12 flex justify-center md:justify-end"
        >
            <div className="relative w-full max-w-sm aspect-[4/5] md:aspect-[3/4] rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(217,93,57,0.3)] border border-brand-primary/10 group">
                <div className="absolute inset-0 bg-brand-primary/5 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                <img 
                    src={`${import.meta.env.BASE_URL}images/Alessandro.jpg`} 
                    alt="Alessandro Reyes" 
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                />
            </div>
        </motion.div>

        {/* Right Column: Text Content */}
        <div className="w-full md:w-7/12 lg:w-8/12 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="overflow-hidden pb-2 mb-2 md:mb-4">
                <motion.span 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                    className="font-sans font-medium text-xs md:text-sm lg:text-base tracking-[0.3em] text-brand-orange uppercase block"
                >
                    Alessandro Reyes
                </motion.span>
            </div>
            
            <div className="overflow-hidden pb-4">
                <motion.h1 
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                    className="font-display font-medium text-[12vw] md:text-[6vw] lg:text-[5.5vw] leading-[0.95] tracking-tight text-brand-primary block"
                >
                    {t('hero.title_mechatronics')}
                    <br />
                    <span className="text-brand-orange italic font-light">&</span> {t('hero.title_software')}
                </motion.h1>
            </div>
            
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                className="mt-6 md:mt-8 text-sm md:text-base lg:text-lg font-sans text-brand-primary/70 max-w-lg leading-relaxed"
            >
                {t('hero.subtitle')}
            </motion.p>
            
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="mt-12 flex gap-6 items-center"
            >
                <a href="#projects" className="px-8 py-4 bg-brand-primary text-brand-dark rounded-full font-sans font-medium text-xs uppercase tracking-widest hover:bg-brand-orange hover:text-brand-primary transition-all duration-300">
                    Explore Work
                </a>
            </motion.div>
        </div>

        {/* Scroll indicator (desktop only) */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        >
            <div className="w-[1px] h-[60px] bg-gradient-to-b from-brand-primary/0 via-brand-primary/40 to-brand-primary/0 mx-auto animate-pulse"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
