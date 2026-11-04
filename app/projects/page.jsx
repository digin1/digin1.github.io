import { getContentByType, toSummary } from '@/lib/content';
import ProjectsClient from './ProjectsClient';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Research Software Projects',
  description:
    'Explore Digin Dominic’s research software projects: scientific databases, microscopy tools, 3D visualisations and distributed infrastructure.',
  path: '/projects/',
  keywords: [
    'research software',
    'case studies',
    'scientific software',
    'microscopy tooling',
    'Three.js',
    'Python',
    'research engineering',
    'data workflows',
  ],
});

export default async function ProjectsPage() {
  const projects = await getContentByType('projects');

  return <ProjectsClient projects={projects.map(toSummary)} />;
}
