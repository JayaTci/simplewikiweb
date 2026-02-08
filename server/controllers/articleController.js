/**
 * Article Controller
 *
 * Handles all business logic for article-related API endpoints.
 * Data is read from JSON files via the fileHelpers utility.
 */

const { getIndex, getArticle, getAllArticleSlugs } = require('../utils/fileHelpers');

/**
 * GET /api/articles
 * Returns every article's metadata and all category names.
 */
exports.getAllArticles = (req, res, next) => {
  try {
    const index = getIndex();
    res.json({ success: true, articles: index.articles, categories: index.categories });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/articles/:slug
 * Returns a single article by its URL slug, or 404 if not found.
 */
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

/**
 * GET /api/articles/random
 * Returns a randomly selected article (excludes the main page).
 */
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

/**
 * GET /api/articles/categories
 * Returns the list of all category names.
 */
exports.getCategories = (req, res, next) => {
  try {
    const index = getIndex();
    res.json({ success: true, categories: index.categories });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/articles/category/:category
 * Returns articles that belong to the given category (case-insensitive).
 */
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
