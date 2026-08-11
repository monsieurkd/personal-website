"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI / ML" },
  { key: "data", label: "Data Eng" },
  { key: "swe", label: "Software" },
];

const CATEGORY_LABEL = { ai: "AI/ML", data: "Data", swe: "Software" };

// Sourced from the verified, repo-backed CV claims in cvkit data/base.yaml.
// Keep these in sync with base.yaml so the site and CV never drift.
const PROJECTS = [
  {
    title: "Voice Debrief",
    categories: ["ai"],
    description:
      "An agentic LLM journaling app: a small-model driver runs a reflect-then-probe interview, a strong model extracts Zod-validated structured rows, and an editable doc writes corrections straight back to the data layer.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "Zod"],
    href: "https://github.com/monsieurkd/voice-debrief",
  },
  {
    title: "Multi-Agent Data-Engineering Swarm",
    categories: ["ai", "data"],
    description:
      "An autonomous multi-agent system that drives a data-engineering task end-to-end through role-specialised subagents (Planner, Builder, Verifier) in a plan-build-verify loop that returns a machine-checkable pass/fail.",
    tech: ["Multi-agent orchestration", "Claude Code subagents", "Python"],
    href: "https://github.com/monsieurkd",
  },
  {
    title: "Flappy Bird DQN",
    categories: ["ai"],
    description:
      "A Deep Q-Network built from scratch in PyTorch (experience replay, target network, epsilon-greedy) with no RL libraries, reaching a mean score of 28/30 pipes over 100 evaluation episodes.",
    tech: ["Python", "PyTorch", "PyTest", "NumPy"],
    href: "https://github.com/monsieurkd/flappy-bird-dqn",
  },
  {
    title: "Kaopiz Document-Image CV Pipeline",
    categories: ["data"],
    description:
      "A computer-vision pipeline in Python and OpenCV to detect and localise Japanese characters in document images, using contour detection and morphological operations to extract character regions.",
    tech: ["Python", "OpenCV"],
    href: "https://github.com/monsieurkd",
  },
  {
    title: "Restaurant Management Platform",
    categories: ["swe"],
    description:
      "A full-stack restaurant platform with an ASP.NET Core Web API (Dapper and raw SQL on PostgreSQL) and React frontends, real-time order tracking over WebSockets, and Stripe + Lightspeed POS integration.",
    tech: ["C#", "ASP.NET Core", "Dapper", "PostgreSQL", "React"],
    href: "https://github.com/monsieurkd",
  },
  {
    title: "Discord Clone",
    categories: ["swe"],
    description:
      "The foundation of a Discord-style chat app with React and Node.js — JWT authentication (register, login, refresh) and a Socket.io WebSocket server scaffold, over a normalised PostgreSQL schema.",
    tech: ["Node.js", "React", "WebSocket", "PostgreSQL"],
    href: "https://github.com/monsieurkd",
  },
  {
    title: "Ecosmart Web Application",
    categories: ["swe"],
    description:
      "A full-stack web application built with Flask and PostgreSQL, architected and shipped end-to-end while leading a cross-functional team across the full software development lifecycle.",
    tech: ["Flask", "PostgreSQL", "JavaScript"],
    href: "https://github.com/monsieurkd",
  },
];

export default function Projects() {
  const [active, setActive] = useState("all");
  const shown =
    active === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.categories.includes(active));

  return (
    <section id="projects" className="border-t border-hairline py-24 md:py-32">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <p className="eyebrow mb-3">Selected Work</p>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink-strong sm:text-4xl">
            Things I&apos;ve built.
          </h2>
        </Reveal>

        {/* Filter tabs */}
        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = active === cat.key;
              const count =
                cat.key === "all"
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.categories.includes(cat.key)).length;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActive(cat.key)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-accent bg-accent text-accent-contrast"
                      : "border-hairline bg-surface text-muted hover:border-hairline-strong hover:text-ink-strong"
                  }`}
                >
                  {cat.label}
                  <span
                    className={`font-mono text-xs ${
                      isActive ? "opacity-70" : "opacity-60"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Card grid */}
        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((project) => (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-hairline bg-surface p-6 transition-colors hover:border-accent"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.categories.map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-hairline px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
                      >
                        {CATEGORY_LABEL[c]}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-ink-strong transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-hairline px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
