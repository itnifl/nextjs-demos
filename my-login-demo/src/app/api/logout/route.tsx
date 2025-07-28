// Fil: src/app/api/logout/route.ts

import { InitAuthServer } from '@/lib/auth/InitAuth.server';
import { AuthRegistry } from '@/lib/auth/AuthRegistry';
import { NextResponse } from 'next/server';
import { LoggerRegistry } from '@/lib/logger';

export async function POST() {
  const logger = LoggerRegistry.resolve();
  logger.info("Starting sequence to log out user");
  await InitAuthServer();
  const auth = AuthRegistry.resolve();

  const isLoggedIn = await auth.isAuthenticated();
  if (!isLoggedIn) {
    logger.info("Can not log out user, not logged in! Returning Httpstatus 401");
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  logger.info("Performing log out of user");
  await auth.logout();

  logger.info("Return Httpstatus 200-ish");
  return NextResponse.json({ ok: true });
}
