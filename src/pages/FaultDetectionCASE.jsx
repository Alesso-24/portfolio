/**
 * @file FaultDetectionCASE.jsx
 * @route /project/fault-detection-case
 * @description Detail page for the IEEE CASE 2026 paper:
 *   "Edge AI Decision Framework: Quantifying the Sensitivity-Latency Trade-off"
 *
 * Content summary:
 *  - Extends the BDAI paper: deploys the Random Forest on ESP32-S3 under FreeRTOS.
 *  - Introduces the concept of Sensitivity-Latency trade-off for industrial edge inference.
 *  - Includes latency benchmarks, confusion matrices, and architecture diagrams.
 *
 * Structure mirrors FaultDetection.jsx — academic article format with alternating
 * text + figure grid columns for readability and visual rhythm.
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

const HeroDiagramSVG = () => (
    <svg viewBox="0 0 1000 400" className="w-full h-auto drop-shadow-2xl font-sans" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'invert(0.85) hue-rotate(180deg) brightness(1.2)' }}>
        {/* Background Grid */}
        <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
            </pattern>
            <linearGradient id="grad-cyan" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00d8ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#005f73" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="grad-blue" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4361ee" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3f37c9" stopOpacity="0.3" />
            </linearGradient>
        </defs>
        <rect width="1000" height="400" fill="url(#grid)" />
        <rect width="1000" height="400" fill="rgba(0,0,0,0.5)" />

        {/* Nodes */}
        {/* 1. Vibration Sensor */}
        <g transform="translate(50, 150)">
            <rect width="140" height="80" rx="12" fill="#121212" stroke="#555" strokeWidth="2" />
            <circle cx="70" cy="26" r="10" fill="#adb5bd" />
            <path d="M 30 46 Q 50 16 70 46 T 110 46" stroke="#adb5bd" strokeWidth="2" fill="none" />
            <text x="70" y="72" fill="#adb5bd" fontSize="12" textAnchor="middle" fontWeight="bold">Vibration Sensor</text>
        </g>
        
        {/* Arrow 1 */}
        <path d="M 190 190 L 250 190" stroke="#00d8ff" strokeWidth="3" markerEnd="url(#arrow)" />

        {/* 2. ESP32 Microcontroller Box */}
        <g transform="translate(260, 40)">
            <rect width="520" height="300" rx="16" fill="rgba(255,255,255,0.02)" stroke="#333" strokeWidth="2" strokeDasharray="6 6" />
            <text x="260" y="30" fill="#666" fontSize="14" textAnchor="middle" fontWeight="bold" letterSpacing="2">ESP32 EDGE AI ARCHITECTURE</text>
        </g>

        {/* 2.1 Feature Extraction */}
        <g transform="translate(290, 150)">
            <rect width="160" height="80" rx="8" fill="url(#grad-blue)" stroke="#4361ee" strokeWidth="2" />
            <text x="80" y="35" fill="white" fontSize="13" textAnchor="middle" fontWeight="bold">Statistical Features</text>
            <text x="80" y="55" fill="rgba(255,255,255,0.8)" fontSize="11" textAnchor="middle">RMS, Kurtosis, Peak</text>
        </g>

        {/* Arrow 2 */}
        <path d="M 450 190 L 510 190" stroke="#00d8ff" strokeWidth="3" markerEnd="url(#arrow)" />

        {/* 2.2 Adaptive Loop Block */}
        <g transform="translate(520, 110)">
            <rect width="230" height="160" rx="12" fill="url(#grad-cyan)" stroke="#00d8ff" strokeWidth="2" />
            <text x="115" y="30" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">Adaptive Inference Loop</text>
            <text x="115" y="50" fill="#121212" fontSize="10" textAnchor="middle" fontWeight="bold" letterSpacing="1">FDR STAGE TRIGGER</text>

            {/* Random Forest Button */}
            <g transform="translate(30, 70)">
                <rect width="170" height="30" rx="4" fill="rgba(0,0,0,0.6)" stroke="#f72585" strokeWidth="1" />
                <text x="85" y="20" fill="#f72585" fontSize="11" textAnchor="middle" fontWeight="bold">Random Forest (Deep)</text>
            </g>
            
            {/* Logistic Regression Button */}
            <g transform="translate(30, 110)">
                <rect width="170" height="30" rx="4" fill="rgba(0,0,0,0.6)" stroke="#4cc9f0" strokeWidth="1" />
                <text x="85" y="20" fill="#4cc9f0" fontSize="11" textAnchor="middle" fontWeight="bold">Log. Regression (Fast)</text>
            </g>
        </g>

        {/* Arrow 3 */}
        <path d="M 750 190 L 810 190" stroke="#00d8ff" strokeWidth="3" markerEnd="url(#arrow)" />

        {/* 3. Output Stage */}
        <g transform="translate(820, 80)">
            <rect width="140" height="220" rx="12" fill="#121212" stroke="#444" strokeWidth="2" />
            <text x="70" y="30" fill="#fff" fontSize="14" textAnchor="middle" fontWeight="bold">Diagnostics</text>
            
            <circle cx="20" cy="70" r="6" fill="#4ade80" />
            <text x="35" y="74" fill="#4ade80" fontSize="13" fontWeight="bold">Healthy</text>
            
            <circle cx="20" cy="120" r="6" fill="#facc15" />
            <text x="35" y="124" fill="#facc15" fontSize="13" fontWeight="bold">Incipient</text>

            <circle cx="20" cy="170" r="6" fill="#ef4444" />
            <text x="35" y="174" fill="#ef4444" fontSize="13" fontWeight="bold">Advanced</text>
        </g>

        {/* Global Arrow Def */}
        <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#00d8ff" />
            </marker>
        </defs>
    </svg>
);

const FDRGraphSVG = () => (
    <svg viewBox="0 0 600 300" className="w-full h-auto drop-shadow-lg font-sans" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'invert(0.85) hue-rotate(180deg) brightness(1.2)' }}>
        <rect width="600" height="300" fill="#0a0a0a" rx="12" />
        {/* Background Zones */}
        <rect x="50" y="20" width="300" height="240" fill="rgba(74, 222, 128, 0.05)" />
        <rect x="350" y="20" width="100" height="240" fill="rgba(250, 204, 21, 0.05)" />
        <rect x="450" y="20" width="120" height="240" fill="rgba(239, 68, 68, 0.05)" />

        {/* Axes */}
        <g stroke="#333" strokeWidth="2">
            <line x1="50" y1="260" x2="570" y2="260" />
            <line x1="50" y1="20" x2="50" y2="260" />
        </g>
        <text x="300" y="290" fill="#888" fontSize="12" textAnchor="middle" fontWeight="bold">Lifetime Cycles</text>
        <text x="20" y="140" fill="#888" fontSize="12" textAnchor="middle" fontWeight="bold" transform="rotate(-90 20 140)">RMS Value</text>

        {/* Data Path */}
        <path d="M 50 220 
                 Q 100 230 150 225 
                 T 250 215 
                 T 350 200 
                 Q 380 180 400 150 
                 T 450 100 
                 Q 480 60 520 40 
                 T 570 30" 
              stroke="#00d8ff" strokeWidth="3" fill="none" />
        
        {/* Noise overlay path over the smooth path for realism */}
        <path d="M 50 220 L 70 215 L 90 230 L 110 220 L 130 225 L 150 210 L 170 225 L 190 215 L 210 225 L 230 210 L 250 220
                 L 270 210 L 290 225 L 310 210 L 330 220 L 350 190 L 370 185 L 390 160 L 410 165 L 430 130 L 450 110
                 L 470 90 L 490 105 L 510 60 L 530 80 L 550 40 L 570 50" 
              stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />

        {/* Zone Labels */}
        <text x="200" y="40" fill="#4ade80" fontSize="12" textAnchor="middle" fontWeight="bold">Healthy Zone (RF Active)</text>
        <text x="400" y="40" fill="#facc15" fontSize="12" textAnchor="middle" fontWeight="bold">Incipient Warning</text>
        <text x="510" y="40" fill="#ef4444" fontSize="12" textAnchor="middle" fontWeight="bold">Advanced Fault (LR Active)</text>

        {/* Threshold Line */}
        <line x1="50" y1="200" x2="570" y2="200" stroke="#facc15" strokeWidth="1.5" strokeDasharray="4 4" />
        <text x="560" y="195" fill="#facc15" fontSize="10" textAnchor="end">FDR Stage Shift Threshold</text>
    </svg>
);

const LatencyBarChartSVG = () => (
    <svg viewBox="0 0 400 300" className="w-full h-auto drop-shadow-lg font-sans" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'invert(0.85) hue-rotate(180deg) brightness(1.2)' }}>
        <rect width="400" height="300" fill="#0a0a0a" rx="12" />
        
        {/* Y Axis Grid */}
        <g stroke="#222" strokeWidth="1" strokeDasharray="5 5">
            <line x1="50" y1="50" x2="350" y2="50" />
            <line x1="50" y1="110" x2="350" y2="110" />
            <line x1="50" y1="170" x2="350" y2="170" />
            <line x1="50" y1="230" x2="350" y2="230" />
        </g>
        
        {/* Y Axis Text */}
        <text x="20" y="150" fill="#888" fontSize="12" textAnchor="middle" fontWeight="bold" transform="rotate(-90 20 150)">Clock Cycles (ESP32)</text>

        {/* Random Forest Bar */}
        <rect x="90" y="60" width="80" height="170" fill="url(#rf-grad)" rx="6" />
        <text x="130" y="45" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">5,592</text>
        <text x="130" y="145" fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="middle" transform="rotate(-90 130 145)" letterSpacing="1">Random Forest</text>

        {/* Logistic Regression Bar */}
        <rect x="230" y="215" width="80" height="15" fill="url(#lr-grad)" rx="4" />
        <text x="270" y="195" fill="#00d8ff" fontSize="16" textAnchor="middle" fontWeight="bold">44</text>
        <text x="270" y="160" fill="#00d8ff" fontSize="10" textAnchor="middle" transform="rotate(-90 270 160)" fontWeight="bold" letterSpacing="1">Log. Reg.</text>

        {/* Ground Line */}
        <line x1="50" y1="230" x2="350" y2="230" stroke="#555" strokeWidth="2" />

        <defs>
            <linearGradient id="rf-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4361ee" />
                <stop offset="100%" stopColor="#3f37c9" />
            </linearGradient>
            <linearGradient id="lr-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00d8ff" />
                <stop offset="100%" stopColor="#0077b6" />
            </linearGradient>
        </defs>
    </svg>
);


const FaultDetectionCASE = () => {
  const { t } = useLanguage();
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Initial fade in
    gsap.fromTo(".fade-up", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }
    );
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>IEEE CASE Paper | Alessandro</title>
        <meta name="description" content="Edge AI Decision Framework: Quantifying the Sensitivity-Latency Trade-off. Paper submitted to IEEE CASE." />
      </Helmet>
      <div className="bg-brand-dark min-h-screen text-[#e5e5e5] font-sans">

      {/* Hero Header */}
      <header className="pt-32 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="fade-up flex justify-between items-center mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-4 text-brand-primary font-sans uppercase text-[10px] tracking-[0.2em] hover:text-brand-primary/60 transition-colors"
          >
              <span className="bg-brand-primary/10 p-2 rounded-full rotate-180">→</span> {t('case.back')}
          </Link>
          <Link 
            to="/project/fault-detection" 
            className="inline-flex items-center gap-3 px-4 py-2 border border-brand-primary/20 text-brand-primary font-sans uppercase text-[10px] tracking-[0.2em] rounded-full hover:bg-brand-primary/10 transition-colors"
          >
              {t('case.view_base')} <span className="text-lg leading-none">↗</span>
          </Link>
        </div>

        <div className="fade-up">
          <span className="font-sans font-light text-[10px] uppercase tracking-[0.2em] text-brand-primary/50 mb-6 block">{t('case.badge')}</span>
          
          <h1 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl text-brand-primary tracking-tight leading-tight mb-12">
            {t('case.title')}
          </h1>
        </div>

        {/* Project Meta - Academic Format */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-y border-brand-primary/10 py-8 fade-up">
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-primary/60 mb-3">{t('case.authors')}</h4>
            <div className="font-mono text-[11px] text-brand-primary/80 leading-relaxed font-semibold space-y-3">
              <div>
                <span className="text-brand-primary">Jordi Alessandro Reyes Martinez</span><br/>
                <span className="text-brand-primary/60 font-normal">Dept. of Mechatronics Engineering, Universidad Iberoamericana Puebla.</span>
              </div>
              <div>
                <span className="text-brand-primary">Karime Farias Yabur</span><br/>
                <span className="text-brand-primary/60 font-normal">Nanotechnology Engineering, ITESM.</span>
              </div>
              <div>
                <span className="text-brand-primary">Fannor Antonio Rodriguez de Leon</span><br/>
                <span className="text-brand-primary/60 font-normal">Nanotechnology Engineering, ITESM.</span>
              </div>
              <div>
                <span className="text-brand-primary">Claudia Isaret Mendez Rosas</span><br/>
                <span className="text-brand-primary/60 font-normal">B.S. in Mechatronics Engineering, ITESM.</span>
              </div>
              <div>
                <span className="text-brand-primary">Javier Osorio Figueroa</span><br/>
                <span className="text-brand-primary/60 font-normal">Dept. of Mechatronics Engineering, Universidad Iberoamericana Puebla.</span>
              </div>
              <div>
                <span className="text-brand-primary">Oliver Ochoa Garcia</span><br/>
                <span className="text-brand-primary/60 font-normal">Dept. of Mechatronics Engineering, Universidad Iberoamericana Puebla.</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-primary/60 mb-3">{t('case.conference')}</h4>
            <p className="font-mono text-[12px] text-brand-primary/80 italic">{t('case.conference_val')}</p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-primary/60 mb-3">{t('case.presentation')}</h4>
            <p className="font-mono text-[12px] text-brand-primary/80" dangerouslySetInnerHTML={{__html: t('case.presentation_val')}}></p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-primary/60 mb-3">{t('case.status')}</h4>
            <p className="font-mono text-[11px] px-3 py-1 bg-[#ef4444]/10 text-[#ef4444] inline-block rounded-full border border-[#ef4444]/20">{t('case.status_val')}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-8 max-w-6xl mx-auto pb-32">
        
        {/* Abstract Box */}
        <section className="fade-up mb-24 w-full md:w-10/12 mx-auto">
            <div className="bg-brand-primary/5 border-l-4 border-brand-cyan p-8 md:p-12 rounded-r-lg shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <span className="font-display text-8xl text-brand-primary">#</span>
                </div>
                <h3 className="font-display text-2xl text-brand-primary mb-6 uppercase tracking-wider relative z-10">{t('case.abstract')}</h3>
                <p className="font-sans text-brand-primary/80 text-sm md:text-base leading-relaxed text-justify relative z-10">
                    {t('case.abstract_text')}
                </p>
                <p className="font-mono text-[10px] text-brand-primary/60 mt-6"><span className="text-brand-primary/40 uppercase tracking-widest">{t('case.index_terms')} —</span> {t('case.index_terms_val')}</p>
            </div>
        </section>

        {/* Hero Image (Architecture Diagram) */}
        <section className="fade-up mb-24">
            <div className="w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-brand-primary/5 border border-brand-primary/5">
                <HeroDiagramSVG />
                <div className="p-5 bg-brand-primary/5 border-t border-brand-primary/5">
                    <p className="font-mono text-brand-primary/70 text-[11px] text-center" dangerouslySetInnerHTML={{__html: t('case.fig1')}}>
                    </p>
                </div>
            </div>
        </section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-16"></div>

        {/* Key Technical Points */}
        <section className="fade-up mb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-4">
                <h3 className="font-display text-3xl text-brand-primary tracking-tight mb-4">{t('case.section1_title')}</h3>
            </div>
            <div className="md:col-span-8 font-mono text-brand-primary/70 text-sm leading-relaxed text-justify space-y-6">
                <ul className="list-none space-y-6">
                    <li className="flex gap-4">
                        <span className="text-brand-primary text-xl">⚡</span>
                        <div>
                            <strong className="text-brand-primary block mb-1">{t('case.li1_title')}</strong>
                            <span dangerouslySetInnerHTML={{__html: t('case.li1_desc')}}></span>
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="text-brand-primary text-xl">📊</span>
                        <div>
                            <strong className="text-brand-primary block mb-1">{t('case.li2_title')}</strong>
                            {t('case.li2_desc')}
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="text-brand-primary text-xl">⏱️</span>
                        <div>
                            <strong className="text-brand-primary block mb-1">{t('case.li3_title')}</strong>
                            {t('case.li3_desc')}
                        </div>
                    </li>
                    <li className="flex gap-4">
                        <span className="text-brand-primary text-xl">🔄</span>
                        <div>
                            <strong className="text-brand-primary block mb-1">{t('case.li4_title')}</strong>
                            {t('case.li4_desc')}
                        </div>
                    </li>
                </ul>
            </div>
          </div>
        </section>

        {/* Technical Integration 1: FDR */}
        <section className="fade-up mb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Image logially flipped visually on desktop */}
            <div className="md:col-span-6 order-2 md:order-1">
                 <div className="w-full rounded-xl shadow-xl overflow-hidden border border-brand-primary/5 bg-brand-primary/5">
                    <img 
                        src={`${import.meta.env.BASE_URL}images/case_fdr.png`} 
                        alt="FDR Condition Monitoring Trend"
                        className="w-full h-auto"
                        style={{ filter: 'invert(0.85) hue-rotate(180deg) brightness(1.2)' }}
                    />
                    <div className="p-4 border-t border-brand-primary/5 text-center">
                        <p className="font-mono text-brand-primary/70 text-[10px] leading-tight" dangerouslySetInnerHTML={{__html: t('case.fig2')}}>
                        </p>
                    </div>
                </div>
            </div>
            <div className="md:col-span-6 space-y-6 order-1 md:order-2">
                <h3 className="font-display text-2xl text-brand-primary tracking-tight mb-4">{t('case.section2_title')}</h3>
                <p className="font-sans text-brand-primary/70 text-sm leading-relaxed text-justify">
                    {t('case.section2_p1')}
                </p>
                <p className="font-sans text-brand-primary/70 text-sm leading-relaxed text-justify">
                    {t('case.section2_p2')}
                </p>
            </div>
          </div>
        </section>

        {/* Technical Integration 2: Latency Benchmark */}
        <section className="fade-up mb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-6 space-y-6">
                <h3 className="font-display text-2xl text-brand-primary tracking-tight mb-4">{t('case.section3_title')}</h3>
                <p className="font-sans text-brand-primary/70 text-sm leading-relaxed text-justify">
                    {t('case.section3_p1')}
                </p>
                <div className="bg-brand-primary/5 border border-brand-primary/10 p-5 rounded-lg mt-4">
                    <p className="font-mono text-brand-primary/80 text-xs leading-relaxed" dangerouslySetInnerHTML={{__html: t('case.section3_box')}}>
                    </p>
                </div>
            </div>
            <div className="md:col-span-6 flex flex-col gap-8">
                <div className="w-full rounded-xl shadow-xl overflow-hidden border border-brand-primary/5 bg-brand-primary/5">
                    <img 
                        src={`${import.meta.env.BASE_URL}images/case_latency.png`} 
                        alt="Inference Latency Setup"
                        className="w-full h-auto"
                        style={{ filter: 'invert(0.85) hue-rotate(180deg) brightness(1.2)' }}
                    />
                    <div className="p-4 border-t border-brand-primary/5 text-center">
                        <p className="font-mono text-brand-primary/70 text-[10px] leading-tight" dangerouslySetInnerHTML={{__html: t('case.fig3')}}>
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Technical Integration 3: Industrial Validation & PCA */}
        <section className="fade-up mb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* PCA Image */}
            <div className="md:col-span-6">
                 <div className="w-full rounded-xl shadow-xl overflow-hidden border border-brand-primary/5 bg-brand-primary/5">
                    <img 
                        src={`${import.meta.env.BASE_URL}images/case_pca.png`} 
                        alt="PCA Scatter Plots Incipient vs Advanced"
                        className="w-full h-auto"
                        style={{ filter: 'invert(0.85) hue-rotate(180deg) brightness(1.2)' }}
                    />
                    <div className="p-4 border-t border-brand-primary/5 text-center">
                        <p className="font-mono text-brand-primary/70 text-[10px] leading-tight" dangerouslySetInnerHTML={{__html: t('case.fig4')}}>
                        </p>
                    </div>
                </div>
            </div>
            {/* Text & Edge Insights */}
            <div className="md:col-span-6 space-y-6">
                <h3 className="font-display text-2xl text-brand-primary tracking-tight mb-4">{t('case.section4_title')}</h3>
                <p className="font-sans text-brand-primary/70 text-sm leading-relaxed text-justify" dangerouslySetInnerHTML={{__html: t('case.section4_p1')}}></p>
                <div className="bg-white/[0.03] border border-brand-primary/10 p-5 rounded-lg mt-4">
                    <h4 className="text-brand-primary font-sans font-medium text-[11px] uppercase tracking-widest mb-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-brand-primary/50 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]"></div>
                        {t('case.edge_title')}
                    </h4>
                    <p className="font-mono text-brand-primary/80 text-xs leading-relaxed text-justify mt-3" dangerouslySetInnerHTML={{__html: t('case.edge_desc')}}></p>
                </div>
            </div>
          </div>
        </section>

      </main>

      {/* Call to Action */}
      <footer className="w-full border-t border-brand-primary/10 py-20 text-center bg-black/20">
        <div className="max-w-2xl mx-auto px-4">
            <h2 className="font-display text-2xl md:text-3xl text-brand-primary mb-6">{t('case.cta_title')}</h2>
            <p className="font-mono text-brand-primary/70 text-[11px] md:text-xs leading-relaxed uppercase tracking-wider mb-10">
                {t('case.cta_desc')}
            </p>
            <button disabled className="inline-flex flex-col items-center gap-1 px-8 py-4 bg-brand-primary/5 text-brand-primary font-mono text-[11px] uppercase tracking-widest border border-brand-primary/20 rounded-2xl cursor-not-allowed transition-colors shadow-sm w-full md:w-auto">
                <span className="flex items-center gap-2"><svg className="w-4 h-4 text-[#ef4444]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg> {t('case.cta_btn1')}</span>
                <span className="text-[10px] text-brand-primary/80 font-sans tracking-normal capitalize">{t('case.cta_btn2')}</span>
            </button>
            <div className="mt-8">
                <Link to="/project/fault-detection" className="font-sans font-light text-[10px] text-brand-primary/50 uppercase tracking-[0.2em] hover:underline hover:text-brand-primary/80 transition-colors">
                    ← {t('case.view_base')}
                </Link>
            </div>
        </div>
      </footer>

      </div>
    </PageTransition>
  );
};

export default FaultDetectionCASE;
