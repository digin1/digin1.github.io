import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function NavArrow({ item, basePath, direction }) {
  const icon = direction === 'prev' ? faChevronLeft : faChevronRight;
  const label = direction === 'prev' ? 'Previous' : 'Next';

  if (!item) {
    return (
      <span className="p-2 text-zinc-300 dark:text-zinc-700" aria-hidden="true">
        <FontAwesomeIcon icon={icon} className="h-3.5 w-3.5" />
      </span>
    );
  }

  return (
    <Link
      href={`${basePath}/${item.id}/`}
      title={item.title}
      aria-label={`${label}: ${item.title}`}
      className="rounded-lg border border-light-border bg-light-surface p-2 text-zinc-500 hover:text-neural-blue dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
    >
      <FontAwesomeIcon icon={icon} className="h-3.5 w-3.5" aria-hidden="true" />
    </Link>
  );
}

/**
 * "Back to …" link plus previous/next arrows, shown above case studies and posts.
 */
export default function PrevNextNav({ eyebrow, backHref, backLabel, basePath, prev, next }) {
  return (
    <nav
      aria-label={`${eyebrow} navigation`}
      className="mx-auto mb-6 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-b border-light-border pb-5 dark:border-zinc-800"
    >
      <div>
        <p className="eyebrow mb-1 flex">{eyebrow}</p>
        <Link
          href={backHref}
          className="group inline-flex items-center text-sm text-zinc-600 hover:text-light-text dark:text-zinc-400 dark:hover:text-ghost-white"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-3 w-3 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          {backLabel}
        </Link>
      </div>
      <div className="flex items-center gap-1">
        <NavArrow item={prev} basePath={basePath} direction="prev" />
        <NavArrow item={next} basePath={basePath} direction="next" />
      </div>
    </nav>
  );
}
