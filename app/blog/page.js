"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { posts as POSTS } from "./posts";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(POSTS.map((post) => post.category))];
  const filteredPosts =
    selectedCategory === "All"
      ? POSTS
      : POSTS.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-bg text-ink">
      <Navigation />

      {/* Header */}
      <section className="border-b border-hairline pt-32 pb-16 md:pt-40">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <p className="eyebrow mb-3">Writing</p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-ink-strong sm:text-5xl md:text-6xl">
              Notes on building software.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Deeper dives into AI systems, multi-agent design, and building
              software you can actually trust.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Category filter */}
      <section className="border-b border-hairline py-6">
        <div className="mx-auto max-w-content px-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  selectedCategory === category
                    ? "border-accent bg-accent text-accent-contrast"
                    : "border-hairline text-muted hover:border-hairline-strong hover:text-ink-strong"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-content px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <Reveal key={post.slug} delay={(index % 3) * 0.05}>
                <article className="group flex h-full flex-col rounded-2xl border border-hairline bg-surface p-6 transition-colors hover:border-accent">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-accent">
                      {post.category}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {post.readTime} min
                    </span>
                  </div>
                  <h2 className="mt-4 text-xl font-medium leading-snug text-ink-strong">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4">
                    <span className="font-mono text-xs text-muted">
                      {post.date}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-ink-strong"
                    >
                      Read
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-hairline py-16 md:py-20">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <div className="rounded-3xl border border-hairline bg-surface px-6 py-12 text-center sm:px-12">
              <p className="eyebrow mb-3">Newsletter</p>
              <h2 className="text-2xl font-semibold tracking-tight text-ink-strong sm:text-3xl">
                Stay in the loop.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-muted">
                Get notified when I publish something new. No spam, unsubscribe
                anytime.
              </p>
              <form className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="flex-1 rounded-lg border border-hairline-strong bg-bg px-4 py-3 text-[15px] text-ink-strong placeholder:text-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
