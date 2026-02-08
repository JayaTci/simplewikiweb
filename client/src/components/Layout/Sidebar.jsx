/**
 * Sidebar — Collapsible Navigation Panel
 *
 * Shows quick-access links (Main Page, Random Article, Search)
 * and a dynamic list of article categories fetched from the API.
 * On mobile the sidebar slides in/out; on desktop it's always visible.
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Layout.css';

function Sidebar({ isOpen }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch category names once on mount
  useEffect(() => {
    api.getCategories().then((data) => {
      if (data.success) {
        setCategories(data.categories);
      }
    }).catch(() => {});
  }, []);

  /** Navigate to a randomly selected article. */
  const handleRandom = async () => {
    try {
      const data = await api.getRandomArticle();
      if (data.success && data.article) {
        navigate(`/article/${data.article.slug}`);
      }
    } catch (err) {
      console.error('Failed to get random article', err);
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <nav className="sidebar-nav">
        <div className="sidebar-section">
          <h3 className="sidebar-heading">Navigation</h3>
          <ul className="sidebar-list">
            <li><Link to="/">Main Page</Link></li>
            <li><button onClick={handleRandom} className="sidebar-link-button">Random Article</button></li>
            <li><Link to="/search">Search</Link></li>
          </ul>
        </div>
        <div className="sidebar-section">
          <h3 className="sidebar-heading">Categories</h3>
          <ul className="sidebar-list">
            {categories.map((cat) => (
              <li key={cat}>
                <Link to={`/search?q=${encodeURIComponent(cat)}`}>{cat}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
