'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div
        className="text-center glass-card p-8 md:p-12 max-w-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Error Code */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-8xl md:text-9xl font-display font-bold text-gradient">
            404
          </span>
        </motion.div>

        {/* Terminal-style message */}
        <motion.div
          className="bg-light-surface dark:bg-deep-space rounded-lg p-4 mb-8 font-mono text-sm text-left border border-light-border dark:border-slate-700/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-light-border dark:border-slate-700/50">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-light-text-secondary dark:text-muted-steel text-xs">error.log</span>
          </div>
          <p className="text-red-500">$ ERROR: Page not found</p>
          <p className="text-light-text-secondary dark:text-muted-steel">
            &gt; The requested resource does not exist
          </p>
          <p className="text-signal-green">$ Suggestion: Navigate to a valid route</p>
        </motion.div>

        {/* Title and description */}
        <h1 className="text-2xl md:text-3xl font-display font-bold text-light-text dark:text-ghost-white mb-4">
          Page Not Found
        </h1>
        <p className="text-light-text-secondary dark:text-muted-steel mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary inline-flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faHome} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary inline-flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
