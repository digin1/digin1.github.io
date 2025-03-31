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
  const repo = 'digin1.github.io';
  
  // Create headers without any authorization token
  const getHeaders = useCallback(() => {
    return {
      'Accept': 'application/vnd.github.v3+json'
    };
  }, []);
  
  // Updated function to extract metadata from issue body with support for JSON format
  const processIssue = useCallback((issue) => {
    const processedIssue = { ...issue };
    processedIssue.metadata = {};
    processedIssue.rawContent = issue.body || '';
    
    if (issue.body) {
      // Try to extract JSON metadata from markdown
      const jsonMetadataRegex = /```json\s*([\s\S]*?)\s*```/;
      const jsonMatch = issue.body.match(jsonMetadataRegex);
      
      if (jsonMatch && jsonMatch[1]) {
        try {
          // Parse the JSON metadata
          const jsonMetadata = JSON.parse(jsonMatch[1].trim());
          processedIssue.metadata = jsonMetadata;
          console.log('Parsed JSON metadata:', processedIssue.metadata);
          
          // Remove the JSON block from rawContent for cleaner markdown rendering
          processedIssue.rawContent = issue.body.replace(/## Metadata\s*```json[\s\S]*?```/, '').trim();
        } catch (err) {
          console.error('Error parsing JSON metadata:', err);
          // Fallback to traditional metadata extraction if JSON parsing fails
        }
      } else {
        // Fallback to the original metadata extraction for backward compatibility
        const metadataRegex = /^---\s*([^\n:]+):\s*([\s\S]*?)(?=^---\s*[^\n:]+:\s*|$)/gm;
        let match;
        
        while ((match = metadataRegex.exec(issue.body)) !== null) {
          const key = match[1].trim();
          const value = match[2].trim();
          processedIssue.metadata[key] = value;
        }
      }
      
      // Set label names for easy access
      if (issue.labels && Array.isArray(issue.labels)) {
        processedIssue.labelNames = issue.labels.map(label => label.name);
      }
      
      console.log('Processed issue:', processedIssue);
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
