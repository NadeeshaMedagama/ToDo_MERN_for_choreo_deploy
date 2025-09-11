# Choreo Deployment Checklist

## Pre-deployment Checklist

### ✅ Backend Service
- [x] Dockerfile configured for production
- [x] Environment variables properly set
- [x] Health check endpoint implemented (`/api/health`)
- [x] Resource limits and requests defined
- [x] Secrets management configured
- [x] Monitoring and logging setup
- [x] OpenAPI specification available
- [x] CORS properly configured
- [x] Error handling middleware implemented

### ✅ Frontend Application
- [x] Dockerfile configured for production build
- [x] Environment variables properly set
- [x] Production build optimized
- [x] Resource limits and requests defined
- [x] Health check configured
- [x] Static file serving configured
- [x] API URL configuration ready

### ✅ Infrastructure
- [x] Kubernetes deployment configurations
- [x] Service definitions
- [x] Ingress configuration for frontend
- [x] ConfigMaps for environment variables
- [x] Secrets for sensitive data
- [x] Resource quotas and limits
- [x] Monitoring and alerting rules

### ✅ CI/CD Pipeline
- [x] GitHub Actions workflow configured
- [x] Automated testing
- [x] Docker image building and pushing
- [x] Deployment automation ready

### ✅ Documentation
- [x] API documentation (OpenAPI/Swagger)
- [x] Deployment guide
- [x] Environment configuration templates
- [x] Troubleshooting guide

## Deployment Steps

1. **Prepare MongoDB Atlas**
   - Create cluster and database
   - Configure network access (0.0.0.0/0 for Choreo)
   - Create database user with read/write permissions

2. **Deploy Backend Service**
   - Create service component in Choreo
   - Configure environment variables
   - Set up secrets for MongoDB URI
   - Deploy and verify health endpoint

3. **Deploy Frontend Application**
   - Create web application component in Choreo
   - Configure API URL to point to backend
   - Deploy and verify application loads

4. **Configure Service Connections**
   - Set up connection between frontend and backend
   - Update CORS settings
   - Test end-to-end functionality

5. **Monitor and Verify**
   - Check application logs
   - Verify health checks
   - Test all CRUD operations
   - Monitor resource usage

## Environment Variables Reference

### Backend
```bash
PORT=8080
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
CORS_ORIGIN=https://frontend-url.choreo.dev
LOG_LEVEL=info
STRUCTURED_LOGGING=true
APP_NAME=todo-backend
```

### Frontend
```bash
REACT_APP_API_URL=https://backend-url.choreo.dev/api
REACT_APP_ENV=production
LOG_LEVEL=info
STRUCTURED_LOGGING=true
APP_NAME=todo-frontend
```

## Troubleshooting

### Common Issues
1. **CORS Errors**: Verify CORS_ORIGIN matches frontend URL exactly
2. **Database Connection**: Check MongoDB Atlas network access and credentials
3. **Build Failures**: Review Dockerfile and package.json dependencies
4. **Health Check Failures**: Verify health endpoint is accessible

### Log Locations
- Backend logs: Choreo Console → Backend Service → Logs
- Frontend logs: Choreo Console → Frontend Application → Logs
- System logs: Kubernetes cluster logs

## Security Considerations
- All sensitive data stored in Choreo secrets
- HTTPS enabled by default
- Resource limits prevent resource exhaustion
- Non-root user in Docker containers
- Regular dependency updates recommended
