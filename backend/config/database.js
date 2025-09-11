const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔍 Attempting to connect to MongoDB...');
    console.log('📍 MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    // Validate MongoDB URI format
    if (!process.env.MONGODB_URI.startsWith('mongodb://') && !process.env.MONGODB_URI.startsWith('mongodb+srv://')) {
      console.error('❌ Invalid MongoDB URI format:');
      console.error('   Current value:', process.env.MONGODB_URI);
      console.error('   Expected format: mongodb://... or mongodb+srv://...');
      throw new Error('Invalid MongoDB URI format. Must start with "mongodb://" or "mongodb+srv://"');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    console.log(`✅ MongoDB Connected successfully to: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.error('🔧 Error details:', error);
    console.error('💡 Please check your MONGODB_URI environment variable');
    process.exit(1);
  }
};

module.exports = connectDB;
