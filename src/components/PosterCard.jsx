import { Maximize2 } from "lucide-react";
import ProjectImage from "./ProjectImage.jsx";
import useSpotlight from "../utils/useSpotlight.js";

export default function PosterCard({ poster, onOpen }) {
  const { ref, onPointerMove } = useSpotlight();

  return (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      style={{ "--glow": "rgba(124,92,255,0.18)" }}
      className="spotlight-card group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-1 hover:border-accent/35 hover:bg-white/[0.05] hover:shadow-glow motion-reduce:transition-none"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${poster.title} poster preview`}
        className="relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden text-left"
      >
        <ProjectImage
          src={poster.image}
          alt={`${poster.title} — ${poster.category} poster design`}
          name={poster.title}
          width={poster.width}
          height={poster.height}
          className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent opacity-0 transition duration-500 group-hover:opacity-100"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-4 right-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-cream text-ink opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
        >
          <Maximize2 size={16} />
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-accent">
          {poster.category}
        </p>
        <h3 className="display mt-2 line-clamp-1 text-xl leading-tight text-cream">
          {poster.title}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-[2.5rem] flex-1 text-xs leading-relaxed text-zinc-400">
          {poster.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tools and formats">
          {poster.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/10 bg-ink/50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-zinc-400"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
