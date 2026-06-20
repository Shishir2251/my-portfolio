export const dynamic = "force-dynamic";

import { Blog } from "@/components/sections/Blog";
import { SectionPageShell } from "@/components/layout/SectionPageShell";
import { getPortfolioContent } from "@/lib/cms";

export default async function BlogPage() {
  const content = await getPortfolioContent();

  return (
    <SectionPageShell
      eyebrow="Blog"
      title="Notes, articles, and technical writing."
      description="A separate place for posts, tutorials, and longer explanations about AI and product engineering."
    >
      <Blog content={content} />
    </SectionPageShell>
  );
}
