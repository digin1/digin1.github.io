import { notFound } from 'next/navigation';
import { getContentById, getAllContentIds, getContentByType, getNeighbours } from '@/lib/content';
import { absoluteUrl, jsonLdScript, pageMetadata, pageUrl } from '@/lib/site';
import Link from 'next/link';
import { formatDate, getTags } from '@/lib/format';
import PrevNextNav from '@/components/layout/PrevNextNav';

export async function generateStaticParams() {
  const ids = getAllContentIds('blog');
  return ids.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getContentById('blog', id);
  if (!post) return { title: 'Blog Post Not Found' };

  const { title, summary, image, date, tag, tags } = post.metadata;

  return pageMetadata({
    title,
    description: summary || `${title}. A blog post by Digin Dominic`,
    path: `/blog/${id}/`,
    type: 'article',
    image,
    keywords: tags || getTags(tag),
    openGraph: { publishedTime: date || undefined, authors: ['Digin Dominic'] },
  });
}

export default async function BlogPostPage({ params }) {
  const { id } = await params;
  const post = await getContentById('blog', id);

  if (!post) {
    notFound();
  }

  const { prev: prevPost, next: nextPost } = getNeighbours(await getContentByType('blog'), id);
  const { title, summary, image, date, tag } = post.metadata;
  const tags = getTags(tag);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.metadata.title,
    description: post.metadata.summary,
    url: pageUrl(`/blog/${id}/`),
    datePublished: post.metadata.date,
    author: { '@type': 'Person', name: 'Digin Dominic', url: pageUrl('/') },
    image: absoluteUrl(post.metadata.image),
    publisher: { '@type': 'Person', name: 'Digin Dominic' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <article className="mx-auto max-w-4xl px-4 py-4 sm:px-6 md:py-6 lg:px-8">
        <PrevNextNav
          eyebrow="Writing"
          backHref="/blog/"
          backLabel="Back to Writing"
          basePath="/blog"
          prev={prevPost}
          next={nextPost}
        />

        <header className="mb-8">
          <h1 className="max-w-3xl text-page-title font-display text-light-text text-balance dark:text-ghost-white">
            {title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-light-text-secondary dark:text-muted-steel">
            {date ? <time dateTime={date}>{formatDate(date)}</time> : null}
            {tags.length > 0 && (
              <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
                {tags.map((t) => (
                  <li key={t} className="tag">{t}</li>
                ))}
              </ul>
            )}
          </div>
          {summary ? (
            <p className="mt-4 max-w-2xl text-[1.03rem] leading-8 text-light-text-secondary dark:text-muted-steel">
              {summary}
            </p>
          ) : null}
        </header>

        {image ? (
          <figure className="mb-8 overflow-hidden rounded-lg border border-light-border dark:border-zinc-800">
            <img
              src={image}
              alt={`Illustration for ${title}`}
              fetchPriority="high"
              decoding="async"
              className="max-h-[320px] w-full object-contain"
            />
          </figure>
        ) : null}

        <div className="case-study-prose" dangerouslySetInnerHTML={{ __html: post.content }} />

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-light-border py-5 text-sm text-light-text-secondary dark:border-zinc-800 dark:text-muted-steel">
          <span>{date ? `Published ${formatDate(date)}` : 'Technical note'}</span>
          <div className="flex gap-4">
            <Link href="/projects/" className="hover:text-neural-blue">View work</Link>
            <Link href="/blog/" className="hover:text-neural-blue">All writing</Link>
          </div>
        </footer>
      </article>
    </>
  );
}
