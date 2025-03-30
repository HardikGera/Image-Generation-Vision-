'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedImages, setGeneratedImages] = useState<Array<{ url: string, mimeType: string }>>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }
    
    setLoading(true);
    setError('');
    setGeneratedImages([]);
    
    try {
      console.log('Sending request to generate images with prompt:', prompt);
      
      const response = await fetch('/api/stability/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate images');
      }
      
      console.log('Received images:', data.images);
      
      if (!data.images || data.images.length === 0) {
        throw new Error('No images were generated');
      }
      
      setGeneratedImages(data.images);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error('Error generating images:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Create{' '}
            <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Powerful
            </span>
            {' '}AI art or
            <br />
            image in seconds
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Meet Vision, the AI-powered image generator that will turn any prompt into a unique
            artwork in seconds.
          </p>

          <motion.div 
            className="max-w-2xl mx-auto mt-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative flex items-center bg-black rounded-lg">
                <Sparkles className="w-6 h-6 text-purple-500 ml-4" />
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="an astronaut riding a horse on mars, hd, dramatic lighting"
                  className="w-full px-4 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                />
                <motion.button
                  onClick={handleGenerate}
                  disabled={loading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 mr-2 ${loading ? 'bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded-lg transition-colors`}
                >
                  {loading ? 'Generating...' : 'Generate'}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {error && (
            <div className="mt-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-center text-red-200">
              {error}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center space-x-4 text-sm text-gray-400"
          >
            <span>✨ Ultra HD Quality</span>
            <span>•</span>
            <span>🎨 Multiple Styles</span>
            <span>•</span>
            <span>⚡ Lightning Fast</span>
          </motion.div>
        </motion.div>
      </div>

      {generatedImages.length > 0 && (
        <div className="relative z-10 mt-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Generated Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {generatedImages.map((image, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-square overflow-hidden rounded-lg border border-purple-500/30 shadow-xl shadow-purple-500/10"
              >
                <Image
                  src={`data:${image.mimeType};base64,${image.url}`}
                  alt={`Generated image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
} 