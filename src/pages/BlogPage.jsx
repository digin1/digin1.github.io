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
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
      {post.metadata?.image && (
        <img 
          src={post.metadata.image} 
          alt={post.title} 
          className="w-full h-48 object-cover object-center" 
        />
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
        
        <div className="text-sm text-gray-500 mb-3">
          {formatDate(post.created_at)}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {post.labels && post.labels.map(label => (
            label.name !== 'blog' && (
              <span 
                key={label.id} 
                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
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
          className="text-primary hover:underline font-medium inline-flex items-center"
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
        <h1 className="text-3xl font-bold mb-10 text-center">Blog</h1>
        <div className="flex justify-center">
          <Loader size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-10 text-center">Blog</h1>
        <div className="text-center text-red-500">
          Error loading blog posts. Please try again later.
        </div>
      </div>
    );
  }

  // Make sure blogPosts is an array before mapping over it
  const blogPostsArray = Array.isArray(blogPosts) ? blogPosts : [];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-10 text-center">Blog</h1>
      
      {blogPostsArray.length === 0 ? (
        <div className="text-center text-gray-600">
          No blog posts available yet. Check back soon!
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