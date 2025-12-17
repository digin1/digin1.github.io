'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

// Lazy load the heavy Three.js component
const GPGPUParticles = lazy(() => import('@/components/three/GPGPUParticles'));

/**
 * Page-level background with GPGPU Particles
 * Responds to global scroll progress
 */
export default function PageBackground() {
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(latest);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
      <GPGPUParticles
        scrollProgress={scrollProgress}
        className="opacity-30 dark:opacity-25"
      />
    </Suspense>
  );
}
