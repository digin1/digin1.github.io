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
    <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-light-surface dark:bg-midnight-steel/50 border border-light-border dark:border-slate-700/50">
      {/* Interactive Mode */}
      <motion.button
        onClick={() => onChange('interactive')}
        className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
          isInteractive
            ? 'text-white'
            : 'text-light-text-secondary dark:text-muted-steel hover:text-light-text dark:hover:text-ghost-white'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isInteractive && (
          <motion.div
            layoutId="viewmode-bg"
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-neural-blue to-synapse-cyan"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          <FontAwesomeIcon icon={faGrip} className="w-4 h-4" />
          Interactive
        </span>
      </motion.button>

      {/* Read Mode */}
      <motion.button
        onClick={() => onChange('read')}
        className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
          !isInteractive
            ? 'text-white'
            : 'text-light-text-secondary dark:text-muted-steel hover:text-light-text dark:hover:text-ghost-white'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {!isInteractive && (
          <motion.div
            layoutId="viewmode-bg"
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-neural-blue to-synapse-cyan"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          <FontAwesomeIcon icon={faFileAlt} className="w-4 h-4" />
          Read
        </span>
      </motion.button>
    </div>
  );
}
