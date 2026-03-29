'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export default function PublicationsPreview({ publications = [] }) {
  if (!publications.length) return null;

  const primary = publications[0];
  const supporting = publications.slice(1, 3);

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mb-8"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">Research output</p>
            <h2 className="text-section-heading font-display font-bold text-light-text dark:text-ghost-white">
              Publications
            </h2>
          </motion.div>

          {/* Primary publication — highlighted */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="rounded-lg border border-light-border dark:border-zinc-800 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2 py-0.5 text-[11px] font-mono font-medium rounded bg-neural-blue/10 text-neural-blue">
                {primary.metadata.status === 'published' ? 'Published' : 'Preprint'}
              </span>
              {primary.metadata.equalContribution && (
                <span className="text-[11px] font-mono text-zinc-500">Equal contribution</span>
              )}
            </div>
            <h3 className="text-lg font-bold text-light-text dark:text-ghost-white leading-snug">
              {primary.metadata.title}
            </h3>
            <p className="mt-2 text-sm text-zinc-500">
              {primary.metadata.journal} &middot; {primary.metadata.year}
            </p>
            {primary.metadata.doi && (
              <a
                href={primary.metadata.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-neural-blue hover:text-synapse-cyan"
              >
                View publication
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
              </a>
            )}
          </motion.div>

          {/* Supporting publications — compact */}
          {supporting.length > 0 && (
            <div className="mt-4 space-y-3">
              {supporting.map((pub, i) => (
                <motion.div
                  key={pub.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-start justify-between gap-4 py-3 border-b border-zinc-100 dark:border-zinc-800/60 last:border-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-light-text dark:text-zinc-300 leading-snug">{pub.metadata.title}</p>
                    <p className="mt-1 text-xs text-zinc-500">{pub.metadata.journal} &middot; {pub.metadata.year}</p>
                  </div>
                  {pub.metadata.doi && (
                    <a
                      href={pub.metadata.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-xs text-neural-blue hover:text-synapse-cyan"
                    >
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3 w-3" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          <div className="mt-6">
            <Link href="/publications" className="text-sm font-medium text-neural-blue hover:text-synapse-cyan inline-flex items-center gap-1.5">
              All publications
              <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
