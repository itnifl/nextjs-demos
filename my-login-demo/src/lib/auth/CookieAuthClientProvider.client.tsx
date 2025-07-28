// File: src/lib/auth/CookieAuthClientProvider.client.ts
import { AuthProviderClient } from './AuthProviderClient';
import { ROUTES } from '@/lib/constants/routes';

export function CookieAuthClientProvider(): AuthProviderClient {
  return {
    async isAuthenticatedClient() {
      const res = await fetch(ROUTES.CURRENT_USER_API);
      return res.ok;
    },

    async logoutClient() {
      await fetch(ROUTES.LOGOUT_API, { method: 'POST' });
      window.location.href = ROUTES.LOGIN;
    }
  };
}