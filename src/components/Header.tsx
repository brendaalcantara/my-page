"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, Locale } from "@/i18n/LanguageContext";
import { scrollToSection } from "@/utils/scroll";

const localeLabels: Record<Locale, string> = { pt: "PT", es: "ES", en: "EN" };
const locales: Locale[] = ["pt", "es", "en"];

const navIds = [
  "journey",
  "skills",
  "experience",
  "projects",
  "stats",
  "contact",
] as const;

export default function Header({ onDevMode }: { onDevMode: () => void }) {
  const { locale, setLocale, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-neon-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-lg font-bold gradient-text tracking-wider"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            &lt;DEV /&gt;
          </motion.button>

          <nav aria-label={t.nav.ariaLabel} className="hidden md:flex items-center gap-1">
            {navIds.map((id) => (
              <motion.button
                key={id}
                onClick={() => scrollTo(id)}
                className="px-3 py-2 text-sm text-foreground/70 hover:text-neon-blue transition-colors font-mono"
                whileHover={{ y: -2 }}
              >
                {t.nav[id as keyof typeof t.nav]}
              </motion.button>
            ))}
            <motion.button
              onClick={onDevMode}
              className="ml-2 px-3 py-1.5 text-sm font-mono text-neon-green border border-neon-green/30 rounded hover:bg-neon-green/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {"> "}{t.nav.devMode}
            </motion.button>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-dark-800/80 rounded-full p-1">
              {locales.map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`px-2.5 py-1 text-xs font-mono rounded-full transition-all ${
                    locale === l
                      ? "bg-neon-blue/20 text-neon-blue neon-text-blue"
                      : "text-foreground/50 hover:text-foreground/80"
                  }`}
                >
                  {localeLabels[l]}
                </button>
              ))}
            </div>

            <button
              className="md:hidden text-foreground/70 hover:text-neon-blue transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={t.nav.menuLabel}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-neon-blue/10"
          >
            <div className="px-4 py-3 space-y-2">
              {navIds.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="block w-full text-left px-3 py-2 text-sm text-foreground/70 hover:text-neon-blue transition-colors font-mono"
                >
                  {t.nav[id as keyof typeof t.nav]}
                </button>
              ))}
              <button
                onClick={() => { onDevMode(); setMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 text-sm font-mono text-neon-green"
              >
                {"> "}{t.nav.devMode}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
