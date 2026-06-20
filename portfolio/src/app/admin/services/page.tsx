"use client";

import { useAdmin } from "@/lib/admin-context";
import { Field, TextareaField, ArrayEditor, RemoveButton } from "@/app/admin/_components";

export default function ServicesPage() {
  const { content, setContent } = useAdmin();

  const updateService = (index: number, key: "icon" | "title" | "description", value: string) => {
    setContent({
      ...content,
      services: content.services.map((s, i) => (i === index ? { ...s, [key]: value } : s)),
    });
  };

  const addService = () => {
    setContent({
      ...content,
      services: [...content.services, { icon: "Globe", title: "New Service", description: "" }],
    });
  };

  const removeService = (index: number) => {
    setContent({ ...content, services: content.services.filter((_, i) => i !== index) });
  };

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Services</h1>
        <p className="text-sm text-[var(--ink-muted)] mt-1">What you offer to clients.</p>
      </div>

      <ArrayEditor title="Services" onAdd={addService}>
        {content.services.map((service, index) => (
          <div key={index} className="card p-5 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="text-xs text-[var(--ink-muted)] font-mono uppercase tracking-widest">
                Service {index + 1}
              </div>
              <RemoveButton onClick={() => removeService(index)} />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Icon name" value={service.icon} onChange={(v) => updateService(index, "icon", v)} />
              <Field label="Title" value={service.title} onChange={(v) => updateService(index, "title", v)} />
              <TextareaField className="lg:col-span-2" label="Description" value={service.description} onChange={(v) => updateService(index, "description", v)} rows={4} />
            </div>
          </div>
        ))}
      </ArrayEditor>
    </>
  );
}