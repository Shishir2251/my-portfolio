"use client";
import { FadeIn } from "@/components/ui/FadeIn";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/content";
import { ArrowUpRight, Clock } from "lucide-react";

export function Blog({ content = defaultPortfolioContent }: { content?: PortfolioContent }) {
  const { blogs } = content;

  return (
    <section id="blog" className="section-pad border-t border-[var(--border)]">
      <div className="container-narrow">
        <FadeIn>
          <p className="section-label mb-5">Writing</p>
        </FadeIn>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <FadeIn delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-tight">
              Latest articles
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <a href="#" className="btn-outline text-sm self-start md:self-end">
              All articles
              <ArrowUpRight size={14} />
            </a>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {blogs.map((post, i) => (
            <FadeIn key={post.title} delay={i * 0.1}>
              <a
                href={post.url}
                className="card p-7 h-full flex flex-col group block"
              >
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag text-[11px]">{tag}</span>
                  ))}
                </div>
                <h3 className="font-display font-semibold text-base leading-tight mb-3 group-hover:opacity-70 transition-opacity flex-1">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--ink-muted)] leading-relaxed mb-5">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-[var(--ink-muted)] border-t border-[var(--border)] pt-4">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
