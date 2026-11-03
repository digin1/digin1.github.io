import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faFilePdf, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

/**
 * Publications page: every paper in one list, newest first.
 */
export default function PublicationsList({ publications = [] }) {
  const total = publications.length;
  const published = publications.filter(p => p.metadata.status === 'published').length;
  const preprints = total - published;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <div className="mx-auto max-w-6xl">
        <header className="border-b border-light-border pb-6 dark:border-zinc-800 md:pb-8">
          <span className="eyebrow mb-2">Research output</span>
          <h1 className="text-page-title font-display text-light-text dark:text-ghost-white mb-3">
            Publications
          </h1>
          <p className="max-w-3xl text-[0.95rem] leading-7 text-light-text-secondary dark:text-muted-steel">
            Academic publications, peer-reviewed papers, and preprints connected to the research software and platform work.
          </p>
          {total > 0 && (
            <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              <Stat value={total} label={total === 1 ? 'Paper' : 'Papers'} />
              {published > 0 && <Stat value={published} label="Peer-reviewed" />}
              {preprints > 0 && <Stat value={preprints} label={preprints === 1 ? 'Preprint' : 'Preprints'} />}
            </dl>
          )}
        </header>

        {total > 0 ? (
          <div className="mt-6 space-y-4">
            {publications.map((pub) => (
              <PublicationCard key={`${pub.role}-${pub.id}`} publication={pub} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-light-border bg-light-surface dark:border-zinc-800 dark:bg-zinc-900">
              <FontAwesomeIcon icon={faQuoteRight} className="h-6 w-6 text-zinc-500" aria-hidden="true" />
            </div>
            <h2 className="mb-2 text-lg font-medium text-light-text dark:text-ghost-white">No publications yet</h2>
            <p className="text-light-text-secondary dark:text-muted-steel">Publications will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="flex flex-row-reverse items-baseline justify-end gap-2">
      <dt className="text-sm text-light-text-secondary dark:text-muted-steel">{label}</dt>
      <dd className="font-display font-bold text-2xl text-light-text dark:text-ghost-white">{value}</dd>
    </div>
  );
}

function PublicationCard({ publication }) {
  const { metadata, content, role } = publication;
  const { title, authors, journal, year, doi, pdf, pubmed, status, equalContribution } = metadata;

  return (
    <article className="editorial-card p-5 sm:p-6"
    >
      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        {status && (
          <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${
            status === 'published'
              ? 'bg-signal-green/15 text-signal-green'
              : 'bg-plasma-purple/15 text-plasma-purple'
          }`}>
            {status === 'published' ? 'Peer-reviewed' : 'Preprint'}
          </span>
        )}
        {role === 'main-author' && (
          <span className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-neural-blue/15 text-neural-blue">
            {equalContribution ? 'Co-first author' : 'First author'}
          </span>
        )}
        {equalContribution && role !== 'main' && (
          <span className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-neural-blue/15 text-neural-blue">
            * Equal Contribution
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="font-display font-bold text-xl md:text-2xl tracking-tight text-light-text dark:text-ghost-white mb-3 leading-tight text-balance">
        {doi ? (
          <a
            href={doi}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neural-blue transition-colors"
          >
            {title}
          </a>
        ) : (
          title
        )}
      </h2>

      {/* Authors */}
      <p className="text-light-text-secondary dark:text-muted-steel mb-2">
        {authors}
      </p>

      {/* Journal & Year */}
      <p className="text-sm text-light-text-secondary dark:text-muted-steel mb-4">
        <span className="italic">{journal}</span>
        {year && <span> ({year})</span>}
      </p>

      {/* Abstract from content */}
      {content && (
        <div
          className="text-light-text-secondary dark:text-muted-steel mb-4 leading-relaxed prose prose-sm max-w-none dark:prose-invert prose-p:text-light-text-secondary dark:prose-p:text-muted-steel"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      {/* Links */}
      <div className="flex flex-wrap gap-3">
        {doi && (
          <a
            href={doi}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3.5 h-3.5" />
            View Publication
          </a>
        )}
        {pdf && (
          <a
            href={pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <FontAwesomeIcon icon={faFilePdf} className="w-3.5 h-3.5" />
            PDF
          </a>
        )}
        {pubmed && (
          <a
            href={pubmed}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3.5 h-3.5" />
            PubMed
          </a>
        )}
      </div>
    </article>
  );
}
