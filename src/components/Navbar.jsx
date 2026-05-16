/**
 * @file Navbar.jsx
 * @description Floating glassmorphism pill navigation bar with a fully-functional mobile overlay menu.
 *
 * Features:
 *  - Centered via `fixed inset-x-0 flex justify-center` (avoids Chrome's backdrop-filter + transform offset bug).
 *  - GSAP entrance animation: slides down from y:-100 on first mount.
 *  - Desktop: shows About / Projects / Contact anchor links.
 *  - Mobile (<md): hamburger (≡) / close (✕) button toggles a fullscreen overlay menu.
 *    The overlay uses CSS opacity + pointer-events transitions with staggered link entrance animations.
 *  - Locks `document.body.overflow` while the mobile menu is open to prevent scroll-behind.
 *  - On project pages, shows a "← Back to Work" pill linking back to the homepage.
 *  - `handleNavClick` handles cross-route navigation: if not on `/`, navigates home first,
 *    then scrolls to the target section after a 150ms render delay.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Menu, X, Globe, Github, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isProjectPage = location.pathname.startsWith('/project');
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  // Close menu on route change
  useEffect(() => {
    // eslint-disable-next-line
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.5 }
    );
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: t('nav.about'),    id: 'about' },
    { label: t('nav.projects'), id: 'projects' },
    { label: t('nav.contact'),  id: 'contact' },
  ];

  return (
    <>
      <header className="fixed top-6 inset-x-0 z-50 flex justify-center pointer-events-none">
        <nav ref={navRef} className="w-[95%] max-w-3xl bg-brand-primary/5 border border-brand-primary/10 shadow-sm backdrop-blur-md rounded-full px-6 py-4 flex justify-between items-center transition-all duration-300 pointer-events-auto">
          
          {/* Left: Logo + Desktop Socials */}
          <div className="flex items-center gap-4 md:gap-6 text-brand-primary min-w-0">
            <Link to="/" className="font-display font-medium text-lg tracking-wide hover:text-brand-accent transition-colors duration-300 shrink-0">
              ALESSANDRO.
            </Link>
            
            {/* Desktop Socials */}
            <div className="hidden md:flex items-center gap-3 border-l border-brand-primary/20 pl-6">
                <a href="https://github.com/Alesso-24" target="_blank" rel="noopener noreferrer" className="text-brand-primary/60 hover:text-brand-accent transition-colors">
                    <Github size={18} strokeWidth={1.5} />
                </a>
                <a href="https://www.linkedin.com/in/alessandro-reyes-martinez/" target="_blank" rel="noopener noreferrer" className="text-brand-primary/60 hover:text-brand-accent transition-colors">
                    <Linkedin size={18} strokeWidth={1.5} />
                </a>
                <a href="https://www.instagram.com/alessandro_reyesm/" target="_blank" rel="noopener noreferrer" className="text-brand-primary/60 hover:text-brand-accent transition-colors">
                    <Instagram size={18} strokeWidth={1.5} />
                </a>
            </div>

            {isProjectPage && (
              <Link to="/" className="hidden sm:flex items-center justify-center font-mono text-[10px] uppercase tracking-widest text-brand-primary/60 border border-brand-primary/10 px-3 py-1.5 rounded-full hover:bg-brand-primary hover:text-brand-dark transition-all duration-300 shrink-0 leading-none ml-2">
                {t('nav.backToWork')}
              </Link>
            )}
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8 font-sans text-xs uppercase tracking-[0.15em] text-brand-primary/70">
            {navLinks.map(link => (
              <a key={link.id} href={`#${link.id}`} onClick={(e) => handleNavClick(e, link.id)}
                 className="hover:text-brand-accent transition-colors cursor-pointer duration-300">
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile: back link + hamburger + language toggle */}
          <div className="flex items-center gap-4 text-brand-primary">
            {isProjectPage && (
              <Link to="/" className="md:hidden flex items-center justify-center font-mono text-[10px] uppercase tracking-widest text-brand-primary/60 border border-brand-primary/10 px-3 py-1.5 rounded-full leading-none">
                {t('nav.back')}
              </Link>
            )}
            
            {/* Language Toggle Button */}
            <button 
                onClick={toggleLanguage} 
                className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-brand-primary/70 hover:text-brand-accent transition-colors px-2 py-1 border border-transparent hover:border-brand-primary/10 rounded-full"
                title="Toggle Language"
            >
                <Globe size={14} strokeWidth={1.5} />
                <span>{language === 'en' ? 'EN' : 'ES'}</span>
            </button>

            <button
              aria-label={menuOpen ? "Close Menu" : "Open Menu"}
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden hover:text-brand-accent transition-colors p-1 touch-manipulation"
            >
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile fullscreen overlay menu */}
      <div
        className={`fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col items-center gap-10 w-full px-8">
          {navLinks.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
              className={`font-display font-light text-5xl text-brand-primary/90 hover:text-brand-accent tracking-tight transition-all duration-300 touch-manipulation ${
                menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              {link.label}
            </a>
          ))}

          <div className={`flex gap-8 mt-8 transition-all duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
               style={{ transitionDelay: menuOpen ? '200ms' : '0ms' }}>
            <a href="https://github.com/Alesso-24" target="_blank" rel="noopener noreferrer" className="text-brand-primary/70 hover:text-brand-accent transition-colors">
                <Github size={24} strokeWidth={1.5} />
            </a>
            <a href="https://www.linkedin.com/in/alessandro-reyes-martinez/" target="_blank" rel="noopener noreferrer" className="text-brand-primary/70 hover:text-brand-accent transition-colors">
                <Linkedin size={24} strokeWidth={1.5} />
            </a>
            <a href="https://www.instagram.com/alessandro_reyesm/" target="_blank" rel="noopener noreferrer" className="text-brand-primary/70 hover:text-brand-accent transition-colors">
                <Instagram size={24} strokeWidth={1.5} />
            </a>
          </div>
        </nav>

        {/* Close tap area behind nav */}
        <button
          className="absolute inset-0 -z-10 w-full h-full cursor-default"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        />
      </div>
    </>
  );
};

export default Navbar;
