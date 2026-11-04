import PortfolioImage from '@/components/common/PortfolioImage';
import { categoryLabels, formatDate, getTags, getYear } from '@/lib/format';
import ReadingLayout from '@/components/editorial/ReadingLayout';

export default function ReadModeView({ project }) {
  const { metadata: m = {}, content, headings = [] } = project;
  const tags = getTags(m.tag);
  const facts = [
    { label: 'My role', value: m.role },
    { label: 'Duration', value: m.duration },
    { label: 'Discipline', value: categoryLabels[m.category] || 'Case study' },
    { label: 'Year', value: getYear(m.date) },
  ].filter((f) => f.value);
  const framing = [
    { label: 'The problem', value: m.problem },
    { label: 'The work', value: m.scope },
    { label: 'The outcome', value: m.outcome },
  ].filter((f) => f.value);
  return (
    <article className="case-study-article">
      <header className="detail-masthead">
        <p className="eyebrow">
          {categoryLabels[m.category] || 'Case study'}
          {m.date && (
            <>
              {' '}
              <span aria-hidden="true">/</span> <time dateTime={m.date}>{formatDate(m.date)}</time>
            </>
          )}
        </p>
        <h1>{m.title}</h1>
        {m.summary && <p className="detail-deck">{m.summary}</p>}
      </header>
      <dl className="project-facts">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="eyebrow">{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
      {m.image && (
        <figure className="case-study-plate">
          <PortfolioImage
            src={m.image}
            alt={m.imageAlt || `Screenshot of ${m.title}`}
            fetchPriority="high"
            sizes="(min-width: 1400px) 1184px, (min-width: 640px) calc(100vw - 180px), calc(100vw - 80px)"
          />
          <figcaption>
            <span>{m.title}</span>
            <span>{m.imageCaption || 'Interface / Project documentation'}</span>
          </figcaption>
        </figure>
      )}
      {framing.length > 0 && (
        <section className="project-brief" aria-label="Project brief">
          {framing.map((item, i) => (
            <div key={item.label}>
              <p className="eyebrow">
                {String(i + 1).padStart(2, '0')} / {item.label}
              </p>
              <p>{item.value}</p>
            </div>
          ))}
        </section>
      )}
      <ReadingLayout
        headings={headings}
        label="Inside the case study"
        aside={
          <>
            <div className="reading-aside-section">
              <p className="eyebrow">Built with</p>
              <ul className="reading-stack">
                {tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
            {(m.demo || m.github) && (
              <div className="reading-aside-section project-resources">
                <p className="eyebrow">Explore the project</p>
                {m.demo && (
                  <a
                    href={m.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-text-link"
                  >
                    View project <span aria-hidden="true">↗</span>
                  </a>
                )}
                {m.github && (
                  <a
                    href={m.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-text-link"
                  >
                    Source code <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            )}
          </>
        }
      >
        {m.visibilityNote && <p className="editorial-note">{m.visibilityNote}</p>}
        {Array.isArray(m.highlights) && m.highlights.length > 0 && (
          <section className="project-highlights" aria-labelledby="highlights-heading">
            <h2 id="highlights-heading" className="eyebrow">
              At a glance
            </h2>
            <ul>
              {m.highlights.map((text, i) => (
                <li key={text}>
                  <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  {text}
                </li>
              ))}
            </ul>
          </section>
        )}
        <div
          className="case-study-prose editorial-prose"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </ReadingLayout>
    </article>
  );
}
