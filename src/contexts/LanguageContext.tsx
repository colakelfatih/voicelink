'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { locales } from '@/i18n/config';

type Locale = (typeof locales)[number];

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if locale is stored in localStorage
    const storedLocale = localStorage.getItem('locale') as Locale;
    if (storedLocale && locales.includes(storedLocale)) {
      setLocaleState(storedLocale);
    } else {
      // Check browser language
      const browserLang = navigator.language.split('-')[0];
      const defaultLocale = locales.includes(browserLang as Locale) ? browserLang : 'en';
      setLocaleState(defaultLocale as Locale);
      localStorage.setItem('locale', defaultLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    
    // Update URL with new locale
    if (pathname) {
      const newPath = pathname.replace(/^\/[a-z]{2}/, `/${newLocale}`);
      router.push(newPath);
    } else {
      router.push(`/${newLocale}`);
    }
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 