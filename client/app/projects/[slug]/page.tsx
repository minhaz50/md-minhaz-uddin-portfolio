import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ExternalLink,
  Lightbulb,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import Reveal from "@/components/Reveal";
import { getProjectBySlug } from "@/lib/api";
import BulletList from "@/components/BulletList";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug).catch(() => null);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
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

        <p className="path-label mt-8 mb-3">projects/{project.slug}</p>
        <h1 className="text-3xl font-bold text-paper sm:text-4xl">
          {project.name}
        </h1>
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
          {project.clientGithubUrl && (
            <a
              href={project.clientGithubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-surface-border px-4 py-2 text-sm font-semibold text-paper transition hover:border-mint hover:text-mint"
            >
              <GithubIcon size={15} />
              Client GitHub
            </a>
          )}
          {project.serverGithubUrl && (
            <a
              href={project.serverGithubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-surface-border px-4 py-2 text-sm font-semibold text-paper transition hover:border-mint hover:text-mint"
            >
              <GithubIcon size={15} />
              Server GitHub
            </a>
          )}
        </div>

        <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-xl border border-surface-border">
          {/* This is the main image on the page → preload it rather than lazy-loading. */}
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(min-width: 896px) 896px, 100vw"
            className="object-cover"
            preload
          />
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <Reveal>
              <h2 className="mb-3 font-mono text-sm text-mint">description</h2>
              <BulletList text={project.description} />
            </Reveal>

            <Reveal>
              <h2 className="mt-9 mb-3 flex items-center gap-2 font-mono text-sm text-mint">
                <AlertTriangle size={14} className="text-amber" />
                challenges faced
              </h2>
              <BulletList text={project.challenges} />
            </Reveal>

            <Reveal>
              <h2 className="mt-9 mb-3 flex items-center gap-2 font-mono text-sm text-mint">
                <Lightbulb size={14} className="text-amber" />
                future improvements
              </h2>
              <BulletList text={project.improvements} />
            </Reveal>
          </div>

          <Reveal variant="right">
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
          </Reveal>
        </div>
      </div>
    </article>
  );
}
