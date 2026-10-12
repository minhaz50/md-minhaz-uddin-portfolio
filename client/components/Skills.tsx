import { Braces, Layers, Server, Wrench, type LucideIcon } from "lucide-react";
import { skills } from "@/data/site";
import Reveal from "@/components/Reveal";

// Keys must match the `category` names in data/site.ts
const categoryMeta: Record<string, { Icon: LucideIcon; path: string }> = {
  Languages: { Icon: Braces, path: "languages" },
  Frontend: { Icon: Layers, path: "frontend" },
  Backend: { Icon: Server, path: "backend" },
  Tools: { Icon: Wrench, path: "tools" },
};

// Two accents, laid out like a checkerboard. Full class names are written out
// so Tailwind can detect them.
const accents = [
  {
    text: "text-amber",
    dot: "bg-amber",
    glow: "bg-amber/15",
    line: "via-amber/70",
    cardHover: "hover:border-amber/50",
    chipHover: "hover:border-amber/60",
  },
  {
    text: "text-mint",
    dot: "bg-mint",
    glow: "bg-mint/15",
    line: "via-mint/70",
    cardHover: "hover:border-mint/50",
    chipHover: "hover:border-mint/60",
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="border-t border-surface-border px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="path-label mb-3">skills</p>
          <h2 className="mb-3 text-2xl font-bold text-paper sm:text-3xl">
            What I work with
          </h2>
          <p className="mb-10 max-w-xl text-[15px] leading-relaxed text-paper-dim">
            The languages, frameworks and tools I use to turn ideas into shipped
            products.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((group, gi) => {
            const { Icon, path } = categoryMeta[group.category] ?? {
              Icon: Braces,
              path: group.category.toLowerCase().replace(/[^a-z]+/g, "-"),
            };
            const a = accents[(gi + Math.floor(gi / 2)) % 2];

            return (
              <Reveal key={group.category} delay={gi * 100} className="h-full">
                <div
                  className={`group relative h-full overflow-hidden rounded-2xl border border-surface-border bg-surface p-6 transition duration-300 hover:-translate-y-1 ${a.cardHover}`}
                >
                  {/* top accent line */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent ${a.line} to-transparent`}
                  />
                  {/* corner glow */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full ${a.glow} opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
                  />

                  <div className="relative mb-6 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-xl border border-surface-border bg-ink ${a.text}`}
                      >
                        <Icon size={20} />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-paper">
                          {group.category}
                        </h3>
                        <p className="font-mono text-[11px] text-paper-faint">
                          <span className={a.text}>$</span> ls {path}/
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full border border-surface-border bg-ink px-2.5 py-1 font-mono text-[11px] text-paper-faint">
                      {String(group.items.length).padStart(2, "0")}
                    </span>
                  </div>

                  <ul className="relative flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <li
                        key={skill}
                        className={`inline-flex items-center gap-2 rounded-lg border border-surface-border bg-ink px-3 py-1.5 text-[13px] text-paper-dim transition duration-200 hover:-translate-y-0.5 hover:text-paper ${a.chipHover}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`}
                        />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
