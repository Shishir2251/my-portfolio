"use client";
import { FadeIn } from "@/components/ui/FadeIn";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/content";
import { Quote } from "lucide-react";

export function Testimonials({ content = defaultPortfolioContent }: { content?: PortfolioContent }) {
  const { testimonials } = content;

  return (
    <section id="testimonials" className="section-pad border-t border-[var(--border)]">
      <div className="container-narrow">
        <FadeIn>
          <p className="section-label mb-5">Social Proof</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-tight mb-12">
            What clients say
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <div className="card p-7 h-full flex flex-col">
                <Quote size={20} className="text-[var(--border)] mb-4 flex-shrink-0" />
                <p className="text-sm text-[var(--ink-secondary)] leading-relaxed flex-1 mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 border-t border-[var(--border)] pt-5">
                  <div className="w-9 h-9 rounded-full bg-[var(--surface-tertiary)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-display font-bold text-[var(--ink-secondary)]">
                      {t.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight">{t.name}</p>
                    <p className="text-xs text-[var(--ink-muted)]">
                      {t.role}, {t.company}
                    </p>
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
