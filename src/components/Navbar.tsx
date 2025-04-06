'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/hooks/useAuth';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    // The page will refresh automatically due to the auth state change
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-white font-bold text-xl">
                <div className="flex items-center">
                  <motion.div 
                    className="h-10 w-10 bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center rounded-md mr-2 shadow-lg shadow-purple-500/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-white font-bold">V</span>
                  </motion.div>
                  <span>Vision</span>
                </div>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent hover:border-purple-500 transition-all duration-300">
                Features
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent hover:border-purple-500 transition-all duration-300">
                Integration
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent hover:border-purple-500 transition-all duration-300">
                Pricing
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium border-b-2 border-transparent hover:border-purple-500 transition-all duration-300">
                Resources
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-4">
              {user ? (
                <>
                  <Link href="/profile" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Sign in
                  </Link>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href="/signup" 
                      className="relative group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium overflow-hidden"
                    >
                      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative z-10">Get Started</span>
                    </Link>
                  </motion.div>
                </>
              )}
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-purple-500 hover:bg-gray-900 transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="#" 
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-purple-500 hover:bg-gray-900 transition-all duration-300" 
              onClick={() => setMenuOpen(false)}
            >
              Integration
            </Link>
            <Link 
              href="#" 
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-purple-500 hover:bg-gray-900 transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="#" 
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-purple-500 hover:bg-gray-900 transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              Resources
            </Link>
            {user ? (
              <>
                <Link 
                  href="/profile" 
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-purple-500 hover:bg-gray-900 transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setMenuOpen(false);
                  }}
                  className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-purple-500 hover:bg-gray-900 transition-all duration-300"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-purple-500 hover:bg-gray-900 transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </motion.nav>
  );
} 