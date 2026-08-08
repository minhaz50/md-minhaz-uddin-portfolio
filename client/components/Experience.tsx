import { experience } from "@/data/site";
import { Briefcase } from "lucide-react";

export default function Experience() {
  if (experience.length === 0) return null;

  return (
    <section id="experience" className="border-t border-surface-border px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="path-label mb-3">experience</p>
        <h2 className="mb-10 text-2xl font-bold text-paper sm:text-3xl">Where I've worked</h2>

        <div className="space-y-6 border-l border-surface-border pl-8">
          {experience.map((exp) => (
            <div key={exp.role + exp.company} className="relative">
              <span className="absolute -left-[38px] top-1 flex h-4 w-4 items-center justify-center rounded-full border border-surface-border bg-ink text-amber">
                <Briefcase size={9} />
              </span>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-semibold text-paper">{exp.role}</h3>
                <span className="font-mono text-xs text-paper-faint">{exp.duration}</span>
              </div>
              <p className="mt-1 text-sm text-mint">{exp.company}</p>
              <ul className="mt-3 space-y-1.5">
                {exp.points.map((pt, i) => (
                  <li key={i} className="flex gap-2 text-[14px] leading-relaxed text-paper-dim">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
