import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Reveal from "../components/Reveal.jsx";
import { projects } from "../data/projects.js";

export default function Projects() {
  const featured = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <section id="projects" className="section-pad relative" aria-labelledby="proj-h">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            id="proj-h"
            eyebrow="04 — Selected work"
            title={
              <>
                Work that{" "}
                <em className="font-serif font-normal italic tracking-[-0.02em] text-accent">
                  ships.
                </em>
              </>
            }
            text="A selection of deployed, open-source projects — built with an emphasis on clean interaction, responsive layout, and real-world use."
          />
          <Reveal delay={0.1} variant="left">
            <Link to="/projects" className="btn btn-ghost group hidden sm:inline-flex">
              All projects
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {featured.map((project, index) => (
            <Reveal
              key={project.id}
              delay={index * 0.07}
              variant="blur"
              className={index === 0 ? "md:col-span-2" : ""}
            >
              <ProjectCard project={project} large={index === 0} index={index} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <Link to="/projects" className="btn btn-ghost w-full">
            All projects <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
