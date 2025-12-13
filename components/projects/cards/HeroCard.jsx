'use client';

import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

/**
 * Large hero card with project image, title, and summary
 */
export default function HeroCard({
  title,
  summary,
  image,
  category,
  onClick,
  layoutId,
  delay = 0,
}) {
  const categoryColors = {
    research: 'from-neural-blue to-synapse-cyan',
    commercial: 'from-signal-green to-synapse-cyan',
    personal: 'from-plasma-purple to-neural-blue',
  };

  const categoryLabels = {
    research: 'Research Tool',
    commercial: 'Commercial',
    personal: 'Personal Project',
  };

  return (
    <ProjectCard
      size="large"
      onClick={onClick}
      layoutId={layoutId}
      delay={delay}
      className="group"
    >
      {/* Image */}
      {image && (
        <div className="relative -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-4 overflow-hidden rounded-t-2xl">
          <div className="aspect-video">
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Category badge */}
          {category && (
            <div className="absolute top-4 left-4">
              <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-sm font-medium backdrop-blur-sm bg-gradient-to-r ${categoryColors[category] || categoryColors.personal}`}>
                {categoryLabels[category] || category}
              </span>
            </div>
          )}

          {/* Title overlay on image */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white drop-shadow-lg">
              {title}
            </h3>
          </div>
        </div>
      )}

      {/* Content without image */}
      {!image && (
        <>
          {category && (
            <span className={`inline-block self-start px-3 py-1.5 rounded-full text-white text-sm font-medium mb-4 bg-gradient-to-r ${categoryColors[category] || categoryColors.personal}`}>
              {categoryLabels[category] || category}
            </span>
          )}
          <h3 className="text-2xl md:text-3xl font-display font-bold text-light-text dark:text-ghost-white mb-4">
            {title}
          </h3>
        </>
      )}

      {/* Summary - full text */}
      <p className="text-light-text-secondary dark:text-muted-steel leading-relaxed">
        {summary}
      </p>
    </ProjectCard>
  );
}
