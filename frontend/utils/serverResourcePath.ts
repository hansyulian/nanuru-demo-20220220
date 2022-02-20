import { frontendConfig } from 'frontend/config/config';
import { normalizeUrl } from 'global/utils/normalizeUrl';

export function serverResourcePath(path: string): string {
  return normalizeUrl(frontendConfig.apiEndpoint, path);
}
