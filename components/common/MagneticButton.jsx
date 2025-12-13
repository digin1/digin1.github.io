'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * MagneticButton - A button that magnetically attracts to the cursor
 * Creates an engaging, playful interaction
 */
export default function MagneticButton({
  children,
  className = '',
  strength = 0.3, // How strongly it attracts (0-1)
  radius = 100, // Activation radius in pixels
  as: Component = 'button',
  ...props
}) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < radius) {
      const pullStrength = (1 - distance / radius) * strength;
      setPosition({
        x: distanceX * pullStrength,
        y: distanceY * pullStrength,
      });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={buttonRef}
      className="inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    >
      <Component className={className} {...props}>
        {children}
      </Component>
    </motion.div>
  );
}

/**
 * MagneticLink - A link with magnetic effect
 */
export function MagneticLink({
  children,
  href,
  className = '',
  strength = 0.2,
  ...props
}) {
  return (
    <MagneticButton
      as="a"
      href={href}
      className={className}
      strength={strength}
      {...props}
    >
      {children}
    </MagneticButton>
  );
}

/**
 * HoverScale - Simple scale on hover effect
 */
export function HoverScale({
  children,
  className = '',
  scale = 1.05,
  ...props
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * HoverTilt - 3D tilt effect on hover
 */
export function HoverTilt({
  children,
  className = '',
  tiltStrength = 10, // Max tilt angle in degrees
  ...props
}) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    setTilt({
      x: -percentY * tiltStrength,
      y: percentX * tiltStrength,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * RippleButton - Button with ripple effect on click
 */
export function RippleButton({
  children,
  className = '',
  rippleColor = 'rgba(255, 255, 255, 0.3)',
  as: Component = 'button',
  ...props
}) {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <Component
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: rippleColor,
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </Component>
  );
}

/**
 * GlowButton - Button with animated glow effect
 */
export function GlowButton({
  children,
  className = '',
  glowColor = '#3B82F6',
  ...props
}) {
  return (
    <motion.button
      className={`relative ${className}`}
      whileHover="hover"
      {...props}
    >
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0"
        style={{
          boxShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`,
        }}
        variants={{
          hover: { opacity: 0.5 },
        }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
