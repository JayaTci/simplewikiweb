/**
 * File Helpers — Data Access Layer
 *
 * Reads article data from the local JSON file store.
 * All articles live in /server/data/articles/<slug>.json,
 * and the master index is at /server/data/index.json.
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const ARTICLES_DIR = path.join(DATA_DIR, 'articles');

/**
 * Reads and parses a JSON file synchronously.
 * @param {string} filePath — Absolute path to the JSON file.
 * @returns {Object} Parsed JSON content.
 */
function readJSON(filePath) {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

/**
 * Loads the master index containing all article metadata and categories.
 * @returns {Object} { articles: [...], categories: [...] }
 */
function getIndex() {
  return readJSON(path.join(DATA_DIR, 'index.json'));
}

/**
 * Loads a single article by its URL slug.
 * @param {string} slug — The article's filename (without .json).
 * @returns {Object|null} The article data, or null if the file doesn't exist.
 */
function getArticle(slug) {
  const filePath = path.join(ARTICLES_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return readJSON(filePath);
}

/**
 * Returns an array of every article slug available in the data directory.
 * @returns {string[]} e.g. ["react", "nodejs", "javascript"]
 */
function getAllArticleSlugs() {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''));
}

module.exports = { getIndex, getArticle, getAllArticleSlugs };
