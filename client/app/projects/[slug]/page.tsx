import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, AlertTriangle, Lightbulb } from "lucide-react";
import { getProjectBySlug } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.name} — Project Details`,
    description: project.summary,
  };
}

export default async function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <article className="px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-sm text-mint transition hover:gap-3"
        >
          <ArrowLeft size={16} />
          back to projects
        </Link>

        <p className="path-label mb-3 mt-8">projects/{project.slug}</p>
        <h1 className="text-3xl font-bold text-paper sm:text-4xl">{project.name}</h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-paper-dim">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-amber px-4 py-2 text-sm font-semibold text-ink transition hover:brightness-110"
            >
              <ExternalLink size={15} />
              Live Project
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-surface-border px-4 py-2 text-sm font-semibold text-paper transition hover:border-mint hover:text-mint"
            >
              <Github size={15} />
              GitHub Repo
            </a>
          )}
        </div>

        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-xl border border-surface-border">
          <Image src={project.image} alt={project.name} fill className="object-cover" priority />
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h2 className="mb-3 font-mono text-sm text-mint">description</h2>
            <p className="text-[15px] leading-[1.8] text-paper-dim">{project.description}</p>

            <h2 className="mb-3 mt-9 flex items-center gap-2 font-mono text-sm text-mint">
              <AlertTriangle size={14} className="text-amber" />
              challenges faced
            </h2>
            <p className="text-[15px] leading-[1.8] text-paper-dim">{project.challenges}</p>

            <h2 className="mb-3 mt-9 flex items-center gap-2 font-mono text-sm text-mint">
              <Lightbulb size={14} className="text-amber" />
              future improvements
            </h2>
            <p className="text-[15px] leading-[1.8] text-paper-dim">{project.improvements}</p>
          </div>

          <div>
            <h2 className="mb-4 font-mono text-sm text-mint">tech stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-surface-border bg-surface px-3 py-1.5 font-mono text-xs text-paper-dim"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
