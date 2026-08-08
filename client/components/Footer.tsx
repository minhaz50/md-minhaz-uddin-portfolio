"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { profile } from "@/data/site";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-surface-border px-5 pt-14 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold text-paper">
              {profile.name}
              <span className="text-amber">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper-dim">
              {profile.tagline}
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border text-paper-dim transition hover:border-mint hover:text-mint"
              >
                <Github size={16} />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border text-paper-dim transition hover:border-mint hover:text-mint"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${encodeURIComponent(
                  "Let's connect",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border text-paper-dim transition hover:border-mint hover:text-mint"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-sm font-semibold text-paper">Navigation</p>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-paper-dim transition hover:text-mint"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-sm font-semibold text-paper">
              Let&apos;s Connect
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper-dim">
              Always open to new opportunities and interesting projects.
            </p>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${encodeURIComponent(
                "Let's connect",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-amber px-4 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110"
            >
              <Mail size={15} />
              Say Hello
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-surface-border py-6 sm:flex-row">
          <p className="text-center text-sm text-paper-faint sm:text-left">
            © {new Date().getFullYear()} {profile.name}. Built with{" "}
            <span className="text-red-400">♥</span> using Next.js &amp; Express.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 text-sm text-paper-faint transition hover:text-mint"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-surface-border transition group-hover:border-mint">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
