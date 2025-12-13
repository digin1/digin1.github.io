'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';

/**
 * Base card component for interactive project view
 * Supports different sizes and expandable behavior
 */
const ProjectCard = forwardRef(function ProjectCard({
  children,
  size = 'medium',
  onClick,
  expandable = true,
  className = '',
  layoutId,
  delay = 0,
  ...props
}, ref) {
  // Padding based on size hint
  const paddingClasses = {
    tiny: 'p-3',
    small: 'p-4',
    medium: 'p-5',
    large: 'p-5 md:p-6',
    xl: 'p-5 md:p-6',
    wide: 'p-5',
    tall: 'p-5',
  };

  return (
    <motion.div
      ref={ref}
      layoutId={layoutId}
      className={`
        ${paddingClasses[size] || 'p-5'}
        relative rounded-2xl overflow-hidden
        bg-light-surface/80 dark:bg-midnight-steel/50
        backdrop-blur-lg
        border border-light-border dark:border-slate-700/50
        hover:border-neural-blue/30 dark:hover:border-neural-blue/30
        transition-colors duration-300
        ${expandable ? 'cursor-pointer' : ''}
        ${className}
      `}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay: delay * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={expandable ? {
        scale: 1.02,
        y: -4,
        boxShadow: '0 20px 40px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)',
      } : {}}
      whileTap={expandable ? { scale: 0.98 } : {}}
      onClick={expandable ? onClick : undefined}
      {...props}
    >
      {/* Glass shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>

      {/* Expand indicator */}
      {expandable && (
        <motion.div
          className="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-neural-blue/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <svg
            className="w-3 h-3 text-neural-blue"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
});

export default ProjectCard;
