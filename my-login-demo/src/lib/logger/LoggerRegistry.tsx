// File: src/lib/logger/LoggerRegistry.ts

import type { ILogger } from './ILogger';

let _logger: ILogger;

/**
 * Simple service‐locator for the active Logger instance.
 * Defaults to a no‐op logger if none is registered.
 */
class NoOpLogger implements ILogger {
  debug(): void {}
  info(): void {}
  warn(): void {}
  error(): void {}
}

export const LoggerRegistry = {
  /**
   * Register a concrete Logger implementation (e.g. ConsoleLogger, WinstonLogger).
   */
  register(logger: ILogger) {
    _logger = logger;
  },

  /**
   * Resolve the currently registered Logger.
   * Falls back to a no‐op logger if none has been registered.
   */
  resolve(): ILogger {
    return _logger ?? new NoOpLogger();
  },
};
