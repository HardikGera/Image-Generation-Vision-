import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    console.log('Generating images for prompt:', prompt);

    try {
      // Use the REST API directly since the Node.js SDK might not fully support imagen yet
      const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict';
      const apiKey = process.env.GEMINI_API_KEY;
      
      const response = await fetch(`${apiUrl}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instances: [
            {
              prompt: prompt
            }
          ],
          parameters: {
            sampleCount: 4
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      
      // Map the response to our expected format
      const generatedImages = data.predictions?.[0]?.candidates?.map((candidate: any) => ({
        url: candidate.image.bytesBase64,
        mimeType: 'image/png'
      })) || [];

      console.log('Images generated successfully:', generatedImages.length);

      return NextResponse.json({
        images: generatedImages
      });
    } catch (modelError: any) {
      console.error('Gemini API error:', modelError);
      return NextResponse.json(
        { error: `Gemini API error: ${modelError.message}` },
        { status: 500 }
      );
    }
    
  } catch (error: any) {
    console.error('Error in generate-image API route:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to generate image' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Gemini Image API is ready' });
} 