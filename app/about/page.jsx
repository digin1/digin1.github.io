import { getContentById } from '@/lib/content';
import AboutClient from './AboutClient';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'About',
  description: 'Background, career path, and working style of Digin Dominic, from Linux systems and security to research software engineering at the University of Edinburgh.',
  path: '/about/',
  type: 'profile',
  keywords: ['Digin Dominic', 'about', 'research software engineer', 'University of Edinburgh', 'scientific software', 'Linux systems', 'SynaptopathyDB', 'neuroscience tooling'],
});

export default async function AboutPage() {
  const content = await getContentById('about', 'about');

  return <AboutClient content={content} />;
}
