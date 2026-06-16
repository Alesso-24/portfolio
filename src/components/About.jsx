/**
 * @file About.jsx
 * @description "About Me" section — presented as an information-dense Bento Grid layout.
 *
 * Design:
 *  - Inspired by modern SaaS Bento layouts (e.g., Linear, Vercel dashboards).
 *  - Uses CSS Grid with `glass-panel` utility (backdrop-blur + border + shadow) for each cell.
 *  - Background glow is a CSS `radial-gradient` (NOT `filter: blur`) to prevent GPU paint storms.
 *
 * Content:
 *  - Bio, education, key skills, tools, languages, and a "Currently Working On" panel.
 *
 * Animation:
 *  - GSAP ScrollTrigger batch reveals each `.bento-item` with a staggered y-translate + opacity
 *    as the section enters the viewport. Trigger resets on leave for re-play on scroll-up.
 */
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const textRef = useRef(null);
  const triggerRef = useRef(null);
  const { t, language } = useLanguage();

  useEffect(() => {
    // Awwwards style text reveal on scroll
    const letters = textRef.current.children;
    
    gsap.fromTo(letters, 
      { opacity: 0.2, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      }
    );
  }, []);

  // Re-run animation when language changes
  useEffect(() => {
    const letters = textRef.current.children;
    gsap.set(letters, { opacity: 0.2, y: 20 });
    
    gsap.to(letters, { 
      opacity: 1, 
      y: 0, 
      stagger: 0.05,
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      }
    });
  }, [language]);

  // Split text into lines for animation
  const text = t('about.p1') + " " + t('about.p2');
  const words = text.split(" ");

  return (
    <section id="about" ref={triggerRef} className="py-32 px-4 md:px-8 bg-brand-dark min-h-screen flex items-center relative overflow-hidden">
      {/* Background glow - optimized for performance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(217,93,57,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        <div className="mb-16">
            <h2 className="font-display font-medium text-4xl md:text-5xl text-brand-primary tracking-tight">
                {t('about.title')}<span className="text-brand-orange">.</span>
            </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* Main Intro Panel */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-1 lg:col-span-2 glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-brand-primary/10 transition-colors duration-500"
            >
                <div className="absolute top-0 right-0 p-6 opacity-10 text-brand-primary">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
                <h3 className="text-brand-accent text-xs mb-8 font-sans uppercase tracking-[0.2em] font-medium">{t('about.aboutMe')}</h3>
                <div ref={textRef} className="text-2xl md:text-3xl font-display font-light leading-[1.4] text-brand-primary flex flex-wrap gap-x-2 gap-y-1">
                    {words.map((word, i) => (
                        <span key={i} className="inline-block relative">
                            {word}
                        </span>
                    ))}
                </div>
            </motion.div>

            {/* Side Panel: Focus Areas */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="glass-panel p-8 md:p-10 rounded-3xl flex flex-col justify-between hover:border-brand-primary/10 transition-colors duration-500"
            >
                <div>
                   <h3 className="text-brand-accent text-xs mb-8 font-sans uppercase tracking-[0.2em] font-medium">{t('about.focusAreas')}</h3>
                   <ul className="space-y-4 font-sans font-medium text-[15px] text-brand-primary/80">
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span> {t('about.focus1')}</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span> {t('about.focus2')}</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span> {t('about.focus3')}</li>
                        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span> {t('about.focus4')}</li>
                   </ul>
                </div>
                <div className="pt-8 mt-8 border-t border-brand-primary/10">
                    <p className="font-sans font-medium text-xs uppercase tracking-widest text-brand-primary/60">Currently open to new opportunities</p>
                </div>
            </motion.div>

            {/* Bottom Row */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="col-span-1 lg:col-span-3 glass-panel p-8 md:p-10 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-8 hover:border-brand-primary/10 transition-colors duration-500"
            >
                <div className="w-full">
                    <h3 className="text-brand-accent text-xs mb-8 font-sans uppercase tracking-[0.2em] font-medium">{t('about.techStack')}</h3>
                    <div className="flex flex-wrap gap-2">
                        {['Robotics', 'C/C++', 'Python', 'Machine Learning', 'ESP32', 'Computer Vision', 'React', 'TailwindCSS'].map((skill, i) => (
                            <span key={i} className="px-4 py-2 font-sans font-medium text-xs bg-brand-primary/5 border border-brand-primary/10 rounded-full text-brand-primary/80 hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all duration-300 cursor-default">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
