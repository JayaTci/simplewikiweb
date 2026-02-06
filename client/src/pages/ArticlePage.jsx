import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import ArticleContent from '../components/Article/ArticleContent';
import TableOfContents from '../components/Article/TableOfContents';
import { extractHeadings } from '../utils/markdown';
import Loading from '../components/Common/Loading';

function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.getArticle(slug)
      .then((data) => {
        if (data.success) {
          setArticle(data.article);
        } else {
          setError('Article not found');
        }
      })
      .catch(() => setError('Article not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loading />;

  if (error || !article) {
    return (
      <div className="error-page">
        <h1>Article Not Found</h1>
        <p>The article &quot;{slug}&quot; does not exist.</p>
        <Link to="/">Return to Main Page</Link>
      </div>
    );
  }

  const headings = extractHeadings(article.content);

  return (
    <div className="article-page">
      <div className="article-header">
        <h1 className="article-title">{article.title}</h1>
        {article.subtitle && (
          <p className="article-subtitle">{article.subtitle}</p>
        )}
        <div className="article-meta">
          {article.categories?.map((cat) => (
            <span key={cat} className="category-tag">{cat}</span>
          ))}
          {article.metadata?.lastModified && (
            <span className="article-date">
              Last updated: {new Date(article.metadata.lastModified).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <TableOfContents headings={headings} />
      <ArticleContent content={article.content} />

      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <div className="related-articles">
          <h2>Related Articles</h2>
          <ul className="related-list">
            {article.relatedArticles.map((slug) => (
              <li key={slug}>
                <Link to={`/article/${slug}`}>
                  {slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ArticlePage;
