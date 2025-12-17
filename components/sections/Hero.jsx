'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Hero({ content }) {
  const [mounted, setMounted] = useState(false);


  const defaultMetadata = {
    name: 'Digin Dominic',
    title: 'Software Engineer & Research Toolsmith',
    subtitle: 'Building tools that transform how researchers interact with data. From high-performance image segmentation to intuitive 3D visualizations.',
    profileImage: '/images/digin.png',
  };

  const metadata = content?.metadata || defaultMetadata;
  const {
    name = defaultMetadata.name,
    title = defaultMetadata.title,
    subtitle = defaultMetadata.subtitle,
    profileImage = defaultMetadata.profileImage,
  } = metadata;

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToContent = () => {
    const nextSection = document.getElementById('journey-intro');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { href: 'https://github.com/digin1', icon: faGithub, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/digin/', icon: faLinkedinIn, label: 'LinkedIn' },
    { href: 'https://x.com/digin1', icon: faXTwitter, label: 'X' },
  ];

  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
    >
      {/* Minimal Background */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-light-bg via-light-surface to-light-bg dark:from-deep-space dark:via-midnight-steel/50 dark:to-deep-space" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Accent gradients */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neural-blue/10 dark:bg-neural-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-synapse-cyan/10 dark:bg-synapse-cyan/5 rounded-full blur-[100px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Column - Text */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              {mounted && (
                <>
                  {/* Status Badge - Uncomment when available for opportunities
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 mb-8"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal-green opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-signal-green" />
                    </span>
                    <span className="text-sm font-medium text-light-text-secondary dark:text-muted-steel">
                      Available for opportunities
                    </span>
                  </motion.div>
                  */}

                  {/* Name */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 tracking-tight"
                  >
                    <span className="text-light-text dark:text-ghost-white">{name.split(' ')[0]}</span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neural-blue to-synapse-cyan">
                      {name.split(' ').slice(1).join(' ')}
                    </span>
                  </motion.h1>

                  {/* Title - Single line, auto-scaling */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-neural-blue font-medium mb-6 whitespace-nowrap text-[clamp(0.7rem,2.5vw,1.25rem)]"
                  >
                    {title}
                  </motion.p>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-base md:text-lg text-light-text-secondary dark:text-muted-steel mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
                  >
                    {subtitle}
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
                  >
                    <Link
                      href="#impact-showcase"
                      className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-neural-blue to-synapse-cyan text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-neural-blue/25 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      View My Work
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
                      />
                    </Link>
                    <Link
                      href="/about"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-light-surface dark:bg-midnight-steel/50 text-light-text dark:text-ghost-white font-semibold rounded-xl border border-light-border dark:border-slate-700/50 hover:border-neural-blue/50 hover:text-neural-blue transition-all duration-300"
                    >
                      <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                      About Me
                    </Link>
                  </motion.div>

                  {/* Social Links */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex gap-3 justify-center lg:justify-start"
                  >
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-xl bg-light-surface dark:bg-midnight-steel/30 border border-light-border dark:border-slate-700/50 flex items-center justify-center text-light-text-secondary dark:text-muted-steel hover:text-neural-blue hover:border-neural-blue/50 hover:bg-neural-blue/5 transition-all duration-300"
                        aria-label={social.label}
                      >
                        <FontAwesomeIcon icon={social.icon} className="w-5 h-5" />
                      </a>
                    ))}
                  </motion.div>
                </>
              )}
            </div>

            {/* Right Column - Profile Image */}
            <motion.div
              className="order-1 lg:order-2 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative">
                {/* Decorative rings */}
                <div className="absolute -inset-4 rounded-full border border-dashed border-neural-blue/20 dark:border-neural-blue/10 animate-[spin_30s_linear_infinite]" />
                <div className="absolute -inset-8 rounded-full border border-dashed border-synapse-cyan/10 dark:border-synapse-cyan/5 animate-[spin_40s_linear_infinite_reverse]" />

                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-neural-blue to-synapse-cyan rounded-full opacity-20 blur-2xl" />

                {/* Image container */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-white/20 dark:border-slate-700/50 shadow-2xl">
                  <img
                    src={profileImage}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neural-blue/10 to-transparent" />
                </div>

                {/* Floating badges */}
                <motion.div
                  className="absolute -right-2 top-1/4 px-3 py-1.5 bg-white dark:bg-midnight-steel rounded-lg shadow-lg border border-light-border dark:border-slate-700/50"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-xs font-semibold text-neural-blue">React</span>
                </motion.div>

                <motion.div
                  className="absolute -left-4 bottom-1/3 px-3 py-1.5 bg-white dark:bg-midnight-steel rounded-lg shadow-lg border border-light-border dark:border-slate-700/50"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <span className="text-xs font-semibold text-synapse-cyan">Python</span>
                </motion.div>

                <motion.div
                  className="absolute right-4 -bottom-2 px-3 py-1.5 bg-white dark:bg-midnight-steel rounded-lg shadow-lg border border-light-border dark:border-slate-700/50"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <span className="text-xs font-semibold text-signal-green">3D/WebGL</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-light-text-secondary dark:text-muted-steel hover:text-neural-blue transition-colors cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FontAwesomeIcon icon={faArrowDown} className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}
