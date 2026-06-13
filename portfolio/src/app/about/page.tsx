import { About } from "@/components/sections/About";
import { SectionPageShell } from "@/components/layout/SectionPageShell";
import { getPortfolioContent } from "@/lib/cms";

export default async function AboutPage() {
  const content = await getPortfolioContent();

  return (
    <SectionPageShell
      eyebrow="About"
      title="A deeper look at my background and approach."
      description="This page covers the story behind the portfolio, the kind of work I enjoy, and the impact I try to make in every project."
    >
      <About content={content} />
    </SectionPageShell>
  );
}
