"use client";

import { useState } from "react";
import { Trash2, Loader2, ExternalLink } from "lucide-react";
import { deleteProject } from "@/lib/api";
import { Project } from "@/lib/types";

export default function ProjectList({
  projects,
  token,
  onDeleted,
}: {
  projects: Project[];
  token: string;
  onDeleted: (id: string) => void;
}) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Delete "${name}"? This can't be undone.`)) return;
    setError(null);
    setDeletingId(id);
    try {
      await deleteProject(id, token);
      onDeleted(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project.");
    } finally {
      setDeletingId(null);
    }
  }

  if (projects.length === 0) {
    return (
      <p className="rounded-lg border border-surface-border bg-surface px-5 py-4 text-sm text-paper-dim">
        No projects yet. Add your first one above.
      </p>
    );
  }

  return (
    <div>
      {error && <p className="mb-3 text-sm text-red-400">{error}</p>}
      <div className="space-y-3">
        {projects.map((p) => (
          <div
            key={p.id}
            className="flex flex-col gap-3 rounded-lg border border-surface-border bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-paper">{p.name}</p>
              <p className="mt-0.5 font-mono text-xs text-paper-faint">/{p.slug}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={`/projects/${p.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-surface-border px-3 py-1.5 text-xs text-paper-dim transition hover:border-mint hover:text-mint"
              >
                <ExternalLink size={13} />
                View
              </a>
              <button
                onClick={() => handleDelete(p.id, p.name)}
                disabled={deletingId === p.id}
                className="inline-flex items-center gap-1.5 rounded-md border border-surface-border px-3 py-1.5 text-xs text-paper-dim transition hover:border-red-400 hover:text-red-400 disabled:opacity-60"
              >
                {deletingId === p.id ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <Trash2 size={13} />
                )}
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
