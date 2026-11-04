import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile } from "../data/profile.js";
import { scrollToId } from "../utils/scroll.js";

const links = [
  ["home", "Home"],
  ["about", "About"],
  ["skills", "Skills"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["services", "Services"],
  ["contact", "Contact"],
];

const ease = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) {
      setActive(pathname.startsWith("/projects") ? "projects" : "");
      return;
    }
    const elements = links.map(([id]) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [onHome, pathname]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (event, id) => {
    event.preventDefault();
    setOpen(false);
    if (onHome) scrollToId(id);
    else navigate("/", { state: { scrollTo: id } });
  };

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="container-x pt-4">
          <nav
            aria-label="Main"
            className={`flex items-center justify-between gap-3 rounded-full border px-3 py-2 transition-all duration-500 ${
              scrolled || open
                ? "border-white/10 bg-ink/80 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
                : "border-transparent bg-transparent"
            }`}
          >
            <Link
              to="/"
              onClick={(event) => go(event, "home")}
              aria-label={`${profile.name} — Home`}
              className="group flex shrink-0 items-center gap-3 rounded-full pl-1"
            >
              <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-[linear-gradient(120deg,#7c5cff,#bda9ff,#d4ff57)] bg-[length:200%_200%] font-display text-[13px] font-extrabold text-ink shadow-lg shadow-brand/30 transition duration-500 animate-gradient-pan group-hover:scale-105">
                {profile.initials}
              </span>
              <span className="leading-tight">
                <span className="block text-[13px] font-bold tracking-tight text-cream">
                  {profile.name}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500">
                  <span className="h-1 w-1 rounded-full bg-accent" /> Portfolio
                </span>
              </span>
            </Link>

            <div className="hidden items-center gap-0.5 lg:flex">
              {links.map(([id, label]) => (
                <a
                  key={id}
                  href={`/#${id}`}
                  onClick={(event) => go(event, id)}
                  aria-current={active === id ? "page" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${
                    active === id ? "text-cream" : "text-zinc-400 hover:text-cream"
                  }`}
                >
                  {active === id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.08]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    {label}
                    {active === id && (
                      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
                    )}
                  </span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/#contact"
                onClick={(event) => go(event, "contact")}
                className="btn btn-primary shine group hidden min-h-[40px] px-5 py-2 text-xs sm:inline-flex"
              >
                Let's talk
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-cream transition hover:border-accent/40 hover:bg-white/10 lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-ink/95 px-6 pb-10 pt-28 backdrop-blur-2xl lg:hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand/25 blur-[100px]"
            />
            <div className="relative flex-1">
              {links.map(([id, label], index) => (
                <motion.a
                  key={id}
                  href={`/#${id}`}
                  onClick={(event) => go(event, id)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.45, delay: 0.06 + index * 0.045, ease }}
                  className="group flex items-center justify-between border-b border-white/10 py-4"
                >
                  <span className="display text-4xl text-cream transition group-hover:translate-x-1 group-hover:text-accent">
                    {label}
                  </span>
                  <span aria-hidden="true" className="font-mono text-[10px] text-zinc-600">
                    0{index + 1}
                  </span>
                </motion.a>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="relative mt-8"
            >
              <a href={`mailto:${profile.email}`} className="btn btn-primary w-full">
                {profile.email} <ArrowUpRight size={16} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
