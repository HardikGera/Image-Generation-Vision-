'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sparkles, Download, Copy, Check } from 'lucide-react';

export default function HeroSection() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedImages, setGeneratedImages] = useState<Array<{ url: string, mimeType: string }>>([]);
  const [debugMode, setDebugMode] = useState(false); // Turn debug mode off by default
  const [copySuccess, setCopySuccess] = useState(false); // Track copy success state
  const [lastCopiedIndex, setLastCopiedIndex] = useState<number | null>(null); // Track which image was copied

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
        body: JSON.stringify({ prompt }),
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
            <span onClick={toggleDebugMode} className="cursor-pointer ml-4 text-xs opacity-50 hover:opacity-100">
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
                className="relative aspect-square overflow-hidden rounded-lg border border-purple-500/30 shadow-xl shadow-purple-500/10 mx-auto"
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
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error(`Error loading image ${index}:`, e);
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    
                    // Add an error message
                    const container = target.parentElement;
                    if (container) {
                      const errorMsg = document.createElement('div');
                      errorMsg.className = 'absolute inset-0 flex items-center justify-center text-red-400 bg-black/80';
                      errorMsg.innerHTML = 'Error loading image.<br>Check console for details.';
                      container.appendChild(errorMsg);
                    }
                  }}
                />
                
                {/* Add download and copy buttons container */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/70 flex justify-center space-x-4">
                  <button
                    onClick={() => handleDownload(image.url, image.mimeType)}
                    className="bg-white text-black rounded-md px-4 py-2 text-sm font-medium flex items-center hover:bg-gray-200 transition-colors shadow-md"
                    style={{ minWidth: '120px', justifyContent: 'center' }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                  
                  <button
                    onClick={() => handleCopy(image.url, image.mimeType, index)}
                    className="bg-white text-black rounded-md px-4 py-2 text-sm font-medium flex items-center hover:bg-gray-200 transition-colors shadow-md"
                    style={{ minWidth: '120px', justifyContent: 'center' }}
                  >
                    {copySuccess && lastCopiedIndex === index ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                
                {/* Show data length for debugging purposes */}
                {image.url && debugMode && (
                  <div className="absolute bottom-16 left-0 right-0 bg-black/70 text-white text-xs p-1 text-center">
                    Received data: {image.url.length} characters
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
} 
