import { useState } from "react";

export default function ProjectImage({
  src,
  alt,
  name,
  className = "",
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex min-h-[220px] w-full items-center justify-center bg-gradient-to-br from-brand/30 via-surface to-ink ${className}`}
      >
        <span className="px-4 text-center text-xl font-bold text-brand-light/80">
          {name}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`block w-full max-w-none ${className}`}
    />
  );
}