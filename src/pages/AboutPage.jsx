// src/pages/AboutPage.jsx
import React, { useEffect, useState } from 'react';
import About from '../components/sections/About';
import useGithubIssues from '../hooks/useGithubIssues';

const AboutPage = () => {
  const [aboutContent, setAboutContent] = useState(null);
  
  // Fetch about content using the 'about' label
  const { 
    issues: aboutIssues, 
    loading: aboutLoading,
    error
  } = useGithubIssues('about', null);
  
  // Process about issues when they're loaded
  useEffect(() => {
    console.log('About issues updated:', aboutIssues);
    
    if (Array.isArray(aboutIssues) && aboutIssues.length > 0) {
      // Get the first about issue
      const issue = aboutIssues[0];
      
      console.log('Processing about issue:', issue);
      
      // Make sure the issue has the 'about' label - add it if it doesn't
      if (!issue.labels || !issue.labels.some(label => label.name === 'about')) {
        issue.labels = issue.labels || [];
        issue.labels.push({ name: 'about' });
      }
      
      // Deep clone the issue to prevent reference issues
      setAboutContent(JSON.parse(JSON.stringify(issue)));
    } else {
      console.warn('No about issues found or issues array is empty', aboutIssues);
    }
  }, [aboutIssues]);

  // Debug errors
  useEffect(() => {
    if (error) {
      console.error('Error in useGithubIssues hook:', error);
    }
  }, [error]);

  // Debug aboutContent
  useEffect(() => {
    if (aboutContent) {
      console.log('About content ready for rendering:', aboutContent);
    }
  }, [aboutContent]);

  return (
    <div className="pt-10">
      <About content={aboutContent} loading={aboutLoading} />
    </div>
  );
};

export default AboutPage;