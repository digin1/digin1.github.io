'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Stick figure that walks backwards along the career timeline
 */
export default function WalkingFigure({ scrollProgress = 0, isMobile = false, isDark = true }) {
  const groupRef = useRef();
  const figureRef = useRef();
  const trailRef = useRef();
  const { viewport } = useThree();

  // Limb refs for animation
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();

  // Store previous rotation for smooth interpolation
  const targetQuaternion = useRef(new THREE.Quaternion());
  const currentQuaternion = useRef(new THREE.Quaternion());

  // Track scroll velocity for walk animation
  const lastScrollProgress = useRef(0);
  const walkPhaseRef = useRef(0);

  // Theme colors
  const bodyColor = '#0a0a0a';
  const accentColor = isDark ? '#3B82F6' : '#2563EB';
  const glowColor = isDark ? '#06B6D4' : '#0EA5E9';

  // Generate curve
  const curve = useMemo(() => {
    const scaleX = Math.min(viewport.width * 0.15, 2);
    const scaleY = viewport.height * 0.4;

    // Mobile: straight line on the far right side (outside cards)
    if (isMobile) {
      const rightX = viewport.width * 0.42;
      const points = [
        new THREE.Vector3(rightX, scaleY * 0.95, 0),
        new THREE.Vector3(rightX, scaleY * 0.5, 0),
        new THREE.Vector3(rightX, 0, 0),
        new THREE.Vector3(rightX, -scaleY * 0.5, 0),
        new THREE.Vector3(rightX, -scaleY * 1.0, 0),
        new THREE.Vector3(rightX, -scaleY * 1.03, 0),
      ];
      return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
    }

    // Desktop: snake through milestones
    const points = [
      new THREE.Vector3(0, scaleY * 0.95, 0),          // Extended top
      new THREE.Vector3(0, scaleY * 0.9, 0),           // Start
      new THREE.Vector3(scaleX * 0.8, scaleY * 0.5, 0.3),
      new THREE.Vector3(-scaleX * 0.6, scaleY * 0.15, -0.2),
      new THREE.Vector3(scaleX * 0.7, -scaleY * 0.2, 0.2),
      new THREE.Vector3(-scaleX * 0.5, -scaleY * 0.5, -0.3),
      new THREE.Vector3(0, -scaleY * 0.85, 0),
      new THREE.Vector3(0, -scaleY * 1.0, 0),          // End
      new THREE.Vector3(0, -scaleY * 1.03, 0),         // Extended bottom
    ];

    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.3);
  }, [viewport, isMobile]);

  // Trail configuration
  const trailCount = isMobile ? 30 : 50;

  // Create instanced trail dots for better performance
  const trailDummy = useMemo(() => new THREE.Object3D(), []);
  const trailPositions = useMemo(() => {
    const positions = [];
    // Skip first and last dot
    for (let i = 1; i < trailCount; i++) {
      positions.push(curve.getPointAt(i / trailCount));
    }
    return positions;
  }, [curve, trailCount]);

  // Animation
  useFrame((state) => {
    if (!figureRef.current) return;

    const time = state.clock.elapsedTime;

    // Smooth scroll progress
    const targetProgress = Math.max(0.02, Math.min(scrollProgress, 0.98));
    const currentProgress = figureRef.current.userData.progress || 0.02;
    const smoothProgress = THREE.MathUtils.lerp(currentProgress, targetProgress, 0.06);
    figureRef.current.userData.progress = smoothProgress;

    // Get position and tangent on curve
    const position = curve.getPointAt(smoothProgress);
    const tangent = curve.getTangentAt(smoothProgress);

    // Position figure
    figureRef.current.position.copy(position);

    // Smooth orientation using quaternion slerp
    // At start and end positions, stand straight upright
    const straightUpQuat = new THREE.Quaternion(); // Default upright orientation

    // Mobile: always stand straight (no curve following)
    if (isMobile) {
      currentQuaternion.current.slerp(straightUpQuat, 0.1);
      figureRef.current.quaternion.copy(currentQuaternion.current);
    } else {
      // Desktop: follow curve orientation
      const lookAtPoint = position.clone().sub(tangent);
      const tempObj = new THREE.Object3D();
      tempObj.position.copy(position);
      tempObj.lookAt(lookAtPoint);
      const curveFollowQuat = tempObj.quaternion.clone();

      // Stand straight at both ends, follow curve in the middle
      const distFromStart = smoothProgress;
      const distFromEnd = 1 - smoothProgress;
      // Stronger blend at the end (bottom) to ensure standing straight
      const endBlend = distFromEnd < 0.15 ? distFromEnd * 6 : 1;
      const startBlend = distFromStart < 0.15 ? distFromStart * 8 : 1;
      const blendFactor = Math.min(1, Math.min(startBlend, endBlend));

      targetQuaternion.current.copy(straightUpQuat).slerp(curveFollowQuat, blendFactor);

      currentQuaternion.current.slerp(targetQuaternion.current, 0.08);
      figureRef.current.quaternion.copy(currentQuaternion.current);

      // Subtle body lean based on curve direction (only when moving)
      const leanAmount = tangent.x * 0.08 * blendFactor;
      figureRef.current.rotation.z += leanAmount;
    }

    // Walking animation - only when scrolling
    const scrollDelta = Math.abs(smoothProgress - lastScrollProgress.current);
    const isScrolling = scrollDelta > 0.0005;
    lastScrollProgress.current = smoothProgress;

    // Only advance walk phase when scrolling
    if (isScrolling) {
      walkPhaseRef.current += scrollDelta * 80; // Scale scroll to walk cycle
    }

    const distanceFromEnd = Math.min(smoothProgress, 1 - smoothProgress);
    const walkIntensity = Math.min(1, distanceFromEnd * 10) * (isScrolling ? 1 : 0);

    const walkAmplitude = 0.3 * walkIntensity;
    const walkPhase = walkPhaseRef.current;

    if (leftArmRef.current && rightArmRef.current) {
      const targetLeftArm = Math.sin(walkPhase) * walkAmplitude;
      const targetRightArm = Math.sin(walkPhase + Math.PI) * walkAmplitude;
      leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, targetLeftArm, 0.15);
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, targetRightArm, 0.15);
    }

    if (leftLegRef.current && rightLegRef.current) {
      const targetLeftLeg = Math.sin(walkPhase + Math.PI) * walkAmplitude;
      const targetRightLeg = Math.sin(walkPhase) * walkAmplitude;
      leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, targetLeftLeg, 0.15);
      rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, targetRightLeg, 0.15);
    }

    // Update trail instances
    if (trailRef.current) {
      for (let i = 0; i < trailPositions.length; i++) {
        const progress = i / trailPositions.length;
        const visible = progress <= scrollProgress;

        // Scale based on visibility and proximity to figure
        const distToFigure = Math.abs(progress - smoothProgress);
        const proximityScale = visible ? Math.max(0.5, 1 - distToFigure * 3) : 0.3;
        const pulseScale = visible ? 1 + Math.sin(time * 3 + i * 0.5) * 0.1 : 1;
        const finalScale = proximityScale * pulseScale * (visible ? 1 : 0.5);

        trailDummy.position.copy(trailPositions[i]);
        trailDummy.scale.setScalar(finalScale);
        trailDummy.updateMatrix();
        trailRef.current.setMatrixAt(i, trailDummy.matrix);
      }
      trailRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  const scale = isMobile ? 0.06 : 0.08;

  return (
    <group ref={groupRef}>
      {/* Instanced trail dots */}
      <instancedMesh ref={trailRef} args={[null, null, trailPositions.length]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshBasicMaterial color={accentColor} transparent opacity={isDark ? 0.5 : 0.6} />
      </instancedMesh>

      {/* Walking Figure */}
      <group ref={figureRef} scale={scale}>
        {/* Head - blue */}
        <mesh position={[0, 1.6, 0]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.2} />
        </mesh>

        {/* Body/Torso - black */}
        <mesh position={[0, 0.9, 0]}>
          <capsuleGeometry args={[0.15, 0.6, 16, 32]} />
          <meshStandardMaterial color={bodyColor} roughness={0.4} metalness={0.1} />
        </mesh>

        {/* Left Arm - blue */}
        <group position={[-0.25, 1.2, 0]} ref={leftArmRef}>
          <mesh position={[0, -0.3, 0]}>
            <capsuleGeometry args={[0.06, 0.5, 12, 24]} />
            <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.2} />
          </mesh>
        </group>

        {/* Right Arm - blue */}
        <group position={[0.25, 1.2, 0]} ref={rightArmRef}>
          <mesh position={[0, -0.3, 0]}>
            <capsuleGeometry args={[0.06, 0.5, 12, 24]} />
            <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.2} />
          </mesh>
        </group>

        {/* Left Leg - black */}
        <group position={[-0.1, 0.5, 0]} ref={leftLegRef}>
          <mesh position={[0, -0.4, 0]}>
            <capsuleGeometry args={[0.07, 0.6, 12, 24]} />
            <meshStandardMaterial color={bodyColor} roughness={0.4} metalness={0.1} />
          </mesh>
        </group>

        {/* Right Leg - black */}
        <group position={[0.1, 0.5, 0]} ref={rightLegRef}>
          <mesh position={[0, -0.4, 0]}>
            <capsuleGeometry args={[0.07, 0.6, 12, 24]} />
            <meshStandardMaterial color={bodyColor} roughness={0.4} metalness={0.1} />
          </mesh>
        </group>

        {/* Glow effect */}
        <pointLight color={glowColor} intensity={isDark ? 0.6 : 0.4} distance={1.2} />
      </group>
    </group>
  );
}
