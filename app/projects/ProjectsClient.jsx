'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faMagnifyingGlass,
  faTimes,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';

const categoryLabels = {
  research: 'Research project',
  commercial: 'Commercial project',
  personal: 'Independent project',
  education: 'Academic project',
};

function getTags(tagString = '', limit = 3) {
  return tagString
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, limit);
}

function getYear(dateString) {
  if (!dateString) return 'Undated';
  return new Date(dateString).getFullYear().toString();
}

function FeaturedProject({ project, index }) {
  const { title, summary, role, tag, image, category } = project.metadata || {};
  const tags = getTags(tag, 5);
  const categoryLabel = categoryLabels[category] || 'Case study';

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <Link
        href={`/projects/${project.id}`}
        className="group block editorial-card overflow-hidden hover:border-zinc-600 dark:hover:border-zinc-700 transition-colors"
      >
        {/* Image — full width on top */}
        {image && (
          <div className="aspect-[2.4/1] w-full overflow-hidden border-b border-light-border dark:border-zinc-800 bg-zinc-950">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-3">
            <span className="eyebrow">{categoryLabel}</span>
            {role && <span className="meta-label">{role}</span>}
          </div>

          <h2 className="mt-3 font-display font-bold text-xl tracking-tight text-light-text dark:text-ghost-white group-hover:text-neural-blue transition-colors">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-light-text-secondary dark:text-muted-steel line-clamp-2">
            {summary}
          </p>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {tags.map((stackTag) => (
                <span key={stackTag} className="tag">{stackTag}</span>
              ))}
            </div>
            <span className="shrink-0 text-sm font-medium text-neural-blue group-hover:text-synapse-cyan flex items-center gap-1.5">
              View
              <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function ArchiveRow({ project, index }) {
  const { title, summary, description, tag, role, category, date } = project.metadata || {};
  const excerpt = summary || description || '';
  const tags = getTags(tag, 3);
  const categoryLabel = categoryLabels[category] || category || 'Project';

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: Math.min(index * 0.03, 0.24) }}
    >
      <Link
        href={`/projects/${project.id}`}
        className="group block rounded-2xl border border-light-border bg-light-card p-4 hover:border-neural-blue/40 hover:bg-neural-blue/5 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-slate-950/35"
      >
        <div className="grid gap-4 md:grid-cols-[88px_minmax(0,1.6fr)_minmax(180px,0.9fr)_auto] md:items-start">
          <div className="min-w-0">
            <p className="meta-label">Year</p>
            <p className="mt-2 text-sm font-semibold text-light-text dark:text-ghost-white">
              {getYear(date)}
            </p>
          </div>

          <div className="min-w-0">
            <p className="meta-label">Project</p>
            <h3 className="mt-2 text-lg font-display font-bold tracking-tight text-light-text group-hover:text-neural-blue dark:text-ghost-white">
              {title}
            </h3>
            <p className="mt-2 max-w-[62ch] text-sm leading-7 text-light-text-secondary dark:text-muted-steel">
              {excerpt}
            </p>
          </div>

          <div className="min-w-0">
            <p className="meta-label">Role and focus</p>
            <p className="mt-2 text-sm font-medium text-light-text dark:text-ghost-white">
              {role || 'Engineering'}
            </p>
            {categoryLabel ? (
              <p className="mt-1 text-sm leading-6 text-light-text-secondary dark:text-muted-steel">
                {categoryLabel}
              </p>
            ) : null}
            {tags.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((stackTag) => (
                  <span key={stackTag} className="tag">
                    {stackTag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex items-center md:justify-end">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-neural-blue group-hover:text-synapse-cyan">
              Case study
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function ProjectsClient({ projects = [] }) {
  const [activeTag, setActiveTag] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const allowedTags = new Set([
    'Python', 'React', 'Flask', 'Three.js', 'Docker', 'Docker Swarm',
    'Next.js', 'FastAPI', 'PostgreSQL', 'TypeScript', 'JavaScript',
    'NumPy', 'PyTorch', 'CUDA', 'D3.js', 'Celery', 'Redis',
    'Dask', 'OpenCV', 'WebGL', 'Tailwind CSS', 'SQLite',
    'Desktop App', 'GPU Computing', 'REST API', 'Data Visualization',
    'Microscopy', 'Neuroscience', 'Image Processing',
  ]);

  const allTags = useMemo(() => {
    const tags = new Set();
    projects.forEach((project) => {
      if (project.metadata?.tag) {
        project.metadata.tag.split(',').forEach((t) => {
          const trimmed = t.trim();
          if (allowedTags.has(trimmed)) tags.add(trimmed);
        });
      }
    });
    return Array.from(tags).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let result = projects;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((project) => {
        const title = project.metadata?.title?.toLowerCase() || '';
        const summary = project.metadata?.summary?.toLowerCase() || '';
        const description = project.metadata?.description?.toLowerCase() || '';
        const tags = project.metadata?.tag?.toLowerCase() || '';
        return title.includes(query) || summary.includes(query) || description.includes(query) || tags.includes(query);
      });
    }

    if (activeTag) {
      result = result.filter((project) => {
        const projectTags = project.metadata?.tag
          ? project.metadata.tag.split(',').map((tag) => tag.trim())
          : [];
        return projectTags.includes(activeTag);
      });
    }

    return [...result].sort((a, b) => {
      const dateA = a.metadata?.date ? new Date(a.metadata.date) : new Date(0);
      const dateB = b.metadata?.date ? new Date(b.metadata.date) : new Date(0);
      return dateB - dateA;
    });
  }, [projects, searchQuery, activeTag]);

  const featuredProjects = useMemo(() => {
    return projects
      .filter((project) => project.metadata?.featured === true)
      .sort((a, b) => (a.metadata?.featuredOrder ?? 999) - (b.metadata?.featuredOrder ?? 999))
      .slice(0, 2);
  }, [projects]);

  const hasActiveFilters = Boolean(activeTag || searchQuery.trim());

  const clearFilters = () => {
    setActiveTag('');
    setSearchQuery('');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42 }}
          className="border-b border-light-border pb-5 dark:border-zinc-800"
        >
          <span className="eyebrow mb-2">Selected work</span>
          <h1 className="max-w-3xl font-display font-bold text-[2.2rem] leading-[1.05] tracking-tight text-light-text dark:text-ghost-white sm:text-[2.6rem]">
            Case studies across research software, visualisation, and infrastructure.
          </h1>
          <p className="mt-3 max-w-3xl text-[0.95rem] leading-7 text-light-text-secondary dark:text-muted-steel">
            These projects span scientific databases, microscopy tooling, browser-based 3D visualisation, research interfaces, and infrastructure-heavy systems. Some are public, some institutional, but all show the same working style: practical engineering for difficult problems.
          </p>
        </motion.header>

        {/* Search bar — full width */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mt-4"
        >
          <div className="relative">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-lg border border-light-border bg-light-surface py-2.5 pl-11 pr-10 text-sm text-light-text outline-none placeholder:text-zinc-400 focus:border-neural-blue dark:border-zinc-800 dark:bg-zinc-900 dark:text-ghost-white"
              aria-label="Search work"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-light-text dark:hover:text-ghost-white"
                aria-label="Clear search"
              >
                <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="text-xs text-zinc-500">
              {hasActiveFilters
                ? `${filteredProjects.length} matching project${filteredProjects.length === 1 ? '' : 's'}`
                : `${filteredProjects.length} projects`}
            </p>
            {hasActiveFilters ? (
              <button onClick={clearFilters} className="text-xs text-neural-blue hover:text-synapse-cyan">
                Clear filters
              </button>
            ) : null}
          </div>
        </motion.div>

        {!hasActiveFilters && featuredProjects.length > 0 ? (
          <section className="mt-8">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Featured case studies</p>
                <p className="mt-2 text-sm leading-6 text-light-text-secondary dark:text-muted-steel">
                  Start here if you want the clearest view of the strongest public-facing work.
                </p>
              </div>
            </div>
            <div className="grid gap-6 xl:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <FeaturedProject key={project.id} project={project} index={index} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px]">
            {/* Archive list — left */}
            <div>
              <div className="mb-4 border-b border-light-border pb-3 dark:border-zinc-800">
                <p className="eyebrow">Archive</p>
              </div>

              <AnimatePresence mode="wait">
                {filteredProjects.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center"
                  >
                    <p className="text-sm text-zinc-500">No matching projects. Try a broader search or clear filters.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`${activeTag}-${searchQuery}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    {filteredProjects.map((project, index) => (
                      <ArchiveRow key={project.id} project={project} index={index} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tag sidebar — right */}
            {allTags.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">Filter by tech</p>
                  <div className="flex flex-wrap gap-1.5">
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
                        className={`text-[11px] font-mono px-2 py-1 rounded transition-colors ${
                          activeTag === tag
                            ? 'bg-neural-blue text-deep-space'
                            : 'text-zinc-500 hover:text-light-text hover:bg-zinc-100 dark:hover:text-zinc-300 dark:hover:bg-zinc-800/50'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
