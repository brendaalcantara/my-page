"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";
import { GamepadIcon, PhoneIcon, HeartPulseIcon, BrainIcon, BookOpenIcon } from "./Icons";

const ANTIBET_SITE_URL = "https://home.antibetalerta.com/";
const ANTIBET_PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.antibet.alerta";
const TESE_GUIADA_URL = "https://teseguiada.com.br/";

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
  const project4 = t.projects.project4;
  const project5 = t.projects.project5;

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
                href={ANTIBET_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-video bg-dark-800 relative overflow-hidden block group/link"
                aria-label={`${t.projects.project2.title} — ${t.projects.project2.site}`}
              >
                <Image
                  src="/images/projects/antibet-alerta-og.png"
                  alt={t.projects.project2.imageAlt}
                  width={1200}
                  height={630}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover/link:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
                  <span className="font-display text-sm text-neon-blue font-semibold">AntiBet Alerta</span>
                  <span className="text-[10px] font-mono text-foreground/70">{t.projects.project2.site} ↗</span>
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
              <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-xs font-mono">
                <span className="text-neon-green">{t.projects.project2.status}</span>
                <a
                  href={ANTIBET_SITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/60 hover:text-neon-blue transition-colors"
                >
                  {t.projects.project2.site} ↗
                </a>
                <a
                  href={ANTIBET_PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-blue hover:text-neon-green transition-colors"
                >
                  {t.projects.project2.playStore} ↗
                </a>
              </div>
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

          {project4 && (
            <ProjectCard
              delay={0.3}
              media={
                <a
                  href="https://github.com/brendaalcantara/gambling-detector"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-video bg-dark-800 flex items-center justify-center relative overflow-hidden block group/link"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 group-hover/link:from-neon-blue/20 group-hover/link:to-neon-purple/20 transition-all" />
                  <div className="text-center z-10 flex flex-col items-center">
                    <div className="mb-3 text-foreground/50"><BrainIcon size={48} /></div>
                    <span className="font-display text-sm text-neon-blue font-semibold">{project4.title}</span>
                    <span className="block text-[10px] font-mono text-foreground/40 mt-1">github.com/brendaalcantara/gambling-detector ↗</span>
                  </div>
                </a>
              }
              Icon={<BrainIcon size={22} />}
              title={project4.title}
              description={project4.description}
              labelText="Purpose"
              labelColor="blue"
              detail={project4.purpose}
              tags={[
                { label: "Python", color: "blue" },
                { label: "TensorFlow", color: "purple" },
                { label: "TFLite", color: "blue" },
              ]}
              action={
                <a
                  href="https://github.com/brendaalcantara/gambling-detector"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-neon-green hover:text-neon-blue transition-colors"
                >
                  {project4.status} ↗
                </a>
              }
            />
          )}

          {project5 && (
            <ProjectCard
              delay={0.4}
              media={
                <a
                  href={TESE_GUIADA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aspect-video bg-[#0f172a] relative overflow-hidden block group/link flex items-center justify-center"
                  aria-label={`${project5.title} — ${project5.status}`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(79,70,229,0.3),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(245,158,11,0.2),transparent_45%)]" />
                  <Image
                    src="/images/projects/tese-guiada-logo.png"
                    alt={project5.imageAlt}
                    width={1213}
                    height={665}
                    className="relative z-10 max-h-32 w-[78%] object-contain transition-transform duration-500 group-hover/link:scale-105"
                  />
                  <span className="absolute bottom-3 right-4 z-10 text-[10px] font-mono text-white/70">teseguiada.com.br ↗</span>
                </a>
              }
              Icon={<BookOpenIcon size={22} />}
              title={project5.title}
              description={project5.description}
              labelText="Purpose"
              labelColor="purple"
              detail={project5.purpose}
              tags={[
                { label: "Next.js", color: "blue" },
                { label: "TypeScript", color: "purple" },
                { label: "ENEM", color: "blue" },
              ]}
              action={
                <a
                  href={TESE_GUIADA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-neon-purple hover:text-neon-blue transition-colors"
                >
                  {project5.status} ↗
                </a>
              }
            />
          )}
        </div>
      </div>
    </section>
  );
}
