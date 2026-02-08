/**
 * SearchBar — Reusable Search Form
 *
 * A simple input + button form that navigates to /search?q=...
 * Used on both the SearchPage (large variant) and potentially elsewhere.
 *
 * @param {string}  initialQuery — Pre-filled query text (default: "").
 * @param {boolean} large        — Renders a larger variant when true.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';

function SearchBar({ initialQuery = '', large = false }) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  /** Navigate to the search results page on form submission. */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form className={`search-form ${large ? 'search-form-large' : ''}`} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search DevWiki..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-form-input"
      />
      <button type="submit" className="search-form-button">Search</button>
    </form>
  );
}

export default SearchBar;
