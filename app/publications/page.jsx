import { getAllPublications } from '@/lib/content';
import { jsonLdScript, pageMetadata, pageUrl } from '@/lib/site';
import PublicationsList from './PublicationsList';

export const metadata = pageMetadata({
  title: 'Publications',
  description: 'Academic publications, peer-reviewed research papers, and preprints by Digin Dominic in neuroscience, bioinformatics, and computational biology.',
  path: '/publications/',
  keywords: [
    'Digin Dominic publications',
    'research papers',
    'neuroscience research',
    'bioinformatics',
    'synaptopathy',
    'synaptome',
    'computational biology',
    'preprints',
  ],
});

const plainText = (text = '') => text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

function publicationJsonLd({ metadata, rawContent }) {
  return {
    '@type': 'ScholarlyArticle',
    headline: metadata.title,
    author: metadata.authors
      ?.split(',')
      .map(name => name.trim().replace(/\*$/, ''))
      .filter(name => name && !/^et al/i.test(name))
      .map(name => ({ '@type': 'Person', name })),
    datePublished: metadata.date,
    publisher: { '@type': 'Organization', name: metadata.journal },
    description: plainText(rawContent).slice(0, 300),
    url: metadata.doi,
    isPartOf: { '@type': 'Periodical', name: metadata.journal },
    ...(metadata.volume && { volumeNumber: metadata.volume }),
    ...(metadata.issue && { issueNumber: metadata.issue }),
    ...(metadata.pages && { pagination: metadata.pages }),
  };
}

export default async function PublicationsPage() {
  const publications = await getAllPublications();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Publications by Digin Dominic',
    description: 'Academic publications, peer-reviewed research papers, and preprints in neuroscience, bioinformatics, and computational biology.',
    url: pageUrl('/publications/'),
    author: { '@type': 'Person', name: 'Digin Dominic', url: pageUrl('/') },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: publications.length,
      itemListElement: publications.map((pub, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: publicationJsonLd(pub),
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />
      <PublicationsList
        publications={publications.map(({ id, role, metadata, content }) => ({ id, role, metadata, content }))}
      />
    </>
  );
}
