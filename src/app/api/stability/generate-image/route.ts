import { NextResponse } from 'next/server';

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

    console.log('Generating image for prompt using Stability AI:', prompt);

    const apiKey = process.env.STABILITY_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { 
          error: 'Stability API key is not set', 
          message: 'Please set the STABILITY_API_KEY environment variable in your .env.local file or Vercel project settings.'
        },
        { status: 401 }
      );
    }

    try {
      // Call the Stability AI API directly
      const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          Accept: 'application/json',
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: prompt,
              weight: 1.0
            }
          ],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          samples: 1,
          steps: 30,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
        console.error('Stability API error response:', errorData);
        throw new Error(`Stability API error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log('Stability API response keys:', Object.keys(data));
      
      if (!data.artifacts || !Array.isArray(data.artifacts) || data.artifacts.length === 0) {
        throw new Error('No artifacts received from Stability API');
      }
      
      // Debug the first artifact to understand its structure
      const firstArtifact = data.artifacts[0];
      console.log('Artifact keys:', Object.keys(firstArtifact));
      
      // Process the images
      const generatedImages = data.artifacts.map((artifact: any, index: number) => {
        // The Stability API returns base64 data in the 'base64' field
        if (!artifact.base64) {
          console.error(`Missing base64 data for image ${index}`);
          return null;
        }
        
        console.log(`Image ${index} has base64 data of length:`, artifact.base64.length);
        
        return {
          url: artifact.base64,
          mimeType: 'image/png' // Stability always returns PNGs
        };
      }).filter(Boolean);  // Remove any null entries
      
      if (generatedImages.length === 0) {
        throw new Error('Failed to process image data from Stability API');
      }

      console.log('Images processed successfully:', generatedImages.length);

      return NextResponse.json({
        images: generatedImages
      });
    } catch (modelError: any) {
      console.error('Stability API error:', modelError);
      return NextResponse.json(
        { error: `Stability API error: ${modelError.message}` },
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
  return NextResponse.json({ status: 'Stability AI Image API is ready' });
} 