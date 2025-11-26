import { getContentById } from '@/lib/content';
import AboutClient from './AboutClient';

export const metadata = {
  title: 'About | Digin Dominic',
  description: 'Learn more about Digin Dominic - Full Stack Developer with expertise in React, Node.js, and modern web technologies.',
  openGraph: {
    title: 'About | Digin Dominic',
    description: 'Learn more about Digin Dominic - Full Stack Developer.',
  },
};

export default async function AboutPage() {
  const content = await getContentById('about', 'about');

  return <AboutClient content={content} />;
}
