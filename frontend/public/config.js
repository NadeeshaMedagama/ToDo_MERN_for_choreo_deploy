// Environment detection
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const isDevelopment = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1');

// Configuration for both local development and Choreo deployment
window.configs = {
    // Use localhost for local development, Choreo URL for production
    apiUrl: (isLocalhost && isDevelopment) 
        ? 'http://localhost:5000'  // Local development without /api prefix
        : 'https://5132b0af-001d-469a-a620-441177beb2a7.e1-us-east-azure.choreoapps.dev/choreo-apis/sri-ko-lms-platform/backend/v1', // Choreo deployment with updated URL
    frontendUrl: (isLocalhost && isDevelopment)
        ? 'http://localhost:3000'  // Local development frontend
        : 'https://4d24e1c8-dabe-4adc-8309-5516699c5c3e.e1-us-east-azure.st.choreoapps.dev', // Choreo frontend URL
    featureFlags: {
        enableNewFeature: true,
        enableExperimentalFeature: false,
    },
    // Choreo-specific configuration
    choreo: {
        enabled: !isLocalhost || !isDevelopment,
        baseUrl: 'https://5132b0af-001d-469a-a620-441177beb2a7.e1-us-east-azure.choreoapps.dev/choreo-apis/sri-ko-lms-platform/backend/v1',
        frontendUrl: 'https://4d24e1c8-dabe-4adc-8309-5516699c5c3e.e1-us-east-azure.st.choreoapps.dev'
    }
};