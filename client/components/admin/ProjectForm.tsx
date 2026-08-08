"use client";

import { FormEvent, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { createProject } from "@/lib/api";
import { Project } from "@/lib/types";

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
  githubUrl: "",
  challenges: "",
  improvements: "",
  order: "",
};

const inputClass =
  "w-full rounded-md border border-surface-border bg-ink px-3 py-2.5 text-sm text-paper outline-none focus:border-mint";
const labelClass = "mb-1.5 block font-mono text-xs text-paper-faint";

export default function ProjectForm({
  token,
  onCreated,
}: {
  token: string;
  onCreated: (project: Project) => void;
}) {
  const [form, setForm] = useState(emptyForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function update<K extends keyof typeof emptyForm>(key: K, value: string) {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === "name" && !slugTouched) {
        next.slug = slugify(value);
      }
      return next;
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const project = await createProject(
        {
          name: form.name,
          slug: form.slug,
          image: form.image,
          summary: form.summary,
          description: form.description,
          stack: form.stack
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          liveUrl: form.liveUrl || undefined,
          githubUrl: form.githubUrl || undefined,
          challenges: form.challenges,
          improvements: form.improvements,
          order: form.order ? Number(form.order) : undefined,
        },
        token
      );
      onCreated(project);
      setForm(emptyForm);
      setSlugTouched(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-surface-border bg-surface p-6"
    >
      <h2 className="mb-5 text-base font-semibold text-paper">Add a new project</h2>

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
        <label className={labelClass}>image path (put file in client/public/images)</label>
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
        <label className={labelClass}>full description</label>
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
          <label className={labelClass}>display order (optional, lower = earlier)</label>
          <input
            type="number"
            className={inputClass}
            value={form.order}
            onChange={(e) => update("order", e.target.value)}
            placeholder="0"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>live project URL (optional)</label>
          <input
            className={inputClass}
            value={form.liveUrl}
            onChange={(e) => update("liveUrl", e.target.value)}
            placeholder="https://example.com"
          />
        </div>
        <div>
          <label className={labelClass}>GitHub repo URL (optional)</label>
          <input
            className={inputClass}
            value={form.githubUrl}
            onChange={(e) => update("githubUrl", e.target.value)}
            placeholder="https://github.com/you/taskflow"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className={labelClass}>challenges faced</label>
        <textarea
          className={`${inputClass} min-h-[80px] resize-y`}
          required
          value={form.challenges}
          onChange={(e) => update("challenges", e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className={labelClass}>potential improvements / future plans</label>
        <textarea
          className={`${inputClass} min-h-[80px] resize-y`}
          required
          value={form.improvements}
          onChange={(e) => update("improvements", e.target.value)}
        />
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 inline-flex items-center gap-2 rounded-md bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110 disabled:opacity-60"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
        Add project
      </button>
    </form>
  );
}
