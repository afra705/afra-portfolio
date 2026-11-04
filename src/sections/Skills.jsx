import SectionHeading from "../components/SectionHeading.jsx";
import SkillCard from "../components/SkillCard.jsx";
import Reveal from "../components/Reveal.jsx";
import { skillGroups } from "../data/skills.js";

export default function Skills() {
  const total = skillGroups.reduce((count, group) => count + group.items.length, 0);

  return (
    <section
      id="skills"
      className="section-pad relative overflow-hidden border-y border-white/5 bg-white/[0.02]"
      aria-labelledby="skills-h"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-brand/15 blur-[110px]"
      />
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            id="skills-h"
            eyebrow="02 — Toolkit"
            title={
              <>
                A stack built for{" "}
                <em className="font-serif font-normal italic tracking-[-0.02em] text-accent">
                  range.
                </em>
              </>
            }
            text="Engineering, design-minded implementation, and digital marketing — the tools I reach for to take an idea from first sketch to launch."
          />
          <Reveal delay={0.15} className="hidden sm:block">
            <div className="flex items-end gap-6 pb-2">
              <div>
                <p className="display text-4xl text-cream">{String(total).padStart(2, "0")}</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                  skills
                </p>
              </div>
              <span className="h-10 w-px bg-white/10" />
              <div>
                <p className="display text-4xl text-cream">{String(skillGroups.length).padStart(2, "0")}</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                  disciplines
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal
              key={group.title}
              delay={index * 0.05}
              variant="blur"
              className={index === skillGroups.length - 1 ? "lg:col-span-2" : ""}
            >
              <SkillCard group={group} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
