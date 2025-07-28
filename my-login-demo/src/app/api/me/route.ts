// File: src/app/api/me/route.ts

import { NextResponse } from 'next/server';
import { AuthRegistry } from '@/lib/auth/AuthRegistry';
import { InitAuthServer } from '@/lib/auth/InitAuth.server';
import { LoggerRegistry } from '@/lib/logger';

export async function GET() {
  const logger = LoggerRegistry.resolve();
  logger.info("Starting sequence to verify current user authentication");
  await InitAuthServer();
  const auth = AuthRegistry.resolve();

  const loggedIn = await auth.isAuthenticated();
  if (!loggedIn) {
    logger.info("Current user is not authenticated! Returning Httpstatus 401");
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  logger.info("Reading current user");
  const result = await auth.getCurrentUser();
  if (!result) {
    logger.info("Current user is not found! Returning Httpstatus 404");
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  result.passwordHash = 'CENSORED'; //We are not leaking this

  logger.info("Returning current user with Httpstatus 200-ish");
  return NextResponse.json({ user: result });
}