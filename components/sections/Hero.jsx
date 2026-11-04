import Link from 'next/link';

export default function Hero({ content, projectCount, publicationCount }) {
  const { name = 'Digin Dominic', profileImage = '/images/digin.png' } = content?.metadata || {};
  return (
    <section id="hero" className="editorial-container" aria-labelledby="hero-heading">
      <div className="editorial-hero">
        <div>
          <p className="eyebrow hero-eyebrow"><span className="status-dot" aria-hidden="true" />Software engineer · University of Edinburgh</p>
          <h1 id="hero-heading">Good science.<br />Thoughtful<br /><em>software.</em></h1>
          <div className="hero-bio">
            <img src={profileImage} width="68" height="68" alt={name} className="hero-portrait" />
            <p><strong>Hi, I’m {name.split(' ')[0]}.</strong> I design and build software for science. Research platforms, thoughtful tools, and the systems that connect them.</p>
          </div>
          <div className="hero-actions">
            <Link href="/projects/" className="btn-primary">Explore my work <span aria-hidden="true">↗</span></Link>
            <Link href="/about/" className="editorial-text-link">A little about me</Link>
          </div>
        </div>
        <Link href="/projects/neurosphere-3d-brain-atlas/" className="hero-field-note" aria-label="Explore NeuroSphere, an interactive 3D brain atlas">
          <div className="field-note-label"><span>Field notes / 001</span><span>Software × neuroscience</span></div>
          <div className="field-note-image"><img src="/images/neurosphere.jpg" width="2048" height="1076" alt="NeuroSphere’s interactive human brain atlas with colour-coded anatomical regions" fetchPriority="high" /></div>
          <div className="field-note-caption"><div><p>Making the brain explorable.</p><span>NeuroSphere / Interactive 3D atlas</span></div><span aria-hidden="true">↗</span></div>
          <span className="discovery-stamp" aria-hidden="true">Built for<br />discovery<span>✳</span></span>
        </Link>
      </div>
      <dl className="editorial-credentials">
        <div><dt>Edinburgh</dt><dd>Genes to Cognition Programme</dd></div>
        <div><dt>Scientific Reports</dt><dd>Published co-first author</dd></div>
        <div><dt>{projectCount} projects</dt><dd>Research, tools & systems</dd></div>
        <div><dt>{publicationCount} publications</dt><dd>Neuroscience & research software</dd></div>
      </dl>
    </section>
  );
}
