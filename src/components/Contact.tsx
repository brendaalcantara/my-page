"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { LinkedInIcon, GitHubIcon, MailIcon } from "./Icons";

const contactLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/brendabispo",
    icon: LinkedInIcon,
    isExternal: true,
  },
  {
    name: "GitHub",
    url: "https://github.com/brendaalcantara",
    icon: GitHubIcon,
    isExternal: true,
  },
  {
    name: "Email",
    url: "mailto:brendaalcantarabba@gmail.com",
    icon: MailIcon,
    isExternal: false,
  },
];

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold gradient-text mb-4">
            {t.contact.title}
          </h2>
          <p className="text-foreground/50 text-sm font-mono mb-10">
            {t.contact.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {contactLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg glass-card border border-foreground/10 text-foreground/70 hover:text-neon-blue hover:border-neon-blue/30 transition-all font-mono text-sm"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon size={20} />
                {link.name}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-20 pt-8 border-t border-foreground/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-foreground/20 text-xs font-mono">
            Built with Next.js, Tailwind CSS & Framer Motion
          </p>
        </motion.div>
      </div>
    </section>
  );
}
