import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import SocialLinks from '@/components/common/SocialLinks';

const navLinks = [
  { name: 'Work', path: '/projects/' },
  { name: 'Writing', path: '/blog/' },
  { name: 'Publications', path: '/publications/' },
  { name: 'About', path: '/about/' },
  { name: 'Contact', path: '/contact/' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-light-border bg-light-surface/80 dark:border-zinc-800 dark:bg-midnight-steel/45">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-block text-xl font-extrabold tracking-tight text-light-text dark:text-ghost-white">
              Digin Dominic
            </Link>
            <p className="eyebrow mt-1 flex">Research software, systems, visualisation</p>
            <p className="mt-4 max-w-md text-sm leading-6 text-light-text-secondary dark:text-muted-steel">
              Software Engineer at the University of Edinburgh building research platforms, microscopy pipelines, browser-based visualisation, and infrastructure for neuroscience workflows.
            </p>
          </div>

          <nav aria-labelledby="footer-nav-heading">
            <h2 id="footer-nav-heading" className="eyebrow mb-4">Navigate</h2>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="relative inline-block text-sm text-light-text-secondary transition-colors hover:text-neural-blue dark:text-muted-steel hover-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow mb-4">Connect</h2>
            <SocialLinks variant="boxed" iconClassName="h-5 w-5" />
            <a
              href="/Digin_Dominic_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-light-text-secondary hover:text-neural-blue dark:text-muted-steel"
            >
              Resume (PDF)
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-light-border pt-6 text-sm text-light-text-secondary dark:border-zinc-800 dark:text-muted-steel md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} Digin Dominic. All rights reserved.</p>
          <p>Built with Next.js and a deliberately reader-first layout.</p>
        </div>
      </div>
    </footer>
  );
}
