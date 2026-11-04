import { Lightbulb, Puzzle, Palette, Search, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import useSpotlight from "../utils/useSpotlight.js";
import { profile } from "../data/profile.js";

const highlights = [
  [Lightbulb, "Continuous learner"],
  [Puzzle, "Problem solver"],
  [Palette, "Creative thinker"],
  [Search, "Detail-oriented developer"],
];

function HighlightCard({ Icon, label }) {
  const { ref, onPointerMove } = useSpotlight();
  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      style={{ "--glow": "rgba(124,92,255,0.2)" }}
      className="spotlight-card group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-500 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-white/10"
    >
      <div className="flex items-center gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand-light transition duration-500 group-hover:bg-accent group-hover:text-ink">
          <Icon size={20} />
        </span>
        <span className="text-sm font-semibold text-cream">{label}</span>
      </div>
      <ArrowUpRight
        size={15}
        className="text-zinc-600 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
      />
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-pad relative" aria-labelledby="about-h">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="about-h"
              eyebrow="01 — About"
              title={
                <>
                  Curious by default,{" "}
                  <em className="font-serif font-normal italic tracking-[-0.02em] text-accent">
                    precise
                  </em>{" "}
                  by practice.
                </>
              }
            />
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-gradient-to-r from-accent/20 to-accent/70" />
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                {profile.role}
              </p>
            </motion.div>

            <Reveal delay={0.25} variant="blur" className="mt-10 hidden lg:block">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 blur-2xl" />
                <p className="font-serif text-lg italic leading-snug text-zinc-300">
                  “Good interfaces are quiet. Great ones make you feel something.”
                </p>
                <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-600">
                  Working principle
                </p>
              </div>
            </Reveal>
          </div>

          <div className="min-w-0">
            <Reveal variant="blur">
              <div className="space-y-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
                {profile.about.map((paragraph, index) => (
                  <p
                    key={index}
                    className={
                      index === 0
                        ? "sm:first-letter:float-left sm:first-letter:mr-3 sm:first-letter:font-serif sm:first-letter:text-6xl sm:first-letter:leading-[0.75] sm:first-letter:text-accent"
                        : ""
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                  Beyond code
                </span>
                {profile.hobbies.length ? (
                  profile.hobbies.map((hobby, index) => (
                    <motion.span
                      key={hobby}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="badge transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-cream"
                    >
                      <span className="h-1 w-1 rounded-full bg-accent" /> {hobby}
                    </motion.span>
                  ))
                ) : (
                  <span className="text-sm text-zinc-500">
                    Add hobbies in <code className="text-zinc-400">src/data/profile.js</code>.
                  </span>
                )}
              </div>
            </Reveal>

            <div className="mt-12 grid gap-3 sm:grid-cols-2">
              {highlights.map(([Icon, label], index) => (
                <Reveal key={label} delay={index * 0.06} variant="scale">
                  <HighlightCard Icon={Icon} label={label} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
