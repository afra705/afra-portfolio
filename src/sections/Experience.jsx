import { ArrowUpRight, Download, Hammer, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import useSpotlight from "../utils/useSpotlight.js";
import { jobs } from "../data/experience.js";
import { projects } from "../data/projects.js";
import { profile } from "../data/profile.js";

function ExperienceRow({ item, index }) {
  const Icon = item.icon;
  const { ref, onPointerMove } = useSpotlight();

  return (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      style={{ "--glow": "rgba(124,92,255,0.16)" }}
      className="spotlight-card group relative grid gap-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-500 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-white/[0.05] sm:grid-cols-[170px_1fr_auto] sm:p-8"
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent via-brand-light to-transparent transition-transform duration-700 group-hover:scale-x-100" />

      <div>
        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          <Icon size={13} /> {item.kicker}
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
          {item.meta}
        </p>
      </div>

      <div>
        <h3 className="display text-2xl leading-tight text-cream transition group-hover:text-accent/90">
          {item.title}
        </h3>
        {item.description && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
            {item.description}
          </p>
        )}
        {item.bullets.length > 1 && (
          <ul className="mt-3 space-y-1.5 text-sm text-zinc-400">
            {item.bullets.slice(1).map((bullet) => (
              <li key={bullet} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                {bullet}
              </li>
            ))}
          </ul>
        )}
        {item.technologies.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {item.technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-white/10 bg-ink/50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-zinc-500 transition hover:border-accent/40 hover:text-cream"
              >
                {technology}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-start justify-between gap-4 sm:flex-col sm:items-end">
        <span className="display text-3xl text-white/10 transition duration-500 group-hover:text-accent/50">
          {String(index + 1).padStart(2, "0")}
        </span>
        <ArrowUpRight
          size={18}
          className="text-zinc-700 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </div>
    </article>
  );
}

export default function Experience() {
  const hasJobs = jobs.length > 0;

  const items = hasJobs
    ? jobs.map((job) => ({
        kicker: job.company,
        meta: job.period,
        title: job.title,
        description: job.responsibilities?.[0] ?? "",
        bullets: job.responsibilities ?? [],
        technologies: job.technologies ?? [],
        icon: Briefcase,
      }))
    : projects.map((project) => ({
        kicker: project.type,
        meta: "Project case study",
        title: `Built ${project.name}`,
        description: project.overview,
        bullets: [],
        technologies: project.technologies,
        icon: Hammer,
      }));

  return (
    <section id="experience" className="section-pad relative overflow-hidden" aria-labelledby="exp-h">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-accent/[0.06] blur-[120px]"
      />
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            id="exp-h"
            eyebrow="03 — Experience"
            title={
              hasJobs ? (
                <>
                  Where I've made an{" "}
                  <em className="font-serif font-normal italic tracking-[-0.02em] text-accent">
                    impact.
                  </em>
                </>
              ) : (
                <>
                  Learning by building, one{" "}
                  <em className="font-serif font-normal italic tracking-[-0.02em] text-accent">
                    project
                  </em>{" "}
                  at a time.
                </>
              )
            }
            text={
              hasJobs
                ? "The roles, teams, and contributions that shaped how I work."
                : "Hands-on practice through real, deployed projects — each one a lesson in shipping thoughtful interfaces."
            }
          />
          {profile.resumeAvailable && (
            <Reveal delay={0.1} variant="left">
              <a href={profile.resumeUrl} download className="btn btn-ghost group hidden sm:inline-flex">
                Full resume
                <Download size={15} className="transition-transform group-hover:translate-y-0.5" />
              </a>
            </Reveal>
          )}
        </div>

        <ol className="relative mt-14 space-y-4">
          <motion.span
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-accent/40 via-brand/30 to-transparent lg:block"
          />
          {items.map((item, index) => (
            <li key={`${item.title}-${index}`} className="lg:pl-6">
              <Reveal delay={index * 0.05} variant="blur">
                <ExperienceRow item={item} index={index} />
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
