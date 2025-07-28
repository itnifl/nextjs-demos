// File: src/components/LogoutButton.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/constants/routes';
import { InitAuthClient } from '@/lib/auth/InitAuth.client';
import { AuthRegistry } from '@/lib/auth/AuthRegistry';

export function LogoutButton() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    InitAuthClient();
    (async () => {
      const auth = AuthRegistry.resolveClient();
      const isLoggedIn = await auth.isAuthenticatedClient();
      const publicRoutes = [ROUTES.HOME as string, ROUTES.LOGIN as string];
      setVisible(isLoggedIn && !publicRoutes.includes(pathname));
    })();
  }, [pathname]);

  if (!visible) return null;

  async function handleLogout() {
    await fetch(ROUTES.LOGOUT_API, { method: 'POST' });
    window.location.href = ROUTES.LOGIN;
  }

  return (
    <button
      onClick={handleLogout}
      className={`
        bg-red-500 
        text-white 
        px-4 py-2 
        rounded-md 
        transition 
        transform 
        hover:bg-red-600 
        hover:scale-105 
        hover:shadow-lg 
        focus:outline-none 
        focus:ring-2 
        focus:ring-red-300
        cursor-pointer    /* <— makes the cursor a hand */
      `}
    >
      Logout
    </button>
  );
}
