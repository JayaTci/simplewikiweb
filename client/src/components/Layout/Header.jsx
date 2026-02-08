/**
 * Header — Fixed Top Navigation Bar
 *
 * Contains the DevWiki logo/link, a dark-mode toggle button,
 * the mobile sidebar hamburger, and an inline search form
 * that navigates to the /search page on submit.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Layout.css';

function Header({ onToggleSidebar, theme, onToggleTheme }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  /** Navigate to the search page with the current query string. */
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          &#9776;
        </button>
        <Link to="/" className="header-logo">
          <span className="logo-icon">D</span>
          <span className="logo-text">DevWiki</span>
        </Link>
      </div>
      <div className="header-right">
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '\u263E' : '\u2600'}
        </button>
      <form className="header-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      </div>
    </header>
  );
}

export default Header;
