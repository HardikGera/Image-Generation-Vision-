'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 bg-gradient-to-b from-black/80 to-black/0 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-white">V</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Vision
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#integration">Integration</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#resources">Resources</NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-4 py-2 text-white/80 hover:text-white transition-colors"
            >
              Sign in
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <motion.span
        className="text-white/70 hover:text-white transition-colors cursor-pointer"
        whileHover={{ y: -2 }}
      >
        {children}
      </motion.span>
    </Link>
  );
} 