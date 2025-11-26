'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import * as brandIcons from '@fortawesome/free-brands-svg-icons';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

function SkillTag({ skill }) {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = (iconName) => {
    if (brandIcons[iconName]) return brandIcons[iconName];
    if (solidIcons[iconName]) return solidIcons[iconName];
    return solidIcons.faCode;
  };

  const icon = getIcon(skill.icon);

  return (
    <motion.div
      className="relative group"
      variants={staggerItem}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative px-4 py-3 rounded-lg bg-light-surface dark:bg-midnight-steel/50 border border-light-border dark:border-slate-700/50 cursor-pointer overflow-hidden"
        whileHover={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.3)' }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-neural-blue/5 to-synapse-cyan/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="flex items-center gap-3 relative z-10">
          <div className="text-neural-blue text-lg flex-shrink-0">
            <FontAwesomeIcon icon={icon} />
          </div>
          <span className="font-medium text-sm text-light-text dark:text-ghost-white truncate">
            {skill.name}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Toolkit({ content }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([{ id: 'all', label: 'All' }]);

  useEffect(() => {
    if (content?.metadata?.skills) {
      setSkills(content.metadata.skills);

      const uniqueCategories = new Set(['all']);
      content.metadata.skills.forEach(skill => {
        skill.categories?.forEach(cat => uniqueCategories.add(cat));
      });

      const categoryArray = Array.from(uniqueCategories).map(cat => ({
        id: cat,
        label: cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)
      }));

      setCategories(categoryArray);
    }
  }, [content]);

  const filteredSkills = skills.filter(skill => {
    return activeCategory === 'all' || skill.categories?.includes(activeCategory);
  });

  if (!content || skills.length === 0) {
    return null;
  }

  return (
    <section className="section relative overflow-hidden" id="toolkit">
      <div className="absolute top-1/3 -right-64 w-96 h-96 bg-synapse-cyan/5 rounded-full filter blur-[100px]" />
      <div className="absolute bottom-1/3 -left-64 w-96 h-96 bg-plasma-purple/5 rounded-full filter blur-[100px]" />

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
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-2 justify-center p-2 rounded-xl bg-light-surface dark:bg-midnight-steel/30 border border-light-border dark:border-slate-700/50">
            {categories.map(category => {
              const count = category.id === 'all'
                ? skills.length
                : skills.filter(skill => skill.categories?.includes(category.id)).length;

              return (
                <motion.button
                  key={category.id}
                  className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'text-white'
                      : 'text-light-text-secondary dark:text-muted-steel hover:text-light-text dark:hover:text-ghost-white'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeCategory === category.id && (
                    <motion.div
                      layoutId="toolkit-category-bg"
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-neural-blue to-synapse-cyan"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {category.label}
                    <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                      activeCategory === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-light-border dark:bg-slate-700/50 text-light-text-secondary dark:text-muted-steel'
                    }`}>
                      {count}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {filteredSkills.map((skill) => (
              <SkillTag key={skill.name} skill={skill} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
