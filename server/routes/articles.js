/**
 * Article Routes
 *
 * Defines all REST endpoints for article retrieval:
 *   GET /              — List every article (index metadata)
 *   GET /random        — Fetch a random article
 *   GET /categories    — List all available categories
 *   GET /category/:cat — Filter articles by category
 *   GET /:slug         — Fetch a single article by its URL slug
 */

const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/articleController');

router.get('/', ctrl.getAllArticles);
router.get('/random', ctrl.getRandomArticle);
router.get('/categories', ctrl.getCategories);
router.get('/category/:category', ctrl.getArticlesByCategory);
router.get('/:slug', ctrl.getArticleBySlug);

module.exports = router;
