# Stability AI (DreamStudio) Image Generation Documentation

This documentation provides information about using Stability AI (DreamStudio) for image generation in our Next.js application.

## Setup

1. Install the Stability AI package:
```bash
npm install stability-ts
```

2. Set up environment variables (in `.env.local`):
```
STABILITY_API_KEY=your_stability_api_key_here
```

## Implementation Details

### API Route

The API route is implemented in `src/app/api/stability/generate-image/route.ts`:

```typescript
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

      // Process response and return images
      // ...
    } catch (modelError) {
      // Error handling
      // ...
    }
  } catch (error) {
    // Error handling
    // ...
  }
}
```

### Client Component

The client component for image generation is implemented in `src/components/HeroSection.tsx`.

## Stability AI Image Generation Options

### Parameters

* `text_prompts`: An array of text prompts to use for generation.
* `cfg_scale`: How strictly the diffusion process adheres to the prompt text (higher values keep your image closer to your prompt).
* `height`: The height of the generated image.
* `width`: The width of the generated image.
* `samples`: The number of images to generate.
* `steps`: The number of diffusion steps to run.

### Available Models

- `stable-diffusion-xl-1024-v1-0`: The SDXL 1.0 image generation model.

## Official Documentation

For more detailed information, refer to the official Stability AI documentation:
[https://platform.stability.ai/docs/api-reference](https://platform.stability.ai/docs/api-reference) 