import { getContentByType } from '@/lib/content';
import ProjectsClient from './ProjectsClient';

export const metadata = {
  title: 'Work',
  description: 'Case studies across research software, scientific databases, microscopy tooling, browser-based visualisation, and infrastructure-heavy engineering work by Digin Dominic.',
  keywords: ['research software', 'case studies', 'scientific software', 'microscopy tooling', 'Three.js', 'Python', 'research engineering', 'data workflows'],
  openGraph: {
    title: 'Work | Digin Dominic',
    description: 'Case studies across research software, visualisation, infrastructure, and scientific tooling.',
    url: 'https://digindominic.me/projects',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work | Digin Dominic',
    description: 'Case studies across research software, visualisation, infrastructure, and scientific tooling.',
  },
  alternates: {
    canonical: 'https://digindominic.me/projects',
  },
};

export default async function ProjectsPage() {
  const projects = await getContentByType('projects');

  return <ProjectsClient projects={projects} />;
}
