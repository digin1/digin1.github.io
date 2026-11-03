import { getAllPublications, getContentById, getContentByType, toSummary } from '@/lib/content';
import { pageMetadata } from '@/lib/site';
import Hero from '@/components/sections/Hero';
import ImpactShowcase from '@/components/sections/ImpactShowcase';
import Timeline from '@/components/sections/Timeline';
import PublicationsPreview from '@/components/sections/PublicationsPreview';
import CTASection from '@/components/sections/CTASection';

export const metadata = {
  ...pageMetadata({
    description: 'Software Engineer at the University of Edinburgh. Co-first author on SynaptopathyDB (Nature Scientific Reports). Building 3D visualisations, data pipelines, and research tools for human brain synaptome mapping.',
    path: '/',
    socialTitle: 'Digin Dominic | Software Engineer & Research Toolsmith',
  }),
  title: { absolute: 'Digin Dominic | Software Engineer & Research Toolsmith, University of Edinburgh' },
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
      <PublicationsPreview publications={publications.map(({ id, role, metadata }) => ({ id, role, metadata }))} />
      <CTASection />
    </>
  );
}
