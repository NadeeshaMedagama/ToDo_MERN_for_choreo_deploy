# Choreo Environment Configuration

## Backend Environment Variables

### Required Variables
```bash
# Server Configuration
PORT=8080
NODE_ENV=production

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# CORS Configuration
CORS_ORIGIN=https://your-frontend-url.choreo.dev

# Logging Configuration
LOG_LEVEL=info
STRUCTURED_LOGGING=true
APP_NAME=todo-backend
```

### Optional Variables
```bash
# Performance Tuning
MAX_CONNECTIONS=100
REQUEST_TIMEOUT=30000

# Security
JWT_SECRET=your-jwt-secret-key
API_RATE_LIMIT=100

# Monitoring
ENABLE_METRICS=true
METRICS_PORT=9090
```

## Frontend Environment Variables

### Required Variables
```bash
# API Configuration
REACT_APP_API_URL=https://your-backend-url.choreo.dev/api

# Environment
REACT_APP_ENV=production

# Logging
LOG_LEVEL=info
STRUCTURED_LOGGING=true
APP_NAME=todo-frontend
```

### Optional Variables
```bash
# Feature Flags
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_DEBUG=false

# Performance
REACT_APP_CACHE_TTL=300000
REACT_APP_MAX_RETRIES=3
```

## Choreo Console Configuration

### Backend Service Settings
1. **Build Configuration**
   - Source Directory: `backend`
   - Dockerfile Path: `backend/Dockerfile`
   - Build Command: `docker build -t todo-backend .`

2. **Environment Variables**
   - Set all required variables in Choreo Console
   - Use secrets for sensitive data (MONGODB_URI, JWT_SECRET)

3. **Resource Allocation**
   - CPU Request: 250m
   - CPU Limit: 500m
   - Memory Request: 256Mi
   - Memory Limit: 512Mi

4. **Health Checks**
   - Liveness Probe: `/api/health`
   - Readiness Probe: `/api/health`
   - Initial Delay: 30s
   - Period: 10s

### Frontend Application Settings
1. **Build Configuration**
   - Source Directory: `frontend`
   - Dockerfile Path: `frontend/Dockerfile`
   - Build Command: `docker build -t todo-frontend .`

2. **Environment Variables**
   - Set all required variables in Choreo Console
   - Ensure REACT_APP_API_URL points to backend service

3. **Resource Allocation**
   - CPU Request: 100m
   - CPU Limit: 200m
   - Memory Request: 128Mi
   - Memory Limit: 256Mi

4. **Health Checks**
   - Liveness Probe: `/`
   - Readiness Probe: `/`
   - Initial Delay: 30s
   - Period: 10s

## Secrets Management

### Backend Secrets
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: todo-backend-secrets
type: Opaque
data:
  mongodb-uri: <base64-encoded-mongodb-uri>
  jwt-secret: <base64-encoded-jwt-secret>
```

### Frontend Secrets
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: todo-frontend-secrets
type: Opaque
data:
  api-key: <base64-encoded-api-key>
```

## Network Configuration

### Service Discovery
- Backend Service: `todo-backend-service:8080`
- Frontend Service: `todo-frontend-service:3000`

### Ingress Configuration
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: todo-app-ingress
spec:
  rules:
  - host: todo-app.choreo.dev
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: todo-backend-service
            port:
              number: 8080
      - path: /
        pathType: Prefix
        backend:
          service:
            name: todo-frontend-service
            port:
              number: 3000
```

## Monitoring Configuration

### Prometheus Metrics
- Backend: `/api/metrics`
- Frontend: `/metrics`

### Log Aggregation
- Structured JSON logging enabled
- Log level: INFO
- Application name tagging

### Alerting Rules
- Service down alerts
- High memory usage alerts
- High CPU usage alerts
- Database connection failures

## Security Configuration

### Network Policies
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: todo-app-network-policy
spec:
  podSelector:
    matchLabels:
      app: todo-backend
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: todo-frontend
    ports:
    - protocol: TCP
      port: 8080
```

### Pod Security Context
```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 1001
  fsGroup: 1001
  seccompProfile:
    type: RuntimeDefault
```

## Backup and Recovery

### Database Backup
- MongoDB Atlas automated backups enabled
- Point-in-time recovery available
- Cross-region backup replication

### Application Backup
- Git repository serves as code backup
- Docker images stored in container registry
- Configuration stored in Git

## Scaling Configuration

### Horizontal Pod Autoscaler
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: todo-backend-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: todo-backend
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

## Troubleshooting

### Common Environment Issues
1. **Missing Environment Variables**: Check Choreo Console configuration
2. **Incorrect API URLs**: Verify service discovery and networking
3. **Database Connection Issues**: Check MongoDB Atlas network access
4. **CORS Issues**: Verify CORS_ORIGIN matches frontend URL exactly

### Debug Commands
```bash
# Check pod logs
kubectl logs -f deployment/todo-backend

# Check service status
kubectl get services

# Check ingress status
kubectl get ingress

# Check secrets
kubectl get secrets
```