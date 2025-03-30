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

    console.log('Generating images for prompt using Stability AI:', prompt);

    const apiKey = process.env.STABILITY_API_KEY;
    if (!apiKey) {
      throw new Error('Stability API key is not set');
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
          samples: 4,
          steps: 30,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Stability API error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      
      // Map the response to our expected format
      const generatedImages = data.artifacts.map((image: any) => ({
        url: image.base64,
        mimeType: 'image/png'
      }));

      console.log('Images generated successfully:', generatedImages.length);

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