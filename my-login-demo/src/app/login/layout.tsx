// src/app/layout.tsx
import '../globals.css';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { InitAuthServer } from '@/lib/auth/InitAuth.server';
import { AuthRegistry } from '@/lib/auth/AuthRegistry';
import { ROUTES } from '@/lib/constants/routes';

export const metadata: Metadata = {
  title: 'The Login Demo',
  description: 'Login test app with Next.js',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    await InitAuthServer();
    const auth = AuthRegistry.resolve();
    const isAuthenticated = await auth.isAuthenticated();
  
    if (isAuthenticated) {
      redirect(ROUTES.DASHBOARD);
    }

  return (
      <main>{children}</main>
  );
}