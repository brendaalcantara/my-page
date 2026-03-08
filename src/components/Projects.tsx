"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { GamepadIcon, PhoneIcon, HeartPulseIcon } from "./Icons";

export default function Projects() {
  const { t } = useLanguage();
  const project3 = (t.projects as unknown as Record<string, Record<string, string>>).project3;

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold gradient-text mb-4">
            {t.projects.title}
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mb-4" />
          {(() => {
            const intro = (t.projects as Record<string, unknown>).intro as string | undefined;
            return intro ? <p className="text-foreground/50 text-sm max-w-2xl mx-auto italic">{intro}</p> : null;
          })()}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          <motion.div
            className="glass-card rounded-xl overflow-hidden group flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            whileHover={{ y: -6 }}
          >
            <div className="aspect-video bg-dark-800 overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/3PnYCSx-ql4"
                title={t.projects.project1.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-foreground/60">
                  <GamepadIcon size={22} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {t.projects.project1.title}
                </h3>
              </div>
              <p className="text-foreground/60 text-sm mb-3">
                {t.projects.project1.description}
              </p>
              <p className="text-foreground/50 text-xs mb-2">
                <span className="text-neon-blue font-mono">Goal:</span>{" "}
                {t.projects.project1.goal}
              </p>
              <div className="flex items-center gap-2 mt-auto pt-4">
                <span className="px-2.5 py-1 text-xs font-mono rounded-full bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                  Kotlin
                </span>
                <span className="px-2.5 py-1 text-xs font-mono rounded-full bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
                  Block Programming
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass-card rounded-xl overflow-hidden group flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -6 }}
          >
            <a
              href="https://home.antibetalerta.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-video bg-dark-800 flex items-center justify-center relative overflow-hidden block group/link"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 group-hover/link:from-neon-blue/20 group-hover/link:to-neon-purple/20 transition-all" />
              <div className="text-center z-10 flex flex-col items-center">
                <div className="mb-3 text-foreground/50">
                  <PhoneIcon size={48} />
                </div>
                <span className="font-display text-sm text-neon-blue font-semibold">
                  AntiBet Alerta
                </span>
                <span className="block text-[10px] font-mono text-foreground/40 mt-1">
                  home.antibetalerta.com ↗
                </span>
              </div>
            </a>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-foreground/60">
                  <PhoneIcon size={22} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {t.projects.project2.title}
                </h3>
              </div>
              <p className="text-foreground/60 text-sm mb-3">
                {t.projects.project2.description}
              </p>
              <p className="text-foreground/50 text-xs mb-2">
                <span className="text-neon-blue font-mono">Purpose:</span>{" "}
                {t.projects.project2.purpose}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 text-xs font-mono rounded-full bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                    Kotlin
                  </span>
                  <span className="px-2.5 py-1 text-xs font-mono rounded-full bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
                    Android
                  </span>
                </div>
                <a
                  href="https://home.antibetalerta.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-neon-green hover:text-neon-blue transition-colors"
                >
                  {t.projects.project2.status} ↗
                </a>
              </div>
            </div>
          </motion.div>

          {project3 && (
            <motion.div
              className="glass-card rounded-xl overflow-hidden group flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -6 }}
            >
              <div className="aspect-video bg-dark-800 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-neon-blue/10" />
                <div className="text-center z-10 flex flex-col items-center">
                  <div className="mb-3 text-foreground/50">
                    <HeartPulseIcon size={48} />
                  </div>
                  <span className="font-display text-sm text-neon-purple font-semibold">
                    {project3.title}
                  </span>
                  <span className="block text-[10px] font-mono text-foreground/40 mt-1">
                    {project3.status}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-foreground/60">
                    <HeartPulseIcon size={22} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {project3.title}
                  </h3>
                </div>
                <p className="text-foreground/60 text-sm mb-3">
                  {project3.description}
                </p>
                <p className="text-foreground/50 text-xs mb-2">
                  <span className="text-neon-purple font-mono">Purpose:</span>{" "}
                  {project3.purpose}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 text-xs font-mono rounded-full bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                      Kotlin
                    </span>
                    <span className="px-2.5 py-1 text-xs font-mono rounded-full bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
                      Android
                    </span>
                  </div>
                  <span className="text-xs font-mono text-neon-purple/70">
                    {project3.status}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
