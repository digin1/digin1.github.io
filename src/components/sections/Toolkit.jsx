import React, { useState} from 'react';
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

  // Skill Tag Component - Shows tooltip on hover
const SkillTag = ({ skill }) => {
  // Calculate level description based on skill level
  const getLevelDescription = (level) => {
    if (level >= 90) return "Expert";
    if (level >= 80) return "Advanced";
    if (level >= 70) return "Proficient";
    if (level >= 50) return "Intermediate";
    return "Beginner";
  };

  return (
    <div className="group relative px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition-all">
      {/* Static visible content */}
      <div className="flex items-center">
        <div className="text-primary text-lg">
          <FontAwesomeIcon icon={skill.icon} />
        </div>
        <span className="ml-2 font-medium text-sm">{skill.name}</span>
      </div>
      
      {/* Tooltip that appears on hover */}
      <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute z-20 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 text-sm">
          <div className="flex items-center mb-2">
            <div className="text-primary text-lg">
              <FontAwesomeIcon icon={skill.icon} />
            </div>
            <span className="ml-2 font-semibold">{skill.name}</span>
          </div>
          
          <div className="mb-2 flex justify-between">
            <span className="text-gray-600 text-xs">{skill.experience}</span>
            <span className="text-primary text-xs font-medium">{getLevelDescription(skill.level)}</span>
          </div>
          
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" 
              style={{ width: `${skill.level}%` }}
            ></div>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {skill.categories.map(category => (
              <span 
                key={category} 
                className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {category}
              </span>
            ))}
          </div>
          
          {/* Arrow pointing down */}
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

// Modal removed - using tooltips instead

const Toolkit = ({ content }) => {
  // State for active category filter
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Filter skills based on active category only
  const filteredSkills = SKILLS_DATA.filter(skill => {
    return activeCategory === 'all' || skill.categories.includes(activeCategory);
  });

  // Group skills by categories for better organization (when showing all)
  const groupedSkills = () => {
    if (activeCategory !== 'all') {
      return { 'Filtered Skills': filteredSkills };
    }
    
    const groups = {};
    SKILL_CATEGORIES.forEach(category => {
      if (category.id !== 'all') {
        const categorySkills = SKILLS_DATA.filter(skill => 
          skill.categories.includes(category.id)
        );
        if (categorySkills.length > 0) {
          groups[category.label] = categorySkills;
        }
      }
    });
    return groups;
  };

  // No longer need to handle skill clicks since we're using tooltips

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
        
        <div className="flex justify-center mb-8">
          {/* Category selector - horizontal scrollable on mobile */}
          <div className="flex overflow-x-auto pb-2 max-w-full">
            <div className="flex flex-wrap gap-2 justify-center">
              {SKILL_CATEGORIES.map(category => {
                const count = category.id === 'all' 
                  ? SKILLS_DATA.length 
                  : SKILLS_DATA.filter(skill => skill.categories.includes(category.id)).length;
                  
                return (
                  <button
                    key={category.id}
                    className={`category-btn whitespace-nowrap ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.label}
                    <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full inline-flex items-center justify-center ${
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
          </div>
        </div>
        
        {/* Skills List - Now grouped by category when showing all */}
        {Object.entries(groupedSkills()).map(([groupTitle, skills]) => (
          <div key={groupTitle} className="mb-8">
            {/* Only show group title if there are multiple groups */}
            {Object.keys(groupedSkills()).length > 1 && (
              <h3 className="text-lg font-medium text-gray-700 mb-3 border-b border-gray-200 pb-2">
                {groupTitle}
              </h3>
            )}
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {skills.map(skill => (
                <SkillTag 
                  key={skill.name} 
                  skill={skill}
                />
              ))}
            </div>
          </div>
        ))}
        
        {filteredSkills.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="bg-light p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <FontAwesomeIcon icon={faTools} className="text-primary/60 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-dark">No skills match your criteria</h3>
            <p className="text-text-light max-w-md mx-auto">
              Try selecting a different category or adjusting your search term.
            </p>
          </div>
        )}
        
        {/* Removed modal, using tooltips instead */}
      </div>
    </section>
  );
};

export default Toolkit;