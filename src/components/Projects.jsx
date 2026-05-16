/**
 * @file Projects.jsx
 * @description "Selected Work" section — showcases the three main projects with parallax imagery.
 *
 * Data:
 *  `projectsData` array defines each project: title, category, tech stack, image path, route link.
 *  Images use `import.meta.env.BASE_URL` prefix to support GitHub Pages subdirectory hosting.
 *
 * Animation:
 *  - GSAP ScrollTrigger applies a vertical parallax (`yPercent: 20`) to each `.img-parallax` image
 *    as the user scrolls past the card, creating a cinematic depth effect.
 *  - On hover, images scale from 110% → 100% (scale-out zoom) for a polished feel.
 *  - A "Explore →" CTA link fades/slides in on hover via CSS group-hover transitions.
 *
 * Routing:
 *  Each card is wrapped in a `<Link>` that navigates to the relevant page route.
 *  Alternating layout (flex-row / flex-row-reverse) for visual rhythm.
 */
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
    {
        id: 1,
        titleKey: "projects.larc_title",
        categoryKey: "projects.larc_category",
        tech: "Hardware Eng. • ESP32-C6 • PID Control • Python",
        image: `${import.meta.env.BASE_URL}images/robot_full.png`, 
        link: "/project/larc-2025",
        filter: "brightness(0.9) contrast(1.1) hue-rotate(-10deg)"
    },
    {
        id: 2,
        titleKey: "projects.case_title",
        categoryKey: "projects.case_category",
        tech: "C/C++ • ESP32 • Random Forest • Hardware Latency",
        image: `${import.meta.env.BASE_URL}images/cover_case.jpg`, 
        link: "/project/fault-detection-case",
        filter: "brightness(0.6) contrast(1.1) grayscale(0.2)"
    },
    {
        id: 3,
        titleKey: "projects.bdai_title",
        categoryKey: "projects.bdai_category",
        tech: "Python • Supervised Learning • NASA Datasets • LaTeX",
        image: `${import.meta.env.BASE_URL}images/cover_bdai.jpg`,
        link: "/project/fault-detection",
        filter: "brightness(0.6) contrast(1.1) grayscale(0.2)"
    },
    {
        id: 4,
        titleKey: "projects.balancin_title",
        categoryKey: "projects.balancin_category",
        tech: "ESP32 • Python • C/C++ • Servomotors • PID Control",
        image: `${import.meta.env.BASE_URL}images/project1.png`,
        link: "/project/self-balancing-platform"
    }
];

const Projects = () => {
  const sectionRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    // Parallax effect on images
    const images = gsap.utils.toArray('.img-parallax');
    
    images.forEach(img => {
      gsap.to(img, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: img.parentNode,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-32 px-4 md:px-8 bg-brand-dark">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-end mb-16 border-b border-brand-primary/10 pb-8 mt-12">
            <h2 className="font-display font-medium text-4xl md:text-5xl text-brand-primary tracking-tight leading-none">
                {t('projects.title1')}
            </h2>
            <p className="font-sans font-medium text-brand-accent uppercase text-[10px] tracking-[0.2em] hidden md:block">
                {t('projects.subtitle1')}
            </p>
        </div>

        <div className="flex flex-col gap-32 mb-32">
            {projectsData.filter(p => p.id === 1 || p.id === 4).map((project, index) => {
                const Wrapper = project.link ? Link : 'div';
                return (
                <Wrapper to={project.link || "#"} key={project.id} className={`flex flex-col block ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-20 items-center group cursor-pointer`}>
                    
                    {/* Image Container with hidden overflow for parallax */}
                    <div className="w-full md:w-3/5 aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl relative shadow-sm border border-brand-primary/5">
                        <div className="absolute inset-x-0 -inset-y-[15%] w-full h-[130%]">
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                loading="lazy"
                                className="img-parallax w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                style={project.filter ? { filter: project.filter } : { filter: "grayscale(0.1) contrast(1.05)" }}
                            />
                        </div>
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-brand-primary/5 group-hover:bg-transparent transition-colors duration-700"></div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-2/5 flex flex-col justify-center">
                        <span className="font-sans font-medium text-[10px] uppercase tracking-[0.2em] text-brand-accent mb-6 flex items-center gap-3">
                            <div className="w-4 h-[1px] bg-brand-orange/50"></div>
                            {t(project.categoryKey)}
                        </span>
                        <h3 className="font-display font-light text-3xl md:text-4xl lg:text-5xl text-brand-primary mb-8 tracking-tight group-hover:opacity-80 transition-opacity duration-300">
                            {t(project.titleKey)}
                        </h3>
                        <p className="font-sans font-light text-[14px] text-brand-primary/70 mb-10 max-w-sm leading-relaxed">{project.tech}</p>
                        
                        <div className="flex items-center gap-4 text-brand-primary font-sans uppercase text-[11px] font-medium tracking-[0.2em] transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                            {t('projects.explore')} <span className="bg-brand-accent text-white px-3 py-1.5 rounded-full ml-1">→</span>
                        </div>
                    </div>

                </Wrapper>
                );
            })}
        </div>

        <div className="flex justify-between items-end mb-16 border-b border-brand-primary/10 pb-8 mt-12">
            <h2 className="font-display font-medium text-4xl md:text-5xl text-brand-primary tracking-tight leading-none">
                {t('projects.title2')}
            </h2>
            <p className="font-sans font-medium text-brand-accent uppercase text-[10px] tracking-[0.2em] hidden md:block">
                {t('projects.subtitle2')}
            </p>
        </div>

        <div className="flex flex-col gap-32 mb-16">
            {projectsData.filter(p => p.id === 2 || p.id === 3).map((project, index) => {
                const Wrapper = project.link ? Link : 'div';
                return (
                <Wrapper to={project.link || "#"} key={project.id} className={`flex flex-col block ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-20 items-center group cursor-pointer`}>
                    
                    {/* Image Container with hidden overflow for parallax */}
                    <div className="w-full md:w-3/5 aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl relative shadow-sm border border-brand-primary/5">
                        <div className="absolute inset-x-0 -inset-y-[15%] w-full h-[130%]">
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                loading="lazy"
                                className="img-parallax w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                style={project.filter ? { filter: project.filter } : { filter: "grayscale(0.1) contrast(1.05)" }}
                            />
                        </div>
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-brand-primary/5 group-hover:bg-transparent transition-colors duration-700"></div>
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-2/5 flex flex-col justify-center">
                        <span className="font-sans font-medium text-[10px] uppercase tracking-[0.2em] text-brand-accent mb-6 flex items-center gap-3">
                            <div className="w-4 h-[1px] bg-brand-orange/50"></div>
                            {t(project.categoryKey)}
                        </span>
                        <h3 className="font-display font-light text-3xl md:text-4xl lg:text-5xl text-brand-primary mb-8 tracking-tight group-hover:opacity-80 transition-opacity duration-300">
                            {t(project.titleKey)}
                        </h3>
                        <p className="font-sans font-light text-[14px] text-brand-primary/70 mb-10 max-w-sm leading-relaxed">{project.tech}</p>
                        
                        <div className="flex items-center gap-4 text-brand-primary font-sans uppercase text-[11px] font-medium tracking-[0.2em] transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                            {t('projects.explore')} <span className="bg-brand-accent text-white px-3 py-1.5 rounded-full ml-1">→</span>
                        </div>
                    </div>

                </Wrapper>
                );
            })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
