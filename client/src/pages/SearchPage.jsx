import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import SearchBar from '../components/Search/SearchBar';
import Loading from '../components/Common/Loading';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      api.search(query)
        .then((data) => {
          if (data.success) {
            setResults(data.results);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setLoading(false);
          setSearched(true);
        });
    } else {
      setResults([]);
      setSearched(false);
    }
  }, [query]);

  return (
    <div className="search-page">
      <h1>Search</h1>
      <SearchBar initialQuery={query} large />

      {loading && <Loading />}

      {!loading && searched && (
        <div className="search-results">
          <p className="search-results-count">
            {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
          </p>
          {results.length === 0 ? (
            <div className="no-results">
              <p>No articles found matching your search.</p>
              <p>Try different keywords or browse our <Link to="/">main page</Link>.</p>
            </div>
          ) : (
            <ul className="search-results-list">
              {results.map((article) => (
                <li key={article.id} className="search-result-item">
                  <Link to={`/article/${article.slug}`} className="search-result-link">
                    <h3>{article.title}</h3>
                    <p className="search-result-subtitle">{article.subtitle}</p>
                    <p className="search-result-excerpt">{article.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {!loading && !searched && (
        <p className="search-hint">Enter a search term to find articles.</p>
      )}
    </div>
  );
}

export default SearchPage;
