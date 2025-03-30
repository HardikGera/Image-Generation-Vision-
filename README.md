# Vision - AI Image Generator

Vision is a modern web application that leverages Google's Gemini API to generate high-quality images from text prompts. Built with Next.js, React, and Tailwind CSS, this project showcases the power of AI in creating visual content.

![Vision AI Image Generator](screenshot.png)

## Features

- **AI-Powered Image Generation**: Generate high-quality images from text descriptions using Google's Gemini API
- **Responsive UI**: Beautiful user interface that works across devices
- **Multiple Image Results**: Generates 4 unique images per prompt
- **Modern Design**: Created with Tailwind CSS and Framer Motion for smooth animations

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS, Framer Motion
- **API**: Google Gemini API (Imagen 3.0)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- A Google Gemini API key

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

3. Create a `.env.local` file in the root directory and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
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
3. Wait for the AI to generate four unique images based on your prompt
4. Browse through the generated images

## Screenshots

(Add screenshots here once available)

## Documentation

For more information about the Gemini API and image generation, see the [docs/gemini-image-generation.md](docs/gemini-image-generation.md) file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini API for providing the image generation capabilities
- Next.js team for the amazing framework
- Tailwind CSS for the styling utilities
- Framer Motion for the animations