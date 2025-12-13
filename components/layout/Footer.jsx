'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: faGithub, href: 'https://github.com/digin1', label: 'GitHub' },
    { icon: faLinkedin, href: 'https://linkedin.com/in/digindominic', label: 'LinkedIn' },
    { icon: faTwitter, href: 'https://twitter.com/digindominic', label: 'Twitter' },
    { icon: faEnvelope, href: 'mailto:digin13dominic@gmail.com', label: 'Email' },
  ];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="border-t border-light-border dark:border-slate-700/50 bg-light-surface dark:bg-midnight-steel/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-xl font-display font-bold text-light-text dark:text-ghost-white">
                Digin<span className="text-gradient"> Dominic</span>
              </span>
            </Link>
            <p className="mt-4 text-light-text-secondary dark:text-muted-steel max-w-xs">
              Full Stack Developer passionate about building beautiful, functional web applications.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-light-text dark:text-ghost-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="relative inline-block text-light-text-secondary dark:text-muted-steel hover:text-neural-blue transition-colors hover-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-display font-semibold text-light-text dark:text-ghost-white mb-4">
              Connect
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-light-card dark:bg-midnight-steel border border-light-border dark:border-slate-700/50 flex items-center justify-center text-light-text-secondary dark:text-muted-steel hover:text-neural-blue hover:border-neural-blue/50 hover:shadow-glow-blue hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-light-border dark:border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-light-text-secondary dark:text-muted-steel">
            © {currentYear} Digin Dominic. All rights reserved.
          </p>
          <p className="text-sm text-light-text-secondary dark:text-muted-steel">
            Built with <span className="text-neural-blue">Next.js</span> & <span className="text-synapse-cyan">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
