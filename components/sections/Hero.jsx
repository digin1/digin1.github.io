'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import AnimatedText from '@/components/common/AnimatedText';
import { ScrollIndicator } from '@/components/common/ScrollProgressIndicator';
import { MouseParallax, Floating } from '@/components/common/ParallaxLayer';

export default function Hero({ content }) {
  const [showContent, setShowContent] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Mouse tracking for gradient effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const gradientX = useTransform(smoothMouseX, [0, 1], ['20%', '80%']);
  const gradientY = useTransform(smoothMouseY, [0, 1], ['20%', '80%']);

  const defaultMetadata = {
    name: 'Digin Dominic',
    title: 'Software Engineer | Research Toolsmith | Data Workflow Architect',
    subtitle: 'Building tools that transform how researchers interact with data. From high-performance image segmentation to intuitive 3D visualizations, I create solutions that turn complex research into accessible, interactive applications.',
    profileImage: '/images/digin.png',
    primaryCta: 'View My Work',
    primaryCtaLink: '#impact-showcase',
    secondaryCta: 'Get In Touch',
    secondaryCtaLink: '/contact'
  };

  const metadata = content?.metadata || defaultMetadata;
  const {
    name = defaultMetadata.name,
    title = defaultMetadata.title,
    subtitle = defaultMetadata.subtitle,
    profileImage = defaultMetadata.profileImage,
    primaryCta = defaultMetadata.primaryCta,
    primaryCtaLink = defaultMetadata.primaryCtaLink,
    secondaryCta = defaultMetadata.secondaryCta,
    secondaryCtaLink = defaultMetadata.secondaryCtaLink,
  } = metadata;

  const processedSubtitle = subtitle.replace(/\\n/g, '\n');
  const paragraphs = processedSubtitle.split('\n').filter(p => p.trim() !== '');

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToContent = () => {
    const nextSection = document.getElementById('journey-intro');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="min-h-screen relative overflow-hidden flex items-center"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-20" />

        {/* Mouse-reactive gradient */}
        <motion.div
          className="absolute inset-0 opacity-50"
          style={{
            background: `radial-gradient(circle at ${gradientX} ${gradientY}, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
          }}
        />

        {/* Liquid Glass Blobs */}
        <div className="liquid-blob liquid-blob-blue w-64 md:w-96 h-64 md:h-96 top-10 -left-32 md:-left-48" style={{ animationDelay: '0s' }} />
        <div className="liquid-blob liquid-blob-cyan w-48 md:w-80 h-48 md:h-80 bottom-20 -right-24 md:-right-40" style={{ animationDelay: '-4s' }} />
        <div className="liquid-blob liquid-blob-purple w-40 md:w-64 h-40 md:h-64 top-1/2 left-1/4 hidden md:block" style={{ animationDelay: '-2s' }} />

        {/* Floating glass orbs */}
        <Floating intensity={15} duration={8} delay={0}>
          <div className="absolute top-20 right-1/4 w-24 h-24 rounded-full glass-card opacity-40 hidden lg:block" />
        </Floating>
        <Floating intensity={10} duration={6} delay={2}>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 rounded-full glass-card opacity-30 hidden lg:block" />
        </Floating>

        {/* Subtle particle dots - reduced on mobile */}
        <div className="absolute inset-0 overflow-hidden hidden md:block">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neural-blue/60 dark:bg-neural-blue/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-12 relative z-10">
        {showContent && (
          <motion.div
            className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Text Content */}
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Greeting */}
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-neural-blue/10 text-neural-blue text-sm font-mono border border-neural-blue/20">
                  {'// Welcome to my portfolio'}
                </span>
              </motion.div>

              {/* Name with character animation */}
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-6 text-light-text dark:text-ghost-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span className="block mb-2">Hi, I'm</span>
                <span className="block">
                  <AnimatedText
                    text={name.split(' ')[0]}
                    animation="chars"
                    delay={0.5}
                    stagger={0.05}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-neural-blue via-synapse-cyan to-neural-blue bg-[length:200%_auto] animate-gradient-x"
                  />
                </span>
              </motion.h1>

              {/* Title */}
              <motion.p
                className="text-lg md:text-xl lg:text-2xl mb-6 font-mono text-neural-blue"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {title}
              </motion.p>

              {/* Subtitle */}
              <motion.div
                className="text-light-text-secondary dark:text-muted-steel text-base md:text-lg mb-8 max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className={index > 0 ? 'mt-4' : ''}>
                    {paragraph}
                  </p>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Link
                  href={primaryCtaLink}
                  className="btn-primary group inline-flex items-center gap-2 relative overflow-hidden"
                >
                  <span className="relative z-10">{primaryCta}</span>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="relative z-10 transition-transform group-hover:translate-x-1"
                  />
                </Link>
                {secondaryCta && (
                  <Link
                    href={secondaryCtaLink}
                    className="btn-secondary inline-flex items-center gap-2 group"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="group-hover:scale-110 transition-transform" />
                    {secondaryCta}
                  </Link>
                )}
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                {[
                  { href: 'https://github.com/digin1', icon: faGithub, label: 'GitHub' },
                  { href: 'https://www.linkedin.com/in/digin/', icon: faLinkedinIn, label: 'LinkedIn' },
                  { href: 'https://x.com/digin1', icon: faXTwitter, label: 'X' },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-light-surface dark:bg-midnight-steel/50 border border-light-border dark:border-slate-700/50 flex items-center justify-center text-light-text-secondary dark:text-muted-steel hover:text-neural-blue hover:border-neural-blue/50 hover:shadow-glow-blue transition-all duration-300"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                  >
                    <FontAwesomeIcon icon={social.icon} className="w-5 h-5" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              className="flex-1 flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <MouseParallax sensitivity={0.02} className="relative">
                <motion.div
                  className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated glow ring */}
                  <motion.div
                    className="absolute -inset-2 rounded-2xl"
                    style={{
                      background: 'linear-gradient(45deg, #3B82F6, #06B6D4, #8B5CF6, #3B82F6)',
                      backgroundSize: '300% 300%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-neural-blue to-synapse-cyan rounded-2xl blur-lg opacity-60 dark:opacity-40"
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* Image container */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white/10 dark:border-slate-700/50 bg-light-surface dark:bg-midnight-steel">
                    <img
                      src={profileImage}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                    {/* Subtle overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neural-blue/10 to-transparent" />
                  </div>

                  {/* Decorative elements */}
                  <Floating intensity={5} duration={4} delay={0.5}>
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 border-2 border-neural-blue/30 rounded-xl" />
                  </Floating>
                  <Floating intensity={5} duration={5} delay={1}>
                    <div className="absolute -top-4 -left-4 w-14 h-14 border-2 border-synapse-cyan/30 rounded-xl" />
                  </Floating>
                  <Floating intensity={8} duration={6} delay={0}>
                    <div className="absolute top-1/2 -right-8 w-3 h-3 bg-neural-blue rounded-full" />
                  </Floating>
                  <Floating intensity={8} duration={5} delay={2}>
                    <div className="absolute bottom-1/4 -left-6 w-2 h-2 bg-synapse-cyan rounded-full" />
                  </Floating>
                </motion.div>
              </MouseParallax>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator - centered to viewport */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <ScrollIndicator onClick={scrollToContent} text="Scroll to explore" />
        </motion.div>
      </div>
    </section>
  );
}
