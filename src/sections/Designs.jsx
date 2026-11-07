import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";
import PosterGallery from "../components/PosterGallery.jsx";
import Reveal from "../components/Reveal.jsx";
import { posters } from "../data/posters.js";
import { scrollToId } from "../utils/scroll.js";

const featured = posters.slice(0, 3);

export default function Designs() {
  return (
    <section
      id="designs"
      className="section-pad relative overflow-hidden border-t border-white/5"
      aria-labelledby="design-h"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-brand/20 blur-[120px]"
      />
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            id="design-h"
            eyebrow="05 — Digital marketing"
            title={
              <>
                Designs that{" "}
                <em className="font-serif font-normal italic tracking-[-0.02em] text-accent">
                  stop the scroll.
                </em>
              </>
            }
            text="Posters, social media creatives and campaign graphics designed in Canva for local brands, shops and service businesses."
          />
          <Reveal delay={0.1} variant="left">
            <div className="flex flex-col items-start gap-4 sm:items-end">
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                {String(posters.length).padStart(2, "0")} pieces in the archive
              </p>
              <Link to="/designs" className="btn btn-ghost group hidden sm:inline-flex">
                View all designs
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </Reveal>
        </div>

        <PosterGallery items={featured} className="mt-14" />

        <div className="mt-6 sm:hidden">
          <Link to="/designs" className="btn btn-ghost w-full">
            View all designs <ArrowUpRight size={16} />
          </Link>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-6 sm:flex-row sm:items-center sm:px-8">
            <div className="max-w-xl">
              <p className="display text-xl leading-tight text-cream">
                Need creatives for your next campaign?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Posters, flyers, social posts and content planning — tailored to your brand and
                your audience.
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="btn btn-primary shine group shrink-0"
            >
              Let&apos;s talk
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
