// src/components/sections/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { marked } from 'marked';

const Hero = ({ content, loading }) => {
  // Render loading state
  if (loading) {
    return (
      <section className="bg-gradient-to-r from-primary to-blue-500 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="h-64 flex items-center justify-center">
            <div className="animate-pulse space-y-4 w-full max-w-2xl">
              <div className="h-8 bg-white/20 rounded w-3/4"></div>
              <div className="h-4 bg-white/20 rounded w-full"></div>
              <div className="h-4 bg-white/20 rounded w-5/6"></div>
              <div className="h-4 bg-white/20 rounded w-4/6"></div>
              <div className="h-10 bg-white/20 rounded w-32 mt-6"></div>
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
      <section className="bg-gradient-to-r from-primary to-blue-500 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to My Portfolio
            </h1>
            <div className="text-xl mb-8 text-white/90">
              <p>Portfolio content is not available. Please check the GitHub Issues.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Debug information 
  console.log('Hero content:', content);
  console.log('Hero metadata:', content.metadata);
  console.log('Hero labels:', content.labels);

  // Check if content has the correct label
  const hasHeroLabel = content.labels && 
    content.labels.some(label => label.name === 'hero');

  // If content doesn't have hero label, show placeholder
  if (!hasHeroLabel) {
    console.warn('Hero section: Content does not have hero label');
    return (
      <section className="bg-gradient-to-r from-primary to-blue-500 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to My Portfolio
            </h1>
            <div className="text-xl mb-8 text-white/90">
              <p>Portfolio hero content is misconfigured. Please add the 'hero' label to the GitHub Issue.</p>
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
    <section className="bg-gradient-to-r from-primary to-blue-500 text-white py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {title}
          </h1>
          
          {subtitle && (
            <div 
              className="text-xl mb-8 text-white/90"
              dangerouslySetInnerHTML={{ __html: marked.parse(subtitle) }}
            />
          )}
          
          <div className="flex flex-wrap gap-4">
            <Link
              to={primaryCtaLink}
              className="px-6 py-3 bg-white text-primary font-medium rounded-md hover:bg-gray-100 transition-colors"
            >
              {primaryCta}
            </Link>
            
            {secondaryCta && (
              <Link
                to={secondaryCtaLink}
                className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
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