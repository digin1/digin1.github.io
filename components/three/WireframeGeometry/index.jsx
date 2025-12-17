'use client';

import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Single wireframe shape
function WireframeShape({ position, rotation, scale, geometry, color, speed, floatOffset }) {
  const meshRef = useRef();
  const edgesRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.x = rotation[0] + time * speed * 0.3;
      meshRef.current.rotation.y = rotation[1] + time * speed * 0.5;
      meshRef.current.rotation.z = rotation[2] + time * speed * 0.2;

      // Gentle floating motion
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5 + floatOffset) * 0.3;
    }
  });

  // Create edges geometry
  const edgesGeometry = useMemo(() => {
    let geo;
    switch (geometry) {
      case 'icosahedron':
        geo = new THREE.IcosahedronGeometry(1, 0);
        break;
      case 'dodecahedron':
        geo = new THREE.DodecahedronGeometry(1, 0);
        break;
      case 'octahedron':
        geo = new THREE.OctahedronGeometry(1, 0);
        break;
      case 'tetrahedron':
        geo = new THREE.TetrahedronGeometry(1, 0);
        break;
      case 'torusKnot':
        geo = new THREE.TorusKnotGeometry(0.6, 0.2, 64, 8);
        break;
      case 'torus':
        geo = new THREE.TorusGeometry(0.7, 0.3, 8, 16);
        break;
      default:
        geo = new THREE.IcosahedronGeometry(1, 0);
    }
    return new THREE.EdgesGeometry(geo);
  }, [geometry]);

  return (
    <group ref={meshRef} position={position} scale={scale}>
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.8} />
      </lineSegments>
    </group>
  );
}

// Floating vertices/points
function FloatingPoints({ count, spread, isDark }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5;
    }
    return pos;
  }, [count, spread]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={isDark ? '#60A5FA' : '#1E3A8A'}
        transparent
        opacity={isDark ? 0.4 : 0.5}
        sizeAttenuation
      />
    </points>
  );
}

// Connecting lines between shapes
function ConnectionWeb({ shapes, isDark }) {
  const linesRef = useRef();

  const lineGeometry = useMemo(() => {
    const points = [];
    // Create connections between some shapes
    for (let i = 0; i < shapes.length; i++) {
      for (let j = i + 1; j < shapes.length; j++) {
        if (Math.random() > 0.6) { // Only some connections
          points.push(
            new THREE.Vector3(...shapes[i].position),
            new THREE.Vector3(...shapes[j].position)
          );
        }
      }
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [shapes]);

  return (
    <lineSegments ref={linesRef} geometry={lineGeometry}>
      <lineBasicMaterial
        color={isDark ? '#3B82F6' : '#1E3A8A'}
        transparent
        opacity={isDark ? 0.15 : 0.25}
      />
    </lineSegments>
  );
}

// Main scene
function GeometryScene({ isDark }) {
  const groupRef = useRef();

  const colors = useMemo(() => ({
    blue: isDark ? '#60A5FA' : '#1E3A8A',
    cyan: isDark ? '#22D3EE' : '#155E75',
    purple: isDark ? '#A78BFA' : '#5B21B6',
    teal: isDark ? '#2DD4BF' : '#115E59',
  }), [isDark]);

  // Define shapes
  const shapes = useMemo(() => [
    // Large shapes in background
    { position: [-4, 1, -3], rotation: [0.5, 0.3, 0], scale: 1.2, geometry: 'icosahedron', color: colors.blue, speed: 0.2, floatOffset: 0 },
    { position: [4.5, -0.5, -2], rotation: [0.2, 0.8, 0.1], scale: 1.0, geometry: 'dodecahedron', color: colors.cyan, speed: -0.15, floatOffset: 1 },
    { position: [0, 2, -4], rotation: [0.7, 0.2, 0.4], scale: 1.4, geometry: 'icosahedron', color: colors.purple, speed: 0.12, floatOffset: 2 },

    // Medium shapes
    { position: [-3, -1.5, -1], rotation: [0.3, 0.6, 0.2], scale: 0.7, geometry: 'octahedron', color: colors.teal, speed: -0.25, floatOffset: 3 },
    { position: [3, 1.5, -2], rotation: [0.1, 0.4, 0.8], scale: 0.8, geometry: 'tetrahedron', color: colors.blue, speed: 0.3, floatOffset: 4 },
    { position: [-1.5, 0.5, -2], rotation: [0.6, 0.1, 0.3], scale: 0.6, geometry: 'torus', color: colors.cyan, speed: -0.2, floatOffset: 5 },

    // Small accent shapes
    { position: [2, -1, -1.5], rotation: [0.4, 0.7, 0.1], scale: 0.5, geometry: 'octahedron', color: colors.purple, speed: 0.35, floatOffset: 6 },
    { position: [-2.5, 1.8, -2.5], rotation: [0.2, 0.5, 0.6], scale: 0.45, geometry: 'tetrahedron', color: colors.teal, speed: -0.28, floatOffset: 7 },
    { position: [1, -2, -3], rotation: [0.8, 0.3, 0.2], scale: 0.55, geometry: 'dodecahedron', color: colors.blue, speed: 0.22, floatOffset: 8 },
  ], [colors]);

  useFrame((state) => {
    if (groupRef.current) {
      // Very slow overall rotation
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Background points */}
      <FloatingPoints count={60} spread={12} isDark={isDark} />

      {/* Connection lines */}
      <ConnectionWeb shapes={shapes} isDark={isDark} />

      {/* Wireframe shapes */}
      {shapes.map((shape, i) => (
        <WireframeShape key={i} {...shape} />
      ))}
    </group>
  );
}

// Main component
export default function WireframeGeometry({ className = '' }) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);

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
    <div className={`absolute -inset-y-16 inset-x-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 60,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
        dpr={1}
      >
        <Suspense fallback={null}>
          <GeometryScene isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  );
}
