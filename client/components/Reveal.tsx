"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export type RevealVariant = "up" | "down" | "left" | "right" | "zoom" | "fade";

type RevealProps = {
  children: ReactNode;
  /** direction the element animates in from */
  variant?: RevealVariant;
  /** ms to wait before animating — use index * 80 to stagger a grid of cards */
  delay?: number;
  /** animation length in ms */
  duration?: number;
  /** true = animate once; false = replay every time it re-enters the viewport */
  once?: boolean;
  className?: string;
};

/**
 * Fades/slides its children in the first time they scroll into view.
 * Uses IntersectionObserver (no scroll listeners). The actual animation lives
 * in globals.css (.reveal) and is skipped for prefers-reduced-motion.
 */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 700,
  once = true,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      // fire a little before the element is fully on screen
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const style = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-duration": `${duration}ms`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      data-variant={variant}
      style={style}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
