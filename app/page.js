"use client";

import Link from "next/link";
import {
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import Navigation from "./components/Navigation";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Reveal from "./components/Reveal";

const SOCIALS = [
  { href: "https://github.com/monsieurkd", label: "GitHub", icon: Github },
  {
    href: "https://linkedin.com/in/david-kieu-tech",
    label: "LinkedIn",
    icon: Linkedin,
  },
  { href: "mailto:david.kieu25@gmail.com", label: "Email", icon: Mail },
];

const SKILL_GROUPS = [
  { label: "Languages", items: ["Python", "SQL", "TypeScript", "JavaScript", "C#", "Bash"] },
  { label: "Data Engineering", items: ["dbt", "DuckDB", "ETL Pipelines", "Medallion Architecture", "Parquet", "Data Quality Testing", "Dimensional Modelling", "Idempotent Builds"] },
  { label: "Databases & Storage", items: ["PostgreSQL", "DuckDB", "SQL Server", "Parquet", "Drizzle ORM", "Dapper"] },
  { label: "AI / ML", items: ["PyTorch", "OpenCV", "NumPy", "Deep Q-Learning", "Multi-agent LLM systems"] },
  { label: "Platform", items: ["AWS", "Docker", "Git", "CI/CD", "Linux", "Make"] },
];

const FACTS = [
  { icon: GraduationCap, label: "Education", value: "B. Computer Science (AI), Univ. of Adelaide" },
  { icon: Briefcase, label: "Experience", value: "Research Intern (ML) at Univ. of Adelaide; Kaopiz, Ecosmartvietnam" },
  { icon: MapPin, label: "Location", value: "Adelaide, Australia" },
  { icon: Sparkles, label: "Focus", value: "Data Engineering · Pipelines · Analytics" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Navigation />

      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        {/* dotted backdrop, faded out */}
        <div
          className="bg-dots pointer-events-none absolute inset-0 opacity-60"
          style={{
            maskImage:
              "radial-gradient(ellipse 65% 55% at 50% 35%, black, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 65% 55% at 50% 35%, black, transparent 72%)",
          }}
        />

        <div className="relative mx-auto flex min-h-screen max-w-content flex-col items-center justify-center px-6 pt-16 pb-20 text-center">
          <Reveal>
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-hairline bg-surface font-mono text-2xl font-bold text-ink-strong shadow-sm">
              DK
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3.5 py-1.5 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="pulse-dot absolute inline-flex h-2 w-2 rounded-full bg-accent" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono tracking-wide text-muted">
                Available for opportunities
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-5xl font-semibold tracking-tighter text-ink-strong sm:text-6xl md:text-7xl">
              David Kieu
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted md:text-xl">
              I build data pipelines that hold up in production — reliable,
              tested, and reproducible from raw source to queryable tables. I
              work in Python, SQL, dbt and DuckDB, with a background in AI and
              machine learning. Computer Science student at the University of
              Adelaide.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <Link
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
              >
                View my work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="/david-kieu-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-hairline-strong bg-surface px-6 py-3 text-sm font-medium text-ink-strong transition-colors hover:bg-surface-hover"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 flex items-center gap-1">
              {SOCIALS.map(({ href, label, icon: Icon }) => (
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
          </Reveal>
        </div>
      </section>

      {/* ===== About ===== */}
      <section id="about" className="border-t border-hairline py-24 md:py-32">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <p className="eyebrow mb-3">About</p>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink-strong sm:text-4xl">
              Data engineering with an obsession for reproducibility.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <Reveal delay={0.05}>
              <div className="space-y-5 text-lg leading-relaxed text-ink">
                <p>
                  I&apos;m David, a Computer Science (AI) student at the University
                  of Adelaide. I build data pipelines end-to-end — ingestion,
                  modelling and the quality checks that make the output
                  trustworthy — and I care as much about whether a pipeline can
                  be re-run as whether it runs at all.
                </p>
                <p className="text-muted">
                  Most recently I&apos;ve been a Research Intern in Machine
                  Learning at the University of Adelaide, building reproducible
                  Python experiment pipelines. Before that I worked as an ML
                  engineer at{" "}
                  <span className="font-medium text-ink-strong">Kaopiz</span>,
                  building computer-vision data pipelines for document images,
                  and as a software engineer at{" "}
                  <span className="font-medium text-ink-strong">
                    Ecosmartvietnam
                  </span>
                  .
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "Data pipelines",
                  "dbt & DuckDB",
                  "Data quality",
                  "Reproducible builds",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-hairline bg-surface px-3 py-1.5 text-sm text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-hairline bg-surface">
                <div className="divide-y divide-hairline">
                  {FACTS.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4 p-5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-hairline text-accent">
                        <Icon className="h-[18px] w-[18px]" />
                      </div>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-widest text-muted">
                          {label}
                        </p>
                        <p className="mt-1 text-[15px] text-ink-strong">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Skills ===== */}
      <section id="skills" className="border-t border-hairline bg-bg-subtle py-24 md:py-32">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <p className="eyebrow mb-3">Skills</p>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink-strong sm:text-4xl">
              Tools I reach for.
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-12 divide-y divide-hairline border-y border-hairline">
              {SKILL_GROUPS.map((group) => (
                <div
                  key={group.label}
                  className="grid gap-3 py-6 md:grid-cols-[220px_1fr] md:gap-8"
                >
                  <h3 className="font-mono text-sm uppercase tracking-widest text-muted">
                    {group.label}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg border border-hairline bg-surface px-3 py-1.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Projects ===== */}
      <Projects />

      {/* ===== Contact CTA ===== */}
      <section id="contact" className="border-t border-hairline bg-bg-subtle py-24 md:py-32">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-hairline bg-surface px-6 py-16 text-center sm:px-12">
              <p className="eyebrow mb-4">Contact</p>
              <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-ink-strong sm:text-5xl">
                Let&apos;s build something.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
                I&apos;m always interested in new opportunities and exciting
                projects. The fastest way to reach me is email.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="mailto:david.kieu25@gmail.com"
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
                >
                  <Mail className="h-4 w-4" />
                  david.kieu25@gmail.com
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-hairline-strong px-6 py-3 text-sm font-medium text-ink-strong transition-colors hover:bg-surface-hover"
                >
                  Contact form
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 flex items-center justify-center gap-1">
                {SOCIALS.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-bg hover:text-accent"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
