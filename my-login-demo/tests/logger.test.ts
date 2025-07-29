// tests/logger.test.ts
import { LoggerRegistry } from '@/lib/logger';
import { WinstonLogger } from '@/lib/logger/WinstonLogger';

describe('LoggerRegistry', () => {
  it('defaults to no-op logger with no errors', () => {
    const logger = LoggerRegistry.resolve();
    expect(() => logger.info('hi')).not.toThrow();
  });

  it('registers and resolves a custom logger', () => {
    const custom = { debug: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn() };
    LoggerRegistry.register(custom);
    expect(LoggerRegistry.resolve()).toBe(custom);
  });
});

describe('WinstonLogger', () => {
  it('allows logging methods without throwing', () => {
    const win = new WinstonLogger();
    expect(() => win.info('info')).not.toThrow();
    expect(() => win.warn('warn')).not.toThrow();
    expect(() => win.error('error')).not.toThrow();
  });
});