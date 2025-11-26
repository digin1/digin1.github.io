'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faTimes, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function ProjectCard({ project, index }) {
  const { title, image, summary, description, date, tag } = project.metadata || {};
  const excerpt = summary || description || '';
  let category = '';
  if (tag) {
    const tagsArray = tag.split(',').map(t => t.trim());
    category = tagsArray[0];
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/projects/${project.id}`} className="block">
        <div className="relative rounded-xl overflow-hidden bg-white dark:bg-midnight-steel/80 border border-light-border dark:border-slate-700/50 hover:border-neural-blue/30 transition-all duration-300 cursor-pointer card-hover">
          <div className="absolute inset-0 bg-gradient-to-r from-neural-blue/5 to-synapse-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {image && (
            <div className="relative h-48 overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 img-glow"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-midnight-steel via-transparent to-transparent" />
            </div>
          )}

          <div className="p-5 relative z-10">
            <div className="flex items-center justify-between text-xs text-light-text-secondary dark:text-muted-steel mb-3 font-mono">
              <span>{formatDate(date)}</span>
              {category && (
                <span className="px-2 py-0.5 rounded-full bg-neural-blue/10 text-neural-blue border border-neural-blue/20">
                  {category}
                </span>
              )}
            </div>

            <h3 className="text-lg font-display font-semibold text-light-text dark:text-ghost-white mb-2 group-hover:text-neural-blue transition-colors line-clamp-1">
              {title}
            </h3>

            <p className="text-light-text-secondary dark:text-muted-steel text-sm mb-4 line-clamp-3">
              {excerpt}
            </p>

            <span className="inline-flex items-center gap-1 text-sm text-neural-blue group-hover:text-synapse-cyan transition-colors">
              View Project
              <FontAwesomeIcon icon={faChevronRight} className="text-xs transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectsClient({ projects = [] }) {
  const [activeTag, setActiveTag] = useState('');

  const allTags = useMemo(() => {
    const tagsSet = new Set();
    projects.forEach(proj => {
      if (proj.metadata?.tag) {
        proj.metadata.tag.split(',').map(t => t.trim()).forEach(t => tagsSet.add(t));
      }
    });
    return Array.from(tagsSet).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!activeTag) return projects;
    return projects.filter(proj => {
      if (!proj.metadata?.tag) return false;
      const projTags = proj.metadata.tag.split(',').map(t => t.trim());
      return projTags.includes(activeTag);
    });
  }, [projects, activeTag]);

  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      const dateA = a.metadata?.date ? new Date(a.metadata.date) : new Date(0);
      const dateB = b.metadata?.date ? new Date(b.metadata.date) : new Date(0);
      return dateB - dateA;
    });
  }, [filteredProjects]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-neural-blue/10 text-neural-blue text-sm font-mono mb-4 border border-neural-blue/20">
          {'// Portfolio'}
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-light-text dark:text-ghost-white mb-4">
          My <span className="text-gradient">Projects</span>
        </h1>
        <p className="max-w-2xl mx-auto text-light-text-secondary dark:text-muted-steel mb-8">
          Explore the projects I've been working on
        </p>

        {allTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {allTags.map(tag => (
              <motion.button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTag === tag
                    ? 'bg-gradient-to-r from-neural-blue to-synapse-cyan text-white'
                    : 'bg-light-surface dark:bg-midnight-steel/50 text-light-text-secondary dark:text-muted-steel hover:text-light-text dark:hover:text-ghost-white border border-light-border dark:border-slate-700/50 hover:border-neural-blue/30'
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
        {sortedProjects.length === 0 ? (
          <motion.div
            className="text-center glass-card p-12 max-w-xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="w-16 h-16 rounded-full bg-neural-blue/10 flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faFolder} className="text-neural-blue text-2xl" />
            </div>
            <h3 className="text-xl font-display font-semibold text-light-text dark:text-ghost-white mb-2">
              No projects found
            </h3>
            <p className="text-light-text-secondary dark:text-muted-steel">
              {activeTag ? 'Try selecting a different tag or clear the filter.' : 'Check back soon for updates!'}
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {sortedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
