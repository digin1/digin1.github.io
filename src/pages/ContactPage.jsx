// src/pages/ContactPage.jsx
import React from 'react';
import Contact from '../components/sections/Contact';
import useGithubIssues from '../hooks/useGithubIssues';

const ContactPage = () => {
  // Fetch contact info using the 'contact' label
  const { 
    issues: contactIssues, 
    loading: contactLoading 
  } = useGithubIssues('contact', null);
  
  // Get the first contact issue
  const contactContent = Array.isArray(contactIssues) && contactIssues.length > 0 
    ? contactIssues[0] 
    : null;

  return (
    <div className="pt-10">
      <Contact content={contactContent} loading={contactLoading} />
    </div>
  );
};

export default ContactPage;