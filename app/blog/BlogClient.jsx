'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faTimes, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function BlogPostCard({ post, index }) {
  const { title, image, summary, description, date, tag } = post.metadata || {};

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.id}`} className="block">
        <div className="flex flex-col md:flex-row items-stretch rounded-xl overflow-hidden bg-white dark:bg-midnight-steel/80 border border-light-border dark:border-slate-700/50 hover:border-synapse-cyan/30 transition-all duration-300 cursor-pointer card-hover">
          {image && (
            <div className="md:w-1/2 relative overflow-hidden">
              <div className="h-64 md:h-full min-h-[200px]">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 img-glow"
                />
              </div>
            </div>
          )}

          <div className={`${image ? 'md:w-1/2' : 'w-full'} p-6 md:p-8 flex flex-col justify-between relative z-10`}>
            <div>
              <h3 className="text-2xl font-display font-bold mb-3 text-light-text dark:text-ghost-white group-hover:text-synapse-cyan transition-colors">
                {title}
              </h3>

              {tag && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tag.split(',').slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-mono rounded-full bg-synapse-cyan/10 text-synapse-cyan border border-synapse-cyan/20"
                    >
                      {t.trim()}
                    </span>
                  ))}
                </div>
              )}

              {date && (
                <p className="text-sm text-light-text-secondary dark:text-muted-steel mb-3 font-mono">
                  {formatDate(date)}
                </p>
              )}

              <p className="text-light-text-secondary dark:text-muted-steel mb-4 line-clamp-4">
                {summary || description || ''}
              </p>
            </div>

            <span className="inline-flex items-center text-neural-blue font-medium group-hover:text-synapse-cyan mt-4">
              Read More
              <FontAwesomeIcon icon={faChevronRight} className="ml-2 text-sm transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogClient({ posts = [] }) {
  const [activeTag, setActiveTag] = useState('');

  const allTags = useMemo(() => {
    const tagsSet = new Set();
    posts.forEach(post => {
      if (post.metadata?.tag) {
        post.metadata.tag.split(',').map(t => t.trim()).forEach(t => tagsSet.add(t));
      }
    });
    return Array.from(tagsSet).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter(post => {
      if (!post.metadata?.tag) return false;
      const postTags = post.metadata.tag.split(',').map(t => t.trim());
      return postTags.includes(activeTag);
    });
  }, [posts, activeTag]);

  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      const dateA = a.metadata?.date ? new Date(a.metadata.date) : new Date(0);
      const dateB = b.metadata?.date ? new Date(b.metadata.date) : new Date(0);
      return dateB - dateA;
    });
  }, [filteredPosts]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-synapse-cyan/10 text-synapse-cyan text-sm font-mono mb-4 border border-synapse-cyan/20">
          {'// Articles & Insights'}
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-light-text dark:text-ghost-white mb-4">
          My <span className="text-gradient">Blog</span>
        </h1>
        <p className="max-w-2xl mx-auto text-light-text-secondary dark:text-muted-steel mb-8">
          Explore my thoughts, insights, and experiences
        </p>

        {allTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {allTags.map(tag => (
              <motion.button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTag === tag
                    ? 'bg-gradient-to-r from-synapse-cyan to-neural-blue text-white'
                    : 'bg-light-surface dark:bg-midnight-steel/50 text-light-text-secondary dark:text-muted-steel hover:text-light-text dark:hover:text-ghost-white border border-light-border dark:border-slate-700/50 hover:border-synapse-cyan/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tag}
              </motion.button>
            ))}
            {activeTag && (
              <motion.button
                onClick={() => setActiveTag('')}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={faTimes} className="mr-2" />
                Clear
              </motion.button>
            )}
          </div>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {sortedPosts.length === 0 ? (
          <motion.div
            className="text-center glass-card p-12 max-w-xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="w-16 h-16 rounded-full bg-synapse-cyan/10 flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faNewspaper} className="text-synapse-cyan text-2xl" />
            </div>
            <h3 className="text-xl font-display font-semibold text-light-text dark:text-ghost-white mb-2">
              No blog posts found
            </h3>
            <p className="text-light-text-secondary dark:text-muted-steel">
              {activeTag ? 'Try selecting a different tag or clear the filter.' : 'Check back soon for new content!'}
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {sortedPosts.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
