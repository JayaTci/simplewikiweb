const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/articleController');

router.get('/', ctrl.getAllArticles);
router.get('/random', ctrl.getRandomArticle);
router.get('/categories', ctrl.getCategories);
router.get('/category/:category', ctrl.getArticlesByCategory);
router.get('/:slug', ctrl.getArticleBySlug);

module.exports = router;
