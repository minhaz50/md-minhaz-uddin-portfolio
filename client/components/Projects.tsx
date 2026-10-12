import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProjects } from "@/lib/api";
import type { Project } from "@/lib/types";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";

export default async function Projects() {
  let projects: Project[] = [];
  let total = 0;
  let failedToLoad = false;

  try {
    const data = await getProjects(3);
    projects = data.projects;
    total = data.total;
  } catch {
    failedToLoad = true;
  }

  return (
    <section id="projects" className="border-t border-surface-border px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="path-label mb-3">projects</p>
          <h2 className="mb-10 text-2xl font-bold text-paper sm:text-3xl">Selected work</h2>
        </Reveal>

        {failedToLoad && (
          <p className="rounded-lg border border-surface-border bg-surface px-5 py-4 text-sm text-paper-dim">
            Couldn&apos;t reach the API right now. Make sure the server is running and
            <code className="mx-1 rounded-sm bg-ink px-1.5 py-0.5 font-mono text-xs text-amber">
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
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <Reveal key={project.id} delay={i * 110} className="h-full">
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>

            {total > projects.length && (
              <Reveal delay={150} variant="fade">
                <div className="mt-10 flex justify-center">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 rounded-md border border-surface-border px-5 py-2.5 text-sm font-semibold text-paper transition hover:border-mint hover:text-mint"
                  >
                    Show More Projects
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </Reveal>
            )}
          </>
        )}
      </div>
    </section>
  );
}
