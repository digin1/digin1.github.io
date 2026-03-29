import { getContentById } from '@/lib/content';
import AboutClient from './AboutClient';

export const metadata = {
  title: 'About',
  description: 'Background, career path, and working style of Digin Dominic — from Linux systems and security to research software engineering at the University of Edinburgh.',
  keywords: ['Digin Dominic', 'about', 'research software engineer', 'University of Edinburgh', 'scientific software', 'Linux systems', 'SynaptopathyDB', 'neuroscience tooling'],
  openGraph: {
    title: 'About | Digin Dominic',
    description: 'Career path, technical range, and research software work at the University of Edinburgh.',
    url: 'https://digindominic.me/about',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Digin Dominic',
    description: 'Career path, technical range, and research software work at the University of Edinburgh.',
  },
  alternates: {
    canonical: 'https://digindominic.me/about',
  },
};

export default async function AboutPage() {
  const content = await getContentById('about', 'about');

  return <AboutClient content={content} />;
}
