"use client";

import { useAdmin } from "@/lib/admin-context";
import { Field, TextareaField, ArrayEditor, RemoveButton } from "@/app/admin/_components";

export default function BlogsPage() {
  const { content, setContent } = useAdmin();

  const updateBlog = (index: number, key: "title" | "excerpt" | "date" | "readTime" | "url", value: string) => {
    setContent({
      ...content,
      blogs: content.blogs.map((b, i) => (i === index ? { ...b, [key]: value } : b)),
    });
  };

  const updateTags = (index: number, value: string) => {
    setContent({
      ...content,
      blogs: content.blogs.map((b, i) =>
        i === index ? { ...b, tags: value.split(",").map((t) => t.trim()).filter(Boolean) } : b
      ),
    });
  };

  const addBlog = () => {
    setContent({
      ...content,
      blogs: [
        ...content.blogs,
        { title: "New article", excerpt: "Write the excerpt.", date: "January 2026", readTime: "5 min read", tags: [], url: "#" },
      ],
    });
  };

  const removeBlog = (index: number) => {
    setContent({ ...content, blogs: content.blogs.filter((_, i) => i !== index) });
  };

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Blogs</h1>
        <p className="text-sm text-[var(--ink-muted)] mt-1">Articles and writing samples.</p>
      </div>

      <ArrayEditor title="Blog posts" onAdd={addBlog}>
        {content.blogs.map((item, index) => (
          <div key={index} className="card p-5 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="text-xs text-[var(--ink-muted)] font-mono uppercase tracking-widest">
                Blog {index + 1}
              </div>
              <RemoveButton onClick={() => removeBlog(index)} />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Title" value={item.title} onChange={(v) => updateBlog(index, "title", v)} />
              <Field label="Date" value={item.date} onChange={(v) => updateBlog(index, "date", v)} />
              <Field label="Read time" value={item.readTime} onChange={(v) => updateBlog(index, "readTime", v)} />
              <Field label="URL" value={item.url} onChange={(v) => updateBlog(index, "url", v)} />
              <TextareaField className="lg:col-span-2" label="Excerpt" value={item.excerpt} onChange={(v) => updateBlog(index, "excerpt", v)} rows={4} />
              <Field className="lg:col-span-2" label="Tags (comma separated)" value={item.tags.join(", ")} onChange={(v) => updateTags(index, v)} />
            </div>
          </div>
        ))}
      </ArrayEditor>
    </>
  );
}