import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PosterGallery from "../components/PosterGallery.jsx";
import { posters } from "../data/posters.js";

export default function AllDesigns() {
  useEffect(() => {
    document.title = "All Designs — Afra Anjum";
  }, []);

  return (
    <section className="container-x pt-32 pb-24 sm:pt-40">
      <div className="flex flex-wrap items-end justify-between gap-8 border-b border-white/10 pb-10">
        <div>
          <p className="eyebrow">Digital marketing archive</p>
          <h1 className="display mt-5 text-5xl leading-[0.92] sm:text-7xl">
            All{" "}
            <em className="font-serif font-normal italic tracking-[-0.02em] text-accent">
              designs.
            </em>
          </h1>
          <p className="mt-4 max-w-xl text-zinc-400">
            Posters, flyers and social media creatives made in Canva — for shops, food brands,
            agencies and campaign pages.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <span className="display text-6xl leading-none text-white/10 sm:text-7xl">
            {String(posters.length).padStart(2, "0")}
          </span>
          <Link to="/" className="btn btn-ghost">
            <ArrowLeft size={15} /> Home
          </Link>
        </div>
      </div>

      <PosterGallery items={posters} className="mt-10" />
    </section>
  );
}
