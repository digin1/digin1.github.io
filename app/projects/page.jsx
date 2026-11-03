import { getContentByType, toSummary } from '@/lib/content';
import ProjectsClient from './ProjectsClient';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Work',
  description: 'Case studies across research software, scientific databases, microscopy tooling, browser-based visualisation, and infrastructure-heavy engineering work by Digin Dominic.',
  path: '/projects/',
  keywords: ['research software', 'case studies', 'scientific software', 'microscopy tooling', 'Three.js', 'Python', 'research engineering', 'data workflows'],
});

export default async function ProjectsPage() {
  const projects = await getContentByType('projects');

  return <ProjectsClient projects={projects.map(toSummary)} />;
}
