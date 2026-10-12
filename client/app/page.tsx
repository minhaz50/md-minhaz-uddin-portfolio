import { Suspense } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { ProjectsSectionSkeleton } from "@/components/Skeletons";

// Projects come from the API on every request, so don't try to prerender at build time.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Education />
      <Experience />
      {/* Streams in as soon as the API responds; the rest of the page isn't blocked. */}
      <Suspense fallback={<ProjectsSectionSkeleton />}>
        <Projects />
      </Suspense>
      <Contact />
    </>
  );
}
