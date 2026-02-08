/**
 * Search Controller
 *
 * Implements a weighted full-text search across all articles.
 * Scoring: title matches (3 pts) > subtitle (2 pts) > excerpt (1 pt)
 *          > category (1 pt) > full content (0.5 pt).
 * Results are sorted by relevance and capped at 20.
 */

const { getIndex, getArticle } = require('../utils/fileHelpers');

/**
 * GET /api/search?q=<query>
 * Searches article metadata (and optionally full content) for matching terms.
 * Returns up to 20 results sorted by relevance score.
 */
exports.search = (req, res, next) => {
  try {
    const query = (req.query.q || '').trim().toLowerCase();
    if (!query) {
      return res.json({ success: true, results: [], total: 0 });
    }

    const index = getIndex();
    const terms = query.split(/\s+/);
    const scored = [];

    for (const meta of index.articles) {
      let score = 0;
      const titleLower = meta.title.toLowerCase();
      const subtitleLower = (meta.subtitle || '').toLowerCase();
      const excerptLower = (meta.excerpt || '').toLowerCase();

      // Score metadata fields by relevance weight
      for (const term of terms) {
        if (titleLower.includes(term)) score += 3;
        if (subtitleLower.includes(term)) score += 2;
        if (excerptLower.includes(term)) score += 1;
        if (meta.categories.some((c) => c.toLowerCase().includes(term))) score += 1;
      }

      // Fall back to full article content search when metadata yields no match
      if (score === 0) {
        const article = getArticle(meta.slug);
        if (article) {
          const contentLower = article.content.toLowerCase();
          for (const term of terms) {
            if (contentLower.includes(term)) score += 0.5;
          }
        }
      }

      if (score > 0) {
        scored.push({ ...meta, score });
      }
    }

    // Sort descending by score and strip the internal score field from output
    scored.sort((a, b) => b.score - a.score);
    const results = scored.slice(0, 20).map(({ score, ...rest }) => rest);

    res.json({ success: true, results, total: results.length });
  } catch (err) {
    next(err);
  }
};
