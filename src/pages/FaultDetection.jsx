/**
 * @file FaultDetection.jsx
 * @route /project/fault-detection
 * @description Detail page for the IEEE BDAI 2026 paper:
 *   "Comparative Evaluation of Lightweight Supervised Machine Learning Techniques
 *    for Industrial Rotating Machinery."
 *
 * Sections (rendered as an academic article layout):
 *  1. Header  — paper title, authors, conference, date, status badge.
 *  2. Abstract — bordered quote block with decorative hash symbol.
 *  3. Figure 1 — algorithm performance comparison chart (inverted PNG).
 *  4. Section I  — Introduction & Context.
 *  5. Section II — Feature Engineering (RMS, FFT-free, O(N) complexity).
 *  6. Section III — Results & Edge Computing (ESP32, FreeRTOS, MQTT, 98.4% energy saving).
 *  7. Footer — IEEE Xplore availability notice (button disabled until post-conference).
 *
 * Animation:
 *  - GSAP batch `.fade-up` entrance on mount (opacity + y offset).
 *  - ⚠️  Does NOT re-initialize Lenis — the global instance in App.jsx handles scroll.
 *
 * Images:
 *  - All images use `import.meta.env.BASE_URL` for GitHub Pages subdirectory compatibility.
 *  - CSS filter: `invert(0.85) hue-rotate(180deg)` converts white-background charts to dark-UI.
 */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';

gsap.registerPlugin(ScrollTrigger);

const FaultDetection = () => {
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
        <title>Fault Detection (BDAI) | Alessandro</title>
        <meta name="description" content="Industrial fault detection via machine learning using the NASA IMS dataset. Supervised learning and PCA analysis." />
      </Helmet>
      <div className="bg-brand-dark min-h-screen text-[#e5e5e5] font-sans">

      {/* Hero Header */}
      <header className="pt-32 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="fade-up">
          <Link 
            to="/" 
            className="inline-flex items-center gap-4 text-brand-primary font-mono uppercase text-[11px] tracking-[0.2em] mb-12 hover:text-brand-cyan transition-colors"
          >
              <span className="bg-brand-primary/10 p-2 rounded-full rotate-180">→</span> Back to Home
          </Link>
          <span className="font-sans font-light text-[10px] uppercase tracking-[0.2em] text-brand-primary/50 mb-6 block">Scientific Publication</span>
          
          <h1 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl text-brand-primary tracking-tight leading-tight mb-12">
            Comparative Evaluation of Lightweight Supervised Machine Learning Techniques for Industrial Rotating Machinery.
          </h1>
        </div>

        {/* Project Meta - Academic Format */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-y border-brand-primary/10 py-8 fade-up">
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-primary/60 mb-3">Authors</h4>
            <div className="font-mono text-[12px] text-brand-primary/80 leading-relaxed font-semibold">
              Jordi Alessandro Reyes Martinez¹<br/>
              Karen Melissa Pastrana Monzon¹<br/>
              Javier Osorio Figueroa¹<br/>
              Oliver Ochoa Garcia¹
            </div>
            <p className="font-mono text-[10px] text-brand-primary/60 mt-2">¹ Universidad Iberoamericana Puebla</p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-primary/60 mb-3">Conference</h4>
            <p className="font-mono text-[12px] text-brand-primary/80 italic">IEEE International Conference on Big Data and Artificial Intelligence (BDAI)</p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-primary/60 mb-3">Presentation</h4>
            <p className="font-mono text-[12px] text-brand-primary/80">July 3–5, 2026<br/>Chongqing, China.</p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-primary/60 mb-3">Status</h4>
            <p className="font-sans font-medium text-[10px] uppercase tracking-widest px-3 py-1.5 bg-[#3b82f6]/10 text-[#60a5fa] inline-flex items-center rounded-full border border-[#3b82f6]/30">Accepted for publication</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-8 max-w-6xl mx-auto pb-32">
        
        {/* Abstract Box */}
        <section className="fade-up mb-24 w-full md:w-10/12 mx-auto">
            <div className="bg-white/[0.03] border-l-4 border-white/40 p-8 md:p-12 rounded-r-lg shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <span className="font-display text-8xl text-brand-primary">#</span>
                </div>
                <h3 className="font-display text-2xl text-brand-primary mb-6 uppercase tracking-wider relative z-10">Abstract</h3>
                <p className="font-sans text-brand-primary/80 text-sm md:text-base leading-relaxed text-justify relative z-10">
                    This paper presents a data-driven approach for predictive maintenance in industrial rotating machinery using the NASA IMS Bearing Dataset. Unplanned downtime caused by bearing failures represents a significant cost in manufacturing. The efficacy of supervised learning algorithms is analyzed to detect mechanical failures before breakdown occurs. To achieve this, a comparative study between Random Forest, Support Vector Machines (SVM), and k-Nearest Neighbors (k-NN) was conducted. Furthermore, a hyperparameter optimization was performed via Grid Search and the model robustness was evaluated against synthetic noise injection. A first-order analytical energy consumption model comparing Edge Artificial Intelligence (AI) processing versus Cloud offloading is also presented. The results demonstrate that the Random Forest classifier achieves over 99 percent accuracy on the test set with optimized parameters. Additionally, under nominal datasheet operating conditions, the analytical model estimates that local inference could reduce data transmission energy by approximately 98 percent compared to raw data streaming. This study concludes that statistical feature extraction combined with ensemble learning represents a potentially energy-efficient solution for battery-powered Industrial Internet of Things (IIoT) nodes targeted for the Espressif ESP32 microcontroller platform.
                </p>
                <p className="font-mono text-[10px] text-brand-primary/60 mt-6"><span className="text-brand-primary/40 uppercase tracking-widest">Index Terms —</span> Predictive Maintenance, Machine Learning, Random Forest, Energy Efficiency, Edge AI, ESP32, FreeRTOS.</p>
            </div>
        </section>

        {/* Hero Image (Algorithm Comparison) */}
        <section className="fade-up mb-24">
            <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden border border-brand-primary/10 shadow-2xl">
                <img 
                src={`${import.meta.env.BASE_URL}images/paper1.png`} 
                alt="Algorithm Comparison Hero"
                className="w-full h-auto"
                style={{ filter: 'invert(0.85) hue-rotate(180deg) brightness(1.2)' }}
                />
                <div className="p-4 bg-brand-primary/5 border-t border-white/5">
                    <p className="font-mono text-brand-primary/70 text-[11px] text-center">
                        <strong className="text-brand-primary">Fig. 1.</strong> Performance comparison: Random Forest outperforms SVM and k-NN, achieving over 99% accuracy on the test set.
                    </p>
                </div>
            </div>
        </section>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-16"></div>

        {/* 1. Context & Introduction */}
        <section className="fade-up mb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-6 space-y-6">
                <h3 className="font-display text-3xl text-brand-primary tracking-tight mb-4">I. Introduction & Context</h3>
                <p className="font-sans text-brand-primary/70 text-sm leading-relaxed text-justify">
                    Rotating machinery is a primary actuator in key sectors such as wind energy and automotive assembly. Rolling-element bearings are prone to severe degradation from fatigue and misalignment, accounting for nearly 40% of induction motor failures.
                </p>
                <p className="font-sans text-brand-primary/70 text-sm leading-relaxed text-justify">
                    Traditional strategies such as "Run-to-Failure" or calendar-based preventive maintenance present serious operational challenges, causing unplanned plant shutdowns. Although Industry 4.0 drives Predictive Maintenance (PdM) with Deep Learning (DL), reliance on GPUs and complex mathematics limits the feasibility of battery-powered decentralized monitoring.
                </p>
            </div>
            <div className="md:col-span-6">
                 {/* Technical Image 1 */}
                <div className="w-full rounded-lg shadow-xl overflow-hidden border border-brand-primary/10 bg-brand-primary/5">
                    <img 
                    src={`${import.meta.env.BASE_URL}images/paper5.png`} 
                    alt="Time-domain comparison"
                    className="w-full h-auto"
                    style={{ filter: 'invert(0.85) hue-rotate(180deg) brightness(1.1) contrast(1.2)' }}
                    />
                    <div className="p-3 border-t border-white/5 text-center px-4">
                        <p className="font-mono text-brand-primary/70 text-[10px] leading-tight">
                            <strong className="text-brand-primary">Fig. 2.</strong> Análisis de vibración en el dominio del tiempo: Contraste entre un estado operativo saludable y una falla crítica.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* 2. Methodology & Feature Engineering */}
        <section className="fade-up mb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Image goes first on mobile, but text goes first logically. Let's flip order visually on desktop */}
            <div className="md:col-span-5 order-2 md:order-1">
                 {/* Technical Image 3 */}
                 <div className="w-full rounded-lg shadow-xl overflow-hidden border border-brand-primary/10 bg-brand-primary/5">
                    <img 
                    src={`${import.meta.env.BASE_URL}images/paper6.png`} 
                    alt="Feature Importance Analysis"
                    className="w-full h-auto"
                    style={{ filter: 'invert(0.85) hue-rotate(180deg) brightness(1.2)' }}
                    />
                    <div className="p-3 border-t border-white/5 text-center px-4">
                        <p className="font-mono text-brand-primary/70 text-[10px] leading-tight">
                            <strong className="text-brand-primary">Fig. 3.</strong> Análisis de importancia: El valor RMS domina como la métrica más discriminativa para la detección de fallas frente a variables como Skewness o Shape Factor.
                        </p>
                    </div>
                </div>
            </div>
            <div className="md:col-span-7 space-y-6 order-1 md:order-2">
                <h3 className="font-display text-3xl text-brand-primary tracking-tight mb-4">II. Feature Engineering</h3>
                <p className="font-sans text-brand-primary/70 text-sm leading-relaxed text-justify">
                    To ensure the model was lightweight enough for a microcontroller, the Fast Fourier Transform (FFT) was deliberately omitted, as it requires logarithmic complexity <code className="bg-brand-primary/10 px-1 rounded">O(N log N)</code>. Instead, the system evaluates the one-dimensional statistical temporal evolution of vibrations at <code className="bg-brand-primary/10 px-1 rounded">O(N)</code> complexity.
                </p>
                <p className="font-sans text-brand-primary/70 text-sm leading-relaxed text-justify">
                    Candidate metrics such as Shape Factor, Crest Factor, Skewness, and Kurtosis were computed. After Variable Importance analysis (Gini impurity), it was concluded that Root Mean Square (RMS) and peak amplitude magnitude carried the highest weight in the classifier, making them ideal features due to their monotonic trend directly correlated to progressive physical wear.
                </p>
            </div>
          </div>
        </section>

        {/* 3. Resultados y Despliegue en Edge */}
        <section className="fade-up mb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 space-y-6">
                <h3 className="font-display text-3xl text-brand-primary tracking-tight mb-4">III. Results & Edge Computing</h3>
                <p className="font-sans text-brand-primary/70 text-sm leading-relaxed text-justify">
                    To prevent overfitting, hyperparameters were tuned via structured cross-validation over temporal cycles to isolate data leakage. The SVM and k-NN models proved competitive, but the <strong>Random Forest (100 estimators) dominated with over 99% effectiveness.</strong> At the analytical level, reporting 0 false positives was the fundamental milestone for validating it as a safe emergency halt protocol without arbitrarily stopping the plant.
                </p>
                <div className="bg-white/[0.03] border border-brand-primary/10 p-6 rounded-2xl mt-6">
                    <h4 className="text-brand-primary font-sans font-medium text-xs uppercase tracking-[0.15em] mb-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse"></div>
                        Edge Energy Relevance (ESP32)
                    </h4>
                    <p className="font-sans text-brand-primary/80 text-sm leading-relaxed">
                        This approach was mathematically extrapolated to an IoT-connected architecture (ESP32-S3 with an RTOS). By inferring the tree branches locally on hardware and using MQTT to transmit <em>exclusively</em> an alarm payload, the device is theoretically estimated to consume 0.99 mJ per execution — a <strong>98% energy saving</strong> compared to streaming all raw data over Wi-Fi to the Cloud.
                    </p>
                </div>
            </div>
            <div className="md:col-span-5 flex flex-col gap-8">
                 {/* Technical Image 2 (Confusion Matrix) */}
                <div className="w-full rounded-lg shadow-xl overflow-hidden border border-brand-primary/10 bg-brand-primary/5">
                    <img 
                    src={`${import.meta.env.BASE_URL}images/paper3.png`} 
                    alt="Confusion Matrix"
                    className="w-full h-auto transform scale-95"
                    style={{ filter: 'invert(0.85) hue-rotate(180deg) brightness(1.1)' }}
                    />
                    <div className="p-3 border-t border-white/5 text-center px-4">
                        <p className="font-mono text-brand-primary/70 text-[10px] leading-tight">
                        <strong className="text-brand-primary">Fig. 4.</strong> Optimized model confusion matrix, demonstrating complete reliability with zero false positives or false negatives (False Acceptance Rate = 0%).
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </section>

      </main>

      {/* Call to Action */}
      <footer className="w-full border-t border-brand-primary/10 py-20 text-center bg-black/20">
        <div className="max-w-2xl mx-auto px-4">
            <h2 className="font-display text-2xl md:text-3xl text-brand-primary mb-6">Document Availability</h2>
            <p className="font-mono text-brand-primary/70 text-[11px] md:text-xs leading-relaxed uppercase tracking-wider mb-10">
                The Camera-Ready Script will finalize editorial indexing after the conference. The full PDF and data annexes will be released publicly in mid-2026 on the IEEE Xplore repository.
            </p>
            <button disabled className="inline-flex items-center gap-3 px-8 py-4 bg-gray-800 text-brand-primary/60 font-mono text-[11px] uppercase tracking-widest border border-brand-primary/10 rounded-full cursor-not-allowed transition-colors shadow-inner">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                View Official IEEE Paper (Locked)
            </button>
        </div>
      </footer>

      </div>
    </PageTransition>
  );
};

export default FaultDetection;
