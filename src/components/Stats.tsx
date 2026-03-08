"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { useEffect, useRef, useState, ReactNode } from "react";
import { statsIconComponents } from "./Icons";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();

          const duration = 2000;
          const startTime = performance.now();

          function step(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(step);
          }

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref} className="font-display text-3xl sm:text-4xl font-bold gradient-text">
      {display}{suffix}
    </span>
  );
}

type StatKey = "yearsCoding" | "yearsMeli" | "prsCreated" | "prReviews" | "repos" | "systemsSupported" | "onCall";

const statsData: { key: StatKey; value: number; suffix: string; icon: ReactNode; special?: boolean }[] = [
  { key: "yearsCoding", value: 5, suffix: "+", icon: statsIconComponents[0] },
  { key: "yearsMeli", value: 3, suffix: "+", icon: statsIconComponents[1] },
  { key: "prsCreated", value: 154, suffix: "", icon: statsIconComponents[2] },
  { key: "prReviews", value: 121, suffix: "", icon: statsIconComponents[3] },
  { key: "repos", value: 76, suffix: "", icon: statsIconComponents[4] },
  { key: "systemsSupported", value: 0, suffix: "", icon: statsIconComponents[5], special: true },
  { key: "onCall", value: 0, suffix: "", icon: statsIconComponents[6], special: true },
];

export default function Stats() {
  const { t } = useLanguage();

  return (
    <section id="stats" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold gradient-text mb-4">
            {t.stats.title}
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-neon-blue to-neon-purple rounded-full" />
        </motion.div>

        <div className="glass-card rounded-2xl p-8 neon-border">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.key}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-2 text-foreground/60">
                  {stat.icon}
                </div>
                {stat.special ? (
                  <span className="font-display text-3xl sm:text-4xl font-bold gradient-text">
                    {stat.key === "onCall" ? "✓" : "M+"}
                  </span>
                ) : (
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                )}
                <p className="text-foreground/50 text-xs font-mono mt-2 uppercase tracking-wider">
                  {(t.stats as Record<string, string>)[stat.key]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
