'use client';

import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMobileScale } from '../shared/useMobileScale';

/**
 * Single floating molecule with Brownian motion
 */
function Molecule({ geometry, position, color, scale = 1, isDark = true }) {
  const meshRef = useRef();
  const velocity = useRef(new THREE.Vector3(
    (Math.random() - 0.5) * 0.02,
    (Math.random() - 0.5) * 0.02,
    (Math.random() - 0.5) * 0.01
  ));

  const bounds = { x: 4, y: 3, z: 2 };

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Add random force (Brownian motion)
    velocity.current.x += (Math.random() - 0.5) * 0.002;
    velocity.current.y += (Math.random() - 0.5) * 0.002;
    velocity.current.z += (Math.random() - 0.5) * 0.001;

    // Apply damping
    velocity.current.multiplyScalar(0.98);

    // Clamp velocity
    velocity.current.clampLength(0, 0.05);

    // Update position
    meshRef.current.position.add(velocity.current);

    // Boundary bounce
    ['x', 'y', 'z'].forEach((axis) => {
      const bound = bounds[axis];
      if (Math.abs(meshRef.current.position[axis]) > bound) {
        velocity.current[axis] *= -0.8;
        meshRef.current.position[axis] = Math.sign(meshRef.current.position[axis]) * bound;
      }
    });

    // Gentle rotation
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
  });

  // Create geometry based on type
  const geometryElement = useMemo(() => {
    switch (geometry) {
      case 'icosahedron':
        return <icosahedronGeometry args={[0.4 * scale, 0]} />;
      case 'octahedron':
        return <octahedronGeometry args={[0.4 * scale, 0]} />;
      case 'torusKnot':
        return <torusKnotGeometry args={[0.25 * scale, 0.08 * scale, 64, 8]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[0.35 * scale, 0]} />;
      default:
        return <sphereGeometry args={[0.35 * scale, 16, 16]} />;
    }
  }, [geometry, scale]);

  return (
    <mesh ref={meshRef} position={position}>
      {geometryElement}
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={isDark ? 0.7 : 0.85}
        roughness={isDark ? 0.1 : 0.2}
        metalness={isDark ? 0.2 : 0.4}
        transmission={isDark ? 0.6 : 0.3}
        thickness={0.5}
        envMapIntensity={isDark ? 1 : 0.5}
      />
    </mesh>
  );
}

/**
 * Collection of molecules
 */
function MoleculeCloud({ count = 20, isMobile = false, isDark = true }) {
  // Skill category to geometry/color mapping - darker colors for light mode
  const moleculeTypes = useMemo(() => {
    if (isDark) {
      return [
        { geometry: 'icosahedron', color: '#3B82F6', category: 'frontend' }, // Blue
        { geometry: 'octahedron', color: '#10B981', category: 'backend' }, // Green
        { geometry: 'torusKnot', color: '#8B5CF6', category: 'devops' }, // Purple
        { geometry: 'dodecahedron', color: '#06B6D4', category: 'data' }, // Cyan
        { geometry: 'sphere', color: '#F59E0B', category: 'tools' }, // Amber
      ];
    } else {
      // Darker, more saturated colors for light mode
      return [
        { geometry: 'icosahedron', color: '#1E40AF', category: 'frontend' }, // Dark Blue
        { geometry: 'octahedron', color: '#047857', category: 'backend' }, // Dark Green
        { geometry: 'torusKnot', color: '#6D28D9', category: 'devops' }, // Dark Purple
        { geometry: 'dodecahedron', color: '#0E7490', category: 'data' }, // Dark Cyan
        { geometry: 'sphere', color: '#B45309', category: 'tools' }, // Dark Amber
      ];
    }
  }, [isDark]);

  // Generate molecules
  const molecules = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const type = moleculeTypes[i % moleculeTypes.length];
      return {
        id: i,
        geometry: type.geometry,
        color: type.color,
        position: [
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 3,
        ],
        scale: 0.8 + Math.random() * 0.4,
      };
    });
  }, [count, moleculeTypes]);

  return (
    <group>
      {molecules.map((mol) => (
        <Molecule
          key={mol.id}
          geometry={mol.geometry}
          position={mol.position}
          color={mol.color}
          scale={mol.scale}
          isDark={isDark}
        />
      ))}
    </group>
  );
}

/**
 * Scene wrapper
 */
function MolecularScene({ scale, isDark }) {
  // Reduced molecule count for performance
  const moleculeCount = scale.isMobile ? 5 : scale.isTablet ? 8 : 12;
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <>
      {/* Lighting - brighter for light mode */}
      <ambientLight intensity={isDark ? 0.4 : 0.6} />
      <directionalLight position={[5, 5, 5]} intensity={isDark ? 0.6 : 0.8} />

      <group ref={groupRef}>
        <MoleculeCloud count={moleculeCount} isMobile={scale.isMobile} isDark={isDark} />
      </group>
    </>
  );
}

/**
 * Main MolecularPetridish Component
 */
export default function MolecularPetridish({ className = '' }) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const scale = useMobileScale();

  useEffect(() => {
    setMounted(true);

    // Check dark mode
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();

    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{
          position: [0, 0, 7],
          fov: 50,
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
          <MolecularScene scale={scale} isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  );
}
