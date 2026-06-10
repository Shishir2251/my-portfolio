"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/content";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const filters = ["All", "Featured", "AI/ML", "Full Stack"];

export function Projects({ content = defaultPortfolioContent }: { content?: PortfolioContent }) {
  const { projects } = content;
  const [active, setActive] = useState("All");

  const filtered = projects.filter((p) => {
    if (active === "All") return true;
    if (active === "Featured") return p.featured;
    if (active === "AI/ML")
      return p.tags.some((t) =>
        ["OpenAI", "LangChain", "Claude", "YOLOv8", "Python", "Gemini"].includes(t)
      );
    if (active === "Full Stack")
      return p.tags.some((t) =>
        ["React", "Next.js", "Node.js", "FastAPI"].includes(t)
      );
    return true;
  });

  return (
    <section id="projects" className="section-pad border-t border-[var(--border)]">
      <div className="container-narrow">
        <FadeIn>
          <p className="section-label mb-5">Work</p>
        </FadeIn>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <FadeIn delay={0.1}>
            <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-tight">
              Featured projects
            </h2>
          </FadeIn>

          {/* Filter tabs */}
          <FadeIn delay={0.15}>
            <div className="flex gap-2 p-1 bg-[var(--surface-secondary)] border border-[var(--border)] rounded-xl">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all ${
                    active === f
                      ? "bg-[var(--ink)] text-[var(--surface)]"
                      : "text-[var(--ink-muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <div className="card overflow-hidden h-full flex flex-col">
                  {/* Project image placeholder */}
                  <div
                    className={`h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `radial-gradient(circle at 30% 40%, white 0%, transparent 50%)`,
                      }}
                    />
                    <span className="font-display text-2xl font-bold text-white/20 text-center px-4 leading-tight select-none">
                      {project.title}
                    </span>
                    {project.featured && (
                      <span className="absolute top-3 right-3 text-[10px] font-mono font-semibold text-white/60 border border-white/20 rounded-full px-2 py-0.5 uppercase tracking-wider">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display font-semibold text-base leading-tight mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[var(--ink-muted)] leading-relaxed mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Outcomes */}
                    <ul className="space-y-1 mb-4">
                      {project.outcomes.map((o) => (
                        <li key={o} className="flex items-center gap-2 text-xs text-[var(--ink-secondary)]">
                          <span className="w-1 h-1 rounded-full bg-[var(--ink-muted)] flex-shrink-0" />
                          {o}
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="tag text-[11px]">{tag}</span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="tag text-[11px]">+{project.tags.length - 4}</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-auto">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary py-2 px-3 text-xs flex-1 justify-center"
                      >
                        Live Demo
                        <ArrowUpRight size={12} />
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline py-2 px-3 text-xs"
                        aria-label="GitHub"
                      >
                        <Github size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
