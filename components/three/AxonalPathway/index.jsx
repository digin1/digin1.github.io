'use client';

import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import WalkingFigure from './WalkingFigure';
import { useMobileScale } from '../shared/useMobileScale';

/**
 * Scene content for the Axonal Pathway
 */
function AxonalScene({ scrollProgress, scale, isDark }) {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={isDark ? 0.4 : 0.6} />

      {/* Walking figure along the path */}
      <WalkingFigure
        scrollProgress={scrollProgress}
        isMobile={scale.isMobile}
        isDark={isDark}
      />
    </>
  );
}

/**
 * Main Axonal Pathway Canvas Component
 * Renders a walking figure that moves along the career timeline path
 */
export default function AxonalPathway({ scrollProgress = 0, className = '' }) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const scale = useMobileScale();

  useEffect(() => {
    setMounted(true);

    // Check dark mode
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <div className={`absolute -inset-y-20 inset-x-0 pointer-events-none md:z-0 z-20 ${className}`}>
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 60,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        dpr={1}
      >
        <Suspense fallback={null}>
          <AxonalScene scrollProgress={scrollProgress} scale={scale} isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  );
}
