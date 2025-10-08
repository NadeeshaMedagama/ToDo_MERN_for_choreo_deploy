// API Configuration for both local development and Choreo deployment
// This file handles dynamic API URL configuration based on the environment

// Read from window.configs if it exists (Choreo deployment)
// Otherwise fall back to local backend URL
const baseUrl = window?.configs?.apiUrl
  ? window.configs.apiUrl
  : "http://localhost:5000"; // local backend

// For local development, append /api prefix for Express routes
// For Choreo deployment, the URL already includes the full API path
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const apiUrl = isLocalhost ? `${baseUrl}/api` : baseUrl;

// Log configuration for debugging (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('API Configuration:', {
    windowConfigs: window?.configs,
    baseUrl,
    apiUrl,
    isLocalhost,
    environment: process.env.NODE_ENV
  });
}

export default apiUrl;
