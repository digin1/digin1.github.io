import { notFound } from 'next/navigation';
import { getContentById, getAllContentIds, getContentByType } from '@/lib/content';
import ProjectClient from './ProjectClient';

export async function generateStaticParams() {
  const ids = getAllContentIds('projects');
  return ids.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = await getContentById('projects', id);
  if (!project) return { title: 'Project Not Found' };

  const { title, summary, image, technologies } = project.metadata;
  const projectUrl = `https://digindominic.me/projects/${id}`;

  return {
    title: title,
    description: summary || `${title} - A project by Digin Dominic`,
    keywords: technologies || [],
    openGraph: {
      title: `${title} | Digin Dominic`,
      description: summary || '',
      url: projectUrl,
      type: 'article',
      images: [{
        url: image || '/images/digin.png',
        width: 1200,
        height: 630,
        alt: title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Digin Dominic`,
      description: summary || '',
      images: [image || '/images/digin.png'],
    },
    alternates: {
      canonical: projectUrl,
    },
  };
}

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const project = await getContentById('projects', id);

  if (!project) {
    notFound();
  }

  // Get all projects sorted by date for navigation
  const allProjects = await getContentByType('projects');
  const currentIndex = allProjects.findIndex(p => p.id === id);

  // Projects are sorted newest first (desc), so prev = newer (index-1), next = older (index+1)
  const prevProject = currentIndex > 0
    ? { id: allProjects[currentIndex - 1].id, title: allProjects[currentIndex - 1].metadata.title }
    : null;
  const nextProject = currentIndex < allProjects.length - 1
    ? { id: allProjects[currentIndex + 1].id, title: allProjects[currentIndex + 1].metadata.title }
    : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.metadata.title,
    description: project.metadata.summary,
    url: `https://digindominic.me/projects/${id}`,
    author: { '@type': 'Person', name: 'Digin Dominic', url: 'https://digindominic.me' },
    dateCreated: project.metadata.date,
    image: project.metadata.image || undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProjectClient project={project} prevProject={prevProject} nextProject={nextProject} />
    </>
  );
}
