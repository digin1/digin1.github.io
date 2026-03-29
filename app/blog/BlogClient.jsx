'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBookOpen, faTimes } from '@fortawesome/free-solid-svg-icons';

const futureTopics = [
  'How I built SynaptopathyDB',
  'Rendering large synapse datasets in the browser',
  'Microscopy tooling beyond proprietary software',
  'Infrastructure choices in research environments',
];

function getTags(tagString = '', limit = 3) {
  return tagString
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, limit);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function LeadPost({ post }) {
  const { title, summary, description, image, date, tag } = post.metadata || {};
  const tags = getTags(tag, 4);

  return (
    <article className="editorial-card overflow-hidden">
      <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="p-6 sm:p-7">
          <span className="eyebrow">Lead essay</span>
          <h2 className="mt-4 max-w-[18ch] font-display font-bold text-[2rem] leading-[1.04] tracking-tight text-light-text dark:text-ghost-white">
            {title}
          </h2>
          {date ? (
            <p className="mt-4 text-sm text-light-text-secondary dark:text-muted-steel">
              {formatDate(date)}
            </p>
          ) : null}
          <p className="mt-4 max-w-[56ch] text-sm leading-7 text-light-text-secondary dark:text-muted-steel">
            {summary || description || ''}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((tagItem) => (
              <span key={tagItem} className="tag">
                {tagItem}
              </span>
            ))}
          </div>
          <Link href={`/blog/${post.id}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neural-blue hover:text-synapse-cyan">
            Read article
            <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="border-t border-light-border/80 bg-light-surface/70 p-4 dark:border-zinc-800 dark:bg-zinc-900 xl:border-l xl:border-t-0">
          <div className="flex h-full min-h-[220px] items-center justify-center overflow-hidden rounded-xl border border-light-border/80 bg-light-surface dark:border-zinc-800 dark:bg-zinc-900">
            {image ? (
              <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover object-center" />
            ) : (
              <div className="px-6 text-center">
                <p className="meta-label">Writing</p>
                <p className="mt-2 text-sm leading-6 text-light-text-secondary dark:text-muted-steel">
                  Notes on research software, infrastructure, and technical problem-solving.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ArchivePost({ post, index }) {
  const { title, summary, description, date, tag } = post.metadata || {};
  const tags = getTags(tag, 3);

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: Math.min(index * 0.04, 0.24) }}
    >
      <Link
        href={`/blog/${post.id}`}
        className="group block rounded-2xl border border-light-border bg-light-card p-4 hover:border-neural-blue/40 hover:bg-neural-blue/5 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-slate-950/35"
      >
        <div className="grid gap-4 md:grid-cols-[180px_minmax(0,1fr)_auto] md:items-start">
          <div>
            <p className="meta-label">Published</p>
            <p className="mt-2 text-sm font-semibold text-light-text dark:text-ghost-white">
              {formatDate(date)}
            </p>
          </div>

          <div className="min-w-0">
            <h3 className="text-xl font-display font-bold tracking-tight text-light-text group-hover:text-neural-blue dark:text-ghost-white">
              {title}
            </h3>
            <p className="mt-3 max-w-[60ch] text-sm leading-7 text-light-text-secondary dark:text-muted-steel">
              {summary || description || ''}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tagItem) => (
                <span key={tagItem} className="tag">
                  {tagItem}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center md:justify-end">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-neural-blue group-hover:text-synapse-cyan">
              Read
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogClient({ posts = [] }) {
  const [activeTag, setActiveTag] = useState('');

  const allTags = useMemo(() => {
    const tags = new Set();
    posts.forEach((post) => {
      if (post.metadata?.tag) {
        post.metadata.tag.split(',').forEach((tag) => tags.add(tag.trim()));
      }
    });
    return Array.from(tags).filter(Boolean).sort();
  }, [posts]);

  const sortedPosts = useMemo(() => {
    const result = activeTag
      ? posts.filter((post) => {
          const postTags = post.metadata?.tag
            ? post.metadata.tag.split(',').map((tag) => tag.trim())
            : [];
          return postTags.includes(activeTag);
        })
      : posts;

    return [...result].sort((a, b) => {
      const dateA = a.metadata?.date ? new Date(a.metadata.date) : new Date(0);
      const dateB = b.metadata?.date ? new Date(b.metadata.date) : new Date(0);
      return dateB - dateA;
    });
  }, [posts, activeTag]);

  const leadPost = sortedPosts[0];
  const archivePosts = leadPost ? sortedPosts.slice(1) : [];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42 }}
          className="border-b border-light-border pb-5 dark:border-zinc-800"
        >
          <span className="eyebrow mb-2">Writing</span>
          <h1 className="max-w-3xl font-display font-bold text-[2.2rem] leading-[1.05] tracking-tight text-light-text dark:text-ghost-white sm:text-[2.6rem]">
            Notes on software, systems, and technical work that matters in practice.
          </h1>
          <p className="mt-3 max-w-[62ch] text-[0.95rem] leading-7 text-light-text-secondary dark:text-muted-steel">
            This section is smaller than the work archive, but it will grow around research software, infrastructure choices, scientific visualisation, and lessons from building real systems.
          </p>
        </motion.header>

        {allTags.length > 0 ? (
          <section className="mt-4 editorial-card p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
                  className={activeTag === tag ? 'tag bg-neural-blue text-deep-space border-neural-blue' : 'tag'}
                >
                  {tag}
                </button>
              ))}
              {activeTag ? (
                <button onClick={() => setActiveTag('')} className="btn-secondary">
                  <FontAwesomeIcon icon={faTimes} className="h-3.5 w-3.5" />
                  Clear
                </button>
              ) : null}
            </div>
          </section>
        ) : null}

        {leadPost ? (
          <section className="mt-8">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Latest post</p>
                <p className="mt-2 text-sm leading-6 text-light-text-secondary dark:text-muted-steel">
                  Writing should read like engineering notes, not lifestyle content.
                </p>
              </div>
            </div>
            <LeadPost post={leadPost} />
          </section>
        ) : null}

        <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <div className="mb-4 flex items-end justify-between gap-4 border-b border-light-border pb-3 dark:border-zinc-800">
              <div>
                <p className="eyebrow">Archive</p>
                <p className="mt-2 text-sm leading-6 text-light-text-secondary dark:text-muted-steel">
                  A denser list of published notes and technical reflections.
                </p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {sortedPosts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="editorial-card px-6 py-12 text-center"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-light-border bg-light-surface text-neural-blue dark:border-zinc-800 dark:bg-zinc-900">
                    <FontAwesomeIcon icon={faBookOpen} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-display font-bold text-light-text dark:text-ghost-white">
                    No posts match this filter.
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-light-text-secondary dark:text-muted-steel">
                    Clear the active tag to return to the full archive.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={activeTag || 'all'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {archivePosts.map((post, index) => (
                    <ArchivePost key={post.id} post={post} index={index} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <aside className="space-y-5">
            <div className="editorial-card p-5 sm:p-6">
              <p className="meta-label">Planned writing</p>
              <div className="mt-4 space-y-3">
                {futureTopics.map((topic) => (
                  <div key={topic} className="rounded-xl border border-light-border/80 bg-light-surface/80 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                    <p className="text-sm leading-6 text-light-text-secondary dark:text-muted-steel">
                      {topic}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="editorial-card p-5 sm:p-6">
              <p className="meta-label">Related reading path</p>
              <p className="mt-4 text-sm leading-7 text-light-text-secondary dark:text-muted-steel">
                If you want the strongest proof first, start with the work archive and publications, then come back here for the implementation notes and opinions behind the systems.
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
        </section>
      </div>
    </div>
  );
}
