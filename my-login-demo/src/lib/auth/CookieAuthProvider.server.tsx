// Fil: src/lib/auth/CookieAuthProvider.ts

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { AuthProviderServer } from './AuthProviderServer';
import { UserDataProvider } from './UserDataProvider';
import { COOKIE_NAME } from '@/lib/constants/auth';
import { ROUTES } from '@/lib/constants/routes';
import { LoggerRegistry } from '@/lib/logger';
import bcrypt from 'bcrypt';

export function CookieAuthProvider(userDataProvider: UserDataProvider): AuthProviderServer {
  return {
    async login(email: string, password: string) {
      const logger = LoggerRegistry.resolve();
      if (!password) {
        logger.error('Argument password is empty, can not log in!');
        throw new Error('Argument password is empty, can not log in!');
      }
      if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET missing');

      const user = await userDataProvider.findByEmail(email);
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      logger.info('Comparing password and hash..');
      const passwordMatch = await bcrypt.compare(password, user.passwordHash);
      if (!passwordMatch) {
        return { success: false, error: 'Invalid credentials' };
      }

       const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: '1d', algorithm: 'HS256' }
      );

      const cookieStore = await cookies();
      cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,                          // 🛡️ JS can’t read/write (protects against XSS)
        secure: process.env.NODE_ENV === 'production',  
                                                // 🔒 only over HTTPS in prod
        sameSite: 'strict',                      // 🔐 lowercase “strict” (best CSRF protection)
        path: ROUTES.HOME,                       // 📁 limit to your app’s base path
        maxAge: 60 * 60 * 24,                    // ⏳ 1 day in seconds
        // domain: '.yourdomain.com',            // 🌐 optional: share across subdomains
      });

      return { success: true };
    },

    async logout() {
      const cookieStore = await cookies();
      cookieStore.set(COOKIE_NAME, '', {
        path: ROUTES.HOME,
        maxAge: 0,
      });
    },

    async isAuthenticated() {
      const cookieStore = await cookies();
      return !!cookieStore.get(COOKIE_NAME)?.value;
    },
    
    async getUser(email: string) {
      return await this.isAuthenticated() ? await userDataProvider.findByEmail(email) : null;
    },

     async getCurrentUser() {
      if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET missing');

      const store = await cookies();
      const token = store.get(COOKIE_NAME)?.value;
      if (!token) return null;

      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
        return await userDataProvider.findByEmail(payload.email);
      } catch {
        return null;
      }
    },
  };
}
