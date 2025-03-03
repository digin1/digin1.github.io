// src/components/sections/Contact.jsx
import React from 'react';
import { marked } from 'marked';

const Contact = ({ content, loading }) => {
  // Render loading state
  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
            <div className="bg-white rounded-lg shadow-md p-8 mt-8 space-y-4">
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              <div className="h-10 bg-gray-300 rounded w-full"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              <div className="h-10 bg-gray-300 rounded w-full"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              <div className="h-24 bg-gray-300 rounded w-full"></div>
              <div className="h-10 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Fallback content if no contact data is available
  if (!content) {
    console.warn('Contact section: No content available');
    return (
      <section className="py-16 bg-gray-50" id="contact">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-600 mb-8">
              Contact content is not available. Please check the GitHub Issues.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Debug information
  console.log('Contact content:', content);
  console.log('Contact metadata:', content.metadata);
  console.log('Contact labels:', content.labels);

  // Check if content has the correct label
  const hasContactLabel = content.labels && 
    content.labels.some(label => label.name === 'contact');

  // If content doesn't have contact label, show placeholder
  if (!hasContactLabel) {
    console.warn('Contact section: Content does not have contact label');
    return (
      <section className="py-16 bg-gray-50" id="contact">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-600 mb-8">
              Contact content is misconfigured. Please add the 'contact' label to the GitHub Issue.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Get title and subtitle from metadata
  const title = content.metadata?.title || 'Get In Touch';
  const subtitle = content.metadata?.subtitle || '';
  
  // Get form action and email from metadata
  const formAction = content.metadata?.formAction || '#';
  const email = content.metadata?.email || '';

  return (
    <section className="py-16 bg-gray-50" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          
          {subtitle && (
            <div 
              className="text-gray-700 mb-8"
              dangerouslySetInnerHTML={{ __html: marked.parse(subtitle) }}
            />
          )}
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <form 
              action={formAction}
              method="POST"
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
            
            {email && (
              <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                <p className="text-gray-600">
                  Prefer to email directly? Reach me at{' '}
                  <a 
                    href={`mailto:${email}`}
                    className="text-primary hover:underline"
                  >
                    {email}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;