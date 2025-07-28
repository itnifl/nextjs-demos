// File: src/lib/auth/AuthProviderClient.ts

/**
 * Client‐side authentication interface.
 * Methods here should use browser APIs (e.g. document.cookie, localStorage, fetch).
 */
export interface AuthProviderClient {
  /**
   * Returns true if the user is currently authenticated on the client.
   */
  isAuthenticatedClient(): Promise<boolean>;

  /**
   * Performs client‐side logout and any necessary cleanup (e.g. clear storage, redirect).
   */
  logoutClient(): Promise<void>;
}