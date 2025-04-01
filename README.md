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

## Usage

1. Enter a descriptive prompt in the text field (e.g., "a person on moon with a dog")
2. Click the "Generate" button
3. Wait for the AI to generate a high-quality image based on your prompt
4. To generate a different image, simply enter a new prompt and click Generate again

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
