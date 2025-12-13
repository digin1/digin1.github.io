'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * ParallaxLayer - Wrapper component for parallax effects
 */
export default function ParallaxLayer({
  children,
  speed = 0.5, // Positive = moves slower (layer behind), Negative = moves faster (layer in front)
  className = '',
  direction = 'vertical', // 'vertical' | 'horizontal'
  offset = ['0%', '0%'], // [start, end] custom offset
  smoothing = 0.1, // Spring smoothing (0 = no smoothing)
  disabled = false,
  ...props
}) {
  const ref = useRef(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yRange = useTransform(
    scrollYProgress,
    [0, 1],
    offset[0] !== '0%' || offset[1] !== '0%'
      ? [offset[0], offset[1]]
      : [`${speed * 100}px`, `${-speed * 100}px`]
  );

  const xRange = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * 50}px`, `${-speed * 50}px`]
  );

  const y = smoothing > 0 ? useSpring(yRange, { stiffness: 100, damping: 30 }) : yRange;
  const x = smoothing > 0 ? useSpring(xRange, { stiffness: 100, damping: 30 }) : xRange;

  if (disabled || isReducedMotion) {
    return <div className={className} {...props}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={direction === 'vertical' ? { y } : { x }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * ParallaxBackground - Full-screen parallax background
 */
export function ParallaxBackground({
  children,
  speed = 0.3,
  className = '',
  overlay = false,
  overlayOpacity = 0.5,
  ...props
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} {...props}>
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y }}
      >
        {children}
      </motion.div>
      {overlay && (
        <div
          className="absolute inset-0 bg-black/50"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </div>
  );
}

/**
 * ScrollScale - Element that scales based on scroll
 */
export function ScrollScale({
  children,
  className = '',
  scaleRange = [0.8, 1],
  ...props
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ scale }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollOpacity - Element that fades based on scroll
 */
export function ScrollOpacity({
  children,
  className = '',
  opacityRange = [0, 1],
  offset = ['start end', 'center center'],
  ...props
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const opacity = useTransform(scrollYProgress, [0, 1], opacityRange);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollRotate - Element that rotates based on scroll
 */
export function ScrollRotate({
  children,
  className = '',
  rotateRange = [0, 360],
  ...props
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], rotateRange);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotate }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * MouseParallax - Element that follows mouse with parallax effect
 * Disabled on touch devices and when prefers-reduced-motion is set
 */
export function MouseParallax({
  children,
  className = '',
  sensitivity = 0.05,
  inverted = false,
  ...props
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDisabled, setIsDisabled] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Disable on touch devices and reduced motion
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsDisabled(isTouchDevice || prefersReducedMotion);
  }, []);

  useEffect(() => {
    if (isDisabled) return;

    const handleMouseMove = (e) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const moveX = (e.clientX - centerX) * sensitivity * (inverted ? -1 : 1);
      const moveY = (e.clientY - centerY) * sensitivity * (inverted ? -1 : 1);

      setPosition({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [sensitivity, inverted, isDisabled]);

  if (isDisabled) {
    return <div className={className} {...props}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Floating - Continuous floating animation
 * Respects prefers-reduced-motion
 */
export function Floating({
  children,
  className = '',
  intensity = 10,
  duration = 3,
  delay = 0,
  ...props
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  if (prefersReducedMotion) {
    return <div className={className} {...props}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -intensity, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
        delay,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * DepthLayer - Create visual depth with multiple parallax layers
 */
export function DepthLayer({
  children,
  className = '',
  depth = 1, // 1 = nearest (fastest), higher = further (slower)
  ...props
}) {
  const speed = 0.1 * depth;
  const scale = 1 - (depth - 1) * 0.05;
  const blur = depth > 2 ? (depth - 2) * 2 : 0;

  return (
    <ParallaxLayer
      speed={speed}
      className={className}
      style={{
        transform: `scale(${scale})`,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        opacity: 1 - (depth - 1) * 0.1,
      }}
      {...props}
    >
      {children}
    </ParallaxLayer>
  );
}
