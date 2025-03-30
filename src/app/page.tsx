import HeroSection from '@/components/HeroSection';
import ArtGallery from '@/components/ArtGallery';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <Navbar />
      <HeroSection />
      <ArtGallery />
    </main>
  );
}
