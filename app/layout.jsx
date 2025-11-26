import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const siteUrl = 'https://digindominic.me';
const siteName = 'Digin Dominic';
const siteDescription = 'Full Stack Developer & Software Engineer specializing in React, Node.js, Python, and modern web technologies. Building scalable applications and research tools.';
const siteImage = 'https://raw.githubusercontent.com/digin1/web-images/refs/heads/main/profile.webp';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Digin Dominic | Full Stack Developer & Software Engineer',
    template: '%s | Digin Dominic',
  },
  description: siteDescription,
  keywords: [
    'Digin Dominic',
    'Full Stack Developer',
    'Software Engineer',
    'React Developer',
    'Node.js Developer',
    'Python Developer',
    'Web Developer',
    'Portfolio',
    'Research Tools',
    'Data Visualization',
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
    title: 'Digin Dominic | Full Stack Developer & Software Engineer',
    description: siteDescription,
    images: [
      {
        url: siteImage,
        width: 1200,
        height: 630,
        alt: 'Digin Dominic - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digin Dominic | Full Stack Developer & Software Engineer',
    description: siteDescription,
    images: [siteImage],
    creator: '@digin1',
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Digin Dominic',
    url: siteUrl,
    image: siteImage,
    jobTitle: 'Full Stack Developer',
    description: siteDescription,
    sameAs: [
      'https://github.com/digin1',
      'https://linkedin.com/in/digin',
      'https://twitter.com/digin1',
    ],
    knowsAbout: [
      'React',
      'Node.js',
      'Python',
      'JavaScript',
      'TypeScript',
      'Web Development',
      'Software Engineering',
    ],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/android-chrome-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
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
