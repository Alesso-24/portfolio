/**
 * @file ProofBar.jsx
 * @description Thin authority strip between Hero and About — surfaces the
 * three hardware-validated numbers from the IEEE papers plus institutional
 * affiliations, so credibility shows up in the first viewport instead of
 * being buried on paper detail pages.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const ProofBar = () => {
  const { t } = useLanguage();

  const stats = [
    { value: t('proof.stat1_value'), label: t('proof.stat1_label') },
    { value: t('proof.stat2_value'), label: t('proof.stat2_label') },
    { value: t('proof.stat3_value'), label: t('proof.stat3_label') },
  ];

  return (
    <section className="py-16 md:py-20 px-4 md:px-8 bg-brand-dark border-y border-brand-primary/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <div className="font-display font-medium text-5xl md:text-6xl text-brand-primary tracking-tight">
                {stat.value}
              </div>
              <p className="mt-3 font-sans text-xs uppercase tracking-[0.15em] text-brand-primary/60 max-w-[240px] mx-auto md:mx-0 leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-brand-primary/5 text-center"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-primary/40 mb-2">
            {t('proof.affiliations_label')}
          </p>
          <p className="font-mono text-[11px] md:text-xs text-brand-primary/70 tracking-wide">
            {t('proof.affiliations')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProofBar;
