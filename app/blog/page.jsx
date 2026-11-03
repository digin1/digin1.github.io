import { getContentByType, toSummary } from '@/lib/content';
import BlogClient from './BlogClient';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Writing',
  description: 'Technical notes and writing from Digin Dominic on research software, infrastructure, visualisation, and practical engineering work.',
  path: '/blog/',
  keywords: ['writing', 'research software', 'technical notes', 'infrastructure', 'visualisation', 'engineering blog'],
});

export default async function BlogPage() {
  const posts = await getContentByType('blog');

  return <BlogClient posts={posts.map(toSummary)} />;
}
