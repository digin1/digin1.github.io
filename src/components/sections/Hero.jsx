// src/components/sections/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { marked } from 'marked';

const Hero = ({ content, loading }) => {
  // Render loading state
  if (loading) {
    return (
      <section className="py-32 bg-gray-950 with-spotlight">
        <div className="container mx-auto px-4">
          <div className="h-64 flex items-center justify-center">
            <div className="animate-pulse space-y-4 w-full max-w-2xl">
              <div className="h-8 bg-gray-800 rounded w-3/4"></div>
              <div className="h-4 bg-gray-800 rounded w-full"></div>
              <div className="h-4 bg-gray-800 rounded w-5/6"></div>
              <div className="h-4 bg-gray-800 rounded w-4/6"></div>
              <div className="h-10 bg-gray-800 rounded w-32 mt-6"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Fallback content if no hero data is available
  if (!content) {
    console.warn('Hero section: No content available');
    return (
      <section className="py-32 bg-gray-950 with-spotlight">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to My <span className="gradient-text">Portfolio</span>
            </h1>
            <div className="text-xl mb-8 text-gray-400">
              <p>Showcasing my work, skills, and achievements.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="glow-button"
              >
                <span className="glow-button-inner">View Projects</span>
              </Link>
              <Link
                to="/contact"
                className="button-secondary"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Get title from metadata, fallback to issue title
  const title = content.metadata?.title || content.title || 'Welcome to My Portfolio';
  
  // Get subtitle from metadata
  const subtitle = content.metadata?.subtitle || '';
  
  // Get call-to-action buttons from metadata
  const primaryCta = content.metadata?.primaryCta || 'View Projects';
  const primaryCtaLink = content.metadata?.primaryCtaLink || '/projects';
  const secondaryCta = content.metadata?.secondaryCta;
  const secondaryCtaLink = content.metadata?.secondaryCtaLink || '/contact';

  // Format title to add gradient to last word
  const formatTitle = (title) => {
    const words = title.split(' ');
    if (words.length > 1) {
      const lastWord = words.pop();
      return (
        <>
          {words.join(' ')} <span className="gradient-text">{lastWord}</span>
        </>
      );
    }
    return title;
  };

  return (
    <section className="py-32 bg-gray-950 with-spotlight">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {formatTitle(title)}
          </h1>
          
          {subtitle && (
            <div 
              className="text-xl mb-8 text-gray-400"
              dangerouslySetInnerHTML={{ __html: marked.parse(subtitle) }}
            />
          )}
          
          <div className="flex flex-wrap gap-4">
            <Link
              to={primaryCtaLink}
              className="glow-button"
            >
              <span className="glow-button-inner">{primaryCta}</span>
            </Link>
            
            {secondaryCta && (
              <Link
                to={secondaryCtaLink}
                className="button-secondary"
              >
                {secondaryCta}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;