// src/components/sections/Hero.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ content, loading }) => {
  // Debugging to see what's being received
  useEffect(() => {
    if (content && content.metadata) {
      console.log('Hero content metadata:', content.metadata);
      console.log('Subtitle value:', content.metadata.subtitle);
    }
  }, [content]);

  // Render loading state with a layout matching the final content structure
  if (loading) {
    return (
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col xl:flex-row items-start justify-between">
            {/* Left side placeholder */}
            <div className="max-w-2xl mb-12 xl:mb-0 animate-pulse">
              <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6 mb-6"></div>
              <div className="flex gap-4">
                <div className="h-10 bg-gray-200 rounded w-32"></div>
                <div className="h-10 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            {/* Right side placeholder for tech toolkit */}
            <div className="w-full xl:w-1/2 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="flex flex-wrap justify-center gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-6 bg-gray-200 rounded w-16"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Exit early if no content
  if (!content || !content.metadata) {
    console.error('Hero component received invalid content:', content);
    return null;
  }

  // Extract values from metadata with explicit debugging
  const {
    name = 'Digin Dominic',
    title = 'System Engineer & Web Developer',
    subtitle,
    primaryCta = 'View My Work',
    primaryCtaLink = '/projects',
    secondaryCta = 'Contact Me',
    secondaryCtaLink = '/about',
    technologies = '',
  } = content.metadata;

  // Parse technologies string into array
  const techArray = technologies
    ? technologies.split(',').map(tech => tech.trim()).filter(tech => tech !== '')
    : [];
  
  // Default subtitle text if none is provided
  const displaySubtitle = subtitle || 'I build modern, responsive websites and web applications.';
  
  // First, replace literal '\n' strings with actual newline characters
  const processedSubtitle = displaySubtitle.replace(/\\n/g, '\n');
  
  // Then split on actual newlines
  let paragraphs = processedSubtitle.split('\n');
  
  // If we still only have one paragraph and it's long (> 200 chars), try to intelligently split it
  if (paragraphs.length === 1 && processedSubtitle.length > 200) {
    const lowerBound = Math.floor(processedSubtitle.length / 3);
    const upperBound = Math.floor(processedSubtitle.length * 2 / 3);
    let splitPoint = -1;
    for (let i = upperBound; i >= lowerBound; i--) {
      if (processedSubtitle[i] === '.' && processedSubtitle[i+1] === ' ') {
        splitPoint = i + 1;
        break;
      }
    }
    if (splitPoint !== -1) {
      paragraphs = [
        processedSubtitle.substring(0, splitPoint).trim(),
        processedSubtitle.substring(splitPoint).trim()
      ];
    }
  }

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col xl:flex-row items-start justify-between">
          {/* Left side text content */}
          <div className="max-w-2xl mb-12 xl:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold mb-2 text-gray-900">
              {name}
            </h1>
            {title && (
              <div className="mb-8">
                <p className="text-xl text-gray-800 font-medium">{title}</p>
                <div className="mt-4 text-lg text-gray-600">
                  {paragraphs.map((paragraph, index) => (
                    <p key={index} className={index > 0 ? 'mt-4' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-4">
              <Link to={primaryCtaLink} className="button-primary">
                {primaryCta}
              </Link>
              {secondaryCta && (
                <Link to={secondaryCtaLink} className="button-secondary">
                  {secondaryCta}
                </Link>
              )}
            </div>
          </div>
          {/* Right side tech toolkit */}
          {techArray.length > 0 && (
            <div className="w-full xl:w-1/2 flex flex-col justify-center xl:justify-end mt-8 xl:mt-16">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">My Toolkit</h2>
              <div className="w-full md:w-3/4 xl:w-2/3 text-center mx-auto">
                <div className="flex flex-wrap justify-center gap-2">
                  {techArray.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1.5 rounded-md bg-white border border-gray-200 text-sm font-medium text-gray-700 shadow-sm hover:shadow hover:border-gray-300 transition-all duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
