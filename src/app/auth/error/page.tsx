'use client';

import Link from 'next/link';

export default function AuthError() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="mb-6 text-gray-700">
          There was a problem with your authentication. This could be due to:
        </p>
        <ul className="mb-6 list-disc pl-5 text-gray-700">
          <li>An expired or invalid session</li>
          <li>Cancelled authentication flow</li>
          <li>Permission issues with the OAuth provider</li>
        </ul>
        <div className="flex justify-center">
          <Link
            href="/login"
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
} 