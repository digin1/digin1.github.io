'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ReadModeView from '@/components/projects/ReadModeView';

export default function ProjectClient({ project, prevProject, nextProject }) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <motion.div
        className="mx-auto mb-6 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-b border-light-border pb-5 dark:border-zinc-800 lg:relative"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1">Case study</p>
          <Link
            href="/projects"
            className="group inline-flex items-center text-sm text-zinc-500 hover:text-light-text dark:hover:text-ghost-white"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-3 w-3 transition-transform group-hover:-translate-x-1" />
            Back to Work
          </Link>
        </div>

        <div className="flex items-center gap-1">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.id}`}
              className="rounded-lg border border-light-border bg-light-surface p-2 text-zinc-400 hover:text-neural-blue dark:border-zinc-800 dark:bg-zinc-900"
              title={prevProject.title}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <span className="p-2 text-zinc-300 dark:text-zinc-700">
              <FontAwesomeIcon icon={faChevronLeft} className="w-3.5 h-3.5" />
            </span>
          )}
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.id}`}
              className="rounded-lg border border-light-border bg-light-surface p-2 text-zinc-400 hover:text-neural-blue dark:border-zinc-800 dark:bg-zinc-900"
              title={nextProject.title}
            >
              <FontAwesomeIcon icon={faChevronRight} className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <span className="p-2 text-zinc-300 dark:text-zinc-700">
              <FontAwesomeIcon icon={faChevronRight} className="w-3.5 h-3.5" />
            </span>
          )}
        </div>
      </motion.div>

      <ReadModeView project={project} />
    </div>
  );
}
