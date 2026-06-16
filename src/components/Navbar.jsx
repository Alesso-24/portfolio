import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Github, Linkedin, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
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
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
          layout
          className="w-auto min-w-[300px] max-w-[95%] bg-brand-primary/5 border border-brand-primary/10 shadow-sm backdrop-blur-md rounded-full px-4 md:px-6 py-3 flex justify-between items-center pointer-events-auto gap-4 md:gap-8"
        >
          
          {/* Left: Logo + Desktop Socials */}
          <motion.div layout className="flex items-center gap-4 md:gap-6 text-brand-primary min-w-0">
            <motion.div layout>
              <Link to="/" className="font-display font-medium text-lg tracking-wide hover:text-brand-accent transition-colors duration-300 shrink-0 whitespace-nowrap">
                ALESSANDRO.
              </Link>
            </motion.div>
            
            {/* Desktop Socials */}
            <motion.div layout className="hidden md:flex items-center gap-3 border-l border-brand-primary/20 pl-6">
                <a href="https://github.com/Alesso-24" target="_blank" rel="noopener noreferrer" className="text-brand-primary/70 hover:text-brand-accent transition-colors">
                    <Github size={18} strokeWidth={1.5} />
                </a>
                <a href="https://www.linkedin.com/in/alessandro-reyes-mtz/" target="_blank" rel="noopener noreferrer" className="text-brand-primary/70 hover:text-brand-accent transition-colors">
                    <Linkedin size={18} strokeWidth={1.5} />
                </a>
                <a href="https://www.instagram.com/alessandro_reyesm/" target="_blank" rel="noopener noreferrer" className="text-brand-primary/70 hover:text-brand-accent transition-colors">
                    <Instagram size={18} strokeWidth={1.5} />
                </a>
            </motion.div>

            <AnimatePresence mode="popLayout">
              {isProjectPage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -20 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="hidden lg:flex"
                >
                  <Link to="/" className="flex items-center justify-center font-mono text-[10px] uppercase tracking-widest text-brand-primary/70 border border-brand-primary/10 px-3 py-1.5 rounded-full hover:bg-brand-primary hover:text-brand-cream transition-all duration-300 shrink-0 leading-none ml-2 whitespace-nowrap">
                    {t('nav.backToWork')}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Desktop nav links */}
          <motion.div layout className="hidden lg:flex items-center gap-6 font-sans text-xs uppercase tracking-[0.15em] text-brand-primary/70 shrink-0">
            {navLinks.map(link => (
              <motion.a layout="position" key={link.id} href={`#${link.id}`} onClick={(e) => handleNavClick(e, link.id)}
                 className="hover:text-brand-accent transition-colors cursor-pointer duration-300 whitespace-nowrap">
                {link.label}
              </motion.a>
            ))}
          </motion.div>

          {/* Mobile: back link + hamburger + language toggle */}
          <motion.div layout className="flex items-center gap-4 text-brand-primary shrink-0">
            <AnimatePresence mode="popLayout">
              {isProjectPage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="lg:hidden"
                >
                  <Link to="/" className="flex items-center justify-center font-mono text-[10px] uppercase tracking-widest text-brand-primary/70 border border-brand-primary/10 px-3 py-1.5 rounded-full leading-none whitespace-nowrap">
                    {t('nav.back')}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Language Toggle Button */}
            <motion.button 
                layout
                onClick={toggleLanguage} 
                className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-brand-primary/70 hover:text-brand-accent transition-colors px-2 py-1 border border-transparent hover:border-brand-primary/10 rounded-full"
                title="Toggle Language"
            >
                <Globe size={14} strokeWidth={1.5} />
                <motion.span layout="position">{language === 'en' ? 'EN' : 'ES'}</motion.span>
            </motion.button>

            <motion.button
              layout
              aria-label={menuOpen ? "Close Menu" : "Open Menu"}
              onClick={() => setMenuOpen(o => !o)}
              className="lg:hidden hover:text-brand-accent transition-colors p-1 touch-manipulation"
            >
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </motion.button>
          </motion.div>
        </motion.nav>
      </header>

      {/* Mobile fullscreen overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-brand-cream/95 backdrop-blur-xl flex flex-col items-center justify-center lg:hidden pointer-events-auto"
            aria-hidden={!menuOpen}
          >
            <nav className="flex flex-col items-center gap-10 w-full px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="font-display font-light text-5xl text-brand-primary/90 hover:text-brand-accent tracking-tight transition-all duration-300 touch-manipulation"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="flex gap-8 mt-8"
              >
                <a href="https://github.com/Alesso-24" target="_blank" rel="noopener noreferrer" className="text-brand-primary/70 hover:text-brand-accent transition-colors">
                    <Github size={24} strokeWidth={1.5} />
                </a>
                <a href="https://www.linkedin.com/in/alessandro-reyes-mtz/" target="_blank" rel="noopener noreferrer" className="text-brand-primary/70 hover:text-brand-accent transition-colors">
                    <Linkedin size={24} strokeWidth={1.5} />
                </a>
                <a href="https://www.instagram.com/alessandro_reyesm/" target="_blank" rel="noopener noreferrer" className="text-brand-primary/70 hover:text-brand-accent transition-colors">
                    <Instagram size={24} strokeWidth={1.5} />
                </a>
              </motion.div>
            </nav>

            {/* Close tap area behind nav */}
            <button
              className="absolute inset-0 -z-10 w-full h-full cursor-default"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
