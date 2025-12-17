'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Generate brain-like point cloud
function generateBrainPoints(count) {
  const points = [];

  for (let i = 0; i < count; i++) {
    // Use parametric equations to create brain-like shape
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI;

    // Base sphere
    let x = Math.sin(v) * Math.cos(u);
    let y = Math.sin(v) * Math.sin(u) * 0.7; // Flatten Y
    let z = Math.cos(v);

    // Add brain-like deformations (sulci/gyri simulation)
    const noise = Math.sin(u * 6) * Math.cos(v * 4) * 0.15;
    const ridge = Math.sin(u * 8 + v * 6) * 0.1;

    x += noise * Math.sin(v);
    z += ridge * Math.cos(v);

    // Scale
    const scale = 2;
    x *= scale;
    y *= scale;
    z *= scale;

    points.push({ x, y, z, u, v });
  }

  return points;
}

// Synaptic connection flash
function SynapticFlash({ startPoint, endPoint, delay }) {
  const meshRef = useRef();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(true);
      setTimeout(() => setActive(false), 500);
    }, 3000 + delay);
    return () => clearInterval(interval);
  }, [delay]);

  useFrame((state) => {
    if (meshRef.current && active) {
      const t = (state.clock.elapsedTime * 4) % 1;
      const x = startPoint.x + (endPoint.x - startPoint.x) * t;
      const y = startPoint.y + (endPoint.y - startPoint.y) * t;
      const z = startPoint.z + (endPoint.z - startPoint.z) * t;
      meshRef.current.position.set(x, y, z);
      meshRef.current.material.opacity = Math.sin(t * Math.PI);
    }
  });

  if (!active) return null;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#10B981" transparent opacity={0.8} />
    </mesh>
  );
}

function BrainPointCloud({ mouse }) {
  const pointsRef = useRef();
  const groupRef = useRef();

  const brainPoints = useMemo(() => generateBrainPoints(800), []);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(brainPoints.length * 3);
    const col = new Float32Array(brainPoints.length * 3);

    const color1 = new THREE.Color('#3B82F6'); // Blue
    const color2 = new THREE.Color('#06B6D4'); // Cyan
    const color3 = new THREE.Color('#8B5CF6'); // Purple

    brainPoints.forEach((point, i) => {
      pos[i * 3] = point.x;
      pos[i * 3 + 1] = point.y;
      pos[i * 3 + 2] = point.z;

      // Color based on position (gradient effect)
      const t = (point.x + 2) / 4; // Normalize x to 0-1
      let color;
      if (t < 0.5) {
        color = color1.clone().lerp(color2, t * 2);
      } else {
        color = color2.clone().lerp(color3, (t - 0.5) * 2);
      }

      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    });

    return { positions: pos, colors: col };
  }, [brainPoints]);

  // Generate some synaptic connections
  const synapticPairs = useMemo(() => {
    const pairs = [];
    for (let i = 0; i < 10; i++) {
      const idx1 = Math.floor(Math.random() * brainPoints.length);
      const idx2 = Math.floor(Math.random() * brainPoints.length);
      pairs.push({
        start: brainPoints[idx1],
        end: brainPoints[idx2],
        delay: i * 300,
      });
    }
    return pairs;
  }, [brainPoints]);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotate slowly
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;

      // Respond to mouse
      const targetRotationX = mouse.y * 0.3;
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05;
    }

    if (pointsRef.current) {
      // Pulsing effect
      const pulse = 0.95 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      pointsRef.current.material.size = 0.04 * pulse;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={brainPoints.length}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={brainPoints.length}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Synaptic flashes */}
      {synapticPairs.map((pair, i) => (
        <SynapticFlash
          key={i}
          startPoint={pair.start}
          endPoint={pair.end}
          delay={pair.delay}
        />
      ))}

      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function BrainMeshScene() {
  const { viewport, mouse } = useThree();
  const scale = Math.min(viewport.width / 6, viewport.height / 5, 1.8);

  return (
    <group scale={scale} position={[0, 0, 0]}>
      <BrainPointCloud mouse={mouse} />
    </group>
  );
}

export default function BrainMeshCanvas({ className = '' }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <BrainMeshScene />
      </Canvas>
    </div>
  );
}
