"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { Loader2, LogOut } from "lucide-react";
import { getProjects } from "@/lib/api";
import type { Project } from "@/lib/types";
import LoginForm from "@/components/admin/LoginForm";
import ProjectForm from "@/components/admin/ProjectForm";
import ProjectList from "@/components/admin/ProjectList";

// Lazy-loaded: the edit modal's code is only downloaded the first time you click "Edit".
const EditProjectModal = dynamic(() => import("@/components/admin/EditProjectModal"), { ssr: false });

const TOKEN_KEY = "portfolio_admin_token";
const TOKEN_EVENT = "portfolio-admin-token-change";

// The login token lives in localStorage. useSyncExternalStore lets React read it
// safely: `undefined` while the page is hydrating, then the stored token (or null).
function subscribeToToken(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(TOKEN_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(TOKEN_EVENT, onChange);
  };
}
const readToken = (): string | null | undefined => window.localStorage.getItem(TOKEN_KEY);
const readTokenOnServer = (): string | null | undefined => undefined;

export default function AdminPage() {
  const token = useSyncExternalStore(subscribeToToken, readToken, readTokenOnServer);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;
    getProjects()
      .then((data) => {
        if (!cancelled) setProjects(data.projects);
      })
      .catch((err: unknown) => {
        if (!cancelled) setLoadError(err instanceof Error ? err.message : "Failed to load projects.");
      })
      .finally(() => {
        if (!cancelled) setLoadingProjects(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token]);

  function handleLoginSuccess(newToken: string) {
    window.localStorage.setItem(TOKEN_KEY, newToken);
    window.dispatchEvent(new Event(TOKEN_EVENT));
  }

  function handleLogout() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.dispatchEvent(new Event(TOKEN_EVENT));
    setProjects([]);
    setLoadError(null);
    setLoadingProjects(true);
  }

  function handleProjectUpdated(updated: Project) {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  }

  if (token === undefined) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="animate-spin text-paper-faint" size={24} />
      </div>
    );
  }

  if (token === null) {
    return <LoginForm onSuccess={handleLoginSuccess} />;
  }

  return (
    <section className="px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="path-label mb-3">admin/dashboard</p>
            <h1 className="text-3xl font-bold text-paper sm:text-4xl">Manage Projects</h1>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-md border border-surface-border px-3 py-2 text-sm text-paper-dim transition hover:border-mint hover:text-mint"
          >
            <LogOut size={15} />
            Log out
          </button>
        </div>

        <div className="mt-10">
          <ProjectForm token={token} onSaved={(project) => setProjects((prev) => [project, ...prev])} />
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-base font-semibold text-paper">Existing projects ({projects.length})</h2>
          {loadingProjects && (
            <p className="flex items-center gap-2 text-sm text-paper-dim">
              <Loader2 size={15} className="animate-spin" />
              Loading projects…
            </p>
          )}
          {loadError && <p className="text-sm text-red-400">{loadError}</p>}
          {!loadingProjects && !loadError && (
            <ProjectList
              projects={projects}
              token={token}
              onEdit={setEditingProject}
              onDeleted={(id) => setProjects((prev) => prev.filter((p) => p.id !== id))}
            />
          )}
        </div>
      </div>

      {editingProject && (
        <EditProjectModal
          token={token}
          project={editingProject}
          onSaved={handleProjectUpdated}
          onClose={() => setEditingProject(null)}
        />
      )}
    </section>
  );
}
