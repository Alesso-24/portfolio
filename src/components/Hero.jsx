/**
 * @file Hero.jsx
 * @description Full-screen Hero section — the first thing visitors see.
 *
 * Layout:
 *  - `<HeroGradient />` renders an animated Canvas2D background (cursor-reactive orbs).
 *  - A radial vignette overlay darkens the edges to focus attention on the text.
 *  - Two headline lines ("Alessandro" + "Mechatronics & Software") animate in with GSAP
 *    staggered y-translate + opacity on mount.
 *  - A subtitle paragraph fades in last.
 *  - A pulsing 1px vertical line at the bottom hints at scrollable content.
 *
 * Performance:
 *  - No Three.js / WebGL — the background is pure Canvas2D.
 *  - GSAP animations only use `opacity` and `transform: translateY` (GPU composited).
 */
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroGradient from './HeroGradient';
import { useLanguage } from '../context/LanguageContext';

// --- HERO COMPONENT --- //
const Hero = () => {
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {

    const tl = gsap.timeline({ delay: 0.4 });

    tl.fromTo(title1Ref.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' }
    )
    .fromTo(title2Ref.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out' },
      "-=1.1"
    )
    .fromTo(subtitleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: 'power2.out' },
      "-=0.5"
    );

    return () => {};
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-dark">
      
      {/* Cursor-reactive gradient background — pure Canvas2D, 60fps on any device */}
      <HeroGradient />

      {/* Subtle vignette to guide the eye to center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#F7F5F0_90%)] pointer-events-none" style={{ zIndex: 1 }}></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-7xl mx-auto flex flex-col items-center">
        <div className="overflow-hidden pb-2 mb-2">
            <span ref={title1Ref} className="font-sans font-light text-[6vw] md:text-[3vw] tracking-[0.2em] text-brand-primary uppercase opacity-80 block">
                Alessandro
            </span>
        </div>
        <div className="overflow-hidden pb-4">
            <h1 ref={title2Ref} className="font-display font-medium text-[12vw] md:text-[9vw] leading-[0.9] tracking-tight text-brand-primary block">
                {t('hero.title_mechatronics')}
                <br />
                <span className="text-brand-orange italic font-light">&</span> {t('hero.title_software')}
            </h1>
        </div>
        
        <p ref={subtitleRef} className="mt-12 text-xs md:text-[15px] font-sans text-brand-primary/70 max-w-xl mx-auto leading-relaxed">
          {t('hero.subtitle')}
        </p>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
            <div className="w-[1px] h-[50px] bg-gradient-to-b from-brand-primary/0 via-brand-primary/40 to-brand-primary/0 mx-auto animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
