'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import * as brandIcons from '@fortawesome/free-brands-svg-icons';
import * as THREE from 'three';

// Helper to get icon from name
function getIcon(iconName) {
  if (brandIcons[iconName]) return brandIcons[iconName];
  if (solidIcons[iconName]) return solidIcons[iconName];
  return solidIcons.faCode;
}

// Single tech label on the sphere - always faces camera (billboard)
function TechLabel({ position, name, icon, color, isDark, isMobile }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const parentInverseQuat = useRef(new THREE.Quaternion());

  useFrame((state) => {
    if (groupRef.current && groupRef.current.parent) {
      // Get the parent's world quaternion and invert it
      groupRef.current.parent.getWorldQuaternion(parentInverseQuat.current);
      parentInverseQuat.current.invert();

      // Apply inverse parent rotation, then camera rotation
      groupRef.current.quaternion.copy(parentInverseQuat.current).multiply(state.camera.quaternion);
    }
  });

  const iconElement = getIcon(icon);

  return (
    <group position={position}>
      <group ref={groupRef}>
        <Html
          center
          distanceFactor={isMobile ? 15 : 8}
          style={{
            pointerEvents: 'auto',
            userSelect: 'none',
          }}
        >
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`flex items-center whitespace-nowrap transition-all duration-200 cursor-pointer ${
              hovered ? 'scale-110 shadow-lg' : ''
            } ${isMobile ? 'gap-0.5 px-0.5 py-0 rounded' : 'gap-2 px-3 py-1.5 rounded-lg'}`}
            style={{
              backgroundColor: hovered ? color : (isDark ? '#1e293b' : '#f1f5f9'),
              color: hovered ? '#ffffff' : (isDark ? '#e2e8f0' : '#1e293b'),
              border: `1px solid ${hovered ? color : (isDark ? '#334155' : '#e2e8f0')}`,
            }}
          >
            <FontAwesomeIcon
              icon={iconElement}
              className={isMobile ? 'w-1.5 h-1.5' : 'w-3.5 h-3.5'}
              style={{ color: hovered ? '#ffffff' : color }}
            />
            <span className={`font-medium ${isMobile ? 'text-[6px]' : 'text-xs'}`}>{name}</span>
          </div>
        </Html>
        {/* Glow effect when hovered */}
        {hovered && (
          <pointLight color={color} intensity={0.5} distance={2} />
        )}
      </group>
    </group>
  );
}

// The rotating sphere with tech labels
function TechSphereMesh({ skills, isDark, autoRotate, isMobile }) {
  const groupRef = useRef();
  const [positions, setPositions] = useState([]);

  // Colors for different categories
  const categoryColors = {
    frontend: '#3B82F6',
    backend: '#10B981',
    devops: '#F59E0B',
    database: '#8B5CF6',
    tools: '#EC4899',
    default: '#06B6D4',
  };

  // Distribute skills on a sphere using Fibonacci lattice
  useEffect(() => {
    if (!skills || skills.length === 0) return;

    // Smaller radius on mobile
    const radius = isMobile ? 2.0 : 2.5;
    const newPositions = [];
    const n = skills.length;

    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < n; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / n);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      newPositions.push(new THREE.Vector3(x, y, z));
    }

    setPositions(newPositions);
  }, [skills, isMobile]);

  // Auto rotation
  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  const getColor = (skill) => {
    const category = skill.categories?.[0] || 'default';
    return categoryColors[category] || categoryColors.default;
  };

  const sphereRadius = isMobile ? 1.8 : 2.3;

  return (
    <group ref={groupRef}>
      {/* Wireframe sphere */}
      <mesh>
        <icosahedronGeometry args={[sphereRadius, 1]} />
        <meshBasicMaterial
          color={isDark ? '#3B82F6' : '#1e40af'}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[sphereRadius - 0.1, isMobile ? 16 : 32, isMobile ? 16 : 32]} />
        <meshBasicMaterial
          color={isDark ? '#3B82F6' : '#3B82F6'}
          transparent
          opacity={0.03}
        />
      </mesh>

      {/* Tech labels */}
      {positions.map((pos, i) => (
        skills[i] && (
          <TechLabel
            key={skills[i].name}
            position={pos}
            name={skills[i].name}
            icon={skills[i].icon}
            color={getColor(skills[i])}
            isDark={isDark}
            isMobile={isMobile}
          />
        )
      ))}
    </group>
  );
}

// Main scene
function Scene({ skills, isDark, isMobile }) {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <>
      <ambientLight intensity={isDark ? 0.4 : 0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#06B6D4" />

      <TechSphereMesh
        skills={skills}
        isDark={isDark}
        autoRotate={autoRotate}
        isMobile={isMobile}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        onStart={() => setAutoRotate(false)}
        onEnd={() => setTimeout(() => setAutoRotate(true), 3000)}
      />
    </>
  );
}

// Main component
export default function TechSphere({ skills = [], className = '' }) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

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

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!mounted || skills.length === 0) return null;

  return (
    <div className={`w-full h-[400px] md:h-[550px] ${className}`}>
      <Canvas
        camera={{
          position: [0, 0, 6.5],
          fov: 48,
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
          <Scene skills={skills} isDark={isDark} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
