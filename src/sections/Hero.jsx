import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowDownRight, Download, MoveDown, Sparkles } from "lucide-react";
import SocialLinks from "../components/SocialLinks.jsx";
import Magnetic from "../components/Magnetic.jsx";
import Marquee from "../components/Marquee.jsx";
import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { skillGroups } from "../data/skills.js";
import { services } from "../data/services.js";
import { scrollToId } from "../utils/scroll.js";

const ease = [0.22, 1, 0.36, 1];

const marqueeItems = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "UI Engineering",
  "SEO",
  "Digital Marketing",
];

/** A masked line that slides up into view. */
function MaskLine({ children, delay = 0 }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block will-change-transform"
        initial={{ y: "112%", rotate: 2.5 }}
        animate={{ y: "0%", rotate: 0 }}
        transition={{ duration: 1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Counts a number up once it enters view. Falls back for non-numeric values. */
function StatValue({ value }) {
  const numeric = /^\d+$/.test(value);
  const target = numeric ? Number(value) : 0;
  const ref = useRef(null);
  const [current, setCurrent] = useState(numeric ? 0 : null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!numeric || reduce) return;
    const element = ref.current;
    if (!element) return;
    let frame = 0;
    let started = false;

    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / 1400, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCurrent(Math.round(eased * target));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [numeric, reduce, target]);

  if (!numeric) return <span ref={ref}>{value}</span>;
  return <span ref={ref}>{String(current ?? 0).padStart(2, "0")}</span>;
}

export default function Hero() {
  const [imgFailed, setImgFailed] = useState(false);
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const reduce = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 18 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  const techCount = new Set(skillGroups.flatMap((group) => group.items.map((item) => item.name))).size;

  const stats = [
    [String(projects.length).padStart(2, "0"), "Projects shipped"],
    [String(techCount).padStart(2, "0"), "Tools in the kit"],
    [String(services.length).padStart(2, "0"), "Ways to collaborate"],
    ["∞", "Curiosity"],
  ];

  const handleTilt = (event) => {
    if (!cardRef.current || reduce) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 12);
    rotateX.set(py * -12);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-10 pt-24 sm:pt-28"
    >
      {/* Ambient hero glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 -z-0 h-[38rem] w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.3),rgba(212,255,87,0.06)_45%,transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-24 -z-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="container-x relative">
        {/* Meta bar */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease }}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.08] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for work
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
              {profile.role}
            </span>
          </div>
          <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600 md:flex">
            Portfolio — 2026
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent/70" />
            Scroll to explore
          </span>
        </motion.div>

        {/* Headline + portrait */}
        <div className="mt-8 grid gap-12 lg:mt-10 lg:grid-cols-[1.15fr_auto] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <motion.h1
              style={reduce ? undefined : { y: headlineY, opacity: headlineOpacity }}
              className="display text-[clamp(2.4rem,5.6vw,5.5rem)] leading-[0.92] text-cream"
            >
              <MaskLine delay={0.12}>Designing digital</MaskLine>
              <MaskLine delay={0.2}>experiences that</MaskLine>
              <MaskLine delay={0.28}>
                <span className="inline-flex items-baseline gap-[0.12em]">
                  <em className="font-serif font-normal italic tracking-[-0.02em] text-gradient">
                    move
                  </em>
                  <span className="text-zinc-500">people.</span>
                </span>
              </MaskLine>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.5, ease }}
              className="mt-6 max-w-xl"
            >
              <p className="text-base leading-relaxed text-zinc-400 sm:text-lg">
                I'm <span className="font-semibold text-cream">{profile.name}</span> — a frontend
                developer and digital marketer crafting fast, expressive interfaces that also{" "}
                <span className="text-accent">grow the business behind them.</span>
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <button
                    type="button"
                    onClick={() => scrollToId("projects")}
                    className="btn btn-primary shine group"
                  >
                    Explore selected work
                    <ArrowDownRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                    />
                  </button>
                </Magnetic>
                {profile.resumeAvailable ? (
                  <a href={profile.resumeUrl} download className="btn btn-ghost group">
                    Download resume
                    <Download
                      size={16}
                      className="transition-transform group-hover:translate-y-0.5"
                    />
                  </a>
                ) : (
                  <button type="button" disabled title="Resume coming soon" className="btn btn-ghost">
                    Download resume <Download size={16} />
                  </button>
                )}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <SocialLinks />
                <span className="hidden h-px w-12 bg-white/15 sm:block" />
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-600 sm:block">
                  Say hello
                </span>
              </div>
            </motion.div>
          </div>

          {/* Portrait card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 26 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.22, ease }}
            style={reduce ? undefined : { y: portraitY, scale: portraitScale }}
            className="relative mx-auto w-full max-w-[16rem] min-w-0 sm:max-w-[18rem] lg:mx-0 lg:max-w-[19rem]"
          >
            <div className="pointer-events-none absolute -inset-6 animate-spin-slow sm:-inset-8">
              <svg viewBox="0 0 200 200" className="h-full w-full">
                <defs>
                  <linearGradient id="orbit-ring" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#d4ff57" stopOpacity="0.9" />
                    <stop offset="55%" stopColor="#7c5cff" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#d4ff57" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle
                  cx="100"
                  cy="100"
                  r="97"
                  fill="none"
                  stroke="url(#orbit-ring)"
                  strokeWidth="0.8"
                  strokeDasharray="1.5 7"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-brand/40 via-transparent to-accent/25 blur-2xl" />

            <motion.div
              ref={cardRef}
              onPointerMove={handleTilt}
              onPointerLeave={resetTilt}
              style={reduce ? undefined : { rotateX: springX, rotateY: springY, transformPerspective: 1200 }}
              className="border-beam relative rounded-[2.6rem]"
            >
              <div className="relative overflow-hidden rounded-[2.6rem] border border-white/10 bg-surface p-2.5 shadow-2xl shadow-black/60">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand/25 to-ink">
                  {imgFailed ? (
                    <div className="flex h-full w-full items-center justify-center font-display text-8xl font-extrabold text-brand-light">
                      {profile.initials}
                    </div>
                  ) : (
                    <img
                      src={profile.profileImage}
                      alt={`Portrait of ${profile.name}`}
                      onError={() => setImgFailed(true)}
                      className="h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,255,87,0.14),transparent_55%)]" />

                  {/* Corner ticks */}
                  <span aria-hidden="true" className="absolute left-4 top-4 h-5 w-5 border-l border-t border-white/40" />
                  <span aria-hidden="true" className="absolute right-4 top-4 h-5 w-5 border-r border-t border-white/40" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent p-5 pt-10">
                    <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-accent">
                      Portfolio / 2026
                    </p>
                    <p className="display mt-2 text-xl text-cream">{profile.name}</p>
                    <p className="mt-1 text-[11px] leading-snug text-zinc-300">{profile.role}</p>
                  </div>
                </div>
              </div>

              <motion.span
                className="glass absolute -left-5 top-16 hidden items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold text-cream shadow-xl sm:flex"
                animate={reduce ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles size={13} className="text-accent" /> React &amp; Next.js
              </motion.span>
              <motion.span
                className="glass absolute -right-4 bottom-24 hidden items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold text-cream shadow-xl sm:flex"
                animate={reduce ? undefined : { y: [0, 9, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Motion-first UI
              </motion.span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.button
          type="button"
          onClick={() => scrollToId("about")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-9 hidden items-center gap-3 text-left font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-600 transition hover:text-accent lg:inline-flex"
        >
          <span className="relative flex h-10 w-[22px] items-start justify-center overflow-hidden rounded-full border border-white/15">
            <span className="mt-1.5 h-1.5 w-1.5 animate-scroll-cue rounded-full bg-accent motion-reduce:animate-none" />
          </span>
          Scroll to discover
          <ArrowDown size={13} />
        </motion.button>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease }}
        className="container-x relative mt-8 grid grid-cols-2 gap-y-7 border-y border-white/10 py-6 sm:grid-cols-4 sm:divide-x sm:divide-white/10"
      >
        {stats.map(([value, label]) => (
          <div key={label} className="flex items-baseline gap-3 px-0 sm:flex-col sm:gap-1 sm:px-8 sm:first:pl-0">
            <span className="display text-4xl leading-none text-cream sm:text-5xl">
              <StatValue value={value} />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">{label}</span>
          </div>
        ))}
      </motion.div>

      <div className="relative mt-6 border-y border-white/10 py-4">
        <Marquee items={marqueeItems} />
      </div>

      {/* Floating corner mark */}
      <span className="pointer-events-none absolute bottom-6 right-6 hidden font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-700 lg:block">
        <MoveDown size={12} className="inline" aria-hidden="true" /> est. 2026
      </span>
    </section>
  );
}
