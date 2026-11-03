import { getContentById, toSummary } from '@/lib/content';
import ContactClient from './ContactClient';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Contact',
  description: 'Contact Digin Dominic about research software, scientific tooling, browser-based visualisation, and infrastructure-heavy engineering work.',
  path: '/contact/',
  keywords: ['contact Digin Dominic', 'research software collaboration', 'scientific tooling', 'engineering contact', 'University of Edinburgh software engineer'],
});

export default async function ContactPage() {
  const aboutContent = await getContentById('about', 'about');

  return <ContactClient aboutContent={aboutContent && toSummary(aboutContent)} />;
}
