/** Shared editorial masthead for the portfolio's inner pages. */
export default function PageIntro({ number, label, title, accent, description, children }) {
  return (
    <header className="page-intro">
      <div className="page-intro-main">
        <p className="eyebrow">
          {number ? `${number} / ` : ''}
          {label}
        </p>
        <h1>
          {title}
          {accent && (
            <>
              <br />
              <em>{accent}</em>
            </>
          )}
        </h1>
        {description && <p className="page-intro-description">{description}</p>}
      </div>
      {children && <div className="page-intro-aside">{children}</div>}
    </header>
  );
}
