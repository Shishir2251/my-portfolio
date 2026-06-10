import { Github, Linkedin, Mail, Download, ArrowUpRight } from "lucide-react";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/content";

export function Footer({ content = defaultPortfolioContent }: { content?: PortfolioContent }) {
  const { siteConfig } = content;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] py-12">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <p className="font-display text-xl font-semibold tracking-tight mb-1">
              {siteConfig.name}
              <span className="text-[var(--ink-muted)]">.</span>
            </p>
            <p className="text-sm text-[var(--ink-muted)]">{siteConfig.title}</p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline py-2 px-3 text-sm"
              aria-label="GitHub"
            >
              <Github size={15} />
              <span className="hidden sm:inline">GitHub</span>
              <ArrowUpRight size={12} className="text-[var(--ink-muted)]" />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline py-2 px-3 text-sm"
              aria-label="LinkedIn"
            >
              <Linkedin size={15} />
              <span className="hidden sm:inline">LinkedIn</span>
              <ArrowUpRight size={12} className="text-[var(--ink-muted)]" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="btn-outline py-2 px-3 text-sm"
              aria-label="Email"
            >
              <Mail size={15} />
              <span className="hidden sm:inline">Email</span>
            </a>
            <a href={siteConfig.resumeUrl} download className="btn-primary py-2 px-3 text-sm">
              <Download size={15} />
              <span className="hidden sm:inline">Resume</span>
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[var(--ink-muted)]">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-[var(--ink-muted)]">
            Designed & built with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
