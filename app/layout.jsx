import '@fortawesome/fontawesome-svg-core/styles.css';
import './globals.css';
import './editorial-pages.css';
import { config as faConfig } from '@fortawesome/fontawesome-svg-core';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/layout/CookieConsent';
import { siteUrl, siteName, ogImage, pageUrl, absoluteUrl, jsonLdScript, socialLinks } from '@/lib/site';

// The stylesheet is imported above, so stop Font Awesome injecting it at
// runtime (which made icons flash at full size before JS loaded).
faConfig.autoAddCss = false;

const siteDescription = 'Software Engineer & Research Toolsmith at the University of Edinburgh. Co-first author on SynaptopathyDB in Scientific Reports, a Nature Portfolio journal. Building research platforms, microscopy workflows, and visualisation systems for neuroscience.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Digin Dominic | Software Engineer & Research Toolsmith — University of Edinburgh',
    template: '%s | Digin Dominic',
  },
  description: siteDescription,
  keywords: [
    'Digin Dominic',
    'Software Engineer',
    'Research Toolsmith',
    'University of Edinburgh',
    'neuroscience',
    'SynaptopathyDB',
    'scientific computing',
    'Three.js',
    'Python',
    'brain research',
    'synaptome',
    'data visualisation',
  ],
  authors: [{ name: 'Digin Dominic', url: siteUrl }],
  creator: 'Digin Dominic',
  publisher: 'Digin Dominic',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: pageUrl('/'),
    siteName: siteName,
    title: 'Digin Dominic | Software Engineer & Research Toolsmith',
    description: siteDescription,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digin Dominic | Software Engineer & Research Toolsmith',
    description: siteDescription,
    images: [ogImage.url],
    creator: '@digin1',
  },
  alternates: {
    canonical: pageUrl('/'),
  },
  // verification: { google: 'ADD_REAL_CODE_HERE' },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Digin Dominic',
    url: siteUrl,
    image: absoluteUrl('/images/digin.png'),
    jobTitle: 'Software Engineer & Research Toolsmith',
    worksFor: {
      '@type': 'Organization',
      name: 'University of Edinburgh',
      department: 'Genes to Cognition Programme / SIDB',
    },
    description: siteDescription,
    sameAs: [
      ...socialLinks.filter(l => l.href.startsWith('http')).map(l => l.href),
      'https://sidb.org.uk/seth-grant/digin-dominic/',
    ],
    knowsAbout: [
      'Scientific Software Development',
      'Neuroscience Research Tools',
      'Three.js 3D Visualisation',
      'Python',
      'React',
      'Docker',
      'Microscopy Data Processing',
      'Data Pipelines',
      'Linux System Administration',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Nottingham Trent University',
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    author: {
      '@type': 'Person',
      name: 'Digin Dominic',
    },
  };

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply an explicitly saved theme before paint; editorial light is the default */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}` }} />
        <link rel="icon" href="/favicon.ico?v=editorial" sizes="16x16 32x32 48x48" />
        <link rel="icon" href="/favicon.svg?v=editorial" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=editorial" />
        <link rel="manifest" href="/manifest.json?v=editorial" />
        <meta name="theme-color" content="#F4F3EB" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-deep-space focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ghost-white dark:focus:bg-ghost-white dark:focus:text-deep-space"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <Header />
          <main id="main" tabIndex={-1} className="site-main flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
