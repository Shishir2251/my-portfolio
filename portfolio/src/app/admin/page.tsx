"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import {
  Loader2,
  Lock,
  Save,
  LogOut,
  RefreshCcw,
  ShieldCheck,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/content";
import { getFirebaseAuth, hasClientFirebaseConfig } from "@/lib/firebase/client";

const initialAuthForm = {
  email: "",
  password: "",
};

type SiteConfigKey = keyof PortfolioContent["siteConfig"];
type SeoKey = keyof PortfolioContent["siteConfig"]["seo"];
type AboutKey = "intro" | "extended" | "passion";

export default function AdminPage() {
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [content, setContent] = useState<PortfolioContent>(defaultPortfolioContent);
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

      if (!currentUser) return;

      setLoadingContent(true);
      try {
        const token = await currentUser.getIdToken();
        const response = await fetch("/api/content", {
          cache: "no-store",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setContent((data.content ?? defaultPortfolioContent) as PortfolioContent);
      } catch {
        toast.error("Could not load CMS content.");
      } finally {
        setLoadingContent(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateSiteConfig = (key: SiteConfigKey, value: string) => {
    setContent((prev) => ({
      ...prev,
      siteConfig: { ...prev.siteConfig, [key]: value },
    }));
  };

  const updateSeo = (key: SeoKey, value: string) => {
    setContent((prev) => ({
      ...prev,
      siteConfig: {
        ...prev.siteConfig,
        seo: { ...prev.siteConfig.seo, [key]: value },
      },
    }));
  };

  const updateAbout = (key: AboutKey, value: string) => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, [key]: value },
    }));
  };

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }

    const auth = getFirebaseAuth();
    if (!auth || !auth.currentUser) {
      toast.error("Please sign in first.");
      return;
    }

    setUploadingResume(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "resumes");
      formData.append(
        "filename",
        `${content.siteConfig.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-cv.pdf`
      );

      const token = await auth.currentUser.getIdToken();
      const response = await fetch("/api/resume", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Upload failed.");
      }

      const nextContent = {
        ...content,
        siteConfig: {
          ...content.siteConfig,
          resumeUrl: data.url,
        },
      };

      await saveContentToApi(nextContent);
      toast.success("CV uploaded and saved successfully.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "CV upload failed.";
      toast.error(message);
    } finally {
      setUploadingResume(false);
    }
  };

  const updateAboutStat = (index: number, key: "label" | "value" | "suffix", value: string) => {
    setContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        stats: prev.about.stats.map((stat, i) =>
          i === index
            ? {
                ...stat,
                [key]: key === "value" ? Number(value) || 0 : value,
              }
            : stat
        ),
      },
    }));
  };

  const addAboutStat = () => {
    setContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        stats: [...prev.about.stats, { label: "New stat", value: 0, suffix: "" }],
      },
    }));
  };

  const removeAboutStat = (index: number) => {
    setContent((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        stats: prev.about.stats.filter((_, i) => i !== index),
      },
    }));
  };

  const updateStringArrayItem = (
    field: "techStack",
    index: number,
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addStringArrayItem = (field: "techStack") => {
    setContent((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeStringArrayItem = (field: "techStack", index: number) => {
    setContent((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const updateSkill = (
    index: number,
    key: "category" | "icon",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) =>
        i === index ? { ...skill, [key]: value } : skill
      ),
    }));
  };

  const updateSkillItems = (index: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) =>
        i === index
          ? { ...skill, items: value.split(",").map((item) => item.trim()).filter(Boolean) }
          : skill
      ),
    }));
  };

  const addSkill = () => {
    setContent((prev) => ({
      ...prev,
      skills: [...prev.skills, { category: "New category", icon: "Code2", items: [] }],
    }));
  };

  const removeSkill = (index: number) => {
    setContent((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const updateProject = (
    index: number,
    key: "id" | "title" | "description" | "liveUrl" | "githubUrl" | "gradient",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === index ? { ...project, [key]: value } : project
      ),
    }));
  };

  const updateProjectTags = (index: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === index
          ? { ...project, tags: value.split(",").map((item) => item.trim()).filter(Boolean) }
          : project
      ),
    }));
  };

  const updateProjectOutcomes = (index: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === index
          ? { ...project, outcomes: value.split(",").map((item) => item.trim()).filter(Boolean) }
          : project
      ),
    }));
  };

  const updateProjectFeatured = (index: number, value: boolean) => {
    setContent((prev) => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === index ? { ...project, featured: value } : project
      ),
    }));
  };

  const addProject = () => {
    setContent((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: "new-project",
          title: "New Project",
          description: "Describe the project here.",
          tags: [],
          outcomes: [],
          liveUrl: "#",
          githubUrl: "#",
          gradient: "from-zinc-900 to-zinc-800",
          featured: false,
        },
      ],
    }));
  };

  const removeProject = (index: number) => {
    setContent((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const updateCaseStudy = (
    index: number,
    key: "projectId" | "title" | "problem" | "solution" | "results",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      caseStudies: prev.caseStudies.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      ),
    }));
  };

  const updateCaseStudyList = (
    index: number,
    key: "process" | "metrics",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      caseStudies: prev.caseStudies.map((item, i) =>
        i === index
          ? {
              ...item,
              [key]:
                key === "process"
                  ? value.split("\n").map((row) => row.trim()).filter(Boolean)
                  : value
                      .split("\n")
                      .map((row) => row.trim())
                      .filter(Boolean)
                      .map((row) => {
                        const [label, metricValue] = row.split("|").map((part) => part.trim());
                        return { label: label || "Metric", value: metricValue || "" };
                      }),
            }
          : item
      ),
    }));
  };

  const addCaseStudy = () => {
    setContent((prev) => ({
      ...prev,
      caseStudies: [
        ...prev.caseStudies,
        {
          projectId: "new-project",
          title: "New Case Study",
          problem: "Problem statement.",
          solution: "Solution statement.",
          process: [],
          results: "Results summary.",
          metrics: [],
        },
      ],
    }));
  };

  const removeCaseStudy = (index: number) => {
    setContent((prev) => ({
      ...prev,
      caseStudies: prev.caseStudies.filter((_, i) => i !== index),
    }));
  };

  const updateService = (
    index: number,
    key: "icon" | "title" | "description",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    }));
  };

  const addService = () => {
    setContent((prev) => ({
      ...prev,
      services: [...prev.services, { icon: "Globe", title: "New Service", description: "" }],
    }));
  };

  const removeService = (index: number) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
  };

  const updateExperience = (
    index: number,
    key: "period" | "role" | "company" | "description",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      experience: prev.experience.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    }));
  };

  const updateExperienceHighlights = (index: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      experience: prev.experience.map((item, i) =>
        i === index
          ? {
              ...item,
              highlights: value.split(",").map((part) => part.trim()).filter(Boolean),
            }
          : item
      ),
    }));
  };

  const addExperience = () => {
    setContent((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          period: "2025 – Present",
          role: "New Role",
          company: "Company",
          description: "Describe the role.",
          highlights: [],
        },
      ],
    }));
  };

  const removeExperience = (index: number) => {
    setContent((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const updateTestimonial = (
    index: number,
    key: "name" | "role" | "company" | "avatar" | "quote",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      ),
    }));
  };

  const addTestimonial = () => {
    setContent((prev) => ({
      ...prev,
      testimonials: [
        ...prev.testimonials,
        {
          name: "New Person",
          role: "Role",
          company: "Company",
          avatar: "NP",
          quote: "Testimonial quote.",
        },
      ],
    }));
  };

  const removeTestimonial = (index: number) => {
    setContent((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index),
    }));
  };

  const updateBlog = (
    index: number,
    key: "title" | "excerpt" | "date" | "readTime" | "url",
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      blogs: prev.blogs.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    }));
  };

  const updateBlogTags = (index: number, value: string) => {
    setContent((prev) => ({
      ...prev,
      blogs: prev.blogs.map((item, i) =>
        i === index
          ? { ...item, tags: value.split(",").map((part) => part.trim()).filter(Boolean) }
          : item
      ),
    }));
  };

  const addBlog = () => {
    setContent((prev) => ({
      ...prev,
      blogs: [
        ...prev.blogs,
        {
          title: "New article",
          excerpt: "Write the excerpt.",
          date: "January 2026",
          readTime: "5 min read",
          tags: [],
          url: "#",
        },
      ],
    }));
  };

  const removeBlog = (index: number) => {
    setContent((prev) => ({
      ...prev,
      blogs: prev.blogs.filter((_, i) => i !== index),
    }));
  };

  const saveContentToApi = async (nextContent: PortfolioContent) => {
    const auth = getFirebaseAuth();
    if (!auth?.currentUser) {
      throw new Error("Please sign in first.");
    }

    const token = await auth.currentUser.getIdToken();
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

    const savedContent = data.content as PortfolioContent;
    setContent(savedContent);
    return savedContent;
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
      await saveContentToApi(content);
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
    toast.success("Draft reset to defaults.");
  };

  const handleSignOut = async () => {
    const auth = getFirebaseAuth();
    if (!auth) return;
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
              Update every public section from one place. These fields map directly to the live portfolio.
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
                  {loadingContent ? "Loading current CMS content..." : "Edit the fields below and save to Firebase."}
                </p>
              </div>
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

                <div className="border-t border-[var(--border)] pt-4 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h4 className="font-display text-sm font-semibold">Resume PDF</h4>
                      <p className="text-xs text-[var(--ink-muted)]">Upload a PDF to Firebase Storage. This link is used by the homepage download button.</p>
                    </div>
                    <label className="btn-outline py-2 px-3 text-xs cursor-pointer">
                      {uploadingResume ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Plus size={12} />
                          Choose PDF
                        </>
                      )}
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={handleResumeUpload}
                        disabled={uploadingResume}
                      />
                    </label>
                  </div>
                  <Field
                    label="Resume URL"
                    value={content.siteConfig.resumeUrl}
                    onChange={(value) => updateSiteConfig("resumeUrl", value)}
                  />
                  <p className="text-xs text-[var(--ink-muted)] break-all">
                    Current file: {content.siteConfig.resumeUrl || "No resume uploaded yet."}
                  </p>
                </div>
              </div>

              <div className="card p-6 space-y-4">
                <h3 className="font-display text-lg font-semibold">About</h3>
                <div className="space-y-4">
                  <TextareaField label="Intro" value={content.about.intro} onChange={(value) => updateAbout("intro", value)} rows={4} />
                  <TextareaField label="Extended" value={content.about.extended} onChange={(value) => updateAbout("extended", value)} rows={4} />
                  <TextareaField label="Passion" value={content.about.passion} onChange={(value) => updateAbout("passion", value)} rows={4} />
                </div>

                <div className="border-t border-[var(--border)] pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-display text-sm font-semibold">Stats</h4>
                    <button type="button" onClick={addAboutStat} className="btn-outline py-2 px-3 text-xs">
                      <Plus size={12} />
                      Add stat
                    </button>
                  </div>
                  <div className="space-y-3">
                    {content.about.stats.map((stat, index) => (
                      <div key={`${stat.label}-${index}`} className="grid gap-3 md:grid-cols-[1.2fr_0.5fr_0.5fr_auto]">
                        <Field label="Label" value={stat.label} onChange={(value) => updateAboutStat(index, "label", value)} />
                        <Field label="Value" value={String(stat.value)} onChange={(value) => updateAboutStat(index, "value", value)} />
                        <Field label="Suffix" value={stat.suffix} onChange={(value) => updateAboutStat(index, "suffix", value)} />
                        <button
                          type="button"
                          onClick={() => removeAboutStat(index)}
                          className="btn-outline h-[48px] self-end justify-center px-3"
                          aria-label="Remove stat"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="card p-6 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-lg font-semibold">Tech Stack</h3>
                <button type="button" onClick={() => addStringArrayItem("techStack")} className="btn-outline py-2 px-3 text-xs">
                  <Plus size={12} />
                  Add item
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {content.techStack.map((item, index) => (
                  <div key={`${item}-${index}`} className="flex gap-2">
                    <Field label={`Item ${index + 1}`} value={item} onChange={(value) => updateStringArrayItem("techStack", index, value)} />
                    <button
                      type="button"
                      onClick={() => removeStringArrayItem("techStack", index)}
                      className="btn-outline h-[48px] self-end px-3"
                      aria-label="Remove tech item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <ArrayEditor title="Skills" onAdd={addSkill}>
              {content.skills.map((skill, index) => (
                <div key={`${skill.category}-${index}`} className="card p-4 space-y-3">
                  <div className="grid gap-3 md:grid-cols-[1.2fr_0.6fr_auto]">
                    <Field label="Category" value={skill.category} onChange={(value) => updateSkill(index, "category", value)} />
                    <Field label="Icon" value={skill.icon} onChange={(value) => updateSkill(index, "icon", value)} />
                    <button type="button" onClick={() => removeSkill(index)} className="btn-outline h-[48px] self-end px-3">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <Field
                    label="Items comma separated"
                    value={skill.items.join(", ")}
                    onChange={(value) => updateSkillItems(index, value)}
                  />
                </div>
              ))}
            </ArrayEditor>

            <ArrayEditor title="Projects" onAdd={addProject}>
              {content.projects.map((project, index) => (
                <div key={`${project.id}-${index}`} className="card p-5 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-xs text-[var(--ink-muted)] font-mono uppercase tracking-widest">
                      Project {index + 1}
                    </div>
                    <button type="button" onClick={() => removeProject(index)} className="btn-outline py-2 px-3 text-xs">
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <Field label="ID" value={project.id} onChange={(value) => updateProject(index, "id", value)} />
                    <Field label="Title" value={project.title} onChange={(value) => updateProject(index, "title", value)} />
                    <TextareaField className="lg:col-span-2" label="Description" value={project.description} onChange={(value) => updateProject(index, "description", value)} rows={4} />
                    <Field label="Live URL" value={project.liveUrl} onChange={(value) => updateProject(index, "liveUrl", value)} />
                    <Field label="GitHub URL" value={project.githubUrl} onChange={(value) => updateProject(index, "githubUrl", value)} />
                    <Field label="Gradient" value={project.gradient} onChange={(value) => updateProject(index, "gradient", value)} />
                  </div>
                  <Field label="Tags comma separated" value={project.tags.join(", ")} onChange={(value) => updateProjectTags(index, value)} />
                  <Field label="Outcomes comma separated" value={project.outcomes.join(", ")} onChange={(value) => updateProjectOutcomes(index, value)} />
                  <label className="inline-flex items-center gap-2 text-sm text-[var(--ink-secondary)]">
                    <input
                      type="checkbox"
                      checked={project.featured}
                      onChange={(e) => updateProjectFeatured(index, e.target.checked)}
                    />
                    Featured project
                  </label>
                </div>
              ))}
            </ArrayEditor>

            <ArrayEditor title="Case Studies" onAdd={addCaseStudy}>
              {content.caseStudies.map((cs, index) => (
                <div key={`${cs.projectId}-${index}`} className="card p-5 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-xs text-[var(--ink-muted)] font-mono uppercase tracking-widest">
                      Case Study {index + 1}
                    </div>
                    <button type="button" onClick={() => removeCaseStudy(index)} className="btn-outline py-2 px-3 text-xs">
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <Field label="Project ID" value={cs.projectId} onChange={(value) => updateCaseStudy(index, "projectId", value)} />
                    <Field label="Title" value={cs.title} onChange={(value) => updateCaseStudy(index, "title", value)} />
                    <TextareaField className="lg:col-span-2" label="Problem" value={cs.problem} onChange={(value) => updateCaseStudy(index, "problem", value)} rows={4} />
                    <TextareaField className="lg:col-span-2" label="Solution" value={cs.solution} onChange={(value) => updateCaseStudy(index, "solution", value)} rows={4} />
                    <TextareaField
                      className="lg:col-span-2"
                      label="Process - one step per line"
                      value={cs.process.join("\n")}
                      onChange={(value) => updateCaseStudyList(index, "process", value)}
                      rows={5}
                    />
                    <TextareaField className="lg:col-span-2" label="Results" value={cs.results} onChange={(value) => updateCaseStudy(index, "results", value)} rows={4} />
                    <TextareaField
                      className="lg:col-span-2"
                      label="Metrics - one per line as Label | Value"
                      value={cs.metrics.map((metric) => `${metric.label} | ${metric.value}`).join("\n")}
                      onChange={(value) => updateCaseStudyList(index, "metrics", value)}
                      rows={4}
                    />
                  </div>
                </div>
              ))}
            </ArrayEditor>

            <ArrayEditor title="Services" onAdd={addService}>
              {content.services.map((service, index) => (
                <div key={`${service.title}-${index}`} className="card p-5 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-xs text-[var(--ink-muted)] font-mono uppercase tracking-widest">
                      Service {index + 1}
                    </div>
                    <button type="button" onClick={() => removeService(index)} className="btn-outline py-2 px-3 text-xs">
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <Field label="Icon" value={service.icon} onChange={(value) => updateService(index, "icon", value)} />
                    <Field label="Title" value={service.title} onChange={(value) => updateService(index, "title", value)} />
                    <TextareaField className="lg:col-span-2" label="Description" value={service.description} onChange={(value) => updateService(index, "description", value)} rows={4} />
                  </div>
                </div>
              ))}
            </ArrayEditor>

            <ArrayEditor title="Experience" onAdd={addExperience}>
              {content.experience.map((item, index) => (
                <div key={`${item.role}-${index}`} className="card p-5 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-xs text-[var(--ink-muted)] font-mono uppercase tracking-widest">
                      Experience {index + 1}
                    </div>
                    <button type="button" onClick={() => removeExperience(index)} className="btn-outline py-2 px-3 text-xs">
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <Field label="Period" value={item.period} onChange={(value) => updateExperience(index, "period", value)} />
                    <Field label="Role" value={item.role} onChange={(value) => updateExperience(index, "role", value)} />
                    <Field label="Company" value={item.company} onChange={(value) => updateExperience(index, "company", value)} />
                    <TextareaField className="lg:col-span-2" label="Description" value={item.description} onChange={(value) => updateExperience(index, "description", value)} rows={4} />
                    <Field
                      className="lg:col-span-2"
                      label="Highlights comma separated"
                      value={item.highlights.join(", ")}
                      onChange={(value) => updateExperienceHighlights(index, value)}
                    />
                  </div>
                </div>
              ))}
            </ArrayEditor>

            <ArrayEditor title="Testimonials" onAdd={addTestimonial}>
              {content.testimonials.map((item, index) => (
                <div key={`${item.name}-${index}`} className="card p-5 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-xs text-[var(--ink-muted)] font-mono uppercase tracking-widest">
                      Testimonial {index + 1}
                    </div>
                    <button type="button" onClick={() => removeTestimonial(index)} className="btn-outline py-2 px-3 text-xs">
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <Field label="Name" value={item.name} onChange={(value) => updateTestimonial(index, "name", value)} />
                    <Field label="Role" value={item.role} onChange={(value) => updateTestimonial(index, "role", value)} />
                    <Field label="Company" value={item.company} onChange={(value) => updateTestimonial(index, "company", value)} />
                    <Field label="Avatar" value={item.avatar} onChange={(value) => updateTestimonial(index, "avatar", value)} />
                    <TextareaField className="lg:col-span-2" label="Quote" value={item.quote} onChange={(value) => updateTestimonial(index, "quote", value)} rows={4} />
                  </div>
                </div>
              ))}
            </ArrayEditor>

            <ArrayEditor title="Blogs" onAdd={addBlog}>
              {content.blogs.map((item, index) => (
                <div key={`${item.title}-${index}`} className="card p-5 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-xs text-[var(--ink-muted)] font-mono uppercase tracking-widest">
                      Blog {index + 1}
                    </div>
                    <button type="button" onClick={() => removeBlog(index)} className="btn-outline py-2 px-3 text-xs">
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <Field label="Title" value={item.title} onChange={(value) => updateBlog(index, "title", value)} />
                    <Field label="Date" value={item.date} onChange={(value) => updateBlog(index, "date", value)} />
                    <Field label="Read Time" value={item.readTime} onChange={(value) => updateBlog(index, "readTime", value)} />
                    <Field label="URL" value={item.url} onChange={(value) => updateBlog(index, "url", value)} />
                    <TextareaField className="lg:col-span-2" label="Excerpt" value={item.excerpt} onChange={(value) => updateBlog(index, "excerpt", value)} rows={4} />
                    <Field className="lg:col-span-2" label="Tags comma separated" value={item.tags.join(", ")} onChange={(value) => updateBlogTags(index, value)} />
                  </div>
                </div>
              ))}
            </ArrayEditor>
          </div>
        )}
      </div>
    </main>
  );
}

function ArrayEditor({
  title,
  onAdd,
  children,
}: {
  title: string;
  onAdd: () => void;
  children: ReactNode;
}) {
  return (
    <section className="card p-6 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        <button type="button" onClick={onAdd} className="btn-outline py-2 px-3 text-xs">
          <Plus size={12} />
          Add item
        </button>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
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
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="text-xs font-medium text-[var(--ink-muted)] mb-1.5 block">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--ink)] text-sm resize-y"
      />
    </label>
  );
}
