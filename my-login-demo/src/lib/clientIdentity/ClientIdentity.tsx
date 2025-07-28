import { NextRequest } from 'next/server'

export function getClientIp(req: NextRequest): string {
  // 1. Standard header when behind proxies (most common)
  const xff = req.headers.get('x-forwarded-for')
  if (xff) {
    // may be a comma‑separated list of IPs
    return xff.split(',')[0].trim()
  }

  // 2. Some proxies (nginx, cloudflare) set x‑real‑ip
  const xrip = req.headers.get('x-real-ip')
  if (xrip) {
    return xrip
  }

  // 3. Fallback to the raw socket remote address (Node.js only)
  //    In Next.js Route Handlers this is available under req.socket
  //    but may be IPv6‑mapped (e.g. "::ffff:203.0.113.1").
  const socketAddr = (req as any).socket?.remoteAddress
  if (socketAddr) {
    // strip IPv6 prefix if present
    return typeof socketAddr === 'string'
      ? socketAddr.replace(/^::ffff:/, '')
      : String(socketAddr)
  }

  // 4. Give up
  return 'unknown'
}