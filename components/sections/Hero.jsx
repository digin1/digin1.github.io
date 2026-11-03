import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import SocialLinks from '@/components/common/SocialLinks';

// Rendered on the server with no entrance animation: the headline is the
// largest thing on the page, so it should paint as soon as the HTML arrives.
export default function Hero({ content, projectCount, publicationCount }) {
  const metadata = content?.metadata || {};
  const name = metadata?.name || 'Digin Dominic';

  const proof = [
    'University of Edinburgh',
    'Co-first author, Scientific Reports',
    projectCount ? `${projectCount} documented projects` : null,
    publicationCount ? `${publicationCount} publications` : null,
    '8+ years in engineering',
  ].filter(Boolean);

  return (
    <section id="hero" className="pb-0 pt-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow mb-3">Software Engineer &middot; University of Edinburgh</p>

          <h1 className="text-hero font-display font-bold text-light-text dark:text-ghost-white max-w-3xl text-balance">
            Building the software that makes complex science usable.
          </h1>

          <p className="mt-4 max-w-[58ch] text-[15px] leading-7 text-light-text-secondary dark:text-zinc-400">
            I&apos;m {name}. I build research platforms, microscopy pipelines, 3D visualisations, and infrastructure for the Genes to Cognition Programme under Professor Seth Grant. Co-first author on SynaptopathyDB in <em>Scientific Reports</em>.
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400" aria-label="Highlights">
            {proof.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-neural-blue" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/projects/" className="btn-primary group">
              Browse case studies
              <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link href="/publications/" className="btn-secondary">
              Publications
            </Link>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <SocialLinks include={['GitHub', 'LinkedIn', 'X (Twitter)']} />
            <span className="h-4 w-px bg-light-border dark:bg-zinc-800" aria-hidden="true" />
            <a
              href="/Digin_Dominic_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-600 hover:text-light-text dark:text-zinc-400 dark:hover:text-ghost-white transition-colors"
            >
              Resume (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
