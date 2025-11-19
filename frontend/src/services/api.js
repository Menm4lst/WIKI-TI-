import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Artículos
export const articleAPI = {
  getAll: (params) => api.get('/articles', { params }),
  getById: (id) => api.get(`/articles/${id}`),
  create: (data) => api.post('/articles', data),
  update: (id, data) => api.put(`/articles/${id}`, data),
  delete: (id) => api.delete(`/articles/${id}`),
  getVersions: (id) => api.get(`/articles/${id}/versions`),
  markHelpful: (id) => api.post(`/articles/${id}/helpful`),
  getPopular: (limit) => api.get('/articles/stats/popular', { params: { limit } }),
};

// Búsqueda
export const searchAPI = {
  search: (params) => api.get('/search', { params }),
  getApplications: () => api.get('/search/applications/list'),
  getErrorCodes: () => api.get('/search/errorcodes/list'),
  getTags: () => api.get('/search/tags/list'),
  getSuggestions: (q, field) => api.get('/search/suggestions', { params: { q, field } }),
};

// Categorías
export const categoryAPI = {
  getAll: () => api.get('/categories'),
  create: (data) => api.post('/categories', data),
  getStats: () => api.get('/categories/stats'),
  updateCounts: () => api.get('/categories/update-counts'),
};

export default api;
