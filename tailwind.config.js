/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Instrument Sans"', "system-ui", "sans-serif"],
        display: ['"Bricolage Grotesque"', '"Instrument Sans"', "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        ink: "#05050a",
        surface: "#0b0b14",
        cream: "#f7f4ec",
        accent: "#d4ff57",
        brand: { DEFAULT: "#7c5cff", light: "#bda9ff", dark: "#5b32d6" },
      },
      letterSpacing: {
        tightest: "-0.055em",
      },
      boxShadow: {
        glass: "inset 0 1px 0 0 rgba(255,255,255,0.08)",
        glow: "0 30px 90px -30px rgba(124,92,255,0.55)",
        "glow-accent": "0 24px 70px -24px rgba(212,255,87,0.45)",
      },
      backgroundImage: {
        "radial-fade": "radial-gradient(circle at center, var(--tw-gradient-stops))",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "50%": { transform: "translate3d(0,-18px,0) rotate(2deg)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "gradient-pan": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.12)" },
        },
        "scroll-cue": {
          "0%": { transform: "translateY(-60%)", opacity: "0" },
          "35%": { opacity: "1" },
          "100%": { transform: "translateY(180%)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float-slow 11s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        "gradient-pan": "gradient-pan 9s linear infinite",
        shimmer: "shimmer 2.6s ease-in-out infinite",
        breathe: "breathe 6s ease-in-out infinite",
        "scroll-cue": "scroll-cue 2.2s cubic-bezier(0.22,1,0.36,1) infinite",
      },
    },
  },
  plugins: [],
};
