import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { getProjects } from "@/lib/api";
import type { Project } from "@/lib/types";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { ProjectsGridSkeleton } from "@/components/Skeletons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Projects",
};

async function AllProjects() {
  let projects: Project[] = [];
  let failedToLoad = false;

  try {
    projects = (await getProjects()).projects;
  } catch {
    failedToLoad = true;
  }

  if (failedToLoad) {
    return (
      <p className="rounded-lg border border-surface-border bg-surface px-5 py-4 text-sm text-paper-dim">
        Couldn&apos;t reach the API right now. Make sure the server is running and
        <code className="mx-1 rounded-sm bg-ink px-1.5 py-0.5 font-mono text-xs text-amber">
          NEXT_PUBLIC_API_URL
        </code>
        is set correctly.
      </p>
    );
  }

  if (projects.length === 0) {
    return (
      <p className="rounded-lg border border-surface-border bg-surface px-5 py-4 text-sm text-paper-dim">
        No projects yet — add your first one from{" "}
        <Link href="/admin" className="text-mint underline underline-offset-2">
          /admin
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        // stagger within each row of three so far-down cards don't wait seconds
        <Reveal key={project.id} delay={(i % 3) * 110} className="h-full">
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  );
}

export default function AllProjectsPage() {
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

        <p className="path-label mt-8 mb-3">projects/all</p>
        <h1 className="mb-10 text-3xl font-bold text-paper sm:text-4xl">All Projects</h1>

        {/* The heading shows instantly; the grid streams in when the API responds. */}
        <Suspense fallback={<ProjectsGridSkeleton count={6} />}>
          <AllProjects />
        </Suspense>
      </div>
    </section>
  );
}
