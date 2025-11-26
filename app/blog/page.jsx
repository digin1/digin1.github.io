import { getContentByType } from '@/lib/content';
import BlogClient from './BlogClient';

export const metadata = {
  title: 'Blog',
  description: 'Read articles about web development, React, Node.js, Python, software engineering best practices, and tech insights.',
  keywords: ['blog', 'web development', 'programming', 'React', 'Node.js', 'Python', 'software engineering', 'tech articles'],
  openGraph: {
    title: 'Blog | Digin Dominic',
    description: 'Read articles about web development, programming, and tech insights.',
    url: 'https://digindominic.me/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Digin Dominic',
    description: 'Read articles about web development, programming, and tech insights.',
  },
  alternates: {
    canonical: 'https://digindominic.me/blog',
  },
};

export default async function BlogPage() {
  const posts = await getContentByType('blog');

  return <BlogClient posts={posts} />;
}
