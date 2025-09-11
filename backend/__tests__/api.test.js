const request = require('supertest');
const app = require('../server');

describe('Todo API Tests', () => {
  describe('Health Check', () => {
    test('GET /api/health should return 200', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Server is running');
      expect(response.body.timestamp).toBeDefined();
    });
  });

  describe('Todo Routes', () => {
    test('GET /api/todos should return 200', async () => {
      const response = await request(app)
        .get('/api/todos')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('POST /api/todos should create a new todo', async () => {
      const newTodo = {
        title: 'Test todo item',
        description: 'Test description',
        completed: false,
        priority: 'medium'
      };

      const response = await request(app)
        .post('/api/todos')
        .send(newTodo)
        .expect(201);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(newTodo.title);
      expect(response.body.data.description).toBe(newTodo.description);
      expect(response.body.data.completed).toBe(newTodo.completed);
      expect(response.body.data.priority).toBe(newTodo.priority);
    });

    test('POST /api/todos without title should return 400', async () => {
      const invalidTodo = {
        description: 'Test without title',
        completed: false
      };

      await request(app)
        .post('/api/todos')
        .send(invalidTodo)
        .expect(400);
    });
  });

  describe('Error Handling', () => {
    test('GET /nonexistent should return 404', async () => {
      await request(app)
        .get('/nonexistent')
        .expect(404);
    });
  });
});
