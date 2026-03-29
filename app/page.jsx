import { getContentByType, getContentById, getContentBySubfolder } from '@/lib/content';
import Hero from '@/components/sections/Hero';
import ImpactShowcase from '@/components/sections/ImpactShowcase';
import Timeline from '@/components/sections/Timeline';
import PublicationsPreview from '@/components/sections/PublicationsPreview';
import CTASection from '@/components/sections/CTASection';

export const metadata = {
  title: 'Digin Dominic | Software Engineer & Research Toolsmith — University of Edinburgh',
  description: 'Software Engineer at the University of Edinburgh. Co-first author on SynaptopathyDB (Nature Scientific Reports). Building 3D visualisations, data pipelines, and research tools for human brain synaptome mapping.',
  openGraph: {
    title: 'Digin Dominic | Software Engineer & Research Toolsmith',
    description: 'Co-first author, Scientific Reports (Nature). Building scientific software for brain research at the University of Edinburgh.',
    url: 'https://digindominic.me',
    images: ['/images/digin.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digin Dominic | Software Engineer & Research Toolsmith',
    description: 'Co-first author, Scientific Reports (Nature). Building scientific software for brain research at the University of Edinburgh.',
  },
};

export default async function HomePage() {
  const heroContent = await getContentById('hero', 'hero');
  const projects = await getContentByType('projects');

  // Get all publications for the preview
  const [mainAuthor, coAuthor, preprints] = await Promise.all([
    getContentBySubfolder('publications', 'main-author'),
    getContentBySubfolder('publications', 'co-author'),
    getContentBySubfolder('publications', 'preprint'),
  ]);
  const allPubs = [...mainAuthor, ...coAuthor, ...preprints]
    .sort((a, b) => new Date(b.metadata?.date || 0) - new Date(a.metadata?.date || 0));

  return (
    <>
      <Hero content={heroContent} />
      <ImpactShowcase projects={projects} />
      <Timeline />
      <PublicationsPreview publications={allPubs} />
      <CTASection />
    </>
  );
}
