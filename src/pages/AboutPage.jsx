// src/pages/AboutPage.jsx
import React from 'react';
import About from '../components/sections/About';
import useGithubIssues from '../hooks/useGithubIssues';

const AboutPage = () => {
  // Fetch about content using the 'about' label
  const { 
    issues: aboutIssues, 
    loading: aboutLoading 
  } = useGithubIssues('about', null);
  
  // Get the first about issue
  const aboutContent = Array.isArray(aboutIssues) && aboutIssues.length > 0 
    ? aboutIssues[0] 
    : null;

  return (
    <div className="pt-10">
      <About content={aboutContent} loading={aboutLoading} />
    </div>
  );
};

export default AboutPage;