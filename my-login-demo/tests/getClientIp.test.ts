// tests/getClientIp.test.ts
import { getClientIp } from '@/lib/clientIdentity/ClientIdentity';
import { NextRequest } from 'next/server';

function makeReq(headers: Record<string, string>, remoteAddress?: string) {
  return {
    headers: { get: (k: string) => headers[k] ?? null },
    socket: remoteAddress ? { remoteAddress } : undefined,
  } as unknown as NextRequest;
}

describe('getClientIp', () => {
  it('reads first from x-forwarded-for', () => {
    const req = makeReq({ 'x-forwarded-for': '1.2.3.4,5.6.7.8' });
    expect(getClientIp(req)).toBe('1.2.3.4');
  });

  it('falls back to x-real-ip', () => {
    const req = makeReq({ 'x-real-ip': '9.9.9.9' });
    expect(getClientIp(req)).toBe('9.9.9.9');
  });

  it('uses socket.remoteAddress and strips IPv6 prefix', () => {
    const req = makeReq({}, '::ffff:123.45.67.89');
    expect(getClientIp(req)).toBe('123.45.67.89');
  });

  it('returns unknown if nothing else', () => {
    const req = makeReq({});
    expect(getClientIp(req)).toBe('unknown');
  });
});