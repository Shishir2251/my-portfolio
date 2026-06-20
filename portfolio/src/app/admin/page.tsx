"use client";

import Link from "next/link";
import {
  Settings,
  User,
  Code2,
  Layers,
  FolderKanban,
  BookOpen,
  Briefcase,
  MessageSquare,
  FileText,
  Cpu,
  ArrowRight,
} from "lucide-react";
import { useAdmin } from "@/lib/admin-context";

const sections = [
  { href: "/admin/site-config", label: "Site Config", icon: Settings, desc: "Name, title, links, SEO metadata" },
  { href: "/admin/about", label: "About", icon: User, desc: "Intro, extended bio, passion, stats" },
  { href: "/admin/skills", label: "Skills", icon: Code2, desc: "Skill categories and items" },
  { href: "/admin/tech-stack", label: "Tech Stack", icon: Cpu, desc: "Flat list of technologies" },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban, desc: "Featured and non-featured projects" },
  { href: "/admin/case-studies", label: "Case Studies", icon: BookOpen, desc: "Deep-dive project analyses" },
  { href: "/admin/services", label: "Services", icon: Layers, desc: "What you offer" },
  { href: "/admin/experience", label: "Experience", icon: Briefcase, desc: "Career timeline" },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare, desc: "Client / peer quotes" },
  { href: "/admin/blogs", label: "Blogs", icon: FileText, desc: "Articles and writing" },
];

export default function AdminDashboard() {
  const { content } = useAdmin();

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-[var(--ink-muted)] mt-1">
          Manage every section of your portfolio. Select a section to edit.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="card p-5 group hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2.5">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold">{section.label}</h3>
                    <p className="text-xs text-[var(--ink-muted)] mt-0.5">{section.desc}</p>
                  </div>
                </div>
                <ArrowRight size={15} className="text-[var(--ink-muted)] group-hover:text-[var(--ink)] transition-colors mt-1 shrink-0" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Quick stats ────────────────────────────────────── */}
      <div className="card p-5">
        <h2 className="font-display text-base font-semibold mb-3">Content summary</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-sm">
          <Stat label="Skills groups" value={content.skills.length} />
          <Stat label="Tech stack items" value={content.techStack.length} />
          <Stat label="Projects" value={content.projects.length} />
          <Stat label="Case studies" value={content.caseStudies.length} />
          <Stat label="Services" value={content.services.length} />
          <Stat label="Experience entries" value={content.experience.length} />
          <Stat label="Testimonials" value={content.testimonials.length} />
          <Stat label="Blog posts" value={content.blogs.length} />
          <Stat label="About stats" value={content.about.stats.length} />
        </div>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3">
      <p className="text-xs text-[var(--ink-muted)]">{label}</p>
      <p className="font-display text-xl font-semibold mt-1">{value}</p>
    </div>
  );
}