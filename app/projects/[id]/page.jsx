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

  const { title, summary, image, technologies } = project.metadata;
  const projectUrl = `https://digindominic.me/projects/${params.id}`;

  return {
    title: title,
    description: summary || `${title} - A project by Digin Dominic`,
    keywords: technologies || [],
    openGraph: {
      title: `${title} | Digin Dominic`,
      description: summary || '',
      url: projectUrl,
      type: 'article',
      images: image ? [{
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Digin Dominic`,
      description: summary || '',
      images: image ? [image] : [],
    },
    alternates: {
      canonical: projectUrl,
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
