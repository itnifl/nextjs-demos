// File: src/lib/logger/InitLogger.ts

import { LoggerRegistry } from './LoggerRegistry';
import { WinstonLogger } from './WinstonLogger';

export function InitLogger() {
  // Registers WinstonLogger as your app’s active logger
  LoggerRegistry.register(new WinstonLogger());
}
