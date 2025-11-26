'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function ProjectClient({ project }) {
  const tags = project.metadata?.tag
    ? project.metadata.tag.split(',').map(t => t.trim())
    : [];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          href="/projects"
          className="inline-flex items-center text-light-text-secondary dark:text-muted-steel hover:text-light-text dark:hover:text-ghost-white transition-colors mb-8 group"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>

        <article className="glass-card overflow-hidden max-w-4xl mx-auto">
          {project.metadata?.image && (
            <figure className="relative overflow-hidden">
              <img
                src={project.metadata.image}
                alt={project.metadata.title}
                className="w-full h-auto object-contain img-glow"
              />
            </figure>
          )}

          <div className="p-6 sm:p-8 md:p-10 lg:p-12">
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-light-text dark:text-ghost-white mb-6 leading-tight">
                {project.metadata.title}
              </h1>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 text-sm font-mono rounded-full bg-neural-blue/10 text-neural-blue border border-neural-blue/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {(project.metadata?.demo || project.metadata?.github) && (
                <div className="flex flex-wrap gap-4">
                  {project.metadata.demo && (
                    <a
                      href={project.metadata.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-2" />
                      Live Demo
                    </a>
                  )}
                  {project.metadata.github && (
                    <a
                      href={project.metadata.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                    >
                      <FontAwesomeIcon icon={faGithub} className="mr-2" />
                      View Code
                    </a>
                  )}
                </div>
              )}
            </header>

            <div className="h-px bg-gradient-to-r from-light-border dark:from-slate-700/50 via-neural-blue/30 to-light-border dark:to-slate-700/50 mb-8" />

            <section
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-display prose-headings:text-light-text dark:prose-headings:text-ghost-white prose-p:text-light-text-secondary dark:prose-p:text-muted-steel prose-a:text-neural-blue hover:prose-a:text-synapse-cyan prose-strong:text-light-text dark:prose-strong:text-ghost-white prose-code:text-synapse-cyan prose-code:bg-light-surface dark:prose-code:bg-deep-space/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </div>
        </article>
      </motion.div>
    </div>
  );
}
