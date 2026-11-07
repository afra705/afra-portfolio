import { Mail, Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading.jsx";
import ContactForm from "../components/ContactForm.jsx";
import SocialLinks from "../components/SocialLinks.jsx";
import Reveal from "../components/Reveal.jsx";
import { profile } from "../data/profile.js";

export default function Contact() {
  const rows = [
    [Mail, "Email", profile.email, `mailto:${profile.email}`],
    profile.phone && [Phone, "Phone", profile.phone, `tel:${profile.phone.replace(/\s/g, "")}`],
    profile.whatsapp && [
      MessageCircle,
      "WhatsApp",
      `+${profile.whatsapp}`,
      `https://wa.me/${profile.whatsapp}`,
    ],
  ].filter(Boolean);

  return (
    <section
      id="contact"
      className="section-pad relative overflow-hidden"
      aria-labelledby="contact-h"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.18),transparent_70%)] blur-3xl"
      />
      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <SectionHeading
              id="contact-h"
              eyebrow="07 — Contact"
              title={
                <>
                  Have an idea?{" "}
                  <em className="font-serif font-normal italic tracking-[-0.02em] text-accent">
                    Let's make it real.
                  </em>
                </>
              }
              text="Open to job opportunities, freelance work, and collaboration. Tell me what you're building — I'll reply by email."
            />

            <Reveal delay={0.1} variant="blur" className="mt-9">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex flex-col gap-1 border-b border-white/15 pb-3 transition hover:border-accent/50"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-500">
                  Email me directly
                </span>
                <span className="display flex items-center gap-2 break-all text-base text-cream transition group-hover:text-accent sm:text-xl">
                  {profile.email}
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            </Reveal>

            <div className="mt-8 space-y-3">
              {rows.map(([Icon, label, value, href], index) => (
                <Reveal key={label} delay={0.1 + index * 0.06} variant="left">
                  <a
                    href={href}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-500 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-white/[0.06]"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand-light transition duration-500 group-hover:bg-accent group-hover:text-ink">
                      <Icon size={17} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                        {label}
                      </span>
                      <span className="block truncate text-sm font-medium text-cream">{value}</span>
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="ml-auto shrink-0 text-zinc-700 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.25} className="mt-8">
              <SocialLinks />
            </Reveal>
          </div>

          <Reveal delay={0.12} variant="scale" className="min-w-0">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
