'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faCodeBranch, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const categoryLabels = {
  research: 'Research project',
  commercial: 'Commercial project',
  personal: 'Independent project',
  education: 'Academic project',
};

function slugify(value = '') {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractSections(rawContent = '') {
  const seen = new Map();

  return rawContent
    .split('\n')
    .map((line) => line.match(/^##\s+(.+)$/)?.[1]?.trim())
    .filter(Boolean)
    .map((title) => {
      const baseSlug = slugify(title) || 'section';
      const seenCount = seen.get(baseSlug) || 0;
      seen.set(baseSlug, seenCount + 1);

      return {
        title,
        slug: seenCount === 0 ? baseSlug : `${baseSlug}-${seenCount + 1}`,
      };
    });
}

function injectHeadingIds(html = '', sections = []) {
  let headingIndex = 0;

  return html.replace(/<h2>(.*?)<\/h2>/g, (match, headingContent) => {
    const section = sections[headingIndex];
    headingIndex += 1;

    if (!section) return match;

    return `<h2 id="${section.slug}">${headingContent}</h2>`;
  });
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function QuickFacts({ project, tags, sections = [], mobile = false }) {
  const { metadata } = project;
  const facts = [
    { label: 'Role', value: metadata?.role },
    { label: 'Duration', value: metadata?.duration },
    { label: 'Type', value: categoryLabels[metadata?.category] || 'Case study' },
    { label: 'Published', value: metadata?.date ? new Date(metadata.date).getFullYear().toString() : null },
  ].filter((fact) => fact.value);

  return (
    <div className={`editorial-card p-5 ${mobile ? '' : 'lg:sticky lg:top-28'}`}>
      <div className="border-b border-light-border pb-4 dark:border-zinc-800">
        <p className="meta-label">At a glance</p>
        <p className="mt-2 text-sm leading-6 text-light-text-secondary dark:text-muted-steel">
          This case study focuses on problem framing, implementation choices, technical constraints, and outcome.
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {facts.map((fact) => (
          <div key={fact.label} className="rounded-xl border border-light-border/80 bg-light-surface/80 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="meta-label">{fact.label}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-light-text dark:text-ghost-white">
              {fact.value}
            </p>
          </div>
        ))}
      </div>

      {(metadata?.demo || metadata?.github) ? (
        <div className="mt-5">
          <p className="meta-label">Links</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {metadata?.demo ? (
              <a
                href={metadata.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <FontAwesomeIcon icon={faGlobe} className="h-3.5 w-3.5" />
                View Project
              </a>
            ) : null}
            {metadata?.github ? (
              <a
                href={metadata.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <FontAwesomeIcon icon={faGithub} className="h-3.5 w-3.5" />
                Source Code
              </a>
            ) : null}
          </div>
        </div>
      ) : null}

      {tags.length > 0 ? (
        <div className="mt-5">
          <p className="meta-label">Stack</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {sections.length > 0 ? (
        <div className="mt-5 border-t border-light-border pt-5 dark:border-zinc-800">
          <p className="meta-label">Section outline</p>
          <nav className="mt-3 space-y-2">
            {sections.map((section) => (
              <a
                key={section.slug}
                href={`#${section.slug}`}
                className="block text-sm leading-6 text-light-text-secondary hover:text-neural-blue dark:text-muted-steel dark:hover:text-synapse-cyan"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}

export default function ReadModeView({ project }) {
  const tags = project.metadata?.tag
    ? project.metadata.tag.split(',').map((tag) => tag.trim()).filter(Boolean)
    : [];

  const topTags = tags.slice(0, 8);
  const category = categoryLabels[project.metadata?.category] || 'Case study';
  const highlights = Array.isArray(project.metadata?.highlights) ? project.metadata.highlights : [];
  const sections = extractSections(project.rawContent);
  const caseStudyContent = injectHeadingIds(project.content, sections);

  return (
    <motion.article
      className="bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <header className="border-b border-light-border dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-0 pb-8 pt-2 md:pb-10">
          <div className="grid gap-6">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <span className="eyebrow">{category}</span>
                {project.metadata?.date ? (
                  <time dateTime={project.metadata.date} className="meta-label">
                    {formatDate(project.metadata.date)}
                  </time>
                ) : null}
              </div>

              <h1 className="mt-4 max-w-[16ch] font-display font-bold text-[2.4rem] leading-[0.98] tracking-tight text-light-text dark:text-ghost-white sm:text-[3rem] md:text-[3.5rem]">
                {project.metadata?.title}
              </h1>

              {project.metadata?.summary ? (
                <p className="mt-5 max-w-[64ch] text-[1.03rem] leading-8 text-light-text-secondary dark:text-muted-steel">
                  {project.metadata.summary}
                </p>
              ) : null}

              {(project.metadata?.problem || project.metadata?.scope || project.metadata?.outcome) ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {project.metadata?.problem ? (
                    <div className="rounded-xl border border-light-border/80 bg-light-surface/80 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                      <p className="meta-label">Problem</p>
                      <p className="mt-2 text-sm leading-6 text-light-text-secondary dark:text-muted-steel">
                        {project.metadata.problem}
                      </p>
                    </div>
                  ) : null}
                  {project.metadata?.scope ? (
                    <div className="rounded-xl border border-light-border/80 bg-light-surface/80 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                      <p className="meta-label">Scope</p>
                      <p className="mt-2 text-sm leading-6 text-light-text-secondary dark:text-muted-steel">
                        {project.metadata.scope}
                      </p>
                    </div>
                  ) : null}
                  {project.metadata?.outcome ? (
                    <div className="rounded-xl border border-light-border/80 bg-light-surface/80 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                      <p className="meta-label">Outcome</p>
                      <p className="mt-2 text-sm leading-6 text-light-text-secondary dark:text-muted-steel">
                        {project.metadata.outcome}
                      </p>
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {project.metadata?.role ? (
                  <div className="rounded-xl border border-light-border/80 bg-light-surface/80 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                    <p className="meta-label">Role</p>
                    <p className="mt-2 text-sm font-semibold text-light-text dark:text-ghost-white">
                      {project.metadata.role}
                    </p>
                  </div>
                ) : null}

                {project.metadata?.duration ? (
                  <div className="rounded-xl border border-light-border/80 bg-light-surface/80 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                    <p className="meta-label">Duration</p>
                    <p className="mt-2 text-sm font-semibold text-light-text dark:text-ghost-white">
                      {project.metadata.duration}
                    </p>
                  </div>
                ) : null}

                <div className="rounded-xl border border-light-border/80 bg-light-surface/80 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="meta-label">Reading mode</p>
                  <p className="mt-2 text-sm font-semibold text-light-text dark:text-ghost-white">
                    Reader-first case study
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {project.metadata?.image ? (
        <figure className="mx-auto mt-8 max-w-6xl">
          <div className="overflow-hidden rounded-[1.4rem] border border-light-border dark:border-zinc-800">
            <img
              src={project.metadata.image}
              alt={project.metadata.title}
              loading="lazy"
              className="w-full object-cover"
            />
          </div>
        </figure>
      ) : null}

      <div className="mx-auto mt-8 max-w-6xl lg:hidden">
        <QuickFacts project={project} tags={topTags} sections={sections} mobile />
      </div>

      <div className="mx-auto mt-8 grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <div className="mb-8 rounded-2xl border border-light-border bg-light-card p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex flex-wrap items-start gap-3">
              <span className="eyebrow">Case study notes</span>
            </div>
            <p className="mt-4 max-w-[62ch] text-sm leading-7 text-light-text-secondary dark:text-muted-steel">
              {project.metadata?.visibilityNote || 'Where parts of the system are internal or institutional, this case study focuses on engineering scope, workflow design, and technical decisions rather than trying to simulate missing public artifacts.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.metadata?.demo ? (
                <a
                  href={project.metadata.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-neural-blue hover:text-synapse-cyan"
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-3.5 w-3.5" />
                  Public link
                </a>
              ) : null}
              {project.metadata?.github ? (
                <a
                  href={project.metadata.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-neural-blue hover:text-synapse-cyan"
                >
                  <FontAwesomeIcon icon={faCodeBranch} className="h-3.5 w-3.5" />
                  Repository
                </a>
              ) : null}
            </div>
          </div>

          {highlights.length > 0 ? (
            <div className="mb-8 rounded-2xl border border-light-border bg-light-card p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="meta-label">Key evidence</p>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {highlights.map((item, index) => (
                  <div key={item} className="proof-chip">
                    <p className="meta-label">
                      Evidence {String(index + 1).padStart(2, '0')}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-light-text-secondary dark:text-muted-steel">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <section
            className="case-study-prose"
            dangerouslySetInnerHTML={{ __html: caseStudyContent }}
          />
        </div>

        <aside className="hidden lg:block">
          <QuickFacts project={project} tags={topTags} sections={sections} />
        </aside>
      </div>
    </motion.article>
  );
}
