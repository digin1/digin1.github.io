import { pageMetadata, email } from '@/lib/site';
import PageIntro from '@/components/editorial/PageIntro';
import { CookieSettingsButton } from '@/components/layout/CookieConsent';

export const metadata = pageMetadata({
  title: 'Privacy & Cookies',
  description:
    'Learn how digindominic.me handles analytics, local preferences and contact messages, and how to accept, reject or change your cookie choice.',
  path: '/privacy/',
});

export default function PrivacyPage() {
  return (
    <div className="editorial-container inner-page privacy-page">
      <PageIntro
        label="Privacy"
        title="A little privacy."
        accent="A clear choice."
        description="What this website stores, what it doesn’t, and how to stay in control."
      >
        <p className="margin-note">
          No accounts. No adverts.
          <br />
          Analytics only with permission.
        </p>
      </PageIntro>
      <div className="privacy-layout">
        <aside className="privacy-sidebar">
          <p className="eyebrow">Your preferences</p>
          <p>Change your cookie choice at any time.</p>
          <CookieSettingsButton className="btn-secondary" />
          <nav aria-label="Privacy topics">
            <a href="#analytics">Analytics</a>
            <a href="#storage">On your device</a>
            <a href="#contact-form">Contact form</a>
            <a href="#your-choice">Changing your choice</a>
          </nav>
        </aside>
        <article>
          <div className="case-study-prose editorial-prose">
            <p>
              This is a personal website. It doesn&apos;t have accounts, adverts or tracking for
              marketing.
            </p>

            <h2 id="analytics">Analytics (only if you accept)</h2>
            <p>
              If you click <strong>Accept</strong> on the cookie banner, the site loads Google
              Analytics to count page views and see roughly where visitors come from. Google
              Analytics sets cookies named <code>_ga</code> and <code>_ga_*</code>, which last up to
              two years. IP addresses are anonymised.
            </p>
            <p>
              If you click <strong>Reject</strong>, or don&apos;t choose, Google Analytics
              isn&apos;t loaded and no analytics cookies are set.
            </p>

            <h2 id="storage">What is stored on your device</h2>
            <ul>
              <li>
                <code>cookie-consent</code> in local storage: remembers your Accept or Reject
                choice.
              </li>
              <li>
                <code>theme</code> in local storage: remembers whether you chose light or dark mode.
              </li>
            </ul>
            <p>Neither of these is sent anywhere.</p>

            <h2 id="contact-form">Contact form</h2>
            <p>
              Messages sent through the contact form are delivered by Formspree and used only to
              reply to you.
            </p>

            <h2 id="your-choice">Changing your choice</h2>
            <p>
              You can change your mind at any time. Withdrawing consent stops analytics and deletes
              its cookies from this site.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <CookieSettingsButton className="btn-secondary" />
            <a
              href={`mailto:${email}`}
              className="text-sm text-neural-blue underline underline-offset-2 hover:text-synapse-cyan"
            >
              Questions? {email}
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
