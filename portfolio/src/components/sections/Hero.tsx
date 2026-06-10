"use client";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Download, ExternalLink, Mail } from "lucide-react";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/content";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export function Hero({ content = defaultPortfolioContent }: { content?: PortfolioContent }) {
  const { siteConfig } = content;

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(var(--ink) 1px, transparent 1px),
            linear-gradient(90deg, var(--ink) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full opacity-[0.04] dark:opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, var(--ink) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container-narrow relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          {/* Status badge */}
          <motion.div variants={item} className="mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[var(--ink-muted)] border border-[var(--border)] rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
              Available for new projects
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="font-display text-[clamp(3rem,8vw,6rem)] font-bold leading-none tracking-tight mb-4"
          >
            {siteConfig.name}
            <span className="text-[var(--ink-muted)]">.</span>
          </motion.h1>

          {/* Title */}
          <motion.p
            variants={item}
            className="font-display text-[clamp(1.1rem,2.5vw,1.6rem)] text-[var(--ink-secondary)] font-medium mb-6"
          >
            {siteConfig.title}
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="text-base md:text-lg text-[var(--ink-muted)] leading-relaxed max-w-xl mb-10"
          >
            {siteConfig.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-3 mb-12">
            <a href="#projects" className="btn-primary">
              View Projects
              <ExternalLink size={14} />
            </a>
            <a href="#contact" className="btn-outline">
              Hire Me
            </a>
            <a href={siteConfig.resumeUrl} download className="btn-outline">
              <Download size={14} />
              Resume
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex items-center gap-4">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-[var(--border)] text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:border-[var(--ink)] transition-all"
              aria-label="GitHub"
            >
              <Github size={17} />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-[var(--border)] text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:border-[var(--ink)] transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={17} />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="p-2.5 rounded-xl border border-[var(--border)] text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:border-[var(--ink)] transition-all"
              aria-label="Email"
            >
              <Mail size={17} />
            </a>
            <span className="h-4 w-px bg-[var(--border)] mx-1" />
            <span className="text-xs font-mono text-[var(--ink-muted)]">{siteConfig.email}</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-[var(--ink-muted)] tracking-wider uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-[var(--ink-muted)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
