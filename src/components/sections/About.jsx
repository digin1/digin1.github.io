// src/components/sections/About.jsx
import React from 'react';
import { marked } from 'marked';

const About = ({ content, loading }) => {
  // Render loading state
  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/3 animate-pulse">
              <div className="bg-gray-200 h-80 w-full rounded-lg"></div>
            </div>
            <div className="lg:w-2/3 animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Fallback content if no about data is available
  if (!content) {
    console.warn('About section: No content available');
    return (
      <section className="py-16 bg-white" id="about">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">About Me</h2>
            <p className="text-gray-600">About content is not available. Please check the GitHub Issues.</p>
          </div>
        </div>
      </section>
    );
  }

  // Debug information
  console.log('About content:', content);
  console.log('About metadata:', content.metadata);
  console.log('About labels:', content.labels);
  console.log('About rawContent:', content.rawContent);

  // Check if content has the correct label
  const hasAboutLabel = content.labels && 
    content.labels.some(label => label.name === 'about');

  // If content doesn't have about label, show placeholder
  if (!hasAboutLabel) {
    console.warn('About section: Content does not have about label', content.labels);
    return (
      <section className="py-16 bg-white" id="about">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">About Me</h2>
            <p className="text-gray-600">
              About content is misconfigured. Please add the 'about' label to the GitHub Issue.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Get title from metadata, fallback to default
  const title = content.metadata?.title || 'About Me';
  
  // Get image from metadata
  const image = content.metadata?.image;
  
  // Get skills from metadata (could be string or array)
  const skills = content.metadata?.skills || [];
  
  // Convert skills to array if it's a string
  const skillsArray = typeof skills === 'string' ? 
    skills.split(',').map(skill => skill.trim()) : 
    Array.isArray(skills) ? skills : [];

  return (
    <section className="py-16 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {image && (
            <div className="lg:w-1/3">
              <img 
                src={image} 
                alt={content.metadata?.name || 'Profile'} 
                className="rounded-lg shadow-sm w-full border border-gray-200"
              />
            </div>
          )}
          
          <div className={image ? 'lg:w-2/3' : 'w-full max-w-3xl mx-auto'}>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">{title}</h2>
            
            {content.rawContent ? (
              <div 
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: marked.parse(content.rawContent) }}
              />
            ) : (
              <p className="text-gray-600">No content available for the About section.</p>
            )}
            
            {skillsArray.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skillsArray.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;