import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <>
      <SEO
        title="Secretar.IA - Agent IA Téléphonique pour Restaurants"
        description="Ne ratez plus aucune réservation avec Secretar.IA. Notre agent IA répond aux appels, gère vos réservations 24h/24 et 7j/7 et améliore l'expérience client de votre restaurant."
        ogImage="https://secretar-ia.fr/og-image.png"
      />
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <VideoSection />
        <Benefits />
        <HowItWorks />
        <CTA />
        <Footer />
      </main>
    </>
  );
};

export default Index;
