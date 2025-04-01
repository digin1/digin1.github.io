// src/pages/AboutPage.jsx
import React, { useEffect, useState } from 'react';
import About from '../components/sections/About';
import useGithubIssues from '../hooks/useGithubIssues';

// Wrapper component to handle the background color
const BgWrapper = ({ children }) => {
  useEffect(() => {
    // Add our bg-light class ensuring we don't duplicate it
    if (!document.body.classList.contains('bg-light')) {
      document.body.classList.add('bg-light');
    }
    
    // Force a repaint to ensure styles take effect
    document.body.style.display = 'none';
    // Use the return value to avoid ESLint error
    const reflow = document.body.offsetHeight;
    document.body.style.display = '';
    
    // Prevent unused variable warning
    console.log('Background applied', reflow);
    
    // Clean up function
    return () => {
      // Only remove our class, preserve others
      document.body.classList.remove('bg-light');
    };
  }, []);
  
  return (
    <div className="bg-light min-h-screen">
      {children}
    </div>
  );
};

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
    <BgWrapper>
      <div className="pt-28">
        <header className="container mx-auto px-4 text-center mb-1">
          <h1 className="title mb-4">About <span>Me</span></h1>
          <p className="max-w-2xl mx-auto text-gray-600 mb-1">Get to know more about my background and experience</p>
        </header>
        <About content={aboutContent} loading={aboutLoading} />
      </div>
    </BgWrapper>
  );
};

export default AboutPage;