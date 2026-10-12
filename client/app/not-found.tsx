import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
      <p className="path-label mb-3">404</p>
      <h1 className="text-3xl font-bold text-paper sm:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-sm text-sm text-paper-dim">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110"
      >
        Back to home
      </Link>
    </section>
  );
}
