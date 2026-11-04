import Link from 'next/link';

export default function PrevNextNav({ eyebrow, backHref, backLabel, basePath, prev, next }) {
  return (
    <nav className="reading-navigation" aria-label={`${eyebrow} navigation`}>
      <Link href={backHref}>
        <span aria-hidden="true">←</span>
        {backLabel}
      </Link>
      {(prev || next) && (
        <div>
          {prev && (
            <Link
              href={`${basePath}/${prev.id}/`}
              title={prev.title}
              aria-label={`Previous: ${prev.title}`}
            >
              <span aria-hidden="true">←</span>
              <span className="reading-nav-label">Previous</span>
            </Link>
          )}
          {next && (
            <Link
              href={`${basePath}/${next.id}/`}
              title={next.title}
              aria-label={`Next: ${next.title}`}
            >
              <span className="reading-nav-label">Next</span>
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
