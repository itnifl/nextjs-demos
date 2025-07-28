// File: src/lib/logger/Logger.ts

/**
 * Core logging interface.
 * Implement this in any logging backend (Console, Winston, Pino, etc.).
 */
export interface ILogger {
  /**
   * Debug‐level logging.
   * @param message   Main log message.
   * @param meta      Optional additional metadata.
   */
  debug(message: string, meta?: Record<string, any>): void;

  /**
   * Informational messages, important system events.
   */
  info(message: string, meta?: Record<string, any>): void;

  /**
   * Warnings for potential issues.
   */
  warn(message: string, meta?: Record<string, any>): void;

  /**
   * Error‐level logging. Accepts either a string or an Error object.
   */
  error(message: string | Error, meta?: Record<string, any>): void;
}
