import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink, Shield, Sparkles } from "lucide-react";
import { getPortfolioContent } from "@/lib/cms";
import { getResumeHref } from "@/lib/resume-url";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const featuredRoutes = [
  { title: "About", href: "/about", description: "Background, focus, and professional direction." },
  { title: "Projects", href: "/projects", description: "Featured work, outcomes, and live examples." },
  { title: "Services", href: "/services", description: "What I can build and consult on." },
  { title: "Experience", href: "/experience", description: "Career timeline and roles." },
  { title: "Writing", href: "/blog", description: "Technical notes and articles." },
  { title: "Contact", href: "/contact", description: "For projects and collaborations." },
];

function formatLabel(label: string) {
  return label.replace(/\bAI Models Deployed\b/i, "Years of Experience");
}

export default async function Home() {
  const content = await getPortfolioContent();
  const resumeHref = getResumeHref(content.siteConfig.resumeUrl);
  const featuredProjects = content.projects.filter((project) => project.featured).slice(0, 3);
  const techGroups = [
    {
      label: "AI",
      items: content.skills[0]?.items.slice(0, 4) ?? [],
    },
    {
      label: "Frontend",
      items: content.skills.find((skill) => skill.category.toLowerCase().includes("frontend"))?.items.slice(0, 4) ?? ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      label: "Backend",
      items: content.skills.find((skill) => skill.category.toLowerCase().includes("full stack"))?.items.slice(0, 4) ?? ["Node.js", "FastAPI", "PostgreSQL", "MySQL"],
    },
    {
      label: "Cloud",
      items: content.skills.find((skill) => skill.category.toLowerCase().includes("cloud"))?.items.slice(0, 4) ?? ["AWS", "Docker", "Vercel", "Redis"],
    },
  ];
  const trustStats = [
    {
      label: content.about.stats[0]?.label ?? "Projects Shipped",
      value: content.about.stats[0]?.value ?? 0,
      suffix: content.about.stats[0]?.suffix ?? "+",
    },
    {
      label: "Years of Experience",
      value: content.about.stats[3]?.value ?? 0,
      suffix: content.about.stats[3]?.suffix ?? "+",
    },
    {
      label: "Technologies Used",
      value: content.techStack.length,
      suffix: "+",
    },
  ];

  return (
    <main className="relative overflow-hidden pt-24 pb-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(120,120,120,0.12), transparent 28%), radial-gradient(circle at top right, rgba(0,0,0,0.05), transparent 22%), linear-gradient(to bottom, transparent, transparent 72%, rgba(0,0,0,0.02))",
        }}
      />
      <div className="absolute -top-28 left-[-6rem] h-72 w-72 rounded-full bg-[var(--surface-tertiary)] blur-3xl opacity-40" />
      <div className="absolute top-32 right-[-5rem] h-80 w-80 rounded-full bg-[var(--surface-tertiary)] blur-3xl opacity-35" />

      <div className="container-narrow relative z-10">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-stretch">
          <FadeIn className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface-secondary)] p-8 md:p-12 shadow-[0_18px_60px_var(--glow)]">
            <div className="absolute inset-0 noise-overlay opacity-15" />
            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-3 text-xs font-mono uppercase tracking-[0.22em] text-[var(--ink-muted)]">
                <span className="inline-flex h-2 w-2 rounded-full bg-[var(--ink)]" />
                AI Engineer portfolio
              </div>

              <h1 className="font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.9] tracking-tight max-w-4xl">
                {content.siteConfig.name}
                <span className="text-[var(--ink-muted)]">.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-[1.05rem] md:text-xl leading-relaxed text-[var(--ink-secondary)]">
                {content.siteConfig.title}. {content.siteConfig.tagline}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/projects" className="btn-primary">
                  Explore projects
                  <ArrowRight size={14} />
                </Link>
                <Link href="/contact" className="btn-outline">
                  Contact me
                </Link>
                <a href={resumeHref} download className="btn-outline">
                  Download CV
                  <ExternalLink size={14} />
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {trustStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
                  >
                    <div className="font-display text-3xl font-semibold leading-none mb-2">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--ink-muted)]">
                      {formatLabel(stat.label)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08} direction="right" className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface-secondary)] p-6 md:p-7">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink-muted)] mb-2">
                  Studio view
                </p>
                <h2 className="font-display text-2xl font-semibold">Focused, clean, adaptable</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--ink-muted)]">
                <Shield size={13} />
                CMS live
              </span>
            </div>

            <div className="relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-6 min-h-[360px]">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.65),rgba(255,255,255,0.2))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="space-y-5">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[var(--ink-muted)]">
                    <Sparkles size={12} />
                    Current focus
                  </div>
                  <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-secondary)] p-5">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--ink-muted)] mb-3">
                      Product direction
                    </p>
                    <p className="text-base font-semibold leading-snug text-[var(--ink)]">
                      Minimal interfaces. Reliable systems. CMS-powered content.
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-secondary)] p-4">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)] mb-2">
                        Role
                      </p>
                      <p className="text-sm font-semibold leading-tight">AI Engineer</p>
                    </div>
                    <div className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-secondary)] p-4">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)] mb-2">
                        Stack
                      </p>
                      <p className="text-sm font-semibold leading-tight">Next.js + Firebase</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-secondary)] p-5">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)] mb-2">
                    Working mode
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--ink-secondary)]">
                    Clean surfaces, thoughtful spacing, and strong content hierarchy.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        <FadeIn delay={0.12}>
          <section className="mt-10 grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface-secondary)] p-7 md:p-8">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink-muted)] mb-4">About me</p>
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <h2 className="font-display text-3xl font-semibold tracking-tight mb-4">
                    Building polished AI systems with a product mindset.
                  </h2>
                  <p className="text-[var(--ink-secondary)] leading-relaxed">
                    {content.about.intro}
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)] mb-2">Highlights</p>
                    <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
                      {content.about.stats[0]?.label}, {content.about.stats[1]?.label}, and {content.about.stats[2]?.label}.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)] mb-2">Current focus</p>
                    <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
                      {content.about.passion}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface-secondary)] p-7 md:p-8">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink-muted)] mb-4">Navigation</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {featuredRoutes.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--ink)] hover:shadow-[0_8px_30px_var(--glow)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-display text-lg font-semibold">{item.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-[var(--ink-muted)]">{item.description}</p>
                      </div>
                      <ArrowUpRight size={15} className="flex-shrink-0 text-[var(--ink-muted)] transition-colors group-hover:text-[var(--ink)]" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.16}>
          <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface-secondary)] p-7 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink-muted)] mb-2">Featured work</p>
                <h2 className="font-display text-3xl font-semibold tracking-tight">Selected projects</h2>
              </div>
              <Link href="/projects" className="btn-outline self-start">
                View all projects
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <Link
                  key={project.id}
                  href="/projects"
                  className="group overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 hover:-translate-y-1 hover:border-[var(--ink)] hover:shadow-[0_16px_50px_var(--glow)]"
                >
                  <div className={`relative h-40 bg-gradient-to-br ${project.gradient}`}>
                    <div className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.7) 0%, transparent 45%)",
                      }}
                    />
                    <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm">
                      Featured
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold leading-tight mb-2">{project.title}</h3>
                    <p className="text-sm text-[var(--ink-muted)] leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="tag text-[11px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.2}>
          <section className="mt-10 rounded-[2rem] border border-[var(--border)] bg-[var(--surface-secondary)] p-7 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink-muted)] mb-2">Tech stack</p>
                <h2 className="font-display text-3xl font-semibold tracking-tight">Tools I work with</h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-[var(--ink-muted)]">
                A concise view of the AI, frontend, backend, and cloud tools that shape my delivery.
              </p>
            </div>

            <div className="grid gap-4 xl:grid-cols-4">
              {techGroups.map((group) => (
                <div key={group.label} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-4">{group.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="tag text-[11px]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

      </div>
    </main>
  );
}
