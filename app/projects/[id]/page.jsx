import { notFound } from 'next/navigation';
import { getContentById, getAllContentIds } from '@/lib/content';
import ProjectClient from './ProjectClient';

export async function generateStaticParams() {
  const ids = getAllContentIds('projects');
  return ids.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }) {
  const project = await getContentById('projects', params.id);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.metadata.title} | Digin Dominic`,
    description: project.metadata.summary || '',
    openGraph: {
      title: project.metadata.title,
      description: project.metadata.summary || '',
      images: project.metadata.image ? [project.metadata.image] : [],
    },
  };
}

export default async function ProjectPage({ params }) {
  const project = await getContentById('projects', params.id);

  if (!project) {
    notFound();
  }

  return <ProjectClient project={project} />;
}
