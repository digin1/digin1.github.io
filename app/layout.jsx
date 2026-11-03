import '@fortawesome/fontawesome-svg-core/styles.css';
import './globals.css';
import { config as faConfig } from '@fortawesome/fontawesome-svg-core';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Script from 'next/script';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteUrl, siteName, ogImage, pageUrl, absoluteUrl, jsonLdScript, socialLinks } from '@/lib/site';

// The stylesheet is imported above, so stop Font Awesome injecting it at
// runtime (which made icons flash at full size before JS loaded).
faConfig.autoAddCss = false;

const GA_MEASUREMENT_ID = 'G-9KKL3BNRNY';

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
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Prevent flash of light mode — set dark before paint */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){}` }} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/android-chrome-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#09090B" />
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
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-deep-space focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ghost-white dark:focus:bg-ghost-white dark:focus:text-deep-space"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 pt-20 focus:outline-none">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
