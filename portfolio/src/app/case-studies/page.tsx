export const dynamic = "force-dynamic";

import { CaseStudies } from "@/components/sections/CaseStudies";
import { SectionPageShell } from "@/components/layout/SectionPageShell";
import { getPortfolioContent } from "@/lib/cms";

export default async function CaseStudiesPage() {
  const content = await getPortfolioContent();

  return (
    <SectionPageShell
      eyebrow="Case Studies"
      title="How selected projects were planned and delivered."
      description="Long-form breakdowns of the problems, the solution paths, and the results achieved."
    >
      <CaseStudies content={content} />
    </SectionPageShell>
  );
}
