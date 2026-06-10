"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/content";
import { ChevronDown, ChevronUp } from "lucide-react";

export function CaseStudies({ content = defaultPortfolioContent }: { content?: PortfolioContent }) {
  const { caseStudies } = content;
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="case-studies" className="section-pad border-t border-[var(--border)]">
      <div className="container-narrow">
        <FadeIn>
          <p className="section-label mb-5">Deep Dives</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-tight mb-12">
            Case studies
          </h2>
        </FadeIn>

        <div className="space-y-4">
          {caseStudies.map((cs, i) => (
            <FadeIn key={cs.projectId} delay={i * 0.1}>
              <div className="card overflow-hidden">
                {/* Header */}
                <button
                  onClick={() => setOpen(open === cs.projectId ? null : cs.projectId)}
                  className="w-full flex items-center justify-between p-7 text-left hover:bg-[var(--surface-tertiary)] transition-colors"
                >
                  <div>
                    <p className="text-xs font-mono text-[var(--ink-muted)] uppercase tracking-widest mb-1">
                      Case Study
                    </p>
                    <h3 className="font-display font-semibold text-lg">{cs.title}</h3>
                  </div>
                  <span className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center flex-shrink-0 text-[var(--ink-secondary)]">
                    {open === cs.projectId ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </span>
                </button>

                <AnimatePresence>
                  {open === cs.projectId && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="px-7 pb-7 border-t border-[var(--border)] pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                          <div>
                            <p className="text-xs font-mono font-semibold text-[var(--ink-muted)] uppercase tracking-wider mb-2">
                              Problem
                            </p>
                            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
                              {cs.problem}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-mono font-semibold text-[var(--ink-muted)] uppercase tracking-wider mb-2">
                              Solution
                            </p>
                            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
                              {cs.solution}
                            </p>
                          </div>
                        </div>

                        <div className="mb-8">
                          <p className="text-xs font-mono font-semibold text-[var(--ink-muted)] uppercase tracking-wider mb-3">
                            Development Process
                          </p>
                          <ol className="space-y-2">
                            {cs.process.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-[var(--ink-secondary)]">
                                <span className="font-mono text-[11px] text-[var(--ink-muted)] mt-0.5 w-4 flex-shrink-0">
                                  {String(idx + 1).padStart(2, "0")}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {cs.metrics.map((m) => (
                            <div
                              key={m.label}
                              className="bg-[var(--surface-tertiary)] rounded-xl p-4 text-center"
                            >
                              <p className="font-display text-xl font-bold text-[var(--ink)] mb-1">
                                {m.value}
                              </p>
                              <p className="text-xs text-[var(--ink-muted)]">{m.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
