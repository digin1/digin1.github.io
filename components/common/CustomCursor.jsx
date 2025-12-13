'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * CustomCursor - A minimal, elegant cursor with dot + trailing ring
 * Only shows on desktop devices (non-touch)
 */
export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Dot follows cursor exactly
  const dotX = useSpring(cursorX, { damping: 30, stiffness: 500 });
  const dotY = useSpring(cursorY, { damping: 30, stiffness: 500 });

  // Ring trails behind with more lag
  const ringX = useSpring(cursorX, { damping: 20, stiffness: 150 });
  const ringY = useSpring(cursorY, { damping: 20, stiffness: 150 });

  useEffect(() => {
    // Don't show custom cursor on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Hover detection for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Delay to ensure DOM is ready
    setTimeout(addHoverListeners, 100);

    // Re-run on DOM changes
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  // Don't render on server
  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Outer ring - trails behind */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-neural-blue/40 hidden lg:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 48 : isClicking ? 24 : 32,
          height: isHovering ? 48 : isClicking ? 24 : 32,
          opacity: isVisible ? (isHovering ? 0.8 : 0.5) : 0,
          borderColor: isHovering ? 'rgba(59, 130, 246, 0.6)' : 'rgba(59, 130, 246, 0.3)',
        }}
        transition={{
          width: { type: 'spring', damping: 20, stiffness: 300 },
          height: { type: 'spring', damping: 20, stiffness: 300 },
          opacity: { duration: 0.15 },
        }}
      />

      {/* Inner dot - follows cursor closely */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-neural-blue hidden lg:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isClicking ? 10 : 8,
          height: isClicking ? 10 : 8,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { duration: 0.1 },
          height: { duration: 0.1 },
          opacity: { duration: 0.15 },
        }}
      />

      {/* Hide default cursor globally on large screens */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
