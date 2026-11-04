import { Github, Linkedin, Facebook, Twitter } from "lucide-react";
import { profile } from "../data/profile.js";

const map = [
  ["github", "GitHub", Github],
  ["linkedin", "LinkedIn", Linkedin],
  ["facebook", "Facebook", Facebook],
  ["twitter", "X (Twitter)", Twitter],
];

export default function SocialLinks({ className = "" }) {
  return (
    <ul className={`flex items-center gap-2.5 ${className}`}>
      {map
        .filter(([key]) => profile.socials[key])
        .map(([key, label, Icon]) => (
          <li key={key}>
            <a
              href={profile.socials[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} profile`}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-ink"
            >
              <Icon size={17} />
            </a>
          </li>
        ))}
    </ul>
  );
}
