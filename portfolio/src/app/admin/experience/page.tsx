"use client";

import { useAdmin } from "@/lib/admin-context";
import { Field, TextareaField, ArrayEditor, RemoveButton } from "@/app/admin/_components";

export default function ExperiencePage() {
  const { content, setContent } = useAdmin();

  const updateExp = (index: number, key: "period" | "role" | "company" | "description", value: string) => {
    setContent({
      ...content,
      experience: content.experience.map((e, i) => (i === index ? { ...e, [key]: value } : e)),
    });
  };

  const updateHighlights = (index: number, value: string) => {
    setContent({
      ...content,
      experience: content.experience.map((e, i) =>
        i === index ? { ...e, highlights: value.split(",").map((h) => h.trim()).filter(Boolean) } : e
      ),
    });
  };

  const addExp = () => {
    setContent({
      ...content,
      experience: [
        ...content.experience,
        { period: "2025 – Present", role: "New Role", company: "Company", description: "Describe the role.", highlights: [] },
      ],
    });
  };

  const removeExp = (index: number) => {
    setContent({ ...content, experience: content.experience.filter((_, i) => i !== index) });
  };

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Experience</h1>
        <p className="text-sm text-[var(--ink-muted)] mt-1">Career timeline and roles.</p>
      </div>

      <ArrayEditor title="Experience entries" onAdd={addExp}>
        {content.experience.map((item, index) => (
          <div key={index} className="card p-5 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="text-xs text-[var(--ink-muted)] font-mono uppercase tracking-widest">
                Experience {index + 1}
              </div>
              <RemoveButton onClick={() => removeExp(index)} />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Period" value={item.period} onChange={(v) => updateExp(index, "period", v)} />
              <Field label="Role" value={item.role} onChange={(v) => updateExp(index, "role", v)} />
              <Field label="Company" value={item.company} onChange={(v) => updateExp(index, "company", v)} />
              <TextareaField className="lg:col-span-2" label="Description" value={item.description} onChange={(v) => updateExp(index, "description", v)} rows={4} />
              <Field className="lg:col-span-2" label="Highlights (comma separated)" value={item.highlights.join(", ")} onChange={(v) => updateHighlights(index, v)} />
            </div>
          </div>
        ))}
      </ArrayEditor>
    </>
  );
}