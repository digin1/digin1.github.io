import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export async function getContentByType(type) {
  const typeDir = path.join(contentDirectory, type);

  if (!fs.existsSync(typeDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(typeDir).filter(f => f.endsWith('.md'));

  const allContent = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(typeDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data: metadata, content } = matter(fileContents);

      const processedContent = await remark()
        .use(html)
        .process(content);
      const contentHtml = processedContent.toString();

      return {
        id,
        metadata,
        content: contentHtml,
        rawContent: content,
      };
    })
  );

  return allContent.sort((a, b) => {
    if (a.metadata.date && b.metadata.date) {
      return new Date(b.metadata.date) - new Date(a.metadata.date);
    }
    return 0;
  });
}

export async function getContentById(type, id) {
  const fullPath = path.join(contentDirectory, type, `${id}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data: metadata, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    id,
    metadata,
    content: contentHtml,
    rawContent: content,
  };
}

export function getAllContentIds(type) {
  const typeDir = path.join(contentDirectory, type);

  if (!fs.existsSync(typeDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(typeDir).filter(f => f.endsWith('.md'));

  return fileNames.map((fileName) => ({
    id: fileName.replace(/\.md$/, ''),
  }));
}
