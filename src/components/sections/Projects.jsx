// src/components/sections/Projects.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  // Extract the issue number from the URL
  const issueNumber = project.number;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
      {project.metadata?.image && (
        <img 
          src={project.metadata.image} 
          alt={project.title} 
          className="w-full h-48 object-cover object-center" 
        />
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {project.labels && project.labels.map(label => (
            label.name !== 'project' && (
              <span 
                key={label.id} 
                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
              >
                {label.name}
              </span>
            )
          ))}
        </div>
        
        <p className="text-gray-600 mb-4">
          {project.metadata?.summary || project.metadata?.description || 
            (project.rawContent && project.rawContent.substring(0, 120) + '...')}
        </p>
        
        <Link 
          to={`/projects/${issueNumber}`}
          className="text-primary hover:underline font-medium inline-flex items-center"
        >
          View Project
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

const Projects = ({ projects, loading }) => {
  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="bg-gray-300 h-48 w-full"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                  <div className="flex gap-2 mb-3">
                    <div className="h-5 bg-gray-300 rounded w-16"></div>
                    <div className="h-5 bg-gray-300 rounded w-16"></div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
                  <div className="h-5 bg-gray-300 rounded w-28"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Make sure projects is an array before mapping over it
  const projectsArray = Array.isArray(projects) ? projects : [];

  return (
    <section className="py-16 bg-gray-50" id="projects">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">My Projects</h2>
        
        {projectsArray.length === 0 ? (
          <div className="text-center text-gray-600">
            No projects available yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsArray.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;