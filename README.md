# Vision - AI Image Generator with Authentication

Vision is a modern web application that leverages Stability AI (DreamStudio) to generate high-quality images from text prompts. Built with Next.js, React, and Tailwind CSS, this project showcases the power of AI in creating visual content and includes user authentication powered by Supabase.

![Vision AI Image Generator](screenshot.png)

## Live Demo

Experience Vision in action: [https://image-generation-vision.vercel.app/](https://image-generation-vision.vercel.app/)

## Features

- **AI-Powered Image Generation**: Generate high-quality images from text descriptions using Stability AI's SDXL model
- **User Authentication**: Secure login and signup functionality with Supabase
- **User Profiles**: Personalized user profiles
- **Responsive UI**: Beautiful user interface that works across devices
- **Credit-Conscious Design**: Generates one image per prompt to conserve API credits
- **Modern Design**: Created with Tailwind CSS and Framer Motion for smooth animations

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS, Framer Motion
- **API**: Stability AI (DreamStudio) API
- **Authentication & Database**: Supabase
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- A Stability AI API key (obtain from [DreamStudio](https://beta.dreamstudio.ai/membership?tab=apiKeys))
- A Supabase project (create at [Supabase](https://supabase.com/))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HardikGera/Image-Generation-Vision-.git
   cd Image-Generation-Vision-
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your API keys:
   ```
   STABILITY_API_KEY=your_stability_api_key_here
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Authentication Setup

The application uses Supabase for authentication. Make sure your Supabase project has email authentication enabled.

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Providers
3. Enable Email provider
4. Configure any additional authentication providers if needed

## Deployment on Vercel

### Setting Up Environment Variables on Vercel

When deploying to Vercel, you need to configure your environment variables in the Vercel dashboard:

1. Create a new project on Vercel and import your repository
2. In the project settings, go to the "Environment Variables" section
3. Add the following environment variables:
   - `STABILITY_API_KEY`: Your Stability AI API key from DreamStudio
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
4. Deploy your application

### Vercel One-Click Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FHardikGera%2FImage-Generation-Vision-&env=STABILITY_API_KEY,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY&envDescription=API%20keys%20required%20for%20the%20application)

## Troubleshooting

### Common Errors

**"Stability API key is not set"**
- Make sure you've added the STABILITY_API_KEY to your `.env.local` file for local development
- For Vercel deployment, check if the environment variable is properly configured in your project settings

**"Failed to generate image"**
- Check if your Stability AI account has enough credits
- Verify your API key is correct and not expired
- Check the browser console for more detailed error messages

**"Authentication failed"**
- Make sure your Supabase URL and anon key are correct
- Check the Supabase dashboard for any authentication errors

## Credit Usage

Each image generation costs 1 credit in the Stability AI API. The application is designed to generate one image at a time to help conserve your free credits.

## Documentation

- [Deployment Guide](docs/deployment-guide.md) - Detailed instructions for deploying the application to Vercel
- [Stability AI Image Generation](docs/stability-image-generation.md) - Information about the Stability AI integration
- [Supabase Authentication](docs/supabase-authentication.md) - Details about the authentication system
- [Project Structure](docs/project-structure.md) - Overview of the codebase structure
- [Gemini API (Optional)](docs/gemini-image-generation.md) - Information about optional Gemini API integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Stability AI for providing the image generation capabilities
- Supabase for authentication and database services
- Next.js team for the amazing framework
- Tailwind CSS for the styling utilities
- Framer Motion for the animations
