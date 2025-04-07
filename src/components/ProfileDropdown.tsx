'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, Download, Users, MessageSquare, Languages, Code, HelpCircle, LogOut } from 'lucide-react';

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  if (!user) return null;

  // Extract user initials or use first letter of email
  const getInitials = () => {
    if (!user) return '';
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')
        .map((name: string) => name[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    return user.email?.[0].toUpperCase() || 'U';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-medium text-sm">
          {getInitials()}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-72 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50 py-2"
          >
            <div className="px-4 py-3 border-b border-gray-800">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-medium text-lg mr-3">
                  {getInitials()}
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">
                    {user.user_metadata?.full_name || 'User'}
                  </div>
                  <div className="text-sm text-gray-400 truncate max-w-[180px]">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Link 
                  href="/account"
                  className="w-full block text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Get a plan
                </Link>
              </div>
            </div>
            
            <div className="py-2">
              <Link 
                href="/account/subscription"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="w-5 h-5 mr-3 text-gray-500" />
                Subscription
                <span className="ml-auto bg-gray-800 text-gray-300 px-2 py-1 text-xs rounded">
                  Free
                </span>
              </Link>
              
              <Link 
                href="/account"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-5 h-5 mr-3 text-gray-500" />
                Account
              </Link>
              
              <Link 
                href="/downloads"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Download className="w-5 h-5 mr-3 text-gray-500" />
                Downloads
              </Link>
              
              <Link 
                href="/community"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Users className="w-5 h-5 mr-3 text-gray-500" />
                Join community
              </Link>
              
              <Link 
                href="/discord"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <MessageSquare className="w-5 h-5 mr-3 text-gray-500" />
                Join Discord server
              </Link>
              
              <div className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                <Languages className="w-5 h-5 mr-3 text-gray-500" />
                Language
                <select 
                  className="ml-auto bg-gray-800 text-gray-300 px-2 py-1 text-sm rounded border border-gray-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                </select>
              </div>
              
              <Link 
                href="/ai-code"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Code className="w-5 h-5 mr-3 text-gray-500" />
                Use AI code
              </Link>
              
              <Link 
                href="/help"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <HelpCircle className="w-5 h-5 mr-3 text-gray-500" />
                Help center
              </Link>
            </div>
            
            <div className="pt-2 mt-2 border-t border-gray-800">
              <button
                onClick={handleSignOut}
                className="flex w-full items-center px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3 text-gray-500" />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 