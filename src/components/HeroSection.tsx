'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sparkles, Download, Copy, Check } from 'lucide-react';
import ApiKeyMissingAlert from './ApiKeyMissingAlert';
import Link from 'next/link';
import { useAuth } from '@/lib/hooks/useAuth';

export default function HeroSection() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedImages, setGeneratedImages] = useState<Array<{ url: string, mimeType: string }>>([]);
  const [debugMode, setDebugMode] = useState(false); // Turn debug mode off by default
  const [copySuccess, setCopySuccess] = useState(false); // Track copy success state
  const [lastCopiedIndex, setLastCopiedIndex] = useState<number | null>(null); // Track which image was copied
  const { user } = useAuth();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }
    
    setLoading(true);
    setError('');
    setGeneratedImages([]);
    
    try {
      console.log('Sending request to generate image with prompt:', prompt);
      
      const response = await fetch('/api/stability/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt,
          userId: user?.id // Include user ID if available
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }
      
      const data = await response.json();
      console.log('Response received:', data);
      
      if (!data.images || data.images.length === 0) {
        throw new Error('No image was generated');
      }
      
      // Debug log to see the structure of the image
      if (data.images[0]) {
        console.log('Image data:', {
          hasUrl: !!data.images[0].url,
          urlLength: data.images[0].url?.length || 0,
          urlPreview: data.images[0].url ? data.images[0].url.substring(0, 30) + '...' : 'No data',
          mimeType: data.images[0].mimeType
        });
      }
      
      setGeneratedImages(data.images);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error('Error generating image:', err);
    } finally {
      setLoading(false);
    }
  };

  // This effect will log when images are added to state
  useEffect(() => {
    if (generatedImages.length > 0) {
      console.log(`${generatedImages.length} image set in state successfully`);
      console.log('First image data (preview):', 
        generatedImages[0]?.url ? generatedImages[0].url.substring(0, 30) + '...' : 'No data');
    }
  }, [generatedImages]);

  const toggleDebugMode = () => {
    setDebugMode(!debugMode);
  };

  // Function to handle image download
  const handleDownload = (imageData: string, mimeType: string) => {
    const link = document.createElement('a');
    link.href = `data:${mimeType};base64,${imageData}`;
    link.download = `ai-generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to handle image copy to clipboard
  const handleCopy = async (imageData: string, mimeType: string, index: number) => {
    try {
      const response = await fetch(`data:${mimeType};base64,${imageData}`);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      
      setCopySuccess(true);
      setLastCopiedIndex(index);
      setTimeout(() => {
        setCopySuccess(false);
        setLastCopiedIndex(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy image: ', err);
      setError('Failed to copy image to clipboard');
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-28 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[#111111]">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-600/10 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-blue-600/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-600/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>
      
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
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center bg-black rounded-lg overflow-hidden">
                <Sparkles className="w-6 h-6 text-purple-500 ml-4 animate-pulse" />
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
                  className={`px-6 py-2 mr-2 ${loading ? 'bg-gray-600' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-purple-500/20'} text-white rounded-lg transition-all duration-300`}
                >
                  {loading ? 'Generating...' : 'Generate'}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {error && error.includes('Stability API key is not set') ? (
            <ApiKeyMissingAlert 
              serviceName="Stability AI" 
              envVarName="STABILITY_API_KEY" 
              docsLink="https://platform.stability.ai/docs/api-reference"
            />
          ) : error ? (
            <div className="mt-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-red-200 mb-2">Error</h3>
              <p className="text-red-200">{error}</p>
            </div>
          ) : null}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 text-sm text-gray-400"
          >
            <span className="px-3 py-1 rounded-full bg-purple-900/30 border border-purple-800/50">✨ Ultra HD Quality</span>
            <span className="px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800/50">🎨 Multiple Styles</span>
            <span className="px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-800/50">⚡ Lightning Fast</span>
            <span onClick={toggleDebugMode} className="cursor-pointer text-xs opacity-50 hover:opacity-100">
              •Debug: {debugMode ? 'ON' : 'OFF'}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {generatedImages.length > 0 && (
        <div className="relative z-10 mt-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Generated Image</h2>
          <div className="grid grid-cols-1 gap-6">
            {generatedImages.map((image, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group aspect-square overflow-hidden rounded-lg border border-purple-500/30 shadow-xl shadow-purple-500/10 mx-auto hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
                style={{ maxWidth: '512px' }}
              >
                {/* Data info for debugging */}
                {debugMode && (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 p-2 text-center bg-black/80 z-20">
                    <div>
                      <p>Image Data</p>
                      <p>Data length: {typeof image.url === 'string' ? image.url.length : 'N/A'}</p>
                      <p>MIME: {image.mimeType}</p>
                      <p>Preview: {image.url ? image.url.substring(0, 20) + '...' : 'No data'}</p>
                      <button 
                        className="mt-2 px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs hover:bg-gray-700"
                        onClick={() => toggleDebugMode()}
                      >
                        Hide Debug
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Standard HTML img tag for base64 data */}
                <img
                  src={`data:${image.mimeType};base64,${image.url}`}
                  alt={`Generated image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    console.error(`Error loading image ${index}:`, e);
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    
                    // Add an error message
                    const container = target.parentElement;
                    if (container) {
                      const errorMsg = document.createElement('div');
                      errorMsg.className = 'absolute inset-0 flex items-center justify-center text-red-400 bg-gray-900/90';
                      errorMsg.textContent = 'Failed to load image';
                      container.appendChild(errorMsg);
                    }
                  }}
                />
                
                {/* Image actions (download, copy) */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center gap-2">
                  <motion.button
                    onClick={() => handleDownload(image.url, image.mimeType)}
                    className="p-2 bg-black/50 rounded-full backdrop-blur-sm hover:bg-purple-600/80 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Download className="w-5 h-5 text-white" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleCopy(image.url, image.mimeType, index)}
                    className="p-2 bg-black/50 rounded-full backdrop-blur-sm hover:bg-purple-600/80 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {copySuccess && lastCopiedIndex === index ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5 text-white" />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {!user && (
            <div className="mt-12 text-center">
              <p className="text-gray-400 mb-4">Create an account to save your generated images!</p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link href="/signup" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-purple-500/30 transition duration-300">
                  Sign Up - It's Free
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      )}
    </section>
  );
} 
