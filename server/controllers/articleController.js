const { getIndex, getArticle, getAllArticleSlugs } = require('../utils/fileHelpers');

exports.getAllArticles = (req, res, next) => {
  try {
    const index = getIndex();
    res.json({ success: true, articles: index.articles, categories: index.categories });
  } catch (err) {
    next(err);
  }
};

exports.getArticleBySlug = (req, res, next) => {
  try {
    const { slug } = req.params;
    const article = getArticle(slug);
    if (!article) {
      return res.status(404).json({ success: false, error: 'Article not found', statusCode: 404 });
    }
    res.json({ success: true, article });
  } catch (err) {
    next(err);
  }
};

exports.getRandomArticle = (req, res, next) => {
  try {
    const slugs = getAllArticleSlugs().filter((s) => s !== 'main-page');
    const randomSlug = slugs[Math.floor(Math.random() * slugs.length)];
    const article = getArticle(randomSlug);
    res.json({ success: true, article });
  } catch (err) {
    next(err);
  }
};

exports.getCategories = (req, res, next) => {
  try {
    const index = getIndex();
    res.json({ success: true, categories: index.categories });
  } catch (err) {
    next(err);
  }
};

exports.getArticlesByCategory = (req, res, next) => {
  try {
    const { category } = req.params;
    const index = getIndex();
    const filtered = index.articles.filter((a) =>
      a.categories.map((c) => c.toLowerCase()).includes(category.toLowerCase())
    );
    res.json({ success: true, articles: filtered, category });
  } catch (err) {
    next(err);
  }
};
