'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faLanguage } from '@fortawesome/free-solid-svg-icons';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function YouTubeVideo({ videoId, title = "YouTube video" }) {
  if (!videoId) return null;
  return (
    <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden border border-light-border dark:border-slate-700/50">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default function AboutClient({ content }) {
  if (!content) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-card p-8 text-center max-w-xl mx-auto">
          <p className="text-light-text-secondary dark:text-muted-steel">
            About content is not available.
          </p>
        </div>
      </div>
    );
  }

  const { metadata } = content;
  const title = metadata?.title || 'About Me';
  const image = metadata?.image;
  const skills = metadata?.skills || [];
  const skillsArray = typeof skills === 'string'
    ? skills.split(',').map(skill => skill.trim())
    : Array.isArray(skills) ? skills : [];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-plasma-purple/10 text-plasma-purple text-sm font-mono mb-4 border border-plasma-purple/20">
          {'// Get to know me'}
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-light-text dark:text-ghost-white mb-4">
          About <span className="text-gradient">Me</span>
        </h1>
      </motion.div>

      {/* Profile Image */}
      {image && (
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-neural-blue to-synapse-cyan rounded-xl blur-lg opacity-30" />
            <img
              src={image}
              alt={metadata?.name || 'Profile'}
              className="relative rounded-xl w-full max-w-md mx-auto h-[450px] object-cover border border-light-border dark:border-slate-700/50 img-glow"
            />
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Left Column: Main Text */}
        <motion.div className="lg:col-span-2" variants={staggerItem}>
          {content.content && (
            <div
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-display prose-headings:text-light-text dark:prose-headings:text-ghost-white prose-p:text-light-text-secondary dark:prose-p:text-muted-steel prose-a:text-neural-blue"
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          )}
        </motion.div>

        {/* Right Column: Skills & Contact */}
        <motion.div className="lg:col-span-1 space-y-8" variants={staggerItem}>
          {/* Skills */}
          {skillsArray.length > 0 && (
            <div className="glass-card p-6">
              <h3 className="text-xl font-display font-semibold mb-4 text-light-text dark:text-ghost-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-signal-green" />
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillsArray.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-sm font-mono rounded-lg bg-neural-blue/10 text-neural-blue border border-neural-blue/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* YouTube Video */}
          {metadata?.youtubeId && (
            <div className="glass-card p-6">
              <h3 className="text-xl font-display font-semibold mb-4 text-light-text dark:text-ghost-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-synapse-cyan" />
                {metadata?.youtubeTitle || 'Featured Video'}
              </h3>
              <YouTubeVideo
                videoId={metadata.youtubeId}
                title={metadata?.youtubeTitle || 'Featured Video'}
              />
            </div>
          )}

          {/* Contact Information */}
          {(metadata?.email || metadata?.phone || metadata?.location || metadata?.languages) && (
            <div className="glass-card p-6">
              <h3 className="text-xl font-display font-semibold mb-4 text-light-text dark:text-ghost-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-plasma-purple" />
                Contact Information
              </h3>
              <ul className="space-y-4">
                {metadata?.email && (
                  <li className="flex items-center text-light-text-secondary dark:text-muted-steel">
                    <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 mr-3 text-neural-blue" />
                    <a
                      href={`mailto:${metadata.email}`}
                      className="hover:text-light-text dark:hover:text-ghost-white transition-colors"
                    >
                      {metadata.email}
                    </a>
                  </li>
                )}
                {metadata?.phone && (
                  <li className="flex items-center text-light-text-secondary dark:text-muted-steel">
                    <FontAwesomeIcon icon={faPhone} className="w-5 h-5 mr-3 text-neural-blue" />
                    <a
                      href={`tel:${metadata.phone}`}
                      className="hover:text-light-text dark:hover:text-ghost-white transition-colors"
                    >
                      {metadata.phone}
                    </a>
                  </li>
                )}
                {metadata?.location && (
                  <li className="flex items-center text-light-text-secondary dark:text-muted-steel">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-5 h-5 mr-3 text-neural-blue" />
                    <span>{metadata.location}</span>
                  </li>
                )}
                {metadata?.languages && (
                  <li className="flex items-center text-light-text-secondary dark:text-muted-steel">
                    <FontAwesomeIcon icon={faLanguage} className="w-5 h-5 mr-3 text-neural-blue" />
                    <span>{metadata.languages}</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
