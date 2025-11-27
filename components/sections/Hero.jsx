'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Hero({ content }) {
  const [showContent, setShowContent] = useState(false);

  const defaultMetadata = {
    name: 'Digin Dominic',
    title: 'Software Engineer | Research Toolsmith | Data Workflow Architect',
    subtitle: 'Building tools that transform how researchers interact with data. From high-performance image segmentation to intuitive 3D visualizations, I create solutions that turn complex research into accessible, interactive applications.',
    profileImage: 'https://raw.githubusercontent.com/digin1/web-images/refs/heads/main/digin.png',
    primaryCta: 'View Projects',
    primaryCtaLink: '/projects',
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
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen relative overflow-hidden flex items-center">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-20" />
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-neural-blue/10 dark:bg-neural-blue/20 rounded-full filter blur-[128px]" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-synapse-cyan/5 dark:bg-synapse-cyan/10 rounded-full filter blur-[128px]" />

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-12 relative z-10">
        {showContent && (
          <motion.div
            className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Text Content */}
            <motion.div
              className="flex-1 text-center lg:text-left"
              variants={fadeInLeft}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-light-text dark:text-ghost-white"
                variants={staggerItem}
              >
                Hi, I'm <span className="text-gradient">{name.split(' ')[0]}</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl mb-6 font-mono text-neural-blue"
                variants={staggerItem}
              >
                {title}
              </motion.p>

              <motion.div
                className="text-light-text-secondary dark:text-muted-steel text-base md:text-lg mb-8 max-w-xl mx-auto lg:mx-0"
                variants={staggerItem}
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
                variants={staggerItem}
              >
                <Link href={primaryCtaLink} className="btn-primary group inline-flex items-center gap-2">
                  {primaryCta}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                {secondaryCta && (
                  <Link href={secondaryCtaLink} className="btn-secondary inline-flex items-center gap-2">
                    <FontAwesomeIcon icon={faEnvelope} />
                    {secondaryCta}
                  </Link>
                )}
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex gap-4 justify-center lg:justify-start"
                variants={staggerItem}
              >
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

            {/* Profile Image */}
            <motion.div
              className="flex-1 flex justify-center lg:justify-end"
              variants={fadeInRight}
            >
              <motion.div
                className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-neural-blue to-synapse-cyan rounded-2xl blur-lg opacity-30" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-light-border dark:border-slate-700/50">
                  <img
                    src={profileImage}
                    alt={name}
                    className="w-full h-full object-cover img-glow"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-neural-blue/30 rounded-xl -z-10" />
                <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-synapse-cyan/30 rounded-xl -z-10" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
