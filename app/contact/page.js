import Link from "next/link";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import ContactForm from "../components/ContactForm";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with David Kieu — for project enquiries, collaborations, or just to say hello.",
};

const METHODS = [
  {
    icon: Mail,
    label: "Email",
    value: "david.kieu25@gmail.com",
    href: "mailto:david.kieu25@gmail.com",
    note: "Best for project enquiries",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "/in/kieu-duc-tech",
    href: "https://linkedin.com/in/kieu-duc-tech",
    note: "Professional profile",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "/monsieurkd",
    href: "https://github.com/monsieurkd",
    note: "Open source & projects",
  },
];

const FAQ = [
  {
    q: "What's your typical response time?",
    a: "I usually respond to emails within 24 hours on business days. For urgent matters, mention it in the subject line.",
  },
  {
    q: "What types of projects do you take on?",
    a: "Web applications, full-stack features, and computer-vision work — typically with React, Next.js, Node.js, and Python.",
  },
  {
    q: "Are you open to remote or international work?",
    a: "Yes. I'm based in Adelaide, Australia and comfortable working across time zones with async-first communication.",
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Navigation />

      <section className="border-b border-hairline pt-32 pb-16 md:pt-40">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <p className="eyebrow mb-3">Contact</p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-ink-strong sm:text-5xl md:text-6xl">
              Get in touch.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Have a project in mind or want to collaborate? I&apos;d love to hear
              from you — let&apos;s figure out how to bring it to life.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact methods */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-3">
              {METHODS.map(({ icon: Icon, label, value, href, note }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group rounded-2xl border border-hairline bg-surface p-6 transition-colors hover:border-accent"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-hairline text-accent">
                      <Icon className="h-[18px] w-[18px]" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                  <p className="mt-5 font-mono text-xs uppercase tracking-widest text-muted">
                    {label}
                  </p>
                  <p className="mt-1 break-words text-[15px] font-medium text-ink-strong">
                    {value}
                  </p>
                  <p className="mt-1 text-sm text-muted">{note}</p>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section className="border-t border-hairline py-16 md:py-20">
        <div className="mx-auto max-w-content px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow mb-3">Message</p>
              <h2 className="text-2xl font-semibold tracking-tight text-ink-strong sm:text-3xl">
                Send me a message.
              </h2>
              <p className="mt-4 max-w-sm text-muted">
                Fill out the form and I&apos;ll get back to you as soon as I can.
                Prefer email? Use any of the links above.
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-hairline py-16 md:py-20">
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <p className="eyebrow mb-3">FAQ</p>
            <h2 className="text-2xl font-semibold tracking-tight text-ink-strong sm:text-3xl">
              Good to know.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-10 divide-y divide-hairline border-y border-hairline">
              {FAQ.map((item) => (
                <div key={item.q} className="py-6">
                  <h3 className="text-lg font-medium text-ink-strong">{item.q}</h3>
                  <p className="mt-2 max-w-2xl text-muted">{item.a}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
