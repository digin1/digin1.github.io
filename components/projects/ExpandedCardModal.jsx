'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

/**
 * Modal overlay for expanded card view
 * Uses Framer Motion layoutId for smooth expand animation
 */
export default function ExpandedCardModal({
  isOpen,
  onClose,
  layoutId,
  title,
  children,
}) {
  // Handle ESC key to close
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div
              layoutId={layoutId}
              className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden pointer-events-auto
                bg-light-surface dark:bg-midnight-steel
                border border-light-border dark:border-slate-700/50
                shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300,
              }}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-4 md:p-6 border-b border-light-border dark:border-slate-700/50 bg-light-surface/95 dark:bg-midnight-steel/95 backdrop-blur-sm">
                <h2 className="text-xl md:text-2xl font-display font-bold text-light-text dark:text-ghost-white">
                  {title}
                </h2>
                <motion.button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-light-border/50 dark:bg-slate-700/50 flex items-center justify-center text-light-text-secondary dark:text-muted-steel hover:text-neural-blue hover:bg-neural-blue/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-4 md:p-6">
                {children}
              </div>

              {/* Glass effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook to manage expanded card state
 */
export function useExpandedCard() {
  const [expandedCard, setExpandedCard] = useState(null);

  const openCard = useCallback((cardId, cardData) => {
    setExpandedCard({ id: cardId, data: cardData });
  }, []);

  const closeCard = useCallback(() => {
    setExpandedCard(null);
  }, []);

  return {
    expandedCard,
    openCard,
    closeCard,
    isExpanded: (cardId) => expandedCard?.id === cardId,
  };
}
