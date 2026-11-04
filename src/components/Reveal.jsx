import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const presets = {
  up: (y) => ({ initial: { opacity: 0, y }, show: { opacity: 1, y: 0 } }),
  down: (y) => ({ initial: { opacity: 0, y: -y }, show: { opacity: 1, y: 0 } }),
  left: (y) => ({ initial: { opacity: 0, x: -y * 1.4 }, show: { opacity: 1, x: 0 } }),
  right: (y) => ({ initial: { opacity: 0, x: y * 1.4 }, show: { opacity: 1, x: 0 } }),
  scale: () => ({ initial: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } }),
  blur: (y) => ({
    initial: { opacity: 0, y, filter: "blur(12px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  }),
};

export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
  variant = "up",
  duration = 0.7,
  once = true,
}) {
  const reduce = useReducedMotion();
  const preset = (presets[variant] ?? presets.up)(y);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={preset.initial}
      whileInView={preset.show}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
