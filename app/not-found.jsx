'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowLeft, faFolder, faNewspaper, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export default function NotFound() {
  const quickLinks = [
    { name: 'Home', path: '/', icon: faHome, description: 'Back to the main page' },
    { name: 'Projects', path: '/projects', icon: faFolder, description: 'Browse my portfolio' },
    { name: 'Blog', path: '/blog', icon: faNewspaper, description: 'Read my articles' },
    { name: 'About', path: '/about', icon: faUser, description: 'Learn more about me' },
    { name: 'Contact', path: '/contact', icon: faEnvelope, description: 'Get in touch' },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        className="text-center max-w-2xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Error Code */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <span className="text-8xl md:text-9xl font-display font-bold text-gradient">
            404
          </span>
        </motion.div>

        {/* Terminal-style message */}
        <motion.div
          className="glass-card p-4 mb-8 font-mono text-sm text-left max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-light-border dark:border-slate-700/50">
            <span className="w-3 h-3 rounded-full bg-red-500" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-green-500" aria-hidden="true" />
            <span className="ml-2 text-light-text-secondary dark:text-muted-steel text-xs">terminal</span>
          </div>
          <p className="text-red-500">$ ERROR: Page not found</p>
          <p className="text-light-text-secondary dark:text-muted-steel">
            &gt; The requested URL does not exist on this server
          </p>
          <p className="text-signal-green">$ Redirecting to helpful links...</p>
        </motion.div>

        {/* Title and description */}
        <h1 className="text-2xl md:text-3xl font-display font-bold text-light-text dark:text-ghost-white mb-3">
          Oops! Page Not Found
        </h1>
        <p className="text-light-text-secondary dark:text-muted-steel mb-8 max-w-md mx-auto">
          The page you're looking for might have been moved, deleted, or perhaps never existed.
          Let me help you find your way.
        </p>

        {/* Quick Navigation Links */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {quickLinks.map((link) => (
            <motion.div key={link.path} variants={staggerItem}>
              <Link
                href={link.path}
                className="group flex flex-col items-center p-4 rounded-xl bg-light-surface dark:bg-midnight-steel/50 border border-light-border dark:border-slate-700/50 hover:border-neural-blue/50 transition-all duration-300 hover:-translate-y-1"
              >
                <span className="w-10 h-10 rounded-lg bg-neural-blue/10 flex items-center justify-center mb-2 group-hover:bg-neural-blue/20 transition-colors">
                  <FontAwesomeIcon icon={link.icon} className="text-neural-blue" />
                </span>
                <span className="text-sm font-medium text-light-text dark:text-ghost-white group-hover:text-neural-blue transition-colors">
                  {link.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faHome} />
            Go to Homepage
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary inline-flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Go Back
          </button>
        </div>

        {/* Help text */}
        <p className="mt-8 text-sm text-light-text-secondary dark:text-muted-steel">
          Still can't find what you're looking for?{' '}
          <Link href="/contact" className="text-neural-blue hover:text-synapse-cyan transition-colors">
            Contact me
          </Link>
          {' '}and I'll help you out.
        </p>
      </motion.div>
    </div>
  );
}
