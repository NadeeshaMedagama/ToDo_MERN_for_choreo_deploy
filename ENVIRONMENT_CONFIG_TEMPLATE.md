# Environment Configuration Templates
# Copy these files and customize with your actual values

# ===========================================
# BACKEND CONFIGURATION (backend/config.env)
# ===========================================

# Development Environment Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration - Replace with your actual MongoDB Atlas connection string
# Format: mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/todoapp?retryWrites=true&w=majority

# CORS Configuration for development
CORS_ORIGIN=http://localhost:3000

# ===========================================
# FRONTEND CONFIGURATION (frontend/config.env)
# ===========================================

# Frontend Environment Configuration
# API URL for development - points to local backend
REACT_APP_API_URL=http://localhost:5000/api

# Environment mode
REACT_APP_ENV=development

# ===========================================
# PRODUCTION CONFIGURATION EXAMPLES
# ===========================================

# For Choreo Backend Deployment:
# PORT=8080
# NODE_ENV=production
# MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/todoapp?retryWrites=true&w=majority
# CORS_ORIGIN=https://your-frontend-url.choreo.dev

# For Choreo Frontend Deployment:
# REACT_APP_API_URL=https://your-backend-service.choreo.dev/api
# REACT_APP_ENV=production

# ===========================================
# SECURITY NOTES
# ===========================================

# 1. Never commit actual credentials to version control
# 2. Use environment variables for sensitive data
# 3. For production, use Choreo's environment variable management
# 4. Keep your MongoDB Atlas credentials secure
# 5. Use strong passwords for database users
# 6. Enable MongoDB Atlas network access restrictions
# 7. Regularly rotate your database credentials

# ===========================================
# MONGODB ATLAS SETUP INSTRUCTIONS
# ===========================================

# 1. Go to https://cloud.mongodb.com/
# 2. Create a free account or sign in
# 3. Create a new cluster (free tier available)
# 4. Create a database user with read/write permissions
# 5. Whitelist your IP address (or use 0.0.0.0/0 for development)
# 6. Get your connection string from "Connect" → "Connect your application"
# 7. Replace <username>, <password>, and <dbname> in the connection string
# 8. Use the connection string as your MONGODB_URI

# Example MongoDB Atlas connection string format:
# mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
