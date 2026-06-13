import { Projects } from "@/components/sections/Projects";
import { SectionPageShell } from "@/components/layout/SectionPageShell";
import { getPortfolioContent } from "@/lib/cms";

export default async function ProjectsPage() {
  const content = await getPortfolioContent();

  return (
    <SectionPageShell
      eyebrow="Projects"
      title="Selected work, outcomes, and live examples."
      description="A separate page for the portfolio work itself, with the same CMS-driven content you see on the home page."
    >
      <Projects content={content} />
    </SectionPageShell>
  );
}
