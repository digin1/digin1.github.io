import { getContentByType, getContentById } from '@/lib/content';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Toolkit from '@/components/sections/Toolkit';

export const metadata = {
  title: 'Digin Dominic | Software Engineer',
  description: 'Software Engineer, Research Toolsmith, and Data Workflow Architect. Building impactful digital solutions with React, Python, and modern web technologies.',
  openGraph: {
    title: 'Digin Dominic | Software Engineer',
    description: 'Software Engineer, Research Toolsmith, and Data Workflow Architect.',
    url: 'https://digindominic.me',
    images: ['https://raw.githubusercontent.com/digin1/web-images/refs/heads/main/profile.webp'],
  },
};

export default async function HomePage() {
  const heroContent = await getContentById('hero', 'hero');
  const projects = await getContentByType('projects');
  const toolkitContent = await getContentById('toolkit', 'skills');

  return (
    <>
      <Hero content={heroContent} />
      <Projects projects={projects} />
      <Toolkit content={toolkitContent} />
    </>
  );
}
