import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Lang = 'hi' | 'en';

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: (hi: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'hi',
  toggleLang: () => {},
  t: (hi) => hi,
});

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('hi');

  const toggleLang = () => setLang((l) => (l === 'hi' ? 'en' : 'hi'));

  const t = (hi: string, en: string) => (lang === 'hi' ? hi : en);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
