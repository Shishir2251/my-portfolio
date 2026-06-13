import { Experience } from "@/components/sections/Experience";
import { SectionPageShell } from "@/components/layout/SectionPageShell";
import { getPortfolioContent } from "@/lib/cms";

export default async function ExperiencePage() {
  const content = await getPortfolioContent();

  return (
    <SectionPageShell
      eyebrow="Experience"
      title="My work history and key milestones."
      description="A concise timeline that shows how the portfolio evolved through different roles and project types."
    >
      <Experience content={content} />
    </SectionPageShell>
  );
}
