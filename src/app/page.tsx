import HeroSection from '@/components/HeroSection';
import ArtGallery from '@/components/ArtGallery';
import Navbar from '@/components/Navbar';
import { ApiKeySetupGuide } from '@/components/ApiKeySetupGuide';

export default function Home() {
  // Check if we're in a production build
  // In SSR context, environment variables are still accessible
  const hasStabilityKey = !!process.env.STABILITY_API_KEY;

  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <Navbar />
      <HeroSection />
      {!hasStabilityKey && (
        <div className="container mx-auto px-4 py-12">
          <ApiKeySetupGuide />
        </div>
      )}
      <ArtGallery />
    </main>
  );
}
