import { about } from "@/data/site";

export default function About() {
  return (
    <section id="about" className="border-t border-surface-border px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="path-label mb-3">about</p>
        <h2 className="mb-10 text-2xl font-bold text-paper sm:text-3xl">A bit about me</h2>

        <div className="grid gap-10 md:grid-cols-[1.4fr_0.6fr] md:gap-14">
          <div className="space-y-5">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-[15px] leading-[1.8] text-paper-dim">
                {p}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 self-start md:grid-cols-1 md:gap-5">
            {about.highlights.map((h) => (
              <div
                key={h.label}
                className="rounded-lg border border-surface-border bg-surface px-5 py-5 text-center md:text-left"
              >
                <p className="font-mono text-2xl font-bold text-amber">{h.value}</p>
                <p className="mt-1 text-xs text-paper-faint">{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
