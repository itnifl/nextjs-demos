// File: src/lib/logger/index.ts

import { LoggerRegistry } from './LoggerRegistry';
import { WinstonLogger } from './WinstonLogger';

// Automatically register WinstonLogger whenever this module is imported:
LoggerRegistry.register(new WinstonLogger());

// Re‑export for convenience
export * from './ILogger';
export * from './LoggerRegistry';
export * from './WinstonLogger';
export * from './InitLogger'; 