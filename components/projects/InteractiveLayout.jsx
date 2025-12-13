'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExpandedCardModal from './ExpandedCardModal';
import HeroCard from './cards/HeroCard';
import TechStackCard from './cards/TechStackCard';
import LinksCard from './cards/LinksCard';
import SectionCard from './cards/SectionCard';
import FeatureListCard from './cards/FeatureListCard';
import StatsCard from './cards/StatsCard';
import QuoteCard from './cards/QuoteCard';

/**
 * Interactive bento grid layout for project content
 * Auto-organizes cards based on available content
 */
export default function InteractiveLayout({ parsedContent }) {
  const [expandedCard, setExpandedCard] = useState(null);

  const {
    title,
    summary,
    image,
    technologies,
    links,
    role,
    duration,
    category,
    sections,
    features,
    stats,
    quotes,
  } = parsedContent;

  // Build cards array based on available content
  const cards = useMemo(() => {
    const cardList = [];
    let delay = 0;

    // Hero card handled separately (full width)
    // Other cards go in masonry columns

    // Add tech stack if available
    if (technologies.length > 0) {
      cardList.push({
        type: 'tech',
        size: 'medium',
        span: '',
        delay: delay++,
        data: { technologies },
      });
    }

    // Add stats/info if available (before links)
    if (role || duration || stats.length > 0) {
      cardList.push({
        type: 'stats',
        size: 'small',
        span: '',
        delay: delay++,
        data: { role, duration, stats },
      });
    }

    // Add links after project info
    if (links.demo || links.github) {
      cardList.push({
        type: 'links',
        size: 'small',
        span: '',
        delay: delay++,
        data: { ...links },
      });
    }

    // Features card handled separately (full width with 3-col grid)

    // Section cards added dynamically in render using remainingSections

    // Add quotes if available
    if (quotes.length > 0) {
      cardList.push({
        type: 'quotes',
        size: 'small',
        span: '',
        delay: delay++,
        data: { quotes },
      });
    }

    return cardList;
  }, [title, summary, image, category, technologies, links, role, duration, stats, features, sections, quotes]);

  // Handlers
  const openCard = (cardType, data) => {
    setExpandedCard({ type: cardType, data });
  };

  const closeCard = () => {
    setExpandedCard(null);
  };

  // Render expanded card content
  const renderExpandedContent = () => {
    if (!expandedCard) return null;

    switch (expandedCard.type) {
      case 'hero':
        return (
          <div className="space-y-6">
            {image && (
              <img
                src={image}
                alt={title}
                className="w-full rounded-xl object-cover max-h-[400px]"
              />
            )}
            <p className="text-light-text-secondary dark:text-muted-steel text-lg leading-relaxed">
              {summary}
            </p>
          </div>
        );

      case 'section':
        return (
          <div
            className="prose prose-lg max-w-none dark:prose-invert
              prose-headings:font-display prose-headings:text-light-text dark:prose-headings:text-ghost-white
              prose-p:text-light-text-secondary dark:prose-p:text-muted-steel
              prose-a:text-neural-blue hover:prose-a:text-synapse-cyan
              prose-strong:text-light-text dark:prose-strong:text-ghost-white
              prose-code:text-synapse-cyan prose-code:bg-transparent
              prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-slate-800 prose-pre:text-slate-200
              prose-li:text-light-text-secondary dark:prose-li:text-muted-steel"
            dangerouslySetInnerHTML={{ __html: expandedCard.data.htmlContent }}
          />
        );

      case 'features':
        return (
          <ul className="space-y-4">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-signal-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-signal-green" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <div>
                  <span className="font-semibold text-light-text dark:text-ghost-white">
                    {feature.title}
                  </span>
                  {feature.description && (
                    <p className="text-light-text-secondary dark:text-muted-steel mt-1">
                      {feature.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        );

      case 'quotes':
        return (
          <div className="space-y-6">
            {quotes.map((quote, idx) => (
              <blockquote
                key={idx}
                className="border-l-4 border-neural-blue pl-4 py-2 italic text-light-text dark:text-ghost-white"
              >
                "{quote.text}"
                {quote.author && (
                  <footer className="mt-2 text-sm text-light-text-secondary dark:text-muted-steel not-italic">
                    — {quote.author}
                  </footer>
                )}
              </blockquote>
            ))}
          </div>
        );

      case 'tech':
        return (
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-neural-blue to-synapse-cyan text-white font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  // Render individual card
  const renderCard = (card) => {
    switch (card.type) {
      case 'hero':
        return (
          <HeroCard
            key="hero"
            title={card.data.title}
            summary={card.data.summary}
            image={card.data.image}
            category={card.data.category}
            onClick={() => openCard('hero', card.data)}
            layoutId="hero-card"
            delay={card.delay}
          />
        );

      case 'tech':
        return (
          <TechStackCard
            key="tech"
            technologies={card.data.technologies}
            onClick={() => openCard('tech', card.data)}
            layoutId="tech-card"
            delay={card.delay}
          />
        );

      case 'links':
        return (
          <LinksCard
            key="links"
            demo={card.data.demo}
            github={card.data.github}
            delay={card.delay}
          />
        );

      case 'stats':
        return (
          <StatsCard
            key="stats"
            stats={card.data.stats}
            role={card.data.role}
            duration={card.data.duration}
            delay={card.delay}
          />
        );

      case 'quotes':
        return (
          <QuoteCard
            key="quotes"
            quotes={card.data.quotes}
            onClick={() => openCard('quotes', card.data)}
            layoutId="quote-card"
            delay={card.delay}
          />
        );

      default:
        return null;
    }
  };

  // Get the first section (usually "Project Overview") for full-width display
  const overviewSection = sections.find(s =>
    s.title.toLowerCase().includes('overview') ||
    s.title.toLowerCase().includes('introduction')
  ) || sections[0];

  const remainingSections = sections.filter(s => s !== overviewSection);

  return (
    <>
      {/* Hero card - full width */}
      <div className="mb-5">
        <HeroCard
          title={title}
          summary={summary}
          image={image}
          category={category}
          onClick={() => openCard('hero', { title, summary, image, category })}
          layoutId="hero-card"
          delay={0}
        />
      </div>

      {/* Project Overview - full width */}
      {overviewSection && (
        <div className="mb-5">
          <SectionCard
            title={overviewSection.title}
            preview={overviewSection.preview}
            content={overviewSection.content}
            subsections={overviewSection.subsections}
            onClick={() => openCard('section', {
              title: overviewSection.title,
              htmlContent: overviewSection.content,
            })}
            layoutId="section-card-overview"
            delay={1}
            size="large"
          />
        </div>
      )}

      {/* Features card - full width with 3-column grid */}
      {features.length > 0 && (
        <div className="mb-5">
          <FeatureListCard
            features={features}
            onClick={() => openCard('features', { features })}
            layoutId="features-card"
            delay={2}
            fullWidth
          />
        </div>
      )}

      {/* Masonry-style layout using CSS columns */}
      <motion.div
        className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Other cards (tech, links, stats, quotes) */}
        {cards.map((card) => (
          <div
            key={card.type}
            className="break-inside-avoid mb-4 md:mb-5"
          >
            {renderCard(card)}
          </div>
        ))}

        {/* Remaining section cards */}
        {remainingSections.map((section, index) => (
          <div
            key={`section-${index}`}
            className="break-inside-avoid mb-4 md:mb-5"
          >
            <SectionCard
              title={section.title}
              preview={section.preview}
              content={section.content}
              subsections={section.subsections}
              onClick={() => openCard('section', {
                title: section.title,
                htmlContent: section.content,
              })}
              layoutId={`section-card-${index}`}
              delay={3 + index}
              size="medium"
            />
          </div>
        ))}
      </motion.div>

      {/* Expanded Card Modal */}
      <ExpandedCardModal
        isOpen={!!expandedCard}
        onClose={closeCard}
        layoutId={expandedCard?.type ? `${expandedCard.type}-card` : undefined}
        title={expandedCard?.data?.title || expandedCard?.type || ''}
      >
        {renderExpandedContent()}
      </ExpandedCardModal>
    </>
  );
}
