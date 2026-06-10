import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Services } from "@/components/sections/Services";
import { Experience } from "@/components/sections/Experience";
import { Testimonials } from "@/components/sections/Testimonials";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { getPortfolioContent } from "@/lib/cms";

export default async function Home() {
  const content = await getPortfolioContent();

  return (
    <>
      <Hero content={content} />
      <About content={content} />
      <Skills content={content} />
      <Projects content={content} />
      <CaseStudies content={content} />
      <Services content={content} />
      <Experience content={content} />
      <Testimonials content={content} />
      <Blog content={content} />
      <Contact content={content} />
    </>
  );
}
