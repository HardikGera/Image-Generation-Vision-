'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type ArtCard = {
  title: string;
  description: string;
  gradient: string;
};

const artOptions: ArtCard[] = [
  {
    title: 'Space Art',
    description: 'Introduce the main character and set the scene in the vast, twinkling sky',
    gradient: 'from-purple-600 to-blue-500',
  },
  {
    title: '3D Art Image',
    description: 'Isometric website hosting, 3d art, pastel colors, soft lighting, high detail',
    gradient: 'from-indigo-600 to-purple-500',
  },
  {
    title: 'Cartoon Space',
    description: 'A cartoon astronaut in space with planets in the background',
    gradient: 'from-blue-600 to-cyan-500',
  },
  {
    title: 'Cyberpunk Planet',
    description: 'Cyberpunk planet devastated seen from space, detailed maximalist interior',
    gradient: 'from-purple-600 to-pink-500',
  },
  {
    title: 'Vintage Art Image',
    description: 'Vintage medium shot 1920\'s poster, futuristic electronic vintage police',
    gradient: 'from-amber-600 to-orange-500',
  },
  {
    title: '3D Realistic',
    description: 'Toy 3d realistic, kawaii, toy baby, skin mask, california blue, unreal',
    gradient: 'from-blue-600 to-indigo-500',
  },
];

// Container animation
const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Card animation
const cardAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ArtGallery() {
  return (
    <section className="py-20 px-4 bg-[#111111] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute h-96 w-96 -top-48 -left-48 bg-purple-900/30 rounded-full filter blur-3xl"></div>
        <div className="absolute h-96 w-96 -bottom-48 -right-48 bg-blue-900/30 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Explore Art Styles</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose from a variety of pre-defined styles or create your own unique masterpiece with a custom prompt.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerAnimation}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {artOptions.map((art, index) => (
            <motion.div key={index} variants={cardAnimation} whileHover={{ y: -5 }}>
              <Link href="#" className="block">
                <div className="group relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  
                  <div className="relative bg-black rounded-xl overflow-hidden border border-gray-800 transform transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/20">
                    <div className="h-56 bg-gradient-to-br overflow-hidden relative">
                      <div className={`h-full w-full bg-gradient-to-br ${art.gradient} transform group-hover:scale-110 transition-transform duration-500`}></div>
                      
                      {/* Glow overlay */}
                      <div className="absolute inset-0 bg-black/10 group-hover:opacity-0 transition-opacity duration-500"></div>
                      
                      {/* Floating 3D effect layer */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="h-full w-full bg-gradient-to-t from-black/80 to-transparent"></div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">{art.title}</h3>
                      <p className="text-gray-400 text-sm">{art.description}</p>
                    </div>
                    
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.div 
                        className="h-8 w-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 