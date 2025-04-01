import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faReact, faJs, faNodeJs, faHtml5, faCss3Alt, faPython, 
  faDocker, faAws, faGitAlt, faGithub, faGitlab, faLinux, faBootstrap
} from '@fortawesome/free-brands-svg-icons';
import { 
  faDatabase, faServer, faChartBar, faBrain, faCode, 
  faNetworkWired, faCog, faTools, faTable, 
  faLaptopCode, faChartLine, faEye,  
  faCloudUploadAlt, faLayerGroup
} from '@fortawesome/free-solid-svg-icons';

// Define skill categories
const SKILL_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'devops', label: 'DevOps' },
  { id: 'datascience', label: 'Data Science' },
  { id: 'tools', label: 'Tools & IDEs' }
];

// Map your skills from GitHub issue to structured data with icons
const SKILLS_DATA = [
  // Frontend
  {
    name: 'React',
    icon: faReact,
    level: 95,
    experience: '4+ years',
    categories: ['frontend']
  },
  {
    name: 'JavaScript',
    icon: faJs,
    level: 90,
    experience: '5+ years',
    categories: ['frontend', 'backend']
  },
  {
    name: 'HTML5',
    icon: faHtml5,
    level: 100,
    experience: '6+ years',
    categories: ['frontend']
  },
  {
    name: 'CSS3',
    icon: faCss3Alt,
    level: 90,
    experience: '6+ years',
    categories: ['frontend']
  },
  {
    name: 'Bootstrap',
    icon: faBootstrap,
    level: 95,
    experience: '5+ years',
    categories: ['frontend']
  },
  {
    name: 'Three.js',
    icon: faLaptopCode,
    level: 85,
    experience: '3+ years',
    categories: ['frontend']
  },
  {
    name: 'Chart.js',
    icon: faChartBar,
    level: 90,
    experience: '4+ years',
    categories: ['frontend']
  },
  {
    name: 'WebGL',
    icon: faLaptopCode,
    level: 80,
    experience: '3+ years',
    categories: ['frontend']
  },

  // Backend
  {
    name: 'Node.js',
    icon: faNodeJs,
    level: 85,
    experience: '4+ years',
    categories: ['backend']
  },
  {
    name: 'Python',
    icon: faPython,
    level: 95,
    experience: '5+ years',
    categories: ['backend', 'datascience']
  },
  {
    name: 'Flask',
    icon: faCode,
    level: 90,
    experience: '4+ years',
    categories: ['backend']
  },
  {
    name: 'MongoDB',
    icon: faDatabase,
    level: 80,
    experience: '3+ years',
    categories: ['backend']
  },
  {
    name: 'SQLite',
    icon: faDatabase,
    level: 85,
    experience: '4+ years',
    categories: ['backend']
  },
  {
    name: 'PostgreSQL',
    icon: faDatabase,
    level: 85,
    experience: '4+ years',
    categories: ['backend']
  },
  {
    name: 'Celery',
    icon: faLayerGroup,
    level: 85,
    experience: '3+ years',
    categories: ['backend']
  },

  // DevOps
  {
    name: 'Docker',
    icon: faDocker,
    level: 90,
    experience: '4+ years',
    categories: ['devops']
  },
  {
    name: 'AWS',
    icon: faAws,
    level: 85,
    experience: '3+ years',
    categories: ['devops']
  },
  {
    name: 'Git',
    icon: faGitAlt,
    level: 95,
    experience: '5+ years',
    categories: ['devops']
  },
  {
    name: 'GitHub',
    icon: faGithub,
    level: 95,
    experience: '5+ years',
    categories: ['devops']
  },
  {
    name: 'GitLab CI',
    icon: faGitlab,
    level: 85,
    experience: '3+ years',
    categories: ['devops']
  },
  {
    name: 'Linux/Ubuntu',
    icon: faLinux,
    level: 90,
    experience: '5+ years',
    categories: ['devops']
  },
  {
    name: 'Ansible',
    icon: faCog,
    level: 85,
    experience: '3+ years',
    categories: ['devops']
  },
  {
    name: 'Prometheus',
    icon: faChartLine,
    level: 80,
    experience: '2+ years',
    categories: ['devops']
  },
  {
    name: 'Grafana',
    icon: faChartBar,
    level: 80,
    experience: '2+ years',
    categories: ['devops']
  },
  {
    name: 'OpenVZ',
    icon: faServer,
    level: 75,
    experience: '2+ years',
    categories: ['devops']
  },
  {
    name: 'KVM',
    icon: faServer,
    level: 75,
    experience: '2+ years',
    categories: ['devops']
  },
  {
    name: 'Xen',
    icon: faServer,
    level: 70,
    experience: '2+ years',
    categories: ['devops']
  },
  {
    name: 'Nagios',
    icon: faNetworkWired,
    level: 75,
    experience: '2+ years',
    categories: ['devops']
  },
  {
    name: 'rclone',
    icon: faCloudUploadAlt,
    level: 85,
    experience: '3+ years',
    categories: ['devops']
  },

  // Data Science
  {
    name: 'TensorFlow',
    icon: faBrain,
    level: 80,
    experience: '3+ years',
    categories: ['datascience']
  },
  {
    name: 'PyTorch',
    icon: faBrain,
    level: 85,
    experience: '3+ years',
    categories: ['datascience']
  },
  {
    name: 'OpenCV',
    icon: faEye,
    level: 90,
    experience: '4+ years',
    categories: ['datascience']
  },
  {
    name: 'MATLAB',
    icon: faTable,
    level: 85,
    experience: '3+ years',
    categories: ['datascience']
  },
  {
    name: 'Dask',
    icon: faLayerGroup,
    level: 80,
    experience: '2+ years',
    categories: ['datascience']
  },
  {
    name: 'RadiantKit',
    icon: faChartLine,
    level: 75,
    experience: '2+ years',
    categories: ['datascience']
  },
  
  // Tools
  {
    name: 'VSCode',
    icon: faCode,
    level: 95,
    experience: '5+ years',
    categories: ['tools']
  }
];

// No custom icons needed anymore

const Toolkit = ({ content }) => {
  console.log("Rendering Toolkit component");
  // State for active category filter
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Filter skills based on active category
  const filteredSkills = SKILLS_DATA.filter(skill => {
    return activeCategory === 'all' || skill.categories.includes(activeCategory);
  });

  // Apply animation when category changes
  useEffect(() => {
    console.log(`Category changed to: ${activeCategory}`);
    console.log(`Number of skills: ${filteredSkills.length}`);
    // No additional logic needed - animation handled by CSS directly
  }, [activeCategory, filteredSkills]);

  return (
    <section className="section-alt py-16" id="toolkit">
      <div className="container mx-auto px-4 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full -ml-40 -mb-40"></div>
        
        <div className="section-header text-center mb-12 relative z-10">
          <span className="subtitle mb-3">My Expertise</span>
          <h2 className="title mb-4">Tech <span>Toolkit</span></h2>
          <p className="description mx-auto">
            The technologies and tools I use to build powerful, scalable, and efficient applications
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {SKILL_CATEGORIES.map(category => {
            // Count skills in this category for the badge
            const count = category.id === 'all' 
              ? SKILLS_DATA.length 
              : SKILLS_DATA.filter(skill => skill.categories.includes(category.id)).length;
              
            return (
              <button
                key={category.id}
                className={`category-btn relative ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full inline-flex items-center justify-center ${
                  activeCategory === category.id 
                    ? 'bg-white text-primary' 
                    : 'bg-gray-100 text-text-light'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => (
            <div 
              key={skill.name} 
              className="skill-card group animate-fadeInUp"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="skill-icon text-primary group-hover:text-white transition-colors duration-300">
                  <FontAwesomeIcon icon={skill.icon} />
                </div>
                <h3 className="skill-name group-hover:text-white transition-colors duration-300">{skill.name}</h3>
                <div className="skill-level mt-auto">
                  <div className="skill-level-bar">
                    <div 
                      className="skill-level-progress bg-primary group-hover:bg-white transition-colors duration-300" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <div className="skill-experience group-hover:text-white/80 transition-colors duration-300">
                    {skill.experience}
                  </div>
                </div>
              </div>
              
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-90 transition-opacity duration-300 rounded-lg -z-0"></div>
            </div>
          ))}
        </div>
        
        {filteredSkills.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="bg-light p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <FontAwesomeIcon icon={faTools} className="text-primary/60 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-dark">No skills in this category</h3>
            <p className="text-text-light max-w-md mx-auto">Try selecting a different category to see my skills.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Toolkit;