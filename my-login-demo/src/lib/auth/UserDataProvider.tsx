// src/lib/auth/UserDataProvider.ts
import { User } from './dto/User';

export interface UserDataProvider {
  findByEmail(email: string): Promise<User | null>;
}