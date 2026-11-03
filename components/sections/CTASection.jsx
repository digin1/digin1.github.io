import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import SocialLinks from '@/components/common/SocialLinks';

export default function CTASection({ className = '' }) {
  return (
    <section id="contact" className={`py-16 md:py-20 ${className}`} aria-labelledby="cta-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow mb-4">Get in touch</p>
          <h2 id="cta-heading" className="text-section-heading font-display font-bold text-light-text dark:text-ghost-white">
            Interested in working together?
          </h2>
          <p className="mt-4 text-sm leading-7 text-light-text-secondary dark:text-zinc-400">
            I&apos;m open to research software engineering, scientific tooling, infrastructure, and visualisation work. Send context and I&apos;ll reply quickly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact/" className="btn-primary">
              <FontAwesomeIcon icon={faEnvelope} className="h-3.5 w-3.5" aria-hidden="true" />
              Send a message
            </Link>
          </div>
          <SocialLinks include={['GitHub', 'LinkedIn', 'Email']} iconClassName="h-5 w-5" className="mt-8 justify-center" />
        </div>
      </div>
    </section>
  );
}
