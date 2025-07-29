import type { NextRequest } from 'next/server';

interface NextRequestWithSocket extends NextRequest {
  socket?: {
    remoteAddress?: string;
  };
}

export function getClientIp(req: NextRequestWithSocket): string {
  // 1. Standard header when behind proxies (most common)
  const xff = req.headers.get('x-forwarded-for');
  if (xff) {
    return xff.split(',')[0].trim();
  }

  // 2. Some proxies (nginx, Cloudflare) set x‑real‑ip
  const xrip = req.headers.get('x-real-ip');
  if (xrip) {
    return xrip;
  }

  // 3. Fallback to raw socket remote address
  const socketAddr = req.socket?.remoteAddress;
  if (socketAddr) {
    // strip IPv6 prefix if present
    return socketAddr.replace(/^::ffff:/, '');
  }

  // 4. Give up
  return 'unknown';
}
