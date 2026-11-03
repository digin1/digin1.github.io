'use client';

import Link from 'next/link';
import SocialLinks from '@/components/common/SocialLinks';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <div className="mx-auto max-w-6xl">

        {/* ── Header ── */}
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="pb-6"
        >
          <div>
            <div>
              {/* Intro row with photo */}
              <div className="flex items-start gap-4 mb-4">
                {metadata?.image && (
                  <img
                    src={metadata.image}
                    alt={metadata?.name || 'Digin Dominic'}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover border border-light-border dark:border-zinc-800 shrink-0"
                  />
                )}
                <div>
                  <p className="eyebrow mb-1">About</p>
                  <p className="text-base font-bold text-light-text dark:text-ghost-white">{metadata?.name || 'Digin Dominic'}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{metadata?.role || 'Software Engineer'} &middot; {metadata?.organization || 'University of Edinburgh'}</p>
                </div>
              </div>

              <h1 className="text-page-title font-display text-light-text dark:text-ghost-white max-w-3xl text-balance">
                A non-linear path through systems, security, and research software.
              </h1>

              <p className="mt-3 max-w-[58ch] text-[15px] leading-7 text-light-text-secondary dark:text-zinc-400">
                I&apos;m Digin Dominic, a Software Engineer at the University of Edinburgh. I build research platforms, microscopy pipelines, browser-based visualisation, and infrastructure for neuroscience. Co-first author on SynaptopathyDB in <em>Scientific Reports</em>.
              </p>

              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                {[metadata?.role || 'Software Engineer', metadata?.organization || 'University of Edinburgh', metadata?.location || 'Edinburgh, Scotland'].map((item) => (
                  <li key={item} className="inline-flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-neural-blue" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/contact/" className="btn-primary group">
                  Get in touch
                  <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a href="/Digin_Dominic_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  Resume (PDF)
                </a>
              </div>

              <SocialLinks include={['GitHub', 'LinkedIn', 'Email']} className="mt-6" />
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
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4">
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
            <Link href="/contact/" className="btn-primary">
              Start a conversation
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </Link>
            <Link href="/projects/" className="btn-secondary">
              View work
            </Link>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
