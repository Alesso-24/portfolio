/**
 * @file SelfBalancingPlatform.jsx
 * @route /project/self-balancing-platform
 * @description Detail page for the Self-Balancing Platform with Computer Vision project.
 *
 * Project summary:
 *  - Mechatronic system using an ESP32 microcontroller, two servo motors, and a Raspberry Pi camera.
 *  - Computer Vision (Python/OpenCV) detects the ball position in real-time.
 *  - PID Control algorithm adjusts servo angles to keep the ball balanced at the center.
 *  - Full closed-loop control implemented in embedded C/C++.
 *
 * Page layout:
 *  - Hero header with back link.
 *  - Project metadata grid (Role, Duration, Hardware, Tools).
 *  - Alternating text + image sections for each technical chapter.
 *  - Video demo link (YouTube).
 *
 * ⚠️  Does NOT re-initialize Lenis — the global instance in App.jsx handles scroll.
 */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const SelfBalancingPlatform = () => {
  const { t } = useLanguage();
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Animations
    gsap.fromTo(".fade-up", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>Self-Balancing Platform | Alessandro</title>
        <meta name="description" content="A mechatronic system using an ESP32, servomotors, and OpenCV computer vision for strict PID closed-loop control." />
      </Helmet>
      <div className="bg-brand-dark min-h-screen text-[#e5e5e5] font-sans">


      {/* Hero Header */}
      <header className="pt-40 pb-20 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="fade-up">
          <span className="font-sans font-light text-[10px] uppercase tracking-[0.2em] text-brand-primary/50 mb-6 block">{t('balancin.badge')}</span>
          <h1 className="font-display font-medium text-5xl md:text-7xl text-brand-primary tracking-tight leading-none mb-8">
            {t('balancin.title')}
          </h1>
          <p className="font-mono text-brand-primary/70 text-sm md:text-base leading-relaxed max-w-2xl mb-12">
            {t('balancin.description')}
          </p>
        </div>

        {/* Project Meta */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-brand-primary/10 py-8 fade-up mt-12">
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-primary/60 mb-2">{t('balancin.role')}</h4>
            <p className="font-mono text-[13px] text-brand-primary">{t('balancin.role_val')}</p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-primary/60 mb-2">{t('balancin.timeline')}</h4>
            <p className="font-mono text-[13px] text-brand-primary">{t('balancin.timeline_val')}</p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-primary/60 mb-2">{t('larc.hardware')}</h4>
            <p className="font-mono text-[13px] text-brand-primary">ESP32, MG996R Servos</p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-primary/60 mb-2">{t('larc.software')}</h4>
            <p className="font-mono text-[13px] text-brand-primary">Python, C++, OpenCV</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-8 max-w-5xl mx-auto pb-32">
        
        {/* Gallery / Images (Placeholders for now) */}
        <section className="mb-32 fade-up">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            {/* Left side: Main Image */}
            <div className="md:col-span-7 bg-[#0a0a0a] rounded-2xl overflow-hidden border border-brand-primary/5 relative shadow-2xl h-full min-h-[400px]">
              <img 
                src={`${import.meta.env.BASE_URL}images/plat1.png`} 
                onError={(e) => {e.target.style.display='none'}}
                className="absolute inset-0 w-full h-full object-cover" 
                alt="Platform assembly" 
              />
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                  <span className="font-mono text-white/50 text-[11px] uppercase tracking-widest">{t('balancin.img1_label')}</span>
              </div>
            </div>

            {/* Right side: Flex container for Image 2 and Video */}
            <div className="md:col-span-5 flex gap-4 h-[500px]">
                {/* Vertical Video */}
                <div className="flex-none w-[45%] bg-[#0a0a0a] rounded-2xl overflow-hidden border border-brand-primary/5 relative shadow-2xl h-full">
                    <iframe 
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/88SjHziDrIY"
                        title="Self-Balancing Platform Demonstration"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>
                </div>
                {/* Stacked Images */}
                <div className="flex-1 flex flex-col gap-4 h-full">
                    <div className="flex-1 bg-[#0a0a0a] rounded-2xl overflow-hidden border border-brand-primary/5 relative shadow-2xl">
                        <img 
                          src={`${import.meta.env.BASE_URL}images/plat2.png`} 
                          onError={(e) => {e.target.style.display='none'}}
                          className="absolute inset-0 w-full h-full object-cover" 
                          alt="Servo detail" 
                        />
                    </div>
                    <div className="flex-1 bg-[#0a0a0a] rounded-2xl overflow-hidden border border-brand-primary/5 relative shadow-2xl">
                        <img 
                          src={`${import.meta.env.BASE_URL}images/plat3.png`} 
                          onError={(e) => {e.target.style.display='none'}}
                          className="absolute inset-0 w-full h-full object-cover" 
                          alt="Hardware close-up" 
                        />
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Text Sections */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 fade-up mb-32">
          <div className="md:col-span-4">
            <h3 className="font-display text-2xl text-brand-primary tracking-tight">{t('balancin.section1_title')}</h3>
          </div>
          <div className="md:col-span-8 font-mono text-brand-primary/70 text-sm leading-relaxed space-y-6">
            <p>
              {t('balancin.section1_p1')}
            </p>
            <p>
              {t('balancin.section1_p2')}
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 fade-up mb-32 border-t border-brand-primary/10 pt-32">
          <div className="md:col-span-4">
            <h3 className="font-display text-2xl text-brand-primary tracking-tight">{t('balancin.section2_title')}</h3>
          </div>
          <div className="md:col-span-8 font-mono text-brand-primary/70 text-sm leading-relaxed space-y-6">
            <p dangerouslySetInnerHTML={{__html: t('balancin.section2_p1')}}></p>
            <ul className="list-disc pl-5 space-y-3 text-brand-primary/80">
              <li><span className="text-brand-primary font-medium">{t('balancin.li1_title')}</span> {t('balancin.li1_desc')}</li>
              <li><span className="text-brand-primary font-medium">{t('balancin.li2_title')}</span> {t('balancin.li2_desc')}</li>
              <li><span className="text-brand-primary font-medium">{t('balancin.li3_title')}</span> {t('balancin.li3_desc')}</li>
            </ul>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 fade-up border-t border-brand-primary/10 pt-32">
          <div className="md:col-span-4">
            <h3 className="font-display text-2xl text-brand-primary tracking-tight">{t('balancin.section3_title')}</h3>
          </div>
          <div className="md:col-span-8 font-mono text-brand-primary/70 text-sm leading-relaxed space-y-6">
            <p>
              {t('balancin.section3_p1')}
            </p>
          </div>
        </section>
      </main>

      </div>
    </PageTransition>
  );
};

export default SelfBalancingPlatform;
