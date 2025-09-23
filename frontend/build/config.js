// Configuration for both local development and Choreo deployment
window.configs = {
    // For Choreo deployment, this will be overridden by environment variables
    // For local development, this provides the fallback URL
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    tokenUrl: process.env.REACT_APP_TOKEN_URL || 'http://localhost:5000/oauth2/token',
    consumerKey: process.env.REACT_APP_CONSUMER_KEY || 'your-consumer-key',
    consumerSecret: process.env.REACT_APP_CONSUMER_SECRET || 'your-consumer-secret',
    featureFlags: {
        enableNewFeature: process.env.REACT_APP_ENABLE_NEW_FEATURE === 'true' || true,
        enableExperimentalFeature: process.env.REACT_APP_ENABLE_EXPERIMENTAL_FEATURE === 'true' || false,
    },
};