import { Code, TrendingUp, Check, ArrowUpRight } from "lucide-react";
import useSpotlight from "../utils/useSpotlight.js";

const icons = { code: Code, trend: TrendingUp };

export default function ServiceCard({ service: s, onSelect, index = 0 }) {
  const Icon = icons[s.icon];
  const { ref, onPointerMove } = useSpotlight();

  return (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      style={{ "--glow": "rgba(212,255,87,0.12)" }}
      className="spotlight-card group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-7 transition duration-500 hover:border-accent/30 sm:p-9"
    >
      <span className="pointer-events-none absolute -right-4 -top-14 select-none font-display text-[9rem] font-extrabold leading-none text-white/[0.03] transition duration-700 group-hover:text-accent/[0.07]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent via-brand-light to-transparent transition-transform duration-700 group-hover:scale-x-100" />

      <div className="relative flex items-center gap-4">
        <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent text-ink shadow-lg shadow-accent/25 transition duration-500 group-hover:rotate-[-6deg] group-hover:scale-105">
          <Icon size={26} />
          <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10" />
        </span>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-500">
            Service {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="display mt-1 text-2xl leading-none text-cream sm:text-3xl">{s.title}</h3>
        </div>
      </div>

      <p className="relative mt-6 text-sm leading-relaxed text-zinc-400">{s.description}</p>

      <ul className="relative mt-7 grid flex-1 gap-3 sm:grid-cols-2">
        {s.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2.5 text-sm text-zinc-300">
            <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent/15 text-accent transition duration-300 group-hover:bg-accent/25">
              <Check size={11} />
            </span>
            {highlight}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onSelect(s)}
        className="btn btn-primary shine group/btn relative mt-9 self-start"
      >
        {s.cta}
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
        />
      </button>
    </article>
  );
}
