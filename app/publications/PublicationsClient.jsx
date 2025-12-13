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
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6 pt-12 pb-8 md:pt-16 md:pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-medium text-neural-blue mb-3 uppercase tracking-wide">
              Research
            </p>
            <h1 className="font-serif text-[2rem] sm:text-[2.5rem] md:text-[3rem] leading-[1.1] font-bold text-slate-900 dark:text-white mb-4">
              Publications
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Academic publications, research papers, and scientific contributions.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <nav className="flex gap-8" aria-label="Publication tabs">
            <button
              onClick={() => setActiveTab('main')}
              className={`relative py-4 text-sm font-medium transition-colors ${
                activeTab === 'main'
                  ? 'text-neural-blue'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              Main Author
              <span className="ml-2 text-xs text-slate-400">({mainAuthorPubs.length})</span>
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
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              Co-Author
              <span className="ml-2 text-xs text-slate-400">({coAuthorPubs.length})</span>
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
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              Preprints
              <span className="ml-2 text-xs text-slate-400">({preprintPubs.length})</span>
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
      <div className="max-w-5xl mx-auto px-6 py-10">
        {currentPubs.length > 0 ? (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
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
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <FontAwesomeIcon icon={faQuoteRight} className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
              No publications yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
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
      className="border-b border-slate-200 dark:border-slate-800 pb-8 last:border-0"
    >
      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        {status && (
          <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${
            status === 'published'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
          }`}>
            {status === 'published' ? 'Published' : 'Preprint'}
          </span>
        )}
        {equalContribution && (
          <span className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
            * Equal Contribution
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="font-serif text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">
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
      <p className="text-slate-600 dark:text-slate-400 mb-2">
        {authors}
      </p>

      {/* Journal & Year */}
      <p className="text-sm text-slate-500 dark:text-slate-500 mb-4">
        <span className="italic">{journal}</span>
        {year && <span> ({year})</span>}
      </p>

      {/* Abstract from content */}
      {content && (
        <div
          className="font-serif text-slate-700 dark:text-slate-300 mb-4 leading-relaxed prose prose-sm max-w-none dark:prose-invert"
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
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-neural-blue hover:bg-neural-blue/10 rounded transition-colors"
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
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
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
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
          >
            <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3.5 h-3.5" />
            PubMed
          </a>
        )}
      </div>
    </motion.article>
  );
}
