import { motion } from "framer-motion";
import useSpotlight from "../utils/useSpotlight.js";

export default function SkillCard({ group, index = 0 }) {
  const { ref, onPointerMove } = useSpotlight();
  const learning = group.items.filter((item) => item.status === "learning").length;

  return (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      style={{ "--glow": "rgba(124,92,255,0.18)" }}
      className="spotlight-card group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-500 hover:-translate-y-1 hover:border-accent/30 hover:bg-white/[0.05]"
    >
      <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/25 opacity-0 blur-3xl transition duration-700 group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-x-7 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent via-brand-light to-transparent transition-transform duration-700 group-hover:scale-x-100" />

      <div className="relative flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600 transition group-hover:text-accent/80">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500">
          {group.items.length} skills
        </span>
      </div>

      <h3 className="display relative mt-8 text-2xl leading-tight text-cream">{group.title}</h3>

      <ul className="relative mt-6 flex flex-wrap gap-2">
        {group.items.map((item, itemIndex) => (
          <motion.li
            key={item.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min(itemIndex * 0.025, 0.3) }}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-ink/60 px-3 py-1.5 text-xs text-zinc-300 transition duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-cream"
          >
            {item.name}
            {item.status === "learning" && (
              <span className="rounded-full bg-brand/25 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-brand-light">
                Learning
              </span>
            )}
          </motion.li>
        ))}
      </ul>

      <div className="relative mt-7 flex items-center gap-3 border-t border-white/5 pt-4">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/5">
          <motion.span
            className="block h-full rounded-full bg-gradient-to-r from-brand via-brand-light to-accent"
            initial={{ width: 0 }}
            whileInView={{ width: `${Math.round((1 - learning / group.items.length) * 100)}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-600">
          {learning ? `${learning} learning` : "core"}
        </span>
      </div>
    </article>
  );
}
