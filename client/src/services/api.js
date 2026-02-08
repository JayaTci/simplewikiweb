/**
 * API Service — HTTP Client Layer
 *
 * Centralizes all backend API calls using Axios.
 * In development, requests are proxied to localhost:5000 by Vite.
 * In production, they hit the same origin since Express serves the client.
 */

import axios from 'axios';

const API_BASE_URL = '/api';

const api = {
  /** Fetch metadata for every article. */
  getAllArticles: async () => {
    const response = await axios.get(`${API_BASE_URL}/articles`);
    return response.data;
  },

  /** Fetch a single article by its URL slug. */
  getArticle: async (slug) => {
    const response = await axios.get(`${API_BASE_URL}/articles/${slug}`);
    return response.data;
  },

  /** Full-text search across all articles. */
  search: async (query) => {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { q: query },
    });
    return response.data;
  },

  /** Fetch a randomly selected article. */
  getRandomArticle: async () => {
    const response = await axios.get(`${API_BASE_URL}/articles/random`);
    return response.data;
  },

  /** Fetch the list of all category names. */
  getCategories: async () => {
    const response = await axios.get(`${API_BASE_URL}/articles/categories`);
    return response.data;
  },

  /** Fetch articles belonging to a specific category. */
  getArticlesByCategory: async (category) => {
    const response = await axios.get(`${API_BASE_URL}/articles/category/${category}`);
    return response.data;
  },
};

export default api;
