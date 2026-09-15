export function PlotMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="3" y="3" width="26" height="26" rx="3" fill="currentColor" opacity="0.12" />
      <path
        d="M3.5 3.5h25v25h-25z M16 3.5v25 M3.5 16h25 M10 3.5v8 M22 20.5v8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="22" cy="10" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
