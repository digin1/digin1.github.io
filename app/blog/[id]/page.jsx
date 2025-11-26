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

  const { title, summary, image, date, tags } = post.metadata;
  const postUrl = `https://digindominic.me/blog/${params.id}`;

  return {
    title: title,
    description: summary || `${title} - Blog post by Digin Dominic`,
    keywords: tags || [],
    openGraph: {
      title: `${title} | Digin Dominic`,
      description: summary || '',
      url: postUrl,
      type: 'article',
      publishedTime: date || undefined,
      authors: ['Digin Dominic'],
      images: image ? [{
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Digin Dominic`,
      description: summary || '',
      images: image ? [image] : [],
    },
    alternates: {
      canonical: postUrl,
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
