const { getIndex, getArticle } = require('../utils/fileHelpers');

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

      for (const term of terms) {
        if (titleLower.includes(term)) score += 3;
        if (subtitleLower.includes(term)) score += 2;
        if (excerptLower.includes(term)) score += 1;
        if (meta.categories.some((c) => c.toLowerCase().includes(term))) score += 1;
      }

      // Also search full article content for better results
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

    scored.sort((a, b) => b.score - a.score);
    const results = scored.slice(0, 20).map(({ score, ...rest }) => rest);

    res.json({ success: true, results, total: results.length });
  } catch (err) {
    next(err);
  }
};
