import PageIntro from '@/components/editorial/PageIntro';

function Publication({ publication, index, featured = false }) {
  const { metadata: m, content, role } = publication;
  return (
    <article className={`publication-entry ${featured ? 'publication-featured' : ''}`}>
      <div className="publication-margin">
        <span className="eyebrow">
          {featured ? 'Featured paper' : String(index).padStart(2, '0')}
        </span>
        <p>{m.year}</p>
        <span>{m.journal}</span>
      </div>
      <div className="publication-main">
        <div className="publication-flags">
          <span>{m.status === 'published' ? 'Peer-reviewed' : 'Preprint'}</span>
          {role === 'main-author' && (
            <span>{m.equalContribution ? 'Co-first author' : 'First author'}</span>
          )}
          {m.equalContribution && role !== 'main-author' && <span>Equal contribution</span>}
        </div>
        <h2>
          {m.doi ? (
            <a href={m.doi} target="_blank" rel="noopener noreferrer">
              {m.title}
            </a>
          ) : (
            m.title
          )}
        </h2>
        <p className="publication-authors">{m.authors}</p>
        <p className="publication-citation">
          <em>{m.journal}</em>
          {m.year && ` · ${m.year}`}
          {m.volume && ` · Vol. ${m.volume}`}
          {m.pages && ` · ${m.pages}`}
        </p>
        {content && (
          <details className="publication-abstract">
            <summary>Read abstract</summary>
            <div className="case-study-prose" dangerouslySetInnerHTML={{ __html: content }} />
          </details>
        )}
        <div className="publication-links">
          {m.doi && (
            <a
              href={m.doi}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-text-link"
            >
              View publication <span aria-hidden="true">↗</span>
            </a>
          )}
          {m.pdf && (
            <a
              href={m.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-text-link"
            >
              PDF <span aria-hidden="true">↗</span>
            </a>
          )}
          {m.pubmed && (
            <a
              href={m.pubmed}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-text-link"
            >
              PubMed <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function PublicationsList({ publications = [] }) {
  const published = publications.filter((p) => p.metadata.status === 'published');
  const featured = published.find((p) => p.role === 'main-author') || published[0];
  const remaining = publications.filter((p) => p !== featured);
  return (
    <div className="editorial-container inner-page publications-page">
      <PageIntro
        number="02"
        label="Publications"
        title="Research,"
        accent="in the open."
        description="Published papers and preprints at the intersection of neuroscience and research software. The science behind the systems."
      >
        <dl className="publication-stats">
          <div>
            <dt>Total papers</dt>
            <dd>{publications.length}</dd>
          </div>
          <div>
            <dt>Peer-reviewed</dt>
            <dd>{published.length}</dd>
          </div>
          <div>
            <dt>Preprints</dt>
            <dd>{publications.filter((p) => p.metadata.status === 'preprint').length}</dd>
          </div>
        </dl>
      </PageIntro>
      <div className="publication-collection">
        {featured && <Publication publication={featured} featured />}
        {remaining.length > 0 && (
          <div className="section-legend">
            <h2 className="eyebrow">{featured ? 'Further research' : 'All publications'}</h2>
            <span className="small-note">Newest first</span>
          </div>
        )}
        {remaining.map((pub, i) => (
          <Publication key={`${pub.role}-${pub.id}`} publication={pub} index={i + 1} />
        ))}
        {!publications.length && (
          <div className="editorial-empty">
            <h2>No publications yet.</h2>
            <p>New papers will appear here.</p>
          </div>
        )}
      </div>
      <p className="publication-endnote">
        Preprints are manuscripts that have not yet completed peer review. Publication links open
        the original source.
      </p>
    </div>
  );
}
