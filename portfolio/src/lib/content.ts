// ============================================================
// PORTFOLIO CMS — Edit this file to update all site content
// No code changes required anywhere else.
// ============================================================

export const siteConfig = {
  name: "Shishir",
  title: "AI Engineer & Full Stack Developer",
  tagline: "Building AI-powered products, intelligent automation systems, and scalable web applications.",
  email: "shishir@example.com",
  github: "https://github.com/shishir",
  linkedin: "https://linkedin.com/in/shishir",
  resumeUrl: "https://drive.google.com/file/d/1LEon_FIuO_QzKh8R733l5zgV-hdApr3x/view?usp=sharing",
  seo: {
    description: "Shishir — AI Engineer & Full Stack Developer specializing in LLM applications, computer vision, and scalable web systems.",
    keywords: "AI Engineer, Full Stack Developer, LLM, OpenAI, Next.js, Python, Machine Learning",
    ogImage: "/og-image.png",
    siteUrl: "https://shishir.dev",
  },
};

export const about = {
  intro: "I'm an AI Engineer and Full Stack Developer with a deep focus on building intelligent, production-grade systems. I turn complex problems into elegant, scalable solutions—from custom LLM pipelines to full-stack SaaS platforms.",
  extended: "Over the past several years I've worked across the AI/ML stack—fine-tuning models, architecting RAG pipelines, shipping computer vision systems, and building the full-stack infrastructure that wraps them. I care equally about the intelligence layer and the user experience layer.",
  passion: "My work sits at the intersection of AI research and product engineering. I'm energized by the gap between what AI can do in a lab and what it actually delivers in production—and I close that gap.",
  stats: [
    { label: "Projects Shipped", value: 40, suffix: "+" },
    { label: "AI Models Deployed", value: 15, suffix: "+" },
    { label: "APIs Integrated", value: 30, suffix: "+" },
    { label: "Years Experience", value: 5, suffix: "+" },
  ],
};

export const skills = [
  {
    category: "AI & Machine Learning",
    icon: "Brain",
    items: ["OpenAI GPT-4o", "Claude 3.5", "Gemini 1.5", "LangChain", "LlamaIndex", "Fine-tuning", "RAG Pipelines", "Vector DBs"],
  },
  {
    category: "Prompt Engineering",
    icon: "Wand2",
    items: ["Chain-of-Thought", "Few-Shot Prompting", "ReAct Agents", "Tool Use", "Structured Outputs", "Prompt Optimization"],
  },
  {
    category: "LLM Applications",
    icon: "Bot",
    items: ["AI Chatbots", "Document QA", "Semantic Search", "AI Agents", "Knowledge Bases", "Auto-evaluation"],
  },
  {
    category: "Computer Vision",
    icon: "Eye",
    items: ["YOLOv8", "OpenCV", "Object Detection", "Image Classification", "OCR / Document AI", "Real-time Pipelines"],
  },
  {
    category: "Full Stack Development",
    icon: "Code2",
    items: ["React", "Next.js 15", "Node.js", "FastAPI", "PostgreSQL", "MySQL", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Cloud & DevOps",
    icon: "Cloud",
    items: ["AWS (EC2, S3, Lambda)", "Docker", "GitHub Actions", "Nginx", "Redis", "Vercel", "Railway"],
  },
];

export const techStack = [
  "Python", "OpenAI", "Claude", "Gemini", "LangChain", "React", "Next.js",
  "Node.js", "FastAPI", "PostgreSQL", "MySQL", "Docker", "AWS", "Git", "Tailwind CSS",
];

export const projects = [
  {
    id: "ai-asset-valuation",
    title: "AI Asset Valuation Platform",
    description: "End-to-end platform for automated asset valuation using GPT-4o and structured financial data pipelines. Processes thousands of assets per day with 94% accuracy vs. human appraisers.",
    tags: ["Python", "OpenAI", "FastAPI", "PostgreSQL", "React", "AWS"],
    outcomes: ["94% valuation accuracy", "10× faster than manual", "Used by 3 enterprises"],
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-zinc-900 to-zinc-800",
    featured: true,
  },
  {
    id: "ai-courier-management",
    title: "AI Courier Management System",
    description: "Intelligent logistics platform with NLP-powered order processing, route optimization, and automated customer communication. Integrates with 12 courier APIs.",
    tags: ["LangChain", "Node.js", "Next.js", "MySQL", "Docker", "Redis"],
    outcomes: ["60% reduction in manual ops", "12 API integrations", "Real-time tracking"],
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-zinc-800 to-neutral-900",
    featured: true,
  },
  {
    id: "computer-vision-platform",
    title: "Computer Vision Detection Platform",
    description: "Real-time object detection and classification system built for industrial quality control. Deployed on edge hardware with a cloud dashboard for analytics and alerts.",
    tags: ["YOLOv8", "OpenCV", "Python", "FastAPI", "React", "AWS S3"],
    outcomes: ["99.2% defect detection", "< 50ms inference", "Edge + cloud hybrid"],
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-neutral-900 to-zinc-900",
    featured: true,
  },
  {
    id: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    description: "Automated resume screening and ranking tool for HR teams. Extracts structured data, scores candidate fit against job descriptions, and generates interview question sets.",
    tags: ["OpenAI", "LangChain", "FastAPI", "React", "PostgreSQL"],
    outcomes: ["80% time savings for HR", "Structured data extraction", "ATS integration"],
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-zinc-900 to-stone-900",
    featured: false,
  },
  {
    id: "ai-business-assistant",
    title: "AI Business Assistant",
    description: "Multi-agent AI assistant for SMBs—handles customer support, lead qualification, appointment booking, and internal knowledge retrieval through a single conversational interface.",
    tags: ["Claude", "LangChain", "Next.js", "Supabase", "Vercel"],
    outcomes: ["24/7 automation", "40% lead conversion lift", "Multi-channel support"],
    liveUrl: "#",
    githubUrl: "#",
    gradient: "from-stone-900 to-zinc-900",
    featured: false,
  },
];

export const caseStudies = [
  {
    projectId: "ai-asset-valuation",
    title: "AI Asset Valuation Platform",
    problem: "A financial services firm was spending 3 weeks per asset valuation, relying on manual spreadsheets and subjective appraiser judgment. Inconsistency across appraisers caused compliace risk.",
    solution: "Built a GPT-4o–powered valuation engine that ingests raw financial documents, extracts structured data, applies comparable analysis, and generates auditable valuation reports—all in under 2 minutes.",
    process: ["Document ingestion pipeline with OCR + LLM extraction", "Fine-tuned prompt chain for financial reasoning", "Comparable analysis engine using vector similarity", "Human-in-the-loop review interface", "Audit trail and versioned report generation"],
    results: "94% accuracy against certified appraiser benchmarks. Processing time dropped from 3 weeks to 2 minutes. The platform now handles 2,000+ valuations per month.",
    metrics: [
      { label: "Accuracy", value: "94%" },
      { label: "Time Saved", value: "99.5%" },
      { label: "Monthly Volume", value: "2,000+" },
      { label: "Cost Reduction", value: "70%" },
    ],
  },
  {
    projectId: "computer-vision-platform",
    title: "Computer Vision Detection Platform",
    problem: "A manufacturing client had a 3–4% product defect escape rate causing downstream recalls and warranty costs exceeding $2M/year. Manual visual inspection was slow and inconsistent.",
    solution: "Deployed a custom-trained YOLOv8 model on Jetson Nano edge hardware at each inspection station. Cloud dashboard aggregates anomaly data, triggers alerts, and provides shift-level analytics.",
    process: ["Custom dataset creation with 15,000+ labeled images", "YOLOv8 fine-tuning with augmentation pipeline", "Edge deployment on Nvidia Jetson hardware", "FastAPI cloud sync layer with real-time dashboards", "Alert system with Slack and email integration"],
    results: "Defect escape rate dropped from 3.8% to under 0.2%. ROI achieved within 4 months. The system now runs across 6 production lines 24/7.",
    metrics: [
      { label: "Defect Detection", value: "99.2%" },
      { label: "Escape Rate", value: "< 0.2%" },
      { label: "Inference Speed", value: "< 50ms" },
      { label: "ROI Timeline", value: "4 months" },
    ],
  },
];

export const services = [
  {
    icon: "Brain",
    title: "AI Application Development",
    description: "Custom LLM-powered applications—chatbots, document AI, retrieval systems, and AI agents—built for production reliability at scale.",
  },
  {
    icon: "MessageSquare",
    title: "Custom ChatGPT Integration",
    description: "Embed conversational AI into your existing products. From customer support bots to internal knowledge assistants.",
  },
  {
    icon: "Eye",
    title: "Computer Vision Solutions",
    description: "Real-time detection, classification, and measurement systems for industrial, retail, and healthcare use cases.",
  },
  {
    icon: "Layers",
    title: "SaaS Development",
    description: "Full-stack SaaS platforms with auth, billing, multi-tenancy, and AI features—shipped production-ready.",
  },
  {
    icon: "Zap",
    title: "API Development",
    description: "High-performance REST and GraphQL APIs with FastAPI or Node.js. Documented, tested, and built to scale.",
  },
  {
    icon: "GitMerge",
    title: "Workflow Automation",
    description: "End-to-end automation of manual business processes using AI, webhooks, and custom orchestration engines.",
  },
  {
    icon: "Globe",
    title: "Full Stack Web Development",
    description: "Modern web applications with Next.js, React, and TypeScript. Fast, accessible, and built to last.",
  },
];

export const experience = [
  {
    period: "2023 – Present",
    role: "AI Engineer & Product Developer",
    company: "Independent / Freelance",
    description: "Building AI-powered SaaS products and consulting for startups and enterprises on LLM strategy, computer vision, and full-stack architecture.",
    highlights: ["Shipped 5 production AI platforms", "Clients across fintech, logistics, manufacturing"],
  },
  {
    period: "2021 – 2023",
    role: "Full Stack Developer",
    company: "Tech Startup",
    description: "Led frontend and backend development for a B2B SaaS platform. Introduced AI features including smart search and automated reporting.",
    highlights: ["Led 4-person engineering team", "Scaled platform to 500+ enterprise users"],
  },
  {
    period: "2020 – 2021",
    role: "Junior Software Engineer",
    company: "Software Agency",
    description: "Developed client web applications and REST APIs. First exposure to ML integration in production applications.",
    highlights: ["Delivered 12+ client projects", "Built internal automation tools"],
  },
];

export const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO",
    company: "FinTech Ventures",
    avatar: "SC",
    quote: "Shishir delivered an AI valuation system that genuinely transformed our operations. His ability to bridge the gap between complex ML concepts and practical business outcomes is exceptional.",
  },
  {
    name: "Marcus Reid",
    role: "Head of Operations",
    company: "LogiCore Systems",
    avatar: "MR",
    quote: "The courier management platform exceeded every expectation. Shishir's technical depth and communication made a complex project feel effortless. Highly recommended.",
  },
  {
    name: "Priya Nair",
    role: "Founder",
    company: "AutoHR",
    avatar: "PN",
    quote: "Our AI resume analyzer cut screening time by 80%. Shishir understood exactly what we needed and built it with a level of polish you rarely see from an individual contributor.",
  },
];

export const blogs = [
  {
    title: "Building Production RAG Systems That Actually Work",
    excerpt: "Most RAG tutorials stop at the happy path. Here's how I handle chunking, retrieval quality, and hallucination in real deployments.",
    date: "December 2024",
    readTime: "8 min read",
    tags: ["LLM", "RAG", "Engineering"],
    url: "#",
  },
  {
    title: "YOLOv8 on Edge Hardware: A Practical Deployment Guide",
    excerpt: "Everything I learned deploying real-time computer vision to Jetson Nano devices for industrial quality control.",
    date: "November 2024",
    readTime: "12 min read",
    tags: ["Computer Vision", "Edge AI", "YOLOv8"],
    url: "#",
  },
  {
    title: "Why Most AI Chatbots Fail in Production (And How to Fix It)",
    excerpt: "The gap between a demo that impresses and a system users trust is mostly about failure modes. Here's my framework.",
    date: "October 2024",
    readTime: "6 min read",
    tags: ["AI", "Product", "Architecture"],
    url: "#",
  },
];

export type SiteConfig = typeof siteConfig;
export type AboutContent = typeof about;
export type SkillGroup = (typeof skills)[number];
export type ProjectItem = (typeof projects)[number];
export type CaseStudyItem = (typeof caseStudies)[number];
export type ServiceItem = (typeof services)[number];
export type ExperienceItem = (typeof experience)[number];
export type TestimonialItem = (typeof testimonials)[number];
export type BlogItem = (typeof blogs)[number];

export type PortfolioContent = {
  siteConfig: SiteConfig;
  about: AboutContent;
  skills: SkillGroup[];
  techStack: string[];
  projects: ProjectItem[];
  caseStudies: CaseStudyItem[];
  services: ServiceItem[];
  experience: ExperienceItem[];
  testimonials: TestimonialItem[];
  blogs: BlogItem[];
};

export const defaultPortfolioContent: PortfolioContent = {
  siteConfig,
  about,
  skills,
  techStack,
  projects,
  caseStudies,
  services,
  experience,
  testimonials,
  blogs,
};
