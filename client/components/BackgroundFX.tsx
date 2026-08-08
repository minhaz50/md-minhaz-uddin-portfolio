export default function BackgroundFX() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink"
    >
      {/* soft glow — top right */}
      <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-amber/25 blur-[120px] animate-float-slow" />

      {/* soft glow — bottom left */}
      <div className="absolute -bottom-48 -left-32 h-[560px] w-[560px] rounded-full bg-mint/20 blur-[130px] animate-float-slower" />

      {/* faint code-grid lines */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgb(var(--border)) 1px, transparent 1px),
            linear-gradient(90deg, rgb(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 90%)",
        }}
      />

      {/* vignette so content stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/0 via-ink/10 to-ink" />
    </div>
  );
}
