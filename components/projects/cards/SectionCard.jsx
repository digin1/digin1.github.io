'use client';

import ProjectCard from './ProjectCard';

/**
 * Card for displaying a markdown section with formatted preview
 */
export default function SectionCard({
  title,
  preview,
  content,
  subsections = [],
  onClick,
  layoutId,
  delay = 0,
  size = 'medium',
}) {
  return (
    <ProjectCard
      size={size}
      onClick={onClick}
      layoutId={layoutId}
      delay={delay}
      className="group"
    >
      {/* Section title */}
      <h4 className="text-lg font-display font-bold text-light-text dark:text-ghost-white mb-3 group-hover:text-neural-blue transition-colors">
        {title}
      </h4>

      {/* Subsections badges */}
      {subsections.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {subsections.slice(0, 3).map((sub, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 text-xs font-mono rounded bg-neural-blue/10 text-neural-blue"
            >
              {sub.title}
            </span>
          ))}
          {subsections.length > 3 && (
            <span className="px-2 py-0.5 text-xs font-mono rounded bg-light-border dark:bg-slate-700/50 text-light-text-secondary dark:text-muted-steel">
              +{subsections.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Formatted preview content */}
      <div
        className="prose prose-sm max-w-none dark:prose-invert
          prose-p:text-light-text-secondary dark:prose-p:text-muted-steel prose-p:my-1
          prose-ul:my-1 prose-li:my-0 prose-li:text-light-text-secondary dark:prose-li:text-muted-steel
          prose-strong:text-light-text dark:prose-strong:text-ghost-white
          prose-a:text-neural-blue
          prose-headings:text-light-text dark:prose-headings:text-ghost-white prose-headings:text-base prose-headings:my-2
          prose-code:text-synapse-cyan prose-code:bg-transparent prose-code:px-1 prose-code:py-0.5
          prose-pre:bg-slate-800 prose-pre:text-slate-200"
        dangerouslySetInnerHTML={{ __html: preview }}
      />
    </ProjectCard>
  );
}
