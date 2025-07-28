import { InitAuthServer } from '@/lib/auth/InitAuth.server';
import { AuthRegistry } from '@/lib/auth/AuthRegistry';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/constants/routes';

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await InitAuthServer();
  const auth = AuthRegistry.resolve();
  const isAuthenticated = await auth.isAuthenticated();

  if (!isAuthenticated) {
    redirect(ROUTES.HOME);
  }

  return (
    <main>{children}</main>
  );
}
