'use client';

import { useRef, lazy, Suspense } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faArrowRight, faCode, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';

// Lazy load Three.js component
const BrainMeshCanvas = lazy(() => import('@/components/three/BrainMesh'));

export default function CTASection({ className = '' }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      id="cta"
      className={`relative py-24 md:py-32 overflow-hidden ${className}`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Three.js Brain Mesh */}
        <Suspense fallback={null}>
          <BrainMeshCanvas className="opacity-60 dark:opacity-50" />
        </Suspense>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neural-blue/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neural-blue/3 rounded-full filter blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Badge */}
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-signal-green/10 text-signal-green text-sm font-mono mb-6 border border-signal-green/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {'// Let\'s Connect'}
          </motion.span>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-light-text dark:text-ghost-white mb-6">
            Have a Project in Mind?
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-neural-blue to-synapse-cyan">
              Let's Build Something Great
            </span>
          </h2>

          {/* Subtext */}
          <motion.p
            className="text-lg md:text-xl text-light-text-secondary dark:text-muted-steel mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Whether you're looking to build research tools, modernize data workflows, or create interactive visualizations—I'd love to hear about your project.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link
              href="/contact"
              className="btn-primary group inline-flex items-center justify-center gap-2 px-8 py-4 text-lg"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              Get In Touch
              <FontAwesomeIcon
                icon={faArrowRight}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/projects"
              className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg"
            >
              <FontAwesomeIcon icon={faCode} />
              View All Projects
            </Link>
          </motion.div>

          {/* What I Can Help With */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {[
              {
                icon: faLightbulb,
                title: 'Research Tools',
                description: 'Custom applications for scientific data analysis and visualization',
              },
              {
                icon: faCode,
                title: 'Web Development',
                description: 'Modern, performant web apps with React, Next.js, and Python',
              },
              {
                icon: faGithub,
                title: 'Open Source',
                description: 'Collaboration on interesting research and development projects',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="p-6 rounded-xl bg-light-surface dark:bg-midnight-steel/30 border border-light-border dark:border-slate-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="w-8 h-8 text-neural-blue mb-4"
                />
                <h3 className="text-lg font-display font-semibold text-light-text dark:text-ghost-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-light-text-secondary dark:text-muted-steel">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <span className="text-muted-steel">Find me on:</span>
            {[
              { href: 'https://github.com/digin1', icon: faGithub, label: 'GitHub' },
              { href: 'https://www.linkedin.com/in/digin/', icon: faLinkedinIn, label: 'LinkedIn' },
              { href: 'https://x.com/digin1', icon: faXTwitter, label: 'X' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-light-surface dark:bg-midnight-steel/50 border border-light-border dark:border-slate-700/50 flex items-center justify-center text-light-text-secondary dark:text-muted-steel hover:text-neural-blue hover:border-neural-blue/50 transition-all duration-300"
                aria-label={social.label}
              >
                <FontAwesomeIcon icon={social.icon} className="w-5 h-5" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
