// File: src/lib/auth/AuthRegistry.ts
import type { AuthProviderServer } from './AuthProviderServer';
import type { AuthProviderClient } from './AuthProviderClient';

let serverInstance: AuthProviderServer | null = null;
let clientInstance: AuthProviderClient | null = null;

export const AuthRegistry = {
  registerServer(provider: AuthProviderServer) {
    serverInstance = provider;
  },

  resolve() {
    if (!serverInstance) throw new Error('No server auth provider');
    return serverInstance;
  },

  registerClient(provider: AuthProviderClient) {
    clientInstance = provider;
  },

  resolveClient() {
    if (!clientInstance) throw new Error('No client auth provider');
    return clientInstance;
  }
};
