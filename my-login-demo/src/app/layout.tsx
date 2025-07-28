// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link'; 
import { LogoutButton } from '@/components/LogoutButton'; 

export const metadata: Metadata = {
  title: 'The Login Demo',
  description: 'Login test app with Next.js',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 p-6 bg-gradient-to-br from-blue-50 via-blue-200 to-blue-500">
          <div className="flex items-center justify-between border-b pb-4 mb-6">
            {/* ✨ Lenke‑versjon av overskriften */}
            <Link
              href="/"
              aria-label="Gå til forsiden"
              className="group inline-flex items-baseline cursor-pointer focus:outline-none"
            >
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent transition-transform duration-200 group-hover:scale-105">
                AuthDemo&nbsp;
                <span className="text-gray-400 transition-colors duration-200 group-hover:text-white">
                  .app
                </span>
              </h1>
            </Link>
            <LogoutButton />
          </div>

          {/* Main page content goes here */}
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}