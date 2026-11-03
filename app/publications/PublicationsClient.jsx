'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faFilePdf, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

/**
 * Publications page: every paper in one list, newest first.
 * Styled like Nature.com research pages
 */
export default function PublicationsClient({ publications = [] }) {
  const total = publications.length;
  const published = publications.filter(p => p.metadata.status === 'published').length;
  const preprints = total - published;

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <header className="border-b border-light-border dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 pt-4 pb-6 md:pt-6 md:pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow mb-2">
              Research output
            </span>
            <h1 className="font-display font-bold text-[2.2rem] sm:text-[2.6rem] leading-[0.98] tracking-tight text-light-text dark:text-ghost-white mb-3">
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
          </motion.div>
        </div>
      </header>

      {/* Publications List */}
      <div className="max-w-6xl mx-auto px-6 py-4 md:py-6">
        {total > 0 ? (
          <div className="space-y-4">
            {publications.map((pub, index) => (
              <PublicationCard key={`${pub.role}-${pub.id}`} publication={pub} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-light-surface dark:bg-zinc-900 border border-light-border dark:border-zinc-800 flex items-center justify-center">
              <FontAwesomeIcon icon={faQuoteRight} className="w-6 h-6 text-zinc-400" />
            </div>
            <h3 className="text-lg font-medium text-light-text dark:text-ghost-white mb-2">
              No publications yet
            </h3>
            <p className="text-light-text-secondary dark:text-muted-steel">
              Publications will appear here.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="flex items-baseline gap-2">
      <dt className="sr-only">{label}</dt>
      <dd className="font-display font-bold text-2xl text-light-text dark:text-ghost-white">{value}</dd>
      <span className="text-sm text-light-text-secondary dark:text-muted-steel">{label}</span>
    </div>
  );
}

function PublicationCard({ publication, index }) {
  const { metadata, content, role } = publication;
  const { title, authors, journal, year, doi, pdf, pubmed, status, equalContribution } = metadata;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index, 5) * 0.08 }}
      className="editorial-card p-5 sm:p-6"
    >
      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        {status && (
          <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${
            status === 'published'
              ? 'bg-signal-green/15 text-signal-green'
              : 'bg-plasma-purple/15 text-plasma-purple'
          }`}>
            {status === 'published' ? 'Published' : 'Preprint'}
          </span>
        )}
        {role === 'main' && (
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
      <h2 className="font-display font-bold text-xl md:text-[1.7rem] tracking-tight text-light-text dark:text-ghost-white mb-3 leading-tight">
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
    </motion.article>
  );
}
