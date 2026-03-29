'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faFilePdf, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

/**
 * Publications page with Main Author and Co-Author tabs
 * Styled like Nature.com research pages
 */
export default function PublicationsClient({ mainAuthorPubs = [], coAuthorPubs = [], preprintPubs = [] }) {
  const [activeTab, setActiveTab] = useState('main');

  const currentPubs = activeTab === 'main'
    ? mainAuthorPubs
    : activeTab === 'co'
      ? coAuthorPubs
      : preprintPubs;

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
          </motion.div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-light-border dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex gap-8" aria-label="Publication tabs">
            <button
              onClick={() => setActiveTab('main')}
              className={`relative py-4 text-sm font-medium transition-colors ${
                activeTab === 'main'
                  ? 'text-neural-blue'
                  : 'text-light-text-secondary dark:text-muted-steel hover:text-light-text dark:hover:text-ghost-white'
              }`}
            >
              Main Author
              <span className="ml-2 text-xs text-light-text-secondary dark:text-muted-steel">({mainAuthorPubs.length})</span>
              {activeTab === 'main' && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-neural-blue"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('co')}
              className={`relative py-4 text-sm font-medium transition-colors ${
                activeTab === 'co'
                  ? 'text-neural-blue'
                  : 'text-light-text-secondary dark:text-muted-steel hover:text-light-text dark:hover:text-ghost-white'
              }`}
            >
              Co-Author
              <span className="ml-2 text-xs text-light-text-secondary dark:text-muted-steel">({coAuthorPubs.length})</span>
              {activeTab === 'co' && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-neural-blue"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('preprint')}
              className={`relative py-4 text-sm font-medium transition-colors ${
                activeTab === 'preprint'
                  ? 'text-neural-blue'
                  : 'text-light-text-secondary dark:text-muted-steel hover:text-light-text dark:hover:text-ghost-white'
              }`}
            >
              Preprints
              <span className="ml-2 text-xs text-light-text-secondary dark:text-muted-steel">({preprintPubs.length})</span>
              {activeTab === 'preprint' && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-neural-blue"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Publications List */}
      <div className="max-w-6xl mx-auto px-6 py-4 md:py-6">
        {currentPubs.length > 0 ? (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {currentPubs.map((pub, index) => (
              <PublicationCard key={pub.id} publication={pub} index={index} />
            ))}
          </motion.div>
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
              {activeTab === 'main'
                ? 'Main author publications will appear here.'
                : activeTab === 'co'
                  ? 'Co-authored publications will appear here.'
                  : 'Preprint publications will appear here.'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function PublicationCard({ publication, index }) {
  const { metadata, content } = publication;
  const { title, authors, journal, year, doi, pdf, pubmed, status, equalContribution } = metadata;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
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
        {equalContribution && (
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
