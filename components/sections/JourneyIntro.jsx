'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedCounter } from '@/components/common/AnimatedText';

export default function JourneyIntro({
  className = '',
  projectCount = 13,
  skillsCount = 40,
  yearsExperience = 8,
}) {
  const stats = [
    { value: yearsExperience, suffix: '+', label: 'Years Experience', description: 'In the tech industry' },
    { value: projectCount, suffix: '', label: 'Projects Built', description: 'Research & commercial' },
    { value: skillsCount, suffix: '+', label: 'Technologies', description: 'Mastered & applied' },
    { value: 2, suffix: '', label: 'Countries', description: 'India & United Kingdom' },
  ];
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      id="journey-intro"
      className={`relative py-24 md:py-32 overflow-hidden ${className}`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neural-blue/15 dark:bg-neural-blue/5 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-synapse-cyan/15 dark:bg-synapse-cyan/5 rounded-full filter blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Title */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-neural-blue/10 text-neural-blue text-sm font-mono mb-6 border border-neural-blue/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {'// The Journey'}
          </motion.span>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-light-text dark:text-ghost-white mb-6">
            <span className="block">Building Digital Solutions</span>
            <span className="block mt-2">
              That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neural-blue to-synapse-cyan">
                Bridge Science & Software
              </span>
            </span>
          </h2>

          <motion.p
            className="text-lg md:text-xl text-light-text-secondary dark:text-muted-steel max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            From system administration in India to research engineering at the University of Edinburgh,
            my journey has been about making complex data accessible through elegant software solutions.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
            >
              {/* Card */}
              <div className="relative p-6 md:p-8 liquid-glass hover-card group-hover:border-neural-blue/30">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-neural-blue/10 to-synapse-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                {/* Number */}
                <div className="relative mb-3">
                  <span className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neural-blue to-synapse-cyan">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={2}
                      className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neural-blue to-synapse-cyan"
                    />
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-lg md:text-xl font-display font-semibold text-light-text dark:text-ghost-white mb-1">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-light-text-secondary dark:text-muted-steel">
                  {stat.description}
                </p>

                {/* Decorative element */}
                <div className="absolute -bottom-2 -right-2 w-16 h-16 border-2 border-neural-blue/10 rounded-xl -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Journey Preview */}
        <motion.div
          className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-light-text-secondary dark:text-muted-steel mb-4">
            Scroll to explore my journey
          </p>
          <motion.div
            className="inline-flex items-center justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-neural-blue"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Connecting Line to Next Section */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-neural-blue/50 to-transparent"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        style={{ transformOrigin: 'top' }}
      />
    </section>
  );
}
