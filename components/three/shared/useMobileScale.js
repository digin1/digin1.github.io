'use client';

import { useState, useEffect, useMemo } from 'react';

/**
 * Detect mobile devices and return scaled values for Three.js performance
 */
export function useMobileScale() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const scale = useMemo(() => ({
    // Particle counts
    particleCount: isMobile ? 65536 : isTablet ? 131072 : 262144, // 256², 362², 512²

    // Geometry segments
    tubeSegments: isMobile ? 64 : isTablet ? 128 : 256,
    sphereSegments: isMobile ? 16 : isTablet ? 24 : 32,

    // Instance counts
    voxelCount: isMobile ? 400 : isTablet ? 700 : 1000,
    moleculeCount: isMobile ? 10 : isTablet ? 15 : 20,

    // Effect intensities
    bloomIntensity: isMobile ? 0.8 : 1.5,

    // Frame skipping (for useFrame)
    frameSkip: isMobile ? 2 : 1, // Skip every N frames on mobile

    // Texture sizes
    gpuTextureSize: isMobile ? 256 : isTablet ? 384 : 512,

    // Flags
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,

    // Enable/disable features
    enableBloom: true,
    enableTransmission: !isMobile, // Transmission material is expensive
    enableDistortion: !isMobile, // MRI distortion disabled on mobile
  }), [isMobile, isTablet]);

  return scale;
}

/**
 * Simple mobile detection without reactive updates
 */
export function isMobileDevice() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

export default useMobileScale;
