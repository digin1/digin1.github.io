import Link from 'next/link';
import SocialLinks from '@/components/common/SocialLinks';
import ReadingLayout from '@/components/editorial/ReadingLayout';
import CTASection from '@/components/sections/CTASection';

export default function AboutClient({ content }) {
  if (!content)
    return (
      <div className="editorial-container inner-page">
        <h1 className="font-display text-page-title">About content is not available.</h1>
      </div>
    );
  const { metadata: m } = content;
  const skills = String(m.skills || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return (
    <>
      <div className="editorial-container inner-page about-page">
        <header className="about-masthead">
          <div>
            <p className="eyebrow">04 / About me</p>
            <h1>
              A curious mind.
              <br />
              <em>A practical maker.</em>
            </h1>
            <p className="about-intro">
              I’m {m.name || 'Digin Dominic'}, a Software Engineer at the University of Edinburgh. I
              build research platforms, microscopy pipelines, browser-based visualisation, and
              infrastructure for neuroscience.
            </p>
            <p className="about-intro">
              A non-linear path through systems, security, and research software — with a common
              thread of making complex things useful.
            </p>
            <div className="about-actions">
              <Link href="/contact/" className="btn-primary">
                Let’s talk <span aria-hidden="true">↗</span>
              </Link>
              <a
                href="/Digin_Dominic_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-text-link"
              >
                Resume (PDF) <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <figure className="about-portrait">
            <div>
              <img
                src={m.image || '/images/digin.png'}
                alt={m.name || 'Digin Dominic'}
                width="400"
                height="400"
              />
            </div>
            <figcaption>
              <span>{m.name || 'Digin Dominic'}</span>
              <span>{m.location || 'Edinburgh, Scotland'}</span>
            </figcaption>
          </figure>
        </header>
        <ReadingLayout
          headings={content.headings || []}
          label="The story so far"
          aside={
            <div className="reading-aside-section about-facts">
              <p className="eyebrow">A few particulars</p>
              <dl>
                <div>
                  <dt>Currently</dt>
                  <dd>
                    {m.role || 'Software Engineer'}
                    <br />
                    {m.organization || 'University of Edinburgh'}
                  </dd>
                </div>
                <div>
                  <dt>Based in</dt>
                  <dd>{m.location || 'Edinburgh, Scotland'}</dd>
                </div>
                {m.languages && (
                  <div>
                    <dt>Languages</dt>
                    <dd>{m.languages}</dd>
                  </div>
                )}
              </dl>
              <SocialLinks include={['GitHub', 'LinkedIn', 'Email']} />
            </div>
          }
        >
          <div
            className="case-study-prose editorial-prose"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        </ReadingLayout>
        {skills.length > 0 && (
          <section className="about-toolkit" aria-labelledby="toolkit-heading">
            <div>
              <p className="eyebrow">Tools of the trade</p>
              <h2 id="toolkit-heading">
                A broad toolkit.
                <br />
                <em>One connected practice.</em>
              </h2>
              <p>
                Full-stack development, scientific computing, infrastructure, and visualisation.
              </p>
            </div>
            <ul>
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>
        )}
        {m.youtubeId && (
          <section className="about-film" aria-labelledby="film-heading">
            <div>
              <p className="eyebrow">A milestone along the way</p>
              <h2 id="film-heading">{m.youtubeTitle || 'Featured video'}</h2>
              <p>Nottingham Trent University · MSc Cyber Security</p>
            </div>
            <div className="about-video">
              <iframe
                loading="lazy"
                src={`https://www.youtube.com/embed/${m.youtubeId}`}
                title={m.youtubeTitle || 'Featured video'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}
      </div>
      <CTASection />
    </>
  );
}
