/** A persistent reading guide on desktop, followed by the original Markdown. */
export default function ReadingLayout({ headings = [], label = 'In this story', children, aside }) {
  return (
    <div className="reading-layout">
      <aside className="reading-sidebar">
        <div className="reading-sidebar-inner">
          {headings.length > 0 && (
            <nav aria-label="On this page">
              <p className="eyebrow">{label}</p>
              <ol>
                {headings.map((heading, index) => (
                  <li key={heading.slug}>
                    <a href={`#${heading.slug}`}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {heading.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {aside}
        </div>
      </aside>
      <div className="reading-content">{children}</div>
    </div>
  );
}
