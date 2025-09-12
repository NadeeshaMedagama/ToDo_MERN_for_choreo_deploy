const request = require('supertest');

// Mock the database connection before importing the server
jest.mock('../config/database', () => ({
  connectDB: jest.fn(() => Promise.resolve())
}));

// Mock mongoose
jest.mock('mongoose', () => ({
  connect: jest.fn(() => Promise.resolve({
    connection: {
      host: 'localhost',
      name: 'test-db'
    }
  })),
  connection: {
    on: jest.fn()
  },
  Schema: jest.fn().mockImplementation(() => ({
    methods: {},
    statics: {},
    pre: jest.fn(),
    post: jest.fn()
  })),
  model: jest.fn().mockReturnValue({
    find: jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue([])
    }),
    findById: jest.fn().mockResolvedValue(null),
    findByIdAndUpdate: jest.fn().mockResolvedValue(null),
    findByIdAndDelete: jest.fn().mockResolvedValue(null),
    create: jest.fn().mockResolvedValue({}),
    save: jest.fn().mockResolvedValue({})
  })
}));

// Mock Todo model
jest.mock('../models/Todo', () => ({
  find: jest.fn().mockReturnValue({
    sort: jest.fn().mockResolvedValue([])
  }),
  findById: jest.fn().mockResolvedValue(null),
  findByIdAndUpdate: jest.fn().mockResolvedValue(null),
  findByIdAndDelete: jest.fn().mockResolvedValue(null),
  create: jest.fn().mockResolvedValue({
    _id: '507f1f77bcf86cd799439011',
    title: 'Test Todo',
    description: 'Test Description',
    completed: false,
    priority: 'medium'
  })
}));

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