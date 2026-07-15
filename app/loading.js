export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-hairline border-t-accent" />
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Loading
        </p>
      </div>
    </div>
  );
}
