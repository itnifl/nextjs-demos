// File: src/lib/constants/auth.ts

/** Name of the session cookie; override by setting SESSION_COOKIE_NAME in .env */
export const COOKIE_NAME = process.env.SESSION_COOKIE_NAME ?? 'auth_token';