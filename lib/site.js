import { faGithub, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export const siteUrl = 'https://digindominic.me';
export const siteName = 'Digin Dominic';
export const email = 'digin13dominic@gmail.com';
export const ogImage = {
  url: '/images/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Digin Dominic, Software Engineer and Research Toolsmith at the University of Edinburgh',
};

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/digin1', icon: faGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/digin/', icon: faLinkedinIn },
  { label: 'X (Twitter)', href: 'https://x.com/digin1', icon: faXTwitter },
  { label: 'Email', href: `mailto:${email}`, icon: faEnvelope },
];

/** Absolute URL for a site path, with the trailing slash the static export uses. */
export function pageUrl(path = '/') {
  const clean = `/${path}`.replace(/\/+/g, '/').replace(/\/?$/, '/');
  return `${siteUrl}${clean}`;
}

/** Absolute URL for an asset path (leaves absolute URLs alone). */
export function absoluteUrl(src) {
  if (!src) return undefined;
  return /^https?:\/\//.test(src) ? src : `${siteUrl}${src.startsWith('/') ? '' : '/'}${src}`;
}

/**
 * Page metadata with the site-wide Open Graph / Twitter defaults kept.
 * Next.js replaces (does not merge) a parent's openGraph/twitter objects, so
 * every page builds them through here.
 */
export function pageMetadata({ title, socialTitle, description, path, type = 'website', image, keywords, openGraph = {} }) {
  const url = pageUrl(path);
  const images = [image ? { url: image, alt: title } : ogImage];
  const fullTitle = socialTitle || (title ? `${title} | ${siteName}` : undefined);
  return {
    ...(title && { title }),
    description,
    ...(keywords && { keywords }),
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName,
      locale: 'en_GB',
      ...(fullTitle && { title: fullTitle }),
      description,
      images,
      ...openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@digin1',
      ...(fullTitle && { title: fullTitle }),
      description,
      images: images.map(i => i.url),
    },
  };
}

/** JSON-LD serialiser that can't break out of its <script> tag. */
export function jsonLdScript(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
