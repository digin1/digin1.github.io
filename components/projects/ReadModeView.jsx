'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

/**
 * Research paper style read mode view for project content
 * Styled to resemble academic journals like Nature.com
 * Uses Merriweather serif for body, sans-serif for headings
 * Blue subheadings, gray abstract box, max ~90 char line length
 */
export default function ReadModeView({ project }) {
  const tags = project.metadata?.tag
    ? project.metadata.tag.split(',').map(t => t.trim())
    : [];

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.article
      className="bg-white dark:bg-slate-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Article Header */}
      <header className="border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6 pt-10 pb-8 md:pt-14 md:pb-10">
          {/* Category Label */}
          {project.metadata?.category && (
            <p className="text-sm font-medium text-neural-blue mb-3 uppercase tracking-wide">
              {project.metadata.category === 'research' ? 'Research' :
               project.metadata.category === 'commercial' ? 'Commercial' :
               project.metadata.category === 'education' ? 'Academic' :
               'Project'}
            </p>
          )}

          {/* Title */}
          <h1 className="font-serif text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] leading-[1.2] font-bold text-slate-900 dark:text-white mb-5">
            {project.metadata.title}
          </h1>

          {/* Author & Meta Info */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            {project.metadata?.role && (
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {project.metadata.role}
              </span>
            )}
            {project.metadata?.role && project.metadata?.duration && (
              <span className="text-slate-400">·</span>
            )}
            {project.metadata?.duration && (
              <span>{project.metadata.duration}</span>
            )}
            {(project.metadata?.role || project.metadata?.duration) && project.metadata?.date && (
              <span className="text-slate-400">·</span>
            )}
            {project.metadata?.date && (
              <time dateTime={project.metadata.date}>
                {formatDate(project.metadata.date)}
              </time>
            )}
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {project.metadata?.image && (
        <figure className="max-w-5xl mx-auto px-6 py-8">
          <img
            src={project.metadata.image}
            alt={project.metadata.title}
            className="w-full h-auto"
          />
        </figure>
      )}

      {/* Abstract Box - Nature style gray background */}
      {project.metadata?.summary && (
        <div className="max-w-5xl mx-auto px-6 mb-8">
          <div className="bg-slate-100 dark:bg-slate-900 border-l-4 border-neural-blue p-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Abstract
            </h2>
            <p className="font-serif text-[1.0625rem] leading-[1.7] text-slate-700 dark:text-slate-300">
              {project.metadata.summary}
            </p>
          </div>
        </div>
      )}

      {/* Action Links */}
      {(project.metadata?.demo || project.metadata?.github) && (
        <div className="max-w-5xl mx-auto px-6 mb-8">
          <div className="flex flex-wrap gap-3">
            {project.metadata.demo && (
              <a
                href={project.metadata.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-neural-blue hover:bg-blue-600 rounded transition-colors"
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3.5 h-3.5" />
                View Project
              </a>
            )}
            {project.metadata.github && (
              <a
                href={project.metadata.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
              >
                <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
                Source Code
              </a>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <section
          className="
            font-serif text-[1.0625rem] leading-[1.8] text-slate-800 dark:text-slate-300

            [&>h2]:font-sans [&>h2]:text-[1.375rem] [&>h2]:font-bold [&>h2]:text-neural-blue
            [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:leading-tight

            [&>h3]:font-sans [&>h3]:text-[1.125rem] [&>h3]:font-semibold [&>h3]:text-neural-blue
            [&>h3]:mt-8 [&>h3]:mb-3

            [&>h4]:font-sans [&>h4]:text-base [&>h4]:font-semibold [&>h4]:text-slate-700 [&>h4]:dark:text-slate-300
            [&>h4]:mt-6 [&>h4]:mb-2

            [&>p]:mb-5

            [&>ul]:mb-5 [&>ul]:pl-5 [&>ul]:list-disc [&>ul]:marker:text-slate-400
            [&>ol]:mb-5 [&>ol]:pl-5 [&>ol]:list-decimal
            [&_li]:mb-1.5 [&_li]:pl-1

            [&>blockquote]:border-l-4 [&>blockquote]:border-neural-blue/50 [&>blockquote]:pl-5 [&>blockquote]:py-1
            [&>blockquote]:my-6 [&>blockquote]:italic [&>blockquote]:text-slate-600 [&>blockquote]:dark:text-slate-400

            [&_a]:text-neural-blue [&_a]:underline [&_a]:decoration-neural-blue/30
            [&_a]:underline-offset-2 [&_a:hover]:decoration-neural-blue

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
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
      </div>

      {/* Technologies Footer */}
      {tags.length > 0 && (
        <div className="border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.article>
  );
}
