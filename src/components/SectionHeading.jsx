import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

export default function SectionHeading({ id, eyebrow, title, text, className = "", align = "left" }) {
  const centered = align === "center";

  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        >
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-accent/20 to-accent" />
          <p className="eyebrow">{eyebrow}</p>
        </motion.div>
      )}

      <motion.h2
        id={id}
        initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.8, delay: 0.05, ease }}
        className="display mt-5 text-balance text-4xl leading-[0.94] sm:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>

      {text && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.12, ease }}
          className={`mt-5 max-w-xl text-base leading-relaxed text-zinc-400 ${
            centered ? "mx-auto" : ""
          }`}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}
