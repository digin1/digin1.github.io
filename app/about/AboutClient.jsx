'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

export default function AboutClient({ content }) {
  if (!content) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-center text-muted-steel">About content is not available.</p>
      </div>
    );
  }

  const { metadata } = content;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="mx-auto max-w-6xl">

        {/* ── Header ── */}
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="pb-10"
        >
          <div>
            <div>
              {/* Intro row with photo */}
              <div className="flex items-start gap-6 mb-6">
                {metadata?.image && (
                  <img
                    src={metadata.image}
                    alt={metadata?.name || 'Digin Dominic'}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-light-border dark:border-zinc-800 shrink-0"
                  />
                )}
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-3">About</p>
                  <p className="text-lg font-bold text-light-text dark:text-ghost-white">{metadata?.name || 'Digin Dominic'}</p>
                  <p className="text-sm text-zinc-500">{metadata?.role || 'Software Engineer'} &middot; {metadata?.organization || 'University of Edinburgh'}</p>
                </div>
              </div>

              <h1 className="text-hero font-display font-bold text-light-text dark:text-ghost-white max-w-[14ch]">
                A non-linear path through systems, security, and research software.
              </h1>

              <p className="mt-5 max-w-[58ch] text-[15px] leading-7 text-light-text-secondary dark:text-zinc-400">
                I&apos;m Digin Dominic, a Software Engineer at the University of Edinburgh. I build research platforms, microscopy pipelines, browser-based visualisation, and infrastructure for neuroscience. Co-first author on SynaptopathyDB in <em>Scientific Reports</em>.
              </p>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-500 dark:text-zinc-500">
                <span>{metadata?.role || 'Software Engineer'}</span>
                <span className="text-zinc-300 dark:text-zinc-700">|</span>
                <span>{metadata?.organization || 'University of Edinburgh'}</span>
                <span className="text-zinc-300 dark:text-zinc-700">|</span>
                <span>{metadata?.location || 'Edinburgh, Scotland'}</span>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/contact" className="btn-primary group">
                  Get in touch
                  <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a href="/Digin_Dominic_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  Resume &darr;
                </a>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <a href="https://github.com/digin1" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-zinc-400 hover:text-light-text dark:hover:text-ghost-white focus-visible:text-neural-blue focus-visible:outline-none transition-colors">
                  <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
                </a>
                <a href="https://www.linkedin.com/in/digin/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-zinc-400 hover:text-light-text dark:hover:text-ghost-white focus-visible:text-neural-blue focus-visible:outline-none transition-colors">
                  <FontAwesomeIcon icon={faLinkedinIn} className="h-4 w-4" />
                </a>
                <a href={`mailto:${metadata?.email || 'digin13dominic@gmail.com'}`} aria-label="Email" className="text-zinc-400 hover:text-light-text dark:hover:text-ghost-white focus-visible:text-neural-blue focus-visible:outline-none transition-colors">
                  <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
                </a>
              </div>
            </div>

          </div>
        </motion.header>

        {/* ── The Story ── */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="border-t border-light-border dark:border-zinc-800 pt-10"
        >
          <div className="max-w-3xl">
            {content.content && (
              <article
                className="case-study-prose"
                dangerouslySetInnerHTML={{ __html: content.content }}
              />
            )}
          </div>
        </motion.section>

        {/* ── YouTube (if available) ── */}
        {metadata?.youtubeId && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-12 border-t border-light-border dark:border-zinc-800 pt-10"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-4">
              {metadata?.youtubeTitle || 'Featured video'}
            </p>
            <div className="max-w-3xl">
              <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden border border-light-border dark:border-zinc-800">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${metadata.youtubeId}`}
                  title={metadata?.youtubeTitle || 'Featured video'}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.section>
        )}

        {/* ── CTA ── */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-12 border-t border-light-border dark:border-zinc-800 pt-10 pb-4"
        >
          <h2 className="text-page-title font-display font-bold text-light-text dark:text-ghost-white">
            If the work matches what you need, let&apos;s talk.
          </h2>
          <p className="mt-3 max-w-[54ch] text-sm leading-7 text-zinc-500 dark:text-zinc-400">
            I&apos;m most useful where research problems, infrastructure, interfaces, and difficult datasets need to come together into something usable.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Start a conversation
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
            <Link href="/projects" className="btn-secondary">
              View work
            </Link>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
