import { useCallback, useRef } from "react";

/**
 * Tracks the pointer inside a card and exposes it as --mx / --my CSS variables.
 * Pair the returned ref/props with the `.spotlight-card` utility class.
 */
export default function useSpotlight() {
  const ref = useRef(null);

  const onPointerMove = useCallback((event) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    element.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);

  return { ref, onPointerMove };
}
