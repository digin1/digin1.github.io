// src/components/sections/Contact.jsx
import React from 'react';
import { marked } from 'marked';

const Contact = ({ content, loading }) => {
  // Render loading state
  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 mt-8 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-24 bg-gray-200 rounded w-full"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
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
      <section className="py-24 bg-white" id="contact">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Get In Touch</h2>
            <p className="text-gray-600 mb-8">
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

  return (
    <section className="py-24 bg-white" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">{title}</h2>
          
          {subtitle && (
            <div 
              className="text-gray-600 mb-8"
              dangerouslySetInnerHTML={{ __html: marked.parse(subtitle) }}
            />
          )}
          
          <div className="card mt-12">
            <form 
              action={formAction}
              method="POST"
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-left">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="text-left">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    required
                  />
                </div>
              </div>
              
              <div className="text-left">
                <label htmlFor="subject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-input"
                  required
                />
              </div>
              
              <div className="text-left">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="form-input resize-none"
                  required
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="button-primary"
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
                    className="text-gray-900 hover:underline font-medium"
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