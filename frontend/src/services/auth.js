import { clientCredentials } from 'axios-oauth-client';
import axios from 'axios';

// Function to request client credentials token
const getClientCredentials = clientCredentials(
  axios.create(),
  window.configs.tokenUrl,
  window.configs.consumerKey,
  window.configs.consumerSecret
);

export async function fetchAccessToken() {
  const auth = await getClientCredentials();
  return auth.access_token;
}
