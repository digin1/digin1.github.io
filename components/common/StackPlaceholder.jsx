/**
 * Stand-in artwork for projects without a public screenshot (internal or
 * institutional systems): the project's stack laid out on a quiet grid.
 */
export default function StackPlaceholder({ tags = [], label = 'Internal platform' }) {
  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-zinc-50 p-6 dark:bg-zinc-950"
      role="img"
      aria-label={`${label}${tags.length ? `: ${tags.join(', ')}` : ''}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(var(--accent-rgb) / 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--accent-rgb) / 0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />
      <p className="eyebrow relative">{label}</p>
      {tags.length > 0 && (
        <ul className="relative flex flex-wrap gap-2" aria-hidden="true">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-light-border bg-light-surface px-2.5 py-1 font-mono text-xs text-light-text-secondary shadow-card dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
