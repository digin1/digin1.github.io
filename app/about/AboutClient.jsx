'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faMapMarkerAlt,
  faLanguage,
  faLightbulb,
  faUsers,
  faCode,
  faRocket,
  faArrowRight,
  faMicroscope,
  faDatabase,
  faServer,
  faCubes,
  faAward,
  faNewspaper,
  faChartLine,
  faBrain
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { MouseParallax, Floating } from '@/components/common/ParallaxLayer';
import { AnimatedCounter } from '@/components/common/AnimatedText';

const values = [
  {
    icon: faLightbulb,
    title: 'Cross-Domain Expertise',
    description: 'I bridge the gap between scientific requirements and technical implementation—discussing research needs with scientists and translating them into scalable software solutions.',
  },
  {
    icon: faUsers,
    title: 'User-Centric Design',
    description: 'Every tool I build starts with understanding the researcher\'s workflow. Complex datasets should become accessible, not add cognitive overhead.',
  },
  {
    icon: faCode,
    title: 'Production-Grade Quality',
    description: 'From Flask APIs to React frontends, I write clean, maintainable code with security, reproducibility, and compliance at the forefront.',
  },
  {
    icon: faRocket,
    title: 'End-to-End Ownership',
    description: 'I design architectures, write code, deploy systems, and maintain them in live environments. Full ownership means better solutions.',
  },
];

const expertiseAreas = [
  {
    icon: faMicroscope,
    title: 'Research Tools',
    description: 'Custom visualisation and segmentation tools for neuroscience research',
    technologies: ['Three.js', 'React', 'WebGL', 'Flask'],
    color: 'neural-blue',
  },
  {
    icon: faDatabase,
    title: 'Data Pipelines',
    description: 'Large-scale microscopy data processing and GPU-accelerated workflows',
    technologies: ['Python', 'Dask', 'Celery', 'PyTorch'],
    color: 'synapse-cyan',
  },
  {
    icon: faServer,
    title: 'Infrastructure',
    description: 'Docker, Kubernetes, distributed systems, and research clusters',
    technologies: ['Docker', 'K8s', 'Linux', 'CI/CD'],
    color: 'plasma-purple',
  },
  {
    icon: faCubes,
    title: 'Full-Stack Dev',
    description: 'End-to-end web applications from backend APIs to interactive frontends',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'REST'],
    color: 'signal-green',
  },
];

function YouTubeVideo({ videoId, title = "YouTube video" }) {
  if (!videoId) return null;
  return (
    <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden border border-light-border dark:border-slate-700/50">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function ValueCard({ value, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative p-6 rounded-xl bg-light-surface dark:bg-midnight-steel/50 border border-light-border dark:border-slate-700/50 h-full hover-card">
        <div className="absolute inset-0 bg-gradient-to-br from-neural-blue/5 to-synapse-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-neural-blue/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FontAwesomeIcon icon={value.icon} className="w-6 h-6 text-neural-blue" />
          </div>
          <h3 className="text-lg font-display font-semibold text-light-text dark:text-ghost-white mb-2">
            {value.title}
          </h3>
          <p className="text-sm text-light-text-secondary dark:text-muted-steel leading-relaxed">
            {value.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ExpertiseCard({ area, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  const colorClasses = {
    'neural-blue': 'from-neural-blue/20 to-neural-blue/5 border-neural-blue/30 text-neural-blue',
    'synapse-cyan': 'from-synapse-cyan/20 to-synapse-cyan/5 border-synapse-cyan/30 text-synapse-cyan',
    'plasma-purple': 'from-plasma-purple/20 to-plasma-purple/5 border-plasma-purple/30 text-plasma-purple',
    'signal-green': 'from-signal-green/20 to-signal-green/5 border-signal-green/30 text-signal-green',
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={`relative p-6 rounded-xl bg-gradient-to-br ${colorClasses[area.color]} border h-full hover-card`}>
        <div className="relative z-10">
          <div className={`w-14 h-14 rounded-xl bg-white/50 dark:bg-midnight-steel/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <FontAwesomeIcon icon={area.icon} className={`w-7 h-7 ${colorClasses[area.color].split(' ').pop()}`} />
          </div>
          <h3 className="text-xl font-display font-bold text-light-text dark:text-ghost-white mb-2">
            {area.title}
          </h3>
          <p className="text-sm text-light-text-secondary dark:text-muted-steel mb-4 leading-relaxed">
            {area.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {area.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs font-mono rounded bg-white/50 dark:bg-midnight-steel/50 text-light-text-secondary dark:text-muted-steel"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AchievementCard({ achievement, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.5 });

  const icons = {
    'Nature Publication': faNewspaper,
    'Best Project Award': faAward,
    'Research Impact': faChartLine,
    'Data Scale': faBrain,
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative p-4 md:p-6 rounded-xl bg-light-surface/80 dark:bg-midnight-steel/50 backdrop-blur-sm border border-light-border dark:border-slate-700/50 hover-card text-center">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-neural-blue to-synapse-cyan flex items-center justify-center mx-auto mb-3">
          <FontAwesomeIcon icon={icons[achievement.metric] || faAward} className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </div>
        <div className="text-base md:text-lg lg:text-xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neural-blue to-synapse-cyan mb-1 whitespace-nowrap">
          {achievement.value}
        </div>
        <div className="text-xs md:text-sm font-medium text-light-text dark:text-ghost-white mb-1">
          {achievement.metric}
        </div>
        <div className="text-xs text-light-text-secondary dark:text-muted-steel leading-tight">
          {achievement.description}
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutClient({ content }) {
  const heroRef = useRef(null);
  const achievementsRef = useRef(null);
  const expertiseRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isAchievementsInView = useInView(achievementsRef, { once: true, amount: 0.3 });
  const isExpertiseInView = useInView(expertiseRef, { once: true, amount: 0.2 });
  const isStoryInView = useInView(storyRef, { once: true, amount: 0.2 });
  const isValuesInView = useInView(valuesRef, { once: true, amount: 0.2 });

  if (!content) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-card p-8 text-center max-w-xl mx-auto">
          <p className="text-light-text-secondary dark:text-muted-steel">
            About content is not available.
          </p>
        </div>
      </div>
    );
  }

  const { metadata } = content;
  const title = metadata?.title || 'About Me';
  const image = metadata?.image;
  const skills = metadata?.skills || [];
  const skillsArray = typeof skills === 'string'
    ? skills.split(',').map(skill => skill.trim())
    : Array.isArray(skills) ? skills : [];
  const highlights = metadata?.highlights || [];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-16 md:py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-20" />
          <Floating intensity={20} duration={6}>
            <div className="absolute top-1/4 -left-32 w-64 h-64 bg-plasma-purple/10 rounded-full filter blur-[100px]" />
          </Floating>
          <Floating intensity={15} duration={8} delay={2}>
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neural-blue/5 rounded-full filter blur-[128px]" />
          </Floating>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-plasma-purple/10 text-plasma-purple text-sm font-mono mb-6 border border-plasma-purple/20">
                {'// Software Engineer & Computational Scientist'}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-light-text dark:text-ghost-white mb-6">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neural-blue to-synapse-cyan">
                  Digin
                </span>
              </h1>

              <p className="text-xl text-light-text-secondary dark:text-muted-steel mb-4 leading-relaxed">
                At the University of Edinburgh, I build end-to-end computational systems that enable researchers to analyse, visualise, and interpret complex biological imaging and genomic data at scale.
              </p>

              <p className="text-base text-light-text-secondary dark:text-muted-steel mb-6 leading-relaxed">
                My work sits at the intersection of scientific research, large-scale data processing, and modern web technologies—transforming raw microscopy data into accessible, interactive applications.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                {metadata?.location && (
                  <span className="inline-flex items-center gap-2 text-muted-steel">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-neural-blue" />
                    {metadata.location}
                  </span>
                )}
                {metadata?.languages && (
                  <span className="inline-flex items-center gap-2 text-muted-steel">
                    <FontAwesomeIcon icon={faLanguage} className="text-neural-blue" />
                    {metadata.languages}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                  <FontAwesomeIcon icon={faEnvelope} />
                  Get In Touch
                </Link>
                <a
                  href="https://github.com/digin1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faGithub} />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/digin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                  LinkedIn
                </a>
              </div>
            </motion.div>

            {/* Profile Image */}
            {image && (
              <motion.div
                className="flex justify-center lg:justify-end"
                initial={{ opacity: 0, x: 30 }}
                animate={isHeroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <MouseParallax sensitivity={0.02}>
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-2 rounded-2xl"
                      style={{
                        background: 'linear-gradient(45deg, #8B5CF6, #3B82F6, #06B6D4, #8B5CF6)',
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
                    <div className="absolute -inset-1 bg-gradient-to-r from-plasma-purple to-neural-blue rounded-2xl blur-lg opacity-40" />
                    <img
                      src={image}
                      alt={metadata?.name || 'Profile'}
                      className="relative rounded-2xl w-80 h-96 object-cover border-2 border-white/10"
                    />
                    <Floating intensity={5} duration={4}>
                      <div className="absolute -bottom-4 -right-4 w-20 h-20 border-2 border-plasma-purple/30 rounded-xl" />
                    </Floating>
                    <Floating intensity={5} duration={5} delay={1}>
                      <div className="absolute -top-4 -left-4 w-14 h-14 border-2 border-neural-blue/30 rounded-xl" />
                    </Floating>
                  </div>
                </MouseParallax>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Key Achievements Section */}
      {highlights.length > 0 && (
        <section ref={achievementsRef} className="py-12 md:py-16 bg-light-surface/50 dark:bg-midnight-steel/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isAchievementsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-synapse-cyan/10 text-synapse-cyan text-sm font-mono mb-4 border border-synapse-cyan/20">
                {'// Key Highlights'}
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-light-text dark:text-ghost-white">
                Career Achievements
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
              {highlights.map((highlight, index) => (
                <AchievementCard key={index} achievement={highlight} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Expertise Areas Section */}
      <section ref={expertiseRef} className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isExpertiseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-neural-blue/10 text-neural-blue text-sm font-mono mb-4 border border-neural-blue/20">
              {'// Areas of Expertise'}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-light-text dark:text-ghost-white mb-4">
              What I Specialize In
            </h2>
            <p className="text-light-text-secondary dark:text-muted-steel max-w-2xl mx-auto">
              From research tools to infrastructure, I bring a unique combination of skills that spans the full stack
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseAreas.map((area, index) => (
              <ExpertiseCard key={area.title} area={area} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section ref={storyRef} className="py-16 md:py-24 bg-light-surface/50 dark:bg-midnight-steel/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isStoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-neural-blue/10 text-neural-blue text-sm font-mono mb-4 border border-neural-blue/20">
                {'// My Journey'}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-light-text dark:text-ghost-white">
                The Full Story
              </h2>
            </div>

            {content.content && (
              <motion.div
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-display prose-headings:text-light-text dark:prose-headings:text-ghost-white prose-p:text-light-text-secondary dark:prose-p:text-muted-steel prose-a:text-neural-blue prose-strong:text-light-text dark:prose-strong:text-ghost-white prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-code:text-synapse-cyan prose-code:bg-transparent prose-pre:bg-slate-800 prose-pre:text-slate-200"
                dangerouslySetInnerHTML={{ __html: content.content }}
                initial={{ opacity: 0 }}
                animate={isStoryInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
            )}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-signal-green/10 text-signal-green text-sm font-mono mb-4 border border-signal-green/20">
              {'// What Sets Me Apart'}
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-light-text dark:text-ghost-white mb-4">
              My Approach
            </h2>
            <p className="text-light-text-secondary dark:text-muted-steel max-w-2xl mx-auto">
              I enjoy solving hard, messy problems where data, computation, and usability intersect
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <ValueCard key={value.title} value={value} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Video Section */}
      <section className="py-16 md:py-24 bg-light-surface/50 dark:bg-midnight-steel/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Skills */}
            {skillsArray.length > 0 && (
              <motion.div
                className="glass-card p-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-display font-semibold mb-6 text-light-text dark:text-ghost-white flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-signal-green" />
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillsArray.map((skill, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1.5 text-sm font-mono rounded-lg bg-neural-blue/10 text-neural-blue border border-neural-blue/20 hover:bg-neural-blue/20 hover:scale-105 transition-all cursor-default"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.02 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* YouTube Video */}
            {metadata?.youtubeId && (
              <motion.div
                className="glass-card p-8"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-display font-semibold mb-6 text-light-text dark:text-ghost-white flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-synapse-cyan" />
                  {metadata?.youtubeTitle || 'Featured Video'}
                </h3>
                <YouTubeVideo
                  videoId={metadata.youtubeId}
                  title={metadata?.youtubeTitle || 'Featured Video'}
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-light-text dark:text-ghost-white mb-6">
              Let's Build Something{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neural-blue to-synapse-cyan">
                Impactful Together
              </span>
            </h2>
            <p className="text-lg text-light-text-secondary dark:text-muted-steel mb-8">
              Whether you need research tools, data visualizations, scientific pipelines, or modern web applications—I'd love to hear about your project and explore how we can collaborate.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                Start a Conversation
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <Link href="/projects" className="btn-secondary inline-flex items-center gap-2">
                View My Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
