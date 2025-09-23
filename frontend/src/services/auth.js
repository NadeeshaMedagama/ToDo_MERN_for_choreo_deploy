import { clientCredentials } from 'axios-oauth-client';
import axios from 'axios';

// Function to request client credentials token
const getClientCredentials = clientCredentials(
  axios.create(),
  window.config?.tokenUrl || 'https://bfdef01f-7fc1-46ea-af69-42279e15f710-dev-internal.e1-us-east-azure.internal.choreoapis.dev/oauth2/token',
  window.config?.consumerKey || 'your-consumer-key',
  window.config?.consumerSecret || 'your-consumer-secret'
);

export async function fetchAccessToken() {
  const auth = await getClientCredentials();
  return auth.access_token;
}
