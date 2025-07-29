// tests/api/login.test.ts
import { POST } from '@/app/api/login/route';
import { NextRequest } from 'next/server';
import { InitAuthServer } from '@/lib/auth/InitAuth.server';
import { LoggerRegistry } from '@/lib/logger';

// Mock Upstash and rate limiter
jest.mock('@/lib/clientIdentity/ClientIdentity', () => ({ getClientIp: jest.fn().mockReturnValue('127.0.0.1') }));
jest.mock('@upstash/redis', () => ({ Redis: jest.fn() }));
jest.mock('@upstash/ratelimit', () => ({ Ratelimit: jest.fn().mockImplementation(() => ({ limit: () => ({ success: true }) })) }));
// Mock Next.js cookies API
jest.mock('next/headers', () => ({ cookies: jest.fn().mockReturnValue({ set: jest.fn() }) }));

describe('POST /api/login', () => {
  beforeAll(async () => {
    process.env.JWT_SECRET = 'testsecret';
    LoggerRegistry.register({ debug: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn() });
    await InitAuthServer();
  });

  it('responds 401 on invalid credentials', async () => {
    const req = new NextRequest('http://localhost/api/login', { method: 'POST', body: JSON.stringify({ email: 'no@no.com', pass: 'bad' }) });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it('responds 200 on valid credentials', async () => {
    const req = new NextRequest('http://localhost/api/login', { method: 'POST', body: JSON.stringify({ email: 'test@example.com', pass: '1234' }) });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
  });
});