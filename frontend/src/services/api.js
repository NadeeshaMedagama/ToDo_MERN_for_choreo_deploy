import axios from 'axios';
import { fetchAccessToken } from './auth';

const API_BASE_URL = window.configs?.apiUrl || 'http://localhost:5000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = await fetchAccessToken();
      config.headers.Authorization = `Bearer ${accessToken}`;
    } catch (error) {
      console.error('Failed to get access token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const todoApi = {
  // Get all todos
  getTodos: async () => {
    const response = await api.get('/todos');
    return response.data;
  },

  // Get single todo
  getTodo: async (id) => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  // Create new todo
  createTodo: async (todoData) => {
    const response = await api.post('/todos', todoData);
    return response.data;
  },

  // Update todo
  updateTodo: async (id, todoData) => {
    const response = await api.put(`/todos/${id}`, todoData);
    return response.data;
  },

  // Delete todo
  deleteTodo: async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },

  // Toggle todo completion status
  toggleTodo: async (id) => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return response.data;
  },
};

export default api;
