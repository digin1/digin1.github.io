'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

export const GA_MEASUREMENT_ID = 'G-9KKL3BNRNY';
const STORAGE_KEY = 'cookie-consent'; // 'granted' | 'denied'
const OPEN_EVENT = 'open-cookie-settings';

function readChoice() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

function saveChoice(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
}

// Google Analytics is only loaded after the visitor accepts. Until then no
// analytics script runs and no analytics cookies are set.
function loadAnalytics() {
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

// Withdrawing consent: stop further tracking and remove GA's cookies.
function disableAnalytics() {
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.split('=')[0].trim();
    if (name === '_ga' || name.startsWith('_ga_') || name === '_gid' || name === '_gat') {
      domains.forEach((domain) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ''}`;
      });
    }
  });
}

/** Footer link that reopens the banner so visitors can change their choice. */
export function CookieSettingsButton({ className = '' }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={className}
    >
      Cookie settings
    </button>
  );
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const choice = readChoice();
    if (choice === 'granted') loadAnalytics();
    if (!choice) setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const choose = useCallback((value) => {
    const previous = readChoice();
    saveChoice(value);
    setOpen(false);
    if (value === 'granted') {
      window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
      loadAnalytics();
    } else {
      disableAnalytics();
      // GA may already be running on this page; a reload guarantees it stops.
      if (previous === 'granted') window.location.reload();
    }
  }, []);

  if (!open) return null;

  return (
    <section
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-lg border border-light-border bg-light-surface p-5 shadow-card-hover dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-center sm:gap-6">
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-light-text dark:text-ghost-white">Analytics cookies</h2>
          <p className="mt-1 text-sm leading-6 text-light-text-secondary dark:text-muted-steel">
            With your permission I use Google Analytics to see which pages are read. Nothing is tracked unless you accept.{' '}
            <Link href="/privacy/" className="text-neural-blue underline underline-offset-2 hover:text-synapse-cyan">
              Privacy
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          {/* Equal prominence for both choices, as the UK ICO expects. */}
          <button type="button" onClick={() => choose('denied')} className="btn-secondary">
            Reject
          </button>
          <button type="button" onClick={() => choose('granted')} className="btn-secondary">
            Accept
          </button>
        </div>
      </div>
    </section>
  );
}
