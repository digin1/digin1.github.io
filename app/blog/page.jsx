import { getContentByType } from '@/lib/content';
import BlogClient from './BlogClient';

export const metadata = {
  title: 'Blog | Digin Dominic',
  description: 'Explore the latest blog posts on various topics from Digin Dominic.',
  openGraph: {
    title: 'Blog | Digin Dominic',
    description: 'Explore the latest blog posts on various topics.',
  },
};

export default async function BlogPage() {
  const posts = await getContentByType('blog');

  return <BlogClient posts={posts} />;
}
