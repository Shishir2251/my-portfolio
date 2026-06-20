"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, Download } from "lucide-react";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/content";
import { getResumeHref } from "@/lib/resume-url";
import { sitePages } from "@/lib/site-pages";

export function Navbar({ content = defaultPortfolioContent }: { content?: PortfolioContent }) {
  const { siteConfig } = content;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const navLinks = sitePages.filter((page) => ["/about", "/skills", "/projects", "/services", "/blog", "/contact"].includes(page.href));
  const resumeHref = getResumeHref(siteConfig.resumeUrl);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "nav-blur border-b border-[var(--border)]" : ""
        }`}
      >
        <div className="container-narrow">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="font-display text-lg font-700 tracking-tight hover:opacity-70 transition-opacity"
            >
              {siteConfig.name}
              <span className="text-[var(--ink-muted)]">.</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--ink-secondary)] hover:text-[var(--ink)] transition-colors link-underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="hidden md:inline-flex text-sm text-[var(--ink-secondary)] hover:text-[var(--ink)] transition-colors link-underline"
              >
                Admin
              </Link>
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-[var(--surface-tertiary)] transition-colors text-[var(--ink-secondary)]"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              )}
              <a
                href={resumeHref}
                download
                className="hidden md:inline-flex btn-primary text-sm py-2 px-4"
              >
                <Download size={14} />
                Resume
              </a>
              <button
                className="md:hidden p-2 rounded-lg hover:bg-[var(--surface-tertiary)] transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-[var(--surface)] border-l border-[var(--border)] p-8 flex flex-col gap-6 transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="pt-12 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-display font-semibold text-[var(--ink-secondary)] hover:text-[var(--ink)] transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="text-lg font-display font-semibold text-[var(--ink-secondary)] hover:text-[var(--ink)] transition-colors py-1"
            >
              Admin
            </Link>
          </div>
          <a
            href={resumeHref}
            download
            className="btn-primary mt-auto"
            onClick={() => setMenuOpen(false)}
          >
            <Download size={14} />
            Download Resume
          </a>
        </div>
      </div>
    </>
  );
}
