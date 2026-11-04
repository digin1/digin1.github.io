import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

// Lead with the strongest paper (peer-reviewed, lead author), not just the newest.
function pickPrimary(publications) {
  return (
    publications.find(p => p.role === 'main-author' && p.metadata.status === 'published') ||
    publications.find(p => p.metadata.status === 'published') ||
    publications[0]
  );
}

export default function PublicationsPreview({ publications = [] }) {
  if (!publications.length) return null;

  const primary = pickPrimary(publications);
  const supporting = publications.filter(p => p !== primary).slice(0, 3);
  const { title, journal, year, doi, status, equalContribution } = primary.metadata;
  const isLead = primary.role === 'main-author';

  return (
    <section className="py-16 md:py-20" aria-labelledby="publications-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-3">03 / Publications</p>
              <h2 id="publications-heading" className="text-section-heading font-display font-normal text-light-text dark:text-ghost-white">
                Publications
              </h2>
            </div>
            <p className="text-sm text-light-text-secondary dark:text-muted-steel">
              {publications.length} papers in neuroscience and research software
            </p>
          </div>

          {/* Primary publication */}
          <article className="editorial-card p-6">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className={`rounded px-2 py-0.5 text-[11px] font-mono font-medium ${
                status === 'published' ? 'bg-signal-green/15 text-signal-green' : 'bg-plasma-purple/15 text-plasma-purple'
              }`}>
                {status === 'published' ? 'Peer-reviewed' : 'Preprint'}
              </span>
              {isLead && (
                <span className="rounded bg-neural-blue/15 px-2 py-0.5 text-[11px] font-mono font-medium text-neural-blue">
                  {equalContribution ? 'Co-first author' : 'First author'}
                </span>
              )}
            </div>
            <h3 className="text-xl font-display font-normal leading-snug text-light-text dark:text-ghost-white">{title}</h3>
            <p className="mt-2 text-sm text-light-text-secondary dark:text-muted-steel">
              <span className="italic">{journal}</span> &middot; {year}
            </p>
            {doi && (
              <a
                href={doi}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-neural-blue hover:text-synapse-cyan"
              >
                View publication
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" aria-hidden="true" />
              </a>
            )}
          </article>

          {/* Supporting publications */}
          {supporting.length > 0 && (
            <ul className="mt-4">
              {supporting.map(pub => (
                <li
                  key={`${pub.role}-${pub.id}`}
                  className="flex items-start justify-between gap-4 border-b border-light-border py-3 last:border-0 dark:border-zinc-800/60"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug text-light-text dark:text-zinc-300">{pub.metadata.title}</p>
                    <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                      {pub.metadata.status === 'published' ? '' : 'Preprint · '}
                      {pub.metadata.journal} &middot; {pub.metadata.year}
                    </p>
                  </div>
                  {pub.metadata.doi && (
                    <a
                      href={pub.metadata.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View publication: ${pub.metadata.title}`}
                      className="shrink-0 p-1 text-neural-blue hover:text-synapse-cyan"
                    >
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" aria-hidden="true" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6">
            <Link href="/publications/" className="inline-flex items-center gap-1.5 text-sm font-medium text-neural-blue hover:text-synapse-cyan">
              All {publications.length} publications
              <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
