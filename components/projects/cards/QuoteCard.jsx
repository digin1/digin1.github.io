'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import ProjectCard from './ProjectCard';

/**
 * Card for displaying blockquotes/highlights
 */
export default function QuoteCard({
  quotes = [],
  onClick,
  layoutId,
  delay = 0,
}) {
  if (quotes.length === 0) return null;

  return (
    <ProjectCard
      size="small"
      onClick={onClick}
      expandable={true}
      layoutId={layoutId}
      delay={delay}
    >
      {/* Quote icon */}
      <div className="mb-3">
        <FontAwesomeIcon
          icon={faQuoteLeft}
          className="w-6 h-6 text-neural-blue/30"
        />
      </div>

      {/* All quotes */}
      <div className="space-y-4">
        {quotes.map((quote, index) => (
          <motion.blockquote
            key={index}
            className="text-light-text dark:text-ghost-white italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay * 0.1 + index * 0.1 }}
          >
            <p className="text-sm leading-relaxed">
              "{quote.text}"
            </p>
            {quote.author && (
              <footer className="mt-1 text-xs text-light-text-secondary dark:text-muted-steel not-italic">
                — {quote.author}
              </footer>
            )}
          </motion.blockquote>
        ))}
      </div>
    </ProjectCard>
  );
}
