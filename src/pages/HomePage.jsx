// src/pages/HomePage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import Projects from '../components/sections/Projects';
import Toolkit from '../components/sections/Toolkit';
import useMarkdownContent from '../hooks/useMarkdownContent';

const HomePage = () => {
  // Fetch hero content using the local markdown files
  const { 
    content: heroContent, 
    loading: heroLoading,
    error: heroError 
  } = useMarkdownContent('hero');
  
  // Fetch projects content
  const { 
    allContent: projects, 
    loading: projectsLoading,
    error: projectsError
  } = useMarkdownContent('projects');
  
  // Fetch about content
  const { 
    content: aboutContent, 
    loading: aboutLoading,
    error: aboutError 
  } = useMarkdownContent('about');
  
  // Fetch contact info
  const { 
    content: contactContent, 
    loading: contactLoading,
    error: contactError 
  } = useMarkdownContent('contact');

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
        <meta name="description" content="Digin Dominic - Software Engineer, Research Toolsmith, and Data Workflow Architect. Building impactful digital solutions with React, Python, and modern web technologies." />
        <link rel="canonical" href="https://digindominic.me/" />

        {/* Open Graph */}
        <meta property="og:title" content="Digin Dominic | Software Engineer" />
        <meta property="og:description" content="Software Engineer, Research Toolsmith, and Data Workflow Architect. Building impactful digital solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://digindominic.me/" />
        <meta property="og:image" content="https://raw.githubusercontent.com/digin1/web-images/refs/heads/main/profile.webp" />
        <meta property="og:site_name" content="Digin Dominic" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Digin Dominic | Software Engineer" />
        <meta name="twitter:description" content="Software Engineer, Research Toolsmith, and Data Workflow Architect." />
        <meta name="twitter:image" content="https://raw.githubusercontent.com/digin1/web-images/refs/heads/main/profile.webp" />

        {/* Person Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Digin Dominic",
            "jobTitle": "Software Engineer",
            "description": "Software Engineer, Research Toolsmith, and Data Workflow Architect",
            "url": "https://digindominic.me",
            "image": "https://raw.githubusercontent.com/digin1/web-images/refs/heads/main/profile.webp",
            "sameAs": [
              "https://github.com/digin1",
              "https://linkedin.com/in/digindominic"
            ]
          })}
        </script>

        {/* WebSite Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Digin Dominic Portfolio",
            "url": "https://digindominic.me",
            "author": {
              "@type": "Person",
              "name": "Digin Dominic"
            }
          })}
        </script>
      </Helmet>
      <Hero content={heroContent} loading={heroLoading} />
      <Projects projects={projects} loading={projectsLoading} />
      <Toolkit />
    </>
  );
};

export default HomePage;