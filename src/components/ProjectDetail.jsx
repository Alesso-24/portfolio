/**
 * @file ProjectDetail.jsx
 * @description Fallback for /project/:id when the id doesn't match one of the
 * dedicated project routes in App.jsx. Previously rendered hardcoded,
 * out-of-date placeholder project data styled for the old dark theme (white
 * text on what is now a cream background -- effectively invisible). Replaced
 * with an honest "not found, here's where the real work is" page instead of
 * fabricated project details.
 */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';
import { useLanguage } from '../context/useLanguage';

const ProjectDetail = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <Helmet>
        <title>Project Not Found | Alessandro Reyes</title>
        <meta name="description" content="This project page doesn't exist, but the real work does." />
      </Helmet>
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center text-center px-6 pt-32 pb-32">
        <span className="font-sans font-medium text-xs uppercase tracking-[0.3em] text-brand-accent mb-6">404</span>
        <h1 className="font-display font-medium text-4xl md:text-6xl text-brand-primary tracking-tight mb-6">
          Project Not Found
        </h1>
        <p className="text-brand-primary/70 text-base md:text-lg max-w-md mb-12 font-sans">
          This page doesn't exist — but the work does.
        </p>
        <Link
          to="/"
          className="px-8 py-4 bg-brand-primary text-brand-cream rounded-full font-sans font-medium text-xs uppercase tracking-widest hover:bg-brand-orange hover:text-brand-primary transition-all duration-300"
        >
          {t('nav.backToWork')}
        </Link>
      </div>
    </PageTransition>
  );
};

export default ProjectDetail;
