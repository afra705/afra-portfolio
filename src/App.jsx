import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import AuroraBackground from "./components/AuroraBackground.jsx";
import CursorGlow from "./components/CursorGlow.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Home from "./pages/Home.jsx";
import AllProjects from "./pages/AllProjects.jsx";
import AllDesigns from "./pages/AllDesigns.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";
import NotFound from "./pages/NotFound.jsx";

function ScrollToTopOnRoute() {
  const { pathname, state } = useLocation();
  useEffect(() => {
    if (pathname !== "/" || !state?.scrollTo) window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, state]);
  return null;
}

const ease = [0.22, 1, 0.36, 1];

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/designs" element={<AllDesigns />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="grain relative">
      <AuroraBackground />
      <CursorGlow />
      <ScrollProgress />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <ScrollToTopOnRoute />
      <Navbar />
      <main id="main" className="relative z-10">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
}
