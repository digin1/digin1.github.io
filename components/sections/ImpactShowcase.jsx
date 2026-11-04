import Link from 'next/link';
import { getTags, getYear } from '@/lib/format';
import StackPlaceholder from '@/components/common/StackPlaceholder';

const selectedIds = ['synaptopathydb', 'montageroi-segmenter'];
const captions = {
  synaptopathydb: 'Connecting the dots between synapses, genes and disease.',
  'montageroi-segmenter': 'Large-scale microscopy. Precise annotation. In the browser.',
};

export default function ImpactShowcase({ projects = [] }) {
  if (!projects.length) return null;
  const selected = selectedIds.map(id => projects.find(p => p.id === id)).filter(Boolean);
  const archive = projects.filter(p => !selectedIds.includes(p.id)).slice(0, 5);
  return (
    <section id="work" className="editorial-container selected-work" aria-labelledby="work-heading">
      <div className="editorial-section-heading">
        <div><p className="eyebrow">01 / Selected work</p><h2 id="work-heading">Built to make a difference.</h2></div>
        <Link href="/projects/" className="editorial-text-link">All projects <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="editorial-project-grid">
        {selected.map(project => (
          <article key={project.id}>
            <Link href={`/projects/${project.id}/`} className="editorial-project-link">
              <div className={`editorial-project-image ${project.id === 'synaptopathydb' ? 'project-image-inset' : ''}`}>
                {project.metadata.image ? <img src={project.metadata.image} alt={`Screenshot of ${project.metadata.title}`} loading="lazy" /> : <StackPlaceholder tags={getTags(project.metadata.tag, 5)} />}
              </div>
              <div className="editorial-project-title"><h3>{project.metadata.title}</h3><span aria-hidden="true">↗</span></div>
              <p>{captions[project.id] || project.metadata.summary}</p>
            </Link>
          </article>
        ))}
      </div>
      <div className="editorial-archive">
        <p className="eyebrow">More from the workshop</p>
        {archive.map(project => (
          <Link key={project.id} href={`/projects/${project.id}/`} className="editorial-archive-row">
            <span className="archive-year">{getYear(project.metadata.date)}</span>
            <h3>{project.metadata.title}</h3>
            <span className="archive-stack">{getTags(project.metadata.tag, 2).join(' / ')}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
        <Link href="/projects/" className="editorial-text-link mt-6 inline-flex">Explore all {projects.length} projects <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}
