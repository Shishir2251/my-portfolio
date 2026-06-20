"use client";

import { Plus, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

/* ── Single-line text field ─────────────────────────────── */
export function Field({
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

/* ── Multi-line textarea ────────────────────────────────── */
export function TextareaField({
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

/* ── Section wrapper with Add button ────────────────────── */
export function ArrayEditor({
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

/* ── Remove button used inside array items ──────────────── */
export function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="btn-outline h-[48px] self-end px-3" aria-label="Remove item">
      <Trash2 size={14} />
    </button>
  );
}