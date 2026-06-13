import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function SectionPageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="section-pad">
      <div className="container-narrow">
        <div className="mb-10 flex flex-col gap-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
            <ArrowLeft size={14} />
            Back to home
          </Link>
          <p className="section-label">{eyebrow}</p>
          <h1 className="font-display text-[clamp(2.3rem,6vw,4.5rem)] font-bold tracking-tight leading-tight max-w-3xl">
            {title}
          </h1>
          <p className="text-[var(--ink-secondary)] max-w-2xl text-base leading-relaxed">
            {description}
          </p>
        </div>
        {children}
      </div>
    </main>
  );
}
