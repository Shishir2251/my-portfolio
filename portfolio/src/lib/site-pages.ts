export type SitePage = {
  label: string;
  href: string;
  description: string;
};

export const sitePages: SitePage[] = [
  { label: "About", href: "/about", description: "Background, bio, and what I focus on." },
  { label: "Skills", href: "/skills", description: "Tools, stacks, and technical strengths." },
  { label: "Projects", href: "/projects", description: "Featured work and live examples." },
  { label: "Case Studies", href: "/case-studies", description: "Deeper breakdowns of selected projects." },
  { label: "Services", href: "/services", description: "What I can build or consult on." },
  { label: "Experience", href: "/experience", description: "Work history and timeline." },
  { label: "Testimonials", href: "/testimonials", description: "Client feedback and social proof." },
  { label: "Blog", href: "/blog", description: "Writing, notes, and technical articles." },
  { label: "Contact", href: "/contact", description: "Ways to reach me for work." },
  { label: "Admin", href: "/admin", description: "CMS dashboard to update the site." },
];
