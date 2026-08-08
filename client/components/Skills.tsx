import { Code2, Server, Wrench, LucideIcon } from "lucide-react";
import { skills } from "@/data/site";

const iconFor: Record<string, LucideIcon> = {
  Frontend: Code2,
  Backend: Server,
  "Tools & Workflow": Wrench,
};

export default function Skills() {
  return (
    <section id="skills" className="border-t border-surface-border px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="path-label mb-3">skills</p>
        <h2 className="mb-10 text-2xl font-bold text-paper sm:text-3xl">What I work with</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {skills.map((group, gi) => {
            const Icon = iconFor[group.category] ?? Code2;
            return (
              <div
                key={group.category}
                className="group relative overflow-hidden rounded-xl border border-surface-border bg-surface p-6 transition hover:border-mint/50"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-amber transition group-hover:text-mint">
                    <Icon size={17} />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-paper">{group.category}</h3>
                    <p className="font-mono text-[11px] text-paper-faint">
                      {group.category.toLowerCase().replace(/[^a-z]+/g, "-").replace(/(^-|-$)/g, "")}/
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill, i) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded-md border border-surface-border bg-ink px-3 py-1.5 text-[13px] text-paper-dim transition hover:border-mint hover:text-paper"
                    >
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                          (gi + i) % 2 === 0 ? "bg-amber" : "bg-mint"
                        }`}
                      />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
