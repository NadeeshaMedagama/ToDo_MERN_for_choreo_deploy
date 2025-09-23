// API Configuration for both local development and Choreo deployment
// This file handles dynamic API URL configuration based on the environment

// Read from window.configs if it exists (Choreo deployment)
// Otherwise fall back to local backend URL
const baseUrl = window?.configs?.apiUrl
  ? window.configs.apiUrl
  : "http://localhost:5000"; // local backend

// Always append /api prefix for Express routes
const apiUrl = `${baseUrl}/api`;

export default apiUrl;
