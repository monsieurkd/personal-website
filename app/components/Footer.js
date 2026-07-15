import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-bg">
      <div className="mx-auto max-w-content px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="text-base font-semibold tracking-tight text-ink-strong"
            >
              David Kieu
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Software engineer building thoughtful, performant software.
              Based in Adelaide, Australia — open to opportunities.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex items-center gap-1">
              {[
                {
                  href: "mailto:david.kieu25@gmail.com",
                  label: "Email",
                  icon: Mail,
                },
                {
                  href: "https://github.com/monsieurkd",
                  label: "GitHub",
                  icon: Github,
                },
                {
                  href: "https://linkedin.com/in/kieu-duc-tech",
                  label: "LinkedIn",
                  icon: Linkedin,
                },
              ].map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-hover hover:text-accent"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-hairline pt-6 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} David Kieu. All rights reserved.</p>
          <p className="tracking-wide">Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
