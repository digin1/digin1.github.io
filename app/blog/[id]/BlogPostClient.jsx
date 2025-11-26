'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCalendar, faUser } from '@fortawesome/free-solid-svg-icons';

export default function BlogPostClient({ post }) {
  const tags = post.metadata?.tag
    ? post.metadata.tag.split(',').map(t => t.trim())
    : [];

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          href="/blog"
          className="inline-flex items-center text-light-text-secondary dark:text-muted-steel hover:text-light-text dark:hover:text-ghost-white transition-colors mb-8 group"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </Link>

        <article className="glass-card overflow-hidden max-w-4xl mx-auto">
          {post.metadata?.image && (
            <figure className="relative overflow-hidden">
              <img
                src={post.metadata.image}
                alt={post.metadata.title}
                className="w-full object-cover img-glow"
              />
            </figure>
          )}

          <div className="p-6 sm:p-8 md:p-10 lg:p-12">
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-light-text dark:text-ghost-white mb-6 leading-tight">
                {post.metadata.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-light-text-secondary dark:text-muted-steel mb-6">
                {post.metadata.date && (
                  <span className="flex items-center font-mono text-sm">
                    <FontAwesomeIcon icon={faCalendar} className="mr-2 text-synapse-cyan" />
                    <time dateTime={post.metadata.date}>
                      {formatDate(post.metadata.date)}
                    </time>
                  </span>
                )}
                {post.metadata.author && (
                  <span className="flex items-center">
                    <FontAwesomeIcon icon={faUser} className="mr-2 text-synapse-cyan" />
                    <span className="text-light-text dark:text-ghost-white">{post.metadata.author}</span>
                  </span>
                )}
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="px-3 py-1.5 text-sm font-mono rounded-full bg-synapse-cyan/10 text-synapse-cyan border border-synapse-cyan/20 hover:bg-synapse-cyan/20 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </header>

            <div className="h-px bg-gradient-to-r from-light-border dark:from-slate-700/50 via-synapse-cyan/30 to-light-border dark:to-slate-700/50 mb-8" />

            <section
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-display prose-headings:text-light-text dark:prose-headings:text-ghost-white prose-p:text-light-text-secondary dark:prose-p:text-muted-steel prose-p:leading-relaxed prose-a:text-synapse-cyan hover:prose-a:text-neural-blue prose-strong:text-light-text dark:prose-strong:text-ghost-white prose-code:text-synapse-cyan prose-code:bg-light-surface dark:prose-code:bg-deep-space/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-blockquote:border-synapse-cyan/50 prose-blockquote:bg-light-surface dark:prose-blockquote:bg-deep-space/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </motion.div>
    </div>
  );
}
