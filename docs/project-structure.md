# Project Structure and Development Guide

This document outlines the structure of the Vision AI Image Generator project and provides guidance for further development.

## Folder Structure

```
vision-ai-image-generator/
│
├── docs/                        # Documentation files
│   ├── stability-image-generation.md   # Stability AI documentation
│   ├── gemini-image-generation.md      # Gemini API documentation (optional)
│   ├── supabase-authentication.md      # Supabase authentication documentation
│   └── project-structure.md            # This file
│
├── public/                      # Static assets
│
├── src/                         # Source code
│   ├── app/                     # Next.js App Router
│   │   ├── api/                 # API routes
│   │   │   ├── stability/       # Stability AI API
│   │   │   ├── gemini/          # Gemini API (optional)
│   │   │   ├── replicate/       # Replicate API (pre-configured)
│   │   │   ├── anthropic/       # Anthropic API (pre-configured)
│   │   │   └── deepgram/        # Deepgram API (pre-configured)
│   │   │
│   │   ├── login/               # Login page
│   │   ├── signup/              # Signup page
│   │   ├── profile/             # User profile page
│   │   ├── auth/                # Authentication-related pages
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home page
│   │
│   ├── components/              # React components
│   │   ├── HeroSection.tsx      # Main hero section with image generation
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── ArtGallery.tsx       # Display of generated images
│   │   └── ... (other components)
│   │
│   ├── lib/                     # Utility functions, hooks, and contexts
│   │   ├── supabase/            # Supabase client and utilities
│   │   ├── firebase/            # Firebase integration (pre-configured)
│   │   ├── contexts/            # React contexts
│   │   ├── hooks/               # Custom React hooks
│   │   └── utils/               # Utility functions
│   │
│   └── middleware.ts            # Next.js middleware for authentication
│
├── .env.local                   # Environment variables (local development)
├── next.config.mjs              # Next.js configuration
├── package.json                 # Dependencies and scripts
├── tailwind.config.ts           # Tailwind CSS configuration
└── README.md                    # Project overview
```

## Key Components and Files

### API Routes

- `src/app/api/stability/generate-image/route.ts`: Handles image generation using Stability AI
- `src/app/api/gemini/generate-image/route.ts`: Handles image generation using Google's Gemini API (optional)

### Authentication

- `src/app/login/page.tsx`: Login page
- `src/app/signup/page.tsx`: Signup page
- `src/app/profile/page.tsx`: User profile page showing user information and saved images
- `src/middleware.ts`: Protects routes that require authentication

### Image Generation

- `src/components/HeroSection.tsx`: Contains the prompt input and handles image generation
- `src/components/ArtGallery.tsx`: Displays generated images and saved user images

### Supabase Integration

- `src/lib/supabase/client.ts`: Initializes the Supabase client
- `src/lib/hooks/useAuth.ts`: Custom hook for authentication operations

## Development Guide

### Adding New Features

1. **User Image Gallery**:
   - Modify `src/app/profile/page.tsx` to show user's saved images
   - Create a new component `src/components/UserGallery.tsx` to display user-specific saved images

2. **Image Editing**:
   - Add new API route `src/app/api/stability/edit-image/route.ts` for image editing capabilities
   - Create a new component `src/components/ImageEditor.tsx` with image editing UI

3. **Social Sharing**:
   - Add social sharing functionality to `src/components/ImageActions.tsx`
   - Implement Open Graph meta tags in `src/app/layout.tsx` for better sharing experience

### Database Schema Management

When modifying the Supabase database schema:

1. Update the appropriate documentation file (e.g., `docs/supabase-authentication.md`)
2. Ensure RLS (Row Level Security) policies are in place for new tables
3. Update any affected components or API routes

### Authentication Flow

The authentication flow follows these steps:

1. User signs up or logs in through the respective pages
2. Supabase handles the authentication and session management
3. After successful authentication, the user is redirected to the home page or profile page
4. Protected routes check authentication status via middleware

### Environment Variables

The following environment variables are required:

```
STABILITY_API_KEY=your_stability_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Optional environment variables:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

## Deployment

This project is configured for easy deployment on Vercel. Make sure to set the environment variables in your Vercel project settings.

## Contributing

When contributing to this project:

1. Follow existing code patterns and conventions
2. Document new features or changes in the appropriate markdown files
3. Test your changes thoroughly before submitting pull requests 