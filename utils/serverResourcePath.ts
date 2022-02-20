import { frontendConfig } from 'config/frontendConfig';
import { normalizeUrl } from './normalizeUrl';

export function serverResourcePath(path: string): string {
  return normalizeUrl(frontendConfig.apiEndpoint, path);
}
