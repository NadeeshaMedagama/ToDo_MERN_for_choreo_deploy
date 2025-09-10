# Choreo Deployment Guide for MERN Todo Application

This guide will help you deploy your MERN Stack Todo Application on Choreo with separate frontend and backend components.

## Prerequisites

- GitHub repository: `https://github.com/NadeeshaMedagama/ToDo_MERN_for_choreo_deploy.git`
- MongoDB Atlas account and cluster
- Choreo account access

## Deployment Steps

### 1. Backend Service Deployment

#### Step 1.1: Create Backend Component
1. Log in to [Choreo Console](https://console.choreo.dev)
2. Create a new project or select existing project
3. Click **"Create"** → **"Service"**
4. Choose **"Deploy from Source"**
5. Connect your GitHub account and select repository: `ToDo_MERN_for_choreo_deploy`
6. Set the **Source Directory** to: `backend`
7. Choose **"Dockerfile"** as the buildpack
8. Set **Dockerfile Path** to: `backend/Dockerfile`

#### Step 1.2: Configure Backend Environment Variables
In the **Environment Variables** section, add:

```
PORT=8080
NODE_ENV=production
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/todoapp?retryWrites=true&w=majority
CORS_ORIGIN=https://your-frontend-url.choreo.dev
```

#### Step 1.3: Deploy Backend
1. Click **"Build"** to build the backend service
2. Once build is successful, click **"Deploy"**
3. Note the backend service URL (e.g., `https://backend-service.choreo.dev`)

### 2. Frontend Web Application Deployment

#### Step 2.1: Create Frontend Component
1. In the same Choreo project, click **"Create"** → **"Web Application"**
2. Choose **"Deploy from Source"**
3. Connect to the same GitHub repository: `ToDo_MERN_for_choreo_deploy`
4. Set the **Source Directory** to: `frontend`
5. Choose **"Dockerfile"** as the buildpack
6. Set **Dockerfile Path** to: `frontend/Dockerfile`

#### Step 2.2: Configure Frontend Environment Variables
In the **Environment Variables** section, add:

```
REACT_APP_API_URL=https://your-backend-service-url.choreo.dev/api
REACT_APP_ENV=production
```

#### Step 2.3: Deploy Frontend
1. Click **"Build"** to build the frontend application
2. Once build is successful, click **"Deploy"**
3. Note the frontend application URL (e.g., `https://frontend-app.choreo.dev`)

### 3. Configure Service Connections

#### Step 3.1: Create Connection
1. In Choreo Console, go to **"Connections"**
2. Create a new connection between:
   - **Source**: Frontend Web Application
   - **Target**: Backend Service
3. Configure the connection settings

#### Step 3.2: Update CORS Settings
1. Go back to your Backend Service component
2. Update the `CORS_ORIGIN` environment variable with your frontend URL
3. Redeploy the backend service

### 4. Environment Variables Reference

#### Backend Environment Variables
```bash
PORT=8080                    # Port for the backend service
NODE_ENV=production          # Environment mode
MONGODB_URI=your-mongodb-uri # MongoDB Atlas connection string
CORS_ORIGIN=frontend-url     # Frontend URL for CORS
```

#### Frontend Environment Variables
```bash
REACT_APP_API_URL=backend-url/api  # Backend API endpoint
REACT_APP_ENV=production           # Environment mode
```

### 5. MongoDB Atlas Configuration

#### Step 5.1: Network Access
1. Go to MongoDB Atlas Dashboard
2. Navigate to **"Network Access"**
3. Add IP Address: `0.0.0.0/0` (for Choreo deployment)
4. Or add specific Choreo IP ranges if available

#### Step 5.2: Database User
1. Go to **"Database Access"**
2. Create a database user with read/write permissions
3. Use this user in your `MONGODB_URI`

### 6. Testing Your Deployment

#### Step 6.1: Test Backend
```bash
# Test health endpoint
curl https://your-backend-service.choreo.dev/api/health

# Test todos endpoint
curl https://your-backend-service.choreo.dev/api/todos
```

#### Step 6.2: Test Frontend
1. Open your frontend URL in a browser
2. Try creating, updating, and deleting todos
3. Verify that data persists (check MongoDB Atlas)

### 7. Monitoring and Logs

#### Step 7.1: View Logs
1. In Choreo Console, go to your component
2. Click **"Logs"** tab to view application logs
3. Monitor for any errors or issues

#### Step 7.2: Health Checks
Both components include health check endpoints:
- Backend: `/api/health`
- Frontend: `/` (serves the React app)

### 8. Troubleshooting

#### Common Issues

1. **CORS Errors**
   - Ensure `CORS_ORIGIN` is set correctly in backend
   - Check that frontend URL matches exactly

2. **Database Connection Issues**
   - Verify MongoDB Atlas network access settings
   - Check `MONGODB_URI` format and credentials

3. **Build Failures**
   - Check Dockerfile syntax
   - Ensure all dependencies are in package.json
   - Review build logs in Choreo Console

4. **Frontend Not Loading**
   - Verify `REACT_APP_API_URL` is correct
   - Check that backend service is running
   - Review browser console for errors

### 9. Production Considerations

#### Security
- Use environment variables for sensitive data
- Enable HTTPS (handled by Choreo)
- Regular security updates for dependencies

#### Performance
- Monitor resource usage in Choreo Console
- Consider scaling options if needed
- Optimize database queries

#### Backup
- Regular MongoDB Atlas backups
- Version control for code changes
- Environment variable documentation

## File Structure for Choreo Deployment

```
ToDo_MERN_for_choreo_deploy/
├── backend/
│   ├── Dockerfile                 # Backend container configuration
│   ├── choreo-config.yaml        # Choreo-specific backend config
│   ├── config.production.env     # Production environment variables
│   ├── package.json              # Updated with production settings
│   └── ... (other backend files)
├── frontend/
│   ├── Dockerfile                 # Frontend container configuration
│   ├── choreo-config.yaml        # Choreo-specific frontend config
│   ├── config.production.env     # Production environment variables
│   ├── package.json              # Updated with production settings
│   └── ... (other frontend files)
└── README.md                     # This deployment guide
```

## Support

For Choreo-specific issues, refer to:
- [Choreo Documentation](https://wso2.com/choreo/docs/)
- [Choreo Community](https://github.com/wso2/choreo)

For application-specific issues, check the logs in Choreo Console or contact the development team.
