export default function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="bg-grid absolute inset-0 opacity-70" />
      <div className="bg-dots absolute inset-0 opacity-30" />
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="aurora aurora-c" />

      {/* Vertical light beam */}
      <div className="absolute left-1/2 top-0 h-[70vh] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      {/* Top & bottom vignettes */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
    </div>
  );
}
