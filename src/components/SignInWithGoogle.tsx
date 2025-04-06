"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';

export default function SignInWithGoogle() {
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle } = useAuth();

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      // No need to redirect here as Supabase will handle the redirection
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignIn}
      disabled={loading}
      className="w-full flex justify-center items-center gap-3 py-2.5 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="w-5 h-5"
      />
      {loading ? 'Connecting...' : 'Continue with Google'}
    </button>
  );
}
