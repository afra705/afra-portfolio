export default function Marquee({ items, className = "", duration = 32, reverse = false }) {
  const row = [...items, ...items];

  return (
    <div className={`marquee mask-x relative flex overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="marquee-track flex w-max shrink-0 items-center will-change-transform"
        style={{
          "--marquee-duration": `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="group flex shrink-0 items-center gap-8 pr-8 font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500 transition-colors duration-300 hover:text-cream"
          >
            {item}
            <span className="text-accent/80 transition-transform duration-300 group-hover:rotate-90">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
