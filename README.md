# Vision - AI Image Generator

Vision is a modern web application that leverages Stability AI (DreamStudio) to generate high-quality images from text prompts. Built with Next.js, React, and Tailwind CSS, this project showcases the power of AI in creating visual content.

![Vision AI Image Generator](screenshot.png)

## Features

- **AI-Powered Image Generation**: Generate high-quality images from text descriptions using Stability AI's SDXL model
- **Responsive UI**: Beautiful user interface that works across devices
- **Credit-Conscious Design**: Generates one image per prompt to conserve API credits
- **Modern Design**: Created with Tailwind CSS and Framer Motion for smooth animations

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS, Framer Motion
- **API**: Stability AI (DreamStudio) API
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- A Stability AI API key (obtain from [DreamStudio](https://beta.dreamstudio.ai/membership?tab=apiKeys))

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

3. Create a `.env.local` file in the root directory and add your Stability AI API key:
   ```
   STABILITY_API_KEY=your_stability_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment on Vercel

### Setting Up Environment Variables on Vercel

When deploying to Vercel, you need to configure your environment variables in the Vercel dashboard:

1. Create a new project on Vercel and import your repository
2. In the project settings, go to the "Environment Variables" section
3. Add the following environment variable:
   - Key: `STABILITY_API_KEY`
   - Value: Your Stability AI API key from DreamStudio
4. Deploy your application

![Vercel Environment Variables](vercel-env-vars.png)

### Vercel One-Click Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FHardikGera%2FImage-Generation-Vision-&env=STABILITY_API_KEY&envDescription=API%20key%20for%20Stability%20AI%20required%20to%20generate%20images&envLink=https%3A%2F%2Fbeta.dreamstudio.ai%2Fmembership%3Ftab%3DapiKeys)

## Troubleshooting

### Common Errors

**"Stability API key is not set"**
- Make sure you've added the STABILITY_API_KEY to your `.env.local` file for local development
- For Vercel deployment, check if the environment variable is properly configured in your project settings

**"Failed to generate image"**
- Check if your Stability AI account has enough credits
- Verify your API key is correct and not expired
- Check the browser console for more detailed error messages

## Credit Usage

Each image generation costs 1 credit in the Stability AI API. The application is designed to generate one image at a time to help conserve your free credits.

## Screenshots

(Add screenshots here once available)

## Documentation

For more information about the Stability AI image generation, see the [docs/stability-image-generation.md](docs/stability-image-generation.md) file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Stability AI for providing the image generation capabilities
- Next.js team for the amazing framework
- Tailwind CSS for the styling utilities
- Framer Motion for the animations
