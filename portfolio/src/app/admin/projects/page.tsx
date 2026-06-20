"use client";

import { useAdmin } from "@/lib/admin-context";
import { Field, TextareaField, ArrayEditor, RemoveButton } from "@/app/admin/_components";

export default function ProjectsPage() {
  const { content, setContent } = useAdmin();

  const updateProject = (index: number, key: "id" | "title" | "description" | "liveUrl" | "githubUrl" | "gradient", value: string) => {
    setContent({
      ...content,
      projects: content.projects.map((p, i) => (i === index ? { ...p, [key]: value } : p)),
    });
  };

  const updateTags = (index: number, value: string) => {
    setContent({
      ...content,
      projects: content.projects.map((p, i) =>
        i === index ? { ...p, tags: value.split(",").map((t) => t.trim()).filter(Boolean) } : p
      ),
    });
  };

  const updateOutcomes = (index: number, value: string) => {
    setContent({
      ...content,
      projects: content.projects.map((p, i) =>
        i === index ? { ...p, outcomes: value.split(",").map((t) => t.trim()).filter(Boolean) } : p
      ),
    });
  };

  const updateFeatured = (index: number, featured: boolean) => {
    setContent({
      ...content,
      projects: content.projects.map((p, i) => (i === index ? { ...p, featured } : p)),
    });
  };

  const addProject = () => {
    setContent({
      ...content,
      projects: [
        ...content.projects,
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
    });
  };

  const removeProject = (index: number) => {
    setContent({ ...content, projects: content.projects.filter((_, i) => i !== index) });
  };

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Projects</h1>
        <p className="text-sm text-[var(--ink-muted)] mt-1">Featured and non-featured projects.</p>
      </div>

      <ArrayEditor title="Projects" onAdd={addProject}>
        {content.projects.map((project, index) => (
          <div key={index} className="card p-5 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="text-xs text-[var(--ink-muted)] font-mono uppercase tracking-widest">
                Project {index + 1}
              </div>
              <RemoveButton onClick={() => removeProject(index)} />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="ID" value={project.id} onChange={(v) => updateProject(index, "id", v)} />
              <Field label="Title" value={project.title} onChange={(v) => updateProject(index, "title", v)} />
              <TextareaField className="lg:col-span-2" label="Description" value={project.description} onChange={(v) => updateProject(index, "description", v)} rows={4} />
              <Field label="Live URL" value={project.liveUrl} onChange={(v) => updateProject(index, "liveUrl", v)} />
              <Field label="GitHub URL" value={project.githubUrl} onChange={(v) => updateProject(index, "githubUrl", v)} />
              <Field label="Gradient" value={project.gradient} onChange={(v) => updateProject(index, "gradient", v)} />
            </div>
            <Field label="Tags (comma separated)" value={project.tags.join(", ")} onChange={(v) => updateTags(index, v)} />
            <Field label="Outcomes (comma separated)" value={project.outcomes.join(", ")} onChange={(v) => updateOutcomes(index, v)} />
            <label className="inline-flex items-center gap-2 text-sm text-[var(--ink-secondary)]">
              <input type="checkbox" checked={project.featured} onChange={(e) => updateFeatured(index, e.target.checked)} />
              Featured project
            </label>
          </div>
        ))}
      </ArrayEditor>
    </>
  );
}