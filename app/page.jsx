import { getAllPublications, getContentById, getContentByType, toSummary } from '@/lib/content';
import { pageMetadata } from '@/lib/site';
import Hero from '@/components/sections/Hero';
import ImpactShowcase from '@/components/sections/ImpactShowcase';
import Timeline from '@/components/sections/Timeline';
import PublicationsPreview from '@/components/sections/PublicationsPreview';
import CTASection from '@/components/sections/CTASection';

export const metadata = {
  ...pageMetadata({
    description:
      'Digin Dominic, software engineer at the University of Edinburgh, building research platforms, microscopy tools and scientific visualisations.',
    path: '/',
    socialTitle: 'Digin Dominic | Research Software Engineer',
  }),
  title: { absolute: 'Digin Dominic | Research Software Engineer' },
};

export default async function HomePage() {
  const heroContent = await getContentById('hero', 'hero');
  const projects = await getContentByType('projects');

  const publications = await getAllPublications();

  return (
    <>
      <Hero
        content={heroContent && toSummary(heroContent)}
        projectCount={projects.length}
        publicationCount={publications.length}
      />
      <ImpactShowcase projects={projects.map(toSummary)} />
      <Timeline />
      <PublicationsPreview
        publications={publications.map(({ id, role, metadata }) => ({ id, role, metadata }))}
      />
      <CTASection />
    </>
  );
}
