const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const todoRoutes = require('./routes/todos');

console.log('🚀 Starting Todo Backend Service...');
console.log('📋 Environment:', process.env.NODE_ENV || 'development');

// Load environment variables
let envFile;
if (process.env.NODE_ENV === 'production') {
  envFile = './config.production.env';
} else if (process.env.NODE_ENV === 'test') {
  envFile = './config.test.env';
} else {
  envFile = './config.env';
}
console.log('📁 Loading environment from:', envFile);
dotenv.config({ path: envFile });

console.log('🔧 Environment variables loaded:');
console.log('  - PORT:', process.env.PORT);
console.log('  - NODE_ENV:', process.env.NODE_ENV);
console.log('  - MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');

// Connect to database
console.log('🔌 Connecting to database...');
connectDB();

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://todo-frontend.choreo.dev', 'https://todo-backend.choreo.dev']
    : '*',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/todos', todoRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

const PORT = process.env.PORT || 8080;

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log('✅ Server successfully started!');
    console.log(`🌐 Server running on port ${PORT}`);
    console.log(`🔗 Health check available at: http://localhost:${PORT}/api/health`);
    console.log(`📡 API endpoints available at: http://localhost:${PORT}/api/todos`);
  });
}

module.exports = app;
