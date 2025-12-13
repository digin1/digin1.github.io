import { getContentBySubfolder } from '@/lib/content';
import PublicationsClient from './PublicationsClient';

const siteUrl = 'https://digindominic.me';

export const metadata = {
  title: 'Publications',
  description: 'Academic publications, peer-reviewed research papers, and preprints by Digin Dominic in neuroscience, bioinformatics, and computational biology.',
  keywords: [
    'Digin Dominic publications',
    'research papers',
    'academic publications',
    'neuroscience research',
    'bioinformatics',
    'synaptopathy',
    'brain research',
    'computational biology',
    'peer-reviewed papers',
    'scientific publications',
  ],
  openGraph: {
    title: 'Publications | Digin Dominic',
    description: 'Academic publications, peer-reviewed research papers, and preprints in neuroscience, bioinformatics, and computational biology.',
    url: `${siteUrl}/publications`,
    type: 'website',
    images: [
      {
        url: '/images/digin.png',
        width: 1200,
        height: 630,
        alt: 'Digin Dominic - Research Publications',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Publications | Digin Dominic',
    description: 'Academic publications, peer-reviewed research papers, and preprints in neuroscience and bioinformatics.',
    images: ['/images/digin.png'],
  },
  alternates: {
    canonical: `${siteUrl}/publications`,
  },
};

function generatePublicationJsonLd(pub) {
  const { metadata, rawContent } = pub;
  return {
    '@type': 'ScholarlyArticle',
    headline: metadata.title,
    author: metadata.authors?.split(',').map(name => ({
      '@type': 'Person',
      name: name.trim().replace(/\*$/, ''),
    })),
    datePublished: metadata.date,
    publisher: {
      '@type': 'Organization',
      name: metadata.journal,
    },
    description: rawContent?.substring(0, 300),
    url: metadata.doi,
    isPartOf: {
      '@type': 'Periodical',
      name: metadata.journal,
    },
    ...(metadata.volume && { volumeNumber: metadata.volume }),
    ...(metadata.issue && { issueNumber: metadata.issue }),
    ...(metadata.pages && { pagination: metadata.pages }),
  };
}

export default async function PublicationsPage() {
  const [mainAuthor, coAuthor, preprints] = await Promise.all([
    getContentBySubfolder('publications', 'main-author'),
    getContentBySubfolder('publications', 'co-author'),
    getContentBySubfolder('publications', 'preprint'),
  ]);

  const allPubs = [...mainAuthor, ...coAuthor, ...preprints];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Publications by Digin Dominic',
    description: 'Academic publications, peer-reviewed research papers, and preprints in neuroscience, bioinformatics, and computational biology.',
    url: `${siteUrl}/publications`,
    author: {
      '@type': 'Person',
      name: 'Digin Dominic',
      url: siteUrl,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: allPubs.length,
      itemListElement: allPubs.map((pub, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: generatePublicationJsonLd(pub),
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PublicationsClient
        mainAuthorPubs={mainAuthor}
        coAuthorPubs={coAuthor}
        preprintPubs={preprints}
      />
    </>
  );
}
