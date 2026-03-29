'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function getTags(tagString = '', limit = 3) {
  return tagString.split(',').map(t => t.trim()).filter(Boolean).slice(0, limit);
}

function FeaturedRow({ project, index, reverse = false }) {
  const { title, summary, image, tag, role, problem, highlights } = project.metadata || {};
  const tags = getTags(tag, 3);
  const bullets = highlights || [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link
        href={`/projects/${project.id}`}
        className="block rounded-lg border border-light-border dark:border-zinc-800 overflow-hidden hover:border-zinc-500 dark:hover:border-zinc-600 transition-colors"
      >
        <div className={`grid gap-0 lg:grid-cols-2 ${reverse ? 'lg:[direction:rtl]' : ''}`}>
          {/* Image side */}
          <div className={`aspect-[16/10] bg-zinc-100 dark:bg-zinc-900 overflow-hidden ${reverse ? 'lg:[direction:ltr]' : ''}`}>
            {image ? (
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <div className="text-center px-8">
                  <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600">Internal system</p>
                  <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">Case study available</p>
                </div>
              </div>
            )}
          </div>

          {/* Content side */}
          <div className={`p-6 lg:p-8 flex flex-col justify-center ${reverse ? 'lg:[direction:ltr]' : ''}`}>
            <div className="flex items-center gap-3 text-xs">
              {role && <span className="font-mono uppercase tracking-widest text-zinc-500">{role}</span>}
            </div>

            <h3 className="mt-3 text-xl font-display font-bold tracking-tight text-light-text dark:text-ghost-white group-hover:text-neural-blue transition-colors">
              {title}
            </h3>

            {problem && (
              <p className="mt-3 text-sm leading-6 text-light-text-secondary dark:text-zinc-400">
                {problem}
              </p>
            )}

            {bullets.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {bullets.slice(0, 3).map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-light-text-secondary dark:text-zinc-400">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neural-blue" />
                    {b}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {tags.map(t => (
                  <span key={t} className="px-2 py-0.5 text-[11px] font-mono rounded bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">{t}</span>
                ))}
              </div>
              <span className="shrink-0 text-sm font-medium text-neural-blue group-hover:text-synapse-cyan flex items-center gap-1.5">
                Read
                <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function ArchiveRow({ project }) {
  const { title, tag, category, date } = project.metadata || {};
  const tags = getTags(tag, 2);
  const year = date ? new Date(date).getFullYear() : '';

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex items-center justify-between gap-4 py-3 border-b border-zinc-100 dark:border-zinc-800/60 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 -mx-3 px-3 rounded transition-colors"
    >
      <div className="flex items-center gap-4 min-w-0">
        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600 w-10 shrink-0">{year}</span>
        <span className="text-sm font-medium text-light-text dark:text-zinc-300 group-hover:text-neural-blue transition-colors truncate">
          {title}
        </span>
      </div>
      <div className="hidden sm:flex items-center gap-2 shrink-0">
        {tags.map(t => (
          <span key={t} className="text-[11px] font-mono text-zinc-400 dark:text-zinc-600">{t}</span>
        ))}
        <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3 text-zinc-300 dark:text-zinc-700 group-hover:text-neural-blue transition-colors" />
      </div>
    </Link>
  );
}

export default function ImpactShowcase({ projects = [] }) {
  const featured = projects
    .filter(p => p.metadata?.featured === true)
    .sort((a, b) => (a.metadata?.featuredOrder ?? 999) - (b.metadata?.featuredOrder ?? 999))
    .slice(0, 3);

  const archive = projects
    .filter(p => !featured.find(f => f.id === p.id))
    .sort((a, b) => new Date(b.metadata?.date || 0) - new Date(a.metadata?.date || 0))
    .slice(0, 8);

  if (!projects.length) return null;

  return (
    <section id="work" className="py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mb-10"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-3">Selected work</p>
            <h2 className="text-section-heading font-display font-bold text-light-text dark:text-ghost-white">
              Featured case studies
            </h2>
          </motion.div>

          {/* Featured rows — alternating layout */}
          <div className="space-y-6">
            {featured.map((project, index) => (
              <FeaturedRow key={project.id} project={project} index={index} reverse={index % 2 === 1} />
            ))}
          </div>

          {/* Archive preview */}
          {archive.length > 0 && (
            <div className="mt-12">
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-4">More projects</p>
              <div>
                {archive.map(project => (
                  <ArchiveRow key={project.id} project={project} />
                ))}
              </div>
              <div className="mt-6">
                <Link href="/projects" className="text-sm font-medium text-neural-blue hover:text-synapse-cyan inline-flex items-center gap-1.5">
                  View all {projects.length} projects
                  <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
