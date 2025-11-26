import { getContentById } from '@/lib/content';
import AboutClient from './AboutClient';

export const metadata = {
  title: 'About',
  description: 'Learn more about Digin Dominic - Full Stack Developer with expertise in React, Node.js, Python, and modern web technologies. Background, skills, and professional journey.',
  keywords: ['about', 'Digin Dominic', 'full stack developer', 'software engineer', 'React developer', 'biography', 'skills'],
  openGraph: {
    title: 'About | Digin Dominic',
    description: 'Learn more about Digin Dominic - Full Stack Developer with expertise in modern web technologies.',
    url: 'https://digindominic.me/about',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Digin Dominic',
    description: 'Learn more about Digin Dominic - Full Stack Developer.',
  },
  alternates: {
    canonical: 'https://digindominic.me/about',
  },
};

export default async function AboutPage() {
  const content = await getContentById('about', 'about');

  return <AboutClient content={content} />;
}
