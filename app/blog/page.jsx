import { getContentByType, toSummary } from '@/lib/content';
import BlogClient from './BlogClient';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Software Engineering Notes',
  description:
    'Practical notes from Digin Dominic on research software, Linux infrastructure, automation and the engineering decisions behind useful systems.',
  path: '/blog/',
  keywords: [
    'writing',
    'research software',
    'technical notes',
    'infrastructure',
    'visualisation',
    'engineering blog',
  ],
});

export default async function BlogPage() {
  const posts = await getContentByType('blog');

  return <BlogClient posts={posts.map(toSummary)} />;
}
