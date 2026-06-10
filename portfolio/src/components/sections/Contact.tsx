"use client";
import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/content";
import { toast } from "sonner";
import { Send, Mail, Github, Linkedin, Loader2 } from "lucide-react";

const budgets = [
  "< $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Let's discuss",
];

type FormState = {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  company: "",
  budget: "",
  message: "",
};

export function Contact({ content = defaultPortfolioContent }: { content?: PortfolioContent }) {
  const { siteConfig } = content;
  const [form, setForm] = useState<FormState>(initial);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call — replace with your form endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    toast.success("Message sent! I'll get back to you within 24 hours.");
    setForm(initial);
  };

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--ink)] text-sm placeholder:text-[var(--ink-muted)] focus:outline-none focus:border-[var(--ink)] transition-colors";

  return (
    <section id="contact" className="section-pad border-t border-[var(--border)]">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <FadeIn>
              <p className="section-label mb-5">Get in touch</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold leading-tight tracking-tight mb-4">
                Let's build something
                <br />
                <span className="text-[var(--ink-muted)]">together.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-[var(--ink-secondary)] leading-relaxed mb-8">
                I'm open to freelance projects, consulting, and full-time opportunities. Reach out if you want to talk AI, automation, or product engineering.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="space-y-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 p-4 card hover:border-[var(--ink)] group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[var(--surface-tertiary)] flex items-center justify-center text-[var(--ink-secondary)] group-hover:text-[var(--ink)] transition-colors">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--ink-muted)] mb-0.5">Email</p>
                    <p className="text-sm font-medium">{siteConfig.email}</p>
                  </div>
                </a>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 card hover:border-[var(--ink)] group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[var(--surface-tertiary)] flex items-center justify-center text-[var(--ink-secondary)] group-hover:text-[var(--ink)] transition-colors">
                    <Github size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--ink-muted)] mb-0.5">GitHub</p>
                    <p className="text-sm font-medium">github.com/shishir</p>
                  </div>
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 card hover:border-[var(--ink)] group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[var(--surface-tertiary)] flex items-center justify-center text-[var(--ink-secondary)] group-hover:text-[var(--ink)] transition-colors">
                    <Linkedin size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--ink-muted)] mb-0.5">LinkedIn</p>
                    <p className="text-sm font-medium">linkedin.com/in/shishir</p>
                  </div>
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Form */}
          <FadeIn delay={0.15} direction="right">
            <form onSubmit={handleSubmit} className="card p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[var(--ink-muted)] mb-1.5 block">
                    Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={set("name")}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--ink-muted)] mb-1.5 block">
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={set("email")}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[var(--ink-muted)] mb-1.5 block">
                  Company
                </label>
                <input
                  type="text"
                  placeholder="Your company (optional)"
                  value={form.company}
                  onChange={set("company")}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[var(--ink-muted)] mb-1.5 block">
                  Budget Range
                </label>
                <select
                  value={form.budget}
                  onChange={set("budget")}
                  className={inputClass}
                >
                  <option value="">Select a range...</option>
                  {budgets.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-[var(--ink-muted)] mb-1.5 block">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project, goals, and timeline..."
                  value={form.message}
                  onChange={set("message")}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-3 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
