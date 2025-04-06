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
import { supabase } from '@/lib/supabase/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, userId } = body;
    
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
          samples: 1, // Generate 1 image to save credits
          steps: 30,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to generate image');
      }

      const responseData = await response.json();
      const generatedImage = responseData.artifacts[0];
      
      // If userId is provided, save the image reference to the user's profile
      if (userId) {
        // Save image data to Supabase
        const { data, error } = await supabase
          .from('user_images')
          .insert({
            user_id: userId,
            prompt: prompt,
            image_data: `data:image/png;base64,${generatedImage.base64}`,
            created_at: new Date()
          });
          
        if (error) {
          console.error('Error saving image to user profile:', error);
        }
      }

      return NextResponse.json({
        image: `data:image/png;base64,${generatedImage.base64}`
      });
    } catch (modelError: any) {
      console.error('Model error:', modelError);
      return NextResponse.json(
        { error: modelError.message || 'Failed to generate image' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
```

### Client Component

The client component for image generation is implemented in `src/components/ImageGenerator.tsx`.

## User Images Storage

When a user is authenticated, generated images can be saved to their profile in Supabase. This requires:

1. A `user_images` table in your Supabase database with the following schema:
   - `id`: UUID (primary key)
   - `user_id`: UUID (references auth.users.id)
   - `prompt`: Text
   - `image_data`: Text (Base64 encoded image data)
   - `created_at`: Timestamp

2. RLS (Row Level Security) policies to ensure users can only access their own images:
   ```sql
   CREATE POLICY "Users can view their own images" 
   ON user_images 
   FOR SELECT 
   USING (auth.uid() = user_id);
   
   CREATE POLICY "Users can insert their own images" 
   ON user_images 
   FOR INSERT 
   WITH CHECK (auth.uid() = user_id);
   ```

## Stability AI Image Generation Options

### Parameters

* `text_prompts`: An array of text prompts to use for generation.
* `cfg_scale`: How strictly the diffusion process adheres to the prompt text (higher values keep your image closer to your prompt).
* `height`: The height of the generated image.
* `width`: The width of the generated image.
* `samples`: The number of images to generate. We use 1 to conserve credits.
* `steps`: The number of diffusion steps to run.

### Credit Usage

* Each image generation request with `samples: 1` uses 1 credit
* To conserve your free credits (which are limited), we generate one image at a time

### Available Models

- `stable-diffusion-xl-1024-v1-0`: The SDXL 1.0 image generation model.

## Official Documentation

For more detailed information, refer to the official Stability AI documentation:
[https://platform.stability.ai/docs/api-reference](https://platform.stability.ai/docs/api-reference) 