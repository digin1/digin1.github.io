import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Digin Dominic | Full Stack Developer',
  description: 'Portfolio website of Digin Dominic - Full Stack Developer specializing in React, Node.js, and modern web technologies.',
  keywords: ['Digin Dominic', 'Full Stack Developer', 'React', 'Node.js', 'Portfolio'],
  authors: [{ name: 'Digin Dominic' }],
  openGraph: {
    title: 'Digin Dominic | Full Stack Developer',
    description: 'Portfolio website of Digin Dominic - Full Stack Developer',
    url: 'https://digindominic.me',
    siteName: 'Digin Dominic',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digin Dominic | Full Stack Developer',
    description: 'Portfolio website of Digin Dominic',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
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
