/**
 * @homekit/core — Authentication manager.
 * https://homekit.builders
 */

import fs from 'fs';
import path from 'path';
import os from 'os';

export interface AuthData {
  token: string;
  home: string;
  authorizedAt: string;
}

const AUTH_DIR = path.join(os.homedir(), '.homekit');
const AUTH_FILE = path.join(AUTH_DIR, 'auth.json');

/**
 * Read the stored auth token.
 * Returns null if the user has not yet run `homekit auth`.
 */
export function readAuth(): AuthData | null {
  try {
    const raw = fs.readFileSync(AUTH_FILE, 'utf-8');
    return JSON.parse(raw) as AuthData;
  } catch {
    return null;
  }
}

/**
 * Write auth data to disk with restricted permissions (600).
 */
export function writeAuth(data: AuthData): void {
  fs.mkdirSync(AUTH_DIR, { recursive: true, mode: 0o700 });
  fs.writeFileSync(AUTH_FILE, JSON.stringify(data, null, 2), {
    encoding: 'utf-8',
    mode: 0o600,
  });
}

/**
 * Clear stored auth — used by `homekit auth --reset`.
 */
export function clearAuth(): void {
  try {
    fs.unlinkSync(AUTH_FILE);
  } catch {
    // Already cleared
  }
}

/**
 * Assert that auth exists, throwing a readable error if not.
 */
export function requireAuth(): AuthData {
  const auth = readAuth();
  if (!auth) {
    throw new Error(
      'Not authorized. Run `homekit auth` to connect to Apple Home.'
    );
  }
  return auth;
}
