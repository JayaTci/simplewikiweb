import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Common/Loading';

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAllArticles()
      .then((data) => {
        if (data.success) {
          setArticles(data.articles);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="home-page">
      <div className="welcome-banner">
        <h1>Welcome to <span className="brand">DevWiki</span></h1>
        <p className="welcome-sub">The free encyclopedia built with React and Node.js</p>
        <p className="welcome-count">{articles.length} articles and growing</p>
      </div>

      <div className="home-sections">
        <section className="home-section">
          <h2>All Articles</h2>
          <div className="article-grid">
            {articles.map((article) => (
              <Link to={`/article/${article.slug}`} key={article.id} className="article-card">
                <h3>{article.title}</h3>
                <p className="article-card-subtitle">{article.subtitle}</p>
                <p className="article-card-excerpt">{article.excerpt}</p>
                <div className="article-card-categories">
                  {article.categories.slice(0, 3).map((cat) => (
                    <span key={cat} className="category-tag">{cat}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
