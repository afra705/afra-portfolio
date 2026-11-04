import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ProjectImage from "./ProjectImage.jsx";
import useSpotlight from "../utils/useSpotlight.js";
import { isExternal } from "../utils/scroll.js";

export default function ProjectCard({ project: p, large = false, index }) {
  const { ref, onPointerMove } = useSpotlight();

  return (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      style={{ "--glow": "rgba(212,255,87,0.16)" }}
      className="spotlight-card group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-1 hover:border-accent/35 hover:bg-white/[0.05] hover:shadow-glow"
    >
      <Link
        to={`/projects/${p.id}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block overflow-hidden"
      >
        <ProjectImage
          src={p.image}
          alt={`${p.name} screenshot`}
          name={p.name}
          className={`block w-full max-w-none object-cover object-left transition duration-700 group-hover:scale-[1.05] motion-reduce:transition-none ${
            large ? "aspect-[2/1]" : "aspect-[16/10]"
          }`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent opacity-80 transition duration-500 group-hover:opacity-95" />
        <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-ink/60 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-300 backdrop-blur-md">
          {p.type}
        </span>
        {p.featured && (
          <span className="absolute right-5 top-5 rounded-full bg-accent px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-ink shadow-glow-accent">
            Featured
          </span>
        )}
        <span className="absolute bottom-5 right-5 grid h-11 w-11 translate-y-3 place-items-center rounded-full bg-cream text-ink opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={18} />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="display text-2xl leading-tight text-cream">
            <Link to={`/projects/${p.id}`} className="transition hover:text-accent">
              {p.name}
            </Link>
          </h3>
          {index != null && (
            <span className="font-mono text-[10px] text-zinc-600">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{p.description}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {p.technologies.slice(0, 4).map((technology, technologyIndex) => (
            <li
              key={`${technology}-${technologyIndex}`}
              className="rounded-full border border-white/10 bg-ink/50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-zinc-400 transition hover:border-accent/40 hover:text-cream"
            >
              {technology}
            </li>
          ))}
          {p.technologies.length > 4 && (
            <li className="rounded-full border border-white/10 bg-ink/50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-zinc-500">
              +{p.technologies.length - 4}
            </li>
          )}
        </ul>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
          <Link
            to={`/projects/${p.id}`}
            className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-cream transition hover:text-accent"
          >
            Read case study
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            />
          </Link>
          <div className="flex items-center gap-3">
            {isExternal(p.liveUrl) && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name} live demo (opens in new tab)`}
                className="font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500 transition hover:text-accent"
              >
                Live
              </a>
            )}
            {isExternal(p.githubUrl) && (
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name} GitHub repository (opens in new tab)`}
                className="font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500 transition hover:text-accent"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
