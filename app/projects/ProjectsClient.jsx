'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import PageIntro from '@/components/editorial/PageIntro';
import StackPlaceholder from '@/components/common/StackPlaceholder';
import { categoryLabels, getTags, getYear } from '@/lib/format';

const ALLOWED_FILTER_TAGS = new Set([
  'Python',
  'React',
  'Flask',
  'Three.js',
  'Docker',
  'Docker Swarm',
  'Next.js',
  'FastAPI',
  'PostgreSQL',
  'TypeScript',
  'JavaScript',
  'NumPy',
  'PyTorch',
  'CUDA',
  'D3.js',
  'Celery',
  'Redis',
  'Dask',
  'OpenCV',
  'WebGL',
  'Tailwind CSS',
  'SQLite',
  'Desktop App',
  'GPU Computing',
  'REST API',
  'Data Visualization',
  'Microscopy',
  'Neuroscience',
  'Image Processing',
]);

export default function ProjectsClient({ projects = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [showAllTags, setShowAllTags] = useState(false);
  const allTags = useMemo(
    () =>
      [...new Set(projects.flatMap((p) => getTags(p.metadata?.tag)))]
        .filter((t) => ALLOWED_FILTER_TAGS.has(t))
        .sort(),
    [projects],
  );
  const featured = useMemo(
    () =>
      projects
        .filter((p) => p.metadata?.featured)
        .sort((a, b) => (a.metadata.featuredOrder ?? 999) - (b.metadata.featuredOrder ?? 999))
        .slice(0, 2),
    [projects],
  );
  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const query = searchQuery.trim().toLowerCase();
        const searchable = [
          p.metadata.title,
          p.metadata.summary,
          p.metadata.description,
          p.metadata.tag,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return (
          (!query || searchable.includes(query)) &&
          (!activeTag || getTags(p.metadata.tag).includes(activeTag))
        );
      }),
    [projects, searchQuery, activeTag],
  );
  const hasFilters = Boolean(searchQuery.trim() || activeTag);
  const clearFilters = () => {
    setSearchQuery('');
    setActiveTag('');
  };

  return (
    <div className="editorial-container inner-page">
      <PageIntro
        number="01"
        label="The work"
        title="A workshop for"
        accent="useful software."
        description="Research platforms, scientific tools, and the systems behind them. A collection of problems explored, decisions made, and software put to work."
      >
        <div className="intro-index">
          <span>{String(projects.length).padStart(2, '0')}</span>
          <p>
            Documented projects
            <br />
            Research / commercial / independent
          </p>
        </div>
      </PageIntro>
      {!hasFilters && featured.length > 0 && (
        <section className="work-featured" aria-labelledby="featured-heading">
          <div className="section-legend">
            <h2 id="featured-heading" className="eyebrow">
              A good place to start
            </h2>
            <span className="small-note">Selected case studies</span>
          </div>
          <div className="work-featured-grid">
            {featured.map((project, index) => (
              <article key={project.id}>
                <Link href={`/projects/${project.id}/`} className="work-featured-link">
                  <div
                    className={`work-featured-image ${project.metadata.image ? 'has-image' : ''}`}
                  >
                    {project.metadata.image ? (
                      <img
                        src={project.metadata.image}
                        alt={`Screenshot of ${project.metadata.title}`}
                        loading="lazy"
                      />
                    ) : (
                      <StackPlaceholder
                        tags={getTags(project.metadata.tag, 6)}
                        label="Research infrastructure"
                      />
                    )}
                  </div>
                  <div className="work-featured-title">
                    <div>
                      <p className="eyebrow">Case study / {String(index + 1).padStart(2, '0')}</p>
                      <h3>{project.metadata.title}</h3>
                    </div>
                    <span aria-hidden="true">↗</span>
                  </div>
                  <p className="work-featured-summary">{project.metadata.summary}</p>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
      <section className="work-catalogue" aria-labelledby="archive-heading">
        <div className="catalogue-toolbar">
          <h2 id="archive-heading">The complete collection.</h2>
          <div className="search-field">
            <label htmlFor="project-search" className="sr-only">
              Search work
            </label>
            <span aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="m16 16 5 5" />
              </svg>
            </span>
            <input
              id="project-search"
              type="search"
              placeholder="Search projects…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search">
                ×
              </button>
            )}
          </div>
        </div>
        <div className="catalogue-layout">
          <aside className="catalogue-filters" aria-labelledby="tech-filter-heading">
            <div className="catalogue-filter-inner">
              <h3 id="tech-filter-heading" className="eyebrow">
                Filter by technology
              </h3>
              <div className="filter-list">
                <button
                  type="button"
                  className="filter-option"
                  aria-pressed={!activeTag}
                  onClick={() => setActiveTag('')}
                >
                  All technologies <span aria-hidden="true">↗</span>
                </button>
                {(showAllTags ? allTags : allTags.slice(0, 10)).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="filter-option"
                    aria-pressed={activeTag === tag}
                    onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
                  >
                    {tag}
                    <span aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
              {allTags.length > 10 && (
                <button
                  type="button"
                  className="editorial-text-link"
                  aria-expanded={showAllTags}
                  onClick={() => setShowAllTags((v) => !v)}
                >
                  {showAllTags ? 'Fewer technologies' : `All ${allTags.length} technologies`}{' '}
                  <span aria-hidden="true">{showAllTags ? '−' : '+'}</span>
                </button>
              )}
            </div>
          </aside>
          <div className="catalogue-results">
            <div className="results-note">
              <p role="status">
                {hasFilters
                  ? `${filtered.length} matching project${filtered.length === 1 ? '' : 's'}`
                  : `${projects.length} projects`}
              </p>
              {hasFilters && (
                <button type="button" className="editorial-text-link" onClick={clearFilters}>
                  Clear filters <span aria-hidden="true">×</span>
                </button>
              )}
            </div>
            {filtered.length ? (
              filtered.map((project, index) => (
                <article className="catalogue-project" key={project.id}>
                  <Link href={`/projects/${project.id}/`}>
                    <div className="catalogue-project-meta">
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <span>{getYear(project.metadata.date)}</span>
                      <span>{categoryLabels[project.metadata.category] || 'Project'}</span>
                    </div>
                    <div className="catalogue-project-title">
                      <h3>{project.metadata.title}</h3>
                      <span aria-hidden="true">↗</span>
                    </div>
                    <p>{project.metadata.summary || project.metadata.description}</p>
                    <div className="catalogue-project-foot">
                      <span>{project.metadata.role || 'Engineering'}</span>
                      <span>{getTags(project.metadata.tag, 3).join(' / ')}</span>
                    </div>
                  </Link>
                </article>
              ))
            ) : (
              <div className="editorial-empty">
                <h3>No projects found.</h3>
                <p>Try a broader search or another technology.</p>
                <button type="button" className="editorial-text-link" onClick={clearFilters}>
                  Clear filters ↗
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
