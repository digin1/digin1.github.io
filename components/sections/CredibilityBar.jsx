'use client';

import { motion } from 'framer-motion';

export default function CredibilityBar({
  yearsExperience = 8,
  projectCount = 29,
}) {
  const proofItems = [
    {
      label: 'Research setting',
      title: 'University of Edinburgh',
      detail: 'Genes to Cognition Programme / SIDB',
    },
    {
      label: 'Published work',
      title: 'Scientific Reports',
      detail: 'Co-first author on SynaptopathyDB',
    },
    {
      label: 'Working style',
      title: 'Systems to interfaces',
      detail: 'Infrastructure, data workflows, and visualisation',
    },
    {
      label: 'Body of work',
      title: `${projectCount}+ documented projects`,
      detail: `${yearsExperience}+ years across hosting, security, and research engineering`,
    },
  ];

  return (
    <motion.section
      className="border-b border-light-border/70 py-6 dark:border-zinc-800"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-2 xl:grid-cols-4">
          {proofItems.map((item) => (
            <div key={item.label} className="proof-chip">
              <p className="meta-label">{item.label}</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-light-text dark:text-ghost-white">
                {item.title}
              </p>
              <p className="mt-1 text-sm leading-6 text-light-text-secondary dark:text-muted-steel">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
