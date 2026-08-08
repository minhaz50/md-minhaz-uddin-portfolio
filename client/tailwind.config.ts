import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "rgb(var(--bg) / <alpha-value>)",
          soft: "rgb(var(--bg-soft) / <alpha-value>)",
        },
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          raised: "rgb(var(--surface-raised) / <alpha-value>)",
          border: "rgb(var(--border) / <alpha-value>)",
        },
        paper: {
          DEFAULT: "rgb(var(--text) / <alpha-value>)",
          dim: "rgb(var(--text-dim) / <alpha-value>)",
          faint: "rgb(var(--text-faint) / <alpha-value>)",
        },
        amber: {
          DEFAULT: "rgb(var(--amber) / <alpha-value>)",
          dim: "rgb(var(--amber-dim) / <alpha-value>)",
        },
        mint: {
          DEFAULT: "rgb(var(--mint) / <alpha-value>)",
          dim: "rgb(var(--mint-dim) / <alpha-value>)",
        },
      },
      fontFamily: {
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "SF Mono",
          "Menlo",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(180deg, rgba(255,180,84,0.06) 0%, rgba(255,180,84,0) 60%)",
      },
      boxShadow: {
        term: "0 0 0 1px rgb(var(--border) / 0.5), 0 20px 60px -20px rgb(var(--shadow-color) / var(--shadow-alpha))",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-30px, 30px)" },
        },
        floatSlower: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(30px, -20px)" },
        },
      },
      animation: {
        blink: "blink 1s steps(1) infinite",
        rise: "rise 0.6s ease-out both",
        "float-slow": "floatSlow 14s ease-in-out infinite",
        "float-slower": "floatSlower 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
