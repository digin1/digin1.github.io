import './globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Script from 'next/script';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const GA_MEASUREMENT_ID = 'G-9KKL3BNRNY';

const siteUrl = 'https://digindominic.me';
const siteName = 'Digin Dominic';
const siteDescription = 'Software Engineer & Research Toolsmith at the University of Edinburgh. Co-first author on SynaptopathyDB in Scientific Reports, a Nature Portfolio journal. Building research platforms, microscopy workflows, and visualisation systems for neuroscience.';
const siteImage = '/images/digin.png';

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
    locale: 'en_US',
    url: siteUrl,
    siteName: siteName,
    title: 'Digin Dominic | Software Engineer & Research Toolsmith',
    description: siteDescription,
    images: [
      {
        url: siteImage,
        width: 1200,
        height: 630,
        alt: 'Digin Dominic - Software Engineer & Research Toolsmith',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digin Dominic | Software Engineer & Research Toolsmith',
    description: siteDescription,
    images: [siteImage],
    creator: '@digin1',
  },
  alternates: {
    canonical: siteUrl,
  },
  // verification: { google: 'ADD_REAL_CODE_HERE' },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Digin Dominic',
    url: siteUrl,
    image: siteImage,
    jobTitle: 'Software Engineer & Research Toolsmith',
    worksFor: {
      '@type': 'Organization',
      name: 'University of Edinburgh',
      department: 'Genes to Cognition Programme / SIDB',
    },
    description: siteDescription,
    sameAs: [
      'https://github.com/digin1',
      'https://www.linkedin.com/in/digin/',
      'https://x.com/digin1',
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
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/projects?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
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
        <meta name="theme-color" content="#0B0F14" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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
        <ThemeProvider>
          <Header />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
