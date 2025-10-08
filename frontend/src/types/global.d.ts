// Global type declarations for window.configs (Choreo deployment)
declare global {
  interface Window {
    configs?: {
      apiUrl?: string;
      frontendUrl?: string;
      tokenUrl?: string;
      consumerKey?: string;
      consumerSecret?: string;
      featureFlags?: {
        enableNewFeature?: boolean;
        enableExperimentalFeature?: boolean;
      };
      choreo?: {
        enabled?: boolean;
        baseUrl?: string;
        frontendUrl?: string;
      };
    };
  }
}

export {};
