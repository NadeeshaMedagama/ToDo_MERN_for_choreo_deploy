import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle2, Circle, Filter } from 'lucide-react';
import { Todo, CreateTodoData, UpdateTodoData } from './types/todo';
import { todoApi } from './services/api';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [error, setError] = useState<string | null>(null);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await todoApi.getTodos();
      if (response.success) {
        setTodos(response.data);
      } else {
        setError('Failed to fetch todos');
      }
    } catch (error) {
      setError('Failed to connect to server. Please make sure the backend is running.');
      console.error('Error fetching todos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTodo = async (todoData: CreateTodoData) => {
    try {
      setError(null);
      const response = await todoApi.createTodo(todoData);
      if (response.success) {
        setTodos(prev => [response.data, ...prev]);
        setIsFormOpen(false);
      } else {
        setError('Failed to create todo');
      }
    } catch (error) {
      setError('Failed to create todo');
      console.error('Error creating todo:', error);
    }
  };

  const handleUpdateTodo = async (todoData: UpdateTodoData) => {
    if (!editingTodo) return;

    try {
      setError(null);
      const response = await todoApi.updateTodo(editingTodo._id, todoData);
      if (response.success) {
        setTodos(prev => 
          prev.map(todo => 
            todo._id === editingTodo._id ? response.data : todo
          )
        );
        setEditingTodo(null);
        setIsFormOpen(false);
      } else {
        setError('Failed to update todo');
      }
    } catch (error) {
      setError('Failed to update todo');
      console.error('Error updating todo:', error);
    }
  };

  const handleSubmit = async (data: CreateTodoData | UpdateTodoData) => {
    if (editingTodo) {
      await handleUpdateTodo(data as UpdateTodoData);
    } else {
      await handleCreateTodo(data as CreateTodoData);
    }
  };

  const handleToggleTodo = async (id: string) => {
    try {
      setError(null);
      const response = await todoApi.toggleTodo(id);
      if (response.success) {
        setTodos(prev => 
          prev.map(todo => 
            todo._id === id ? response.data : todo
          )
        );
      } else {
        setError('Failed to toggle todo');
      }
    } catch (error) {
      setError('Failed to toggle todo');
      console.error('Error toggling todo:', error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;

    try {
      setError(null);
      const response = await todoApi.deleteTodo(id);
      if (response.success) {
        setTodos(prev => prev.filter(todo => todo._id !== id));
      } else {
        setError('Failed to delete todo');
      }
    } catch (error) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', error);
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTodo(null);
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'pending':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const stats = {
    total: todos.length,
    pending: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Todo App</h1>
              <p className="text-gray-600 mt-1">Stay organized and productive</p>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Todo</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <Circle className="w-8 h-8 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <Circle className="w-8 h-8 text-yellow-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center space-x-4 mb-6">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'pending', label: 'Pending' },
              { key: 'completed', label: 'Completed' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === key
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
            <button
              onClick={fetchTodos}
              className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Todo List */}
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggleTodo}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
          isLoading={isLoading}
        />
      </main>

      {/* Todo Form Modal */}
      <TodoForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        editTodo={editingTodo}
      />
    </div>
  );
}

export default App;
