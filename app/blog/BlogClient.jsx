'use client';

import PortfolioImage from '@/components/common/PortfolioImage';
import { useState } from 'react';
import Link from 'next/link';
import PageIntro from '@/components/editorial/PageIntro';
import { formatDate, getTags } from '@/lib/format';

const futureTopics = [
  'How I built SynaptopathyDB',
  'Rendering large synapse datasets in the browser',
  'Microscopy tooling beyond proprietary software',
  'Infrastructure choices in research environments',
];

export default function BlogClient({ posts = [] }) {
  const [activeTag, setActiveTag] = useState('');
  const allTags = [...new Set(posts.flatMap((post) => getTags(post.metadata.tag)))].sort();
  const filtered = activeTag
    ? posts.filter((post) => getTags(post.metadata.tag).includes(activeTag))
    : posts;
  const [lead, ...archive] = filtered;
  return (
    <div className="editorial-container inner-page writing-page">
      <PageIntro
        number="03"
        label="Writing"
        title="Notes from"
        accent="the workshop."
        description="On research software, infrastructure, and the practical decisions behind useful systems. Things learned by building, written down."
      >
        <p className="margin-note">
          A working notebook.
          <br />
          Ideas, implementation notes,
          <br />
          and lessons from the field.
        </p>
      </PageIntro>
      {allTags.length > 0 && (
        <div className="writing-filters" aria-label="Filter writing by topic">
          <span className="eyebrow">Browse by topic</span>
          <div>
            <button
              type="button"
              className="topic-filter"
              aria-pressed={!activeTag}
              onClick={() => setActiveTag('')}
            >
              All writing
            </button>
            {allTags.map((tag) => (
              <button
                type="button"
                key={tag}
                className="topic-filter"
                aria-pressed={activeTag === tag}
                onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
      <p className="sr-only" role="status">
        {filtered.length} article{filtered.length === 1 ? '' : 's'}
      </p>
      {lead ? (
        <section className="lead-essay" aria-labelledby="lead-essay-title">
          <Link
            className="lead-essay-image"
            href={`/blog/${lead.id}/`}
            tabIndex={-1}
            aria-hidden="true"
          >
            {lead.metadata.image ? (
              <PortfolioImage
                src={lead.metadata.image}
                alt=""
                fetchPriority="high"
                sizes="(min-width: 1400px) 540px, (min-width: 640px) 40vw, calc(100vw - 98px)"
              />
            ) : (
              <span className="essay-placeholder" aria-hidden="true">
                Field
                <br />
                <em>notes.</em>
              </span>
            )}
          </Link>
          <div className="lead-essay-copy">
            <p className="eyebrow">Latest essay / {formatDate(lead.metadata.date)}</p>
            <h2 id="lead-essay-title">
              <Link href={`/blog/${lead.id}/`}>{lead.metadata.title}</Link>
            </h2>
            <p>{lead.metadata.summary || lead.metadata.description}</p>
            <div className="essay-topics">{getTags(lead.metadata.tag).join(' / ')}</div>
            <Link href={`/blog/${lead.id}/`} className="editorial-text-link">
              Read the essay <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      ) : (
        <div className="editorial-empty">
          <h2>No notes on this topic yet.</h2>
          <button className="editorial-text-link" onClick={() => setActiveTag('')}>
            All writing ↗
          </button>
        </div>
      )}
      {archive.length > 0 && (
        <section className="writing-archive" aria-labelledby="more-essays">
          <h2 id="more-essays" className="eyebrow">
            More from the notebook
          </h2>
          {archive.map((post) => (
            <article key={post.id}>
              <time dateTime={post.metadata.date}>{formatDate(post.metadata.date)}</time>
              <div>
                <h3>
                  <Link href={`/blog/${post.id}/`}>{post.metadata.title}</Link>
                </h3>
                <p>{post.metadata.summary || post.metadata.description}</p>
              </div>
              <Link href={`/blog/${post.id}/`} aria-label={`Read ${post.metadata.title}`}>
                ↗
              </Link>
            </article>
          ))}
        </section>
      )}
      <section className="writing-next" aria-labelledby="next-notes">
        <div>
          <p className="eyebrow">Still in the notebook</p>
          <h2 id="next-notes">More to explore.</h2>
          <p>Planned writing on the tools, datasets, and engineering choices behind the work.</p>
          <Link href="/projects/" className="editorial-text-link">
            Explore the projects <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <ol>
          {futureTopics.map((topic, i) => (
            <li key={topic}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              {topic}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
