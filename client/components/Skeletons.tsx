// Placeholder UI shown while lazy-loaded parts of the page are on their way.

function Bar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-surface-border/60 ${className}`} />;
}

export function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-surface-border bg-surface">
      <div className="aspect-[16/10] w-full animate-pulse bg-surface-border/50" />
      <div className="space-y-3 p-5">
        <Bar className="h-4 w-3/4" />
        <Bar className="h-3 w-full" />
        <Bar className="h-3 w-5/6" />
        <div className="flex gap-2 pt-2">
          <Bar className="h-5 w-14" />
          <Bar className="h-5 w-16" />
          <Bar className="h-5 w-12" />
        </div>
      </div>
    </div>
  );
}

export function ProjectsGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading projects">
      {Array.from({ length: count }, (_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProjectsSectionSkeleton() {
  return (
    <section id="projects" className="border-t border-surface-border px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="path-label mb-3">projects</p>
        <h2 className="mb-10 text-2xl font-bold text-paper sm:text-3xl">Selected work</h2>
        <ProjectsGridSkeleton />
      </div>
    </section>
  );
}

export function ContactFormSkeleton() {
  return (
    <div
      className="space-y-4 rounded-xl border border-surface-border bg-surface p-6"
      aria-busy="true"
      aria-label="Loading contact form"
    >
      <Bar className="h-3 w-16" />
      <Bar className="h-10 w-full" />
      <Bar className="h-3 w-16" />
      <Bar className="h-10 w-full" />
      <Bar className="h-3 w-20" />
      <Bar className="h-32 w-full" />
      <Bar className="h-10 w-36" />
    </div>
  );
}
