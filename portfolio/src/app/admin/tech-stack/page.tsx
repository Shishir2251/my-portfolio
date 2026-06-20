"use client";

import { useAdmin } from "@/lib/admin-context";
import { Field, RemoveButton } from "@/app/admin/_components";
import { Plus } from "lucide-react";

export default function TechStackPage() {
  const { content, setContent } = useAdmin();

  const updateItem = (index: number, value: string) => {
    setContent({
      ...content,
      techStack: content.techStack.map((item, i) => (i === index ? value : item)),
    });
  };

  const addItem = () => {
    setContent({ ...content, techStack: [...content.techStack, ""] });
  };

  const removeItem = (index: number) => {
    setContent({ ...content, techStack: content.techStack.filter((_, i) => i !== index) });
  };

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Tech Stack</h1>
        <p className="text-sm text-[var(--ink-muted)] mt-1">Flat list of technologies used.</p>
      </div>

      <div className="card p-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-lg font-semibold">Items</h2>
          <button type="button" onClick={addItem} className="btn-outline py-2 px-3 text-xs">
            <Plus size={12} />
            Add item
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {content.techStack.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Field label={`#${index + 1}`} value={item} onChange={(v) => updateItem(index, v)} />
              <RemoveButton onClick={() => removeItem(index)} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}