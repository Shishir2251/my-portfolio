"use client";
import { FadeIn } from "@/components/ui/FadeIn";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/content";
import { Briefcase } from "lucide-react";

export function Experience({ content = defaultPortfolioContent }: { content?: PortfolioContent }) {
  const { experience } = content;

  return (
    <section id="experience" className="section-pad border-t border-[var(--border)]">
      <div className="container-narrow">
        <FadeIn>
          <p className="section-label mb-5">Journey</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-tight mb-12">
            Experience timeline
          </h2>
        </FadeIn>

        <div className="relative max-w-2xl">
          {experience.map((exp, i) => (
            <FadeIn key={i} delay={i * 0.1} direction="left">
              <div className="relative flex gap-6 pb-10 last:pb-0">
                {/* Line + dot */}
                <div className="relative flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full border-2 border-[var(--border)] bg-[var(--surface)] flex items-center justify-center z-10 flex-shrink-0">
                    <Briefcase size={11} className="text-[var(--ink-muted)]" />
                  </div>
                  {i < experience.length - 1 && (
                    <div className="w-px flex-1 bg-[var(--border)] mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="pt-0.5 pb-2">
                  <p className="text-xs font-mono text-[var(--ink-muted)] mb-1">{exp.period}</p>
                  <h3 className="font-display font-semibold text-base leading-tight mb-0.5">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-[var(--ink-muted)] mb-3 font-medium">{exp.company}</p>
                  <p className="text-sm text-[var(--ink-secondary)] leading-relaxed mb-3">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((h) => (
                      <span key={h} className="tag text-[11px]">{h}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
