import { Services } from "@/components/sections/Services";
import { SectionPageShell } from "@/components/layout/SectionPageShell";
import { getPortfolioContent } from "@/lib/cms";

export default async function ServicesPage() {
  const content = await getPortfolioContent();

  return (
    <SectionPageShell
      eyebrow="Services"
      title="The kinds of work I can help you ship."
      description="A dedicated page for the services I offer, from AI application development to full-stack implementation."
    >
      <Services content={content} />
    </SectionPageShell>
  );
}
