import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <VideoSection />
      <Benefits />
      <HowItWorks />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
