// src/hooks/useGithubIssues.js
import { useState, useEffect, useCallback } from 'react';

const useGithubIssues = (label = null, issueNumber = null) => {
  // States
  const [issues, setIssues] = useState([]);
  const [currentIssue, setCurrentIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // GitHub API configuration
  const owner = 'digin1';
  const repo = 'portfolio-website';
  const token = process.env.REACT_APP_GITHUB_TOKEN;
  
  // Create headers with authorization if token exists
  const getHeaders = useCallback(() => {
    const headers = {
      'Accept': 'application/vnd.github.v3+json'
    };
    
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }
    
    return headers;
  }, [token]);
  
  // Simple function to extract metadata from issue body
  const processIssue = useCallback((issue) => {
    const processedIssue = { ...issue };
    processedIssue.metadata = {};
    processedIssue.rawContent = issue.body || '';
    
    if (issue.body) {
      // Simple regex to extract fields between triple dashes
      // Example: ---name: John Doe---
      const metadataRegex = /---([^:]+):\s*([^-]*?)---/g;
      let match;
      
      while ((match = metadataRegex.exec(issue.body)) !== null) {
        const key = match[1].trim();
        const value = match[2].trim();
        processedIssue.metadata[key] = value;
      }
      
      // Set label names for easy access
      if (issue.labels && Array.isArray(issue.labels)) {
        processedIssue.labelNames = issue.labels.map(label => label.name);
      }
      
      console.log('Processed metadata:', processedIssue.metadata);
    }
    
    return processedIssue;
  }, []);
  
  // Fetch issues by label
  const fetchIssues = useCallback(async () => {
    if (!label) return;
    
    setLoading(true);
    try {
      const url = `https://api.github.com/repos/${owner}/${repo}/issues?labels=${label}&state=open`;
      console.log(`Fetching issues from: ${url}`);
      
      const response = await fetch(url, { headers: getHeaders() });
      
      if (!response.ok) {
        throw new Error(`GitHub API responded with ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Process each issue to extract metadata
      const processedIssues = Array.isArray(data) 
        ? data.map(issue => processIssue(issue))
        : [];
      
      setIssues(processedIssues);
      
    } catch (err) {
      console.error('Error fetching issues:', err);
      setError(err);
      setIssues([]);
    } finally {
      setLoading(false);
    }
  }, [label, owner, repo, getHeaders, processIssue]);
  
  // Fetch a specific issue by number
  const fetchIssue = useCallback(async (num) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues/${num}`,
        { headers: getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`GitHub API responded with ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Process the issue content to extract metadata
      const processedIssue = processIssue(data);
      setCurrentIssue(processedIssue);
      
    } catch (err) {
      console.error(`Error fetching issue #${num}:`, err);
      setError(err);
      setCurrentIssue(null);
    } finally {
      setLoading(false);
    }
  }, [owner, repo, getHeaders, processIssue]);
  
  // Fetch data when the component mounts or when dependencies change
  useEffect(() => {
    if (label) {
      fetchIssues();
    }
    
    if (issueNumber && !isNaN(issueNumber)) {
      fetchIssue(issueNumber);
    }
  }, [label, issueNumber, fetchIssues, fetchIssue]);
  
  return { 
    issues, 
    currentIssue, 
    loading, 
    error, 
    fetchIssue, 
    fetchIssues 
  };
};

export default useGithubIssues;