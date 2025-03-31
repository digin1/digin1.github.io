// src/pages/BlogPostPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Import Helmet for SEO
import { marked } from 'marked';
import useGithubIssues from '../hooks/useGithubIssues';
import Loader from '../components/common/Loader';

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const issueNumber = parseInt(id, 10);
  const [loading, setLoading] = useState(true);
  const [processedContent, setProcessedContent] = useState('');
  const [postTags, setPostTags] = useState([]);

  const { issues: blogPosts, loading: blogPostsLoading } = useGithubIssues('blog', null);
  const { currentIssue: post, loading: issueLoading, error, fetchIssue } = useGithubIssues(
    null,
    issueNumber
  );

  useEffect(() => {
    if (issueNumber && !isNaN(issueNumber)) {
      fetchIssue(issueNumber);
    } else {
      navigate('/not-found');
    }
  }, [issueNumber, fetchIssue, navigate]);

  useEffect(() => {
    if (post && post.rawContent) {
      let cleanedContent = post.rawContent;
      if (cleanedContent.includes('---content:')) {
        cleanedContent = cleanedContent.split('---content:')[1].trim();
      } else {
        cleanedContent = cleanedContent
          .replace(/^---summary:.*$/gm, '')
          .replace(/^.*---image:.*$/gm, '')
          .replace(/\n{3,}/g, '\n\n')
          .trim();
      }
      setProcessedContent(cleanedContent);
      
      // Extract and process tags if they exist
      if (post.metadata?.tag) {
        const tags = post.metadata.tag.split(',').map(tag => tag.trim());
        setPostTags(tags);
      } else {
        setPostTags([]);
      }
    }
  }, [post]);

  useEffect(() => {
    setLoading(blogPostsLoading || issueLoading);
  }, [blogPostsLoading, issueLoading]);

  useEffect(() => {
    if (!loading && post && blogPosts) {
      const hasBlogLabel = post.labels?.some((label) => label.name === 'blog');
      const blogPostNumbers = Array.isArray(blogPosts) ? blogPosts.map((p) => p.number) : [];
      const isInBlogPostsList = blogPostNumbers.includes(issueNumber);
      if (!hasBlogLabel && !isInBlogPostsList) {
        console.log('Not a blog post, redirecting...');
        console.log('Labels:', post.labels);
        console.log('Blog post numbers:', blogPostNumbers);
        console.log('Current issue number:', issueNumber);
        navigate('/not-found');
      }
    }
  }, [post, blogPosts, issueNumber, loading, navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <section className="container mx-auto px-4 py-16">
          <Helmet>
            <title>Loading Blog Post | Your Portfolio Website</title>
            <meta name="description" content="Loading blog post details..." />
          </Helmet>
          <div className="flex justify-center items-center h-64">
            <Loader size="lg" color="gray" />
          </div>
        </section>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <section className="container mx-auto px-4 py-16">
          <Helmet>
            <title>Blog Post Not Found | Your Portfolio Website</title>
            <meta name="description" content="The requested blog post could not be found." />
          </Helmet>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-8">Sorry, we couldn't find the blog post you're looking for.</p>
            <Link to="/blog" className="text-gray-900 hover:underline">
              ← Back to Blog
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="container mx-auto px-4 py-12">
        <Helmet>
          <title>{`${post.title} | Portfolio Website`}</title>
          <meta
            name="description"
            content={
              post.metadata?.summary ||
              processedContent.substring(0, 160) ||
              'Read this blog post on Portfolio Website.'
            }
          />
          <meta
            name="keywords"
            content={`blog, article, ${post.labels?.map((label) => label.name).join(', ')}, ${postTags.join(', ')}`}
          />
          <meta name="author" content={post.user?.login || 'Your Name'} />
          {/* Open Graph Tags */}
          <meta property="og:title" content={post.title} />
          <meta
            property="og:description"
            content={
              post.metadata?.summary ||
              processedContent.substring(0, 160) ||
              'Read this blog post on Your Portfolio Website.'
            }
          />
          <meta property="og:image" content={post.metadata?.image || 'https://yourdomain.com/default-image.jpg'} />
          <meta property="og:url" content={`https://digindominic.me/blog/${issueNumber}`} />
          <meta property="og:type" content="article" />
          {/* Structured Data */}
          <script type="application/ld+json">{`
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": "${post.title}",
              "datePublished": "${post.created_at}",
              "author": {
                "@type": "Person",
                "name": "${post.user?.login || 'Your Name'}",
                "url": "https://github.com/${post.user?.login || ''}"
              },
              "image": "${post.metadata?.image || 'https://yourdomain.com/default-image.jpg'}",
              "description": "${post.metadata?.summary || processedContent.substring(0, 160)}",
              "keywords": "${postTags.join(', ')}",
              "publisher": {
                "@type": "Organization",
                "name": "Portfolio Website",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://raw.githubusercontent.com/digin1/web-images/refs/heads/main/digin.png"
                }
              }
            }
          `}</script>
        </Helmet>

        <Link to="/blog" className="inline-flex items-center text-gray-900 hover:underline mb-8">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Blog
        </Link>

        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          {post.metadata?.image && (
            <figure className="w-full">
              <img
                src={post.metadata.image}
                alt={post.title}
                className="w-full object-cover object-center"
                loading="lazy" // Lazy load image
              />
            </figure>
          )}
          <div className="p-6 md:p-8">
            <header>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              <div className="flex flex-wrap items-center text-gray-600 mb-2">
                <time className="mr-4" dateTime={post.created_at}>
                  {formatDate(post.created_at)}
                </time>
                {post.user && (
                  <span className="flex items-center">
                    <span className="mx-2">•</span>
                    <img
                      src={post.user.avatar_url}
                      alt={`${post.user.login}'s avatar`}
                      className="w-6 h-6 rounded-full mr-2"
                      loading="lazy" // Lazy load avatar
                    />
                    By{' '}
                    <a
                      href={`https://github.com/${post.user.login}`}
                      target="_blank"
                      rel="noopener noreferrer author"
                      className="text-blue-600 hover:underline ml-1"
                    >
                      {post.user.login}
                    </a>
                  </span>
                )}
              </div>
            </header>
            
            {/* GitHub Labels */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.labels &&
                post.labels.map(
                  (label) =>
                    label.name !== 'blog' && (
                      <span
                        key={label.id}
                        className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700"
                      >
                        {label.name}
                      </span>
                    )
                )}
            </div>
            
            {/* Custom Tags */}
            {postTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {postTags.map((tag, index) => (
                  <Link 
                    key={index}
                    to={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
            
            <section
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: marked.parse(processedContent) }}
            />
          </div>
        </article>
      </section>
    </div>
  );
};

export default BlogPostPage;