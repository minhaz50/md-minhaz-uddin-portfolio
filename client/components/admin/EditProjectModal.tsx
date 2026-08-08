"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import ProjectForm from "@/components/admin/ProjectForm";
import { Project } from "@/lib/types";

export default function EditProjectModal({
  token,
  project,
  onSaved,
  onClose,
}: {
  token: string;
  project: Project;
  onSaved: (project: Project) => void;
  onClose: () => void;
}) {
  // close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink/80 px-4 py-10 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl">
        <div className="mb-3 flex justify-end">
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md border border-surface-border bg-surface p-2 text-paper-dim transition hover:border-mint hover:text-mint"
          >
            <X size={16} />
          </button>
        </div>
        <ProjectForm
          token={token}
          project={project}
          onSaved={(saved) => {
            onSaved(saved);
            onClose();
          }}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
