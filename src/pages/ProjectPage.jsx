// src/pages/ProjectPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { marked } from 'marked';
import useGithubIssues from '../hooks/useGithubIssues';

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const issueNumber = parseInt(id, 10);
  const [loading, setLoading] = useState(true);
  
  // Fetch the specific issue by number
  const { 
    currentIssue: project, 
    loading: issueLoading, 
    error, 
    fetchIssue 
  } = useGithubIssues(null, issueNumber);
  
  // Fetch the project when the component mounts
  useEffect(() => {
    if (issueNumber && !isNaN(issueNumber)) {
      fetchIssue(issueNumber);
    } else {
      navigate('/not-found');
    }
  }, [issueNumber, fetchIssue, navigate]);

  // Set overall loading state
  useEffect(() => {
    setLoading(issueLoading);
  }, [issueLoading]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find the project you're looking for.</p>
          <Link to="/projects" className="text-gray-900 hover:underline">
            &larr; Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <Link to="/projects" className="inline-flex items-center text-gray-900 hover:underline mb-12">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Projects
      </Link>

      <div className="card max-w-4xl mx-auto">
        {project.metadata && project.metadata.image && (
          <div className="mb-8 -mx-6 -mt-8 overflow-hidden rounded-t-lg">
            <img 
              src={project.metadata.image} 
              alt={project.title} 
              className="w-full h-80 object-cover object-center" 
            />
          </div>
        )}
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{project.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.labels && project.labels.map(label => (
            label.name !== 'project' && (
              <span 
                key={label.id} 
                className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700 border border-gray-200"
              >
                {label.name}
              </span>
            )
          ))}
        </div>
        
        {project.metadata && (project.metadata.demo || project.metadata.github) && (
          <div className="flex flex-wrap gap-4 mb-8">
            {project.metadata.demo && (
              <a 
                href={project.metadata.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="button-primary"
              >
                Live Demo
              </a>
            )}
            
            {project.metadata.github && (
              <a 
                href={project.metadata.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="button-secondary"
              >
                View Code
              </a>
            )}
          </div>
        )}
        
        <div 
          className="text-gray-700 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: marked.parse(project.rawContent || '') }}
        />
      </div>
    </div>
  );
};

export default ProjectPage;