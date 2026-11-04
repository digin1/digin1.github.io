import PortfolioImage from '@/components/common/PortfolioImage';
import { notFound } from 'next/navigation';
import { getContentById, getAllContentIds, getContentByType, getNeighbours } from '@/lib/content';
import { absoluteUrl, jsonLdScript, pageMetadata, pageUrl } from '@/lib/site';
import Link from 'next/link';
import { formatDate, getTags } from '@/lib/format';
import PrevNextNav from '@/components/layout/PrevNextNav';
import ReadingLayout from '@/components/editorial/ReadingLayout';

export async function generateStaticParams() {
  const ids = getAllContentIds('blog');
  return ids.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getContentById('blog', id);
  if (!post) return { title: 'Blog Post Not Found' };

  const { title, seoTitle, summary, seoDescription, image, date, tag, tags } = post.metadata;

  return pageMetadata({
    title: seoTitle || title,
    description: seoDescription || summary || `${title}. A blog post by Digin Dominic`,
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
    description: post.metadata.seoDescription || post.metadata.summary,
    url: pageUrl(`/blog/${id}/`),
    datePublished: post.metadata.date,
    author: { '@type': 'Person', name: 'Digin Dominic', url: pageUrl('/') },
    image: absoluteUrl(post.metadata.image),
    publisher: { '@type': 'Person', name: 'Digin Dominic' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <article className="editorial-container inner-page detail-page essay-page">
        <PrevNextNav
          eyebrow="Writing"
          backHref="/blog/"
          backLabel="Back to Writing"
          basePath="/blog"
          prev={prevPost}
          next={nextPost}
        />
        <header className="detail-masthead essay-masthead">
          <p className="eyebrow">
            From the notebook{' '}
            {date && (
              <>
                {' '}
                / <time dateTime={date}>{formatDate(date)}</time>
              </>
            )}
          </p>
          <h1>{title}</h1>
          {summary && <p className="detail-deck">{summary}</p>}
          <div className="essay-byline">
            <PortfolioImage src="/images/digin.png" sizes="40px" width="40" height="40" alt="" />
            <div>
              <span>Digin Dominic</span>
              <p>Software engineer & research toolsmith</p>
            </div>
            <ul aria-label="Topics">
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </header>
        {image && (
          <figure className="case-study-plate essay-plate">
            <PortfolioImage
              src={image}
              alt={`Illustration for ${title}`}
              fetchPriority="high"
              sizes="(min-width: 1400px) 1184px, (min-width: 640px) calc(100vw - 180px), calc(100vw - 80px)"
            />
            <figcaption>{title}</figcaption>
          </figure>
        )}
        <ReadingLayout
          headings={post.headings || []}
          label="In this essay"
          aside={
            <div className="reading-aside-section">
              <p className="eyebrow">From ideas to practice</p>
              <p className="small-note">Explore the projects behind the writing.</p>
              <Link href="/projects/" className="editorial-text-link">
                Selected work <span aria-hidden="true">↗</span>
              </Link>
            </div>
          }
        >
          <div
            className="case-study-prose editorial-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <footer className="essay-colophon">
            <p>{date ? `Published ${formatDate(date)}` : 'Technical note'} · Digin Dominic</p>
            <Link href="/blog/" className="editorial-text-link">
              Back to the notebook <span aria-hidden="true">↗</span>
            </Link>
          </footer>
        </ReadingLayout>
      </article>
    </>
  );
}
