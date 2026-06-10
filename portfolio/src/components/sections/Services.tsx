"use client";
import { FadeIn } from "@/components/ui/FadeIn";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/content";
import {
  Brain, MessageSquare, Eye, Layers, Zap, GitMerge, Globe, ArrowUpRight,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain size={20} />,
  MessageSquare: <MessageSquare size={20} />,
  Eye: <Eye size={20} />,
  Layers: <Layers size={20} />,
  Zap: <Zap size={20} />,
  GitMerge: <GitMerge size={20} />,
  Globe: <Globe size={20} />,
};

export function Services({ content = defaultPortfolioContent }: { content?: PortfolioContent }) {
  const { services } = content;

  return (
    <section id="services" className="section-pad border-t border-[var(--border)]">
      <div className="container-narrow">
        <FadeIn>
          <p className="section-label mb-5">What I do</p>
        </FadeIn>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <FadeIn delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-tight max-w-md">
              Services I offer
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <a href="#contact" className="btn-outline text-sm self-start md:self-end">
              Start a project
              <ArrowUpRight size={14} />
            </a>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.07}>
              <div className="card p-6 h-full flex flex-col group">
                <div className="w-11 h-11 rounded-xl bg-[var(--surface-tertiary)] border border-[var(--border)] flex items-center justify-center text-[var(--ink-secondary)] mb-5 group-hover:border-[var(--ink)] transition-colors">
                  {iconMap[service.icon] ?? <Globe size={20} />}
                </div>
                <h3 className="font-display font-semibold text-sm leading-tight mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-[var(--ink-muted)] leading-relaxed flex-1">
                  {service.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
