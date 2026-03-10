"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { MotionConfig } from "framer-motion";
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
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "pt";
    const saved = localStorage.getItem("portfolio-locale") as Locale | null;
    return saved && translations[saved] ? saved : "pt";
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-locale", newLocale);
      document.cookie = `portfolio-locale=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
      document.documentElement.lang = newLocale;
    }
  }, []);

  const t = translations[locale];

  return (
    <MotionConfig reducedMotion="user">
      <LanguageContext.Provider value={{ locale, setLocale, t }}>
        {children}
      </LanguageContext.Provider>
    </MotionConfig>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
