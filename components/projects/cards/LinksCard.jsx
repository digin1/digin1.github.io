'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faRocket } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import ProjectCard from './ProjectCard';

/**
 * Links card with Demo and GitHub buttons
 */
export default function LinksCard({
  demo,
  github,
  delay = 0,
}) {
  const hasLinks = demo || github;

  if (!hasLinks) return null;

  const handleClick = (e, url) => {
    e.stopPropagation(); // Prevent card expansion
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <ProjectCard
      size="small"
      expandable={false}
      delay={delay}
    >
      {/* Header */}
      <div className="mb-4">
        <span className="text-xs font-mono text-synapse-cyan uppercase tracking-wider">
          Quick Links
        </span>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-3">
        {demo && (
          <motion.button
            onClick={(e) => handleClick(e, demo)}
            className="group flex items-center gap-3 px-4 py-3 rounded-xl
              bg-gradient-to-r from-neural-blue to-synapse-cyan
              text-white font-medium
              shadow-lg hover:shadow-glow-blue
              transition-shadow"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <FontAwesomeIcon icon={faRocket} className="w-4 h-4" />
            <span>Live Demo</span>
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              className="w-3 h-3 ml-auto opacity-70 group-hover:opacity-100 transition-opacity"
            />
          </motion.button>
        )}

        {github && (
          <motion.button
            onClick={(e) => handleClick(e, github)}
            className="group flex items-center gap-3 px-4 py-3 rounded-xl
              bg-light-border dark:bg-slate-700/50
              text-light-text dark:text-ghost-white font-medium
              border border-light-border dark:border-slate-600/50
              hover:border-neural-blue/50 hover:bg-neural-blue/10
              transition-all"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
            <span>View Code</span>
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              className="w-3 h-3 ml-auto opacity-70 group-hover:opacity-100 transition-opacity"
            />
          </motion.button>
        )}
      </div>
    </ProjectCard>
  );
}
