import SectionHeading from "../components/SectionHeading.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import Reveal from "../components/Reveal.jsx";
import { services, servicesIntro } from "../data/services.js";
import { scrollToId } from "../utils/scroll.js";

export default function Services() {
  const select = (service) => {
    window.dispatchEvent(new CustomEvent("select-service", { detail: service.formValue }));
    scrollToId("contact");
  };

  return (
    <section
      id="services"
      className="section-pad relative overflow-hidden border-y border-white/5 bg-white/[0.02]"
      aria-labelledby="serv-h"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
      />
      <div className="container-x relative">
        <SectionHeading
          id="serv-h"
          eyebrow="06 — Services"
          title={
            <>
              How we can{" "}
              <em className="font-serif font-normal italic tracking-[-0.02em] text-accent">
                work together.
              </em>
            </>
          }
          text={servicesIntro.text}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.08} variant="blur" className="min-w-0">
              <ServiceCard service={service} onSelect={select} index={index} />
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-zinc-500">
          {servicesIntro.footnote}{" "}
          <button
            type="button"
            onClick={() => scrollToId("contact")}
            className="font-semibold text-cream underline decoration-accent/50 underline-offset-4 transition hover:text-accent"
          >
            Start a conversation
          </button>
        </p>
      </div>
    </section>
  );
}
