'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedImages, setGeneratedImages] = useState<Array<{ url: string, mimeType: string }>>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/gemini/generate-image', {
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
      
      setGeneratedImages(data.images);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.error('Error generating images:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-center">AI Image Generator</h2>
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-4">
            <textarea
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 text-white"
              placeholder="Describe the image you want to generate..."
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className={`py-3 px-6 rounded-lg font-medium ${
                loading 
                  ? 'bg-gray-700 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } transition-colors`}
            >
              {loading ? 'Generating...' : 'Generate Images'}
            </button>
          </div>
        </form>
        
        {error && (
          <div className="mt-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-center text-red-200">
            {error}
          </div>
        )}
      </div>
      
      {generatedImages.length > 0 && (
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-6 text-center">Generated Images</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {generatedImages.map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-lg border border-gray-700">
                <Image
                  src={`data:${image.mimeType};base64,${image.url}`}
                  alt={`Generated image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 