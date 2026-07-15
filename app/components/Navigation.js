"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  const isActive = (href) => {
    if (href.startsWith("/#")) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-white/70 backdrop-blur-xl dark:bg-[#0a0a0b]/70">
      <div className="mx-auto max-w-content px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="group flex items-center gap-2.5"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-ink-strong font-mono text-xs font-bold text-bg">
              DK
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-ink-strong">
              David Kieu
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive(link.href)
                    ? "text-ink-strong"
                    : "text-muted hover:text-ink-strong"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mx-2 h-5 w-px bg-hairline" />
            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink-strong transition-colors hover:bg-surface-hover"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-accent"
      />

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden border-b border-hairline bg-bg md:hidden"
        >
          <div className="mx-auto max-w-content px-6 py-3">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block rounded-md px-3 py-2.5 text-[15px] transition-colors hover:bg-surface-hover ${
                  isActive(link.href)
                    ? "text-ink-strong"
                    : "text-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
