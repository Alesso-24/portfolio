import React, { createContext, useState, useContext, useEffect } from 'react';
import en from '../locales/en.json';
import es from '../locales/es.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'es' : 'en'));
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = language === 'en' ? en : es;
    
    for (const k of keys) {
      if (value[k] === undefined) {
        console.warn(`Missing translation key: ${key}`);
        return key; // Fallback to key
      }
      value = value[k];
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
