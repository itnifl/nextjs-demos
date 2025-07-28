// Fil: src/lib/auth/AuthProvider.ts
import { User } from './dto/User';

export interface AuthProviderServer {
  login(email: string, password: string): Promise<{ success: boolean; error?: string }>;
  logout(): Promise<void>;
  isAuthenticated(): Promise<boolean>;
  getUser(email: string): Promise<User | null>;
  /**
   * Fetches the current logged‐in user, or null if not logged in.
   */
  getCurrentUser(): Promise<User | null>;
}
