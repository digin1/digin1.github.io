'use client';

import { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Hook to create a GSAP context for cleanup
 */
export function useGSAP(callback, dependencies = []) {
  const contextRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    contextRef.current = gsap.context(() => {
      callback(prefersReducedMotion);
    });

    return () => {
      contextRef.current?.revert();
    };
  }, dependencies);

  return contextRef;
}

/**
 * Hook for scroll-triggered animations
 */
export function useScrollTrigger(trigger, animation, options = {}) {
  const elementRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    if (!elementRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(elementRef.current, {
        ...animation,
        scrollTrigger: {
          trigger: trigger || elementRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          ...options,
        },
      });
    });

    return () => ctx.revert();
  }, [trigger, animation, options]);

  return elementRef;
}

/**
 * Hook for parallax effects
 */
export function useParallax(speed = 0.5) {
  const elementRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    if (!elementRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(elementRef.current, {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return elementRef;
}

/**
 * Hook for text reveal animations (character by character)
 */
export function useTextReveal(options = {}) {
  const elementRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    if (!elementRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const element = elementRef.current;
    const text = element.textContent;
    element.innerHTML = '';

    // Split text into characters
    const chars = text.split('').map((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      element.appendChild(span);
      return span;
    });

    const ctx = gsap.context(() => {
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.02,
        ease: 'power2.out',
        scrollTrigger: options.scrollTrigger ? {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none',
          ...options.scrollTrigger,
        } : undefined,
        ...options,
      });
    });

    return () => ctx.revert();
  }, [options]);

  return elementRef;
}

/**
 * Hook for scroll progress tracking
 */
export function useScrollProgress() {
  const progressRef = useRef(0);

  useIsomorphicLayoutEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current = docHeight > 0 ? scrollTop / docHeight : 0;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progressRef;
}

/**
 * Create a stagger animation timeline
 */
export function createStaggerTimeline(elements, animation, stagger = 0.1) {
  return gsap.timeline().from(elements, {
    ...animation,
    stagger,
  });
}

/**
 * Refresh ScrollTrigger after dynamic content loads
 */
export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };
