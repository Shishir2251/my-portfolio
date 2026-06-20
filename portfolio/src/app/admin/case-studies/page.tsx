"use client";

import { useAdmin } from "@/lib/admin-context";
import { Field, TextareaField, ArrayEditor, RemoveButton } from "@/app/admin/_components";

export default function CaseStudiesPage() {
  const { content, setContent } = useAdmin();

  const updateCS = (index: number, key: "projectId" | "title" | "problem" | "solution" | "results", value: string) => {
    setContent({
      ...content,
      caseStudies: content.caseStudies.map((cs, i) => (i === index ? { ...cs, [key]: value } : cs)),
    });
  };

  const updateProcess = (index: number, value: string) => {
    setContent({
      ...content,
      caseStudies: content.caseStudies.map((cs, i) =>
        i === index ? { ...cs, process: value.split("\n").map((r) => r.trim()).filter(Boolean) } : cs
      ),
    });
  };

  const updateMetrics = (index: number, value: string) => {
    setContent({
      ...content,
      caseStudies: content.caseStudies.map((cs, i) =>
        i === index
          ? {
              ...cs,
              metrics: value
                .split("\n")
                .map((row) => row.trim())
                .filter(Boolean)
                .map((row) => {
                  const [label, metricValue] = row.split("|").map((p) => p.trim());
                  return { label: label || "Metric", value: metricValue || "" };
                }),
            }
          : cs
      ),
    });
  };

  const addCS = () => {
    setContent({
      ...content,
      caseStudies: [
        ...content.caseStudies,
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
    });
  };

  const removeCS = (index: number) => {
    setContent({ ...content, caseStudies: content.caseStudies.filter((_, i) => i !== index) });
  };

  return (
    <>
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Case Studies</h1>
        <p className="text-sm text-[var(--ink-muted)] mt-1">Deep-dive project analyses with problem, solution, process, results.</p>
      </div>

      <ArrayEditor title="Case Studies" onAdd={addCS}>
        {content.caseStudies.map((cs, index) => (
          <div key={index} className="card p-5 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="text-xs text-[var(--ink-muted)] font-mono uppercase tracking-widest">
                Case Study {index + 1}
              </div>
              <RemoveButton onClick={() => removeCS(index)} />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Project ID" value={cs.projectId} onChange={(v) => updateCS(index, "projectId", v)} />
              <Field label="Title" value={cs.title} onChange={(v) => updateCS(index, "title", v)} />
              <TextareaField className="lg:col-span-2" label="Problem" value={cs.problem} onChange={(v) => updateCS(index, "problem", v)} rows={4} />
              <TextareaField className="lg:col-span-2" label="Solution" value={cs.solution} onChange={(v) => updateCS(index, "solution", v)} rows={4} />
              <TextareaField className="lg:col-span-2" label="Process (one step per line)" value={cs.process.join("\n")} onChange={(v) => updateProcess(index, v)} rows={5} />
              <TextareaField className="lg:col-span-2" label="Results" value={cs.results} onChange={(v) => updateCS(index, "results", v)} rows={4} />
              <TextareaField
                className="lg:col-span-2"
                label="Metrics (one per line as Label | Value)"
                value={cs.metrics.map((m) => `${m.label} | ${m.value}`).join("\n")}
                onChange={(v) => updateMetrics(index, v)}
                rows={4}
              />
            </div>
          </div>
        ))}
      </ArrayEditor>
    </>
  );
}