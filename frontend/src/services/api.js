import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

// Progress API
export const progressAPI = {
  getProgress: () => api.get('/progress'),
  updateProgress: (data) => api.post('/progress/update', data),
  updateWeeklyPlanner: (data) => api.post('/progress/weekly-planner', data),
  generateCertificate: (data) => api.post('/progress/certificate', data),
};

// Roadmap API
export const roadmapAPI = {
  getAllRoadmaps: () => api.get('/roadmap'),
  getRoadmapByYear: (year) => api.get(`/roadmap/${year}`),
  createRoadmap: (data) => api.post('/roadmap', data),
  updateRoadmap: (id, data) => api.put(`/roadmap/${id}`, data),
  deleteRoadmap: (id) => api.delete(`/roadmap/${id}`),
};

export default api;
