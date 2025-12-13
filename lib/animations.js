'use client';

/**
 * Animation presets for consistent motion throughout the site
 */

// Easing functions
export const easings = {
  smooth: 'power2.out',
  bounce: 'back.out(1.7)',
  elastic: 'elastic.out(1, 0.3)',
  sharp: 'power4.out',
  gentle: 'power1.inOut',
};

// Duration presets (in seconds)
export const durations = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  verySlow: 1.2,
};

// Animation presets for GSAP
export const animations = {
  fadeInUp: {
    opacity: 0,
    y: 40,
    duration: durations.normal,
    ease: easings.smooth,
  },
  fadeInDown: {
    opacity: 0,
    y: -40,
    duration: durations.normal,
    ease: easings.smooth,
  },
  fadeInLeft: {
    opacity: 0,
    x: -40,
    duration: durations.normal,
    ease: easings.smooth,
  },
  fadeInRight: {
    opacity: 0,
    x: 40,
    duration: durations.normal,
    ease: easings.smooth,
  },
  fadeIn: {
    opacity: 0,
    duration: durations.normal,
    ease: easings.smooth,
  },
  scaleIn: {
    opacity: 0,
    scale: 0.8,
    duration: durations.normal,
    ease: easings.smooth,
  },
  slideInUp: {
    y: '100%',
    duration: durations.slow,
    ease: easings.sharp,
  },
  rotateIn: {
    opacity: 0,
    rotation: -15,
    duration: durations.normal,
    ease: easings.smooth,
  },
};

// Framer Motion variants (for components already using Framer)
export const framerVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
  slideUp: {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
};

// Counter animation helper
export function animateCounter(element, target, duration = 2, prefix = '', suffix = '') {
  if (typeof window === 'undefined') return;

  const gsap = require('gsap').default;
  const obj = { value: 0 };

  gsap.to(obj, {
    value: target,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = prefix + Math.floor(obj.value) + suffix;
    },
  });
}

// Parallax speed presets
export const parallaxSpeeds = {
  slow: 0.2,
  medium: 0.5,
  fast: 0.8,
  reverse: -0.3,
};

// Scroll trigger defaults
export const scrollTriggerDefaults = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse',
};

// Mouse follower animation config
export const mouseFollowerConfig = {
  lerp: 0.1, // Linear interpolation factor
  scale: {
    default: 1,
    hover: 1.5,
    click: 0.9,
  },
};

// Page transition config
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
};

// Stagger delays
export const staggerDelays = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
};

// Check for reduced motion preference
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Get animation config based on motion preference
export function getMotionConfig(fullMotion, reducedMotion = { duration: 0 }) {
  return prefersReducedMotion() ? reducedMotion : fullMotion;
}
