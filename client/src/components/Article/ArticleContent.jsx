/**
 * ArticleContent — Rendered Markdown Body
 *
 * Converts raw markdown (with [[wiki-links]]) into sanitized HTML
 * and renders it. Intercepts clicks on internal wiki-links so they
 * navigate via React Router instead of triggering a full page reload.
 */

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseMarkdown } from '../../utils/markdown';
import './Article.css';

function ArticleContent({ content }) {
  const contentRef = useRef(null);
  const navigate = useNavigate();

  // Attach a delegated click handler for internal wiki-links
  useEffect(() => {
    if (!contentRef.current) return;

    const handleClick = (e) => {
      const link = e.target.closest('a[data-wiki-link]');
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        navigate(href);
      }
    };

    contentRef.current.addEventListener('click', handleClick);
    const node = contentRef.current;
    return () => node.removeEventListener('click', handleClick);
  }, [navigate, content]);

  const html = parseMarkdown(content);

  return (
    <div
      ref={contentRef}
      className="article-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default ArticleContent;
