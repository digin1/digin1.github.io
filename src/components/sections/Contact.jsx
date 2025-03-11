// src/components/sections/Contact.jsx
import React from 'react';
import { marked } from 'marked';

const Contact = ({ content, loading }) => {
  // Render loading state
  if (loading) {
    return (
      <section className="py-24 bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto animate-pulse space-y-4">
            <div className="h-8 bg-gray-800 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-gray-800 rounded w-2/3 mx-auto"></div>
            <div className="h-4 bg-gray-800 rounded w-2/3 mx-auto"></div>
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 mt-8 space-y-4">
              <div className="h-6 bg-gray-800 rounded w-1/4"></div>
              <div className="h-10 bg-gray-800 rounded w-full"></div>
              <div className="h-6 bg-gray-800 rounded w-1/4"></div>
              <div className="h-10 bg-gray-800 rounded w-full"></div>
              <div className="h-6 bg-gray-800 rounded w-1/4"></div>
              <div className="h-24 bg-gray-800 rounded w-full"></div>
              <div className="h-10 bg-gray-800 rounded w-1/3"></div>
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
      <section className="py-24 bg-gray-950" id="contact">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Get In <span className="gradient-text">Touch</span></h2>
            <p className="text-gray-400 mb-8">
              Contact content is not available. Please check the GitHub Issues.
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

  // Format title with gradient on last word
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
    return <span className="gradient-text">{title}</span>;
  };

  return (
    <section className="py-24 bg-gray-950" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{formatTitle(title)}</h2>
          
          {subtitle && (
            <div 
              className="text-gray-400 mb-8"
              dangerouslySetInnerHTML={{ __html: marked.parse(subtitle) }}
            />
          )}
          
          <div className="spotlight-card mt-12">
            <form 
              action={formAction}
              method="POST"
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-left">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                    required
                  />
                </div>
                
                <div className="text-left">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                    required
                  />
                </div>
              </div>
              
              <div className="text-left">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
                  required
                />
              </div>
              
              <div className="text-left">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white resize-none"
                  required
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="glow-button"
                >
                  <span className="glow-button-inner">Send Message</span>
                </button>
              </div>
            </form>
            
            {email && (
              <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                <p className="text-gray-400">
                  Prefer to email directly? Reach me at{' '}
                  <a 
                    href={`mailto:${email}`}
                    className="text-indigo-400 hover:underline"
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