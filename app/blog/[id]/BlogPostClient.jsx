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
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-light-border pb-5 pt-2 dark:border-zinc-800 lg:relative">
          <div>
            <p className="meta-label">Article</p>
            <Link
              href="/blog"
              className="group mt-2 inline-flex items-center text-sm text-light-text-secondary hover:text-light-text dark:text-muted-steel dark:hover:text-ghost-white"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              Back to Writing
            </Link>
          </div>

          <div className="flex items-center gap-1 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.id}`}
                className="rounded-xl border border-light-border bg-light-surface p-2 text-light-text-secondary hover:border-neural-blue/40 hover:text-neural-blue dark:border-zinc-800 dark:bg-zinc-900 dark:text-muted-steel"
                title={prevPost.title}
              >
                <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
              </Link>
            ) : (
              <span className="cursor-not-allowed p-2 text-slate-300 dark:text-slate-700">
                <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
              </span>
            )}
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.id}`}
                className="rounded-xl border border-light-border bg-light-surface p-2 text-light-text-secondary hover:border-neural-blue/40 hover:text-neural-blue dark:border-zinc-800 dark:bg-zinc-900 dark:text-muted-steel"
                title={nextPost.title}
              >
                <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
              </Link>
            ) : (
              <span className="cursor-not-allowed p-2 text-slate-300 dark:text-slate-700">
                <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
              </span>
            )}
          </div>

          <div className="hidden lg:block w-24" />
        </div>

        <header className="border-b border-light-border pb-8 dark:border-zinc-800">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0">
              <span className="eyebrow">Writing</span>
              <h1 className="mt-4 max-w-[17ch] font-display font-bold text-[2.5rem] leading-[0.98] tracking-tight text-light-text dark:text-ghost-white sm:text-[3.1rem]">
                {post.metadata.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-light-text-secondary dark:text-muted-steel">
                <span className="meta-label">Published</span>
                {post.metadata?.date ? (
                  <time dateTime={post.metadata.date}>{formatDate(post.metadata.date)}</time>
                ) : null}
              </div>

              {post.metadata?.summary ? (
                <p className="mt-5 max-w-[62ch] text-[1.02rem] leading-8 text-light-text-secondary dark:text-muted-steel">
                  {post.metadata.summary}
                </p>
              ) : null}
            </div>

            <aside className="editorial-card h-fit p-5 sm:p-6">
              <p className="meta-label">At a glance</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-light-border/80 bg-light-surface/80 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="meta-label">Format</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-light-text dark:text-ghost-white">
                    Technical notes
                  </p>
                </div>
                {post.metadata?.date ? (
                  <div className="rounded-xl border border-light-border/80 bg-light-surface/80 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                    <p className="meta-label">Date</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-light-text dark:text-ghost-white">
                      {formatDate(post.metadata.date)}
                    </p>
                  </div>
                ) : null}
                {tags.length > 0 ? (
                  <div className="rounded-xl border border-light-border/80 bg-light-surface/80 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                    <p className="meta-label">Topics</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </aside>
          </div>
        </header>

        {post.metadata?.image ? (
          <figure className="mt-8 overflow-hidden rounded-[1.4rem] border border-light-border dark:border-zinc-800">
            <img
              src={post.metadata.image}
              alt={post.metadata.title}
              loading="lazy"
              className="w-full object-cover"
            />
          </figure>
        ) : null}

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <section
              className="case-study-prose"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          <aside className="hidden lg:block">
            <div className="editorial-card p-5 lg:sticky lg:top-28">
              <p className="meta-label">Reading path</p>
              <p className="mt-4 text-sm leading-7 text-light-text-secondary dark:text-muted-steel">
                The writing section complements the work archive. If you want the clearest proof first, read the case studies and publications next.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/projects" className="btn-secondary">
                  View work
                </Link>
                <Link href="/publications" className="btn-secondary">
                  Publications
                </Link>
              </div>
            </div>
          </aside>
        </div>

        <footer className="mt-10 border-t border-light-border py-6 dark:border-zinc-800">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-light-text-secondary dark:text-muted-steel">
            <span>{post.metadata?.date ? `Published ${formatDate(post.metadata.date)}` : 'Technical note'}</span>
            <Link href="/blog" className="hover:text-neural-blue">
              Back to writing
            </Link>
          </div>
        </footer>
      </div>
    </motion.article>
  );
}
