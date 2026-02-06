import './Article.css';

function TableOfContents({ headings }) {
  if (!headings || headings.length === 0) return null;

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
