import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Error
        </p>
        <h1 className="mt-3 font-mono text-7xl font-bold tracking-tighter text-ink-strong">
          404
        </h1>
        <h2 className="mt-4 text-xl font-medium text-ink-strong">
          Page not found
        </h2>
        <p className="mt-3 text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-1.5 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </div>
    </div>
  );
}
