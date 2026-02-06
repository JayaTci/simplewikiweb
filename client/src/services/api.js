import axios from 'axios';

const API_BASE_URL = '/api';

const api = {
  getAllArticles: async () => {
    const response = await axios.get(`${API_BASE_URL}/articles`);
    return response.data;
  },

  getArticle: async (slug) => {
    const response = await axios.get(`${API_BASE_URL}/articles/${slug}`);
    return response.data;
  },

  search: async (query) => {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: { q: query },
    });
    return response.data;
  },

  getRandomArticle: async () => {
    const response = await axios.get(`${API_BASE_URL}/articles/random`);
    return response.data;
  },

  getCategories: async () => {
    const response = await axios.get(`${API_BASE_URL}/articles/categories`);
    return response.data;
  },

  getArticlesByCategory: async (category) => {
    const response = await axios.get(`${API_BASE_URL}/articles/category/${category}`);
    return response.data;
  },
};

export default api;
