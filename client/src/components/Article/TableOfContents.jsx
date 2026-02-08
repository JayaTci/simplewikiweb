/**
 * TableOfContents — Auto-Generated TOC
 *
 * Renders a clickable list of headings (h2/h3) extracted from the
 * article's markdown content. Clicking an entry smooth-scrolls to
 * the corresponding section.
 */

import './Article.css';

function TableOfContents({ headings }) {
  if (!headings || headings.length === 0) return null;

  /** Smooth-scroll to the heading element by its id. */
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="toc">
      <h3 className="toc-title">Contents</h3>
      <ul className="toc-list">
        {headings.map((h, i) => (
          <li key={i} className={`toc-item toc-level-${h.level}`}>
            <button onClick={() => scrollTo(h.id)} className="toc-link">
              {h.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TableOfContents;
