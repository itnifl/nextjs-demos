// tests/AuthRegistry.test.ts
import { AuthRegistry } from '@/lib/auth/AuthRegistry';

describe('AuthRegistry', () => {
  beforeEach(() => {
    // @ts-ignore: reset internal state
    AuthRegistry.registerServer(null);
    // @ts-ignore
    AuthRegistry.registerClient(null);
  });

  it('throws if no server registered', () => {
    expect(() => AuthRegistry.resolve()).toThrow('No server auth provider');
  });

  it('resolves server provider after registration', () => {
    const mock = {} as any;
    AuthRegistry.registerServer(mock);
    expect(AuthRegistry.resolve()).toBe(mock);
  });

  it('throws if no client registered', () => {
    expect(() => AuthRegistry.resolveClient()).toThrow('No client auth provider');
  });

  it('resolves client provider after registration', () => {
    const mock = {} as any;
    AuthRegistry.registerClient(mock);
    expect(AuthRegistry.resolveClient()).toBe(mock);
  });
});