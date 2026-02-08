/**
 * Search Routes
 *
 * Defines the search endpoint:
 *   GET /?q=<query>  — Full-text search across all articles
 */

const express = require('express');
const router = express.Router();
const { search } = require('../controllers/searchController');

router.get('/', search);

module.exports = router;
