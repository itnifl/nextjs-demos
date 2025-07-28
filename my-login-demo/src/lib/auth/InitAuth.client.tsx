// File: src/lib/auth/InitAuth.client.ts
import { AuthRegistry } from './AuthRegistry';
import { CookieAuthClientProvider } from './CookieAuthClientProvider.client';

export function InitAuthClient() {
  AuthRegistry.registerClient(CookieAuthClientProvider());
}