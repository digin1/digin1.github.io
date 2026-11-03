import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

const contentDirectory = path.join(process.cwd(), 'content');

function slugify(value = '') {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function textOf(node) {
  if (node.type === 'text') return node.value;
  return (node.children || []).map(textOf).join('');
}

/**
 * Rehype plugin: give every <h2> a unique id and record the outline on
 * file.data.headings, so pages can link to sections. Works on the parsed
 * tree, so "##" lines inside code blocks are never mistaken for headings.
 */
function rehypeHeadingIds() {
  return (tree, file) => {
    const seen = new Map();
    const headings = [];
    const walk = node => {
      if (node.type === 'element' && node.tagName === 'h2') {
        const title = textOf(node).trim();
        const base = slugify(title) || 'section';
        const count = seen.get(base) || 0;
        seen.set(base, count + 1);
        const slug = count === 0 ? base : `${base}-${count + 1}`;
        node.properties = { ...node.properties, id: node.properties?.id || slug };
        headings.push({ title, slug: node.properties.id });
        return;
      }
      (node.children || []).forEach(walk);
    };
    walk(tree);
    file.data.headings = headings;
  };
}

// Every page of the static build reads the same markdown files, so parse each
// file once per build process instead of once per page.
const cache = new Map();

function parseFile(fullPath, id) {
  if (!cache.has(fullPath)) {
    cache.set(fullPath, (async () => {
      const { data: metadata, content } = matter(fs.readFileSync(fullPath, 'utf8'));
      const processed = await remark()
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeHeadingIds)
        .use(rehypeStringify)
        .process(content);
      return {
        id,
        metadata,
        content: processed.toString(),
        rawContent: content,
        headings: processed.data.headings || [],
      };
    })());
  }
  return cache.get(fullPath);
}

function markdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.md'));
}

const dateValue = item => {
  const t = new Date(item.metadata?.date || 0).getTime();
  return Number.isNaN(t) ? 0 : t;
};

// Newest first; undated items sink to the end in a stable order.
const byDateDesc = (a, b) => dateValue(b) - dateValue(a);

async function readDir(dir) {
  const items = await Promise.all(
    markdownFiles(dir).map(f => parseFile(path.join(dir, f), f.replace(/\.md$/, '')))
  );
  return items.sort(byDateDesc);
}

export function getContentByType(type) {
  return readDir(path.join(contentDirectory, type));
}

export function getContentBySubfolder(type, subfolder) {
  return readDir(path.join(contentDirectory, type, subfolder));
}

export async function getContentById(type, id) {
  const fullPath = path.join(contentDirectory, type, `${id}.md`);
  if (!fs.existsSync(fullPath)) return null;
  return parseFile(fullPath, id);
}

export function getAllContentIds(type) {
  return markdownFiles(path.join(contentDirectory, type)).map(f => ({
    id: f.replace(/\.md$/, ''),
  }));
}

/**
 * Metadata only, for list views. Keeps full article bodies out of the
 * serialized props that ship to the browser.
 */
export function toSummary(item) {
  return { id: item.id, metadata: item.metadata };
}

const PUBLICATION_ROLES = ['main-author', 'co-author', 'preprint'];

/**
 * All publications, newest first, each tagged with its role
 * ('main-author' | 'co-author' | 'preprint') from its folder.
 */
export async function getAllPublications() {
  const groups = await Promise.all(
    PUBLICATION_ROLES.map(async role =>
      (await getContentBySubfolder('publications', role)).map(pub => ({ ...pub, role }))
    )
  );
  return groups.flat().sort(byDateDesc);
}

/**
 * Previous/next neighbours of an item in a date-sorted list.
 */
const link = item => ({ id: item.id, title: item.metadata.title });

export function getNeighbours(items, id) {
  const index = items.findIndex(item => item.id === id);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? link(items[index - 1]) : null,
    next: index < items.length - 1 ? link(items[index + 1]) : null,
  };
}
