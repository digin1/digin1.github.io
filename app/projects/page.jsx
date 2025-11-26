import { getContentByType } from '@/lib/content';
import ProjectsClient from './ProjectsClient';

export const metadata = {
  title: 'Projects',
  description: 'Browse my portfolio of full-stack web applications, React projects, Node.js backends, Python tools, and data visualization dashboards.',
  keywords: ['portfolio', 'projects', 'web applications', 'React', 'Node.js', 'Python', 'data visualization', 'full stack'],
  openGraph: {
    title: 'Projects | Digin Dominic',
    description: 'Browse my portfolio of full-stack web applications and development work.',
    url: 'https://digindominic.me/projects',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Digin Dominic',
    description: 'Browse my portfolio of full-stack web applications and development work.',
  },
  alternates: {
    canonical: 'https://digindominic.me/projects',
  },
};

export default async function ProjectsPage() {
  const projects = await getContentByType('projects');

  return <ProjectsClient projects={projects} />;
}
