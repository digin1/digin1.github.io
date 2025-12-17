'use client';

import { useRef, useState, lazy, Suspense } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faExternalLinkAlt, faMicroscope, faBuilding, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { AnimatedCounter } from '@/components/common/AnimatedText';

// Lazy load Three.js component
const WireframeGeometry = lazy(() => import('@/components/three/WireframeGeometry'));

const categoryConfig = {
  research: {
    color: 'neural-blue',
    bgColor: 'bg-neural-blue/10',
    borderColor: 'border-neural-blue/20',
    icon: faMicroscope,
    label: 'Research Tool',
  },
  commercial: {
    color: 'signal-green',
    bgColor: 'bg-signal-green/10',
    borderColor: 'border-signal-green/20',
    icon: faBuilding,
    label: 'Commercial',
  },
  personal: {
    color: 'plasma-purple',
    bgColor: 'bg-plasma-purple/10',
    borderColor: 'border-plasma-purple/20',
    icon: faGraduationCap,
    label: 'Personal Project',
  },
};

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  const { title, image, summary, description, tag, demo, category = 'research' } = project.metadata || {};
  const categoryInfo = categoryConfig[category] || categoryConfig.research;
  const tags = tag ? tag.split(',').map(t => t.trim()).slice(0, 4) : [];
  const excerpt = summary || description || '';

  // Extract impact metrics from project metadata (if available)
  const impact = project.metadata?.impact || [];

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="relative rounded-2xl overflow-hidden bg-white/80 dark:bg-midnight-steel/70 border border-light-border dark:border-slate-700/50 hover:border-neural-blue/50 hover-card">
        {/* Image Section */}
        <div className="relative aspect-video overflow-hidden">
          {image ? (
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-neural-blue/20 to-synapse-cyan/20 flex items-center justify-center">
              <FontAwesomeIcon icon={categoryInfo.icon} className="w-16 h-16 text-neural-blue/30" />
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${categoryInfo.bgColor} text-${categoryInfo.color} text-sm font-medium backdrop-blur-sm border ${categoryInfo.borderColor}`}>
              <FontAwesomeIcon icon={categoryInfo.icon} className="w-3 h-3" />
              {categoryInfo.label}
            </span>
          </div>

          {/* Impact Metrics Overlay (if available) */}
          {impact.length > 0 && (
            <div className="absolute bottom-4 left-4 right-4 flex gap-4">
              {impact.slice(0, 2).map((item, i) => (
                <div key={i} className="px-3 py-2 rounded-lg bg-black/50 backdrop-blur-sm">
                  <div className="text-lg font-bold text-white">
                    <AnimatedCounter value={parseInt(item.value) || 0} suffix={item.value.includes('+') ? '+' : ''} />
                  </div>
                  <div className="text-xs text-white/70">{item.metric}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-xl md:text-2xl font-display font-bold text-light-text dark:text-ghost-white mb-3 group-hover:text-neural-blue transition-colors">
            {title}
          </h3>

          <p className="text-light-text-secondary dark:text-muted-steel mb-4 line-clamp-3">
            {excerpt}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-xs font-mono rounded bg-light-border dark:bg-slate-700/50 text-light-text-secondary dark:text-muted-steel"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              href={`/projects/${project.id}`}
              className="relative inline-flex items-center gap-2 text-neural-blue font-medium hover:gap-3 transition-all hover-underline"
            >
              View Case Study
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-steel hover:text-synapse-cyan transition-all hover:scale-105"
              >
                Live Demo
                <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ImpactShowcase({ projects = [], className = '' }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeFilter, setActiveFilter] = useState('all');

  // Get featured projects
  const featuredProjects = projects
    .filter(p => p.metadata?.featured === true)
    .sort((a, b) => {
      const orderA = a.metadata?.featuredOrder ?? 999;
      const orderB = b.metadata?.featuredOrder ?? 999;
      return orderA - orderB;
    })
    .slice(0, 6);

  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 6);

  // Filter projects
  const filteredProjects = activeFilter === 'all'
    ? displayProjects
    : displayProjects.filter(p => (p.metadata?.category || 'research') === activeFilter);

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="impact-showcase"
      className={`relative py-24 md:py-32 overflow-x-clip overflow-y-visible ${className}`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Three.js Wireframe Geometry */}
        <Suspense fallback={null}>
          <WireframeGeometry className="opacity-70 dark:opacity-40" />
        </Suspense>

        <div className="absolute inset-0 bg-grid-pattern opacity-20 dark:opacity-10" />
        <div className="absolute top-1/3 -left-64 w-96 h-96 bg-neural-blue/15 dark:bg-neural-blue/5 rounded-full filter blur-[128px]" />
        <div className="absolute bottom-1/3 -right-64 w-96 h-96 bg-synapse-cyan/10 dark:bg-synapse-cyan/5 rounded-full filter blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-neural-blue/10 text-neural-blue text-sm font-mono mb-4 border border-neural-blue/20">
            {'// Featured Work'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-light-text dark:text-ghost-white mb-4">
            Projects That Make an{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neural-blue to-synapse-cyan">
              Impact
            </span>
          </h2>
          <p className="text-lg text-light-text-secondary dark:text-muted-steel max-w-2xl mx-auto">
            From neuroscience research tools to enterprise applications—each project tells a story of challenges solved and impact delivered
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {[
            { key: 'all', label: 'All Projects' },
            { key: 'research', label: 'Research', icon: faMicroscope },
            { key: 'commercial', label: 'Commercial', icon: faBuilding },
            { key: 'personal', label: 'Personal', icon: faGraduationCap },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? 'bg-neural-blue text-white shadow-glow-blue'
                  : 'bg-light-surface dark:bg-midnight-steel/50 text-light-text-secondary dark:text-muted-steel hover:text-neural-blue hover:scale-105 hover:shadow-lg border border-light-border dark:border-slate-700/50 hover:border-neural-blue/50'
              }`}
            >
              {filter.icon && <FontAwesomeIcon icon={filter.icon} className="w-4 h-4" />}
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Button */}
        {projects.length > 6 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              href="/projects"
              className="btn-primary group inline-flex items-center gap-2"
            >
              View All {projects.length} Projects
              <FontAwesomeIcon
                icon={faArrowRight}
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
