'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const roles = [
  {
    id: 'edinburgh',
    company: 'University of Edinburgh',
    title: 'Software Engineer & Research Toolsmith',
    period: '2022 — Present',
    bullets: [
      'Building scientific software for the Seth Grant Lab (Genes to Cognition / SIDB)',
      'Co-first author on SynaptopathyDB in Scientific Reports (Nature Portfolio)',
      'Created 3D visualisation tools rendering billions of synapse data points in the browser',
      'Built microscopy format converters, segmentation editors, and Docker Swarm infrastructure',
    ],
  },
  {
    id: 'u2a',
    company: 'U2A Solutions',
    title: 'Junior C# Developer',
    period: '2022',
    bullets: [
      'Enterprise .NET development and professional software engineering practices',
    ],
  },
  {
    id: 'ntu',
    company: 'Nottingham Trent University',
    title: 'MSc Cyber Security',
    period: '2021 — 2022',
    bullets: [
      'Awarded Best Project for dissertation research',
      'Focus on secure software development, cryptography, and data protection',
    ],
  },
  {
    id: 'veeble',
    company: 'Veeble Hosting',
    title: 'Linux System Administrator & PHP Developer',
    period: '2016 — 2022',
    bullets: [
      'Go-to systems engineer for DNS, email deliverability, DDoS mitigation, SSL, and cPanel/WHM',
      'Built internal tools and customer-facing applications',
      'Still consulting as an advisor for complex infrastructure issues',
    ],
  },
];

export default function Timeline({ className = '' }) {
  const [activeId, setActiveId] = useState('edinburgh');
  const active = roles.find(r => r.id === activeId) || roles[0];

  return (
    <section id="experience" className={`py-16 md:py-20 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="mb-8"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">Experience</p>
            <h2 className="text-section-heading font-display font-bold text-light-text dark:text-ghost-white">
              Where I&apos;ve worked
            </h2>
          </motion.div>

          <div className="grid gap-0 md:grid-cols-[200px_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,1fr)]">
            {/* Tab list */}
            <div role="tablist" aria-label="Work experience" className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 pb-2 md:pb-0 md:pr-0">
              {roles.map(role => (
                <button
                  key={role.id}
                  role="tab"
                  aria-selected={activeId === role.id}
                  aria-controls={`tabpanel-${role.id}`}
                  onClick={() => setActiveId(role.id)}
                  className={`text-left whitespace-nowrap px-4 py-2.5 text-sm font-medium rounded-md md:rounded-none md:rounded-l-md transition-colors shrink-0 ${
                    activeId === role.id
                      ? 'text-neural-blue bg-neural-blue/10 md:border-r-2 md:border-neural-blue'
                      : 'text-zinc-500 hover:text-light-text dark:hover:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                  }`}
                >
                  {role.company}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div role="tabpanel" id={`tabpanel-${active.id}`} className="min-h-[200px] pt-4 md:pt-0 md:pl-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-bold text-light-text dark:text-ghost-white">
                    {active.title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">{active.period}</p>

                  <ul className="mt-5 space-y-3">
                    {active.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm leading-6 text-light-text-secondary dark:text-zinc-400">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neural-blue" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
