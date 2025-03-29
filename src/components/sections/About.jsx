import React from 'react';
import { marked } from 'marked';

// YouTube Video Component (unchanged)
const YouTubeVideo = ({ videoId, title = "YouTube video player" }) => {
  if (!videoId) return null;
  return (
    <div className="video-container">
      <div className="relative w-full pb-[56.25%]">
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

const About = ({ content, loading }) => {
  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/3 animate-pulse">
              <div className="bg-gray-200 h-80 w-full rounded-lg"></div>
            </div>
            <div className="lg:w-2/3 animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!content) {
    return (
      <section className="py-16 bg-white" id="about">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">About Me</h2>
          <p className="text-gray-600 text-center">About content is not available. Please check the GitHub Issues.</p>
        </div>
      </section>
    );
  }

  const hasAboutLabel = content.labels?.some(label =>
    typeof label === 'string' ? label === 'about' : (label.name && label.name === 'about')
  );

  if (!hasAboutLabel) {
    return (
      <section className="py-16 bg-white" id="about">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">About Me</h2>
          <p className="text-gray-600 text-center">
            About content is misconfigured. Please add the 'about' label to the GitHub Issue.
          </p>
        </div>
      </section>
    );
  }

  // Extract metadata from body if missing
  if (!content.metadata || Object.keys(content.metadata).length === 0) {
    if (content.body) {
      const jsonMetadataRegex = /```json\s*([\s\S]*?)\s*```/;
      const jsonMatch = content.body.match(jsonMetadataRegex);
      if (jsonMatch && jsonMatch[1]) {
        try {
          content.metadata = JSON.parse(jsonMatch[1].trim());
          content.rawContent = content.body.replace(/## Metadata\s*```json[\s\S]*?```/, '').trim();
        } catch (err) {
          console.error('Error parsing JSON metadata:', err);
        }
      }
    }
  }

  const title = content.metadata?.title || 'About Me';
  const image = content.metadata?.image;
  const skills = content.metadata?.skills || [];
  const skillsArray = typeof skills === 'string' ? skills.split(',').map(skill => skill.trim()) : Array.isArray(skills) ? skills : [];
  const hasYouTubeVideo = Boolean(content.metadata?.youtubeId);

  return (
    <section className="py-16 bg-white" id="about">
      <div className="container mx-auto px-4">
        {/* Hero Media Section - Only Profile Image */}
        {image && (
          <div className="mb-12 text-center">
            <img
              src={image}
              alt={content.metadata?.name || 'Profile'}
              className="rounded-lg shadow-lg w-full max-w-md mx-auto h-[450px] object-cover border border-gray-200"
            />
          </div>
        )}

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Main Text */}
          <div className="lg:col-span-2">
            {!((content.rawContent || content.body || '').includes('# About Me')) && (
              <h2 className="text-4xl font-bold mb-6 text-gray-900">{title}</h2>
            )}
            {(content.rawContent || content.body) ? (
              <div
                className="prose max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: marked.parse(content.rawContent || content.body || '') }}
              />
            ) : (
              <p className="text-gray-600">No content available for the About section.</p>
            )}
          </div>

          {/* Right Column: Skills, Education, Contact */}
          <div className="lg:col-span-1 space-y-8">
            {/* Skills */}
            {skillsArray.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skillsArray.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Education with YouTube Video */}
            {hasYouTubeVideo && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Education</h3>
                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-gray-800">
                    {content.metadata?.youtubeTitle || 'Masters Graduation Video'}
                  </h4>
                  <YouTubeVideo
                    videoId={content.metadata.youtubeId}
                    title={content.metadata?.youtubeTitle || 'Masters Graduation Video'}
                  />
                </div>
              </div>
            )}

            {/* Contact Information */}
            {(content.metadata?.email || content.metadata?.phone || content.metadata?.location || content.metadata?.languages) && (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Contact Information</h3>
                <ul className="space-y-3 text-gray-700">
                  {content.metadata?.email && (
                    <li className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${content.metadata.email}`} className="hover:text-blue-600 transition-colors">
                        {content.metadata.email}
                      </a>
                    </li>
                  )}
                  {content.metadata?.phone && (
                    <li className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${content.metadata.phone}`} className="hover:text-blue-600 transition-colors">
                        {content.metadata.phone}
                      </a>
                    </li>
                  )}
                  {content.metadata?.location && (
                    <li className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{content.metadata.location}</span>
                    </li>
                  )}
                  {content.metadata?.languages && (
                    <li className="flex items-center">
                      <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                      <span>{content.metadata.languages}</span>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;