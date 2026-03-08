"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2L4 7V13C4 19.6 8.3 25.7 14 27C19.7 25.7 24 19.6 24 13V7L14 2Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M10 14L13 17L19 11" stroke="var(--color-neon-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="20" width="4" height="6" rx="1" fill="var(--color-neon-purple)" opacity="0.6" />
      <rect x="9" y="14" width="4" height="12" rx="1" fill="var(--color-neon-purple)" opacity="0.75" />
      <rect x="15" y="8" width="4" height="18" rx="1" fill="var(--color-neon-blue)" opacity="0.85" />
      <rect x="21" y="4" width="4" height="22" rx="1" fill="var(--color-neon-blue)" />
      <path d="M3 3V26H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CodeReviewIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="22" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11L6 14L8 17" stroke="var(--color-neon-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 11L22 14L20 17" stroke="var(--color-neon-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 9L12 19" stroke="var(--color-neon-purple)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 4V25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 4C5 4 8 2 14 5C20 8 23 6 23 6V16C23 16 20 18 14 15C8 12 5 14 5 14" fill="var(--color-neon-blue)" opacity="0.2" />
      <path d="M5 4C5 4 8 2 14 5C20 8 23 6 23 6V16C23 16 20 18 14 15C8 12 5 14 5 14" stroke="var(--color-neon-blue)" strokeWidth="1.5" />
    </svg>
  );
}

function MigrateIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="8" width="10" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <rect x="16" y="8" width="10" height="12" rx="2" stroke="var(--color-neon-blue)" strokeWidth="1.5" />
      <path d="M12 14H16" stroke="var(--color-neon-purple)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14.5 11.5L17 14L14.5 16.5" stroke="var(--color-neon-purple)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 6C14 6 11 3 5 4V22C11 21 14 24 14 24C14 24 17 21 23 22V4C17 3 14 6 14 6Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 6V24" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M8 9H10" stroke="var(--color-neon-purple)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 13H11" stroke="var(--color-neon-purple)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 9H20" stroke="var(--color-neon-blue)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 13H19" stroke="var(--color-neon-blue)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="14" cy="14" rx="5" ry="11" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M3 14H25" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M5 8H23" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M5 20H23" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <circle cx="18" cy="8" r="2" fill="var(--color-neon-blue)" opacity="0.6" />
      <circle cx="9" cy="18" r="2" fill="var(--color-neon-purple)" opacity="0.6" />
      <circle cx="20" cy="17" r="1.5" fill="var(--color-neon-blue)" opacity="0.4" />
    </svg>
  );
}

const AchievementIcons = [ShieldIcon, ChartIcon, CodeReviewIcon, FlagIcon, MigrateIcon, GlobeIcon];

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
          {(() => {
            const intro = (t.experience as Record<string, unknown>).intro as string | undefined;
            return intro ? <p className="text-foreground/50 text-sm max-w-2xl mx-auto">{intro}</p> : null;
          })()}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.experience.achievements.map((achievement, index) => {
            const IconComponent = AchievementIcons[index] || ShieldIcon;
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
                        Achievement Unlocked
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
