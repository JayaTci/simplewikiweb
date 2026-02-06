import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Convert wiki-style [[links]] to HTML anchor tags
function convertWikiLinks(content) {
  return content.replace(/\[\[([^\]]+)\]\]/g, (match, title) => {
    const slug = title
      .toLowerCase()
      .replace(/\./g, '')
      .replace(/\s+/g, '-');
    return `<a href="/article/${slug}" data-wiki-link="true">${title}</a>`;
  });
}

// Extract headings from markdown for table of contents
export function extractHeadings(content) {
  const headings = [];
  const lines = content.split('\n');
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      headings.push({ id, title, level });
    }
  }
  return headings;
}

// Parse markdown to sanitized HTML
export function parseMarkdown(content) {
  const withWikiLinks = convertWikiLinks(content);
  const html = marked.parse(withWikiLinks);
  return DOMPurify.sanitize(html);
}
