/**
 * Parse project markdown content into structured data for interactive view
 * Extracts sections, features, code blocks, images, stats, and quotes
 */
import { marked } from 'marked';

// Simple markdown to HTML converter
function markdownToHtml(markdown) {
  if (!markdown) return '';
  return marked.parse(markdown, { gfm: true, breaks: true });
}

/**
 * Parse raw markdown content into structured sections and elements
 * @param {string} rawContent - Raw markdown content (without frontmatter)
 * @param {object} metadata - Frontmatter metadata
 * @returns {object} Structured content for card generation
 */
export function parseProjectContent(rawContent, metadata = {}) {
  // Extract links from metadata and content
  const extractedLinks = extractLinks(rawContent, metadata);

  const result = {
    // From metadata
    title: metadata.title || '',
    summary: metadata.summary || metadata.description || '',
    image: metadata.image || '',
    technologies: parseTechnologies(metadata.tag),
    links: extractedLinks,
    role: metadata.role || null,
    duration: metadata.duration || null,
    category: metadata.category || 'personal',
    date: metadata.date || null,

    // Parsed from content
    sections: [],
    features: [],
    codeBlocks: [],
    images: [],
    stats: [],
    quotes: [],
  };

  if (!rawContent) return result;

  // Parse sections (## headers) and filter out "Project URL" sections (now in frontmatter)
  result.sections = parseSections(rawContent).filter(section =>
    !section.title.toLowerCase().includes('project url')
  );

  // Extract feature lists from sections
  result.features = extractFeatures(rawContent);

  // Extract code blocks
  result.codeBlocks = extractCodeBlocks(rawContent);

  // Extract images
  result.images = extractImages(rawContent);

  // Extract stats/metrics
  result.stats = extractStats(rawContent, metadata);

  // Extract blockquotes
  result.quotes = extractQuotes(rawContent);

  return result;
}

/**
 * Parse comma-separated technologies into array
 */
function parseTechnologies(tagString) {
  if (!tagString) return [];
  return tagString.split(',').map(t => t.trim()).filter(Boolean);
}

/**
 * Extract project links from metadata and content
 */
function extractLinks(content, metadata) {
  let demo = metadata.demo || null;
  let github = metadata.github || null;

  // If demo is a GitHub URL, use it as github instead
  if (demo && demo.includes('github.com') && !github) {
    github = demo;
    demo = null;
  }

  // Look for links in "Project URL" section of content
  if (content) {
    const urlSectionMatch = content.match(/##\s*Project\s*URL[\s\S]*?\[([^\]]+)\]\(([^)]+)\)/i);
    if (urlSectionMatch) {
      const url = urlSectionMatch[2];
      if (url.includes('github.com') && !github) {
        github = url;
      } else if (!demo) {
        demo = url;
      }
    }

    // Also look for any GitHub links in content if not found
    if (!github) {
      const githubMatch = content.match(/\[([^\]]*)\]\((https?:\/\/github\.com\/[^)]+)\)/i);
      if (githubMatch) {
        github = githubMatch[2];
      }
    }
  }

  return { demo, github };
}

/**
 * Parse markdown into sections based on ## headers
 */
function parseSections(content) {
  const sections = [];
  const lines = content.split('\n');
  let currentSection = null;
  let currentContent = [];

  for (const line of lines) {
    // Match ## headers (level 2)
    const h2Match = line.match(/^##\s+(.+)$/);
    // Match ### headers (level 3)
    const h3Match = line.match(/^###\s+(.+)$/);

    if (h2Match) {
      // Save previous section
      if (currentSection) {
        const rawMarkdown = currentContent.join('\n').trim();
        currentSection.content = markdownToHtml(rawMarkdown);
        currentSection.preview = getPreview(rawMarkdown);
        sections.push(currentSection);
      }
      // Start new section
      currentSection = {
        title: h2Match[1].trim(),
        level: 2,
        content: '',
        preview: '',
        subsections: [],
      };
      currentContent = [];
    } else if (h3Match && currentSection) {
      // Add as subsection
      currentSection.subsections.push({
        title: h3Match[1].trim(),
        level: 3,
      });
      currentContent.push(line);
    } else {
      currentContent.push(line);
    }
  }

  // Don't forget the last section
  if (currentSection) {
    const rawMarkdown = currentContent.join('\n').trim();
    currentSection.content = markdownToHtml(rawMarkdown);
    currentSection.preview = getPreview(rawMarkdown);
    sections.push(currentSection);
  }

  return sections;
}

/**
 * Get a preview/excerpt of content as HTML
 */
function getPreview(content) {
  if (!content) return '';

  // Get first meaningful content (skip empty lines, limit content)
  const lines = content.split('\n').filter(line => line.trim());

  // Take first few lines worth of content
  let previewLines = [];
  let charCount = 0;
  const maxChars = 300;

  for (const line of lines) {
    if (charCount > maxChars) break;
    previewLines.push(line);
    charCount += line.length;
  }

  const previewMarkdown = previewLines.join('\n');
  return markdownToHtml(previewMarkdown);
}

/**
 * Extract feature lists (bullet points with specific patterns)
 */
function extractFeatures(content) {
  const features = [];
  const lines = content.split('\n');

  for (const line of lines) {
    // Match bullet points starting with * or -
    const bulletMatch = line.match(/^\s*[\*\-]\s+\*\*(.+?)\*\*[:\s]*(.*)$/);
    if (bulletMatch) {
      features.push({
        title: bulletMatch[1].trim(),
        description: bulletMatch[2].trim(),
        completed: true, // All listed features are "completed"
      });
    }
  }

  return features;
}

/**
 * Extract code blocks from markdown
 */
function extractCodeBlocks(content) {
  const codeBlocks = [];
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;

  let match;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    codeBlocks.push({
      language: match[1] || 'text',
      code: match[2].trim(),
      preview: match[2].trim().split('\n').slice(0, 5).join('\n'), // First 5 lines
    });
  }

  return codeBlocks;
}

/**
 * Extract images from markdown
 */
function extractImages(content) {
  const images = [];
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;

  let match;
  while ((match = imageRegex.exec(content)) !== null) {
    images.push({
      alt: match[1] || '',
      src: match[2],
      caption: match[1] || null,
    });
  }

  return images;
}

/**
 * Extract stats and metrics from content and metadata
 */
function extractStats(content, metadata) {
  const stats = [];

  // Add duration if present
  if (metadata.duration) {
    stats.push({
      value: metadata.duration,
      label: 'Duration',
      icon: 'clock',
    });
  }

  // Look for patterns like "33 mice" or "500+ researchers"
  const statPatterns = [
    /(\d+(?:\+)?)\s+(mice|samples|users|researchers|regions|datasets)/gi,
    /(\d+(?:\+)?)\s+(weeks?|months?|years?)\s+(?:of\s+)?development/gi,
  ];

  for (const pattern of statPatterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      stats.push({
        value: match[1],
        label: match[2].charAt(0).toUpperCase() + match[2].slice(1),
        icon: 'chart',
      });
    }
  }

  // Look for technology count
  if (metadata.tag) {
    const techCount = metadata.tag.split(',').length;
    if (techCount > 3) {
      stats.push({
        value: techCount.toString(),
        label: 'Technologies',
        icon: 'code',
      });
    }
  }

  return stats;
}

/**
 * Extract blockquotes from markdown
 */
function extractQuotes(content) {
  const quotes = [];
  const lines = content.split('\n');
  let currentQuote = [];

  for (const line of lines) {
    if (line.startsWith('>')) {
      currentQuote.push(line.replace(/^>\s*/, ''));
    } else if (currentQuote.length > 0) {
      quotes.push({
        text: currentQuote.join(' ').trim(),
        author: null,
      });
      currentQuote = [];
    }
  }

  // Don't forget last quote
  if (currentQuote.length > 0) {
    quotes.push({
      text: currentQuote.join(' ').trim(),
      author: null,
    });
  }

  return quotes;
}

/**
 * Get card layout suggestions based on parsed content
 */
export function getLayoutSuggestions(parsedContent) {
  const suggestions = {
    hasHero: true, // Always have hero
    hasTechStack: parsedContent.technologies.length > 0,
    hasLinks: parsedContent.links.demo || parsedContent.links.github,
    hasRole: !!parsedContent.role || !!parsedContent.duration,
    hasSections: parsedContent.sections.length > 0,
    hasFeatures: parsedContent.features.length > 0,
    hasCode: parsedContent.codeBlocks.length > 0,
    hasImages: parsedContent.images.length > 0,
    hasStats: parsedContent.stats.length > 0,
    hasQuotes: parsedContent.quotes.length > 0,
  };

  // Calculate grid complexity
  let cardCount = 1; // Hero
  if (suggestions.hasTechStack) cardCount++;
  if (suggestions.hasLinks) cardCount++;
  if (suggestions.hasRole) cardCount++;
  cardCount += Math.min(parsedContent.sections.length, 4); // Max 4 section cards
  if (suggestions.hasFeatures) cardCount++;
  if (suggestions.hasCode) cardCount++;
  if (suggestions.hasImages) cardCount++;
  if (suggestions.hasStats) cardCount++;
  if (suggestions.hasQuotes) cardCount++;

  suggestions.cardCount = cardCount;
  suggestions.gridComplexity = cardCount > 8 ? 'complex' : cardCount > 5 ? 'medium' : 'simple';

  return suggestions;
}

export default parseProjectContent;
