'use client';

import Link from 'next/link';

export default function VerifyEmail() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Check your email
            </h2>
            
            <div className="mt-4 mb-8">
              <svg 
                className="mx-auto h-12 w-12 text-green-500" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
            </div>
            
            <p className="text-gray-400 mb-4">
              We've sent you an email with a link to verify your account.
            </p>
            
            <p className="text-gray-400 mb-8">
              If you don't see it in your inbox, check your spam folder.
            </p>
            
            <Link
              href="/login"
              className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
                         text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none 
                         focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Return to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 