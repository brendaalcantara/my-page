"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { achievementIcons } from "./Icons";

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold gradient-text mb-4">
            {t.experience.title}
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mb-4" />
          {t.experience.intro && (
            <p className="text-foreground/50 text-sm max-w-2xl mx-auto">{t.experience.intro}</p>
          )}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.experience.achievements.map((achievement, index) => {
            const IconComponent = achievementIcons[index] ?? achievementIcons[0];
            return (
              <motion.div
                key={index}
                className="achievement-unlock glass-card rounded-xl p-6 group cursor-default"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 text-foreground/60 group-hover:text-neon-blue group-hover:scale-110 transition-all">
                    <IconComponent />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-neon-purple uppercase tracking-widest">
                        {t.experience.achievementUnlocked}
                      </span>
                    </div>
                    <h3 className="font-display text-sm font-semibold text-foreground mb-2">
                      {achievement.title}
                    </h3>
                    <p className="text-foreground/50 text-xs leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
