"use client";
import { FadeIn } from "@/components/ui/FadeIn";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/content";
import {
  Brain, Wand2, Bot, Eye, Code2, Cloud,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain size={18} />,
  Wand2: <Wand2 size={18} />,
  Bot: <Bot size={18} />,
  Eye: <Eye size={18} />,
  Code2: <Code2 size={18} />,
  Cloud: <Cloud size={18} />,
};

export function Skills({ content = defaultPortfolioContent }: { content?: PortfolioContent }) {
  const { skills, techStack } = content;

  return (
    <section id="skills" className="section-pad border-t border-[var(--border)]">
      <div className="container-narrow">
        <FadeIn>
          <p className="section-label mb-5">Expertise</p>
        </FadeIn>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <FadeIn delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-tight max-w-lg">
              Skills & technologies
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-sm text-[var(--ink-muted)] max-w-xs">
              From model training to production deployment—full-stack AI engineering.
            </p>
          </FadeIn>
        </div>

        {/* Skill categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {skills.map((skill, i) => (
            <FadeIn key={skill.category} delay={i * 0.07}>
              <div className="card p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[var(--surface-tertiary)] border border-[var(--border)] flex items-center justify-center text-[var(--ink-secondary)]">
                    {iconMap[skill.icon] ?? <Code2 size={18} />}
                  </div>
                  <h3 className="font-display font-semibold text-sm leading-tight">
                    {skill.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <span key={item} className="tag text-xs">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Tech stack ticker */}
        <FadeIn>
          <div className="border-t border-[var(--border)] pt-10">
            <p className="text-xs text-[var(--ink-muted)] font-mono uppercase tracking-widest mb-5 text-center">
              Technology Stack
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {techStack.map((tech, i) => (
                <FadeIn key={tech} delay={i * 0.04}>
                  <span className="px-4 py-2 rounded-full border border-[var(--border)] text-sm text-[var(--ink-secondary)] hover:border-[var(--ink)] hover:text-[var(--ink)] transition-all cursor-default font-medium">
                    {tech}
                  </span>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
