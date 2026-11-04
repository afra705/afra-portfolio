import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound({ message = "The page you're looking for doesn't exist or has moved." }) {
  useEffect(() => {
    document.title = "Page not found — Afra Anjum";
  }, []);

  return (
    <section className="container-x flex min-h-[80vh] flex-col items-center justify-center pt-28 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Error 404</p>
      <p className="display mt-4 text-[clamp(6rem,22vw,14rem)] leading-none text-gradient">404</p>
      <h1 className="display mt-4 text-2xl text-cream sm:text-3xl">This page took a wrong turn.</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-500">{message}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={15} /> Back home
        </Link>
        <Link to="/projects" className="btn btn-ghost">
          All projects <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}
