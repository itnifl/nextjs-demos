// tests/JsonUserDataProvider.test.ts
import { JsonUserDataProvider } from '@/lib/auth/JsonUserDataProvider';
import { LoggerRegistry } from '@/lib/logger';

describe('JsonUserDataProvider', () => {
  beforeAll(() => {
    (process.env as any).NODE_ENV = 'test';
    LoggerRegistry.register({ debug: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn() });
  });

  it('falls back to test user when data file missing', async () => {
    const provider = new JsonUserDataProvider();
    await provider.init();
    const user = await provider.findByEmail('test@example.com');
    expect(user).not.toBeNull();
    expect(user?.email).toBe('test@example.com');
  });

  it('returns null for unknown email', async () => {
    const provider = new JsonUserDataProvider();
    await provider.init();
    const user = await provider.findByEmail('noone@nowhere.com');
    expect(user).toBeNull();
  });
});