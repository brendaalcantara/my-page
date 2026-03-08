"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { softSkillIconComponents, FlagBRIcon, FlagESIcon, FlagGBIcon } from "./Icons";

const langFlagComponents: Record<string, React.ReactNode> = {
  "Português": <FlagBRIcon size={24} />,
  "Portuguese": <FlagBRIcon size={24} />,
  "Portugués": <FlagBRIcon size={24} />,
  "Espanhol": <FlagESIcon size={24} />,
  "Spanish": <FlagESIcon size={24} />,
  "Español": <FlagESIcon size={24} />,
  "Inglês": <FlagGBIcon size={24} />,
  "English": <FlagGBIcon size={24} />,
  "Inglés": <FlagGBIcon size={24} />,
};

const langBarWidths: Record<string, number> = {
  "Nativo": 100,
  "Native": 100,
  "Intermediário": 60,
  "Intermediate": 60,
  "Intermedio": 60,
  "Iniciante": 30,
  "Beginner": 30,
  "Principiante": 30,
};

export default function SoftSkills() {
  const { t } = useLanguage();

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold gradient-text mb-8">
              {t.softSkills.title}
            </h2>
            <div className="space-y-3">
              {t.softSkills.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 glass-card rounded-lg px-4 py-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ x: 6, borderColor: "rgba(0,212,255,0.3)" }}
                >
                  <div className="flex-shrink-0 text-foreground/60">
                    {softSkillIconComponents[index]}
                  </div>
                  <span className="text-sm text-foreground/80">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold gradient-text mb-8">
              {t.languages.title}
            </h2>
            <div className="space-y-6">
              {t.languages.items.map((lang, index) => (
                <motion.div
                  key={index}
                  className="glass-card rounded-xl p-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        {langFlagComponents[lang.name] || <FlagBRIcon size={24} />}
                      </div>
                      <span className="font-display text-sm font-semibold text-foreground">
                        {lang.name}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-neon-purple">
                      {lang.level}
                    </span>
                  </div>
                  <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-blue"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${langBarWidths[lang.level] || 50}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
