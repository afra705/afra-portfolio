import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../sections/Hero.jsx";
import About from "../sections/About.jsx";
import Skills from "../sections/Skills.jsx";
import Experience from "../sections/Experience.jsx";
import Projects from "../sections/Projects.jsx";
import Designs from "../sections/Designs.jsx";
import Services from "../sections/Services.jsx";
import Contact from "../sections/Contact.jsx";
import { scrollToId } from "../utils/scroll.js";

export default function Home() {
  const { state } = useLocation();

  useEffect(() => {
    document.title = "Afra Anjum — Frontend Developer & Digital Marketer";
    if (state?.scrollTo) {
      const timeout = setTimeout(() => scrollToId(state.scrollTo), 80);
      return () => clearTimeout(timeout);
    }
  }, [state]);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Designs />
      <Services />
      <Contact />
    </>
  );
}
