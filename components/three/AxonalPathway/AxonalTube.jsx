'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import './AxonalMaterial';

/**
 * The 3D tube that represents the neural pathway
 * Snakes through the timeline matching milestone positions
 */
export default function AxonalTube({ scrollProgress = 0, isMobile = false, isDark = true }) {
  const materialRef = useRef();
  const meshRef = useRef();
  const { viewport } = useThree();

  // Theme-aware colors
  const colors = useMemo(() => {
    if (isDark) {
      return {
        main: new THREE.Color('#3B82F6'),   // neural-blue
        glow: new THREE.Color('#06B6D4'),   // synapse-cyan
        pulse: new THREE.Color('#10B981'),  // signal-green
      };
    } else {
      return {
        main: new THREE.Color('#1E293B'),   // dark slate/black - solid on light bg
        glow: new THREE.Color('#0EA5E9'),   // sky blue - bright accent
        pulse: new THREE.Color('#06B6D4'),  // cyan - visible pulse
      };
    }
  }, [isDark]);

  // Generate curve that matches timeline milestone positions
  // The curve snakes left-right to match alternating card layout
  const curve = useMemo(() => {
    // Scale based on viewport
    const scaleX = Math.min(viewport.width * 0.15, 2);
    const scaleY = viewport.height * 0.4;

    // Points matching the 5 milestones (top to bottom, alternating sides)
    const points = [
      new THREE.Vector3(0, scaleY * 0.9, 0),           // Start (top center)
      new THREE.Vector3(scaleX * 0.8, scaleY * 0.5, 0.3),   // 2022-Present (right)
      new THREE.Vector3(-scaleX * 0.6, scaleY * 0.15, -0.2), // 2022 (left)
      new THREE.Vector3(scaleX * 0.7, -scaleY * 0.2, 0.2),  // 2021-2022 PHP (right)
      new THREE.Vector3(-scaleX * 0.5, -scaleY * 0.5, -0.3), // 2021-2022 Masters (left)
      new THREE.Vector3(0, -scaleY * 0.85, 0),          // 2016-2021 (center-ish)
      new THREE.Vector3(0, -scaleY * 1.0, 0),           // End point
    ];

    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.3);
  }, [viewport]);

  // Create tube geometry
  const geometry = useMemo(() => {
    const segments = isMobile ? 64 : 200;
    const radius = isMobile ? 0.06 : 0.08;
    const radialSegments = isMobile ? 6 : 12;

    return new THREE.TubeGeometry(curve, segments, radius, radialSegments, false);
  }, [curve, isMobile]);

  // Animation loop
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;

      // Smooth interpolation for scroll progress
      const currentProgress = materialRef.current.uProgress;
      const targetProgress = scrollProgress;
      materialRef.current.uProgress = THREE.MathUtils.lerp(
        currentProgress,
        targetProgress,
        0.1
      );

      // Update colors based on theme
      materialRef.current.uColor = colors.main;
      materialRef.current.uGlowColor = colors.glow;
      materialRef.current.uPulseColor = colors.pulse;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <axonalMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </mesh>
  );
}
