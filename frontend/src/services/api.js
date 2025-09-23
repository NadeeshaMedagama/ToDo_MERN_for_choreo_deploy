import axios from 'axios';

const API_BASE_URL = window.config?.apiUrl || 'http://localhost:5000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// For local development, we don't need OAuth
// The backend is configured to allow all origins in development mode

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
