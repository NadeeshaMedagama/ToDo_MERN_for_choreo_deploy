// Jest setup file for test environment
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';
process.env.MONGODB_URI = 'mongodb://localhost:27017/todoapp-test';

// Suppress console.log during tests unless explicitly needed
const originalConsoleLog = console.log;
console.log = (...args) => {
  if (process.env.DEBUG_TESTS === 'true') {
    originalConsoleLog(...args);
  }
};
