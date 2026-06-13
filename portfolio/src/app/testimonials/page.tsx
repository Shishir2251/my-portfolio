import { Testimonials } from "@/components/sections/Testimonials";
import { SectionPageShell } from "@/components/layout/SectionPageShell";
import { getPortfolioContent } from "@/lib/cms";

export default async function TestimonialsPage() {
  const content = await getPortfolioContent();

  return (
    <SectionPageShell
      eyebrow="Testimonials"
      title="What people say about working together."
      description="Client feedback, collaboration notes, and a few signals that the work has been useful."
    >
      <Testimonials content={content} />
    </SectionPageShell>
  );
}
