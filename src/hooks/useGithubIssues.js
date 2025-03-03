// src/hooks/useGithubIssues.js
import { useState, useEffect, useCallback } from 'react';

const useGithubIssues = (label = null, issueNumber = null) => {
  // Always initialize with an empty array for issues
  const [issues, setIssues] = useState([]);
  const [currentIssue, setCurrentIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Your GitHub API configuration
  // Update these values to match your repository
  const owner = 'digin1'; // Your GitHub username
  const repo = 'portfolio-website'; // Your repository name
  const token = process.env.REACT_APP_GITHUB_TOKEN; // Optional: Your GitHub token for API rate limits
  
  // Function to create headers with authorization if token exists
  const getHeaders = useCallback(() => {
    const headers = {
      'Accept': 'application/vnd.github.v3+json'
    };
    
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }
    
    return headers;
  }, [token]);
  
  // Fetch issues by label
  const fetchIssues = useCallback(async () => {
    if (!label) return;
    
    setLoading(true);
    try {
      const url = `https://api.github.com/repos/${owner}/${repo}/issues?labels=${label}&state=open`;
      console.log(`Fetching issues from: ${url}`);
      
      const response = await fetch(url, { headers: getHeaders() });
      
      console.log(`Response status: ${response.status}`);
      if (!response.ok) {
        console.error(`Error response: ${response.statusText}`);
        throw new Error(`GitHub API responded with ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`Received data for label '${label}':`, data);
      
      // Process each issue to extract metadata
      const processedIssues = Array.isArray(data) 
        ? data.map(issue => processIssue(issue))
        : [];
      
      console.log(`Processed ${processedIssues.length} issues with metadata:`, processedIssues);
      
      // Ensure we're setting an array, even if empty
      setIssues(processedIssues);
      
    } catch (err) {
      console.error('Error fetching issues:', err);
      setError(err);
      setIssues([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  }, [label, owner, repo, getHeaders, processIssue]);
  
  // Fetch a specific issue by number
  const fetchIssue = useCallback(async (num) => {
    setLoading(true);
    try {
      console.log(`Fetching issue #${num}`);
      
      // API call to fetch a specific issue by number
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues/${num}`,
        { headers: getHeaders() }
      );
      
      if (!response.ok) {
        throw new Error(`GitHub API responded with ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`Fetched issue #${num}:`, data);
      
      // Process the issue content to extract metadata
      const processedIssue = processIssue(data);
      console.log(`Processed issue with metadata:`, processedIssue);
      setCurrentIssue(processedIssue);
      
    } catch (err) {
      console.error(`Error fetching issue #${num}:`, err);
      setError(err);
      setCurrentIssue(null);
    } finally {
      setLoading(false);
    }
  }, [owner, repo, getHeaders, processIssue]);
  
  // Process issue body to extract metadata
  const processIssue = useCallback((issue) => {
    // Default to the original issue
    const processedIssue = { ...issue };
    
    // Initialize metadata object
    processedIssue.metadata = {};
    
    // Extract the raw content without metadata
    processedIssue.rawContent = issue.body || '';
    
    if (issue.body) {
      // More flexible regex that handles various whitespace patterns
      // This will match YAML-style frontmatter with more flexibility
      const yamlRegex = /^\s*---\s*([\s\S]*?)\s*---/;
      const match = issue.body.match(yamlRegex);
      
      if (match && match[1]) {
        // Extract metadata section
        const metadataText = match[1];
        
        // Parse each line as a key-value pair
        metadataText.split('\n').forEach(line => {
          // Skip empty lines
          if (!line.trim()) return;
          
          const colonIndex = line.indexOf(':');
          if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            
            // Handle lists (comma-separated values)
            if (value.includes(',') && 
                (key === 'skills' || key === 'tags' || key === 'technologies')) {
              processedIssue.metadata[key] = value.split(',').map(item => item.trim());
            } else {
              processedIssue.metadata[key] = value;
            }
          }
        });
        
        // Remove the metadata section from the raw content
        processedIssue.rawContent = issue.body.replace(yamlRegex, '').trim();
        
        // Add title from metadata or use issue title
        if (!processedIssue.metadata.title && issue.title) {
          processedIssue.metadata.title = issue.title;
        }
      }
    }
    
    // Set labels for easy access
    if (issue.labels && Array.isArray(issue.labels)) {
      processedIssue.labelNames = issue.labels.map(label => label.name);
    }
    
    return processedIssue;
  }, []);
  
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