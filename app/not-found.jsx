import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFolder, faNewspaper, faUser, faEnvelope, faBookOpen } from '@fortawesome/free-solid-svg-icons';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

const quickLinks = [
  { name: 'Home', path: '/', icon: faHome },
  { name: 'Work', path: '/projects/', icon: faFolder },
  { name: 'Writing', path: '/blog/', icon: faNewspaper },
  { name: 'Publications', path: '/publications/', icon: faBookOpen },
  { name: 'About', path: '/about/', icon: faUser },
  { name: 'Contact', path: '/contact/', icon: faEnvelope },
];

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-3">Error 404</p>
        <h1 className="text-page-title font-display text-light-text dark:text-ghost-white">
          This page doesn&apos;t exist
        </h1>
        <p className="mx-auto mt-4 max-w-md text-light-text-secondary dark:text-muted-steel">
          It may have moved, or the link may be mistyped. These are good places to start.
        </p>

        <nav aria-label="Site sections" className="mt-10">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className="editorial-card group flex items-center gap-3 px-4 py-3 text-left transition-colors hover:border-zinc-400 dark:hover:border-zinc-600"
                >
                  <FontAwesomeIcon icon={link.icon} className="h-4 w-4 text-neural-blue" aria-hidden="true" />
                  <span className="text-sm font-medium text-light-text dark:text-ghost-white group-hover:text-neural-blue">
                    {link.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-10 text-sm text-light-text-secondary dark:text-muted-steel">
          Looking for something specific?{' '}
          <Link href="/contact/" className="text-neural-blue underline underline-offset-2 hover:text-synapse-cyan">
            Get in touch
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
