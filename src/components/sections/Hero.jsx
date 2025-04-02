import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const Hero = ({ content, loading }) => {
  const [isReady, setIsReady] = useState(false); // Single state to control rendering

  // Default metadata
  const defaultMetadata = {
    name: 'Digin Dominic',
    title: 'Software Engineer | Research Toolsmith | Data Workflow Architect',
    subtitle: 'I build powerful tools that bridge science and software. From high-performance image segmentation apps to intuitive 3D data visualizations, I create solutions that turn complex research into accessible, interactive, and scalable applications. Whether it\'s automating microscopy workflows or designing end-to-end pipelines for brain mapping, my work empowers scientists with the right technology—precise, efficient, and beautiful.',
    profileImage: 'https://raw.githubusercontent.com/digin1/web-images/refs/heads/main/digin.png',
    primaryCta: 'View My Work',
    primaryCtaLink: '/projects',
    secondaryCta: 'Contact Me',
    secondaryCtaLink: '/about'
  };

  const metadata = (content && content.metadata) ? content.metadata : defaultMetadata;
  const {
    name = defaultMetadata.name,
    title = defaultMetadata.title,
    subtitle = defaultMetadata.subtitle,
    profileImage = defaultMetadata.profileImage,
    primaryCta = defaultMetadata.primaryCta,
    primaryCtaLink = defaultMetadata.primaryCtaLink,
    secondaryCta = defaultMetadata.secondaryCta,
    secondaryCtaLink = defaultMetadata.secondaryCtaLink,
  } = metadata;

  const processedSubtitle = subtitle.replace(/\\n/g, '\n');
  const paragraphs = processedSubtitle.split('\n').filter(p => p.trim() !== '');

  // Preload image and control rendering
  useEffect(() => {
    if (!loading) {
      const img = new Image();
      img.onload = () => setIsReady(true);
      img.onerror = () => setIsReady(true); // Fallback to render content even on error
      img.src = profileImage;
    } else {
      setIsReady(false); // Reset when loading starts
    }
  }, [loading, profileImage]);

  const renderLoadingSkeleton = () => (
    <section className="hero py-8 md:py-16">
      <div className="container px-4 mx-auto">
        <div className="hero-content flex flex-col md:flex-row items-center">
          <div className="hero-text w-full md:w-3/4 lg:w-3/5 order-2 md:order-1 mt-8 md:mt-0">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="h-10 bg-gray-200 rounded-full w-full sm:w-32"></div>
              <div className="h-10 bg-gray-200 rounded-full w-full sm:w-32"></div>
            </div>
            <div className="flex gap-4">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <div className="hero-image w-full md:w-2/5 order-1 md:order-2 mt-8 md:mt-0">
            <div className="avatar mx-auto md:ml-auto md:mr-0 max-w-xs">
              <div className="w-full h-auto aspect-square bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderContent = () => (
    <section className="hero py-8 md:py-16">
      <div className="container px-4 mx-auto">
        <div className="hero-content flex flex-col md:flex-row items-center">
          <div className="hero-text w-full md:w-3/4 lg:w-3/5 order-2 md:order-1 mt-8 md:mt-0">
            <p className="subtitle text-base md:text-base lg:text-lg whitespace-normal break-words leading-normal">{title}</p>
            <h1 className="title text-3xl md:text-4xl lg:text-5xl font-bold mt-1 mb-3">
              Building <span className="text-primary">impactful</span> digital solutions
            </h1>
            <div className="description text-sm md:text-base">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className={index > 0 ? 'mt-4' : ''}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 mb-8">
              <Link to={primaryCtaLink} className="cta-primary py-2 px-6 rounded-full bg-primary text-white text-center hover:bg-primary-dark transition">
                <FontAwesomeIcon icon={faEye} size="sm" className="mr-2" /> {primaryCta}
              </Link>
              {secondaryCta && (
                <Link to={secondaryCtaLink} className="cta-secondary py-2 px-6 rounded-full border border-primary text-primary text-center hover:bg-primary hover:text-white transition">
                  <FontAwesomeIcon icon={faPaperPlane} size="sm" className="mr-2" /> {secondaryCta}
                </Link>
              )}
            </div>
            <div className="social-links flex gap-4">
              <a href="https://github.com/digin1" className="social-link p-2 text-gray-600 hover:text-primary transition">
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
              <a href="https://www.linkedin.com/in/digin/" className="social-link p-2 text-gray-600 hover:text-primary transition">
                <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
              </a>
              <a href="https://x.com/digin1" className="social-link p-2 text-gray-600 hover:text-primary transition">
                <FontAwesomeIcon icon={faXTwitter} size="lg" />
              </a>
            </div>
          </div>
          <div className="hero-image w-full md:w-2/5 order-1 md:order-2 mt-8 md:mt-0">
            <div className="avatar mx-auto md:ml-auto md:mr-0 max-w-xs">
              <img 
                src={profileImage} 
                alt={name}
                className="rounded-lg w-full shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/api/placeholder/400/400";
                }} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return loading || !isReady ? renderLoadingSkeleton() : renderContent();
};

export default Hero;