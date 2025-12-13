'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faCode, faChartLine, faUsers } from '@fortawesome/free-solid-svg-icons';
import ProjectCard from './ProjectCard';

/**
 * Card displaying project stats with animated counters
 */
export default function StatsCard({
  stats = [],
  role,
  duration,
  delay = 0,
}) {
  const iconMap = {
    clock: faClock,
    code: faCode,
    chart: faChartLine,
    users: faUsers,
  };

  // Combine role/duration with extracted stats
  const allStats = [];

  if (role) {
    allStats.push({ value: role, label: 'Role', icon: 'users' });
  }
  if (duration) {
    allStats.push({ value: duration, label: 'Duration', icon: 'clock' });
  }

  allStats.push(...stats);

  if (allStats.length === 0) return null;

  return (
    <ProjectCard
      size="small"
      expandable={false}
      delay={delay}
    >
      {/* Header */}
      <div className="mb-3">
        <span className="text-xs font-mono text-plasma-purple uppercase tracking-wider">
          Project Info
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-3">
        {allStats.slice(0, 4).map((stat, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay * 0.1 + index * 0.1 }}
          >
            <div className="w-8 h-8 rounded-lg bg-plasma-purple/10 flex items-center justify-center flex-shrink-0">
              <FontAwesomeIcon
                icon={iconMap[stat.icon] || faChartLine}
                className="w-4 h-4 text-plasma-purple"
              />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-light-text dark:text-ghost-white truncate">
                {stat.value}
              </div>
              <div className="text-xs text-light-text-secondary dark:text-muted-steel">
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </ProjectCard>
  );
}
