import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const springX = useSpring(x, { stiffness: 110, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 110, damping: 22, mass: 0.4 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed -left-[280px] -top-[280px] z-[1] hidden h-[560px] w-[560px] rounded-full lg:block"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle, rgba(139,92,246,0.16) 0%, rgba(139,92,246,0.05) 38%, transparent 70%)",
      }}
    />
  );
}
