// src/components/sections/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { marked } from 'marked';

const Hero = ({ content, loading }) => {
  // Render loading state
  if (loading) {
    return (
      <section className="py-32 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="h-64 flex items-center justify-center">
            <div className="animate-pulse space-y-4 w-full max-w-2xl">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              <div className="h-10 bg-gray-200 rounded w-32 mt-6"></div>
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
      <section className="py-32 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              Welcome to My Portfolio
            </h1>
            <div className="text-xl mb-8 text-gray-600">
              <p>Showcasing my work, skills, and achievements.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="button-primary"
              >
                View Projects
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

  return (
    <section className="py-32 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            {title}
          </h1>
          
          {subtitle && (
            <div 
              className="text-xl mb-8 text-gray-600"
              dangerouslySetInnerHTML={{ __html: marked.parse(subtitle) }}
            />
          )}
          
          <div className="flex flex-wrap gap-4">
            <Link
              to={primaryCtaLink}
              className="button-primary"
            >
              {primaryCta}
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