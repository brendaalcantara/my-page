"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { GamepadIcon, PhoneIcon, HeartPulseIcon } from "./Icons";

interface Tag {
  label: string;
  color: "blue" | "purple";
}

function ProjectCard({
  media,
  Icon,
  title,
  description,
  labelText,
  labelColor,
  detail,
  tags,
  action,
  delay = 0,
}: {
  media: ReactNode;
  Icon: ReactNode;
  title: string;
  description: string;
  labelText: string;
  labelColor: "blue" | "purple";
  detail: string;
  tags: Tag[];
  action?: ReactNode;
  delay?: number;
}) {
  const labelClass = labelColor === "blue" ? "text-neon-blue" : "text-neon-purple";
  return (
    <motion.div
      className="glass-card rounded-xl overflow-hidden group flex flex-col"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -6 }}
    >
      {media}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="text-foreground/60">{Icon}</div>
          <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
        </div>
        <p className="text-foreground/60 text-sm mb-3">{description}</p>
        <p className="text-foreground/50 text-xs mb-2">
          <span className={`${labelClass} font-mono`}>{labelText}:</span>{" "}
          {detail}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4">
          <div className="flex items-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag.label}
                className={`px-2.5 py-1 text-xs font-mono rounded-full ${
                  tag.color === "purple"
                    ? "bg-neon-purple/10 text-neon-purple border border-neon-purple/20"
                    : "bg-neon-blue/10 text-neon-blue border border-neon-blue/20"
                }`}
              >
                {tag.label}
              </span>
            ))}
          </div>
          {action}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const project3 = t.projects.project3;

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
          {t.projects.intro && (
            <p className="text-foreground/50 text-sm max-w-2xl mx-auto italic">{t.projects.intro}</p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          <ProjectCard
            delay={0}
            media={
              <div className="aspect-video bg-dark-800 overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/3PnYCSx-ql4"
                  title={t.projects.project1.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            }
            Icon={<GamepadIcon size={22} />}
            title={t.projects.project1.title}
            description={t.projects.project1.description}
            labelText="Goal"
            labelColor="blue"
            detail={t.projects.project1.goal}
            tags={[
              { label: "Kotlin", color: "purple" },
              { label: "Block Programming", color: "blue" },
            ]}
          />

          <ProjectCard
            delay={0.1}
            media={
              <a
                href="https://home.antibetalerta.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-video bg-dark-800 flex items-center justify-center relative overflow-hidden block group/link"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 group-hover/link:from-neon-blue/20 group-hover/link:to-neon-purple/20 transition-all" />
                <div className="text-center z-10 flex flex-col items-center">
                  <div className="mb-3 text-foreground/50"><PhoneIcon size={48} /></div>
                  <span className="font-display text-sm text-neon-blue font-semibold">AntiBet Alerta</span>
                  <span className="block text-[10px] font-mono text-foreground/40 mt-1">home.antibetalerta.com ↗</span>
                </div>
              </a>
            }
            Icon={<PhoneIcon size={22} />}
            title={t.projects.project2.title}
            description={t.projects.project2.description}
            labelText="Purpose"
            labelColor="blue"
            detail={t.projects.project2.purpose}
            tags={[
              { label: "Kotlin", color: "purple" },
              { label: "Android", color: "blue" },
            ]}
            action={
              <a
                href="https://home.antibetalerta.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-neon-green hover:text-neon-blue transition-colors"
              >
                {t.projects.project2.status} ↗
              </a>
            }
          />

          {project3 && (
            <ProjectCard
              delay={0.2}
              media={
                <a
                  href="https://home.livmais.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-video bg-dark-800 flex items-center justify-center relative overflow-hidden block group/link"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-neon-blue/10 group-hover/link:from-neon-purple/20 group-hover/link:to-neon-blue/20 transition-all" />
                  <div className="text-center z-10 flex flex-col items-center">
                    <div className="mb-3 text-foreground/50"><HeartPulseIcon size={48} /></div>
                    <span className="font-display text-sm text-neon-purple font-semibold">{project3.title}</span>
                    <span className="block text-[10px] font-mono text-foreground/40 mt-1">home.livmais.com.br ↗</span>
                  </div>
                </a>
              }
              Icon={<HeartPulseIcon size={22} />}
              title={project3.title}
              description={project3.description}
              labelText="Purpose"
              labelColor="purple"
              detail={project3.purpose}
              tags={[
                { label: "Kotlin", color: "purple" },
                { label: "Android", color: "blue" },
              ]}
              action={
                <a
                  href="https://home.livmais.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-neon-purple hover:text-neon-blue transition-colors"
                >
                  {project3.status} ↗
                </a>
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}
