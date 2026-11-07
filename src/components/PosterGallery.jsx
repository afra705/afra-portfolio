import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import PosterCard from "./PosterCard.jsx";
import Reveal from "./Reveal.jsx";

export default function PosterGallery({ items, className = "" }) {
  const [openIndex, setOpenIndex] = useState(null);
  const openerRef = useRef(null);
  const active = openIndex === null ? null : items[openIndex];

  const openAt = (index) => {
    openerRef.current = document.activeElement;
    setOpenIndex(index);
  };

  const close = useCallback(() => {
    setOpenIndex(null);
    openerRef.current?.focus?.();
  }, []);

  const step = useCallback(
    (direction) => {
      setOpenIndex((current) =>
        current === null ? current : (current + direction + items.length) % items.length
      );
    },
    [items.length]
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (event) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, step]);

  return (
    <>
      <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
        {items.map((poster, index) => (
          <Reveal
            key={poster.id}
            delay={Math.min(index, 5) * 0.05}
            variant="blur"
            className="h-full min-w-0"
          >
            <PosterCard poster={poster} onOpen={() => openAt(index)} />
          </Reveal>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} poster preview`}
          onMouseDown={(event) => event.target === event.currentTarget && close()}
          className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-2xl"
        >
          <div className="container-x flex items-center justify-between gap-4 pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              {active.category}
            </p>
            <button
              type="button"
              autoFocus
              onClick={close}
              aria-label="Close poster preview"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-cream transition hover:border-accent/50 hover:bg-white/10 hover:text-accent"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-6 overflow-y-auto px-4 py-6">
            <img
              src={active.image}
              alt={`${active.title} — full poster preview`}
              loading="eager"
              className="max-h-[58vh] w-auto max-w-full rounded-2xl border border-white/10 object-contain shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] sm:max-h-[66vh]"
            />

            <div className="flex w-full max-w-md flex-col items-center gap-4 text-center">
              <div>
                <h3 className="display text-2xl leading-tight text-cream">{active.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{active.description}</p>
              </div>

              <div className="flex items-center gap-5">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous poster"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-cream transition hover:border-accent/50 hover:text-accent"
                >
                  <ArrowLeft size={18} />
                </button>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  {String(openIndex + 1).padStart(2, "0")} /{" "}
                  {String(items.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next poster"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-cream transition hover:border-accent/50 hover:text-accent"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
