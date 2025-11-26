import { getContentByType } from '@/lib/content';
import ProjectsClient from './ProjectsClient';

export const metadata = {
  title: 'Projects | Digin Dominic',
  description: 'Browse my portfolio of projects, applications, and development work.',
  openGraph: {
    title: 'Projects | Digin Dominic',
    description: 'Browse my portfolio of projects and development work.',
  },
};

export default async function ProjectsPage() {
  const projects = await getContentByType('projects');

  return <ProjectsClient projects={projects} />;
}
