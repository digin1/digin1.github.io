import { notFound } from 'next/navigation';
import { getContentById, getAllContentIds, getContentByType, getNeighbours } from '@/lib/content';
import { absoluteUrl, jsonLdScript, pageMetadata, pageUrl } from '@/lib/site';
import PrevNextNav from '@/components/layout/PrevNextNav';
import ReadModeView from '@/components/projects/ReadModeView';

export async function generateStaticParams() {
  const ids = getAllContentIds('projects');
  return ids.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = await getContentById('projects', id);
  if (!project) return { title: 'Project Not Found' };

  const { title, summary, image, technologies } = project.metadata;

  return pageMetadata({
    title,
    description: summary || `${title}. A project by Digin Dominic`,
    path: `/projects/${id}/`,
    type: 'article',
    image,
    keywords: technologies,
  });
}

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const project = await getContentById('projects', id);

  if (!project) {
    notFound();
  }

  const { prev: prevProject, next: nextProject } = getNeighbours(await getContentByType('projects'), id);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.metadata.title,
    description: project.metadata.summary,
    url: pageUrl(`/projects/${id}/`),
    author: { '@type': 'Person', name: 'Digin Dominic', url: pageUrl('/') },
    dateCreated: project.metadata.date,
    image: absoluteUrl(project.metadata.image),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <PrevNextNav
          eyebrow="Case study"
          backHref="/projects/"
          backLabel="Back to Work"
          basePath="/projects"
          prev={prevProject}
          next={nextProject}
        />
        <ReadModeView project={project} />
      </div>
    </>
  );
}
