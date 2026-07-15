"use client";

import { useState } from "react";
import { Check, Loader2, ArrowRight } from "lucide-react";

const FIELD_BASE =
  "w-full rounded-lg border border-hairline-strong bg-surface px-4 py-3 text-[15px] text-ink-strong placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulated submission — wire up to an API route or service when ready.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-4 rounded-2xl border border-accent/40 bg-accent-soft p-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-contrast">
          <Check className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-medium text-ink-strong">Message sent</h3>
          <p className="text-sm text-muted">
            Thanks for reaching out — I&apos;ll get back to you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
        />
        <Field
          id="email"
          type="email"
          label="Email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <Field
        id="subject"
        label="Subject"
        placeholder="Project enquiry"
        value={formData.subject}
        onChange={handleChange}
      />

      <div>
        <label
          htmlFor="message"
          className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className={`${FIELD_BASE} resize-none`}
          placeholder="Tell me about your project — or just say hello."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({ id, label, type = "text", placeholder, value, onChange }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className={FIELD_BASE}
      />
    </div>
  );
}
