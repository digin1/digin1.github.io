'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrip, faFileAlt } from '@fortawesome/free-solid-svg-icons';

/**
 * Toggle between Interactive and Read modes for project pages
 */
export default function ViewModeToggle({ mode, onChange }) {
  const isInteractive = mode === 'interactive';

  return (
    <div className="inline-flex items-center gap-1 rounded-xl border border-light-border bg-light-surface p-1 dark:border-zinc-800 dark:bg-zinc-900">
      {/* Read Mode */}
      <motion.button
        onClick={() => onChange('read')}
        className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
          !isInteractive
            ? 'text-deep-space'
            : 'text-light-text-secondary dark:text-muted-steel hover:text-light-text dark:hover:text-ghost-white'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {!isInteractive && (
          <motion.div
            layoutId="viewmode-bg"
            className="absolute inset-0 rounded-lg bg-neural-blue"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          <FontAwesomeIcon icon={faFileAlt} className="w-4 h-4" />
          Read
        </span>
      </motion.button>

      {/* Interactive Mode */}
      <motion.button
        onClick={() => onChange('interactive')}
        className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
          isInteractive
            ? 'text-deep-space'
            : 'text-light-text-secondary dark:text-muted-steel hover:text-light-text dark:hover:text-ghost-white'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isInteractive && (
          <motion.div
            layoutId="viewmode-bg"
            className="absolute inset-0 rounded-lg bg-neural-blue"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          <FontAwesomeIcon icon={faGrip} className="w-4 h-4" />
          Interactive
        </span>
      </motion.button>
    </div>
  );
}
