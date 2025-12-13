'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ViewModeToggle from '@/components/projects/ViewModeToggle';
import InteractiveLayout from '@/components/projects/InteractiveLayout';
import ReadModeView from '@/components/projects/ReadModeView';
import { parseProjectContent } from '@/lib/parseProjectContent';

const STORAGE_KEY = 'project-view-mode';

export default function ProjectClient({ project, prevProject, nextProject }) {
  // Initialize mode from localStorage or default to interactive
  const [viewMode, setViewMode] = useState('interactive');
  const [isClient, setIsClient] = useState(false);

  // Parse content for interactive mode
  const parsedContent = useMemo(() => {
    return parseProjectContent(project.rawContent, project.metadata);
  }, [project.rawContent, project.metadata]);

  // Hydration fix - only read localStorage on client
  useEffect(() => {
    setIsClient(true);
    const savedMode = localStorage.getItem(STORAGE_KEY);
    if (savedMode === 'read' || savedMode === 'interactive') {
      setViewMode(savedMode);
    }
  }, []);

  // Save mode preference
  const handleModeChange = (mode) => {
    setViewMode(mode);
    localStorage.setItem(STORAGE_KEY, mode);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header with back button, nav arrows, and mode toggle */}
      <motion.div
        className="flex items-center justify-between gap-4 mb-8 lg:relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/projects"
          className="inline-flex items-center text-light-text-secondary dark:text-muted-steel hover:text-light-text dark:hover:text-ghost-white transition-colors group"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 transition-transform group-hover:-translate-x-1" />
          <span className="hidden sm:inline">Back to Projects</span>
          <span className="sm:hidden">Back</span>
        </Link>

        {/* Project Navigation Arrows - Centered on lg+, auto on smaller */}
        <div className="flex items-center gap-1 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.id}`}
              className="p-2 rounded-lg text-light-text-secondary dark:text-muted-steel hover:text-neural-blue hover:bg-neural-blue/10 transition-all"
              title={prevProject.title}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
            </Link>
          ) : (
            <span className="p-2 text-slate-300 dark:text-slate-700 cursor-not-allowed">
              <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
            </span>
          )}
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.id}`}
              className="p-2 rounded-lg text-light-text-secondary dark:text-muted-steel hover:text-neural-blue hover:bg-neural-blue/10 transition-all"
              title={nextProject.title}
            >
              <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
            </Link>
          ) : (
            <span className="p-2 text-slate-300 dark:text-slate-700 cursor-not-allowed">
              <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
            </span>
          )}
        </div>

        {/* Only show toggle after hydration */}
        {isClient && (
          <ViewModeToggle mode={viewMode} onChange={handleModeChange} />
        )}
      </motion.div>

      {/* Content based on mode */}
      <AnimatePresence mode="wait">
        {viewMode === 'interactive' ? (
          <motion.div
            key="interactive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <InteractiveLayout parsedContent={parsedContent} />
          </motion.div>
        ) : (
          <motion.div
            key="read"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ReadModeView project={project} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
