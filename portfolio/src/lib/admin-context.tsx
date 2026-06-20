"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { toast } from "sonner";
import { getFirebaseAuth, hasClientFirebaseConfig } from "@/lib/firebase/client";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/content";

interface AdminContextValue {
  /** Whether Firebase Auth has finished initialising */
  authReady: boolean;
  /** The signed-in Firebase user, or null */
  user: User | null;
  /** True while a sign-in request is in flight */
  loadingAuth: boolean;
  /** True while CMS content is being fetched from the API */
  loadingContent: boolean;
  /** True while a save request is in flight */
  saving: boolean;
  /** The current CMS content (draft or server copy) */
  content: PortfolioContent;
  /** Whether the Firebase client config exists */
  hasConfig: boolean;
  /** Sign in with email + password */
  signIn: (email: string, password: string) => Promise<void>;
  /** Sign out */
  signOut: () => Promise<void>;
  /** Replace the entire content state */
  setContent: (c: PortfolioContent) => void;
  /** Persist the current content to the API */
  saveContent: () => Promise<void>;
  /** Reset the draft to the hard-coded defaults */
  resetContent: () => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<PortfolioContent>(defaultPortfolioContent);

  /* ── Listen for auth state ─────────────────────────────── */
  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setAuthReady(true);
      return;
    }

    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
      if (!currentUser) return;

      setLoadingContent(true);
      try {
        const token = await currentUser.getIdToken();
        const res = await fetch("/api/content", {
          cache: "no-store",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setContent((data.content ?? defaultPortfolioContent) as PortfolioContent);
      } catch {
        toast.error("Could not load CMS content.");
      } finally {
        setLoadingContent(false);
      }
    });

    return () => unsub();
  }, []);

  /* ── Save content to API ────────────────────────────────── */
  const saveContent = async () => {
    const auth = getFirebaseAuth();
    if (!auth?.currentUser) {
      toast.error("Please sign in first.");
      return;
    }

    setSaving(true);
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed.");
      setContent(data.content as PortfolioContent);
      toast.success("CMS content updated.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Save failed.";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  /* ── Sign in ────────────────────────────────────────────── */
  const signIn = async (email: string, password: string) => {
    const auth = getFirebaseAuth();
    if (!auth) {
      toast.error("Firebase client config is missing.");
      return;
    }

    setLoadingAuth(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Signed in successfully.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Sign in failed.";
      toast.error(msg);
    } finally {
      setLoadingAuth(false);
    }
  };

  const resetContent = () => {
    setContent(defaultPortfolioContent);
    toast.success("Draft reset to defaults.");
  };

  return (
    <AdminContext.Provider
      value={{
        authReady,
        user,
        loadingAuth,
        loadingContent,
        saving,
        content,
        hasConfig: hasClientFirebaseConfig,
        signIn,
        signOut: async () => {
          const auth = getFirebaseAuth();
          if (!auth) return;
          await signOut(auth);
          toast.success("Signed out.");
        },
        setContent,
        saveContent,
        resetContent,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within <AdminProvider>");
  return ctx;
}