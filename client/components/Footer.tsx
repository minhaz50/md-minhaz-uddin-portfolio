"use client";

import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/site";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const socialButton =
  "flex h-9 w-9 items-center justify-center rounded-lg border border-surface-border text-paper-dim transition hover:border-mint hover:text-mint";

// Opens a Gmail compose window directly, so it works even when the visitor has
// no default mail app configured for mailto: links.
const gmailCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  profile.email,
)}&su=${encodeURIComponent("Let's connect")}`;

export default function Footer() {
  const base = usePathname() === "/" ? "" : "/";
  return (
    <footer className="border-t border-surface-border px-5 pt-14 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div>
            <p className="text-lg font-bold text-paper">
              {profile.name.split(" ")[0]}
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
                className={socialButton}
              >
                <GithubIcon size={16} />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={socialButton}
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className={socialButton}
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
                  <Link
                    href={`${base}${link.href}`}
                    className="text-sm text-paper-dim transition hover:text-mint"
                  >
                    {link.label}
                  </Link>
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
              href={gmailCompose}
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
            type="button"
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
