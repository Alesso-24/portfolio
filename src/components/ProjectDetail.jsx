import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';
import { useLanguage } from '../context/LanguageContext';

// In a real app, this would be fetched from an API or a shared data file
const projectsDB = {
    '1': {
        title: "Self-Balancing Platform",
        subtitle: "Computer Vision & Advanced Control Systems",
        description: "A comprehensive mechatronics project integrating machine vision for real-time spatial awareness with highly responsive servomotors. The platform uses absolute orientation sensors and PID control loops on an ESP32 to maintain perfect equilibrium even under external disturbances.",
        tech: "ESP32 • Python • C/C++ • Servomotors • PID Control",
        year: "2024",
        role: "Lead Developer / Hardware Architect",
        image: `${import.meta.env.BASE_URL}images/project1.jpg`
    },
    '2': {
        title: "Industrial Fault Detection",
        subtitle: "Machine Learning Applied to Aerospace Datasets",
        description: "An analytical deep dive into predictive maintenance using NASA's turbofan engine degradation simulation datasets. This project leverages supervised learning algorithms to accurately predict Remaining Useful Life (RUL) of critical components.",
        tech: "Python • Supervised Learning • NASA Datasets • LaTeX",
        year: "2025",
        role: "Data Scientist",
        image: `${import.meta.env.BASE_URL}images/project2.jpg`
    }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const project = projectsDB[id] || projectsDB['1'];
  
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, [id]);

  return (
    <PageTransition>
      <Helmet>
        <title>{project.title} | Alessandro</title>
        <meta name="description" content={project.subtitle} />
      </Helmet>
      <div ref={containerRef} className="min-h-screen bg-brand-dark pt-32 px-4 md:px-8 pb-32">
        <div className="max-w-7xl mx-auto">
          
          {/* Navigation */}
          <Link to="/" className="inline-flex items-center gap-4 text-white font-mono uppercase text-[11px] tracking-[0.2em] mb-16 hover:text-brand-cyan transition-colors">
              <span className="bg-white/10 p-2 rounded-full rotate-180">→</span> {t('nav.back')}
          </Link>
          
          <header className="mb-24">
              <h1 className="font-display font-medium text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] mb-6">
                  {project.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 font-display tracking-tight border-l-2 border-brand-cyan pl-6">
                  {project.subtitle}
              </p>
          </header>

          {/* Hero Image */}
          <div className="w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-lg mb-24 relative">
               <div className="absolute inset-0 bg-brand-cyan/10 mix-blend-overlay z-10"></div>
               <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              <div className="lg:col-span-8">
                  <h3 className="text-white text-sm mb-8 font-mono uppercase tracking-widest border-b border-white/10 pb-4 inline-block">Project Overview</h3>
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-sans">
                      {project.description}
                  </p>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-12">
                  <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-4">Technologies</h4>
                      <p className="font-mono text-sm text-gray-300 leading-relaxed uppercase tracking-wider">{project.tech}</p>
                  </div>
                  <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-4">Role</h4>
                      <p className="font-mono text-sm text-gray-300 uppercase tracking-wider">{project.role}</p>
                  </div>
                  <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-4">Year</h4>
                      <p className="font-mono text-sm text-gray-300 uppercase tracking-wider">{project.year}</p>
                  </div>
              </div>

          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default ProjectDetail;
