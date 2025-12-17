'use client';

import { useState, useEffect } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

/**
 * Bridge Framer Motion scroll values to Three.js components
 * @param {React.RefObject} containerRef - Reference to the scroll container
 * @param {Object} options - Scroll options
 * @returns {number} Normalized scroll progress (0-1)
 */
export function useThreeScroll(containerRef, options = {}) {
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: options.offset || ['start center', 'end center'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(latest);
  });

  return scrollProgress;
}

/**
 * Get global page scroll progress
 * @returns {number} Normalized scroll progress (0-1)
 */
export function useGlobalScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(latest);
  });

  return scrollProgress;
}

export default useThreeScroll;
