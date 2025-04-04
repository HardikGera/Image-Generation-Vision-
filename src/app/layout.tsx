import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export const metadata = {
  title: 'Vision - AI Image Generator',
  description: 'Generate stunning AI images from text prompts using Stability AI',
  keywords: 'AI, image generation, Stability AI, SDXL, text-to-image',
  openGraph: {
    title: 'Vision - AI Image Generator',
    description: 'Generate stunning AI images from text prompts using Stability AI',
    images: ['/og-image.png'],
  },
};
