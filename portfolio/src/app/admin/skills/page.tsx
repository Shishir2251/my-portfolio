"use client";

import { useAdmin } from "@/lib/admin-context";
import { Field, ArrayEditor, RemoveButton } from "@/app/admin/_components";

export default function SkillsPage() {
  const { content, setContent } = useAdmin();

  const updateSkill = (index: number, key: "category" | "icon", value: string) => {
    setContent({
      ...content,
      skills: content.skills.map((s, i) => (i === index ? { ...s, [key]: value } : s)),
    });
  };

  const updateSkillItems = (index: number, value: string) => {
    setContent({
      ...content,
      skills: content.skills.map((s, i) =>
        i === index ? { ...s, items: value.split(",").map((t) => t.trim()).filter(Boolean) } : s
      ),
    });
  };

  const addSkill = () => {
    setContent({
      ...content,
      skills: [...content.skills, { category: "New category", icon: "Code2", items: [] }],
    });
  };

  const removeSkill = (index: number) => {
    setContent({ ...content, skills: content.skills.filter((_, i) => i !== index) });
  };

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Skills</h1>
        <p className="text-sm text-[var(--ink-muted)] mt-1">Skill categories and their items.</p>
      </div>

      <ArrayEditor title="Skill groups" onAdd={addSkill}>
        {content.skills.map((skill, index) => (
          <div key={index} className="card p-4 space-y-3">
            <div className="grid gap-3 md:grid-cols-[1.2fr_0.6fr_auto]">
              <Field label="Category" value={skill.category} onChange={(v) => updateSkill(index, "category", v)} />
              <Field label="Icon name" value={skill.icon} onChange={(v) => updateSkill(index, "icon", v)} />
              <RemoveButton onClick={() => removeSkill(index)} />
            </div>
            <Field
              label="Items (comma separated)"
              value={skill.items.join(", ")}
              onChange={(v) => updateSkillItems(index, v)}
            />
          </div>
        ))}
      </ArrayEditor>
    </>
  );
}