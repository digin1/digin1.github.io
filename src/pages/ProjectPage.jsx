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
  
  // Fetch all projects for validation
  const { 
    issues: projects, 
    loading: projectsLoading 
  } = useGithubIssues('project', null);
  
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
    setLoading(projectsLoading || issueLoading);
  }, [projectsLoading, issueLoading]);

  // Validate if the current issue is a project
  useEffect(() => {
    if (!loading && project && projects) {
      // Method 1: Check if this issue has the 'project' label
      const hasProjectLabel = project.labels && 
        project.labels.some(label => label.name === 'project');
      
      // Method 2: Check if the issue number exists in our projects list
      const projectNumbers = Array.isArray(projects) ? projects.map(p => p.number) : [];
      const isInProjectsList = projectNumbers.includes(issueNumber);
      
      // If it's not a project by either check, redirect to not found
      if (!hasProjectLabel && !isInProjectsList) {
        console.log('Not a project, redirecting...');
        console.log('Labels:', project.labels);
        console.log('Project numbers:', projectNumbers);
        console.log('Current issue number:', issueNumber);
        navigate('/not-found');
      }
    }
  }, [project, projects, issueNumber, loading, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find the project you're looking for.</p>
          <Link to="/projects" className="text-primary hover:underline">
            &larr; Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/projects" className="inline-flex items-center text-primary hover:underline mb-8">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Projects
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {project.metadata && project.metadata.image && (
          <img 
            src={project.metadata.image} 
            alt={project.title} 
            className="w-full h-64 object-cover object-center" 
          />
        )}
        
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.labels && project.labels.map(label => (
              label.name !== 'project' && (
                <span 
                  key={label.id} 
                  className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary"
                >
                  {label.name}
                </span>
              )
            ))}
          </div>
          
          {project.metadata && project.metadata.demo && (
            <div className="flex flex-wrap gap-4 mb-6">
              <a 
                href={project.metadata.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Live Demo
              </a>
              
              {project.metadata.github && (
                <a 
                  href={project.metadata.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  View Code
                </a>
              )}
            </div>
          )}
          
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: marked.parse(project.rawContent || '') }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;