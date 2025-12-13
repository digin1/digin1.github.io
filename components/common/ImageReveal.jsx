'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * ImageReveal - Animated image reveal component
 * Supports multiple reveal effects: wipe, scale, blur, slide
 */
export default function ImageReveal({
  src,
  alt = '',
  width,
  height,
  className = '',
  containerClassName = '',
  effect = 'wipe', // 'wipe' | 'scale' | 'blur' | 'slide' | 'fade' | 'clip'
  direction = 'left', // 'left' | 'right' | 'top' | 'bottom'
  duration = 0.8,
  delay = 0,
  once = true,
  threshold = 0.3,
  overlayColor = 'var(--neural-blue)',
  children,
  ...props
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once, amount: threshold });

  // Wipe reveal with overlay
  if (effect === 'wipe') {
    const wipeDirection = {
      left: { initial: { x: 0 }, animate: { x: '100%' } },
      right: { initial: { x: 0 }, animate: { x: '-100%' } },
      top: { initial: { y: 0 }, animate: { y: '100%' } },
      bottom: { initial: { y: 0 }, animate: { y: '-100%' } },
    };

    return (
      <div ref={containerRef} className={`relative overflow-hidden ${containerClassName}`}>
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
          transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {src ? (
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              className={`w-full h-full object-cover ${className}`}
              {...props}
            />
          ) : children}
        </motion.div>
        <motion.div
          className="absolute inset-0 z-10"
          style={{ backgroundColor: overlayColor }}
          initial={wipeDirection[direction].initial}
          animate={isInView ? wipeDirection[direction].animate : wipeDirection[direction].initial}
          transition={{ duration: duration * 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    );
  }

  // Scale reveal
  if (effect === 'scale') {
    return (
      <div ref={containerRef} className={`overflow-hidden ${containerClassName}`}>
        <motion.div
          initial={{ opacity: 0, scale: 1.3 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.3 }}
          transition={{ duration: duration * 1.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {src ? (
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              className={`w-full h-full object-cover ${className}`}
              {...props}
            />
          ) : children}
        </motion.div>
      </div>
    );
  }

  // Blur reveal
  if (effect === 'blur') {
    return (
      <div ref={containerRef} className={containerClassName}>
        <motion.div
          initial={{ opacity: 0, filter: 'blur(20px)' }}
          animate={isInView ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(20px)' }}
          transition={{ duration: duration * 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {src ? (
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              className={`w-full h-full object-cover ${className}`}
              {...props}
            />
          ) : children}
        </motion.div>
      </div>
    );
  }

  // Slide reveal
  if (effect === 'slide') {
    const slideDirection = {
      left: { initial: { x: '-100%', opacity: 0 }, animate: { x: 0, opacity: 1 } },
      right: { initial: { x: '100%', opacity: 0 }, animate: { x: 0, opacity: 1 } },
      top: { initial: { y: '-100%', opacity: 0 }, animate: { y: 0, opacity: 1 } },
      bottom: { initial: { y: '100%', opacity: 0 }, animate: { y: 0, opacity: 1 } },
    };

    return (
      <div ref={containerRef} className={`overflow-hidden ${containerClassName}`}>
        <motion.div
          initial={slideDirection[direction].initial}
          animate={isInView ? slideDirection[direction].animate : slideDirection[direction].initial}
          transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {src ? (
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              className={`w-full h-full object-cover ${className}`}
              {...props}
            />
          ) : children}
        </motion.div>
      </div>
    );
  }

  // Clip reveal (circular)
  if (effect === 'clip') {
    return (
      <div ref={containerRef} className={containerClassName}>
        <motion.div
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={isInView ? { clipPath: 'circle(100% at 50% 50%)' } : { clipPath: 'circle(0% at 50% 50%)' }}
          transition={{ duration: duration * 1.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {src ? (
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              className={`w-full h-full object-cover ${className}`}
              {...props}
            />
          ) : children}
        </motion.div>
      </div>
    );
  }

  // Default: fade reveal
  return (
    <div ref={containerRef} className={containerClassName}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-full object-cover ${className}`}
            {...props}
          />
        ) : children}
      </motion.div>
    </div>
  );
}

/**
 * ImageParallax - Image with parallax effect
 */
export function ImageParallax({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  speed = 0.3,
  scale = 1.2,
  ...props
}) {
  return (
    <div className={`overflow-hidden ${containerClassName}`}>
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        style={{ scale }}
        initial={{ y: 0 }}
        whileInView={{ y: `${speed * -100}%` }}
        viewport={{ once: false }}
        transition={{ type: 'tween', ease: 'linear' }}
        {...props}
      />
    </div>
  );
}

/**
 * HoverZoomImage - Image that zooms on hover
 */
export function HoverZoomImage({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  zoomScale = 1.1,
  duration = 0.4,
  ...props
}) {
  return (
    <div className={`overflow-hidden ${containerClassName}`}>
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        whileHover={{ scale: zoomScale }}
        transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}
        {...props}
      />
    </div>
  );
}
