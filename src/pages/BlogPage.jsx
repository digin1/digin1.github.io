// src/pages/BlogPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Import Helmet for SEO
import useGithubIssues from '../hooks/useGithubIssues';
import Loader from '../components/common/Loader';

const BlogPostCard = ({ post }) => {
  const issueNumber = post.number;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Link to={`/blog/${issueNumber}`} className="block">
      <article className="card hover:shadow-md transition-all">
        {post.metadata?.image && (
          <figure className="flex justify-center">
            <img
              src={post.metadata.image}
              alt={post.title}
              className="w-full max-w-full h-48 object-cover object-center rounded-t-lg mb-6"
              loading="lazy" // Lazy load images
            />
          </figure>
        )}
        <div className="p-0">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
          <time className="text-sm text-gray-500 mb-3" dateTime={post.created_at}>
            {formatDate(post.created_at)}
          </time>
          <div className="flex flex-wrap gap-2 mb-3">
            {post.labels &&
              post.labels.map(
                (label) =>
                  label.name !== 'blog' && (
                    <span
                      key={label.id}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                    >
                      {label.name}
                    </span>
                  )
              )}
          </div>
          
          {post.metadata?.tag && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.metadata.tag.split(',').map((tag, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600 border border-blue-200"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
          
          <p className="text-gray-600 mb-4">
            {post.metadata?.summary ||
              post.metadata?.description ||
              (post.rawContent && post.rawContent.substring(0, 150) + '...')}
          </p>
          <div className="text-gray-900 hover:text-gray-700 font-medium inline-flex items-center">
            Read More
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
};

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTag, setActiveTag] = useState(searchParams.get('tag') || '');
  const [allTags, setAllTags] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  const { issues: blogPosts, loading: blogPostsLoading, error } = useGithubIssues('blog', null);
  
  useEffect(() => {
    if (Array.isArray(blogPosts) && blogPosts.length > 0) {
      // Extract all unique tags from blog posts
      const tags = new Set();
      blogPosts.forEach(post => {
        if (post.metadata?.tag) {
          const postTags = post.metadata.tag.split(',').map(tag => tag.trim());
          postTags.forEach(tag => tags.add(tag));
        }
      });
      setAllTags(Array.from(tags).sort());
      
      // Filter blog posts by tag
      if (activeTag) {
        const filtered = blogPosts.filter(post => {
          if (!post.metadata?.tag) return false;
          const postTags = post.metadata.tag.split(',').map(tag => tag.trim());
          return postTags.includes(activeTag);
        });
        setFilteredPosts(filtered);
      } else {
        setFilteredPosts(blogPosts);
      }
    } else {
      setFilteredPosts([]);
    }
  }, [blogPosts, activeTag]);

  const handleTagClick = (tag) => {
    // If clicking the active tag, clear the filter
    if (tag === activeTag) {
      setActiveTag('');
      setSearchParams({});
    } else {
      setActiveTag(tag);
      setSearchParams({ tag });
    }
  };

  if (blogPostsLoading) {
    return (
      <section className="py-24 bg-gray-50">
        <Helmet>
          <title>Loading Blog | Your Portfolio Website</title>
          <meta name="description" content="Loading blog posts..." />
        </Helmet>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-10 text-center text-gray-900">Blog</h1>
          <div className="flex justify-center">
            <Loader size="lg" color="gray" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-gray-50">
        <Helmet>
          <title>Blog Error | Your Portfolio Website</title>
          <meta name="description" content="An error occurred while loading blog posts." />
        </Helmet>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-10 text-center text-gray-900">Blog</h1>
          <div className="text-center text-red-600">
            Error loading blog posts. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50">
      <Helmet>
        <title>{activeTag ? `${activeTag} Blog Posts | Your Portfolio Website` : 'Blog | Your Portfolio Website'}</title>
        <meta
          name="description"
          content={activeTag 
            ? `Explore ${activeTag} blog posts on Your Portfolio Website.` 
            : 'Explore the latest blog posts on various topics from Your Portfolio Website.'}
        />
        <meta
          name="keywords"
          content={`blog, articles, ${activeTag || ''}, portfolio, Your Portfolio Website`}
        />
        {/* Open Graph Tags */}
        <meta property="og:title" content={activeTag ? `${activeTag} Blog Posts | Your Portfolio Website` : 'Blog | Your Portfolio Website'} />
        <meta
          property="og:description"
          content={activeTag 
            ? `Explore ${activeTag} blog posts on Your Portfolio Website.` 
            : 'Explore the latest blog posts on various topics from Your Portfolio Website.'}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://yourdomain.com/blog${activeTag ? `?tag=${activeTag}` : ''}`} />
        <meta
          property="og:image"
          content="https://yourdomain.com/default-blog-image.jpg"
        />
      </Helmet>
      <div className="container mx-auto px-4">
        <header>
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Blog</h1>
          
          {/* Tags filter section */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    activeTag === tag 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
              {activeTag && (
                <button
                  onClick={() => handleTagClick(activeTag)}
                  className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                >
                  Clear Filter
                </button>
              )}
            </div>
          )}
        </header>
        
        {filteredPosts.length === 0 ? (
          <div className="text-center text-gray-600 bg-white border border-gray-200 rounded-lg p-8 max-w-2xl mx-auto">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            {activeTag ? (
              <>
                <h2 className="text-xl font-semibold mb-2">No blog posts found with tag: {activeTag}</h2>
                <p>Try selecting a different tag or clear the filter.</p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-2">No blog posts available yet</h2>
                <p>Check back soon for new content!</p>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPage;