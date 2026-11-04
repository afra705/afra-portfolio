import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import ProjectImage from "../components/ProjectImage.jsx";
import Reveal from "../components/Reveal.jsx";
import NotFound from "./NotFound.jsx";
import { findProject, projects } from "../data/projects.js";
import { isExternal } from "../utils/scroll.js";

const PLACEHOLDER = "Details coming soon. Add them in src/data/projects.js.";

function Block({ eyebrow, title, children }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="display mt-3 text-xl text-cream">{title}</h2>
      <div className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">{children}</div>
    </section>
  );
}

const List = ({ items }) =>
  items?.length ? (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
          {item}
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-sm text-zinc-600">{PLACEHOLDER}</p>
  );

const Text = ({ value }) => (value ? <p>{value}</p> : <p className="text-sm text-zinc-600">{PLACEHOLDER}</p>);

export default function ProjectDetails() {
  const { id } = useParams();
  const project = findProject(id);

  useEffect(() => {
    if (project) document.title = `${project.name} — Afra Anjum`;
  }, [project]);

  if (!project) return <NotFound message="That project doesn't exist. Try browsing all projects." />;
  if (project.id !== id) return <Navigate to={`/projects/${project.id}`} replace />;

  const index = projects.findIndex((item) => item.id === project.id);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const external = "noopener noreferrer";

  return (
    <article className="container-x pt-32 pb-24 sm:pt-40">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 transition hover:text-accent"
      >
        <ArrowLeft size={14} /> Back to projects
      </Link>

      <div className="mt-10 grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
        <div>
          <p className="eyebrow">{project.type}</p>
          <h1 className="display mt-5 text-[clamp(2.8rem,7vw,6rem)] leading-[0.9] text-cream">
            {project.name}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {project.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {isExternal(project.liveUrl) && (
              <a href={project.liveUrl} target="_blank" rel={external} className="btn btn-primary">
                <ExternalLink size={16} /> Live demo
              </a>
            )}
            {isExternal(project.githubUrl) && (
              <a href={project.githubUrl} target="_blank" rel={external} className="btn btn-ghost">
                <Github size={16} /> GitHub repo
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">Project</p>
            <p className="mt-1 font-mono text-sm text-cream">
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">Category</p>
            <p className="mt-1 text-sm text-cream">{project.category.join(" · ")}</p>
          </div>
        </div>
      </div>

      <Reveal className="mt-10">
        <ProjectImage
          src={project.image}
          alt={`${project.name} screenshot`}
          name={project.name}
          className="w-full rounded-[2rem] border border-white/10 object-cover"
        />
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <Reveal>
            <Block eyebrow="01" title="Overview">
              <Text value={project.overview} />
            </Block>
          </Reveal>
          <Reveal delay={0.04}>
            <Block eyebrow="02" title="Problem and goals">
              <Text value={project.problem} />
            </Block>
          </Reveal>
          <Reveal delay={0.08}>
            <Block eyebrow="03" title="Key features">
              <List items={project.features} />
            </Block>
          </Reveal>
          <Reveal delay={0.12}>
            <Block eyebrow="04" title="Challenges faced">
              <List items={project.challenges} />
            </Block>
          </Reveal>
          <Reveal delay={0.16}>
            <Block eyebrow="05" title="How they were solved">
              <List items={project.solutions} />
            </Block>
          </Reveal>
          <Reveal delay={0.2}>
            <Block eyebrow="06" title="Lessons learned">
              <List items={project.lessons} />
            </Block>
          </Reveal>
          <Reveal delay={0.24}>
            <Block eyebrow="07" title="Potential improvements">
              <List items={project.improvements} />
            </Block>
          </Reveal>
          <Reveal delay={0.28}>
            <Block eyebrow="08" title="Future plans">
              <List items={project.futurePlans} />
            </Block>
          </Reveal>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <p className="eyebrow">Tech stack</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((technology, technologyIndex) => (
                <li
                  key={`${technology}-${technologyIndex}`}
                  className="rounded-full border border-white/10 bg-ink/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-zinc-400"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <p className="eyebrow">My role</p>
            <div className="mt-3 text-sm leading-relaxed text-zinc-400">
              <Text value={project.role} />
            </div>
          </div>

          <Link
            to="/projects"
            className="group flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-accent/30 hover:bg-white/[0.05]"
          >
            <span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                Keep browsing
              </span>
              <span className="mt-1 block text-sm font-semibold text-cream">All projects</span>
            </span>
            <ArrowUpRight
              size={18}
              className="text-zinc-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </Link>
        </aside>
      </div>

      <nav aria-label="Project navigation" className="mt-14 grid gap-4 sm:grid-cols-2">
        <Link
          to={`/projects/${previous.id}`}
          className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-accent/30 hover:bg-white/[0.05]"
        >
          <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
            <ArrowLeft size={12} /> Previous
          </span>
          <span className="display mt-2 block text-xl text-cream transition group-hover:text-accent">
            {previous.name}
          </span>
        </Link>
        <Link
          to={`/projects/${next.id}`}
          className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-right transition hover:border-accent/30 hover:bg-white/[0.05]"
        >
          <span className="flex items-center justify-end gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
            Next <ArrowRight size={12} />
          </span>
          <span className="display mt-2 block text-xl text-cream transition group-hover:text-accent">
            {next.name}
          </span>
        </Link>
      </nav>
    </article>
  );
}
