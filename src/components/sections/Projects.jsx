// src/components/sections/Projects.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// ProjectCard component from the previous artifact
const ProjectCard = ({ project }) => {
  // Extract the issue number from the URL
  const issueNumber = project.number;
  
  return (
    <Link to={`/projects/${issueNumber}`} className="block">
      <div className="spotlight-card group h-full">
        {project.metadata?.image && (
          <div className="relative mb-6 overflow-hidden rounded-lg">
            <img 
              src={project.metadata.image} 
              alt={project.title} 
              className="w-full h-48 object-cover object-center transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
        )}
        
        <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-300">
          {project.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.labels && project.labels.map(label => (
            label.name !== 'project' && (
              <span 
                key={label.id} 
                className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300 border border-gray-700"
              >
                {label.name}
              </span>
            )
          ))}
        </div>
        
        <p className="text-gray-400 mb-4">
          {project.metadata?.summary || project.metadata?.description || 
            (project.rawContent && project.rawContent.substring(0, 120) + '...')}
        </p>
        
        <div className="flex items-center text-indigo-400 font-medium group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-300">
          View Project
          <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </div>
      </div>
    </Link>
  );
};

const Projects = ({ projects, loading }) => {
  if (loading) {
    return (
      <section className="py-24 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">My <span className="gradient-text">Projects</span></h2>
            <p className="max-w-2xl mx-auto text-gray-400">Explore the projects I've been working on</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl border border-gray-800 bg-gray-900 px-6 py-8 animate-pulse">
                <div className="bg-gray-800 h-48 w-full rounded-lg mb-6"></div>
                <div className="h-6 bg-gray-800 rounded w-3/4 mb-3"></div>
                <div className="flex gap-2 mb-3">
                  <div className="h-5 bg-gray-800 rounded w-16"></div>
                  <div className="h-5 bg-gray-800 rounded w-16"></div>
                </div>
                <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-2/3 mb-4"></div>
                <div className="h-5 bg-gray-800 rounded w-28"></div>
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
    <section className="py-24 bg-gray-950" id="projects">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">My <span className="gradient-text">Projects</span></h2>
          <p className="max-w-2xl mx-auto text-gray-400">Explore the projects I've been working on</p>
        </div>
        
        {projectsArray.length === 0 ? (
          <div className="text-center text-gray-400 bg-gray-900 border border-gray-800 rounded-xl p-8">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
            <h3 className="text-xl font-semibold mb-2">No projects available yet</h3>
            <p>Check back soon for updates on my latest work!</p>
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