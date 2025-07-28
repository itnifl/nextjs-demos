// File: src/lib/auth/InitAuth.ts
import { CookieAuthProvider } from './CookieAuthProvider.server';
import { JsonUserDataProvider } from './JsonUserDataProvider';
import { AuthRegistry } from './AuthRegistry';

export async function InitAuthServer() {
  const udp = new JsonUserDataProvider();
  AuthRegistry.registerServer(CookieAuthProvider(udp));
}