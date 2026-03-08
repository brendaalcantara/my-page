"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

interface Skill {
  name: string;
  level: number;
}

const skillCategories: { key: "backend" | "platform" | "practices"; skills: Skill[] }[] = [
  {
    key: "backend",
    skills: [
      { name: "Java", level: 85 },
      { name: "Kotlin", level: 70 },
      { name: "System Design", level: 60 },
      { name: "Distributed Systems", level: 50 },
    ],
  },
  {
    key: "platform",
    skills: [
      { name: "Spring Boot", level: 85 },
      { name: "Microservices", level: 70 },
      { name: "REST APIs", level: 90 },
      { name: "Event-driven Architecture", level: 55 },
    ],
  },
  {
    key: "practices",
    skills: [
      { name: "Observability", level: 70 },
      { name: "Testing", level: 75 },
      { name: "Code Review", level: 75 },
      { name: "Security", level: 55 },
    ],
  },
];

function XPBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-mono text-foreground/80">{name}</span>
        <span className="text-xs font-mono text-neon-blue">{level}%</span>
      </div>
      <div className="h-3 bg-dark-800 rounded-full overflow-hidden border border-foreground/5">
        <motion.div
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, var(--color-neon-blue), var(--color-neon-purple))`,
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-full" />
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-2 bg-white/40 rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default function TechStack() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold gradient-text mb-4">
            {t.techStack.title}
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-neon-blue to-neon-purple rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.key}
              className="glass-card rounded-xl p-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.15 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-neon-blue animate-glow-pulse" />
                <h3 className="font-display text-sm font-semibold text-neon-blue uppercase tracking-wider">
                  {t.techStack.categories[category.key]}
                </h3>
              </div>
              {category.skills.map((skill, i) => (
                <XPBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={catIdx * 0.15 + i * 0.1}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
