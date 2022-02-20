
export interface FrontendConfig {
  requestQueueLength: number;
  apiEndpoint: string;
  tokenExpirySeconds: number;
}
export const frontendConfig = {
  apiEndpoint: process.env.APP_API_ENDPOINT || '/api',
  tokenExpirySeconds: 30,
  requestQueueLength: 3,
}