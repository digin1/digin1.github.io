import { getContentById } from '@/lib/content';
import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Digin Dominic. Send a message or connect via email, phone, or social media for collaboration opportunities.',
  keywords: ['contact', 'Digin Dominic', 'hire developer', 'freelance', 'collaboration', 'get in touch'],
  openGraph: {
    title: 'Contact | Digin Dominic',
    description: 'Get in touch with Digin Dominic for collaboration opportunities.',
    url: 'https://digindominic.me/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Digin Dominic',
    description: 'Get in touch with Digin Dominic for collaboration opportunities.',
  },
  alternates: {
    canonical: 'https://digindominic.me/contact',
  },
};

export default async function ContactPage() {
  const aboutContent = await getContentById('about', 'about');

  return <ContactClient aboutContent={aboutContent} />;
}
