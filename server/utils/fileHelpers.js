const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const ARTICLES_DIR = path.join(DATA_DIR, 'articles');

function readJSON(filePath) {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function getIndex() {
  return readJSON(path.join(DATA_DIR, 'index.json'));
}

function getArticle(slug) {
  const filePath = path.join(ARTICLES_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return readJSON(filePath);
}

function getAllArticleSlugs() {
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''));
}

module.exports = { getIndex, getArticle, getAllArticleSlugs };
