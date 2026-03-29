'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPostClient({ post, prevPost, nextPost }) {
  const tags = post.metadata?.tag
    ? post.metadata.tag.split(',').map((tag) => tag.trim()).filter(Boolean)
    : [];

  return (
    <motion.article
      className="bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Nav row */}
        <div className="mb-4 flex items-center justify-between border-b border-light-border pb-4 pt-2 dark:border-zinc-800">
          <Link
            href="/blog"
            className="group inline-flex items-center text-sm text-light-text-secondary hover:text-light-text dark:text-muted-steel dark:hover:text-ghost-white"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Writing
          </Link>

          <div className="flex items-center gap-1">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.id}`}
                className="rounded-lg border border-light-border bg-light-surface p-1.5 text-light-text-secondary hover:border-neural-blue/40 hover:text-neural-blue dark:border-zinc-800 dark:bg-zinc-900 dark:text-muted-steel"
                title={prevPost.title}
              >
                <FontAwesomeIcon icon={faChevronLeft} className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <span className="cursor-not-allowed p-1.5 text-zinc-300 dark:text-zinc-700">
                <FontAwesomeIcon icon={faChevronLeft} className="h-3.5 w-3.5" />
              </span>
            )}
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.id}`}
                className="rounded-lg border border-light-border bg-light-surface p-1.5 text-light-text-secondary hover:border-neural-blue/40 hover:text-neural-blue dark:border-zinc-800 dark:bg-zinc-900 dark:text-muted-steel"
                title={nextPost.title}
              >
                <FontAwesomeIcon icon={faChevronRight} className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <span className="cursor-not-allowed p-1.5 text-zinc-300 dark:text-zinc-700">
                <FontAwesomeIcon icon={faChevronRight} className="h-3.5 w-3.5" />
              </span>
            )}
          </div>
        </div>

        {/* Header */}
        <header className="mb-6">
          <span className="eyebrow mb-2">Writing</span>
          <h1 className="max-w-3xl font-display font-bold text-[1.8rem] leading-[1.1] tracking-tight text-light-text dark:text-ghost-white sm:text-[2.2rem]">
            {post.metadata.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-light-text-secondary dark:text-muted-steel">
            {post.metadata?.date ? (
              <time dateTime={post.metadata.date}>{formatDate(post.metadata.date)}</time>
            ) : null}
            {tags.length > 0 && (
              <>
                <span className="text-zinc-300 dark:text-zinc-700">|</span>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </>
            )}
          </div>

          {post.metadata?.summary ? (
            <p className="mt-3 max-w-2xl text-[0.95rem] leading-7 text-light-text-secondary dark:text-muted-steel">
              {post.metadata.summary}
            </p>
          ) : null}
        </header>

        {/* Hero image — constrained */}
        {post.metadata?.image ? (
          <figure className="mb-8 overflow-hidden rounded-xl border border-light-border dark:border-zinc-800">
            <img
              src={post.metadata.image}
              alt={post.metadata.title}
              loading="lazy"
              className="w-full max-h-[320px] object-cover object-center"
            />
          </figure>
        ) : null}

        {/* Article body */}
        <section
          className="case-study-prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer */}
        <footer className="mt-8 border-t border-light-border py-5 dark:border-zinc-800">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-light-text-secondary dark:text-muted-steel">
            <span>{post.metadata?.date ? `Published ${formatDate(post.metadata.date)}` : 'Technical note'}</span>
            <div className="flex gap-4">
              <Link href="/projects" className="hover:text-neural-blue">View work</Link>
              <Link href="/blog" className="hover:text-neural-blue">All writing</Link>
            </div>
          </div>
        </footer>
      </div>
    </motion.article>
  );
}
