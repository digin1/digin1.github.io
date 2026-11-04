import { getContentById } from '@/lib/content';
import AboutClient from './AboutClient';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'About',
  description:
    'Meet Digin Dominic, a University of Edinburgh software engineer whose work connects Linux systems, cybersecurity and scientific research tools.',
  path: '/about/',
  type: 'profile',
  keywords: [
    'Digin Dominic',
    'about',
    'research software engineer',
    'University of Edinburgh',
    'scientific software',
    'Linux systems',
    'SynaptopathyDB',
    'neuroscience tooling',
  ],
});

export default async function AboutPage() {
  const content = await getContentById('about', 'about');

  return <AboutClient content={content} />;
}
