import { useEffect, useRef, useState } from "react";
import { ChevronDown, Loader2, Send } from "lucide-react";
import { profile } from "../data/profile.js";

const empty = { name: "", email: "", subject: "", service: "Web Development", message: "" };
const SERVICES = ["Web Development", "Digital Marketing", "Both", "Other"];
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

export default function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", msg: "" });
  const busy = useRef(false);

  useEffect(() => {
    const handler = (event) => setValues((current) => ({ ...current, service: event.detail }));
    window.addEventListener("select-service", handler);
    return () => window.removeEventListener("select-service", handler);
  }, []);

  const set = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }));

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your full name.";
    if (!values.email.trim()) next.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email))
      next.email = "Enter a valid email, like name@example.com.";
    if (!values.subject.trim()) next.subject = "Please add a subject.";
    if (values.message.trim().length < 10) next.message = "Please write at least 10 characters.";
    return next;
  };

  const submit = async (event) => {
    event.preventDefault();
    if (busy.current) return;
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    busy.current = true;
    setStatus({ type: "loading", msg: "" });

    try {
      if (ENDPOINT) {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error("Request failed");
        setStatus({ type: "success", msg: "Thanks! Your message was sent. I'll get back to you soon." });
        setValues(empty);
      } else {
        const body = `Name: ${values.name}\nEmail: ${values.email}\nService: ${values.service}\n\n${values.message}`;
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
          values.subject
        )}&body=${encodeURIComponent(body)}`;
        setStatus({
          type: "info",
          msg: "Your email app should open with the message ready to send. Nothing is sent until you press Send there.",
        });
      }
    } catch {
      setStatus({ type: "error", msg: `Something went wrong. Please email me directly at ${profile.email}.` });
    } finally {
      busy.current = false;
    }
  };

  const field = (id, label, extra = {}) => (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-[9px] uppercase tracking-[0.22em] text-zinc-500">
        {label}
      </label>
      {extra.as === "textarea" ? (
        <textarea
          id={id}
          rows={5}
          value={values[id]}
          onChange={set(id)}
          className={`input resize-none ${errors[id] ? "border-red-400/60" : ""}`}
          aria-invalid={Boolean(errors[id])}
          aria-describedby={errors[id] ? `${id}-err` : undefined}
        />
      ) : extra.as === "select" ? (
        <div className="relative">
          <select
            id={id}
            value={values[id]}
            onChange={set(id)}
            className={`input appearance-none pr-10 ${errors[id] ? "border-red-400/60" : ""}`}
          >
            {SERVICES.map((service) => (
              <option key={service} className="bg-surface">
                {service}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />
        </div>
      ) : (
        <input
          id={id}
          type={extra.type || "text"}
          value={values[id]}
          onChange={set(id)}
          autoComplete={extra.ac}
          className={`input ${errors[id] ? "border-red-400/60" : ""}`}
          aria-invalid={Boolean(errors[id])}
          aria-describedby={errors[id] ? `${id}-err` : undefined}
        />
      )}
      {errors[id] && (
        <p id={`${id}-err`} className="mt-1.5 text-xs text-red-400">
          {errors[id]}
        </p>
      )}
    </div>
  );

  const color = { success: "text-green-400", error: "text-red-400", info: "text-accent" }[status.type];

  return (
    <form
      onSubmit={submit}
      noValidate
      className="group/form relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 backdrop-blur-sm sm:p-8"
    >
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/20 blur-3xl transition duration-700 group-hover/form:bg-brand/30" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-accent/[0.07] blur-3xl" />

      <div className="relative flex items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Project brief</p>
          <h3 className="display mt-2 text-2xl text-cream">Tell me what you're building</h3>
        </div>
        <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500 sm:inline-flex">
          01 / 01
        </span>
      </div>

      <div className="relative mt-7 grid gap-5 sm:grid-cols-2">
        {field("name", "Full name", { ac: "name" })}
        {field("email", "Email address", { type: "email", ac: "email" })}
      </div>
      <div className="relative mt-5">{field("subject", "Subject")}</div>
      <div className="relative mt-5">{field("service", "Service interested in", { as: "select" })}</div>
      <div className="relative mt-5">{field("message", "Message", { as: "textarea" })}</div>

      <button
        type="submit"
        disabled={status.type === "loading"}
        className="btn btn-primary shine relative mt-6 w-full"
      >
        {status.type === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send size={16} /> Send message
          </>
        )}
      </button>

      {status.msg && (
        <p role="status" className={`relative mt-4 text-xs leading-relaxed ${color}`}>
          {status.msg}
        </p>
      )}
    </form>
  );
}
