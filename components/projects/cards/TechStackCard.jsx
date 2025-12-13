'use client';

import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

/**
 * Tech stack card with wrapped badge layout
 */
export default function TechStackCard({
  technologies = [],
  onClick,
  layoutId,
  delay = 0,
}) {
  // Color palette for tech badges
  const colors = [
    'from-neural-blue to-synapse-cyan',
    'from-synapse-cyan to-signal-green',
    'from-plasma-purple to-neural-blue',
    'from-signal-green to-synapse-cyan',
    'from-neural-blue to-plasma-purple',
  ];

  if (technologies.length === 0) return null;

  return (
    <ProjectCard
      size="medium"
      onClick={onClick}
      layoutId={layoutId}
      delay={delay}
    >
      {/* Header */}
      <div className="mb-4">
        <span className="text-xs font-mono text-neural-blue uppercase tracking-wider">
          Tech Stack
        </span>
        <h4 className="text-lg font-display font-semibold text-light-text dark:text-ghost-white">
          {technologies.length} Technologies
        </h4>
      </div>

      {/* Tech badges in wrapped flex layout */}
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => {
          const colorIndex = index % colors.length;

          return (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: delay * 0.1 + index * 0.05,
                duration: 0.3,
                type: 'spring',
                stiffness: 200,
              }}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <div
                className={`px-3 py-1.5 rounded-full text-xs font-medium text-white whitespace-nowrap
                  bg-gradient-to-r ${colors[colorIndex]}
                  shadow-md hover:shadow-glow-blue transition-shadow cursor-pointer`}
              >
                {tech}
              </div>
            </motion.div>
          );
        })}
      </div>
    </ProjectCard>
  );
}
