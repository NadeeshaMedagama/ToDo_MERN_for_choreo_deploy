import axios from 'axios';
import { Todo, CreateTodoData, UpdateTodoData, ApiResponse } from '../types/todo';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoApi = {
  // Get all todos
  getTodos: async (): Promise<ApiResponse<Todo[]>> => {
    const response = await api.get('/todos');
    return response.data;
  },

  // Get single todo
  getTodo: async (id: string): Promise<ApiResponse<Todo>> => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  // Create new todo
  createTodo: async (todoData: CreateTodoData): Promise<ApiResponse<Todo>> => {
    const response = await api.post('/todos', todoData);
    return response.data;
  },

  // Update todo
  updateTodo: async (id: string, todoData: UpdateTodoData): Promise<ApiResponse<Todo>> => {
    const response = await api.put(`/todos/${id}`, todoData);
    return response.data;
  },

  // Delete todo
  deleteTodo: async (id: string): Promise<ApiResponse<{}>> => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },

  // Toggle todo completion status
  toggleTodo: async (id: string): Promise<ApiResponse<Todo>> => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return response.data;
  },
};

export default api;
