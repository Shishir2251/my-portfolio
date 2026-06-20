"use client";

import { useAdmin } from "@/lib/admin-context";
import { Field, TextareaField, ArrayEditor, RemoveButton } from "@/app/admin/_components";

export default function TestimonialsPage() {
  const { content, setContent } = useAdmin();

  const updateTestimonial = (index: number, key: "name" | "role" | "company" | "avatar" | "quote", value: string) => {
    setContent({
      ...content,
      testimonials: content.testimonials.map((t, i) => (i === index ? { ...t, [key]: value } : t)),
    });
  };

  const addTestimonial = () => {
    setContent({
      ...content,
      testimonials: [
        ...content.testimonials,
        { name: "New Person", role: "Role", company: "Company", avatar: "NP", quote: "Testimonial quote." },
      ],
    });
  };

  const removeTestimonial = (index: number) => {
    setContent({ ...content, testimonials: content.testimonials.filter((_, i) => i !== index) });
  };

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Testimonials</h1>
        <p className="text-sm text-[var(--ink-muted)] mt-1">Client / peer quotes and reviews.</p>
      </div>

      <ArrayEditor title="Testimonials" onAdd={addTestimonial}>
        {content.testimonials.map((item, index) => (
          <div key={index} className="card p-5 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="text-xs text-[var(--ink-muted)] font-mono uppercase tracking-widest">
                Testimonial {index + 1}
              </div>
              <RemoveButton onClick={() => removeTestimonial(index)} />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Name" value={item.name} onChange={(v) => updateTestimonial(index, "name", v)} />
              <Field label="Role" value={item.role} onChange={(v) => updateTestimonial(index, "role", v)} />
              <Field label="Company" value={item.company} onChange={(v) => updateTestimonial(index, "company", v)} />
              <Field label="Avatar initials" value={item.avatar} onChange={(v) => updateTestimonial(index, "avatar", v)} />
              <TextareaField className="lg:col-span-2" label="Quote" value={item.quote} onChange={(v) => updateTestimonial(index, "quote", v)} rows={4} />
            </div>
          </div>
        ))}
      </ArrayEditor>
    </>
  );
}