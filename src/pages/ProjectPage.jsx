// src/pages/ProjectPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Import Helmet for SEO
import { marked } from 'marked';
import useGithubIssues from '../hooks/useGithubIssues';

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const issueNumber = parseInt(id, 10);
  const [loading, setLoading] = useState(true);
  const [processedContent, setProcessedContent] = useState('');
  const [projectTags, setProjectTags] = useState([]);

  const { currentIssue: project, loading: issueLoading, error, fetchIssue } = useGithubIssues(
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
    if (project && project.rawContent) {
      let cleanedContent = project.rawContent;
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
      if (project.metadata?.tag) {
        const tags = project.metadata.tag.split(',').map(tag => tag.trim());
        setProjectTags(tags);
      } else {
        setProjectTags([]);
      }
    }
  }, [project]);

  useEffect(() => {
    setLoading(issueLoading);
  }, [issueLoading]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen pt-20">
        <section className="container mx-auto px-4 py-12">
          <Helmet>
            <title>Loading Project | Your Portfolio Website</title>
            <meta name="description" content="Loading project details..." />
          </Helmet>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </section>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="bg-gray-50 min-h-screen pt-20">
        <section className="container mx-auto px-4 py-12">
          <Helmet>
            <title>Project Not Found | Your Portfolio Website</title>
            <meta name="description" content="The requested project could not be found." />
          </Helmet>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
            <p className="text-gray-600 mb-8">Sorry, we couldn't find the project you're looking for.</p>
            <Link to="/projects" className="text-gray-900 hover:underline">
              ← Back to Projects
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <section className="container mx-auto px-4 py-12">
        <Helmet>
          <title>{`${project.title} | Your Portfolio Website`}</title>
          <meta
            name="description"
            content={
              project.metadata?.summary ||
              processedContent.substring(0, 160) ||
              'View this project on Your Portfolio Website.'
            }
          />
          <meta
            name="keywords"
            content={`project, portfolio, ${project.labels?.map((label) => label.name).join(', ')}, ${projectTags.join(', ')}`}
          />
          <meta name="author" content={project.user?.login || 'Your Name'} />
          {/* Open Graph Tags */}
          <meta property="og:title" content={project.title} />
          <meta
            property="og:description"
            content={
              project.metadata?.summary ||
              processedContent.substring(0, 160) ||
              'View this project on Your Portfolio Website.'
            }
          />
          <meta property="og:image" content={project.metadata?.image || 'https://yourdomain.com/default-image.jpg'} />
          <meta property="og:url" content={`https://digindominic.me/projects/${issueNumber}`} />
          <meta property="og:type" content="article" />
          {/* Structured Data */}
          <script type="application/ld+json">{`
            {
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "name": "${project.title}",
              "description": "${project.metadata?.summary || processedContent.substring(0, 160)}",
              "image": "${project.metadata?.image || 'https://yourdomain.com/default-image.jpg'}",
              "author": {
                "@type": "Person",
                "name": "${project.user?.login || 'Your Name'}"
              },
              "keywords": "${projectTags.join(', ')}",
              "url": "https://digindominic.me/projects/${issueNumber}"
            }
          `}</script>
        </Helmet>

        <Link to="/projects" className="inline-flex items-center text-gray-900 hover:underline mb-12">
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
          Back to Projects
        </Link>

        <article className="card max-w-4xl mx-auto">
          {project.metadata?.image && (
            <figure className="mb-8 -mx-6 -mt-8 overflow-hidden rounded-t-lg">
              <img
                src={project.metadata.image}
                alt={project.title}
                className="w-full h-auto object-contain object-center"
                loading="lazy" // Lazy load image
              />
            </figure>
          )}
          <header>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{project.title}</h1>
          </header>
          
          {/* GitHub Labels */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.labels &&
              project.labels.map(
                (label) =>
                  label.name !== 'project' && (
                    <span
                      key={label.id}
                      className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700 border border-gray-200"
                    >
                      {label.name}
                    </span>
                  )
              )}
          </div>
          
          {/* Custom Tags */}
          {projectTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {projectTags.map((tag, index) => (
                <Link 
                  key={index}
                  to={`/projects?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
          
          {project.metadata && (project.metadata.demo || project.metadata.github) && (
            <div className="flex flex-wrap gap-4 mb-8">
              {project.metadata.demo && (
                <a
                  href={project.metadata.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary"
                >
                  Live Demo
                </a>
              )}
              {project.metadata.github && (
                <a
                  href={project.metadata.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-secondary"
                >
                  View Code
                </a>
              )}
            </div>
          )}
          <section
            className="text-gray-700 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: marked.parse(processedContent) }}
          />
        </article>
      </section>
    </div>
  );
};

export default ProjectPage;