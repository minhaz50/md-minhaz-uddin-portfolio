"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown, Eye, Download } from "lucide-react";
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/icons";
import { profile } from "@/data/site";

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];

    let delay = deleting ? 35 : 65;
    if (!deleting && text === current) delay = 1400; // hold the finished word
    if (deleting && text === "") delay = 300;

    const timer = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length)
          setText(current.slice(0, text.length + 1));
        else setDeleting(true);
      } else if (text.length > 0) {
        setText(current.slice(0, text.length - 1));
      } else {
        setDeleting(false);
        setWordIndex((i) => i + 1);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex, words]);

  return text;
}

const socialLinks = [
  { href: profile.socials.github, Icon: GithubIcon, label: "GitHub" },
  { href: profile.socials.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
  { href: profile.socials.twitter, Icon: TwitterIcon, label: "Twitter" },
  { href: profile.socials.facebook, Icon: FacebookIcon, label: "Facebook" },
];

export default function Hero() {
  const typed = useTypewriter(profile.roles);

  return (
    <section id="top" className="bg-grid-fade relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pt-14 pb-16 md:grid-cols-[1.15fr_0.85fr] md:gap-8 md:px-8 md:pt-20 md:pb-24">
        {/* Left: terminal card */}
        <div className="order-2 flex flex-col justify-center md:order-1">
          <p className="path-label animate-rise mb-5">hello</p>

          <div className="animate-rise shadow-term overflow-hidden rounded-xl border border-surface-border bg-surface [animation-delay:80ms]">
            <div className="flex items-center gap-1.5 border-b border-surface-border px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B6B]" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber" />
              <span className="h-2.5 w-2.5 rounded-full bg-mint" />
              <span className="ml-3 font-mono text-xs text-paper-faint">
                whoami.sh
              </span>
            </div>
            <div className="px-5 py-7 md:px-7 md:py-9">
              <p className="font-mono text-sm text-mint">
                <span className="text-paper-faint">$</span> whoami
              </p>
              <h1 className="mt-3 text-3xl leading-tight font-bold text-paper sm:text-4xl md:text-5xl">
                {profile.name}
              </h1>
              <p className="mt-4 min-h-[1.6em] font-mono text-base text-amber sm:text-lg">
                {typed}
                <span className="animate-blink ml-0.5 inline-block h-[1em] w-[2px] -translate-y-0.5 bg-amber align-middle" />
              </p>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-paper-dim">
                {profile.tagline}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={profile.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 bg-amber text-ink font-body font-semibold px-5 py-2.5 rounded-lg hover:brightness-110 transition"
                >
                  <Download size={16} /> Download Resume
                </a>

                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-amber border border-panelBorder text-ink font-body font-medium px-5 py-2.5 rounded-lg hover:border-teal hover:text-teal transition"
                >
                  <Eye size={16} /> View Resume
                </a>

                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 bg-amber border border-panelBorder text-ink font-body font-medium px-5 py-2.5 rounded-lg hover:border-teal hover:text-teal transition"
                >
                  View Projects <ArrowDown size={16} />
                </a>
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-surface-border pt-6">
                {socialLinks.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="rounded-md border border-surface-border p-2.5 text-paper-dim transition hover:border-mint hover:text-mint"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: photo */}
        <div className="order-1 flex items-center justify-center md:order-2 mt-8">
          <div className="animate-rise w-full max-w-[300px] [animation-delay:160ms] md:max-w-sm">
            <div className="shadow-term overflow-hidden rounded-2xl border border-surface-border bg-surface">
              <div className="flex items-center gap-1.5 border-b border-surface-border px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-surface-border" />
                <span className="ml-2 font-mono text-[11px] text-paper-faint">
                  {profile.name.toLowerCase().replace(/\s+/g, "-")}.jpg
                </span>
              </div>
              <div className="relative aspect-[4/5] w-full">
                {/* Above the fold → load eagerly (preload) instead of lazily. */}
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  sizes="(min-width: 768px) 384px, 300px"
                  className="object-cover"
                  preload
                />
              </div>
            </div>

            {/* floating availability badge */}
            <div className="absolute -bottom-3 -left-3 flex items-center gap-2 rounded-md border border-surface-border bg-surface px-3 py-2 shadow-term">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              <span className="font-mono text-[11px] text-paper">
                Available for work
              </span>
            </div>
            {/* <p className="path-label mt-4 text-center opacity-70">
              {profile.location.toLowerCase().replace(/\s+/g, "-")}
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
}
