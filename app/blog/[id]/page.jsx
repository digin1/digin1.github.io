import { notFound } from 'next/navigation';
import { getContentById, getAllContentIds } from '@/lib/content';
import BlogPostClient from './BlogPostClient';

export async function generateStaticParams() {
  const ids = getAllContentIds('blog');
  return ids.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }) {
  const post = await getContentById('blog', params.id);
  if (!post) return { title: 'Blog Post Not Found' };

  return {
    title: `${post.metadata.title} | Digin Dominic`,
    description: post.metadata.summary || '',
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.summary || '',
      type: 'article',
      images: post.metadata.image ? [post.metadata.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getContentById('blog', params.id);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
