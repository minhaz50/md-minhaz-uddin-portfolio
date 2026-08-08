"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Download,
  ArrowDown,
} from "lucide-react";
import { profile } from "@/data/site";

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const speed = deleting ? 35 : 65;
    const pause =
      !deleting && text === current
        ? 1400
        : deleting && text === ""
          ? 300
          : speed;

    const t = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setDeleting(true);
        }
      } else {
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1));
        } else {
          setDeleting(false);
          setWordIndex((i) => i + 1);
        }
      }
    }, pause);

    return () => clearTimeout(t);
  }, [text, deleting, wordIndex, words]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(profile.roles);
  const socialIcons = [
    { href: profile.socials.github, Icon: Github, label: "GitHub" },
    { href: profile.socials.linkedin, Icon: Linkedin, label: "LinkedIn" },
    { href: profile.socials.twitter, Icon: Twitter, label: "Twitter" },
    { href: profile.socials.facebook, Icon: Facebook, label: "Facebook" },
  ];

  return (
    <section id="top" className="relative overflow-hidden bg-grid-fade">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-14 md:grid-cols-[1.15fr_0.85fr] md:gap-8 md:px-8 md:pb-24 md:pt-20">
        {/* Left: terminal card */}
        <div className="order-2 flex flex-col justify-center md:order-1">
          <p className="path-label mb-5 animate-rise">hello</p>

          <div className="animate-rise overflow-hidden rounded-xl border border-surface-border bg-surface shadow-term [animation-delay:80ms]">
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
              <h1 className="mt-3 text-3xl font-bold leading-tight text-paper sm:text-4xl md:text-5xl">
                {profile.name}
              </h1>
              <p className="mt-4 min-h-[1.6em] font-mono text-base text-amber sm:text-lg">
                {typed}
                <span className="ml-0.5 inline-block h-[1em] w-[2px] -translate-y-0.5 animate-blink bg-amber align-middle" />
              </p>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-paper-dim">
                {profile.tagline}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={profile.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 rounded-md bg-amber px-5 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110 active:brightness-95"
                >
                  <Download size={16} />
                  Download Résumé
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-md border border-surface-border px-5 py-2.5 text-sm font-semibold text-paper transition hover:border-mint hover:text-mint"
                >
                  View Projects
                  <ArrowDown size={15} />
                </a>
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-surface-border pt-6">
                {socialIcons.map(({ href, Icon, label }) => (
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
        <div className="order-1 flex items-center justify-center md:order-2">
          <div className="animate-rise w-full max-w-[300px] [animation-delay:160ms] md:max-w-sm">
            <div className="overflow-hidden rounded-2xl border border-surface-border bg-surface shadow-term">
              <div className="flex items-center gap-1.5 border-b border-surface-border px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-surface-border" />
                <span className="ml-2 font-mono text-[11px] text-paper-faint">
                  {profile.name.toLowerCase().replace(/\s+/g, "-")}.jpg
                </span>
              </div>
              <div className="relative aspect-square w-full">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <p className="path-label mt-4 text-center opacity-70">
              {profile.location.toLowerCase().replace(/\s+/g, "-")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
