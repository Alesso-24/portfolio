import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Larc2025 = () => {
  const { t } = useLanguage();
  useEffect(() => {
    window.scrollTo(0, 0);

    gsap.fromTo(".fade-up", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }
    );
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>LARC 2025 Experience | Alessandro</title>
        <meta name="description" content="Competing at the Latin American Robotics Competition 2025 at Tec de Monterrey with Tracky, an ESP32-C6 line follower." />
      </Helmet>
      <div className="bg-brand-dark min-h-screen text-[#e5e5e5] font-sans">

      {/* Hero Header */}
      <header className="pt-40 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="fade-up flex justify-between items-center mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-4 text-brand-primary font-sans uppercase text-[10px] tracking-[0.2em] hover:text-brand-primary/60 transition-colors"
          >
              <span className="bg-brand-primary/10 p-2 rounded-full rotate-180">→</span> {t('nav.back')}
          </Link>
          <a
            href="https://github.com/Alesso-24/Tracky" 
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-4 py-2 border border-brand-primary/20 text-brand-primary font-sans uppercase text-[10px] tracking-[0.2em] rounded-full hover:bg-brand-primary/10 transition-colors"
          >
              {t('larc.github')} <span className="text-lg leading-none">↗</span>
          </a>
        </div>

        <div className="fade-up">
          <span className="font-sans font-light text-[10px] uppercase tracking-[0.2em] text-brand-accent mb-6 block">{t('larc.badge')}</span>
          <h1 className="font-display font-medium text-4xl md:text-6xl lg:text-7xl text-brand-primary tracking-tight leading-none mb-8">
            {t('larc.title')}<br/><span className="text-brand-primary/40">{t('larc.subtitle')}</span>
          </h1>
          <p className="font-mono text-brand-primary/70 text-sm md:text-base leading-relaxed max-w-3xl mb-12 text-justify">
            {t('larc.description')}
          </p>
        </div>

        {/* Project Meta */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-brand-primary/10 py-8 fade-up bg-white/[0.02] rounded-2xl px-8 shadow-inner">
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-accent mb-2">{t('larc.role')}</h4>
            <p className="font-mono text-[13px] text-brand-primary">{t('larc.role_val')}</p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-accent mb-2">{t('larc.venue')}</h4>
            <p className="font-mono text-[13px] text-brand-primary">{t('larc.venue_val')}</p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-accent mb-2">{t('larc.hardware')}</h4>
            <p className="font-mono text-[13px] text-brand-primary">ESP32-C6, IR Array, TB6612FNG</p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-accent mb-2">{t('larc.software')}</h4>
            <p className="font-mono text-[13px] text-brand-primary">C++, PID Control, Python, BLE</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-8 max-w-6xl mx-auto pb-32">
        
        {/* Gallery */}
        <section className="mb-24 fade-up">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            <div className="md:col-span-7 bg-[#0a0a0a] rounded-2xl overflow-hidden border border-brand-primary/5 relative group shadow-2xl h-full min-h-[300px]">
              <img 
                src={`${import.meta.env.BASE_URL}images/larc_arena.jpg`} 
                onError={(e) => {e.target.style.display='none'}}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                alt="LARC 2025 Arena" 
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center -z-10 text-center px-4 bg-[#111]">
                  <span className="font-mono text-brand-primary/60 text-[11px] uppercase tracking-widest block mb-3">{t('larc.venue_placeholder')}</span>
                  <p className="font-sans text-[11px] text-gray-600 max-w-xs">{t('larc.venue_placeholder_desc')}</p>
              </div>
            </div>
            
            <div className="md:col-span-5 flex flex-col gap-8 h-full">
                <div className="flex-1 bg-[#0a0a0a] rounded-2xl overflow-hidden border border-brand-primary/5 relative shadow-2xl">
                    <img 
                        src={`${import.meta.env.BASE_URL}images/larc_team.jpg`} 
                        onError={(e) => {e.target.style.display='none'}}
                        className="w-full h-full object-cover object-top transition-transform duration-1000 hover:scale-105" 
                        alt="Team at LARC" 
                    />
                </div>
                <div className="flex-1 bg-[#0a0a0a] rounded-2xl overflow-hidden border border-brand-primary/5 relative shadow-2xl min-h-[300px]">
                    <iframe 
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/LlpaLHTaqiQ"
                        title="Tracky LARC Demonstration"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>
                </div>
            </div>
          </div>
        </section>

        {/* The Experience Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 fade-up mb-24 items-center">
            <div className="md:col-span-5">
                <h3 className="font-display text-4xl text-brand-primary tracking-tight leading-tight">
                    {t('larc.section1_title')}
                </h3>
            </div>
            <div className="md:col-span-7 font-mono text-brand-primary/70 text-sm leading-relaxed space-y-6 text-justify">
                <p>
                    {t('larc.section1_p1')}
                </p>
                <p>
                    {t('larc.section1_p2')}
                </p>
            </div>
        </section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-16 fade-up"></div>

        {/* Technical Deep Dive */}
        <section className="fade-up mb-24">
            <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-5xl text-brand-primary mb-6">{t('larc.section2_title')}</h2>
                <p className="font-mono text-brand-primary/70 text-sm max-w-2xl mx-auto">
                    {t('larc.section2_desc')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-b from-white/[0.05] to-transparent p-8 rounded-2xl border border-white/[0.05] hover:border-cyan-500/30 transition-colors">
                    <h4 className="text-brand-primary font-sans text-lg mb-4 flex items-center gap-3">
                        <span className="text-2xl">🧠</span> {t('larc.card1_title')}
                    </h4>
                    <p className="font-mono text-brand-primary/70 text-xs leading-relaxed text-justify">
                        {t('larc.card1_desc')}
                    </p>
                </div>
                <div className="bg-gradient-to-b from-white/[0.05] to-transparent p-8 rounded-2xl border border-white/[0.05] hover:border-cyan-500/30 transition-colors">
                    <h4 className="text-brand-primary font-sans text-lg mb-4 flex items-center gap-3">
                        <span className="text-2xl">🎛️</span> {t('larc.card2_title')}
                    </h4>
                    <p className="font-mono text-brand-primary/70 text-xs leading-relaxed text-justify">
                        {t('larc.card2_desc')}
                    </p>
                </div>
                <div className="bg-gradient-to-b from-white/[0.05] to-transparent p-8 rounded-2xl border border-white/[0.05] hover:border-cyan-500/30 transition-colors">
                    <h4 className="text-brand-primary font-sans text-lg mb-4 flex items-center gap-3">
                        <span className="text-2xl">📡</span> {t('larc.card3_title')}
                    </h4>
                    <p className="font-mono text-brand-primary/70 text-xs leading-relaxed text-justify">
                        {t('larc.card3_desc')}
                    </p>
                </div>
            </div>
        </section>

        {/* Hardware Detail */}
        <section className="fade-up mt-12 bg-brand-primary/5 rounded-3xl p-8 md:p-16 border border-brand-primary/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent rounded-full blur-[120px] opacity-10"></div>
            <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
                 <div className="w-full md:w-1/2">
                    <img src={`${import.meta.env.BASE_URL}images/robot_full.png`} alt="Tracky Chassis" className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-3 hover:rotate-0 transition-transform duration-700" />
                 </div>
                 <div className="w-full md:w-1/2 space-y-6">
                    <h3 className="font-display text-3xl text-brand-primary">{t('larc.hw_title')}</h3>
                    <ul className="space-y-4 font-mono text-sm">
                        <li className="flex gap-4">
                            <span className="text-brand-accent font-bold">01</span>
                            <div className="text-brand-primary/70">
                                <span className="text-brand-primary font-medium">TB6612FNG Driver</span> — {t('larc.hw1')}
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-brand-accent font-bold">02</span>
                            <div className="text-brand-primary/70">
                                <span className="text-brand-primary font-medium">IR Array MUX</span> — {t('larc.hw2')}
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-brand-accent font-bold">03</span>
                            <div className="text-brand-primary/70">
                                <span className="text-brand-primary font-medium">ESP32-C6 Orchestration</span> — {t('larc.hw3')}
                            </div>
                        </li>
                    </ul>
                 </div>
            </div>
        </section>

      </main>

      </div>
    </PageTransition>
  );
};

export default Larc2025;
