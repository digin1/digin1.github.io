// src/pages/ProjectPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { marked } from 'marked';
import useGithubIssues from '../hooks/useGithubIssues';

// Custom component to handle GitHub image loading with fallbacks
const ProjectImage = ({ imageUrl, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [directUrl, setDirectUrl] = useState('');
  
  useEffect(() => {
    if (!imageUrl) {
      setIsLoading(false);
      return;
    }
    
    // Step 1: Try the original URL first (for GitHub assets)
    if (imageUrl.includes('github.com') && imageUrl.includes('/assets/')) {
      setDirectUrl(imageUrl);
    } 
    // Step 2: For regular GitHub content URLs, transform to raw URLs
    else if (imageUrl.includes('github.com') && imageUrl.includes('/blob/')) {
      setDirectUrl(
        imageUrl
          .replace('github.com', 'raw.githubusercontent.com')
          .replace('/blob/', '/')
      );
    } else if (imageUrl.includes('github.com') && imageUrl.includes('/raw/')) {
      setDirectUrl(
        imageUrl.replace('github.com', 'raw.githubusercontent.com')
      );
    } else {
      // For any other URL, use as is
      setDirectUrl(imageUrl);
    }
    
    setIsLoading(true);
    setLoadFailed(false);
  }, [imageUrl]);
  
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  
  const handleImageError = () => {
    console.error('Failed to load image:', directUrl);
    setIsLoading(false);
    setLoadFailed(true);
  };
  
  return (
    <div className="relative w-full h-80">
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      
      {/* The image itself */}
      {directUrl && (
        <img 
          src={directUrl}
          alt={title || 'Project image'} 
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          className={`w-full h-80 object-cover object-center ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      
      {/* Error state with "View Image" button */}
      {loadFailed && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center p-4">
            <p className="text-gray-600 mb-4">Unable to display image directly</p>
            <a 
              href={imageUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              View Image
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

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
            <ProjectImage 
              imageUrl={project.metadata.image}
              title={project.title}
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