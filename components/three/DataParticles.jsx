'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Floating data particle
function DataParticle({ position, speed, color, size }) {
  const meshRef = useRef();
  const initialY = position[1];

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      // Float up and down
      meshRef.current.position.y = initialY + Math.sin(t * speed + position[0]) * 0.5;
      // Gentle horizontal drift
      meshRef.current.position.x = position[0] + Math.sin(t * speed * 0.5 + position[2]) * 0.3;
      // Pulse opacity
      meshRef.current.material.opacity = 0.4 + Math.sin(t * speed * 2) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

// Connecting line between particles
function DataStream({ particles }) {
  const lineRef = useRef();
  const [positions, setPositions] = useState(() => new Float32Array(particles.length * 3));

  useFrame((state) => {
    if (lineRef.current) {
      const t = state.clock.elapsedTime;
      const newPositions = new Float32Array(particles.length * 3);

      particles.forEach((p, i) => {
        newPositions[i * 3] = p.position[0] + Math.sin(t * p.speed * 0.5 + p.position[2]) * 0.3;
        newPositions[i * 3 + 1] = p.position[1] + Math.sin(t * p.speed + p.position[0]) * 0.5;
        newPositions[i * 3 + 2] = p.position[2];
      });

      lineRef.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(newPositions, 3)
      );
      lineRef.current.material.opacity = 0.1 + Math.sin(t * 0.5) * 0.05;
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#3B82F6" transparent opacity={0.15} />
    </line>
  );
}

// Rising data bits (like binary/code rising up)
function RisingDataBit({ startPosition, delay }) {
  const meshRef = useRef();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useFrame((state) => {
    if (meshRef.current && active) {
      const t = ((state.clock.elapsedTime * 0.3 + delay / 1000) % 4);
      meshRef.current.position.y = startPosition[1] + t * 2;
      meshRef.current.material.opacity = Math.max(0, 0.6 - t * 0.15);

      // Reset position when reaching top
      if (t < 0.1) {
        meshRef.current.position.y = startPosition[1];
      }
    }
  });

  if (!active) return null;

  return (
    <mesh ref={meshRef} position={startPosition}>
      <boxGeometry args={[0.02, 0.08, 0.02]} />
      <meshBasicMaterial color="#06B6D4" transparent opacity={0.5} />
    </mesh>
  );
}

function DataParticlesScene() {
  const groupRef = useRef();
  const { viewport, mouse } = useThree();

  // Generate particles
  const particles = useMemo(() => {
    const colors = ['#3B82F6', '#06B6D4', '#10B981', '#8B5CF6'];
    return Array.from({ length: 40 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
      ],
      speed: 0.5 + Math.random() * 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 0.03 + Math.random() * 0.05,
    }));
  }, []);

  // Generate rising data bits
  const dataBits = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      startPosition: [
        (Math.random() - 0.5) * 8,
        -3,
        (Math.random() - 0.5) * 2,
      ],
      delay: i * 200,
    }));
  }, []);

  // Create streams by connecting nearby particles
  const streams = useMemo(() => {
    const streamParticles = [];
    for (let i = 0; i < 3; i++) {
      const streamStart = Math.floor(Math.random() * (particles.length - 5));
      streamParticles.push(particles.slice(streamStart, streamStart + 5));
    }
    return streamParticles;
  }, [particles]);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle rotation based on time
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;

      // Subtle response to mouse
      const targetRotationX = mouse.y * 0.1;
      const targetRotationY = mouse.x * 0.1;
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.02;
    }
  });

  const scale = Math.min(viewport.width / 10, 1);

  return (
    <group ref={groupRef} scale={scale}>
      {/* Data particles */}
      {particles.map((p, i) => (
        <DataParticle key={`particle-${i}`} {...p} />
      ))}

      {/* Connecting streams */}
      {streams.map((streamParticles, i) => (
        <DataStream key={`stream-${i}`} particles={streamParticles} />
      ))}

      {/* Rising data bits */}
      {dataBits.map((bit, i) => (
        <RisingDataBit key={`bit-${i}`} {...bit} />
      ))}
    </group>
  );
}

export default function DataParticlesCanvas({ className = '' }) {
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
        <DataParticlesScene />
      </Canvas>
    </div>
  );
}
