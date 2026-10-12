"use client";

import { useState, type SubmitEvent } from "react";
import { Loader2, Plus, Save } from "lucide-react";
import { createProject, updateProject } from "@/lib/api";
import type { Project } from "@/lib/types";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const emptyForm = {
  name: "",
  slug: "",
  image: "/images/project-1.svg",
  summary: "",
  description: "",
  stack: "",
  liveUrl: "",
  clientGithubUrl: "",
  serverGithubUrl: "",
  challenges: "",
  improvements: "",
  order: "",
};

type FormState = typeof emptyForm;

function formFromProject(project: Project): FormState {
  return {
    name: project.name,
    slug: project.slug,
    image: project.image,
    summary: project.summary,
    description: project.description,
    stack: project.stack.join(", "),
    liveUrl: project.liveUrl ?? "",
    clientGithubUrl: project.clientGithubUrl ?? "",
    serverGithubUrl: project.serverGithubUrl ?? "",
    challenges: project.challenges,
    improvements: project.improvements,
    order: String(project.order ?? ""),
  };
}

const inputClass =
  "w-full rounded-md border border-surface-border bg-ink px-3 py-2.5 text-sm text-paper outline-hidden focus:border-mint";
const labelClass = "mb-1.5 block font-mono text-xs text-paper-faint";

export default function ProjectForm({
  token,
  project,
  onSaved,
  onCancel,
}: {
  token: string;
  /** pass an existing project to edit it; omit to create a new one */
  project?: Project;
  onSaved: (project: Project) => void;
  onCancel?: () => void;
}) {
  const isEditing = project !== undefined;

  const [form, setForm] = useState<FormState>(
    project ? formFromProject(project) : emptyForm,
  );
  const [slugTouched, setSlugTouched] = useState(isEditing); // don't auto-slugify while editing
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === "name" && !slugTouched) next.slug = slugify(value);
      return next;
    });
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        slug: form.slug,
        image: form.image,
        summary: form.summary,
        description: form.description,
        stack: form.stack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        // when editing, send "" so a cleared URL is actually cleared on the server
        liveUrl: form.liveUrl || (isEditing ? "" : undefined),
        clientGithubUrl: form.clientGithubUrl || (isEditing ? "" : undefined),
        serverGithubUrl: form.serverGithubUrl || (isEditing ? "" : undefined),
        challenges: form.challenges,
        improvements: form.improvements,
        order: form.order ? Number(form.order) : undefined,
      };

      const saved = isEditing
        ? await updateProject(project.id, payload, token)
        : await createProject(payload, token);

      onSaved(saved);

      if (!isEditing) {
        setForm(emptyForm);
        setSlugTouched(false);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Failed to ${isEditing ? "update" : "create"} project.`,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-surface-border bg-surface p-6"
    >
      <h2 className="mb-5 text-base font-semibold text-paper">
        {isEditing ? `Edit “${project.name}”` : "Add a new project"}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>project name</label>
          <input
            className={inputClass}
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="TaskFlow — Team Task Manager"
          />
        </div>
        <div>
          <label className={labelClass}>slug (url)</label>
          <input
            className={inputClass}
            required
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              update("slug", slugify(e.target.value));
            }}
            placeholder="taskflow"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className={labelClass}>
          image path or URL (local files go in client/public/images)
        </label>
        <input
          className={inputClass}
          required
          value={form.image}
          onChange={(e) => update("image", e.target.value)}
          placeholder="/images/my-project.png"
        />
      </div>

      <div className="mt-4">
        <label className={labelClass}>short summary (shown on cards)</label>
        <input
          className={inputClass}
          required
          maxLength={300}
          value={form.summary}
          onChange={(e) => update("summary", e.target.value)}
          placeholder="A Kanban-style task manager with real-time collaboration."
        />
      </div>

      <div className="mt-4">
        <label className={labelClass}>
          full description — one point per line (each line becomes a bullet)
        </label>
        <textarea
          className={`${inputClass} min-h-[90px] resize-y`}
          required
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>tech stack (comma separated)</label>
          <input
            className={inputClass}
            required
            value={form.stack}
            onChange={(e) => update("stack", e.target.value)}
            placeholder="Next.js, TypeScript, Prisma, PostgreSQL"
          />
        </div>
        <div>
          <label className={labelClass}>
            display order (optional, lower = earlier)
          </label>
          <input
            type="number"
            className={inputClass}
            value={form.order}
            onChange={(e) => update("order", e.target.value)}
            placeholder="0"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className={labelClass}>live project URL (optional)</label>
        <input
          className={inputClass}
          value={form.liveUrl}
          onChange={(e) => update("liveUrl", e.target.value)}
          placeholder="https://example.com"
        />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>client GitHub repo</label>
          <input
            className={inputClass}
            value={form.clientGithubUrl}
            onChange={(e) => update("clientGithubUrl", e.target.value)}
            placeholder="https://github.com/you/project-client"
          />
        </div>
        <div>
          <label className={labelClass}>server GitHub repo</label>
          <input
            className={inputClass}
            value={form.serverGithubUrl}
            onChange={(e) => update("serverGithubUrl", e.target.value)}
            placeholder="https://github.com/you/project-server"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className={labelClass}>
          challenges faced — one point per line
        </label>
        <textarea
          className={`${inputClass} min-h-[120px] resize-y`}
          placeholder={
            "Landlords can list and manage properties\nTenants can browse, request and pay via Stripe\nAdmins moderate users and listings"
          }
          required
          value={form.challenges}
          onChange={(e) => update("challenges", e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className={labelClass}>
          potential improvements / future plans — one point per line
        </label>
        <textarea
          className={`${inputClass} min-h-[120px] resize-y`}
          placeholder={
            "Landlords can list and manage properties\nTenants can browse, request and pay via Stripe\nAdmins moderate users and listings"
          }
          required
          value={form.improvements}
          onChange={(e) => update("improvements", e.target.value)}
        />
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <div className="mt-5 flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-md bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110 disabled:opacity-60"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : isEditing ? (
            <Save size={16} />
          ) : (
            <Plus size={16} />
          )}
          {isEditing ? "Save changes" : "Add project"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-md border border-surface-border px-5 py-2.5 text-sm text-paper-dim transition hover:border-mint hover:text-mint disabled:opacity-60"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
