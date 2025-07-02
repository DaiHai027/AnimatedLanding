import MouseTrailCanvas from '@/components/MouseTrailCanvas';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import EasterEggGame from '@/components/EasterEggGame';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <MouseTrailCanvas />
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <div id="about">
        <CTASection />
      </div>
      <Footer />
      <EasterEggGame />
    </div>
  );
}
