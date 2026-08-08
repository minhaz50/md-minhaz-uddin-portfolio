"use client";

import { useEffect, useState } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { getProjects } from "@/lib/api";
import { Project } from "@/lib/types";
import LoginForm from "@/components/admin/LoginForm";
import ProjectForm from "@/components/admin/ProjectForm";
import ProjectList from "@/components/admin/ProjectList";

const TOKEN_KEY = "portfolio_admin_token";

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [checkedStorage, setCheckedStorage] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    setToken(window.localStorage.getItem(TOKEN_KEY));
    setCheckedStorage(true);
  }, []);

  useEffect(() => {
    if (!token) return;
    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function loadProjects() {
    setLoadingProjects(true);
    setLoadError(null);
    try {
      const data = await getProjects();
      setProjects(data.projects);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load projects.");
    } finally {
      setLoadingProjects(false);
    }
  }

  function handleLoginSuccess(newToken: string) {
    window.localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  }

  function handleLogout() {
    window.localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setProjects([]);
  }

  if (!checkedStorage) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="animate-spin text-paper-faint" size={24} />
      </div>
    );
  }

  if (!token) {
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
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-md border border-surface-border px-3 py-2 text-sm text-paper-dim transition hover:border-mint hover:text-mint"
          >
            <LogOut size={15} />
            Log out
          </button>
        </div>

        <div className="mt-10">
          <ProjectForm
            token={token}
            onCreated={(project) => setProjects((prev) => [project, ...prev])}
          />
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-base font-semibold text-paper">
            Existing projects ({projects.length})
          </h2>
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
              onDeleted={(id) => setProjects((prev) => prev.filter((p) => p.id !== id))}
            />
          )}
        </div>
      </div>
    </section>
  );
}
