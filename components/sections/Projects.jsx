'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function ProjectCard({ project, index }) {
  const { title, image, summary, description, tag } = project.metadata || {};
  const excerpt = summary || description || '';
  let category = '';
  if (tag) {
    const tagsArray = tag.split(',').map(t => t.trim());
    category = tagsArray[0];
  }

  return (
    <motion.div
      className="group"
      variants={staggerItem}
    >
      <Link href={`/projects/${project.id}`} className="block">
        <div className="relative rounded-xl overflow-hidden bg-white dark:bg-midnight-steel/80 border border-light-border dark:border-slate-700/50 hover:border-neural-blue/30 transition-all duration-300 card-hover">
          <div className="absolute inset-0 bg-gradient-to-r from-neural-blue/5 to-synapse-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {image && (
            <div className="relative h-48 overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 img-glow"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-midnight-steel via-transparent to-transparent" />
            </div>
          )}

          <div className="p-5 relative z-10">
            {category && (
              <span className="inline-block px-2 py-0.5 mb-3 text-xs font-mono rounded-full bg-neural-blue/10 text-neural-blue border border-neural-blue/20">
                {category}
              </span>
            )}

            <h3 className="text-lg font-display font-semibold text-light-text dark:text-ghost-white mb-2 group-hover:text-neural-blue transition-colors line-clamp-1">
              {title}
            </h3>

            <p className="text-light-text-secondary dark:text-muted-steel text-sm mb-4 line-clamp-2">
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

export default function Projects({ projects = [] }) {
  const featuredProjects = projects.slice(0, 6);

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

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {projects.length > 6 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/projects" className="btn-primary group inline-flex items-center gap-2">
              View All Projects
              <FontAwesomeIcon icon={faArrowRight} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
