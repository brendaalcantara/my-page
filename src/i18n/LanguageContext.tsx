"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import pt from "./pt.json";
import es from "./es.json";
import en from "./en.json";

export type Locale = "pt" | "es" | "en";

const translations = { pt, es, en } as const;

type TranslationsType = typeof pt;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationsType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-locale", newLocale);
      document.documentElement.lang = newLocale;
    }
  }, []);

  React.useEffect(() => {
    const saved = localStorage.getItem("portfolio-locale") as Locale | null;
    if (saved && translations[saved]) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const t = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
