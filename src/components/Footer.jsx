import { ArrowUp, Mail, ArrowUpRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SocialLinks from "./SocialLinks.jsx";
import { profile } from "../data/profile.js";
import { scrollToId } from "../utils/scroll.js";

const links = [
  ["home", "Home"],
  ["about", "About"],
  ["skills", "Skills"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["designs", "Designs"],
  ["services", "Services"],
  ["contact", "Contact"],
];

export default function Footer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const go = (event, id) => {
    event.preventDefault();
    if (pathname === "/") scrollToId(id);
    else navigate("/", { state: { scrollTo: id } });
  };

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/10 bg-ink/60">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[46rem] -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]"
      />

      <div className="container-x relative pt-16 pb-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="min-w-0">
            <p className="eyebrow">Let's build something</p>
            <a
              href={`mailto:${profile.email}`}
              className="group display mt-4 flex items-center gap-3 break-words text-base text-cream transition hover:text-accent sm:text-lg"
            >
              {profile.email}
              <ArrowUpRight
                size={22}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-500">{profile.tagline}</p>
            <SocialLinks className="mt-6" />
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">Sitemap</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1">
              {links.map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`/#${id}`}
                    onClick={(event) => go(event, id)}
                    className="group inline-flex items-center gap-2 py-1.5 text-sm text-zinc-400 transition hover:text-accent"
                  >
                    <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-3" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">Get in touch</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-zinc-300 transition hover:text-accent"
            >
              <Mail size={15} /> Email
            </a>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="btn btn-ghost group min-h-[42px] px-5 py-2 text-xs"
              >
                <ArrowUp
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                Back to top
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="display select-none break-words bg-gradient-to-b from-white/[0.12] to-white/[0.02] bg-clip-text text-[clamp(2.5rem,9vw,7rem)] leading-none text-transparent"
          >
            {profile.name}
          </motion.p>
          <div className="mt-6 flex flex-col gap-3 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
            <p className="font-mono uppercase tracking-[0.2em]">Designed &amp; built with care</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
