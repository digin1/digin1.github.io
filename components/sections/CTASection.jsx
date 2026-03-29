'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

export default function CTASection({ className = '' }) {
  return (
    <section id="contact" className={`py-16 md:py-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-xl text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">Get in touch</p>

          <h2 className="text-page-title font-display font-bold text-light-text dark:text-ghost-white">
            Interested in working together?
          </h2>

          <p className="mt-4 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
            I&apos;m open to research software engineering, scientific tooling, infrastructure, and visualisation work. Send context and I&apos;ll reply quickly.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary group gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" />
              Send a message
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5 text-zinc-400">
            <a href="https://github.com/digin1" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-light-text dark:hover:text-ghost-white focus-visible:text-neural-blue focus-visible:outline-none transition-colors">
              <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/digin/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-light-text dark:hover:text-ghost-white focus-visible:text-neural-blue focus-visible:outline-none transition-colors">
              <FontAwesomeIcon icon={faLinkedinIn} className="h-5 w-5" />
            </a>
            <a href="mailto:digin13dominic@gmail.com" aria-label="Email" className="hover:text-light-text dark:hover:text-ghost-white focus-visible:text-neural-blue focus-visible:outline-none transition-colors">
              <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
