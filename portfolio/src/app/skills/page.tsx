import { Skills } from "@/components/sections/Skills";
import { SectionPageShell } from "@/components/layout/SectionPageShell";
import { getPortfolioContent } from "@/lib/cms";

export default async function SkillsPage() {
  const content = await getPortfolioContent();

  return (
    <SectionPageShell
      eyebrow="Skills"
      title="Tools, technologies, and systems I use to ship."
      description="This page is a focused view of my technical stack, from AI engineering to full-stack delivery."
    >
      <Skills content={content} />
    </SectionPageShell>
  );
}
