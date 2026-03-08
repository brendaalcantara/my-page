"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DeveloperJourney from "@/components/DeveloperJourney";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Stats from "@/components/Stats";
import SoftSkills from "@/components/SoftSkills";
import Terminal from "@/components/Terminal";
import Contact from "@/components/Contact";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { useLanguage } from "@/i18n/LanguageContext";
import { GamepadIcon } from "@/components/Icons";

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [konamiActive, setKonamiActive] = useState(false);
  const { t } = useLanguage();

  const handleKonami = useCallback(() => {
    setKonamiActive(true);
    setTimeout(() => setKonamiActive(false), 3000);
  }, []);

  useKonamiCode(handleKonami);

  return (
    <>
      <Header onDevMode={() => setTerminalOpen(true)} />

      <main>
        <Hero />
        <DeveloperJourney />
        <TechStack />
        <Experience />
        <Projects />
        <Stats />
        <SoftSkills />
        <Contact />
      </main>

      <Terminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />

      {konamiActive && (
        <div className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center konami-flash">
          <div className="text-center animate-bounce">
            <div className="flex justify-center mb-2 text-neon-purple"><GamepadIcon size={40} /></div>
            <p className="font-display text-xl text-neon-purple neon-text-purple font-bold">
              {t.easter.konami}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
