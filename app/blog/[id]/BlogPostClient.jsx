'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

/**
 * Blog post page styled like a research article (Nature.com style)
 */
export default function BlogPostClient({ post, prevPost, nextPost }) {
  const tags = post.metadata?.tag
    ? post.metadata.tag.split(',').map(t => t.trim())
    : [];

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.article
      className="bg-white dark:bg-slate-950 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Navigation Header */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <div className="flex items-center justify-between lg:relative">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-synapse-cyan transition-colors group"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2 w-3 h-3 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Back to Blog</span>
            <span className="sm:hidden">Back</span>
          </Link>

          {/* Post Navigation Arrows - Centered on lg+, auto on smaller */}
          <div className="flex items-center gap-1 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.id}`}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-synapse-cyan hover:bg-synapse-cyan/10 transition-all"
                title={prevPost.title}
              >
                <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
              </Link>
            ) : (
              <span className="p-2 text-slate-300 dark:text-slate-700 cursor-not-allowed">
                <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
              </span>
            )}
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.id}`}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-synapse-cyan hover:bg-synapse-cyan/10 transition-all"
                title={nextPost.title}
              >
                <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
              </Link>
            ) : (
              <span className="p-2 text-slate-300 dark:text-slate-700 cursor-not-allowed">
                <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
              </span>
            )}
          </div>

          {/* Spacer for layout balance - only on lg+ */}
          <div className="hidden lg:block w-20"></div>
        </div>
      </div>

      {/* Article Header */}
      <header className="border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6 pt-8 pb-8 md:pt-10 md:pb-10">
          {/* Category */}
          <p className="text-sm font-medium text-synapse-cyan mb-3 uppercase tracking-wide">
            Blog
          </p>

          {/* Title */}
          <h1 className="font-serif text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] leading-[1.2] font-bold text-slate-900 dark:text-white mb-5">
            {post.metadata.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            {post.metadata.author && (
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {post.metadata.author}
              </span>
            )}
            {post.metadata.author && post.metadata.date && (
              <span className="text-slate-400">·</span>
            )}
            {post.metadata.date && (
              <time dateTime={post.metadata.date}>
                {formatDate(post.metadata.date)}
              </time>
            )}
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.metadata?.image && (
        <figure className="max-w-5xl mx-auto px-6 py-8">
          <img
            src={post.metadata.image}
            alt={post.metadata.title}
            className="w-full h-auto"
          />
        </figure>
      )}

      {/* Summary/Abstract Box */}
      {post.metadata?.summary && (
        <div className="max-w-5xl mx-auto px-6 mb-8">
          <div className="bg-slate-100 dark:bg-slate-900 border-l-4 border-synapse-cyan p-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Summary
            </h2>
            <p className="font-serif text-[1.0625rem] leading-[1.7] text-slate-700 dark:text-slate-300">
              {post.metadata.summary}
            </p>
          </div>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Link
                key={index}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="px-3 py-1 text-sm font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <section
          className="
            font-serif text-[1.0625rem] leading-[1.8] text-slate-800 dark:text-slate-300

            [&>h2]:font-sans [&>h2]:text-[1.375rem] [&>h2]:font-bold [&>h2]:text-synapse-cyan
            [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:leading-tight

            [&>h3]:font-sans [&>h3]:text-[1.125rem] [&>h3]:font-semibold [&>h3]:text-synapse-cyan
            [&>h3]:mt-8 [&>h3]:mb-3

            [&>h4]:font-sans [&>h4]:text-base [&>h4]:font-semibold [&>h4]:text-slate-700 [&>h4]:dark:text-slate-300
            [&>h4]:mt-6 [&>h4]:mb-2

            [&>p]:mb-5

            [&>ul]:mb-5 [&>ul]:pl-5 [&>ul]:list-disc [&>ul]:marker:text-slate-400
            [&>ol]:mb-5 [&>ol]:pl-5 [&>ol]:list-decimal
            [&_li]:mb-1.5 [&_li]:pl-1

            [&>blockquote]:border-l-4 [&>blockquote]:border-synapse-cyan/50 [&>blockquote]:pl-5 [&>blockquote]:py-1
            [&>blockquote]:my-6 [&>blockquote]:italic [&>blockquote]:text-slate-600 [&>blockquote]:dark:text-slate-400

            [&_a]:text-synapse-cyan [&_a]:underline [&_a]:decoration-synapse-cyan/30
            [&_a]:underline-offset-2 [&_a:hover]:decoration-synapse-cyan

            [&_strong]:font-bold [&_strong]:text-slate-900 [&_strong]:dark:text-white

            [&_code]:font-mono [&_code]:text-[0.9375rem] [&_code]:text-rose-600 [&_code]:dark:text-rose-400
            [&_code]:bg-slate-100 [&_code]:dark:bg-slate-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded

            [&>pre]:bg-slate-900 [&>pre]:text-slate-200 [&>pre]:rounded
            [&>pre]:p-4 [&>pre]:my-6 [&>pre]:overflow-x-auto
            [&>pre]:text-sm [&>pre]:leading-relaxed [&>pre]:font-mono
            [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-slate-200

            [&>hr]:my-8 [&>hr]:border-slate-200 [&>hr]:dark:border-slate-800

            [&_img]:my-6 [&_img]:max-w-full

            [&_table]:w-full [&_table]:my-6 [&_table]:text-[0.9375rem] [&_table]:font-sans
            [&_th]:text-left [&_th]:font-semibold [&_th]:p-3 [&_th]:bg-slate-100 [&_th]:dark:bg-slate-800
            [&_th]:border-b [&_th]:border-slate-300 [&_th]:dark:border-slate-700
            [&_td]:p-3 [&_td]:border-b [&_td]:border-slate-200 [&_td]:dark:border-slate-800
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
            {post.metadata?.date && (
              <span>Published: {formatDate(post.metadata.date)}</span>
            )}
            <Link
              href="/blog"
              className="hover:text-synapse-cyan transition-colors"
            >
              ← Back to all posts
            </Link>
          </div>
        </div>
      </footer>
    </motion.article>
  );
}
