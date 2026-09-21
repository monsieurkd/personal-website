"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "data", label: "Data Eng" },
  { key: "ai", label: "AI / ML" },
  { key: "swe", label: "Software" },
];

const CATEGORY_LABEL = { ai: "AI/ML", data: "Data", swe: "Software" };

// Sourced from the verified, repo-backed CV claims in cvkit data/base.yaml.
// Keep these in sync with base.yaml so the site and CV never drift.
const PROJECTS = [
  {
    title: "ROS-Bag Telemetry Analytics Pipeline",
    categories: ["data"],
    description:
      "An end-to-end pipeline over ROS 2 robot telemetry: raw bag recordings (IMU, odometry, LiDAR) are landed as partitioned Parquet, then transformed through a bronze→silver→gold medallion architecture in dbt and DuckDB. Derives sensor rates from the data rather than trusting nominal rates, so a session that silently dropped 35% of its IMU messages is flagged as degraded. Idempotency is proven, not claimed: make verify rebuilds the warehouse twice and compares the gold layer byte-for-byte.",
    tech: ["Python", "dbt", "DuckDB", "Parquet", "ROS 2"],
    href: "https://github.com/monsieurkd/rosbag-de-pipeline",
  },
  {
    title: "Multi-Agent Data-Engineering Swarm",
    categories: ["ai", "data"],
    description:
      "An autonomous multi-agent system that drives a data-engineering task end-to-end through role-specialised subagents (Planner, Builder, Verifier) in a plan-build-verify loop that returns a machine-checkable pass/fail. Reliability comes from agent design rather than prompting — each role has restricted tools and a file-based data contract is the sole hand-off between stages.",
    tech: ["Multi-agent orchestration", "Claude Code subagents", "Python"],
    href: "https://github.com/monsieurkd",
  },
  {
    title: "Voice Debrief",
    categories: ["ai", "data"],
    description:
      "An agentic LLM journaling app that turns unstructured spoken input into typed, schema-validated PostgreSQL rows: a small-model driver runs a reflect-then-probe interview, a strong model extracts Zod-validated structured data with a retry loop, and an editable document writes corrections back through the data layer rather than around it.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "Zod"],
    href: "https://github.com/monsieurkd/voice-debrief",
  },
  {
    title: "3D Representation Benchmark",
    categories: ["data", "ai"],
    description:
      "A controlled benchmark holding task, data and hardware fixed across four 3D representations (point cloud, dense voxel, sparse voxel, multi-view) on ModelNet40, varying only the representation to isolate its effect on compute. Found multi-view ran up to ~9x faster per epoch than dense voxel at comparable accuracy, and that parameter count did not predict speed.",
    tech: ["Python", "PyTorch", "NumPy", "ModelNet40"],
    href: "https://github.com/monsieurkd/3d-repr-benchmark",
  },
  {
    title: "Flappy Bird DQN",
    categories: ["ai"],
    description:
      "A Deep Q-Network built from scratch in PyTorch (experience replay, target network, epsilon-greedy) with no RL libraries, reaching a mean score of 28/30 pipes over 100 evaluation episodes. Structured into single-responsibility modules with deterministic PyTest coverage and a seeded, reproducible training pipeline.",
    tech: ["Python", "PyTorch", "PyTest", "NumPy"],
    href: "https://github.com/monsieurkd/flappy-bird-dqn",
  },
  {
    title: "Kaopiz Document-Image CV Pipeline",
    categories: ["data"],
    description:
      "A computer-vision pipeline in Python and OpenCV to detect and localise Japanese characters in document images, scripting reproducible preprocessing from raw images to extracted character regions using contour detection and morphological operations.",
    tech: ["Python", "OpenCV"],
    href: "https://github.com/monsieurkd",
  },
  {
    title: "Restaurant Management Platform",
    categories: ["swe", "data"],
    description:
      "A full-stack restaurant platform with an ASP.NET Core Web API (Dapper and parameterised raw SQL on PostgreSQL) and React frontends. Modelled a normalised PostgreSQL schema with constraints and indexes backing the hot read paths, routed real-time order data over WebSockets, and persisted third-party events (Stripe payments, Lightspeed POS sync) consistently alongside order records.",
    tech: ["C#", "ASP.NET Core", "Dapper", "PostgreSQL", "React"],
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
