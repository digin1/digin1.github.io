import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import Projects from '../components/sections/Projects';
import Toolkit from '../components/sections/Toolkit';
import useGithubIssues from '../hooks/useGithubIssues';

const HomePage = () => {
  // Fetch hero content using the 'hero' label
  const { 
    issues: heroIssues, 
    loading: heroLoading,
    error: heroError 
  } = useGithubIssues('hero', null);
  
  // Get the first hero issue
  const heroContent = Array.isArray(heroIssues) && heroIssues.length > 0 
    ? heroIssues[0] 
    : null;
  
  // Fetch projects using the 'project' label
  const { 
    issues: projects, 
    loading: projectsLoading,
    error: projectsError
  } = useGithubIssues('project', null);
  
  // Fetch about content using the 'about' label
  const { 
    issues: aboutIssues, 
    loading: aboutLoading,
    error: aboutError 
  } = useGithubIssues('about', null);
  
  // Get the first about issue
  const aboutContent = Array.isArray(aboutIssues) && aboutIssues.length > 0 
    ? aboutIssues[0] 
    : null;
  
  // Fetch contact info using the 'contact' label
  const { 
    issues: contactIssues, 
    loading: contactLoading,
    error: contactError 
  } = useGithubIssues('contact', null);
  
  // Get the first contact issue
  const contactContent = Array.isArray(contactIssues) && contactIssues.length > 0 
    ? contactIssues[0] 
    : null;

  // Debug information  
  console.log('Homepage loaded');
  console.log('Hero content:', heroContent);
  console.log('Hero loading:', heroLoading);
  console.log('Hero error:', heroError);
  
  console.log('Projects:', projects);
  console.log('Projects loading:', projectsLoading);
  console.log('Projects error:', projectsError);
  
  console.log('About content:', aboutContent);
  console.log('About loading:', aboutLoading);
  console.log('About error:', aboutError);
  
  console.log('Contact content:', contactContent);
  console.log('Contact loading:', contactLoading);
  console.log('Contact error:', contactError);

  return (
    <>
      <Helmet>
        <title>Digin Dominic | Software Engineer</title>
        <meta name="description" content="Digin Dominic - Software Engineer, Research Toolsmith, and Data Workflow Architect" />
      </Helmet>
      <Hero content={heroContent} loading={heroLoading} />
      <Projects projects={projects} loading={projectsLoading} />
      <Toolkit />
    </>
  );
};

export default HomePage;