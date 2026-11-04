'use client';

export default function Error({ reset }) {
  return (
    <div className="editorial-container inner-page error-page">
      <p className="eyebrow">A brief interruption</p>
      <h1>
        Something
        <br />
        <em>went off-script.</em>
      </h1>
      <p>The page couldn’t load. Please try again.</p>
      <button type="button" onClick={reset} className="btn-primary">
        Try again <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
