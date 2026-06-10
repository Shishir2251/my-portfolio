"use client";

import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { Loader2, Lock, Save, LogOut, RefreshCcw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/content";
import { getFirebaseAuth, hasClientFirebaseConfig } from "@/lib/firebase/client";

type JsonFields = "skills" | "techStack" | "projects" | "caseStudies" | "services" | "experience" | "testimonials" | "blogs";

const jsonFieldLabels: Record<JsonFields, string> = {
  skills: "Skills",
  techStack: "Tech Stack",
  projects: "Projects",
  caseStudies: "Case Studies",
  services: "Services",
  experience: "Experience",
  testimonials: "Testimonials",
  blogs: "Blogs",
};

const initialAuthForm = {
  email: "",
  password: "",
};

function stringify(value: unknown) {
  return JSON.stringify(value, null, 2);
}

function emptyDraft(content: PortfolioContent) {
  return {
    siteConfig: {
      ...content.siteConfig,
      seo: { ...content.siteConfig.seo },
    },
    about: {
      intro: content.about.intro,
      extended: content.about.extended,
      passion: content.about.passion,
      stats: stringify(content.about.stats),
    },
    skills: stringify(content.skills),
    techStack: stringify(content.techStack),
    projects: stringify(content.projects),
    caseStudies: stringify(content.caseStudies),
    services: stringify(content.services),
    experience: stringify(content.experience),
    testimonials: stringify(content.testimonials),
    blogs: stringify(content.blogs),
  };
}

export default function AdminPage() {
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<PortfolioContent>(defaultPortfolioContent);
  const [draft, setDraft] = useState(() => emptyDraft(defaultPortfolioContent));
  const [authForm, setAuthForm] = useState(initialAuthForm);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setAuthReady(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);

      if (!currentUser) {
        return;
      }

      setLoadingContent(true);
      try {
        const token = await currentUser.getIdToken();
        const response = await fetch("/api/content", {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const nextContent = (data.content ?? defaultPortfolioContent) as PortfolioContent;
        setContent(nextContent);
        setDraft(emptyDraft(nextContent));
      } catch {
        toast.error("Could not load CMS content.");
      } finally {
        setLoadingContent(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateSiteConfig = (key: keyof PortfolioContent["siteConfig"], value: string) => {
    setContent((prev) => ({
      ...prev,
      siteConfig: {
        ...prev.siteConfig,
        [key]: value,
      },
    }));
  };

  const updateSeo = (key: keyof PortfolioContent["siteConfig"]["seo"], value: string) => {
    setContent((prev) => ({
      ...prev,
      siteConfig: {
        ...prev.siteConfig,
        seo: {
          ...prev.siteConfig.seo,
          [key]: value,
        },
      },
    }));
  };

  const updateAbout = (key: "intro" | "extended" | "passion", value: string) => {
    setContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        [key]: value,
      },
    }));
  };

  const updateJsonDraft = (field: JsonFields, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const syncDraftToContent = () => {
    const next = {
      ...content,
      about: {
        ...content.about,
        stats: JSON.parse(draft.about.stats),
      },
      skills: JSON.parse(draft.skills),
      techStack: JSON.parse(draft.techStack),
      projects: JSON.parse(draft.projects),
      caseStudies: JSON.parse(draft.caseStudies),
      services: JSON.parse(draft.services),
      experience: JSON.parse(draft.experience),
      testimonials: JSON.parse(draft.testimonials),
      blogs: JSON.parse(draft.blogs),
    } satisfies PortfolioContent;

    return next;
  };

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    const auth = getFirebaseAuth();
    if (!auth) {
      toast.error("Firebase client config is missing.");
      return;
    }

    setLoadingAuth(true);
    try {
      await signInWithEmailAndPassword(auth, authForm.email, authForm.password);
      toast.success("Signed in successfully.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Sign in failed.";
      toast.error(message);
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast.error("Please sign in first.");
      return;
    }

    if (!getFirebaseAuth()) {
      toast.error("Firebase client config is missing.");
      return;
    }

    setSaving(true);
    try {
      const nextContent = syncDraftToContent();
      const token = await user.getIdToken();
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nextContent),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Save failed.");
      }

      setContent(data.content as PortfolioContent);
      setDraft(emptyDraft(data.content as PortfolioContent));
      toast.success("CMS content updated.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Save failed.";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setContent(defaultPortfolioContent);
    setDraft(emptyDraft(defaultPortfolioContent));
    toast.success("Draft reset to defaults.");
  };

  const handleSignOut = async () => {
    const auth = getFirebaseAuth();
    if (!auth) {
      return;
    }

    await signOut(auth);
    toast.success("Signed out.");
  };

  const loginDisabled = !hasClientFirebaseConfig || loadingAuth;

  return (
    <main className="min-h-screen bg-[var(--surface)] text-[var(--ink)]">
      <div className="container-narrow py-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="section-label mb-4">CMS</p>
            <h1 className="font-display text-[clamp(2.2rem,6vw,4rem)] font-bold leading-tight tracking-tight">
              Portfolio control room
            </h1>
            <p className="text-[var(--ink-secondary)] max-w-2xl mt-3">
              Update every public section from one place. Current placeholder content stays in place until you save changes to Firebase.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="/" className="btn-outline">
              Home
            </a>
            <button onClick={handleReset} className="btn-outline">
              <RefreshCcw size={14} />
              Reset
            </button>
            {user ? (
              <button onClick={handleSignOut} className="btn-outline">
                <LogOut size={14} />
                Sign out
              </button>
            ) : null}
          </div>
        </div>

        {!authReady ? (
          <div className="card p-8">Loading auth...</div>
        ) : !user ? (
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="card p-8">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={18} />
                <h2 className="font-display text-2xl font-semibold">Sign in</h2>
              </div>
              <p className="text-sm text-[var(--ink-muted)] mb-6">
                Use your Firebase Auth admin account to access the dashboard.
              </p>

              {!hasClientFirebaseConfig ? (
                <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-900 dark:text-amber-200">
                  Firebase client env vars are missing. Add them first, then sign in here.
                </div>
              ) : null}

              <form onSubmit={handleSignIn} className="space-y-4 mt-6">
                <div>
                  <label className="text-xs font-medium text-[var(--ink-muted)] mb-1.5 block">Email</label>
                  <input
                    type="email"
                    required
                    value={authForm.email}
                    onChange={(e) => setAuthForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--ink)]"
                    placeholder="admin@yourdomain.com"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--ink-muted)] mb-1.5 block">Password</label>
                  <input
                    type="password"
                    required
                    value={authForm.password}
                    onChange={(e) => setAuthForm((prev) => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--ink)]"
                    placeholder="Your Firebase Auth password"
                  />
                </div>
                <button type="submit" disabled={loginDisabled} className="btn-primary w-full justify-center">
                  {loadingAuth ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Lock size={14} />
                      Sign in
                    </>
                  )}
                </button>
              </form>
            </section>

            <aside className="card p-8">
              <h2 className="font-display text-2xl font-semibold mb-4">What this dashboard edits</h2>
              <ul className="space-y-3 text-sm text-[var(--ink-secondary)]">
                <li>Hero copy, links, and SEO metadata</li>
                <li>About section text and stats</li>
                <li>Skills, projects, case studies, services, experience, testimonials, and blogs</li>
              </ul>
              <p className="text-xs text-[var(--ink-muted)] mt-6">
                The write API is protected by Firebase Auth and an optional admin email allowlist.
              </p>
            </aside>
          </div>
        ) : (
          <div className="space-y-6">
            <section className="card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[var(--ink-muted)] uppercase tracking-widest mb-1">Signed in</p>
                <h2 className="font-display text-xl font-semibold">{user.email}</h2>
                <p className="text-sm text-[var(--ink-muted)]">
                  {loadingContent ? "Loading current CMS content..." : "Edit the content below and save to Firebase."}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleSave} disabled={saving || loadingContent} className="btn-primary">
                  {saving ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={14} />
                      Save changes
                    </>
                  )}
                </button>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="card p-6 space-y-4">
                <h3 className="font-display text-lg font-semibold">Site config</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" value={content.siteConfig.name} onChange={(value) => updateSiteConfig("name", value)} />
                  <Field label="Title" value={content.siteConfig.title} onChange={(value) => updateSiteConfig("title", value)} />
                  <Field className="sm:col-span-2" label="Tagline" value={content.siteConfig.tagline} onChange={(value) => updateSiteConfig("tagline", value)} />
                  <Field label="Email" value={content.siteConfig.email} onChange={(value) => updateSiteConfig("email", value)} />
                  <Field label="GitHub" value={content.siteConfig.github} onChange={(value) => updateSiteConfig("github", value)} />
                  <Field label="LinkedIn" value={content.siteConfig.linkedin} onChange={(value) => updateSiteConfig("linkedin", value)} />
                  <Field className="sm:col-span-2" label="Resume URL" value={content.siteConfig.resumeUrl} onChange={(value) => updateSiteConfig("resumeUrl", value)} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field className="sm:col-span-2" label="SEO Description" value={content.siteConfig.seo.description} onChange={(value) => updateSeo("description", value)} />
                  <Field className="sm:col-span-2" label="SEO Keywords" value={content.siteConfig.seo.keywords} onChange={(value) => updateSeo("keywords", value)} />
                  <Field label="OG Image" value={content.siteConfig.seo.ogImage} onChange={(value) => updateSeo("ogImage", value)} />
                  <Field label="Site URL" value={content.siteConfig.seo.siteUrl} onChange={(value) => updateSeo("siteUrl", value)} />
                </div>
              </div>

              <div className="card p-6 space-y-4">
                <h3 className="font-display text-lg font-semibold">About</h3>
                <div className="space-y-4">
                  <TextareaField label="Intro" value={content.about.intro} onChange={(value) => updateAbout("intro", value)} rows={4} />
                  <TextareaField label="Extended" value={content.about.extended} onChange={(value) => updateAbout("extended", value)} rows={4} />
                  <TextareaField label="Passion" value={content.about.passion} onChange={(value) => updateAbout("passion", value)} rows={4} />
                  <TextareaField label="Stats JSON" value={draft.about.stats} onChange={(value) => setDraft((prev) => ({ ...prev, about: { ...prev.about, stats: value } }))} rows={10} mono />
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              {(Object.keys(jsonFieldLabels) as JsonFields[]).map((field) => (
                <div key={field} className="card p-6">
                  <TextareaField
                    label={jsonFieldLabels[field]}
                    value={draft[field]}
                    onChange={(value) => updateJsonDraft(field, value)}
                    rows={field === "projects" || field === "caseStudies" ? 18 : 12}
                    mono
                  />
                </div>
              ))}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="text-xs font-medium text-[var(--ink-muted)] mb-1.5 block">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--ink)] text-sm"
      />
    </label>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  rows = 5,
  mono = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  mono?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-[var(--ink-muted)] mb-1.5 block">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--ink)] text-sm resize-y ${
          mono ? "font-mono text-xs leading-6" : ""
        }`}
      />
    </label>
  );
}
