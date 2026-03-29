'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Hero({ content }) {
  const metadata = content?.metadata || {};
  const name = metadata?.name || 'Digin Dominic';

  return (
    <section id="hero" className="pb-0 pt-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Role line */}
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-4">
              Software Engineer &middot; University of Edinburgh
            </p>

            {/* Headline */}
            <h1 className="text-hero font-display font-bold text-light-text dark:text-ghost-white max-w-[14ch]">
              Building the software that makes complex science usable.
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-[58ch] text-[15px] leading-7 text-light-text-secondary dark:text-zinc-400">
              I&apos;m {name}. I build research platforms, microscopy pipelines, 3D visualisations, and infrastructure for the Genes to Cognition Programme under Professor Seth Grant. Co-first author on SynaptopathyDB in <em>Scientific Reports</em>.
            </p>

            {/* Proof — inline, not cards */}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-500 dark:text-zinc-500">
              <span>University of Edinburgh</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>Co-first author, Scientific Reports</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>29+ documented projects</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span>8+ years in engineering</span>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/projects" className="btn-primary group">
                Browse case studies
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/publications" className="btn-secondary">
                Publications
              </Link>
            </div>

            {/* Social — quiet */}
            <div className="mt-8 flex items-center gap-3">
              {[
                { href: 'https://github.com/digin1', icon: faGithub, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/digin/', icon: faLinkedinIn, label: 'LinkedIn' },
                { href: 'https://x.com/digin1', icon: faXTwitter, label: 'X' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-light-text dark:hover:text-ghost-white focus-visible:text-neural-blue focus-visible:outline-none transition-colors"
                  aria-label={s.label}
                >
                  <FontAwesomeIcon icon={s.icon} className="h-4 w-4" />
                </a>
              ))}
              <span className="text-zinc-700 dark:text-zinc-700">|</span>
              <a
                href="/Digin_Dominic_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-500 hover:text-light-text dark:hover:text-ghost-white focus-visible:text-neural-blue focus-visible:outline-none transition-colors"
              >
                Resume &darr;
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
