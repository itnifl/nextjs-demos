import { InitAuthServer } from '@/lib/auth/InitAuth.server';
import { AuthRegistry } from '@/lib/auth/AuthRegistry';
import { NextRequest, NextResponse } from 'next/server';
import { LoggerRegistry } from '@/lib/logger';
import { getClientIp } from '@/lib/clientIdentity/ClientIdentity';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// Only initialize Redis & limiters if both env vars are set
const upstashUrl   = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

let ipLimiter: Ratelimit | null = null;
let userLimiter: Ratelimit | null = null;

if (upstashUrl && upstashToken) {
  const redis = new Redis({ url: upstashUrl, token: upstashToken });
  ipLimiter   = new Ratelimit({ redis, limiter: Ratelimit.fixedWindow(20, "60 s"), analytics: false });
  userLimiter = new Ratelimit({ redis, limiter: Ratelimit.fixedWindow(5, "60 s"),  analytics: false });
} else {
  console.warn(
    '[⚠️] UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN is missing — skipping rate limiting'
  );
}

export async function POST(req: NextRequest) {
  const logger = LoggerRegistry.resolve();
  logger.info('Login endpoint hit');

  const clientIp = getClientIp(req);

  // -- IP‑based rate limit (if configured) --
  if (ipLimiter) {
    const { success, reset } = await ipLimiter.limit(clientIp);
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests from your network.' },
        {
          status: 429,
          headers: { 'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)) },
        }
      );
    }
  }

  await InitAuthServer();
  logger.info('Resolving Authentication Registry');
  const auth = AuthRegistry.resolve();

  const { email, pass } = await req.json();
  logger.info('Performing Authentication for: ' + email);
  const result = await auth.login(email, pass);
  logger.info('Got Authentication result.success: ' + result.success);
  logger.info('Got Authentication result.error: ' + result.error);

  // -- Per‑user rate limit on failed logins (if configured) --
  if (!result.success && userLimiter) {
    // note: only throttle existing users
    const user = await auth.getUser(email);
    if (user) {
      const key = `login:${user.id}`;
      const { success, reset } = await userLimiter.limit(key);
      if (!success) {
        return NextResponse.json(
          { error: 'Too many login attempts for this account.' },
          {
            status: 429,
            headers: { 'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)) },
          }
        );
      }
    }
  }

  if (!result.success) {
    logger.info('Responding HttpStatus 401');
    return NextResponse.json({ message: result.error }, { status: 401 });
  }

  logger.info('Responding HttpStatus 200');
  return NextResponse.json({ ok: true });
}
