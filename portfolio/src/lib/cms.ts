import { defaultPortfolioContent, type PortfolioContent } from "@/lib/content";
import { getAdminAuth, getAdminDb } from "@/lib/firebase/admin";
import { decodeIdToken } from "@/lib/server-auth";

const CMS_COLLECTION = "portfolio-cms";
const CMS_DOCUMENT = "content";
type AboutStat = (typeof defaultPortfolioContent.about.stats)[number];

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asStringArray(value: unknown, fallback: string[] = []) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : fallback;
}

function asNumber(value: unknown, fallback: number) {
  return typeof value === "number" ? value : fallback;
}

function isAboutStat(value: unknown): value is AboutStat {
  return (
    isRecord(value) &&
    typeof value.label === "string" &&
    typeof value.value === "number" &&
    typeof value.suffix === "string"
  );
}

function normalizePortfolioContent(input: unknown): PortfolioContent {
  if (!isRecord(input)) {
    return defaultPortfolioContent;
  }

  const siteConfig = isRecord(input.siteConfig) ? input.siteConfig : {};
  const about = isRecord(input.about) ? input.about : {};

  return {
    siteConfig: {
      ...defaultPortfolioContent.siteConfig,
      name: asString(siteConfig.name, defaultPortfolioContent.siteConfig.name),
      title: asString(siteConfig.title, defaultPortfolioContent.siteConfig.title),
      tagline: asString(siteConfig.tagline, defaultPortfolioContent.siteConfig.tagline),
      email: asString(siteConfig.email, defaultPortfolioContent.siteConfig.email),
      github: asString(siteConfig.github, defaultPortfolioContent.siteConfig.github),
      linkedin: asString(siteConfig.linkedin, defaultPortfolioContent.siteConfig.linkedin),
      resumeUrl: asString(siteConfig.resumeUrl, defaultPortfolioContent.siteConfig.resumeUrl),
      seo: {
        ...defaultPortfolioContent.siteConfig.seo,
        description: asString(siteConfig.seo && isRecord(siteConfig.seo) ? siteConfig.seo.description : undefined, defaultPortfolioContent.siteConfig.seo.description),
        keywords: asString(siteConfig.seo && isRecord(siteConfig.seo) ? siteConfig.seo.keywords : undefined, defaultPortfolioContent.siteConfig.seo.keywords),
        ogImage: asString(siteConfig.seo && isRecord(siteConfig.seo) ? siteConfig.seo.ogImage : undefined, defaultPortfolioContent.siteConfig.seo.ogImage),
        siteUrl: asString(siteConfig.seo && isRecord(siteConfig.seo) ? siteConfig.seo.siteUrl : undefined, defaultPortfolioContent.siteConfig.seo.siteUrl),
      },
    },
    about: {
      ...defaultPortfolioContent.about,
      intro: asString(about.intro, defaultPortfolioContent.about.intro),
      extended: asString(about.extended, defaultPortfolioContent.about.extended),
      passion: asString(about.passion, defaultPortfolioContent.about.passion),
      stats: Array.isArray(about.stats)
        ? about.stats
            .map((stat) =>
              isAboutStat(stat)
                ? stat
                : isRecord(stat)
                  ? {
                      label: asString(stat.label),
                      value: asNumber(stat.value, 0),
                      suffix: asString(stat.suffix, ""),
                    }
                  : null
            )
            .filter((stat): stat is AboutStat => Boolean(stat))
        : defaultPortfolioContent.about.stats,
    },
    skills: Array.isArray(input.skills) ? input.skills : defaultPortfolioContent.skills,
    techStack: asStringArray(input.techStack, defaultPortfolioContent.techStack),
    projects: Array.isArray(input.projects) ? input.projects : defaultPortfolioContent.projects,
    caseStudies: Array.isArray(input.caseStudies) ? input.caseStudies : defaultPortfolioContent.caseStudies,
    services: Array.isArray(input.services) ? input.services : defaultPortfolioContent.services,
    experience: Array.isArray(input.experience) ? input.experience : defaultPortfolioContent.experience,
    testimonials: Array.isArray(input.testimonials) ? input.testimonials : defaultPortfolioContent.testimonials,
    blogs: Array.isArray(input.blogs) ? input.blogs : defaultPortfolioContent.blogs,
  };
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  const db = getAdminDb();
  if (!db) {
    return defaultPortfolioContent;
  }

  try {
    const snapshot = await db.collection(CMS_COLLECTION).doc(CMS_DOCUMENT).get();
    if (!snapshot.exists) {
      return defaultPortfolioContent;
    }

    return normalizePortfolioContent(snapshot.data());
  } catch {
    return defaultPortfolioContent;
  }
}

export async function savePortfolioContent(content: PortfolioContent) {
  const db = getAdminDb();
  if (!db) {
    throw new Error("Firebase Admin is not configured.");
  }

  await db.collection(CMS_COLLECTION).doc(CMS_DOCUMENT).set(content, { merge: true });
  return content;
}

export async function requireAdminUser(idToken: string) {
  const auth = getAdminAuth();
  if (!auth) {
    throw new Error("Firebase Admin auth is not configured.");
  }

  const decoded = await decodeIdToken(auth, idToken);
  const adminEmail = process.env.FIREBASE_ADMIN_EMAIL;

  if (adminEmail && decoded.email !== adminEmail) {
    throw new Error("You are not allowed to edit this CMS.");
  }

  return decoded;
}

export { normalizePortfolioContent };
