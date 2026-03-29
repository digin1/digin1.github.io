'use client';

import { motion } from 'framer-motion';

const capabilityGroups = [
  {
    title: 'Research platforms',
    description: 'Web-based systems that turn scientific data, literature, and domain knowledge into usable interfaces for researchers.',
    tags: ['Flask', 'React', 'Search interfaces', 'APIs'],
  },
  {
    title: 'Scientific visualisation',
    description: 'Browser-based visual tools for exploring large synapse datasets, region heatmaps, and microscopy overlays.',
    tags: ['Three.js', 'WebGL', 'Data visualisation', 'Interactive analysis'],
  },
  {
    title: 'Microscopy workflows',
    description: 'Format conversion, segmentation, ROI tooling, and image-processing pipelines built for real research environments.',
    tags: ['Python', 'ND2/CZI/TIFF', 'nnU-Net', 'Batch tooling'],
  },
  {
    title: 'Infrastructure and operations',
    description: 'Linux, deployment, orchestration, and systems thinking applied to long-running research services and compute workflows.',
    tags: ['Docker Swarm', 'Linux', 'Dask', 'Monitoring'],
  },
];

export default function CapabilityMatrix() {
  return (
    <section className="section border-t border-light-border/70 dark:border-zinc-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
          >
            <span className="eyebrow mb-4">Capability matrix</span>
            <h2 className="section-title max-w-[13ch] text-left">
              The work spans more than a stack list.
            </h2>
            <p className="description text-left">
              The strongest differentiator here is not familiarity with individual technologies. It is the ability to connect research needs, systems, pipelines, and interfaces into usable software.
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2">
            {capabilityGroups.map((group, index) => (
              <motion.article
                key={group.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="editorial-card p-5 sm:p-6"
              >
                <p className="meta-label">Capability</p>
                <h3 className="mt-3 text-[1.45rem] font-display font-bold tracking-tight text-light-text dark:text-ghost-white">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-light-text-secondary dark:text-muted-steel">
                  {group.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
