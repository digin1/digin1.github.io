'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

// Lazy load Three.js component
const TechSphere = lazy(() => import('@/components/three/TechSphere'));

export default function Toolkit({ content }) {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (content?.metadata?.skills) {
      setSkills(content.metadata.skills);
    }
  }, [content]);

  if (!content || skills.length === 0) {
    return null;
  }

  return (
    <section className="section relative overflow-x-clip overflow-y-visible" id="toolkit">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 -right-64 w-96 h-96 bg-synapse-cyan/10 dark:bg-synapse-cyan/5 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-1/3 -left-64 w-96 h-96 bg-plasma-purple/10 dark:bg-plasma-purple/5 rounded-full filter blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-synapse-cyan/10 text-synapse-cyan text-sm font-mono mb-4 border border-synapse-cyan/20">
            {'// My Expertise'}
          </span>
          <h2 className="section-title">
            Tech <span>Toolkit</span>
          </h2>
          <p className="description mx-auto text-center">
            {content?.metadata?.description || 'The technologies and tools I use to build powerful, scalable applications'}
          </p>
          <p className="text-sm text-muted-steel mt-2 text-center">
            Drag to rotate • Hover for details
          </p>
        </motion.div>

        {/* 3D Tech Sphere */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Suspense fallback={
            <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center">
              <div className="text-muted-steel">Loading 3D sphere...</div>
            </div>
          }>
            <TechSphere skills={skills} />
          </Suspense>
        </motion.div>

      </div>
    </section>
  );
}
