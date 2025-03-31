// src/api/github.js
import axios from 'axios';

const GITHUB_USERNAME = process.env.REACT_APP_GITHUB_USERNAME || 'digin1';
const GITHUB_REPO = process.env.REACT_APP_GITHUB_REPO || 'portfolio-website';

// Create an axios instance with GitHub API base URL without any token
const axiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
});

/**
 * Fetch all issues matching the provided label
 * @param {string} label - The label to filter issues by
 * @returns {Promise<Array>} - Promise resolving to an array of issues
 */
export const getIssuesByLabel = async (label) => {
  try {
    console.log(`Fetching issues with label: ${label}`);
    console.log(`Repository: ${GITHUB_USERNAME}/${GITHUB_REPO}`);
    
    const response = await axiosInstance.get(
      `/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/issues`,
      {
        params: {
          state: 'open',
          labels: label,
          sort: 'created',
          direction: 'desc'
        }
      }
    );
    console.log(`Found ${response.data.length} issues with label ${label}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching issues:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return [];
  }
};

/**
 * Fetch a single issue by its number
 * @param {number} issueNumber - The issue number to fetch
 * @returns {Promise<Object>} - Promise resolving to the issue object
 */
export const getIssueByNumber = async (issueNumber) => {
  try {
    console.log(`Fetching issue #${issueNumber}`);
    
    const response = await axiosInstance.get(
      `/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/issues/${issueNumber}`
    );
    console.log(`Successfully fetched issue #${issueNumber}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching issue #${issueNumber}:`, error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return null;
  }
};

/**
 * Fetch all comments for a specific issue
 * @param {number} issueNumber - The issue number to fetch comments for
 * @returns {Promise<Array>} - Promise resolving to an array of comments
 */
export const getIssueComments = async (issueNumber) => {
  try {
    console.log(`Fetching comments for issue #${issueNumber}`);
    
    const response = await axiosInstance.get(
      `/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/issues/${issueNumber}/comments`
    );
    console.log(`Found ${response.data.length} comments for issue #${issueNumber}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comments for issue #${issueNumber}:`, error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return [];
  }
};

/**
 * Parse the issue body to extract structured data using a simple convention:
 * --- key: value --- blocks
 * @param {string} body - The issue body text
 * @returns {Object} - Object containing extracted data
 */
export const parseIssueBody = (body) => {
  if (!body) {
    console.warn('Empty body passed to parseIssueBody');
    return { metadata: {}, content: '', rawContent: '' };
  }
  
  const metadata = {};
  const contentBlocks = [];
  
  // Basic regex to extract metadata blocks like --- key: value ---
  const metadataRegex = /---\s*([^:]+):\s*([^-]*?)\s*---/g;
  let match;
  
  while ((match = metadataRegex.exec(body)) !== null) {
    const key = match[1].trim();
    const value = match[2].trim();
    metadata[key] = value;
  }
  
  // Extract content blocks
  const contentRegex = /---\s*content\s*---\s*([\s\S]*?)(?=---\s*\w+\s*:|$)/g;
  let contentMatch;
  
  while ((contentMatch = contentRegex.exec(body)) !== null) {
    contentBlocks.push(contentMatch[1].trim());
  }
  
  return {
    metadata,
    content: contentBlocks.join('\n\n'),
    // The remaining content after removing metadata blocks
    rawContent: body.replace(metadataRegex, '').trim()
  };
};

// Test function to verify GitHub API access
export const testGitHubAPIAccess = async () => {
  try {
    console.log('Testing GitHub API access...');
    const response = await axiosInstance.get('/rate_limit');
    console.log('API Access successful. Rate limit info:', response.data);
    return true;
  } catch (error) {
    console.error('GitHub API access test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return false;
  }
};

// Create an object with all the exported functions
const githubAPI = {
  getIssuesByLabel,
  getIssueByNumber,
  getIssueComments,
  parseIssueBody,
  testGitHubAPIAccess
};

export default githubAPI;
