import * as THREE from 'three';

/**
 * Generate brain-like point cloud
 * Uses parametric sphere with noise deformation
 */
export function generateBrainShape(count) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI;

    // Base sphere
    let x = Math.sin(v) * Math.cos(u);
    let y = Math.sin(v) * Math.sin(u) * 0.8; // Slightly flattened
    let z = Math.cos(v);

    // Add brain-like deformations (sulci simulation)
    const noise1 = Math.sin(u * 6) * Math.cos(v * 4) * 0.15;
    const noise2 = Math.sin(u * 8 + v * 6) * 0.1;

    x += noise1 * Math.sin(v);
    z += noise2 * Math.cos(v);

    // Scale
    const scale = 2.5;
    positions[i * 3] = x * scale;
    positions[i * 3 + 1] = y * scale;
    positions[i * 3 + 2] = z * scale;
  }

  return positions;
}

/**
 * Generate DNA double helix shape
 */
export function generateDNAShape(count) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 8; // Multiple rotations
    const y = (i / count - 0.5) * 6; // Vertical spread

    // Randomly assign to strand 1 or strand 2, or connecting bar
    const strand = Math.random();

    if (strand < 0.4) {
      // Strand 1
      const radius = 1.2;
      positions[i * 3] = Math.cos(t) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(t) * radius;
    } else if (strand < 0.8) {
      // Strand 2 (opposite phase)
      const radius = 1.2;
      positions[i * 3] = Math.cos(t + Math.PI) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(t + Math.PI) * radius;
    } else {
      // Connecting bars
      const barT = Math.floor(t / (Math.PI / 2)) * (Math.PI / 2);
      const barProgress = Math.random();
      const x1 = Math.cos(barT) * 1.2;
      const z1 = Math.sin(barT) * 1.2;
      const x2 = Math.cos(barT + Math.PI) * 1.2;
      const z2 = Math.sin(barT + Math.PI) * 1.2;

      positions[i * 3] = x1 + (x2 - x1) * barProgress;
      positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.1;
      positions[i * 3 + 2] = z1 + (z2 - z1) * barProgress;
    }
  }

  return positions;
}

/**
 * Generate globe/sphere shape with landmass-like density
 */
export function generateGlobeShape(count) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    // Fibonacci sphere distribution for even coverage
    const phi = Math.acos(1 - 2 * (i + 0.5) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;

    const radius = 2 + (Math.random() - 0.5) * 0.2; // Slight variation

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }

  return positions;
}

/**
 * Generate scattered/dispersed random cloud
 */
export function generateScatterShape(count) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    // Random positions in a larger volume
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
  }

  return positions;
}

/**
 * Generate data grid/matrix shape
 */
export function generateGridShape(count) {
  const positions = new Float32Array(count * 3);
  const gridSize = Math.ceil(Math.cbrt(count));

  for (let i = 0; i < count; i++) {
    const x = (i % gridSize) / gridSize - 0.5;
    const y = (Math.floor(i / gridSize) % gridSize) / gridSize - 0.5;
    const z = Math.floor(i / (gridSize * gridSize)) / gridSize - 0.5;

    // Add slight randomness
    positions[i * 3] = x * 5 + (Math.random() - 0.5) * 0.1;
    positions[i * 3 + 1] = y * 5 + (Math.random() - 0.5) * 0.1;
    positions[i * 3 + 2] = z * 3 + (Math.random() - 0.5) * 0.1;
  }

  return positions;
}

export const SHAPES = {
  brain: generateBrainShape,
  dna: generateDNAShape,
  globe: generateGlobeShape,
  scatter: generateScatterShape,
  grid: generateGridShape,
};

export default SHAPES;
