"use client";

import { Moon, Sun } from "lucide-react";

// The theme lives on <html data-theme="…"> (set before first paint by the inline
// script in app/layout.tsx), so this button needs no React state: it flips the
// attribute and remembers the choice. CSS decides which icon is visible.
export default function ThemeToggle({ className = "" }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem("theme", next);
    } catch {
      // storage can be unavailable (private mode) — the toggle still works for this visit
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light / dark theme"
      className={`inline-flex items-center justify-center rounded-md border border-surface-border p-2 text-paper-dim transition hover:border-mint hover:text-mint ${className}`}
    >
      <Sun size={16} className="theme-icon-sun" />
      <Moon size={16} className="theme-icon-moon" />
    </button>
  );
}
