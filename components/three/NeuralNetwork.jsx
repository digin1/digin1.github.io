'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Neural network node
function NeuralNode({ position, delay = 0 }) {
  const meshRef = useRef();
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setScale(1);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.scale.setScalar(scale * (0.8 + Math.sin(t * 2 + delay) * 0.2));
      meshRef.current.material.opacity = 0.6 + Math.sin(t * 1.5 + delay) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial color="#3B82F6" transparent opacity={0.7} />
    </mesh>
  );
}

// Connection line between nodes
function Connection({ start, end, delay = 0 }) {
  const lineRef = useRef();
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpacity(0.3);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  useFrame((state) => {
    if (lineRef.current) {
      const t = state.clock.elapsedTime;
      lineRef.current.material.opacity = opacity * (0.5 + Math.sin(t * 2 + delay) * 0.5);
    }
  });

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#06B6D4" transparent opacity={opacity} />
    </line>
  );
}

// Pulse traveling along connection
function SignalPulse({ start, end, delay = 0 }) {
  const meshRef = useRef();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActive(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useFrame((state) => {
    if (meshRef.current && active) {
      const t = (state.clock.elapsedTime * 0.5 + delay) % 1;
      const x = start[0] + (end[0] - start[0]) * t;
      const y = start[1] + (end[1] - start[1]) * t;
      const z = start[2] + (end[2] - start[2]) * t;
      meshRef.current.position.set(x, y, z);
      meshRef.current.material.opacity = Math.sin(t * Math.PI) * 0.8;
    }
  });

  if (!active) return null;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#10B981" transparent opacity={0.8} />
    </mesh>
  );
}

// Main neural network scene
function NeuralNetworkScene({ isDark }) {
  const groupRef = useRef();
  const { viewport } = useThree();

  // Generate neural network structure
  const { nodes, connections } = useMemo(() => {
    const nodeList = [];
    const connectionList = [];
    const layers = 4;
    const nodesPerLayer = [5, 7, 7, 5];

    // Create nodes in layers
    for (let layer = 0; layer < layers; layer++) {
      const count = nodesPerLayer[layer];
      const xOffset = (layer - layers / 2 + 0.5) * 2.5;

      for (let i = 0; i < count; i++) {
        const yOffset = (i - count / 2 + 0.5) * 1.2;
        const zOffset = (Math.random() - 0.5) * 1;
        nodeList.push({
          position: [xOffset, yOffset, zOffset],
          layer,
          index: i,
        });
      }
    }

    // Create connections between adjacent layers
    let nodeIndex = 0;
    for (let layer = 0; layer < layers - 1; layer++) {
      const currentLayerStart = nodeIndex;
      const currentLayerCount = nodesPerLayer[layer];
      const nextLayerStart = currentLayerStart + currentLayerCount;
      const nextLayerCount = nodesPerLayer[layer + 1];

      for (let i = 0; i < currentLayerCount; i++) {
        // Connect to 2-3 random nodes in next layer
        const connectCount = 2 + Math.floor(Math.random() * 2);
        const connected = new Set();

        for (let c = 0; c < connectCount; c++) {
          let targetIndex;
          do {
            targetIndex = Math.floor(Math.random() * nextLayerCount);
          } while (connected.has(targetIndex));
          connected.add(targetIndex);

          const startNode = nodeList[currentLayerStart + i];
          const endNode = nodeList[nextLayerStart + targetIndex];

          connectionList.push({
            start: startNode.position,
            end: endNode.position,
          });
        }
      }
      nodeIndex += currentLayerCount;
    }

    return { nodes: nodeList, connections: connectionList };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  const scale = Math.min(viewport.width / 12, viewport.height / 8, 1);

  return (
    <group ref={groupRef} scale={scale}>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <NeuralNode key={`node-${i}`} position={node.position} delay={i * 50} />
      ))}

      {/* Connections */}
      {connections.map((conn, i) => (
        <Connection key={`conn-${i}`} start={conn.start} end={conn.end} delay={i * 30} />
      ))}

      {/* Signal pulses on some connections */}
      {connections.slice(0, 15).map((conn, i) => (
        <SignalPulse key={`pulse-${i}`} start={conn.start} end={conn.end} delay={i * 0.3} />
      ))}
    </group>
  );
}

export default function NeuralNetworkCanvas({ className = '' }) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check dark mode
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <NeuralNetworkScene isDark={isDark} />
      </Canvas>
    </div>
  );
}
