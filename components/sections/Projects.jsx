'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronLeft, faChevronRight, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 500 : -500,
    opacity: 0,
  }),
};

function ProjectSlide({ project }) {
  const { title, image, summary, description, tag, demo } = project.metadata || {};
  const excerpt = summary || description || '';
  const tags = tag ? tag.split(',').map(t => t.trim()).slice(0, 4) : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      {/* Image */}
      <div className="relative rounded-2xl overflow-hidden group">
        <div className="absolute -inset-1 bg-gradient-to-r from-neural-blue to-synapse-cyan rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
        <div className="relative aspect-video rounded-xl overflow-hidden border border-light-border dark:border-slate-700/50">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 img-glow"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-neural-blue/20 to-synapse-cyan/20 flex items-center justify-center">
              <span className="text-4xl font-display font-bold text-neural-blue/50">
                {title?.charAt(0) || 'P'}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-light-text dark:text-ghost-white mb-4">
            {title}
          </h3>
          <p className="text-light-text-secondary dark:text-muted-steel text-lg leading-relaxed line-clamp-4">
            {excerpt}
          </p>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-sm font-mono rounded-full bg-neural-blue/10 text-neural-blue border border-neural-blue/20"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <Link
            href={`/projects/${project.id}`}
            className="btn-primary inline-flex items-center gap-2"
          >
            View Details
            <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
          </Link>
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2"
            >
              Live Demo
              <FontAwesomeIcon icon={faExternalLinkAlt} className="text-sm" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects = [] }) {
  const [[currentIndex, direction], setSlide] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  // Filter projects that have featured: true, sort by featuredOrder, or take first 6 if none marked
  const markedFeatured = projects
    .filter(p => p.metadata?.featured === true)
    .sort((a, b) => {
      const orderA = a.metadata?.featuredOrder ?? 999;
      const orderB = b.metadata?.featuredOrder ?? 999;
      return orderA - orderB;
    });
  const featuredProjects = markedFeatured.length > 0
    ? markedFeatured.slice(0, 6)
    : projects.slice(0, 6);
  const totalSlides = featuredProjects.length;

  const paginate = useCallback((newDirection) => {
    setSlide(([prevIndex]) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = totalSlides - 1;
      if (nextIndex >= totalSlides) nextIndex = 0;
      return [nextIndex, newDirection];
    });
  }, [totalSlides]);

  const goToSlide = (index) => {
    const newDirection = index > currentIndex ? 1 : -1;
    setSlide([index, newDirection]);
  };

  // Auto-advance slides
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, paginate, totalSlides]);

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="section" id="projects">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-neural-blue/10 text-neural-blue text-sm font-mono mb-4 border border-neural-blue/20">
            {'// Featured Work'}
          </span>
          <h2 className="section-title">
            My <span>Projects</span>
          </h2>
          <p className="description mx-auto text-center">
            A selection of projects that showcase my skills and expertise
          </p>
        </motion.div>

        {/* Slideshow Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Slide Area */}
          <div className="relative overflow-hidden rounded-2xl bg-light-surface dark:bg-midnight-steel/30 border border-light-border dark:border-slate-700/50 p-6 md:p-10 min-h-[400px] md:min-h-[450px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              >
                <ProjectSlide project={featuredProjects[currentIndex]} />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {totalSlides > 1 && (
              <>
                <button
                  onClick={() => paginate(-1)}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 dark:bg-midnight-steel/80 border border-light-border dark:border-slate-700/50 flex items-center justify-center text-light-text dark:text-ghost-white hover:bg-neural-blue hover:text-white hover:border-neural-blue transition-all duration-300 shadow-lg z-10"
                  aria-label="Previous project"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 dark:bg-midnight-steel/80 border border-light-border dark:border-slate-700/50 flex items-center justify-center text-light-text dark:text-ghost-white hover:bg-neural-blue hover:text-white hover:border-neural-blue transition-all duration-300 shadow-lg z-10"
                  aria-label="Next project"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </>
            )}
          </div>

          {/* Dot Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {featuredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-8 h-2 bg-gradient-to-r from-neural-blue to-synapse-cyan'
                      : 'w-2 h-2 bg-light-border dark:bg-slate-700 hover:bg-neural-blue/50'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                  aria-current={index === currentIndex ? 'true' : 'false'}
                />
              ))}
            </div>
          )}

          {/* Slide Counter */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 px-3 py-1 rounded-full bg-white/80 dark:bg-midnight-steel/80 border border-light-border dark:border-slate-700/50 text-sm font-mono text-light-text-secondary dark:text-muted-steel">
            {currentIndex + 1} / {totalSlides}
          </div>
        </motion.div>

        {/* View All Button */}
        {projects.length > 1 && (
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/projects" className="btn-secondary group inline-flex items-center gap-2">
              View All {projects.length} Projects
              <FontAwesomeIcon icon={faArrowRight} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
