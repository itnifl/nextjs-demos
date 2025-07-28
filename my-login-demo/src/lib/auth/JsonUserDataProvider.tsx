// File: src/lib/auth/JsonUserDataProvider.ts

import { User } from './dto/User';
import { UserDataProvider } from './UserDataProvider';
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';
import { LoggerRegistry } from '@/lib/logger';

export class JsonUserDataProvider implements UserDataProvider {
  private users: User[] = [];
  private isLoaded = false;

  async init(): Promise<void> {
    if (this.isLoaded) return;
    const logger = LoggerRegistry.resolve();

    try {
      logger.info('[UserDataProvider] Going to load users from file.');
      const filePath = path.join(process.cwd(), 'data', 'users.json');
      const json = await fs.readFile(filePath, 'utf-8');
      const parsed = JSON.parse(json);

      if (Array.isArray(parsed) && parsed.length > 0) {
        this.users = parsed;
        logger.info('[UserDataProvider] Loaded users from file.');
      } else {
        logger.error('[UserDataProvider] Error reading users from file: User file is empty or invalid.');
        throw new Error('User file is empty or invalid.');
      }
    } catch (err) {
      if(process.env.NODE_ENV!=='production') {
        logger.warn('[UserDataProvider] Could not load file and we are not in production, using fallback test users: ' + err);
        const fallbackUser: User = {
          id: '1',
          email: 'test@example.com',
          passwordHash: await bcrypt.hash('1234', 10),
        };

        this.users = [fallbackUser];
      } else {
        logger.warn('[UserDataProvider] Could not load file, cannot use fallback test users for: ' + process.env.NODE_ENV + err);
      }
    }

    this.isLoaded = true;
  }

  async findByEmail(email: string): Promise<User | null> {
    if (!this.isLoaded) await this.init(); 
    const logger = LoggerRegistry.resolve();
    logger.info('[JsonUserDataProvider] - Finding user: ' + email);
    try {
      let user = this.users.find(u => u.email === email) ?? null;
      logger.info('[JsonUserDataProvider] - Found user: ' + user?.email);
      return user;
    } catch(error) {
      logger.info('[JsonUserDataProvider] - Could not search for user: ' + email + error);
      return null;
    }
  }
}
