import { pageMetadata, email } from '@/lib/site';
import { CookieSettingsButton } from '@/components/layout/CookieConsent';

export const metadata = pageMetadata({
  title: 'Privacy',
  description: 'How digindominic.me uses cookies and analytics, and how to change your choice.',
  path: '/privacy/',
});

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
      <article className="mx-auto max-w-3xl">
        <header className="border-b border-light-border pb-6 dark:border-zinc-800">
          <p className="eyebrow mb-2">Privacy</p>
          <h1 className="text-page-title font-display text-light-text dark:text-ghost-white">Cookies and analytics</h1>
        </header>

        <div className="case-study-prose mt-8">
          <p>
            This is a personal website. It doesn&apos;t have accounts, adverts or tracking for marketing.
          </p>

          <h2>Analytics (only if you accept)</h2>
          <p>
            If you click <strong>Accept</strong> on the cookie banner, the site loads Google Analytics to count page
            views and see roughly where visitors come from. Google Analytics sets cookies named <code>_ga</code> and{' '}
            <code>_ga_*</code>, which last up to two years. IP addresses are anonymised.
          </p>
          <p>
            If you click <strong>Reject</strong>, or don&apos;t choose, Google Analytics isn&apos;t loaded and no
            analytics cookies are set.
          </p>

          <h2>What is stored on your device</h2>
          <ul>
            <li><code>cookie-consent</code> in local storage: remembers your Accept or Reject choice.</li>
            <li><code>theme</code> in local storage: remembers whether you chose light or dark mode.</li>
          </ul>
          <p>Neither of these is sent anywhere.</p>

          <h2>Contact form</h2>
          <p>
            Messages sent through the contact form are delivered by Formspree and used only to reply to you.
          </p>

          <h2>Changing your choice</h2>
          <p>
            You can change your mind at any time. Withdrawing consent stops analytics and deletes its cookies from
            this site.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <CookieSettingsButton className="btn-secondary" />
          <a href={`mailto:${email}`} className="text-sm text-neural-blue underline underline-offset-2 hover:text-synapse-cyan">
            Questions? {email}
          </a>
        </div>
      </article>
    </div>
  );
}
