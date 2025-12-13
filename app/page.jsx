import { getContentByType, getContentById } from '@/lib/content';
import Hero from '@/components/sections/Hero';
import JourneyIntro from '@/components/sections/JourneyIntro';
import Timeline from '@/components/sections/Timeline';
import ImpactShowcase from '@/components/sections/ImpactShowcase';
import Toolkit from '@/components/sections/Toolkit';
import ScrollProgressIndicator from '@/components/common/ScrollProgressIndicator';
import CTASection from '@/components/sections/CTASection';

export const metadata = {
  title: 'Digin Dominic | Software Engineer & Research Toolsmith',
  description: 'Software Engineer, Research Toolsmith, and Data Workflow Architect. Building impactful digital solutions that bridge science and software with React, Python, and modern web technologies.',
  openGraph: {
    title: 'Digin Dominic | Software Engineer & Research Toolsmith',
    description: 'Software Engineer, Research Toolsmith, and Data Workflow Architect. Building tools that transform how researchers interact with data.',
    url: 'https://digindominic.me',
    images: ['/images/digin.png'],
  },
};

// Section definitions for scroll progress indicator
const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'journey-intro', label: 'Journey' },
  { id: 'impact-showcase', label: 'Projects' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'toolkit', label: 'Skills' },
  { id: 'cta', label: 'Contact' },
];

// Career start year for calculating years of experience
const CAREER_START_YEAR = 2017;

export default async function HomePage() {
  const heroContent = await getContentById('hero', 'hero');
  const projects = await getContentByType('projects');
  const toolkitContent = await getContentById('toolkit', 'skills');

  // Calculate dynamic stats
  const projectCount = projects.length;
  const skillsCount = toolkitContent?.metadata?.skills?.length || 0;
  const yearsExperience = new Date().getFullYear() - CAREER_START_YEAR;

  return (
    <>
      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator sections={sections} />

      {/* Hero Section - Full viewport introduction */}
      <Hero content={heroContent} />

      {/* Journey Introduction - Stats and transition */}
      <JourneyIntro
        projectCount={projectCount}
        skillsCount={skillsCount}
        yearsExperience={yearsExperience}
      />

      {/* Impact Showcase - Featured projects with storytelling */}
      <ImpactShowcase projects={projects} />

      {/* Timeline - Career journey */}
      <Timeline />

      {/* Toolkit - Skills and technologies */}
      <Toolkit content={toolkitContent} />

      {/* Call to Action - Closing section */}
      <CTASection />
    </>
  );
}
