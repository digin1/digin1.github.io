'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgressIndicator - Vertical progress bar with section markers
 */
export default function ScrollProgressIndicator({
  sections = [],
  className = '',
  showLabels = true,
  activeColor = '#3B82F6',
  inactiveColor = 'rgba(59, 130, 246, 0.2)',
}) {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Show indicator after scrolling starts
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    if (sections.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Main Progress Bar */}
      <motion.div
        className={`fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-4 ${className}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Progress Track */}
        <div className="relative h-32 w-1 rounded-full overflow-hidden" style={{ backgroundColor: inactiveColor }}>
          <motion.div
            className="absolute bottom-0 left-0 right-0 origin-bottom rounded-full"
            style={{
              backgroundColor: activeColor,
              scaleY,
            }}
          />
        </div>

        {/* Section Markers */}
        {sections.length > 0 && (
          <div className="flex flex-col gap-3">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group relative flex items-center gap-3"
                aria-label={`Scroll to ${section.label}`}
              >
                {/* Dot */}
                <motion.div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeSection
                      ? 'scale-125'
                      : 'scale-100 hover:scale-110'
                  }`}
                  style={{
                    backgroundColor: index === activeSection ? activeColor : inactiveColor,
                  }}
                />

                {/* Label Tooltip */}
                {showLabels && (
                  <span
                    className={`absolute right-6 whitespace-nowrap text-sm font-medium px-2 py-1 rounded bg-midnight-steel/90 dark:bg-light-surface/90 text-ghost-white dark:text-light-text opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
                      index === activeSection ? 'opacity-100' : ''
                    }`}
                  >
                    {section.label}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Mobile: Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 lg:hidden"
        style={{ backgroundColor: inactiveColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      >
        <motion.div
          className="h-full origin-left"
          style={{
            backgroundColor: activeColor,
            scaleX: scrollYProgress,
          }}
        />
      </motion.div>
    </>
  );
}

/**
 * SectionNav - Floating navigation for homepage sections
 */
export function SectionNav({
  sections = [],
  className = '',
  position = 'right', // 'right' | 'left'
}) {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`fixed ${position === 'right' ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 z-40 hidden lg:block ${className}`}
      initial={{ opacity: 0, x: position === 'right' ? 20 : -20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : (position === 'right' ? 20 : -20) }}
      transition={{ duration: 0.3 }}
    >
      <ul className="flex flex-col gap-4">
        {sections.map((section, index) => (
          <li key={section.id}>
            <button
              onClick={() => scrollToSection(section.id)}
              className="group flex items-center gap-3"
              aria-label={`Navigate to ${section.label}`}
            >
              {position === 'left' && (
                <span
                  className={`text-xs font-mono transition-all duration-300 ${
                    index === activeSection
                      ? 'text-neural-blue opacity-100'
                      : 'text-muted-steel opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {section.label}
                </span>
              )}

              <span className="relative flex items-center justify-center">
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeSection
                      ? 'bg-neural-blue scale-150'
                      : 'bg-muted-steel/50 group-hover:bg-muted-steel'
                  }`}
                />
                {index === activeSection && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-neural-blue/30"
                    initial={{ scale: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </span>

              {position === 'right' && (
                <span
                  className={`text-xs font-mono transition-all duration-300 ${
                    index === activeSection
                      ? 'text-neural-blue opacity-100'
                      : 'text-muted-steel opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {section.label}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

/**
 * ScrollIndicator - Animated scroll down indicator
 */
export function ScrollIndicator({
  className = '',
  text = 'Scroll to explore',
  onClick,
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <motion.button
      className={`flex flex-col items-center gap-2 ${className}`}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      aria-label="Scroll down"
    >
      <span className="text-sm font-mono text-muted-steel">{text}</span>
      <motion.div
        className="w-6 h-10 rounded-full border-2 border-neural-blue/50 flex justify-center pt-2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="w-1 h-2 bg-neural-blue rounded-full"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.button>
  );
}
