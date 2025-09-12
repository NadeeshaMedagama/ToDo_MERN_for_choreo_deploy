// Mock Todo model
const mockTodo = {
  _id: '507f1f77bcf86cd799439011',
  title: 'Test Todo',
  description: 'Test Description',
  completed: false,
  priority: 'medium',
  createdAt: new Date(),
  updatedAt: new Date()
};

const mockTodoModel = {
  find: jest.fn().mockReturnValue({
    sort: jest.fn().mockResolvedValue([mockTodo])
  }),
  findById: jest.fn().mockResolvedValue(mockTodo),
  findByIdAndUpdate: jest.fn().mockResolvedValue(mockTodo),
  findByIdAndDelete: jest.fn().mockResolvedValue(mockTodo),
  create: jest.fn().mockResolvedValue(mockTodo),
  save: jest.fn().mockResolvedValue(mockTodo)
};

jest.mock('../models/Todo', () => mockTodoModel);
