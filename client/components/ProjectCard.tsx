import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-surface-border bg-surface transition hover:border-mint/50">
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-surface-border">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-paper">{project.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-paper-dim">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded border border-surface-border px-2 py-0.5 font-mono text-[11px] text-paper-faint"
            >
              {s}
            </span>
          ))}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber transition group-hover:gap-2.5"
        >
          View Details
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </div>
  );
}
