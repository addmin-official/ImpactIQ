import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, TranslationDictionary } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  direction: 'rtl' | 'ltr';
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('mne_language');
    // Default to Kurdish 'ckb'
    if (saved === 'ckb' || saved === 'ar' || saved === 'en') {
      return saved as Language;
    }
    return 'ckb';
  });

  const direction = language === 'en' ? 'ltr' : 'rtl';

  useEffect(() => {
    // Sync to html tag attributes for RTL support and correct browser rendering
    document.documentElement.dir = direction;
    document.documentElement.lang = language === 'ckb' ? 'ku' : language;
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('mne_language', lang);
  };

  // Safe nested keys accessor: e.g. t('nav.projects')
  const t = (path: string): string => {
    const parts = path.split('.');
    
    // Attempt lookup in active language
    let current: any = translations[language];
    let succeeded = true;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        succeeded = false;
        break;
      }
    }
    
    if (succeeded && typeof current === 'string') {
      return current;
    }

    // Fallback to Kurdish (ckb)
    let fallback: any = translations['ckb'];
    succeeded = true;
    for (const part of parts) {
      if (fallback && typeof fallback === 'object' && part in fallback) {
        fallback = fallback[part];
      } else {
        succeeded = false;
        break;
      }
    }

    if (succeeded && typeof fallback === 'string') {
      return fallback;
    }

    // Ultimate fallback is the path itself
    return path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, direction, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside a LanguageProvider');
  }
  return context;
};
