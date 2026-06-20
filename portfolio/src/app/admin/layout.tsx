"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  User,
  Code2,
  Layers,
  FolderKanban,
  BookOpen,
  Briefcase,
  MessageSquare,
  FileText,
  Cpu,
  Loader2,
  LogOut,
  Save,
  RefreshCcw,
  Home,
} from "lucide-react";
import { useState } from "react";
import { AdminProvider, useAdmin } from "@/lib/admin-context";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/site-config", label: "Site Config", icon: Settings },
  { href: "/admin/about", label: "About", icon: User },
  { href: "/admin/skills", label: "Skills", icon: Code2 },
  { href: "/admin/tech-stack", label: "Tech Stack", icon: Cpu },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/case-studies", label: "Case Studies", icon: BookOpen },
  { href: "/admin/services", label: "Services", icon: Layers },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
];

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, authReady, loadingContent, saving, saveContent, resetContent, signOut } = useAdmin();

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--ink)] flex">
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-[var(--border)] bg-[var(--surface-secondary)] shrink-0">
        <div className="p-5 border-b border-[var(--border)]">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink-muted)] mb-1">CMS</p>
          <h2 className="font-display text-lg font-semibold tracking-tight">Control Room</h2>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                  isActive
                    ? "bg-[var(--ink)] text-[var(--surface)] font-medium"
                    : "text-[var(--ink-secondary)] hover:bg-[var(--surface)] hover:text-[var(--ink)]"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {user && (
          <div className="p-3 border-t border-[var(--border)] space-y-2">
            <div className="px-3 py-2 text-xs text-[var(--ink-muted)] truncate">{user.email}</div>
            <div className="flex gap-2">
              <button
                onClick={saveContent}
                disabled={saving || loadingContent}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[var(--ink)] text-[var(--surface)] text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                Save
              </button>
              <button
                onClick={signOut}
                className="flex items-center justify-center px-3 py-2 rounded-xl border border-[var(--border)] text-[var(--ink-muted)] hover:text-[var(--ink)] text-xs transition-colors"
              >
                <LogOut size={12} />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* ── Mobile top bar ──────────────────────────────────── */}
      <div className="flex flex-col flex-1 min-w-0">
        <header className="lg:hidden flex items-center justify-between gap-4 p-4 border-b border-[var(--border)] bg-[var(--surface-secondary)]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--ink-muted)]">CMS</p>
            <h2 className="font-display text-base font-semibold">Control Room</h2>
          </div>
          <div className="flex items-center gap-2">
            {user && (
              <>
                <button
                  onClick={saveContent}
                  disabled={saving || loadingContent}
                  className="btn-primary py-2 px-3 text-xs"
                >
                  {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                  Save
                </button>
                <button onClick={signOut} className="btn-outline py-2 px-3 text-xs">
                  <LogOut size={12} />
                </button>
              </>
            )}
          </div>
        </header>

        {/* ── Mobile nav scroll ──────────────────────────────── */}
        <nav className="lg:hidden flex overflow-x-auto gap-1 p-3 border-b border-[var(--border)] bg-[var(--surface-secondary)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-[var(--ink)] text-[var(--surface)] font-medium"
                    : "text-[var(--ink-secondary)] hover:bg-[var(--surface)]"
                }`}
              >
                <Icon size={14} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* ── Page content ──────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {!authReady ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 size={20} className="animate-spin text-[var(--ink-muted)]" />
            </div>
          ) : !user ? (
            <SignInGate />
          ) : loadingContent ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 size={20} className="animate-spin text-[var(--ink-muted)]" />
              <span className="ml-3 text-sm text-[var(--ink-muted)]">Loading CMS content...</span>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto space-y-6">
              {/* ── Desktop top bar ──────────────────────────── */}
              <div className="hidden lg:flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Link href="/" className="btn-outline py-2 px-3 text-xs">
                    <Home size={12} />
                    View site
                  </Link>
                  <button onClick={resetContent} className="btn-outline py-2 px-3 text-xs">
                    <RefreshCcw size={12} />
                    Reset
                  </button>
                </div>
              </div>
              {children}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function SignInGate() {
  const { signIn, loadingAuth, hasConfig } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="card p-8 space-y-6">
        <div>
          <h2 className="font-display text-2xl font-semibold mb-2">Sign in</h2>
          <p className="text-sm text-[var(--ink-muted)]">
            Use your Firebase Auth admin account to access the dashboard.
          </p>
        </div>

        {!hasConfig && (
          <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-900 dark:text-amber-200">
            Firebase client env vars are missing. Add them first, then sign in here.
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn(email, password);
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-xs font-medium text-[var(--ink-muted)] mb-1.5 block">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--ink)]"
              placeholder="admin@yourdomain.com"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--ink-muted)] mb-1.5 block">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--ink)]"
              placeholder="Your Firebase Auth password"
            />
          </div>
          <button type="submit" disabled={loadingAuth || !hasConfig} className="btn-primary w-full justify-center">
            {loadingAuth ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  );
}