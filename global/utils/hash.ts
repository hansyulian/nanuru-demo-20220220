import crypto from 'crypto';
import brcypt from 'bcryptjs';
export type HashTypes = 'md5' | 'sha1' | 'sha256';

export function hash(type: HashTypes, value: string): string {
  return crypto.createHash(type).update(value).digest('hex');
}

export function hashPassword(value: string): string {
  return brcypt.hashSync(value);
}

export function verifyPasswordHash(expectedValue: string, hashedValue: string): boolean {
  return brcypt.compareSync(expectedValue, hashedValue);
}
