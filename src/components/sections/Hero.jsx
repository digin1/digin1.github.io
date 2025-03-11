// src/components/sections/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';

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

  // Exit early if no content
  if (!content || !content.metadata) {
    return null;
  }

  // Extract values from metadata
  const { 
    name = 'Digin Dominic',
    title = 'System Engineer & Web Developer',
    subtitle = 'I build modern, responsive websites and web applications.',
    primaryCta = 'View My Work',
    primaryCtaLink = '/projects',
    secondaryCta = 'Contact Me',
    secondaryCtaLink = '/contact'
  } = content.metadata;

  return (
    <section className="py-32 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            {name}
          </h1>
          
          {title && (
            <div className="text-xl mb-8 text-gray-600">
              <p>{title}</p>
              {subtitle && <p className="mt-2">{subtitle}</p>}
            </div>
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