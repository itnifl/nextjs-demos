// File: src/lib/logger/WinstonLogger.ts

import { ILogger } from './ILogger';
import winston from 'winston';

const winstonLogger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
      return `${timestamp} [${level}]: ${message} ${metaStr}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    // you can add File transports, HTTP transports, etc.
  ],
});

export class WinstonLogger implements ILogger {
  debug(message: string, meta: Record<string, unknown> = {}) {
    winstonLogger.debug(message, meta);
  }

  info(message: string, meta: Record<string, unknown> = {}) {
    winstonLogger.info(message, meta);
  }

  warn(message: string, meta: Record<string, unknown> = {}) {
    winstonLogger.warn(message, meta);
  }

  error(message: string | Error, meta: Record<string, unknown> = {}) {
    if (message instanceof Error) {
      winstonLogger.error(message.message, { stack: message.stack, ...meta });
    } else {
      winstonLogger.error(message, meta);
    }
  }
}
