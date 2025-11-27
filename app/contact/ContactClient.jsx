'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faPaperPlane,
  faUser,
  faMessage,
  faCheck,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ContactClient({ aboutContent }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errors, setErrors] = useState({});

  const metadata = aboutContent?.metadata || {};
  const { email, phone, location } = metadata;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('submitting');

    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || `Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success after a brief delay
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 500);
  };

  const socialLinks = [
    { href: 'https://github.com/digin1', icon: faGithub, label: 'GitHub', color: 'hover:text-gray-900 dark:hover:text-white' },
    { href: 'https://www.linkedin.com/in/digin/', icon: faLinkedinIn, label: 'LinkedIn', color: 'hover:text-blue-600' },
    { href: 'https://x.com/digin1', icon: faXTwitter, label: 'X (Twitter)', color: 'hover:text-gray-900 dark:hover:text-white' },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-synapse-cyan/10 text-synapse-cyan text-sm font-mono mb-4 border border-synapse-cyan/20">
          {'// Get in touch'}
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-light-text dark:text-ghost-white mb-4">
          Let's <span className="text-gradient">Talk</span>
        </h1>
        <p className="max-w-2xl mx-auto text-light-text-secondary dark:text-muted-steel">
          Have a project in mind or want to collaborate? I'd love to hear from you.
          Send me a message and I'll get back to you as soon as possible.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Contact Form */}
        <motion.div className="lg:col-span-3" variants={staggerItem}>
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-2xl font-display font-semibold text-light-text dark:text-ghost-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-signal-green" />
              Send a Message
            </h2>

            {status === 'success' ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-16 h-16 rounded-full bg-signal-green/10 flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faCheck} className="text-signal-green text-2xl" />
                </div>
                <h3 className="text-xl font-display font-semibold text-light-text dark:text-ghost-white mb-2">
                  Email Client Opened!
                </h3>
                <p className="text-light-text-secondary dark:text-muted-steel mb-6">
                  Your email client should have opened with the message. Complete sending from there.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-secondary"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-light-text dark:text-ghost-white mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-muted-steel"
                      />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-11 pr-4 py-3 rounded-lg bg-light-surface dark:bg-deep-space border ${
                          errors.name
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-light-border dark:border-slate-700/50 focus:ring-neural-blue'
                        } text-light-text dark:text-ghost-white placeholder-light-text-secondary dark:placeholder-muted-steel focus:outline-none focus:ring-2 transition-all`}
                        placeholder="John Doe"
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                    </div>
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-xs" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-light-text dark:text-ghost-white mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-light-text-secondary dark:text-muted-steel"
                      />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-11 pr-4 py-3 rounded-lg bg-light-surface dark:bg-deep-space border ${
                          errors.email
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-light-border dark:border-slate-700/50 focus:ring-neural-blue'
                        } text-light-text dark:text-ghost-white placeholder-light-text-secondary dark:placeholder-muted-steel focus:outline-none focus:ring-2 transition-all`}
                        placeholder="john@example.com"
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                    </div>
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="text-xs" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-light-text dark:text-ghost-white mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-light-surface dark:bg-deep-space border border-light-border dark:border-slate-700/50 text-light-text dark:text-ghost-white placeholder-light-text-secondary dark:placeholder-muted-steel focus:outline-none focus:ring-2 focus:ring-neural-blue transition-all"
                    placeholder="Project Collaboration"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-light-text dark:text-ghost-white mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FontAwesomeIcon
                      icon={faMessage}
                      className="absolute left-4 top-4 text-light-text-secondary dark:text-muted-steel"
                    />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full pl-11 pr-4 py-3 rounded-lg bg-light-surface dark:bg-deep-space border ${
                        errors.message
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-light-border dark:border-slate-700/50 focus:ring-neural-blue'
                      } text-light-text dark:text-ghost-white placeholder-light-text-secondary dark:placeholder-muted-steel focus:outline-none focus:ring-2 transition-all resize-none`}
                      placeholder="Tell me about your project or idea..."
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                  </div>
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <FontAwesomeIcon icon={faExclamationTriangle} className="text-xs" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Opening Email...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Contact Info Sidebar */}
        <motion.div className="lg:col-span-2 space-y-6" variants={staggerItem}>
          {/* Direct Contact */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-display font-semibold text-light-text dark:text-ghost-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-plasma-purple" />
              Contact Info
            </h2>
            <ul className="space-y-4">
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 text-light-text-secondary dark:text-muted-steel hover:text-neural-blue transition-colors group"
                  >
                    <span className="w-10 h-10 rounded-lg bg-neural-blue/10 flex items-center justify-center group-hover:bg-neural-blue/20 transition-colors">
                      <FontAwesomeIcon icon={faEnvelope} className="text-neural-blue" />
                    </span>
                    <span className="text-sm break-all">{email}</span>
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-3 text-light-text-secondary dark:text-muted-steel hover:text-neural-blue transition-colors group"
                  >
                    <span className="w-10 h-10 rounded-lg bg-synapse-cyan/10 flex items-center justify-center group-hover:bg-synapse-cyan/20 transition-colors">
                      <FontAwesomeIcon icon={faPhone} className="text-synapse-cyan" />
                    </span>
                    <span className="text-sm">{phone}</span>
                  </a>
                </li>
              )}
              {location && (
                <li className="flex items-center gap-3 text-light-text-secondary dark:text-muted-steel">
                  <span className="w-10 h-10 rounded-lg bg-plasma-purple/10 flex items-center justify-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-plasma-purple" />
                  </span>
                  <span className="text-sm">{location}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Social Links */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-display font-semibold text-light-text dark:text-ghost-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-signal-green" />
              Connect Online
            </h2>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-lg bg-light-surface dark:bg-midnight-steel/50 border border-light-border dark:border-slate-700/50 flex items-center justify-center text-light-text-secondary dark:text-muted-steel ${social.color} hover:border-neural-blue/50 transition-all duration-300`}
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-display font-semibold text-light-text dark:text-ghost-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neural-blue" />
              Quick Links
            </h2>
            <div className="space-y-2">
              <Link
                href="/projects"
                className="block px-4 py-2 rounded-lg text-sm text-light-text-secondary dark:text-muted-steel hover:bg-light-surface dark:hover:bg-midnight-steel/50 hover:text-light-text dark:hover:text-ghost-white transition-colors"
              >
                View My Projects →
              </Link>
              <Link
                href="/about"
                className="block px-4 py-2 rounded-lg text-sm text-light-text-secondary dark:text-muted-steel hover:bg-light-surface dark:hover:bg-midnight-steel/50 hover:text-light-text dark:hover:text-ghost-white transition-colors"
              >
                Learn About Me →
              </Link>
              <Link
                href="/blog"
                className="block px-4 py-2 rounded-lg text-sm text-light-text-secondary dark:text-muted-steel hover:bg-light-surface dark:hover:bg-midnight-steel/50 hover:text-light-text dark:hover:text-ghost-white transition-colors"
              >
                Read My Blog →
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
