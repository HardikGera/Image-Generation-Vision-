# Gemini API Image Generation Documentation

This documentation provides information about using Google's Gemini API for image generation in our Next.js application.

## Setup

1. Install the Google Generative AI package:
```bash
npm install @google/generative-ai
```

2. Set up environment variables (in `.env.local`):
```
GEMINI_API_KEY=your_gemini_api_key_here
```

## Implementation Details

### API Route

The API route is implemented in `src/app/api/gemini/generate-image/route.ts`:

```typescript
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

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: 'imagen-3.0-generate-002' });
    
    // Generate images (default to 4 images as requested)
    const result = await model.generateImages({
      prompt,
      sampleCount: 4, // Generate 4 images
    });

    const generatedImages = result.images.map(image => ({
      url: image.base64,
      mimeType: 'image/png'
    }));

    return NextResponse.json({
      images: generatedImages
    });
    
  } catch (error: any) {
    console.error('Error generating images:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to generate image' },
      { status: 500 }
    );
  }
}
```

### Client Component

The client component for image generation is implemented in `src/components/ImageGenerator.tsx`.

## Gemini API Image Generation Options

### Imagen Model Parameters

* `number_of_images` (or `sampleCount`): The number of images to generate, from 1 to 4 (inclusive). The default is 4.
* `aspect_ratio`: Changes the aspect ratio of the generated image. Supported values are `"1:1"`, `"3:4"`, `"4:3"`, `"9:16"`, and `"16:9"`. The default is `"1:1"`.
* `person_generation`: Allow the model to generate images of people.

### Available Models

- `imagen-3.0-generate-002`: Google's highest quality text-to-image model (Imagen 3)
- `gemini-2.0-flash-exp-image-generation`: For producing contextually relevant images, blending text + images, etc.

## Official Documentation

For more detailed information, refer to the official Google documentation:
[https://ai.google.dev/gemini-api/docs/image-generation](https://ai.google.dev/gemini-api/docs/image-generation) 