import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { categoryLabels, formatDate, getTags, getYear } from '@/lib/format';

function ProjectLinks({ demo, github }) {
  if (!demo && !github) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {demo ? (
        <a href={demo} target="_blank" rel="noopener noreferrer" className="btn-primary">
          <FontAwesomeIcon icon={faGlobe} className="h-3.5 w-3.5" aria-hidden="true" />
          View project
        </a>
      ) : null}
      {github ? (
        <a href={github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
          <FontAwesomeIcon icon={faGithub} className="h-3.5 w-3.5" aria-hidden="true" />
          Source code
        </a>
      ) : null}
    </div>
  );
}

function QuickFacts({ metadata, tags, headings }) {
  const facts = [
    { label: 'Role', value: metadata?.role },
    { label: 'Duration', value: metadata?.duration },
    { label: 'Type', value: categoryLabels[metadata?.category] || 'Case study' },
    { label: 'Year', value: getYear(metadata?.date) },
  ].filter((fact) => fact.value);

  return (
    <div className="editorial-card p-5 lg:sticky lg:top-28">
      <dl className="grid grid-cols-2 gap-4 lg:grid-cols-1">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="meta-label">{fact.label}</dt>
            <dd className="mt-1 text-sm font-semibold leading-6 text-light-text dark:text-ghost-white">{fact.value}</dd>
          </div>
        ))}
      </dl>

      {(metadata?.demo || metadata?.github) ? (
        <div className="mt-5 border-t border-light-border pt-5 dark:border-zinc-800">
          <ProjectLinks demo={metadata.demo} github={metadata.github} />
        </div>
      ) : null}

      {tags.length > 0 ? (
        <div className="mt-5 border-t border-light-border pt-5 dark:border-zinc-800">
          <p className="meta-label">Stack</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag} className="tag">{tag}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {headings.length > 1 ? (
        <nav aria-label="On this page" className="mt-5 hidden border-t border-light-border pt-5 dark:border-zinc-800 lg:block">
          <p className="meta-label">On this page</p>
          <ul className="mt-3 space-y-2">
            {headings.map((heading) => (
              <li key={heading.slug}>
                <a
                  href={`#${heading.slug}`}
                  className="block text-sm leading-6 text-light-text-secondary hover:text-neural-blue dark:text-muted-steel"
                >
                  {heading.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}

export default function ReadModeView({ project }) {
  const { metadata = {}, content, headings = [] } = project;
  const tags = getTags(metadata.tag, 8);
  const category = categoryLabels[metadata.category] || 'Case study';
  const highlights = Array.isArray(metadata.highlights) ? metadata.highlights : [];
  const framing = [
    { label: 'Problem', value: metadata.problem },
    { label: 'Scope', value: metadata.scope },
    { label: 'Outcome', value: metadata.outcome },
  ].filter((item) => item.value);

  return (
    <article>
      <header className="mx-auto max-w-6xl border-b border-light-border pb-8 pt-2 dark:border-zinc-800 md:pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow">{category}</span>
          {metadata.date ? (
            <time dateTime={metadata.date} className="meta-label">{formatDate(metadata.date)}</time>
          ) : null}
        </div>

        <h1 className="mt-4 max-w-4xl text-page-title font-display text-light-text text-balance dark:text-ghost-white">
          {metadata.title}
        </h1>

        {metadata.summary ? (
          <p className="mt-5 max-w-[64ch] text-[1.03rem] leading-8 text-light-text-secondary dark:text-muted-steel">
            {metadata.summary}
          </p>
        ) : null}

        {framing.length > 0 ? (
          <dl className={`mt-6 grid gap-3 ${framing.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
            {framing.map((item) => (
              <div key={item.label} className="proof-chip">
                <dt className="meta-label">{item.label}</dt>
                <dd className="mt-2 text-sm leading-6 text-light-text-secondary dark:text-muted-steel">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </header>

      {metadata.image ? (
        <figure className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-lg border border-light-border dark:border-zinc-800">
          <img
            src={metadata.image}
            alt={`Screenshot of ${metadata.title}`}
            fetchPriority="high"
            decoding="async"
            className="w-full object-cover"
          />
        </figure>
      ) : null}

      <div className="mx-auto mt-8 grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          {metadata.visibilityNote ? (
            <p className="mb-8 max-w-[68ch] border-l-2 border-neural-blue/40 pl-4 text-sm leading-7 text-light-text-secondary dark:text-muted-steel">
              {metadata.visibilityNote}
            </p>
          ) : null}

          {highlights.length > 0 ? (
            <section aria-labelledby="highlights-heading" className="mb-10">
              <h2 id="highlights-heading" className="meta-label">Highlights</h2>
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {highlights.map((item) => (
                  <li key={item} className="proof-chip text-sm leading-6 text-light-text-secondary dark:text-muted-steel">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="case-study-prose" dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        <aside className="order-first lg:order-none" aria-label="Project details">
          <QuickFacts metadata={metadata} tags={tags} headings={headings} />
        </aside>
      </div>
    </article>
  );
}
