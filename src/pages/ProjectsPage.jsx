// src/pages/ProjectsPage.jsx (Shows all projects with tag filtering)
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useGithubIssues from '../hooks/useGithubIssues';
import { parseCustomDate, formatDateAsDDMMYYYY } from '../utils/dateUtils';

const ProjectCard = ({ project }) => {
  const issueNumber = project.number;
  
  return (
    <Link to={`/projects/${issueNumber}`} className="block">
      <div className="project-card group h-full">
        {project.metadata?.image && (
          <div className="relative mb-6 overflow-hidden rounded-lg">
            <img 
              src={project.metadata.image} 
              alt={project.title} 
              className="w-full h-48 object-cover object-center transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
        )}
        
        <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-gray-700 transition-colors">
          {project.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.labels && project.labels.map(label => (
            label.name !== 'project' && (
              <span 
                key={label.id} 
                className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 border border-gray-200"
              >
                {label.name}
              </span>
            )
          ))}
        </div>
        
        {project.metadata?.tag && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.metadata.tag.split(',').map((tag, index) => (
              <span 
                key={index} 
                className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 border border-blue-200"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
        
        <p className="text-gray-600 mb-4">
          {project.metadata?.summary || project.metadata?.description || 
            (project.rawContent && project.rawContent.substring(0, 120) + '...')}
        </p>
        
        {project.metadata?.date && (
          <p className="text-sm text-gray-500 mb-3">
            {formatDateAsDDMMYYYY(parseCustomDate(project.metadata.date))}
          </p>
        )}
        
        <div className="flex items-center text-gray-900 font-medium group-hover:text-gray-700 transition-colors">
          View Project
          <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </div>
      </div>
    </Link>
  );
};

const ProjectsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTag, setActiveTag] = useState(searchParams.get('tag') || '');
  const [allTags, setAllTags] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  const { 
    issues: projects, 
    loading: projectsLoading 
  } = useGithubIssues('project', null);

  useEffect(() => {
    if (Array.isArray(projects) && projects.length > 0) {
      // Extract all unique tags from projects
      const tags = new Set();
      projects.forEach(project => {
        if (project.metadata?.tag) {
          const projectTags = project.metadata.tag.split(',').map(tag => tag.trim());
          projectTags.forEach(tag => tags.add(tag));
        }
      });
      setAllTags(Array.from(tags).sort());
      
      // Filter projects by tag
      if (activeTag) {
        const filtered = projects.filter(project => {
          if (!project.metadata?.tag) return false;
          const projectTags = project.metadata.tag.split(',').map(tag => tag.trim());
          return projectTags.includes(activeTag);
        });
        setFilteredProjects(filtered);
      } else {
        setFilteredProjects(projects);
      }
    }
  }, [projects, activeTag]);

  const handleTagClick = (tag) => {
    // If clicking the active tag, clear the filter
    if (tag === activeTag) {
      setActiveTag('');
      setSearchParams({});
    } else {
      setActiveTag(tag);
      setSearchParams({ tag });
    }
  };

  if (projectsLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">My Projects</h2>
          <p className="max-w-2xl mx-auto text-gray-600">Explore the projects I've been working on</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-white px-6 py-8 animate-pulse">
              <div className="bg-gray-200 h-48 w-full rounded-lg mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="flex gap-2 mb-3">
                <div className="h-5 bg-gray-200 rounded w-16"></div>
                <div className="h-5 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
              <div className="h-5 bg-gray-200 rounded w-28"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const dateA = a.metadata?.date ? parseCustomDate(a.metadata.date) : new Date(0);
    const dateB = b.metadata?.date ? parseCustomDate(b.metadata.date) : new Date(0);
    return dateB - dateA;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">My Projects</h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-6">Explore the projects I've been working on</p>
        
        {/* Tags filter section */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  activeTag === tag 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
            {activeTag && (
              <button
                onClick={() => handleTagClick(activeTag)}
                className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
              >
                Clear Filter
              </button>
            )}
          </div>
        )}
      </div>
      
      {sortedProjects.length === 0 ? (
        <div className="text-center text-gray-500 bg-white border border-gray-200 rounded-lg p-8">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
          {activeTag ? (
            <>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">No projects found with tag: {activeTag}</h3>
              <p>Try selecting a different tag or clear the filter.</p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">No projects available yet</h3>
              <p>Check back soon for updates on my latest work!</p>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;