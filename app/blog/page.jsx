import { getContentByType } from '@/lib/content';
import BlogClient from './BlogClient';

export const metadata = {
  title: 'Writing',
  description: 'Technical notes and writing from Digin Dominic on research software, infrastructure, visualisation, and practical engineering work.',
  keywords: ['writing', 'research software', 'technical notes', 'infrastructure', 'visualisation', 'engineering blog'],
  openGraph: {
    title: 'Writing | Digin Dominic',
    description: 'Technical notes on research software, infrastructure, and practical engineering work.',
    url: 'https://digindominic.me/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Writing | Digin Dominic',
    description: 'Technical notes on research software, infrastructure, and practical engineering work.',
  },
  alternates: {
    canonical: 'https://digindominic.me/blog',
  },
};

export default async function BlogPage() {
  const posts = await getContentByType('blog');

  return <BlogClient posts={posts} />;
}
