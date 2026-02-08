/**
 * Markdown Utilities
 *
 * Provides helpers for converting article markdown into safe HTML:
 *   - convertWikiLinks: transforms [[Title]] syntax into internal links.
 *   - extractHeadings:  pulls h2/h3 headings for the table of contents.
 *   - parseMarkdown:    full pipeline — wiki-links → markdown → sanitized HTML.
 */

import { marked } from 'marked';
import DOMPurify from 'dompurify';

/**
 * Convert wiki-style [[links]] to internal HTML anchor tags.
 * Example: [[React]] → <a href="/article/react" data-wiki-link="true">React</a>
 */
function convertWikiLinks(content) {
  return content.replace(/\[\[([^\]]+)\]\]/g, (match, title) => {
    const slug = title
      .toLowerCase()
      .replace(/\./g, '')
      .replace(/\s+/g, '-');
    return `<a href="/article/${slug}" data-wiki-link="true">${title}</a>`;
  });
}

/**
 * Extract h2/h3 headings from raw markdown for the table of contents.
 * @param {string} content — Raw markdown string.
 * @returns {Array<{id: string, title: string, level: number}>}
 */
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

/**
 * Parse raw markdown into sanitized HTML, with wiki-link support.
 * Uses DOMPurify to prevent XSS from user-generated content.
 * @param {string} content — Raw markdown string.
 * @returns {string} Sanitized HTML string.
 */
export function parseMarkdown(content) {
  const withWikiLinks = convertWikiLinks(content);
  const html = marked.parse(withWikiLinks);
  return DOMPurify.sanitize(html);
}
