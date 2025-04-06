import "./globals.css";
import { AuthProvider } from '@/lib/contexts/AuthContext';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-[#111111] text-white overflow-x-hidden min-h-screen`}>
        <AuthProvider>
          <main className="flex flex-col min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
