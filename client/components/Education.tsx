import { education } from "@/data/site";
import { GraduationCap } from "lucide-react";

export default function Education() {
  if (education.length === 0) return null;

  return (
    <section id="education" className="border-t border-surface-border px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="path-label mb-3">education</p>
        <h2 className="mb-10 text-2xl font-bold text-paper sm:text-3xl">Educational background</h2>

        <div className="space-y-5">
          {education.map((ed) => (
            <div
              key={ed.degree}
              className="flex flex-col gap-4 rounded-xl border border-surface-border bg-surface p-6 sm:flex-row sm:items-start"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-ink text-amber">
                <GraduationCap size={20} />
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-lg font-semibold text-paper">{ed.degree}</h3>
                  <span className="font-mono text-xs text-paper-faint">{ed.duration}</span>
                </div>
                <p className="mt-1 text-sm text-mint">{ed.institution}</p>
                {ed.details && (
                  <p className="mt-3 text-[14px] leading-relaxed text-paper-dim">{ed.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
