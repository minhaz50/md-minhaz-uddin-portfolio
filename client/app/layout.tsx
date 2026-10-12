import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { profile } from "@/data/site";
import BackgroundFX from "@/components/BackgroundFX";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.designation}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.tagline,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e1512" },
    { media: "(prefers-color-scheme: light)", color: "#f6f5f0" },
  ],
};

// Runs before the first paint so the saved (or OS-preferred) theme is applied
// immediately — no flash of the wrong theme.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

// With JavaScript disabled the scroll-reveal observer never runs, so make
// sure nothing stays hidden.
const noScriptStyles = `.reveal{opacity:1!important;transform:none!important}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <noscript>
          <style>{noScriptStyles}</style>
        </noscript>
      </head>
      <body className="font-sans antialiased">
        <BackgroundFX />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
