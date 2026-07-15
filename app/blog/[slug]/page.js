"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug;

  // Would normally come from a database or CMS.
  const post = {
    title: "Building Scalable React Applications",
    date: "May 15, 2025",
    readTime: 8,
    category: "React",
    author: "David Kieu",
    content: `
      <h2>Introduction</h2>
      <p>Building scalable React applications is one of the most important skills for modern web developers. As applications grow in complexity, maintaining clean, efficient, and scalable code becomes crucial for long-term success.</p>

      <h2>Component Architecture</h2>
      <p>The foundation of any scalable React application is a well-thought-out component architecture. Here are the key principles to follow:</p>
      <ul>
        <li><strong>Single Responsibility Principle:</strong> Each component should have one clear purpose</li>
        <li><strong>Composition over Inheritance:</strong> Use composition to build complex UIs from simple components</li>
        <li><strong>Prop Drilling Avoidance:</strong> Use Context API or state management libraries for deep data passing</li>
      </ul>

      <h2>State Management</h2>
      <p>As your application grows, managing state becomes increasingly important. Consider these approaches:</p>
      <ol>
        <li><strong>Local State:</strong> Use useState for component-specific state</li>
        <li><strong>Context API:</strong> Great for app-wide state that doesn't change frequently</li>
        <li><strong>Redux/Zustand:</strong> For complex state logic and frequent updates</li>
      </ol>

      <h2>Performance Optimization</h2>
      <p>Performance is crucial for user experience. Key optimization techniques include:</p>
      <ul>
        <li>React.memo for preventing unnecessary re-renders</li>
        <li>useMemo and useCallback for expensive calculations</li>
        <li>Code splitting with React.lazy and Suspense</li>
        <li>Virtual scrolling for large lists</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Building scalable React applications requires careful planning, good architecture decisions, and continuous refactoring. By following these principles and best practices, you can create applications that are maintainable, performant, and ready to grow with your business needs.</p>
    `,
  };

  return (
    <div className="min-h-screen bg-bg text-ink">
      <Navigation />

      <article className="pt-32 pb-16 md:pt-40">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to writing
          </Link>

          <header className="mt-8 mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                {post.category}
              </span>
              <span className="h-1 w-1 rounded-full bg-hairline-strong" />
              <span className="font-mono text-xs text-muted">
                {post.readTime} min read
              </span>
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-ink-strong sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center font-mono text-sm text-muted">
              <span>By {post.author}</span>
              <span className="mx-2">·</span>
              <span>{post.date}</span>
            </div>
          </header>

          <div
            className="prose-minimal"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share */}
          <div className="mt-14 border-t border-hairline pt-8">
            <p className="eyebrow mb-4">Share</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "LinkedIn", href: "https://linkedin.com/in/kieu-duc-tech" },
                { label: "Twitter", href: "#" },
                { label: "Email", href: "mailto:david.kieu25@gmail.com" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-1.5 rounded-lg border border-hairline px-4 py-2 text-sm text-ink-strong transition-colors hover:border-accent hover:text-accent"
                >
                  {s.label}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Author */}
          <div className="mt-10 rounded-2xl border border-hairline bg-surface p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink-strong font-mono text-sm font-bold text-bg">
                DK
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  Written by
                </p>
                <h3 className="mt-1 text-lg font-medium text-ink-strong">
                  David Kieu
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Software engineer and Computer Science student at the University
                  of Adelaide — full-stack, computer vision, and game development.
                </p>
                <div className="mt-3 flex gap-4 text-sm">
                  <a
                    href="https://linkedin.com/in/kieu-duc-tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/monsieurkd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
