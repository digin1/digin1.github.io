// src/pages/BlogPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useGithubIssues from '../hooks/useGithubIssues';
import Loader from '../components/common/Loader';

const BlogPostCard = ({ post }) => {
  // Extract the issue number from the URL
  const issueNumber = post.number;
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="card hover:shadow-md transition-all">
      {post.metadata?.image && (
        <img 
          src={post.metadata.image} 
          alt={post.title} 
          className="w-full h-48 object-cover object-center rounded-t-lg -mt-6 -mx-6 mb-6" 
        />
      )}
      
      <div className="p-0">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
        
        <div className="text-sm text-gray-500 mb-3">
          {formatDate(post.created_at)}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {post.labels && post.labels.map(label => (
            label.name !== 'blog' && (
              <span 
                key={label.id} 
                className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
              >
                {label.name}
              </span>
            )
          ))}
        </div>
        
        <p className="text-gray-600 mb-4">
          {post.metadata?.summary || post.metadata?.description || 
            (post.rawContent && post.rawContent.substring(0, 150) + '...')}
        </p>
        
        <Link 
          to={`/blog/${issueNumber}`}
          className="text-gray-900 hover:text-gray-700 font-medium inline-flex items-center"
        >
          Read More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

const BlogPage = () => {
  // Fetch blog posts using the 'blog' label
  const { 
    issues: blogPosts, 
    loading: blogPostsLoading,
    error
  } = useGithubIssues('blog', null);

  if (blogPostsLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-10 text-center text-gray-900">Blog</h1>
        <div className="flex justify-center">
          <Loader size="lg" color="gray" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-10 text-center text-gray-900">Blog</h1>
        <div className="text-center text-red-600">
          Error loading blog posts. Please try again later.
        </div>
      </div>
    );
  }

  // Make sure blogPosts is an array before mapping over it
  const blogPostsArray = Array.isArray(blogPosts) ? blogPosts : [];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-900">Blog</h1>
      
      {blogPostsArray.length === 0 ? (
        <div className="text-center text-gray-600 bg-white border border-gray-200 rounded-lg p-8 max-w-2xl mx-auto">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
          </svg>
          <h3 className="text-xl font-semibold mb-2">No blog posts available yet</h3>
          <p>Check back soon for new content!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPostsArray.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;