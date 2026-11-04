import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Search, X } from "lucide-react";
import ProjectCard from "../components/ProjectCard.jsx";
import Reveal from "../components/Reveal.jsx";
import { projects } from "../data/projects.js";

export default function AllProjects() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "All Projects — Afra Anjum";
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(projects.flatMap((project) => project.category))],
    []
  );

  const list = projects.filter((project) => {
    const inCategory = category === "All" || project.category.includes(category);
    const haystack = [project.name, project.description, ...project.technologies]
      .join(" ")
      .toLowerCase();
    return inCategory && haystack.includes(query.trim().toLowerCase());
  });

  return (
    <section className="container-x pt-32 pb-24 sm:pt-40">
      <div className="flex flex-wrap items-end justify-between gap-8 border-b border-white/10 pb-10">
        <div>
          <p className="eyebrow">Archive</p>
          <h1 className="display mt-5 text-5xl leading-[0.92] sm:text-7xl">
            All{" "}
            <em className="font-serif font-normal italic tracking-[-0.02em] text-accent">
              projects.
            </em>
          </h1>
          <p className="mt-4 max-w-xl text-zinc-400">
            Deployed experiments, client work, and full-stack builds — filter by discipline or search
            by technology.
          </p>
        </div>
        <div className="flex items-center gap-6">
          <span className="display text-6xl leading-none text-white/10 sm:text-7xl">
            {String(projects.length).padStart(2, "0")}
          </span>
          <Link to="/" className="btn btn-ghost">
            <ArrowLeft size={15} /> Home
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`min-h-[40px] rounded-full border px-4 font-mono text-[10px] uppercase tracking-[0.14em] transition ${
                category === item
                  ? "border-accent bg-accent text-ink"
                  : "border-white/10 bg-white/5 text-zinc-400 hover:border-accent/40 hover:text-cream"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <label className="relative block md:w-72">
          <span className="sr-only">Search projects</span>
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects…"
            className="input py-3 pl-11 pr-10"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-500 transition hover:text-cream"
            >
              <X size={14} />
            </button>
          )}
        </label>
      </div>

      {list.length ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((project, index) => (
            <Reveal key={project.id} delay={Math.min(index * 0.05, 0.3)}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
          <p className="display text-2xl text-cream">No projects match those filters.</p>
          <p className="mt-2 text-sm text-zinc-500">Try a different category or search term.</p>
          <button
            type="button"
            onClick={() => {
              setCategory("All");
              setQuery("");
            }}
            className="btn btn-primary mt-6"
          >
            Clear filters <ArrowUpRight size={15} />
          </button>
        </div>
      )}
    </section>
  );
}
