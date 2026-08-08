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

// Height of the sticky navbar, used to offset smooth-scroll targets so
// section headings don't end up hidden underneath it.
const SCROLL_OFFSET = 72;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: highlight whichever section is currently in the middle band
  // of the viewport as the user scrolls.
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Move the sliding pill indicator under whichever nav link is active.
  useEffect(() => {
    const el = active ? linkRefs.current[active] : null;
    if (el && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = el.getBoundingClientRect();
      setIndicator({ left: linkRect.left - navRect.left, width: linkRect.width });
    } else {
      setIndicator(null);
    }
  }, [active]);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    setActive(href);
    setOpen(false);
    history.pushState(null, "", href);
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "bg-ink/95 border-surface-border backdrop-blur"
          : "bg-ink/70 border-transparent backdrop-blur"
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
            history.pushState(null, "", "#top");
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
          {indicator && (
            <span
              className="absolute top-0.5 h-[calc(100%-4px)] rounded bg-surface transition-[left,width] duration-300 ease-out"
              style={{ left: indicator.left, width: indicator.width }}
            />
          )}
          {links.map((l) => (
            <a
              key={l.href}
              ref={(el) => {
                linkRefs.current[l.href] = el;
              }}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className={`relative z-10 rounded px-3 py-1.5 font-mono text-[13px] transition-colors ${
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
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded p-2 text-paper"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-surface-border bg-ink px-5 pb-4 pt-2 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              className={`rounded px-2 py-2.5 font-mono text-sm transition-colors ${
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