'use client';

import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial, extend } from '@react-three/drei';
import { useMobileScale } from '../shared/useMobileScale';
import { generateBrainShape, generateDNAShape, generateGlobeShape, generateScatterShape } from './shapes';

// Custom shader material for morphing particles
const MorphParticleMaterial = shaderMaterial(
  {
    uTime: 0,
    uMorphProgress: 0,
    uSize: 2.0,
    uColor1: new THREE.Color('#3B82F6'),
    uColor2: new THREE.Color('#06B6D4'),
    uColor3: new THREE.Color('#8B5CF6'),
  },
  // Vertex Shader
  `
    attribute vec3 targetPosition;
    attribute float randomOffset;

    uniform float uTime;
    uniform float uMorphProgress;
    uniform float uSize;

    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      // Morph between current and target position
      vec3 morphed = mix(position, targetPosition, uMorphProgress);

      // Add organic movement
      float noise = sin(morphed.x * 2.0 + uTime) * cos(morphed.y * 2.0 + uTime * 0.7) * 0.1;
      morphed += vec3(noise, noise * 0.5, noise * 0.3) * (1.0 - uMorphProgress * 0.5);

      // Add subtle floating motion
      morphed.y += sin(uTime * 0.5 + randomOffset * 6.28) * 0.05;

      vec4 mvPosition = modelViewMatrix * vec4(morphed, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // Size attenuation
      gl_PointSize = uSize * (300.0 / -mvPosition.z);

      // Color based on position
      float colorMix = (morphed.y + 3.0) / 6.0;
      vColor = mix(vec3(0.23, 0.51, 0.96), vec3(0.02, 0.71, 0.83), colorMix);

      // Alpha based on depth
      vAlpha = 0.6 + sin(randomOffset * 6.28 + uTime) * 0.2;
    }
  `,
  // Fragment Shader
  `
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      // Circular point
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      if (dist > 0.5) discard;

      // Soft edge
      float alpha = vAlpha * smoothstep(0.5, 0.2, dist);

      gl_FragColor = vec4(vColor, alpha);
    }
  `
);

extend({ MorphParticleMaterial });

/**
 * The particle system that morphs between shapes
 */
function ParticleSystem({ currentShape, targetShape, morphProgress, particleCount }) {
  const pointsRef = useRef();
  const materialRef = useRef();

  // Generate positions for both shapes
  const { positions, targetPositions, randomOffsets } = useMemo(() => {
    const shapeGenerators = {
      brain: generateBrainShape,
      dna: generateDNAShape,
      globe: generateGlobeShape,
      scatter: generateScatterShape,
    };

    const pos = shapeGenerators[currentShape]?.(particleCount) || generateScatterShape(particleCount);
    const target = shapeGenerators[targetShape]?.(particleCount) || generateScatterShape(particleCount);

    // Random offsets for variation
    const offsets = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      offsets[i] = Math.random();
    }

    return {
      positions: pos,
      targetPositions: target,
      randomOffsets: offsets,
    };
  }, [currentShape, targetShape, particleCount]);

  // Animation loop
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uMorphProgress = morphProgress;
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-targetPosition"
          count={particleCount}
          array={targetPositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-randomOffset"
          count={particleCount}
          array={randomOffsets}
          itemSize={1}
        />
      </bufferGeometry>
      <morphParticleMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Scene wrapper
 */
function GPGPUScene({ scrollProgress, scale }) {
  const [currentShape, setCurrentShape] = useState('scatter');
  const [targetShape, setTargetShape] = useState('brain');
  const [morphProgress, setMorphProgress] = useState(0);

  // Determine shape based on scroll position
  useEffect(() => {
    // Map scroll progress to shape transitions
    // 0-0.2: scatter -> brain
    // 0.2-0.5: brain -> dna
    // 0.5-0.8: dna -> globe
    // 0.8-1.0: globe -> scatter

    if (scrollProgress < 0.2) {
      setCurrentShape('scatter');
      setTargetShape('brain');
      setMorphProgress(scrollProgress / 0.2);
    } else if (scrollProgress < 0.5) {
      setCurrentShape('brain');
      setTargetShape('dna');
      setMorphProgress((scrollProgress - 0.2) / 0.3);
    } else if (scrollProgress < 0.8) {
      setCurrentShape('dna');
      setTargetShape('globe');
      setMorphProgress((scrollProgress - 0.5) / 0.3);
    } else {
      setCurrentShape('globe');
      setTargetShape('scatter');
      setMorphProgress((scrollProgress - 0.8) / 0.2);
    }
  }, [scrollProgress]);

  // Drastically reduced particle counts for performance
  const particleCount = scale.isMobile ? 3000 : scale.isTablet ? 5000 : 8000;

  return (
    <>
      <ParticleSystem
        currentShape={currentShape}
        targetShape={targetShape}
        morphProgress={morphProgress}
        particleCount={particleCount}
      />
      {/* Bloom disabled for performance */}
    </>
  );
}

/**
 * Main GPGPU Particles Component
 * Fixed position background that responds to page scroll
 */
export default function GPGPUParticles({ scrollProgress = 0, className = '' }) {
  const [mounted, setMounted] = useState(false);
  const scale = useMobileScale();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      <Canvas
        camera={{
          position: [0, 0, 6],
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
          <GPGPUScene scrollProgress={scrollProgress} scale={scale} />
        </Suspense>
      </Canvas>
    </div>
  );
}
