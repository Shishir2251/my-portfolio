"use client";

import { useAdmin } from "@/lib/admin-context";
import { Field, TextareaField } from "@/app/admin/_components";
import type { PortfolioContent } from "@/lib/content";

type SiteConfigKey = keyof PortfolioContent["siteConfig"];
type SeoKey = keyof PortfolioContent["siteConfig"]["seo"];

export default function SiteConfigPage() {
  const { content, setContent } = useAdmin();

  const updateSiteConfig = (key: SiteConfigKey, value: string) => {
    setContent({ ...content, siteConfig: { ...content.siteConfig, [key]: value } });
  };

  const updateSeo = (key: SeoKey, value: string) => {
    setContent({
      ...content,
      siteConfig: { ...content.siteConfig, seo: { ...content.siteConfig.seo, [key]: value } },
    });
  };

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Site Config</h1>
        <p className="text-sm text-[var(--ink-muted)] mt-1">Name, title, links, and SEO metadata.</p>
      </div>

      <div className="card p-6 space-y-4">
        <h2 className="font-display text-lg font-semibold">General</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" value={content.siteConfig.name} onChange={(v) => updateSiteConfig("name", v)} />
          <Field label="Title" value={content.siteConfig.title} onChange={(v) => updateSiteConfig("title", v)} />
          <Field className="sm:col-span-2" label="Tagline" value={content.siteConfig.tagline} onChange={(v) => updateSiteConfig("tagline", v)} />
          <Field label="Email" value={content.siteConfig.email} onChange={(v) => updateSiteConfig("email", v)} />
          <Field label="GitHub URL" value={content.siteConfig.github} onChange={(v) => updateSiteConfig("github", v)} />
          <Field label="LinkedIn URL" value={content.siteConfig.linkedin} onChange={(v) => updateSiteConfig("linkedin", v)} />
          <Field className="sm:col-span-2" label="Resume URL" value={content.siteConfig.resumeUrl} onChange={(v) => updateSiteConfig("resumeUrl", v)} />
        </div>
      </div>

      <div className="card p-6 space-y-4">
        <h2 className="font-display text-lg font-semibold">SEO</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextareaField className="sm:col-span-2" label="Description" value={content.siteConfig.seo.description} onChange={(v) => updateSeo("description", v)} rows={3} />
          <TextareaField className="sm:col-span-2" label="Keywords" value={content.siteConfig.seo.keywords} onChange={(v) => updateSeo("keywords", v)} rows={3} />
          <Field label="OG Image path" value={content.siteConfig.seo.ogImage} onChange={(v) => updateSeo("ogImage", v)} />
          <Field label="Site URL" value={content.siteConfig.seo.siteUrl} onChange={(v) => updateSeo("siteUrl", v)} />
        </div>
      </div>
    </>
  );
}