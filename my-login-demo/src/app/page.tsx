export default function LandingPage() {
  return (
    <div className="flex items-center justify-center px-4">
      <div className="max-w-xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          🔐 Welcome to AuthDemo.app
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          This is a simple demo application built with Next.js, React, and TypeScript
          that showcases basic authentication using cookies and protected routes.
        </p>
        <p className="text-gray-700 mb-6">
          It includes login and logout functionality, route guarding, and conditional redirects
          — all using modern Next.js 13+ App Router features.
        </p>
        <a
          href="/login"
          className="inline-block bg-blue-600 text-white text-sm font-medium px-5 py-3 rounded-md hover:bg-blue-700 transition"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
}
