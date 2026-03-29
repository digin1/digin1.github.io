'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: faGithub, href: 'https://github.com/digin1', label: 'GitHub' },
    { icon: faLinkedin, href: 'https://www.linkedin.com/in/digin/', label: 'LinkedIn' },
    { icon: faTwitter, href: 'https://x.com/digin1', label: 'X' },
    { icon: faEnvelope, href: 'mailto:digin13dominic@gmail.com', label: 'Email' },
  ];

  const navLinks = [
    { name: 'Work', path: '/projects' },
    { name: 'Publications', path: '/publications' },
    { name: 'About', path: '/about' },
    { name: 'Writing', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="border-t border-light-border bg-light-surface/80 dark:border-zinc-800 dark:bg-midnight-steel/45">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-xl font-body font-extrabold tracking-tight text-light-text dark:text-ghost-white">
                Digin Dominic
              </span>
            </Link>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-neural-blue">
              Research software, systems, visualisation
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-light-text-secondary dark:text-muted-steel">
              Software Engineer at the University of Edinburgh building research platforms, microscopy pipelines, browser-based visualisation, and infrastructure for neuroscience workflows.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-neural-blue">
              Navigate
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="relative inline-block text-sm text-light-text-secondary dark:text-muted-steel hover:text-neural-blue transition-colors hover-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-neural-blue">
              Connect
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-light-border bg-light-card text-light-text-secondary hover:border-neural-blue/50 hover:text-neural-blue dark:border-zinc-800 dark:bg-zinc-900 dark:text-muted-steel"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
            <a
              href="/Digin_Dominic_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-light-text-secondary hover:text-neural-blue dark:text-muted-steel"
            >
              Resume
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-light-border pt-6 text-sm dark:border-zinc-800 md:flex-row md:items-center md:justify-between">
          <p className="text-light-text-secondary dark:text-muted-steel">
            © {currentYear} Digin Dominic. All rights reserved.
          </p>
          <p className="text-light-text-secondary dark:text-muted-steel">
            Built with Next.js and a deliberately reader-first layout.
          </p>
        </div>
      </div>
    </footer>
  );
}
