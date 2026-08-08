import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProjects } from "@/lib/api";
import ProjectCard from "@/components/ProjectCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Projects",
};

export default async function AllProjectsPage() {
  let projects: Awaited<ReturnType<typeof getProjects>>["projects"] = [];
  let failedToLoad = false;

  try {
    const data = await getProjects();
    projects = data.projects;
  } catch {
    failedToLoad = true;
  }

  return (
    <section className="px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-sm text-mint transition hover:gap-3"
        >
          <ArrowLeft size={16} />
          back to home
        </Link>

        <p className="path-label mb-3 mt-8">projects/all</p>
        <h1 className="mb-10 text-3xl font-bold text-paper sm:text-4xl">All Projects</h1>

        {failedToLoad && (
          <p className="rounded-lg border border-surface-border bg-surface px-5 py-4 text-sm text-paper-dim">
            Couldn't reach the API right now. Make sure the server is running and
            <code className="mx-1 rounded bg-ink px-1.5 py-0.5 font-mono text-xs text-amber">
              NEXT_PUBLIC_API_URL
            </code>
            is set correctly.
          </p>
        )}

        {!failedToLoad && projects.length === 0 && (
          <p className="rounded-lg border border-surface-border bg-surface px-5 py-4 text-sm text-paper-dim">
            No projects yet — add your first one from{" "}
            <Link href="/admin" className="text-mint underline underline-offset-2">
              /admin
            </Link>
            .
          </p>
        )}

        {projects.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
