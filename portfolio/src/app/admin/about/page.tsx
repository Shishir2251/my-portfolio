"use client";

import { useAdmin } from "@/lib/admin-context";
import { Field, TextareaField, ArrayEditor, RemoveButton } from "@/app/admin/_components";

export default function AboutPage() {
  const { content, setContent } = useAdmin();

  const updateAbout = (key: "intro" | "extended" | "passion", value: string) => {
    setContent({ ...content, about: { ...content.about, [key]: value } });
  };

  const updateStat = (index: number, key: "label" | "value" | "suffix", value: string) => {
    setContent({
      ...content,
      about: {
        ...content.about,
        stats: content.about.stats.map((s, i) =>
          i === index ? { ...s, [key]: key === "value" ? Number(value) || 0 : value } : s
        ),
      },
    });
  };

  const addStat = () => {
    setContent({
      ...content,
      about: { ...content.about, stats: [...content.about.stats, { label: "New stat", value: 0, suffix: "" }] },
    });
  };

  const removeStat = (index: number) => {
    setContent({
      ...content,
      about: { ...content.about, stats: content.about.stats.filter((_, i) => i !== index) },
    });
  };

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">About</h1>
        <p className="text-sm text-[var(--ink-muted)] mt-1">Intro, extended bio, passion, and stats.</p>
      </div>

      <div className="card p-6 space-y-4">
        <h2 className="font-display text-lg font-semibold">Text sections</h2>
        <div className="space-y-4">
          <TextareaField label="Intro" value={content.about.intro} onChange={(v) => updateAbout("intro", v)} rows={4} />
          <TextareaField label="Extended" value={content.about.extended} onChange={(v) => updateAbout("extended", v)} rows={4} />
          <TextareaField label="Passion" value={content.about.passion} onChange={(v) => updateAbout("passion", v)} rows={4} />
        </div>
      </div>

      <ArrayEditor title="Stats" onAdd={addStat}>
        {content.about.stats.map((stat, index) => (
          <div key={index} className="card p-4">
            <div className="grid gap-3 md:grid-cols-[1.2fr_0.5fr_0.5fr_auto]">
              <Field label="Label" value={stat.label} onChange={(v) => updateStat(index, "label", v)} />
              <Field label="Value" value={String(stat.value)} onChange={(v) => updateStat(index, "value", v)} />
              <Field label="Suffix" value={stat.suffix} onChange={(v) => updateStat(index, "suffix", v)} />
              <RemoveButton onClick={() => removeStat(index)} />
            </div>
          </div>
        ))}
      </ArrayEditor>
    </>
  );
}