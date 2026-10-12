"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#education", label: "education" },
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#contact", label: "contact" },
];

// Height of the sticky navbar — smooth-scroll targets are offset by this so
// section headings don't end up hidden underneath it.
const SCROLL_OFFSET = 72;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Navbar background/blur once the page has scrolled a little.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: highlight whichever section sits in the middle band of the viewport.
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Slide the pill indicator under the active link. This writes straight to the
  // DOM (no state), and re-measures if the window is resized.
  useEffect(() => {
    function place() {
      const indicator = indicatorRef.current;
      const nav = navRef.current;
      if (!indicator || !nav) return;

      const link = active ? linkRefs.current[active] : null;
      if (!link) {
        indicator.style.opacity = "0";
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      indicator.style.opacity = "1";
      indicator.style.width = `${linkRect.width}px`;
      indicator.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
    }

    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    setActive(href);
    setOpen(false);
    window.history.pushState(null, "", href);
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-sm transition-colors ${
        scrolled ? "border-surface-border bg-ink/95" : "border-transparent bg-ink/70"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        <a
          href="#top"
          className="flex items-center gap-2 font-mono text-sm text-paper"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActive("");
            setOpen(false);
            window.history.pushState(null, "", "#top");
          }}
        >
          <span className="flex gap-1.5 pr-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber" />
            <span className="h-2.5 w-2.5 rounded-full bg-mint" />
            <span className="h-2.5 w-2.5 rounded-full bg-surface-border" />
          </span>
          <span className="text-paper-dim">portfolio</span>
          <span className="text-mint">.sh</span>
        </a>

        <nav ref={navRef} className="relative hidden items-center gap-1 md:flex">
          <span
            ref={indicatorRef}
            aria-hidden="true"
            className="absolute top-0.5 left-0 h-[calc(100%-4px)] rounded-sm bg-surface opacity-0 transition-[transform,width,opacity] duration-300 ease-out"
          />
          {links.map((l) => (
            <a
              key={l.href}
              ref={(el) => {
                linkRefs.current[l.href] = el;
              }}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className={`relative z-10 rounded-sm px-3 py-1.5 font-mono text-[13px] transition-colors ${
                active === l.href ? "text-mint" : "text-paper-dim hover:text-paper"
              }`}
            >
              {l.label}
            </a>
          ))}
          <ThemeToggle className="relative z-10 ml-2" />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-sm p-2 text-paper"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-surface-border bg-ink px-5 pt-2 pb-4 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className={`rounded-sm px-2 py-2.5 font-mono text-sm transition-colors ${
                active === l.href ? "bg-surface text-mint" : "text-paper-dim hover:bg-surface hover:text-mint"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
