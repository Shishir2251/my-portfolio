import { Contact } from "@/components/sections/Contact";
import { SectionPageShell } from "@/components/layout/SectionPageShell";
import { getPortfolioContent } from "@/lib/cms";

export default async function ContactPage() {
  const content = await getPortfolioContent();

  return (
    <SectionPageShell
      eyebrow="Contact"
      title="Reach out for projects, consulting, or collaborations."
      description="If you want to talk about AI, automation, or a full-stack build, this is the place."
    >
      <Contact content={content} />
    </SectionPageShell>
  );
}
