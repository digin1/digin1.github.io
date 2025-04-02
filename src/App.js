// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectPage from './pages/ProjectPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  // Determine if we're running on GitHub Pages
  const isGitHubPages = window.location.hostname.includes('github.io');
  
  // Get the basename for GitHub Pages
  let basename = '';
  
  if (isGitHubPages) {
    // Extract repository name from the pathname if we're on GitHub Pages
    // For a URL like https://username.github.io/repo-name/, we want '/repo-name'
    // For a URL like https://username.github.io/, we want '' (empty string)
    const pathSegments = window.location.pathname.split('/');
    
    // If the username.github.io is used as the main domain (username.github.io), 
    // then no basename is needed
    if (window.location.hostname !== `${process.env.REACT_APP_GITHUB_USERNAME}.github.io`) {
      basename = `/${pathSegments[1]}`;
    }
  }

  console.log('Using basename:', basename);

  return (
    <HelmetProvider>
      <Router basename={basename}>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
};

export default App;