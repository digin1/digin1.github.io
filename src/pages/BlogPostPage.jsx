// src/pages/BlogPostPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { marked } from 'marked';
import useGithubIssues from '../hooks/useGithubIssues';
import Loader from '../components/common/Loader';

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const issueNumber = parseInt(id, 10);
  const [loading, setLoading] = useState(true);
  
  // Fetch all blog posts for validation
  const { 
    issues: blogPosts, 
    loading: blogPostsLoading 
  } = useGithubIssues('blog', null);
  
  // Fetch the specific issue by number
  const { 
    currentIssue: post, 
    loading: issueLoading, 
    error, 
    fetchIssue 
  } = useGithubIssues(null, issueNumber);
  
  // Fetch the post when the component mounts
  useEffect(() => {
    if (issueNumber && !isNaN(issueNumber)) {
      fetchIssue(issueNumber);
    } else {
      navigate('/not-found');
    }
  }, [issueNumber, fetchIssue, navigate]);

  // Set overall loading state
  useEffect(() => {
    setLoading(blogPostsLoading || issueLoading);
  }, [blogPostsLoading, issueLoading]);

  // Validate if the current issue is a blog post
  useEffect(() => {
    if (!loading && post && blogPosts) {
      // Check if this issue has the 'blog' label
      const hasBlogLabel = post.labels && 
        post.labels.some(label => label.name === 'blog');
      
      // Check if the issue number exists in our blog posts list
      const blogPostNumbers = Array.isArray(blogPosts) ? blogPosts.map(p => p.number) : [];
      const isInBlogPostsList = blogPostNumbers.includes(issueNumber);
      
      // If it's not a blog post by either check, redirect to not found
      if (!hasBlogLabel && !isInBlogPostsList) {
        console.log('Not a blog post, redirecting...');
        console.log('Labels:', post.labels);
        console.log('Blog post numbers:', blogPostNumbers);
        console.log('Current issue number:', issueNumber);
        navigate('/not-found');
      }
    }
  }, [post, blogPosts, issueNumber, loading, navigate]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center h-64">
          <Loader size="lg" color="gray" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, we couldn't find the blog post you're looking for.</p>
          <Link to="/blog" className="text-gray-900 hover:underline">
            &larr; Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/blog" className="inline-flex items-center text-gray-900 hover:underline mb-8">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Blog
      </Link>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        {post.metadata && post.metadata.image && (
          <img 
            src={post.metadata.image} 
            alt={post.title} 
            className="w-full h-64 md:h-80 object-cover object-center" 
          />
        )}
        
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center text-gray-600 mb-6">
            <span className="mr-4">
              {formatDate(post.created_at)}
            </span>
            
            {post.user && (
              <span className="flex items-center">
                <span className="mx-2">•</span>
                <img 
                  src={post.user.avatar_url} 
                  alt={post.user.login} 
                  className="w-6 h-6 rounded-full mr-2"
                />
                By {post.user.login}
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {post.labels && post.labels.map(label => (
              label.name !== 'blog' && (
                <span 
                  key={label.id} 
                  className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700"
                >
                  {label.name}
                </span>
              )
            ))}
          </div>
          
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: marked.parse(post.rawContent || '') }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;