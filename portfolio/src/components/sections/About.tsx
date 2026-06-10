"use client";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/content";

export function About({ content = defaultPortfolioContent }: { content?: PortfolioContent }) {
  const { about, siteConfig } = content;

  return (
    <section id="about" className="section-pad border-t border-[var(--border)]">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Text side */}
          <div>
            <FadeIn>
              <p className="section-label mb-5">About</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-tight mb-6">
                Building intelligent systems that actually ship.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-[var(--ink-secondary)] leading-relaxed mb-4">
                {about.intro}
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <p className="text-[var(--ink-secondary)] leading-relaxed mb-4">
                {about.extended}
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-[var(--ink-secondary)] leading-relaxed">
                {about.passion}
              </p>
            </FadeIn>
          </div>

          {/* Stats side */}
          <div>
            <FadeIn delay={0.1} direction="right">
              {/* Profile card */}
              <div className="card p-8 mb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--surface-tertiary)] border border-[var(--border)] flex items-center justify-center">
                    <span className="font-display text-xl font-bold text-[var(--ink)]">
                      {siteConfig.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-display font-semibold text-lg leading-tight">{siteConfig.name}</p>
                    <p className="text-sm text-[var(--ink-muted)]">{siteConfig.title}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-px bg-[var(--border)] rounded-xl overflow-hidden">
                  {about.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-[var(--surface)] p-5 flex flex-col"
                    >
                      <span className="font-display text-3xl font-bold text-[var(--ink)] leading-none mb-1">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </span>
                      <span className="text-xs text-[var(--ink-muted)] font-medium mt-1">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Currently building */}
              <div className="card p-5 flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[var(--surface-tertiary)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm">⚡</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--ink)] mb-1">Currently focused on</p>
                  <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                    Multi-agent AI systems, production RAG architectures, and AI-native SaaS products.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
