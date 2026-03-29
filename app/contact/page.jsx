import { getContentById } from '@/lib/content';
import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact',
  description: 'Contact Digin Dominic about research software, scientific tooling, browser-based visualisation, and infrastructure-heavy engineering work.',
  keywords: ['contact Digin Dominic', 'research software collaboration', 'scientific tooling', 'engineering contact', 'University of Edinburgh software engineer'],
  openGraph: {
    title: 'Contact | Digin Dominic',
    description: 'Open to research software and technical collaboration.',
    url: 'https://digindominic.me/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Digin Dominic',
    description: 'Open to research software and technical collaboration.',
  },
  alternates: {
    canonical: 'https://digindominic.me/contact',
  },
};

export default async function ContactPage() {
  const aboutContent = await getContentById('about', 'about');

  return <ContactClient aboutContent={aboutContent} />;
}
