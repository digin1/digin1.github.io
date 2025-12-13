'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import ProjectCard from './ProjectCard';

/**
 * Card displaying a list of features in a 3-column grid
 */
export default function FeatureListCard({
  features = [],
  onClick,
  layoutId,
  delay = 0,
  fullWidth = false,
}) {
  if (features.length === 0) return null;

  return (
    <ProjectCard
      size="large"
      onClick={onClick}
      layoutId={layoutId}
      delay={delay}
    >
      {/* Header */}
      <div className="mb-4">
        <span className="text-xs font-mono text-signal-green uppercase tracking-wider">
          Key Features
        </span>
        <h4 className="text-lg font-display font-semibold text-light-text dark:text-ghost-white">
          {features.length} Features
        </h4>
      </div>

      {/* Feature grid - 3 columns */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {features.map((feature, index) => (
          <motion.li
            key={index}
            className="flex items-start gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay * 0.1 + index * 0.03 }}
          >
            <motion.span
              className="flex-shrink-0 w-5 h-5 rounded-full bg-signal-green/20 flex items-center justify-center mt-0.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay * 0.1 + index * 0.03 + 0.1, type: 'spring' }}
            >
              <FontAwesomeIcon icon={faCheck} className="w-2.5 h-2.5 text-signal-green" />
            </motion.span>
            <span className="text-sm text-light-text dark:text-ghost-white leading-tight">
              {feature.title}
            </span>
          </motion.li>
        ))}
      </ul>
    </ProjectCard>
  );
}
