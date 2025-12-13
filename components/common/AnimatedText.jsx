'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * AnimatedText - Versatile text animation component
 * Supports character-by-character, word-by-word, line-by-line, and typewriter effects
 */
export default function AnimatedText({
  text,
  as: Component = 'span',
  className = '',
  animation = 'chars', // 'chars' | 'words' | 'lines' | 'typewriter' | 'highlight'
  delay = 0,
  duration = 0.5,
  stagger = 0.02,
  once = true,
  threshold = 0.5,
  highlightColor = 'var(--neural-blue)',
  ...props
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once, amount: threshold });
  const [displayText, setDisplayText] = useState('');

  // Typewriter effect
  useEffect(() => {
    if (animation === 'typewriter' && isInView) {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [animation, isInView, text]);

  // Character animation
  if (animation === 'chars') {
    const chars = text.split('');
    return (
      <Component ref={containerRef} className={className} {...props}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            style={{ display: 'inline-block' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </Component>
    );
  }

  // Word animation
  if (animation === 'words') {
    const words = text.split(' ');
    return (
      <Component ref={containerRef} className={className} {...props}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration,
              delay: delay + i * (stagger * 3),
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </Component>
    );
  }

  // Line animation (for multiline text)
  if (animation === 'lines') {
    const lines = text.split('\n');
    return (
      <Component ref={containerRef} className={className} {...props}>
        {lines.map((line, i) => (
          <motion.span
            key={i}
            style={{ display: 'block' }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: duration * 1.5,
              delay: delay + i * (stagger * 10),
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {line}
          </motion.span>
        ))}
      </Component>
    );
  }

  // Typewriter animation
  if (animation === 'typewriter') {
    return (
      <Component ref={containerRef} className={className} {...props}>
        {displayText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-[2px] h-[1em] ml-1 bg-current align-middle"
        />
      </Component>
    );
  }

  // Highlight animation
  if (animation === 'highlight') {
    return (
      <Component ref={containerRef} className={`relative inline-block ${className}`} {...props}>
        <span className="relative z-10">{text}</span>
        <motion.span
          className="absolute bottom-0 left-0 h-[30%] w-full -z-0"
          style={{ backgroundColor: highlightColor, opacity: 0.3 }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{
            duration: duration * 1.5,
            delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      </Component>
    );
  }

  // Default: simple fade in
  return (
    <Component ref={containerRef} className={className} {...props}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {text}
      </motion.span>
    </Component>
  );
}

/**
 * AnimatedCounter - Animated number counter
 */
export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  className = '',
  once = true,
}) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const endValue = parseInt(value, 10);

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.floor(easedProgress * endValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={countRef} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

/**
 * GradientText - Text with animated gradient
 */
export function GradientText({
  text,
  as: Component = 'span',
  className = '',
  gradient = 'from-neural-blue to-synapse-cyan',
  animate = true,
  ...props
}) {
  return (
    <Component
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${
        animate ? 'bg-[length:200%_auto] animate-gradient-x' : ''
      } ${className}`}
      {...props}
    >
      {text}
    </Component>
  );
}

/**
 * SplitText - Split text for complex animations
 */
export function SplitText({
  text,
  as: Component = 'span',
  className = '',
  charClassName = '',
  wordClassName = '',
  ...props
}) {
  const words = text.split(' ');

  return (
    <Component className={className} {...props}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className={`inline-block ${wordClassName}`}>
          {word.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className={`inline-block ${charClassName}`}
              style={{ '--char-index': charIndex, '--word-index': wordIndex }}
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </Component>
  );
}
