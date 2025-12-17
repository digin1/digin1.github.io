import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

/**
 * Custom shader material for the Axonal Pathway
 * Features:
 * - Growth animation based on scroll progress
 * - Leading tip glow
 * - Recurring action potential pulse
 */
const AxonalMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0, // Scroll progress 0-1
    uColor: new THREE.Color('#3B82F6'), // neural-blue
    uGlowColor: new THREE.Color('#06B6D4'), // synapse-cyan
    uPulseColor: new THREE.Color('#10B981'), // signal-green
    uPulseSpeed: 0.8,
    uPulseWidth: 0.08,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform float uProgress;
    uniform vec3 uColor;
    uniform vec3 uGlowColor;
    uniform vec3 uPulseColor;
    uniform float uPulseSpeed;
    uniform float uPulseWidth;

    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;

    void main() {
      // 1. GROWTH - Discard fragments beyond scroll progress
      float growthEdge = uProgress + 0.001; // Tiny buffer to prevent z-fighting
      if (vUv.x > growthEdge) discard;

      // 2. LEADING TIP GLOW
      // Sharp glow at the current growth position
      float tipDistance = abs(vUv.x - uProgress);
      float tipGlow = smoothstep(0.08, 0.0, tipDistance);
      float tipIntensity = tipGlow * tipGlow * 3.0;

      // 3. ACTION POTENTIAL PULSE
      // Multiple pulses traveling backward along the grown portion
      float pulsePhase = mod(uTime * uPulseSpeed, 1.0);
      float pulsePosition = pulsePhase;

      // Only show pulse in the visible (grown) area
      float pulseVisible = step(pulsePosition, uProgress);
      float pulseDistance = abs(vUv.x - pulsePosition);
      float pulse = smoothstep(uPulseWidth, 0.0, pulseDistance) * pulseVisible;

      // Secondary pulse for more activity
      float pulse2Phase = mod(uTime * uPulseSpeed + 0.5, 1.0);
      float pulse2Position = pulse2Phase;
      float pulse2Visible = step(pulse2Position, uProgress);
      float pulse2Distance = abs(vUv.x - pulse2Position);
      float pulse2 = smoothstep(uPulseWidth * 0.7, 0.0, pulse2Distance) * pulse2Visible * 0.5;

      // 4. BASE GLOW along tube
      // Subtle ambient glow that varies along the length
      float baseGlow = 0.3 + sin(vUv.x * 20.0 + uTime * 0.5) * 0.1;

      // 5. FRESNEL EFFECT for edge glow
      float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);

      // 6. COMBINE COLORS
      vec3 color = uColor * baseGlow;

      // Add pulse colors
      color = mix(color, uPulseColor, pulse + pulse2);

      // Add tip glow
      color = mix(color, uGlowColor, tipIntensity);

      // Add fresnel edge highlight
      color += uGlowColor * fresnel * 0.3;

      // 7. ALPHA
      // Higher opacity at tip and pulse, lower for base
      float alpha = 0.4 + tipIntensity * 0.6 + (pulse + pulse2) * 0.3 + fresnel * 0.2;
      alpha = clamp(alpha, 0.0, 1.0);

      gl_FragColor = vec4(color, alpha);
    }
  `
);

// Register material with R3F
extend({ AxonalMaterial });

export default AxonalMaterial;
