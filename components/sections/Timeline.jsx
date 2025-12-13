'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faGraduationCap, faCode, faFlask, faBriefcase } from '@fortawesome/free-solid-svg-icons';

// Milestones in reverse chronological order (most recent first)
const milestones = [
  {
    year: '2022-Present',
    title: 'System Engineer & Web Developer',
    company: 'University of Edinburgh',
    location: 'Edinburgh, Scotland',
    description: 'Building research tools that bridge science and software. From high-performance image segmentation apps to interactive 3D brain atlases, creating solutions that turn complex neuroscience data into accessible applications.',
    icon: faFlask,
    skills: ['React', 'Python', 'Three.js', 'Flask', 'PostgreSQL', 'Docker'],
    highlight: 'Grant Lab - Neuroscience Research',
    current: true,
  },
  {
    year: '2022',
    title: 'Junior C# Developer',
    company: 'U2A Solutions',
    location: 'UK',
    description: 'Brief but valuable experience in enterprise software development, gaining exposure to .NET ecosystem and professional software engineering practices.',
    icon: faCode,
    skills: ['C#', '.NET', 'SQL Server', 'Agile'],
    highlight: 'Enterprise software development',
  },
  {
    year: '2021-2022',
    title: 'PHP Developer',
    company: 'Veeble Hosting',
    location: 'Remote',
    description: 'Developed internal tools and customer-facing applications while pursuing my Masters. Balanced full-time studies with professional development work.',
    icon: faBriefcase,
    skills: ['PHP', 'MySQL', 'Laravel', 'WordPress'],
    highlight: 'Concurrent with Masters degree',
  },
  {
    year: '2021-2022',
    title: 'Masters in IT Security',
    company: 'Nottingham Trent University',
    location: 'Nottingham, UK',
    description: 'Expanded my knowledge into cybersecurity, cryptography, and secure software development. A pivotal step toward a more specialized career.',
    icon: faGraduationCap,
    skills: ['Security', 'Cryptography', 'Python', 'Research'],
    highlight: 'Graduated with Merit',
  },
  {
    year: '2016-2021',
    title: 'Linux System Administrator',
    company: 'Veeble Hosting',
    location: 'Kerala, India',
    description: 'Started my tech journey managing Linux servers, automation, and infrastructure. Built the foundation for understanding complex systems at scale.',
    icon: faServer,
    skills: ['Linux', 'Bash', 'Ansible', 'Docker', 'Monitoring'],
    highlight: '5 years of hands-on DevOps experience',
  },
];

function TimelineItem({ milestone, index, isLeft }) {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={itemRef}
      className={`relative flex items-center gap-8 mb-12 md:mb-16 ${
        isLeft ? 'md:flex-row-reverse' : ''
      }`}
      initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? 50 : -50 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Content Card */}
      <div className={`flex-1 ${isLeft ? 'md:text-right' : ''}`}>
        <div
          className={`relative p-6 md:p-8 liquid-glass hover-card group ${
            milestone.current ? 'shadow-glass-glow' : ''
          }`}
        >
          {/* Current Badge - inside the card */}
          {milestone.current && (
            <div className={`mb-4 ${isLeft ? 'md:text-right' : ''}`}>
              <span className="inline-block px-4 py-1.5 text-xs font-mono bg-gradient-to-r from-neural-blue to-synapse-cyan text-white rounded-full shadow-glow-blue">
                ✦ Current Role
              </span>
            </div>
          )}

          {/* Year Badge */}
          <span className="inline-block px-3 py-1 text-sm font-mono bg-neural-blue/10 text-neural-blue rounded-full mb-4">
            {milestone.year}
          </span>

          {/* Title & Company */}
          <h3 className="text-xl md:text-2xl font-display font-bold text-light-text dark:text-ghost-white mb-2">
            {milestone.title}
          </h3>
          <p className="text-neural-blue font-medium mb-1">{milestone.company}</p>
          <p className="text-sm text-light-text-secondary dark:text-muted-steel mb-4">
            {milestone.location}
          </p>

          {/* Description */}
          <p className="text-light-text-secondary dark:text-muted-steel mb-4 leading-relaxed">
            {milestone.description}
          </p>

          {/* Highlight */}
          <p className="text-sm font-medium text-synapse-cyan mb-4">
            {milestone.highlight}
          </p>

          {/* Skills */}
          <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
            {milestone.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs font-mono bg-light-border dark:bg-slate-700/50 text-light-text-secondary dark:text-muted-steel rounded"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Decorative corner */}
          <div
            className={`absolute -bottom-2 ${
              isLeft ? '-left-2' : '-right-2'
            } w-12 h-12 border-2 border-neural-blue/10 rounded-xl -rotate-12 group-hover:rotate-0 transition-transform duration-500`}
          />
        </div>
      </div>

      {/* Center Icon (Desktop) */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          className={`w-14 h-14 rounded-full flex items-center justify-center ${
            milestone.current
              ? 'bg-gradient-to-br from-neural-blue to-synapse-cyan text-white'
              : 'bg-light-surface dark:bg-midnight-steel border-2 border-neural-blue/30 text-neural-blue'
          }`}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <FontAwesomeIcon icon={milestone.icon} className="w-6 h-6" />
        </motion.div>
      </div>

      {/* Spacer for alternating layout */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

export default function Timeline({ className = '' }) {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className={`relative py-24 md:py-32 overflow-hidden ${className}`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-neural-blue/15 dark:bg-neural-blue/5 rounded-full filter blur-[80px]" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-plasma-purple/15 dark:bg-plasma-purple/5 rounded-full filter blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-plasma-purple/10 text-plasma-purple text-sm font-mono mb-4 border border-plasma-purple/20">
            {'// Career Journey'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-light-text dark:text-ghost-white mb-4">
            From <span className="text-transparent bg-clip-text bg-gradient-to-r from-neural-blue to-plasma-purple">India to Edinburgh</span>
          </h2>
          <p className="text-lg text-light-text-secondary dark:text-muted-steel max-w-2xl mx-auto">
            A decade of growth, learning, and building—tracing back through roles that shaped who I am today
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Center Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-light-border dark:bg-slate-700/50 -translate-x-1/2">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-neural-blue to-synapse-cyan"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Mobile Line */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-px bg-light-border dark:bg-slate-700/50">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-neural-blue to-synapse-cyan"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline Items */}
          <div className="relative">
            {milestones.map((milestone, index) => (
              <TimelineItem
                key={index}
                milestone={milestone}
                index={index}
                isLeft={index % 2 === 1}
              />
            ))}
          </div>

          {/* End Marker */}
          <motion.div
            className="hidden md:flex justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-neural-blue to-synapse-cyan animate-pulse" />
          </motion.div>
        </div>

        {/* Origin Section */}
        <motion.div
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-light-text-secondary dark:text-muted-steel mb-2">
            Where it all began...
          </p>
          <p className="text-lg font-medium text-neural-blue">
            Every expert was once a beginner
          </p>
        </motion.div>
      </div>
    </section>
  );
}
