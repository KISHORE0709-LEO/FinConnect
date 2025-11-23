import StarfieldBackground from "@/components/StarfieldBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ZoneCards from "@/components/ZoneCards";
import IntelligenceTeaser from "@/components/IntelligenceTeaser";
import GamificationSection from "@/components/GamificationSection";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarfieldBackground />
      <Header />
      
      <main className="relative z-10 pt-16">
        <HeroSection />
        <ZoneCards />
        <IntelligenceTeaser />
        <GamificationSection />
        <TrustSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
